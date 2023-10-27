import { Component } from '@angular/core';
import { AccountHistory } from 'src/core/models/accountHistory.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
constructor(private readonly api:ApiService){}
allHistory:AccountHistory[]=[];
ngOnInit(){
  this.getAllHistories();
}
async getAllHistories(){
  await this.api.getAllEntities(AccountHistory).subscribe((res)=>{
    this.allHistory=res.data;
    this.allHistory=this.allHistory.sort((a, b) => a.id - b.id);
  })
 
}
}
