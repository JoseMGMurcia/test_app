import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAIL_KEY, PASS_KEY } from '../const';
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
    public storage: StorageService
  ) {}
  async ngOnInit() {
    this.isSubmited = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [false],
    });
    await this.setInittialFormValues();
  }

  submitLogin() {
    this.isSubmited = true;
    if (this.loginForm.controls.email.valid) {
      console.log('OK');
      // Save credentials or delete it.
      if (this.loginForm.controls.remember.value) {
        this.storage.set(MAIL_KEY, this.loginForm.controls.email.value);
        this.storage.set(PASS_KEY, this.loginForm.controls.password.value);
      } else {
        this.storage.remove(MAIL_KEY);
        this.storage.remove(PASS_KEY);
      }
    }
  }

  /**
   * Write saved values to the form.
   */
  private async setInittialFormValues() {
    // Reading the values
    const savedEmail = await this.storage.get(MAIL_KEY);
    const savedPass = await this.storage.get(PASS_KEY);

    // Setting the values
    this.loginForm.controls.email.setValue(savedEmail ? savedEmail : '');
    this.loginForm.controls.password.setValue(savedPass ? savedPass : '');
    this.loginForm.controls.remember.setValue(
      savedPass && savedEmail ? true : false
    );
  }
}
