import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class PolarJGuard  {
    constructor() { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): true | Promise<boolean | UrlTree> {
        return true;
    }
}
