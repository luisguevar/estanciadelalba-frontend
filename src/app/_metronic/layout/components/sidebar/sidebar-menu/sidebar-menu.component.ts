import { Component, OnInit } from '@angular/core';
import { languages } from 'prismjs';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserType } from 'src/app/modules/auth';
import { TranslationService } from 'src/app/modules/i18n';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  /*  language: LanguageFlag; */
  user$: Observable<UserType>;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  user: any;
  constructor(
    private auth: AuthService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.user$.subscribe(user => {
      /* console.log('USERRRRR: ', user); */
      this.user = user;
    });
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

}
