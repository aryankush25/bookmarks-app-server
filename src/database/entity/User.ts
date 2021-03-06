import { Entity, PrimaryColumn, Column, BeforeUpdate, OneToMany } from 'typeorm';
import { Bookmark } from './Bookmark';
import { Folder } from './Folder';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column()
  hashedPassword: string;

  @OneToMany((type) => Folder, (folder) => folder.user)
  folders: Folder[];

  @OneToMany((type) => Bookmark, (bookmark) => bookmark.user)
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
