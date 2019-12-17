import { Component, OnInit } from '@angular/core';
import { EndUser, EndUserPage } from '../end-user';
import { EndUserService } from '../end-user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-end-user-list',
  templateUrl: './end-user-list.component.html',
  styleUrls: ['./end-user-list.component.scss']
})
export class EndUserListComponent implements OnInit {

  admin = false;
  endUserPage = new EndUserPage(0, []);

  pageSize = 10;
  pages: number[] = [1];
  curPage = 1;
  order = 'asc';
  orderby = 'username';

  constructor(private translate: TranslateService, public endUserService: EndUserService) { }

  ngOnInit() {
    this.getPage(this.curPage);
  }

  create() {

  }

  goDetail() {

  }

  getPage(page: number) {
    this.endUserService.getPage(page, this.pageSize, this.order, this.orderby).subscribe(
      res => {
        this.endUserPage = res;

        const cnt = Math.ceil(res.count / this.pageSize);
        this.pages.length = 0;
        for (let i = 1; i <= cnt; i++) {
          this.pages.push(i);
        }

        this.curPage = page;
      }
    );
  }
}
