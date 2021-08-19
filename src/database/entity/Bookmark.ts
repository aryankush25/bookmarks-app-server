import { Entity, PrimaryColumn, Column, BeforeUpdate, ManyToOne, OneToMany } from 'typeorm';
import { Folder } from './Folder';
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

  @Column({ default: false })
  isFavorite: boolean;

  @Column('text')
  description: string;

  @Column('text')
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
