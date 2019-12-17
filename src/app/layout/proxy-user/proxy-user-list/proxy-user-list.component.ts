import { Component, OnInit } from '@angular/core';
import { ProxyUser, ProxyUserPage } from '../proxy-user';
import { ProxyUserService } from '../proxy-user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proxy-user-list',
  templateUrl: './proxy-user-list.component.html',
  styleUrls: ['./proxy-user-list.component.scss']
})
export class ProxyUserListComponent implements OnInit {

  admin = false;
  proxyUserPage = new ProxyUserPage(0, []);

  pageSize = 10;
  pages: number[] = [1];
  curPage = 1;
  order = 'asc';
  orderby = 'username';

  constructor(private translate: TranslateService, public proxyUserService: ProxyUserService) { }

  ngOnInit() {
    this.getPage(this.curPage);
  }

  create() {

  }

  goDetail() {

  }

  getPage(page: number) {
    this.proxyUserService.getPage(page, this.pageSize, this.order, this.orderby).subscribe(
      res => {
        this.proxyUserPage = res;

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
