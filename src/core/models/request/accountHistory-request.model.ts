export class AccountHistoryRequest {
   /*"customerId": 0,
  "receiverName": "string",
  "processType": 0,
  "amaountOfMoney": 0
}*/
    customerId:number=0;
    receiverId:number=0;
    processType?:ProcessType;
    amountOfMoney:number=0;
  }
  export enum ProcessType {
    withdrawMoney,
	depositMoney,
	sendingMoney
    
  }
