import { NextFunction, Request, Response } from 'express';
import urlMetadata from 'url-metadata';
import { Bookmark } from '../database/entity/Bookmark';
import { Folder } from '../database/entity/Folder';
import { Tag } from '../database/entity/Tag';
import { ArgumentsDoesNotExistError, UserDoesNotExistError } from '../errors';
import BookmarkRepository from '../repository/BookmarkRepository';
import FolderRepository from '../repository/FolderRepository';
import TagRepository from '../repository/TagRepository';
import { isNilOrEmpty, isPresent } from '../utils/helpers';

export class BookmarkController {
  private bookmarkRepository = new BookmarkRepository();
  private folderRepository = new FolderRepository();
  private tagRepository = new TagRepository();

  async createBookmark(request: Request, response: Response, next: NextFunction) {
    try {
      let { folderId, url, name} = request.body;

      const metadataResponse = await urlMetadata(url);

      const description = metadataResponse.description;
      const imageUrl = metadataResponse.image;

      if (isNilOrEmpty(name)) {
        name = metadataResponse.title;
      }


      if (isNilOrEmpty(url)) {
        throw ArgumentsDoesNotExistError();
      }

      let folder: Folder;

      if (isPresent(folderId)) {
        folder = await this.folderRepository.getFolder(folderId, { relations: ['user'] });

        if (isNilOrEmpty(folder)) {
          throw ArgumentsDoesNotExistError();
        }

        if (response.locals.user.id !== folder.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      const bookmark = await this.bookmarkRepository.createBookmark(response.locals.user, folder, url, name, description, imageUrl);

      return bookmark;
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async deleteBookmark(request: Request, response: Response, next: NextFunction) {
    try {
      const { bookmarkId } = request.body;

      if (isNilOrEmpty(bookmarkId)) {
        throw ArgumentsDoesNotExistError();
      }

      const folderToDelete = await this.bookmarkRepository.getBookmark(bookmarkId);

      if (folderToDelete.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.bookmarkRepository.deleteBookmark(bookmarkId);
    } catch (error) {
      return next(error);
    }
  }

  async getMyBookmarks(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId } = request.params;
      let folder: Folder = null;

      if (isPresent(folderId)) {
        folder = await this.folderRepository.getFolder(folderId);

        if (folder.user.id !== response.locals.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      return this.bookmarkRepository.getBookmarks({
        where: { user: response.locals.user, folder },
      });
    } catch (error) {
      return next(error);
    }
  }

  async moveBookmark(request: Request, response: Response, next: NextFunction) {
    try {
      const {folderId, bookmarkId} = request.body;
      let folder: Folder = null;
      let bookmark: Bookmark = await this.bookmarkRepository.getBookmark(bookmarkId);

      if (bookmark.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      if (isPresent(folderId)) {
        folder = await this.folderRepository.getFolder(folderId);

        if (folder.user.id !== response.locals.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      return this.bookmarkRepository.updateBookmark({
        searchProps: bookmark,
        updatedValues: { folder },
      })
    } catch (error) {
      return next(error);
    }
  }

  async changeDetails(request: Request, response: Response, next: NextFunction) {
    try {
      let { bookmarkId, name, url } = request.body;
      let bookmark: Bookmark = await this.bookmarkRepository.getBookmark(bookmarkId);

      const metadataResponse = await urlMetadata(url);

      const description = metadataResponse.description;
      const imageUrl = metadataResponse.image;

      if (bookmark.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.bookmarkRepository.updateBookmark({
        searchProps: bookmark,
        updatedValues: { name, url, description, imageUrl },
      })
    } catch (error) {
      return next(error);
    }
  }

  async toggleFavorites(request: Request, response: Response, next: NextFunction) {
    try {
      const { bookmarkId } = request.body;
      let bookmark: Bookmark = await this.bookmarkRepository.getBookmark(bookmarkId);

      let isFavorite: boolean = bookmark.isFavorite ? false : true;

      if (bookmark.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.bookmarkRepository.updateBookmark({
        searchProps: bookmark,
        updatedValues: { isFavorite },
      })
    } catch (error) {
      return next(error);
    }
  }

  async getBookmarksFromTag(request: Request, response: Response, next: NextFunction) {
    try {
      const { tagId } = request.body;

      const tag: Tag = await this.tagRepository.getTag(tagId);

      if (tag.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      if (isNilOrEmpty(tagId)) {
        throw ArgumentsDoesNotExistError();
      }

      return this.bookmarkRepository.getBookmarksFromTag({
        where: { user: response.locals.user, tags: tag },
      });
    } catch (error) {
      return next(error);
    }
  }

  async addTag(request: Request, response: Response, next: NextFunction) {
    try {
      const {tagId, bookmarkId} = request.body;

      if (isNilOrEmpty(tagId) || isNilOrEmpty(bookmarkId)) {
        throw ArgumentsDoesNotExistError();
      }

      const tag: Tag = await this.tagRepository.getTag(tagId);

      if (tag.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.bookmarkRepository.addTagToBookmark(tag, bookmarkId);

    } catch(error) {
      return next(error);
    }
  }
}
