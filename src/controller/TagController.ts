import { NextFunction, Request, Response } from 'express';
import { Tag } from '../database/entity/Tag';
import { ArgumentsDoesNotExistError } from '../errors';
import TagRepository from '../repository/TagRepository';
import { isNilOrEmpty } from '../utils/helpers';

export class TagController {
  private tagRepository = new TagRepository();

  async createTag(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.body;

      if (isNilOrEmpty(name)) {
        throw ArgumentsDoesNotExistError();
      }

      const tag = await this.tagRepository.createTag(name, response.locals.user);

      return tag;
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async deleteTag(request: Request, response: Response, next: NextFunction) {
    try {
      const { tagId } = request.body;

      if (isNilOrEmpty(tagId)) {
        throw ArgumentsDoesNotExistError();
      }

      const tagToDelete = await this.tagRepository.getTag(tagId);

      if (tagToDelete.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.tagRepository.deleteTag(tagId);
    } catch (error) {
      return next(error);
    }
  }

  async getMyTags(request: Request, response: Response, next: NextFunction) {
    try {
      return this.tagRepository.getTags({
        where: { user: response.locals.user },
      });
    } catch (error) {
      return next(error);
    }
  }

  async renameTag(request: Request, response: Response, next: NextFunction) {
    try {
      const { tagId, name } = request.body;

      if (isNilOrEmpty(tagId) || isNilOrEmpty(name)) {
        throw ArgumentsDoesNotExistError();
      }

      const tagToRename: Tag = await this.tagRepository.getTag(tagId);

      if (tagToRename.user.id !== response.locals.user.id) {
        throw ArgumentsDoesNotExistError();
      }

      return this.tagRepository.updateTag({
        searchProps: tagToRename,
        updatedValues: { name },
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
