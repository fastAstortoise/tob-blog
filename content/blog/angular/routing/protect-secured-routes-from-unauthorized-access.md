---
title: Angular routing- Setting access to secured routes 
date: "2021-05-01T22:12:03.284Z"
tags:
    - angular 
    - routing 
    - restrictedAccess
---

# How to protect the secured routes in angular

Angular [routers](https://angular.io/api/router) are very powerful if used in the right way. In this article we will
discuss how we can protect the secured pages from unauthorized access.

> **NOTE:** When ever we are trying to stop access to any resource in the front end, it's not always secured. It's kind of hidden for normal user but user can still access it if they have programming knowledge. Nothing is truly secured when it's exposed to the frontend.

## Prerequisites

Before we start you should be familiar with basic angular app with or without routing.

- [Components](https://angular.io/guide/architecture-components) if you are going to use components
- [Templates](https://angular.io/guide/glossary#template) for building html views.

## Restricting access to unauthorized user

Our apps route configuration will look like below:
```ts
//app.routes
const routes: Routes = [
  { path: '/secured', component: SecuredComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', component: PageNotFoundComponent },
];
```

Create a guard service using cli

```shell
ng generate guard auth-guard 
```

```ts
export class AuthGuard implements CanActivate, canActivateChild {

  constructor(
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const loggedIn = true; // or false get you logged in status from state  
    if (loggedIn) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }
}
```

This will only allow routing to go forward if user is logged in otherwise user will go back or stay on login page. Now
in our route configuration we can add our guard to stop user.

```ts
const routes: Routes = [
//  { path: '/secured', component: SecuredComponent },
  {
    path: '/secured',
    component: SecuredComponent,
    canActivate: [AuthGaurd]
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', component: PageNotFoundComponent },
];
```

This way we can protect our secured routes.

> **BONUS:** You can also protect all the child routes too

```ts
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
//  { path: '/secured', component: SecuredComponent },
  {
    path: '/secured',
    canActivateChild: [AuthGaurd], // (1)
    children: [{
      path: 'another-secured-component',
      component: AnotherSecuredComponent,
    }, {
      path: '',
      component: SecuredComponent,
    }]
  },
  { path: '**', component: PageNotFoundComponent },
];
```

1. Adding property `AuthGuard` to `canActivateChild` when setting path's configuration will protect all the child routes under that path.
This way you can use component-less routes and can protect all the child routes under it.




