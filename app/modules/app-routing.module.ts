
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { HomeComponent } from "../apps/home/home.component";
import { CryptoComponent } from "../apps/crypto/crypto.component";
import { CryptoDetailsComponent } from "../apps/crypto/pages/crypto-details/crypto-details.component";
import { MoviesComponent } from "../apps/movies/movies.component";
import { GuestbookComponent } from "../apps/guestbook/guestbook.component";
import { GuestbookMessageComponent } from "../apps/guestbook/pages/guestbook-message/guestbook-message.component";


const routes: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'crypto', component: CryptoComponent },
    { path: 'crypto/:id', component: CryptoDetailsComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'guestbook', component: GuestbookComponent },
    { path: 'guestbook/message', component: GuestbookMessageComponent },
    { path: 'guestbook/message/:id', component: GuestbookMessageComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,              // used so that angular can operate only on one part of the website
            enableTracing: false        // for debugging of the routes
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }