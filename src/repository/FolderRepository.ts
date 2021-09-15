import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Folder } from '../database/entity/Folder';
import { User } from '../database/entity/User';

interface UpdateFolderPayload {
  searchProps: Object;
  updatedValues: any;
}

class FolderRepository {
  private folderRepository = getRepository(Folder);

  async createFolder(name: string, user: User, parent: Folder) {
    const folder = await this.folderRepository.save({
      id: v4(),
      name,
      user,
      parent,
      createdAt: new Date().toISOString(),
    });

    return folder;
  }

  async getFolder(props: Object = {}, options: Object = {}) {
    const folder = await this.folderRepository.findOne(props, {
      relations: ['user'],
      ...options,
    });

    return folder;
  }

  async getFolders(props: Object = {}) {
    const folders = await this.folderRepository.find({...props, relations: ['bookmark']});

    return folders;
  }

  async deleteFolder(props: Object = {}) {
    const folderToRemove = await this.getFolder(props);

    await this.folderRepository.remove(folderToRemove);

    return folderToRemove;
  }

  async updateFolder(props: UpdateFolderPayload) {
    let folderToUpdate: any = await this.getFolder(props.searchProps);

    folderToUpdate = {
      ...folderToUpdate,
      ...props.updatedValues,
    };

    await this.folderRepository.save(folderToUpdate);

    return folderToUpdate;
  }
}

export default FolderRepository;
