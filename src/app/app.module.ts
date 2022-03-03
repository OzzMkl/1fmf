import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';

//componente del stepper
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgWizardModule.forRoot(ngWizardConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
