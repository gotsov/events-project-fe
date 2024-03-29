import {Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import {ROUTES} from '../../sidebar/sidebar.component';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {User} from "../../models/User";
import {LoginService} from "../../services/login.service";
import {UserInfo} from "../../models/UserInfo";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  private welcomeText = '';

  loggedUser: UserInfo = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    isReported: false
  };
  isUserLogged: boolean;

  public isCollapsed = true;
  @ViewChild("navbar-cmp", {static: false}) button;

  private subscription: Subscription;
  constructor(location: Location,
              private renderer: Renderer2,
              private element: ElementRef,
              private router: Router,
              private authService: AuthService,
              private loginService: LoginService) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

    this.subscription = this.authService.userChanged$.subscribe((user) => {
      this.loggedUser = user;
      this.isUserLogged = true;
      this.welcomeText = "Здравейте, " + this.loggedUser.firstName + " " + this.loggedUser.lastName;
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Всички събития';
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  goToProfile() {
    this.authService.getCurrentLoggedUser().subscribe({
      next: response => {
        this.loggedUser = response;
      },
      error: err => {
        this.router.navigate(['/login']);
      },
      complete: () => {
        this.redirectToMyAccount(this.loggedUser.id)
      }
    })
  }

  logout() {
    this.loginService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
      },
      error: err => {
        console.log("Logout failed with: ");
        console.log(err);
      },
      complete: () => {
        this.welcomeText = '';
        this.router.navigate(['/login']);
      }
    });
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  redirectToMyAccount(userId: number) {
    this.router.navigate(['/my-account', userId]);
  }
}
