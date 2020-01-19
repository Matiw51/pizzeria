import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  titlePart1 = 'Cap';
  titlePart2 = 'izza';

  constructor(public router: Router){

  }

  isAdminLogged(): boolean{
    if(this.router.url.match('admin')==null){
      return false;
    }else{
      return true;
    }
  }

  ngOnInit(){
    this.router.navigate(['menu/pizza']);
  }
}
