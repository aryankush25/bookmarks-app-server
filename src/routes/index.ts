import userRoutes from './user';
import folderRoutes from './folder';
import { UserController } from '../controller/UserController';
import { FolderController } from '../controller/FolderController';
import { BookmarkController } from '../controller/BookmarkController';

export interface RoutesPayload {
  method: string;
  route: string;
  controller: typeof UserController | typeof FolderController | typeof BookmarkController;
  action: string;
  openAuth?: boolean;
}

export const Routes: RoutesPayload[] = [...userRoutes, ...folderRoutes];
