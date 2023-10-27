import { Component } from '@angular/core';
import { AccountHistory } from 'src/core/models/accountHistory.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent {
  myHistory: AccountHistory[] = [];
  currentUser: User = new User();
  constructor(private readonly service: ApiService) {
    this.getProfileInfo()
  }

  async getProfileInfo() {
    await this.service.getProfileInfo().subscribe((res) => {
      this.currentUser = res.data;
    })
  }

  ngOnInit() {
    this.getMyHistories();
  }
  async getMyHistories() {
    await this.service.getAllEntities(AccountHistory).subscribe((res) => {
      this.myHistory = res.data.filter(f => f.customerId == this.currentUser.id||f.receiverId==this.currentUser.id);
      this.myHistory = this.myHistory.sort((a, b) => a.id - b.id);
    })
  }
}
