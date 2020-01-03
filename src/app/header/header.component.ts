import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authentification/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) {
    authService.user$.subscribe(userInfo =>
    {
      if(userInfo)
        console.log(userInfo.email, ' get logged');
    })
   }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout();
  }
}
