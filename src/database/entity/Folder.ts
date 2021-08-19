import { Entity, PrimaryColumn, Column, BeforeUpdate, ManyToOne, OneToMany } from 'typeorm';
import { Bookmark } from './Bookmark';
import { User } from './User';

@Entity()
export class Folder {
  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  @ManyToOne((type) => Folder, (folder) => folder.children, {
    onDelete: 'CASCADE',
  })
  parent: Folder;

  @OneToMany((type) => Folder, (folder) => folder.parent, {
    cascade: true,
  })
  children: Folder[];

  @OneToMany((type) => Bookmark, (bookmark) => bookmark.folder)
  bookmarks: Bookmark[];

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
