import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    user = {
      email: '',
      emailValid: 0,
      forum: 'e/c',
      mobile: '',
      password: '',
      source: 'leez',
      type: 'leez',
      username: ''
    };
    password = '';
    showtext = false;
    text = '';
    constructor(private translate: TranslateService, public userService: UserService, public router: Router) {
        // this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        // this.translate.setDefaultLang('en');
        // const browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {}

    register() {
      if (this.user.email && this.user.password && this.password) {
        if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.user.email)) {
          this.showtext = true;
          this.text = 'Please enter the correct mailbox!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else if (this.user.password !== this.password) {
          this.showtext = true;
          this.text = 'Two passwords are inconsistent, please re-enter!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else if (this.password.length < 8 || this.password.length > 20) {
          this.showtext = true;
          this.text = 'Password length should between 8 to 20!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else if (this.user.email.startsWith('_')) {
          this.showtext = true;
          this.text = 'username cannot starts with "_"!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);

        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&<>_:;"'\=\-\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/])(?=.{8,})/.test(this.password)) {
          this.showtext = true;
          this.text = 'Password should has at least 1 upper case, 1 lower case, 1 number and 1 special character!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else {
          this.userService.register(this.user.email, this.password).subscribe(res => {
            this.router.navigate(['/login']);
          },
          err => {
            switch (err.result) {
              case 10001:
                this.text = 'User name already exists';
                this.showtext = true;
                break;
              case 10003:
                this.text = 'Mailbox already exists';
                this.showtext = true;
                break;
              case 10004:
                this.text = 'User names can only be Chinese, letters, numbers and underscores, not more than 30 characters (one Chinese represents two characters)';
                this.showtext = true;
                break;
              case 10006:
                this.text = 'Incorrect mailbox';
                this.showtext = true;
                break;
              case 10027:
                this.text = '4-20 character, including at least three types, capital letters, lowercase letters and symbols, and prohibiting the use of commonly used passwords';
                this.showtext = true;
                break;
            }
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 2000);
          });
        }
      } else {
        this.showtext = true;
        this.text = 'Please complete each item!';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      }
    }
}
