import { User } from "./user.model";

export class Message {
    id: number = 0;
    firstUserId?:number;
    secondUserId?:number;
    myMessage?:string;
    createdAt?:string;
    firstUser?:User;
    secondUser?:User;
  }