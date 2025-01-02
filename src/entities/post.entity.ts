export class Post {
  id?: number;
  title: string;
  subTitle: string;
  content: string;
  createdOn?: Date;
  userId: number;
  file: any;

  constructor(
    id: number,
    title: string,
    subTitle: string,
    content: string,
    createdOn: Date,
    userId: number,
    file: any,
  ) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.content = content;
    this.createdOn = createdOn;
    this.userId = userId;
    this.file = file;
  }
}
