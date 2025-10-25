import { Component, OnInit } from '@angular/core';
import { languages } from 'prismjs';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserType } from 'src/app/modules/auth';
import { TranslationService } from 'src/app/modules/i18n';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';


interface SubMenu {
  title: string;
  link: string;
}

interface Menu {
  icon: string;
  title: string;
  link?: string; // link directo si aplica
  items?: SubMenu[]; // subsecciones
}


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  /*  language: LanguageFlag; */
  isLoading$: any;
  menuItems: Menu[] = [];

  user$: Observable<UserType>;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  user: any;
  constructor(
    private auth: AuthService,
    private translationService: TranslationService,
    public _service: SvGeneralService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.user$.subscribe(user => {
      /* console.log('USERRRRR: ', user); */

      this.user = user; // primero asignas el usuario
      this.GetMenusItems(this.user?.rol_id);
    });


  }

  trackByFn(index: number, item: any) {
    return item.link; // o un id único de cada menú
  }

  GetMenusItems(rol_id: number): void {
    this._service.GetMenuItemsIdRol(rol_id).subscribe({
      next: (resp: any) => {
        this.menuItems = resp?.menuItems ?? [];
      },
      error: (err) => {
        console.error("Error obteniendo menús", err);
        this.menuItems = []; // fallback vacío
      }
    });
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

  

}
