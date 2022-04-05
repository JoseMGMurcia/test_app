import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSubmited as true when an empty form is submited', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
      remember: false,
    });
    component.submitLogin();

    expect(component.isSubmited).toBeTruthy();
  });

  it('should validate correct user credentials', () => {
    component.loginForm.setValue({
      email: 'avalidvalue@valid.com',
      password: 'enoughLeng',
      remember: false,
    });

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should not validate incorrect user email, remember false', () => {
    component.loginForm.setValue({
      email: 'notValid.com',
      password: 'enoughLeng',
      remember: false,
    });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should not validate incorrect user email, remember true', () => {
    component.loginForm.setValue({
      email: 'notValid.com',
      password: 'enoughLeng',
      remember: true,
    });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should not validate a short user password', () => {
    component.loginForm.setValue({
      email: 'avalidvalue@valid.com',
      password: 'not',
      remember: false,
    });

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should store values when remember is marked', () => {
    // @ts-ignore
    const saveOrRemoveSpy = spyOn(component, 'saveOrRemoveCredentials');

    component.loginForm.setValue({
      email: 'avalidvalue@valid.com',
      password: 'valispassword',
      remember: true,
    });
    component.submitLogin();

    expect(saveOrRemoveSpy).toHaveBeenCalled();
  });
});
