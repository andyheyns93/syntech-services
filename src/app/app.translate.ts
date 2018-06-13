import {HttpModule, Http} from "@angular/http";
import { ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

export const translates : ModuleWithProviders = TranslateModule.forRoot({
	loader: {
		provide: TranslateLoader,
		useFactory: HttpLoaderFactory,
		deps: [Http]
	}
});