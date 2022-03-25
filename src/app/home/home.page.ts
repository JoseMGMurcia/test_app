import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  app : AppComponent;
  private ts: TranslateService
  constructor(app: AppComponent) {
    this.app = app;
    this.ts = app.translate;
  }

}
