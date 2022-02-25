import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authlistenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authlistenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

onLogOut(){
this.authService.logout();
}

  ngOnDestroy(): void {
    this.authlistenerSubs.unsubscribe();
  }
}
