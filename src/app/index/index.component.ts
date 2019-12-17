import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { UtilService } from '../shared/services/util.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [routerTransition()]
})
export class IndexComponent implements OnInit {

  version = '';

  constructor(private translate: TranslateService, public router: Router, public utilService: UtilService) {
      this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh']);
      this.translate.setDefaultLang('en');

      let lang = localStorage.getItem('user-language');
      if (!lang) {
        lang = this.translate.getBrowserLang();
        localStorage.setItem('user-language', lang);
      }
      this.translate.use(lang.match(/en|fr|ur|es|it|fa|de|zh/) ? lang : 'en');

      // const browserLang = this.translate.getBrowserLang();
      // this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh/) ? browserLang : 'en');
  }


  ngOnInit() {
    this.utilService.getVersion().subscribe(res => {
      this.version = `Version: ${res.trim()} | `;
    });
  }
}

