
// Framework Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { AppRoutingModule } from './modules/app-routing.module';

// Services
import { AppService } from "./services/app.service";
import { CryptoDataService } from "./apps/crypto/services/crypto-data.service";
import { MoviesDataService } from "./apps/movies/services/movies-data.service";
import { GuestbookDataService } from "./apps/guestbook/services/guestbook-data.service";

// Components
import { AppComponent } from './app.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { PagerComponent } from './components/pager/pager.component';

// Pages
import { HomeComponent } from './apps/home/home.component';
import { CryptoComponent } from './apps/crypto/crypto.component';
import { CryptoDetailsComponent } from './apps/crypto/pages/crypto-details/crypto-details.component';
import { MoviesComponent } from './apps/movies/movies.component';
import { GuestbookComponent } from './apps/guestbook/guestbook.component';
import { GuestbookMessageComponent } from './apps/guestbook/pages/guestbook-message/guestbook-message.component';


@NgModule({
    declarations: [
        // Components
        AppComponent,
        AppMenuComponent,
        LoadingOverlayComponent,
        PagerComponent,

        // Pages
        HomeComponent,
        CryptoComponent,
        CryptoDetailsComponent,
        MoviesComponent,
        GuestbookComponent,
        GuestbookMessageComponent
    ],
    // Modules
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    // Services
    providers: [
        AppService,
        CryptoDataService,
        MoviesDataService,
        GuestbookDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
