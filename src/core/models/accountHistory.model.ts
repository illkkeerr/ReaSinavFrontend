import { ProcessType } from "./request/accountHistory-request.model";
import { User } from "./user.model";

export class AccountHistory {
    id: number = 0;
    customerId?: number;
    receiverId?: number;
    processType?: ProcessType;
    amountOfMoney?: number;
    createdAt?:string;
    customer?: User;
    receiver?: User;
}

export enum UserType {
    withdrawMoney,
    depositMoney,
    sendingMoney
}
/*{
"message": "string",
"status": 0,
"data": [
  {
    "id": 0,
    "customerId": 0,
    "receiverId": "string",
    "processType": 0,
    "amaountOfMoney": 0,
    "customer": {
      "id": 0,
      "fullName": "string",
      "email": "string",
      "balance": 0,
      "userType": 0,
      "createdAt": "2023-10-27T10:18:43.049Z"
    },
    "receiver": {
      "id": 0,
      "fullName": "string",
      "email": "string",
      "balance": 0,
      "userType": 0,
      "createdAt": "2023-10-27T10:18:43.049Z"
    }
  }
]
}*/