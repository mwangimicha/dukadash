import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsAuthModule } from '@sisitech/ngxs-auth';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


const authConfig = {
  APIEndpoint: environment.APIEndpoint,
  version: environment.version,
  clientId: environment.clientId,
  tokenUrl: 'o/token/'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([]),
    NgxsAuthModule.forRoot(authConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
