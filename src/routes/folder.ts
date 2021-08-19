import { RoutesPayload } from '.';
import { FolderController } from '../controller/FolderController';

const userRoutes: RoutesPayload[] = [
  {
    method: 'post',
    route: '/folder',
    controller: FolderController,
    action: 'createFolder',
  },
  {
    method: 'delete',
    route: '/folder',
    controller: FolderController,
    action: 'deleteFolder',
  },
  {
    method: 'get',
    route: '/folders',
    controller: FolderController,
    action: 'getMyFolders',
  },
  {
    method: 'put',
    route: '/rename-folder',
    controller: FolderController,
    action: 'renameFolder',
  },
];

export default userRoutes;
