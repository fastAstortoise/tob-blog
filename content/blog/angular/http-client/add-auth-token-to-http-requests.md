---
title: Angular Interceptors- add header to every request
date: "2021-07-12T12:49:00.284Z"
tags:
- angular
- http-client
---

# How to Add header to every request that is using http-client

Most of the Angular apps need a way to connect to the api services and  [http-client](https://angular.io/guide/http) provides ability to call the rest api's and receive responses. You can also intercept the request and responses, and manipulate them. In this article we will take a look at how we can add auth token to the http requests.

## Import the HttpClient in app module once

```ts
//app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

## Add interceptor service to the app

We create token interceptor service, and the app has `AuthService` that has token stored and retrieval methods in it. We inject the `AuthService` and retrieve the token from it. We then, set the `X-CSRF-TOKEN` or `Authorization` token to outgoing requests.

```ts
//auth-interceptor.service.ts
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //retreive the stored token from service or local storage
    const token = this._authService.getToken();
    let authReq = req.clone();
    if (token) {
      authReq = req.clone({
        headers: req.headers
          .set("X-CSRF-Token", token)
      });
      // or you can use shortcut
      // authReq = req.clone({ 
      //  setHeaders: {
      //      "X-CSRF-Token": authToken
      //  }})
    }
    return next.handle(authReq);
  }
}
```

## Adding Created `AuthInterceptorService` to `AppModule`

The app imports the `HTTP_INTERCEPTORS` injection token from `@angular/common/http` and provides `AuthInterceptorService` like below.

```ts
//app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
]
```

> **NOTE:** Here `multi: true` option is present. This is required to tell angular the `HTTP_INTERCEPTORS` is a token that will inject multiple values, rather than a single value.

## Flow of Interceptors

We need to be very careful when providing these interceptors since their order matters.
If we import `[AInterceptor, BInterceptor, CInterceptor]` then the outgoing request follows `HttpClient -> AInterceptor -> BInterceptor -> CInterceptor -> WebServices` but the incoming response will follow `WebService -> CInterceptor -> BInterceptor -> AInterceptor -> HttpClient`
