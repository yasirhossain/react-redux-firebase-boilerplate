import { Dialog, DialogTitle } from 'app-modules/userAccount/components/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';

const ContactUs = (
  <a
    href="https://support.pluto.tv/hc/en-us/requests/new"
    rel="noopener noreferrer"
    target="_blank"
  >
    contact us
  </a>
);

export class BannedUserDialog extends React.Component {
  state = {
    open: true,
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="banned-dialog-title">
        <DialogTitle id="banned-dialog-title">You have been banned from chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>We&apos;re sorry but your chat activity has been flagged as offensive.</div>
            <div>Please {ContactUs} for steps to resolve the issue.</div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}
