import { Directive, EventEmitter, HostListener, NgModule, Output, ViewContainerRef } from "@angular/core";
import { RecaptchaComponent, RecaptchaModule } from "ng-recaptcha";
import { RECAPTCHA_BASE_URL } from "ng-recaptcha";
import { environment } from "src/environments/environment";

@Directive({
  selector: '[PjCaptcha]',
})
export class PjCaptchaDirective {

  @Output()
  captchaChanged = new EventEmitter<string>();

  private _captchaRef?: RecaptchaComponent;
  constructor(private _hostElm: ViewContainerRef) {
    if (environment.enableCaptcha) {
      let captchaRef = this._hostElm.createComponent(RecaptchaComponent);
      this._captchaRef = captchaRef.instance;
      this._captchaRef.siteKey = '6LdeavMhAAAAALHclmqjYHifrd8f43qV9GFqexvm';
      this._captchaRef.size = 'invisible';
      this._captchaRef.resolved.subscribe(userverify => {
        if (userverify != null) {
          this.captchaChanged.emit(userverify);
          this._captchaRef?.reset();
        }
      });
    }
  }

  @HostListener('click')
  onClick(): void {
    if (environment.enableCaptcha) {
      this._captchaRef?.execute();
    } else {
      this.captchaChanged.emit('captcha disabled');
    }
  }
}

@NgModule({
  declarations: [
    PjCaptchaDirective
  ],
  imports: [
    RecaptchaModule
  ],
  exports: [
    PjCaptchaDirective
  ],
  providers: [{
    provide: RECAPTCHA_BASE_URL,
    useValue: "https://recaptcha.net/recaptcha/api.js", // use recaptcha.net script source for some of our users
  }],
})
export class PjCaptchaDirectiveModule { }

