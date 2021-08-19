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

      const folderToDelete = await this.folderRepository.getFolder(folderId, { relations: ['user'] });

      if (folderToDelete.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.folderRepository.deleteFolder(folderId);
    } catch (error) {
      return next(error);
    }
  }

  // async login(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const { email, password } = request.body;

  //     if (isNilOrEmpty(email) || isNilOrEmpty(password)) {
  //       throw ArgumentsDoesNotExistError();
  //     }

  //     const isValidUser = await this.folderRepository.validatePassword(email, password);

  //     if (!isValidUser) {
  //       throw UserDoesNotExistError();
  //     }

  //     const user = await this.folderRepository.getUser({ where: { email } });

  //     return {
  //       ...user,
  //       token: this.folderRepository.generateJWT(user.id, user.email),
  //     };
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async me(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     return response.locals.user;
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async getAllUsers(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     return this.folderRepository.getUsers();
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}
