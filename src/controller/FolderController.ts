import { NextFunction, Request, Response } from 'express';
import { Folder } from '../database/entity/Folder';
import { ArgumentsDoesNotExistError, UserDoesNotExistError } from '../errors';
import FolderRepository from '../repository/FolderRepository';
import { isNilOrEmpty, isPresent } from '../utils/helpers';

export class FolderController {
  private folderRepository = new FolderRepository();

  async createFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, parentId } = request.body;

      if (isNilOrEmpty(name)) {
        throw ArgumentsDoesNotExistError();
      }

      let parentFolder: Folder;

      if (isPresent(parentId)) {
        parentFolder = await this.folderRepository.getFolder(parentId, { relations: ['user'] });

        if (isNilOrEmpty(parentFolder)) {
          throw ArgumentsDoesNotExistError();
        }

        if (response.locals.user.id !== parentFolder.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      const folder = await this.folderRepository.createFolder(name, response.locals.user, parentFolder);

      return folder;
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async deleteFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId } = request.body;

      if (isNilOrEmpty(folderId)) {
        throw ArgumentsDoesNotExistError();
      }

      const folderToDelete = await this.folderRepository.getFolder(folderId);

      if (folderToDelete.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.folderRepository.deleteFolder(folderId);
    } catch (error) {
      return next(error);
    }
  }

  async getMyFolders(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId } = request.body;
      let parent: Folder = null;

      if (isPresent(folderId)) {
        parent = await this.folderRepository.getFolder(folderId);

        if (parent.user.id !== response.locals.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      return this.folderRepository.getFolders({
        where: { user: response.locals.user, parent },
      });
    } catch (error) {
      return next(error);
    }
  }

  async renameFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId, name } = request.body;
      let folderToRename: Folder = null;

      if (isPresent(folderId)) {
        folderToRename = await this.folderRepository.getFolder(folderId);

        if (folderToRename.user.id !== response.locals.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      return this.folderRepository.updateFolder({
        searchProps: folderToRename,
        updatedValues: { name },
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
