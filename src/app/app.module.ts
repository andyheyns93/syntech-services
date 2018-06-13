import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

/* CUSTOM FILES */
import { routes } from './app.router';
import { translates } from './app.translate';


/* COMPONENTS */
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './partials/about/about.component';
import { ServicesComponent } from './partials/services/services.component';
import { HomeComponent } from './partials/home/home.component';
import { PricingComponent } from './partials/pricing/pricing.component';
import { ContactComponent } from './partials/contact/contact.component';
import { PortfolioComponent } from './partials/portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    AboutComponent,
    ServicesComponent,
    HomeComponent,
    PricingComponent,
    ContactComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    translates,
    ReCaptchaModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
