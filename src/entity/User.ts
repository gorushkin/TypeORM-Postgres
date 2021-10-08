import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsEmail, Length, IsEnum } from 'class-validator';

import Model from './Models';
import { Post } from './Post';
@Entity('users')
export class User extends Model {
  @Column()
  @Length(1, 255)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  @IsEnum(['user', 'admin'])
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
