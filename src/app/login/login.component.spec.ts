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

  it('should detect when form is submited', () => {
    // Act
    component.submitLogin();

    // Assert
    expect(component.isSubmited).toBeTruthy();
  });

  it('should validate correct user credentials', () => {
    // Act
    component.loginForm.setValue({
      email: 'avalidvalue@valid.com',
      password: 'enoughLeng',
      remember: false
    });

    // Assert
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should not validate incorrect user email', () => {
    // Act
    component.loginForm.setValue({
      email: 'notValid.com',
      password: 'enoughLeng',
      remember: false
    });

    //Assert
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should not validate a short user password', () => {
    // Act
    component.loginForm.setValue({
      email: 'avalidvalue@valid.com',
      password: 'not',
      remember: false
    });

    //Assert
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should store values when remember is marked', () => {
    // Arrange
    // @ts-ignore
    const saveOrRemoveSpy = spyOn(component, 'saveOrRemoveCredentials');

    // Act
    component.loginForm.setValue({
      email: 'avalidvalue@valid.com',
      password: 'valispassword',
      remember: true
    });
    component.submitLogin();
    //Assert
    expect(saveOrRemoveSpy).toHaveBeenCalled();
  });

});
