import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'tweets',
})
export class Tweet extends Model<Tweet> {
  @Column
  text: string;
}
