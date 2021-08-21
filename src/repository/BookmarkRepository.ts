import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { Bookmark } from '../database/entity/Bookmark';
import { Folder } from '../database/entity/Folder';
import { User } from '../database/entity/User';

interface UpdateFolderPayload {
  searchProps: Object;
  updatedValues: any;
}

class FolderRepository {
  private bookmarkRepository = getRepository(Bookmark);

  async createBookmark(user: User, folder: Folder, url: string, name: string, description: string, imageUrl: string) {
    const bookmark = await this.bookmarkRepository.save({
      id: v4(),
      user,
      folder,
      url,
      name,
      description,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return bookmark;
  }

  async getBookmark(props: Object = {}, options: Object = {}) {
    const bookmark = await this.bookmarkRepository.findOne(props, {
      relations: ['user', 'folder'],
      ...options,
    });

    return bookmark;
  }

  async getBookmarks(props: Object = {}) {
    const bookmarks = await this.bookmarkRepository.find(props);

    return bookmarks;
  }

  async deleteBookmark(props: Object = {}) {
    const bookmarkToRemove = await this.getBookmark(props);

    await this.bookmarkRepository.remove(bookmarkToRemove);

    return bookmarkToRemove;
  }

  async updateBookmark(props: UpdateFolderPayload) {
    let bookmarkToUpdate: any = await this.getBookmark(props.searchProps);

    bookmarkToUpdate = {
      ...bookmarkToUpdate,
      ...props.updatedValues,
    };

    await this.bookmarkRepository.save(bookmarkToUpdate);

    return bookmarkToUpdate;
  }
}

export default FolderRepository;
