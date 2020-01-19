import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserService
} from '../service/user.service';
import {
  Subject
} from 'rxjs';
import {
  takeUntil
} from 'rxjs/operators';
import {
  User
} from '../model/user';
import {
  FormGroup,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  private readonly destroy$ = new Subject();


  goToCart() {
    document.getElementById("pizzas-category").classList.remove("active");
    document.getElementById("pastas-category").classList.remove("active");
    document.getElementById("drinks-category").classList.remove("active");
  }

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  checkIfAdmin(): void {
    let login = this.loginForm.get('login').value,
      password = this.loginForm.get('password').value;
    this.userService.getUsers(login, password).
    pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          if (res.length > 0) {
            this.router.navigate(['/admin/items']);
          }
        });
    document.getElementById('login-input').classList.add('wrong');
    document.getElementById('password-input').classList.add('wrong');
  }

  isAdminLogged(): boolean {
    if (this.router.url.match('admin') == null) {
      return false;
    } else {
      return true;
    }
  }

  constructor(public router: Router, private userService: UserService) {}

  ngOnInit() {}

}
