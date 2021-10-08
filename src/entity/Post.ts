import { Entity, Column, ManyToOne } from 'typeorm';

import Model from './Models';
import { User } from './User';

@Entity('posts')
export class Post extends Model {
  constructor(title: string, body: string, user: User) {
    super();
    // this.title = title;
    // this.body = body;
    // this.user = user;
    Object.assign(this, { title, body, user });
  }
  @Column()
  title: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  body: string;

}
