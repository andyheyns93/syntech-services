import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './partials/home/home.component';
import { AboutComponent } from './partials/about/about.component';
import { ServicesComponent } from './partials/services/services.component';
import { PricingComponent } from './partials/pricing/pricing.component';
import { ContactComponent } from './partials/contact/contact.component';
import { PortfolioComponent } from './partials/portfolio/portfolio.component';

export const router : Routes = [
	{ path : '', redirectTo: 'home', pathMatch : 'full' },
	{ path : 'home', component: HomeComponent },
	{ path : 'aboutus', component: AboutComponent },
	{ path : 'services', component: ServicesComponent },
	{ path : 'pricing', component: PricingComponent },
	{ path : 'contactus', component: ContactComponent },
	{ path : 'portfolio', component: PortfolioComponent },
	{ path : '**', redirectTo: 'home'}
];

export const routes : ModuleWithProviders = RouterModule.forRoot(router);