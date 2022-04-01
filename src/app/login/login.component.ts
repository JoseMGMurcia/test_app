import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SAVED_USER } from '../const';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmited: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public storage: StorageService,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.init();
    this.setInittialFormValues();
  }

  private init() {
    this.isSubmited = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [false],
    });
  }

  submitLogin() {
    this.isSubmited = true;
    if (this.loginForm.valid){

      // Tell user OK result
      this.toast.create({
        message: 'OK',
        duration: 1800
      }).then((toastRes) => {
        toastRes.present();
      });
      this.saveOrRemoveCredentials();
    }
  }

  private saveOrRemoveCredentials() {
    if (this.loginForm.controls.remember.value) {
      this.storage.set(SAVED_USER, {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      });
    } else {
      this.storage.remove(SAVED_USER);

    }
  }

  /**
   * Write saved values to the form.
   */
  private async setInittialFormValues() {
    // Reading the saved values
    const savedValues = await this.storage.get(SAVED_USER);

    // Setting the values
    this.loginForm.controls.email.setValue(savedValues?.email ? savedValues?.email : '');
    this.loginForm.controls.password.setValue(savedValues?.password ? savedValues?.password : '');
    this.loginForm.controls.remember.setValue(
      savedValues?.password && savedValues?.password ? true : false
    );
  }
}
