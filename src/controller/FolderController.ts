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
      const { folderId } = request.query;
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

  async getMyFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId } = request.query;

      if (isNilOrEmpty(folderId)) {
        throw ArgumentsDoesNotExistError();
      }

      let folder: Folder = await this.folderRepository.getFolder(folderId);

      if (folder.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      folder = await this.folderRepository.getFolder(folderId, {
        relations: ['parent', 'children'],
      });

      return folder;
    } catch (error) {
      return next(error);
    }
  }

  async renameFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId, name } = request.body;

      if (isNilOrEmpty(folderId)) {
        throw ArgumentsDoesNotExistError();
      }

      const folderToRename: Folder = await this.folderRepository.getFolder(folderId);

      if (folderToRename.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
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

  async moveFolder(request: Request, response: Response, next: NextFunction) {
    try {
      const { folderId, moveTo } = request.body;

      if (isNilOrEmpty(folderId) || isNilOrEmpty(moveTo)) {
        throw ArgumentsDoesNotExistError();
      }

      const currentFolder: Folder = await this.folderRepository.getFolder(folderId);

      if (currentFolder.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      let moveToFolder: Folder = null;

      if (moveTo !== 'root') {
        moveToFolder = await this.folderRepository.getFolder(moveTo);

        if (moveToFolder.user.id !== response.locals.user.id) {
          throw ArgumentsDoesNotExistError();
        }
      }

      return this.folderRepository.updateFolder({
        searchProps: currentFolder,
        updatedValues: { parent: moveToFolder },
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
