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
    method: 'patch',
    route: '/move-bookmark',
    controller: BookmarkController,
    action: 'moveBookmark',
  },
  {
    method: 'put',
    route: '/toggle-favorite',
    controller: BookmarkController,
    action: 'toggleFavorites',
  },
  {
    method: 'put',
    route: '/update-details',
    controller: BookmarkController,
    action: 'changeDetails',
  },
];

export default bookmarkRoutes;
