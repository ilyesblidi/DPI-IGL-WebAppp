import { HttpClientModule } from '@angular/common/http';
import {NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [/* Your components */],
  imports: [HttpClientModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,  // Allows multiple interceptors to be chained
    },
    DataService
  ],
})
export class AppModule {}
