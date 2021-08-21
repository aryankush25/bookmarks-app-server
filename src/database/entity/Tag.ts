import { Entity, PrimaryColumn, Column, BeforeUpdate, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Bookmark } from './Bookmark';
import { User } from './User';

@Entity()
export class Tag {
  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  @ManyToMany((type) => Bookmark, (bookmark) => bookmark.tags)
  @JoinTable()
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
