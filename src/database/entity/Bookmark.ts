import { Entity, PrimaryColumn, Column, BeforeUpdate, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Folder } from './Folder';
import { Tag } from './Tag';
import { User } from './User';

@Entity()
export class Bookmark {
  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  url: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @ManyToOne(() => Folder, (folder) => folder.bookmarks)
  folder: Folder;

  @ManyToMany(() => Tag, (tag) => tag.bookmarks)
  tags: Tag[];

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: string;

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date().toISOString();
  }
}
