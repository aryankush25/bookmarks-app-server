import { RoutesPayload } from '.';
import { BookmarkController } from '../controller/BookmarkController';

const bookmarkRoutes: RoutesPayload[] = [
  {
    method: 'post',
    route: '/bookmark',
    controller: BookmarkController,
    action: 'createBookmark',
  },
  {
    method: 'delete',
    route: '/bookmark',
    controller: BookmarkController,
    action: 'deleteBookmark',
  },
  {
    method: 'get',
    route: '/bookmark',
    controller: BookmarkController,
    action: 'getMyBookmarks',
  },
  {
    method: 'put',
    route: '/rename-bookmark',
    controller: BookmarkController,
    action: 'renameBookmark',
  },
  {
    method: 'patch',
    route: '/move-bookmark',
    controller: BookmarkController,
    action: 'moveBookmark',
  },
];

export default bookmarkRoutes;
