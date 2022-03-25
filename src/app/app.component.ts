import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
import { AVALIABLE_LANGUAJES } from './const';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public translate: TranslateService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const devideLanguaje = window.navigator.language.substring(0,2).toLowerCase();
    if( AVALIABLE_LANGUAJES.includes(devideLanguaje) ){
      this.translate.setDefaultLang( devideLanguaje );
    }else{
      this.translate.setDefaultLang('en');
    }
  }
}
