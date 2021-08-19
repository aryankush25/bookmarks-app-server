import { NextFunction, Request, Response } from 'express';
import { ArgumentsDoesNotExistError, UserDoesNotExistError } from '../errors';
import UserRepository from '../repository/UserRepository';
import { isNilOrEmpty } from '../utils/helpers';

export class UserController {
  private userRepository = new UserRepository();

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password } = request.body;

      if (isNilOrEmpty(email) || isNilOrEmpty(name) || isNilOrEmpty(password)) {
        throw ArgumentsDoesNotExistError();
      }

      const user = await this.userRepository.createUser(name, email, password);

      return {
        ...user,
        token: this.userRepository.generateJWT(user.id, user.email),
      };
    } catch (error) {
      return next(error);
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;

      if (isNilOrEmpty(email) || isNilOrEmpty(password)) {
        throw ArgumentsDoesNotExistError();
      }

      const isValidUser = await this.userRepository.validatePassword(email, password);

      if (!isValidUser) {
        throw UserDoesNotExistError();
      }

      const user = await this.userRepository.getUser({ where: { email } });

      return {
        ...user,
        token: this.userRepository.generateJWT(user.id, user.email),
      };
    } catch (error) {
      return next(error);
    }
  }

  async me(request: Request, response: Response, next: NextFunction) {
    try {
      return response.locals.user;
    } catch (error) {
      return next(error);
    }
  }

  async deleteMe(request: Request, response: Response, next: NextFunction) {
    try {
      return this.userRepository.deleteUser(response.locals.user.id);
    } catch (error) {
      return next(error);
    }
  }

  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    try {
      return this.userRepository.getUsers();
    } catch (error) {
      return next(error);
    }
  }
}
