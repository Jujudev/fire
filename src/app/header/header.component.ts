import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authentification/services/auth.service';
import { PostService } from '../authentification/services/post.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private postService: PostService) {
    console.log('authService userinfo', authService.user$);
   }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout();
  }
}
