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
    route: '/my-folders',
    controller: FolderController,
    action: 'getMyFolders',
  },
  {
    method: 'get',
    route: '/folders',
    controller: FolderController,
    action: 'getMyFolders',
  },
];

export default userRoutes;
