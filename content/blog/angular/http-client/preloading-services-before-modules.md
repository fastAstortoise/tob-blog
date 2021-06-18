---
title: Angular services APP_INITIALIZER
date: "2021-04-06T16:08:00.284Z"
tags:
    - angular
    - services
    - APP_INITIALIZER
    - providers
---

# Introduction to APP_INITIALIZER DI Token

[APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER) is a dependency injection token that we can use to provide one or more functions. These functions will be injected at application startup time and get executed during app initialization. For any async function returning promise will be resolved first and only after fully resolving those the app will initialize.

> **NOTE** Make sure you handle errors correctly so that your application should start smoothly. If you don't do that app might fail to load.

This is useful for configuration related services that you need to load before app starts.

Let's take look at an example. Let's say you want to load language files from the server before you load your application.

```ts
//app.module.ts
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

export function TranslateServiceInitializerFactory(translate: TranslateService) { //(1)
  return () => {
    translate.addLangs([
      'en',
      'fr'
    ]);
    return translate.setDefaultLang('en');
  };
}

@NgModule({
  imports: [
    //...other imports
    TranslateModule.forRoot(),
    //...rest of the imports
  ],
  providers:[ //(3)
    {
      provide: APP_INITIALIZER,
      useFactory: TranslateServiceInitializerFactory,
      deps: [TranslateService], //(2)
      multi: true
    }
  ]
})
export class AppModule  {}
```
## How to load service before angular app starts up

1. Translate Initializer service or any other service that you want to load before app starts.
2. Injecting `TranslateService` into the factory which we added as `deps` in `providers`
3. Add Service to providers with APP_INITIALIZER token.
