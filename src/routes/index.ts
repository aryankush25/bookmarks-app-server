import userRoutes from './user';
import folderRoutes from './folder';
import bookmarkRoutes from './bookmark';
import tagRoutes from './tag';
import { UserController } from '../controller/UserController';
import { FolderController } from '../controller/FolderController';
import { BookmarkController } from '../controller/BookmarkController';
import { TagController } from '../controller/TagController';

export interface RoutesPayload {
  method: string;
  route: string;
  controller: typeof UserController | typeof FolderController | typeof BookmarkController | typeof TagController;
  action: string;
  openAuth?: boolean;
}

export const Routes: RoutesPayload[] = [...userRoutes, ...folderRoutes, ...bookmarkRoutes, ...tagRoutes];
