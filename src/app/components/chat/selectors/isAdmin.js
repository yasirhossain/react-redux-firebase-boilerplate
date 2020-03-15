import { createSelector } from 'reselect';
import { subselect } from './root';
import { roles } from '../constants/roles';

export const isAdminSelector = createSelector(
  chat => chat.role,
  value => value === roles.ADMIN,
);

export const chatIsAdminSelector = subselect(isAdminSelector);
