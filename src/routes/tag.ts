import { RoutesPayload } from '.';
import { TagController } from '../controller/TagController';

const userRoutes: RoutesPayload[] = [
  {
    method: 'post',
    route: '/tag',
    controller: TagController,
    action: 'createTag',
  },
  {
    method: 'delete',
    route: '/tag',
    controller: TagController,
    action: 'deleteTag',
  },
  {
    method: 'get',
    route: '/tags',
    controller: TagController,
    action: 'getMyTags',
  },
  {
    method: 'put',
    route: '/rename-tag',
    controller: TagController,
    action: 'renameTag',
  },
];

export default userRoutes;
