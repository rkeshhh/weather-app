import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCallService } from './services/weather-call.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';
import { FooterComponent } from './component/footer/footer.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProfileComponent } from './component/updateProfile/updateProfile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LogInComponent,
    RegistrationComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [WeatherCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
