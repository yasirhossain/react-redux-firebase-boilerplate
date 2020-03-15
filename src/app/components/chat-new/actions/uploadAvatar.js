import Pica from 'pica';
import debug from 'debug';
import { selectors } from 'app-webtech-core';
import { firebase } from 'app-modules/application/utils/firebase';
import { UPLOAD_AVATAR } from './types';

const logger = debug('web:chat:actions:uploadAvatar');

const fileToCanvas = async file => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = function imgLoad() {
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    ctx.drawImage(img, 0, 0, this.width, this.height);
    resolve(canvas);
  };
  img.onerror = (err) => {
    reject(err);
  };

  img.src = URL.createObjectURL(file);
});

const resizeFile = async ({
  file,
  width = 100,
  height = 100,
  keepProprotion = true,
}) => {
  if (document) {
    const sourceCanvas = await fileToCanvas(file);

    const outputCanvas = document.createElement('canvas');
    if (keepProprotion && sourceCanvas.width !== sourceCanvas.height) {
      if (sourceCanvas.width > sourceCanvas.height) {
        outputCanvas.width = width;
        outputCanvas.height = height / (sourceCanvas.width / sourceCanvas.height);
      } else {
        outputCanvas.width = width / (sourceCanvas.height / sourceCanvas.width);
        outputCanvas.height = height;
      }
    } else {
      outputCanvas.width = width;
      outputCanvas.height = height;
    }

    const pica = Pica();
    const resizeResult = await pica.resize(sourceCanvas, outputCanvas, 0);

    return pica.toBlob(resizeResult);
  }

  return null;
};

export const chatUploadAvatarActionThunk = newAvatarFile =>
  async (dispatch, getState) => {
    const state = getState();
    const { data: { _id: userID } } = selectors.userAccount.properties(state);

    if (!userID) {
      throw new Error('Need to be signed in to change avatar.');
    }

    const storage = firebase.storage();
    const storageRef = storage.ref();

    logger('File received', { file: newAvatarFile });
    const [, ext] = newAvatarFile.type.split('/');
    const newAvatarRef = storageRef.child(`/user-avatars/${userID}-${Date.now()}.${ext}`);

    logger('Starting upload');
    const fileBlob = await resizeFile({
      file: newAvatarFile,
    });
    const uploadTask = newAvatarRef.put(fileBlob); // uploading file
    dispatch({ type: UPLOAD_AVATAR.REQUEST, payload: uploadTask });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          logger('Upload progress', { progress });
          dispatch({ type: UPLOAD_AVATAR.PROGRESS, payload: progress });
        },
        (err) => {
          logger('Upload error', { err });
          dispatch({ type: UPLOAD_AVATAR.ERROR, payload: err });
          reject(err);
        },
        () => {
          resolve(newAvatarRef.getDownloadURL());
        },
      );
    })
      .then((fileURL) => {
        dispatch({ type: UPLOAD_AVATAR.SUCCESS, payload: { fileURL } });
        logger('Upload complete', { uploadTask, fileURL });
        return { filePath: newAvatarRef.fullPath, fileURL };
      });
  };
