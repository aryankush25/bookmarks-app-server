import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Tag } from '../database/entity/Tag';
import { User } from '../database/entity/User';

interface UpdateTagPayload {
  searchProps: Object;
  updatedValues: any;
}

class TagRepository {
  private tagRepository = getRepository(Tag);

  async createTag(name: string, user: User) {
    const tag = await this.tagRepository.save({
      id: v4(),
      name,
      user,
      createdAt: new Date().toISOString(),
    });

    return tag;
  }

  async getTag(props: Object = {}, options: Object = {}) {
    const tag = await this.tagRepository.findOne(props, {
      relations: ['user'],
      ...options,
    });

    return tag;
  }

  async getTags(props: Object = {}) {
    const tags = await this.tagRepository.find(props);

    return tags;
  }

  async deleteTag(props: Object = {}) {
    const tagToRemove = await this.getTag(props);

    await this.tagRepository.remove(tagToRemove);

    return tagToRemove;
  }

  async updateTag(props: UpdateTagPayload) {
    let tagToUpdate: any = await this.getTag(props.searchProps);

    tagToUpdate = {
      ...tagToUpdate,
      ...props.updatedValues,
    };

    await this.tagRepository.save(tagToUpdate);

    return tagToUpdate;
  }
}

export default TagRepository;
