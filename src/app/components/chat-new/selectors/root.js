import { subselectCreator } from 'app-webtech-core/es/selectors/subselect';

const rootSelector = state => state.chat || {};

export const subselect = subselectCreator(rootSelector);
