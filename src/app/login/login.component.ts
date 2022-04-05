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
  ) {}

  async ngOnInit() {
    this.init();
    this.setInittialFormValues();
  }

  submitLogin() {
    this.isSubmited = true;
    if (this.loginForm.valid) {
      this.toast.create({
        message: 'OK',
        duration: 1800,
      }).then((toastRes) => {
        toastRes.present();
      });

      this.saveOrRemoveCredentials();
    }
  }

  private init() {
    this.isSubmited = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [false],
    });
  }

  private saveOrRemoveCredentials() {
    if (this.loginForm.controls.remember.value) {
      this.storage.set(SAVED_USER, {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      });
    } else {
      this.storage.remove(SAVED_USER);
    }
  }

  private async setInittialFormValues() {
    const savedValues = await this.storage.get(SAVED_USER);

    this.loginForm.controls.email.setValue(savedValues?.email ?? '');
    this.loginForm.controls.password.setValue(savedValues?.password ?? '');
    this.loginForm.controls.remember.setValue(savedValues?.password);
  }
}
