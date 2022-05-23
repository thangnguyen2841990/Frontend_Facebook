import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserInfoService} from '../service/user-info/user-info.service';
import {UserInfo} from '../model/user-info';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css']
})
export class SearchByNameComponent implements OnInit {
  name: string;
  users: UserInfo[] = [];

  constructor(private activeRouter: ActivatedRoute,
              private userinfoService: UserInfoService) {
    this.activeRouter.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
    });
    this.getAllUsers();
  }

  ngOnInit() {
  }
  getAllUsers() {
    this.userinfoService.searchByName(this.name).subscribe(users => {
      this.users = users;
    });
  }
}
