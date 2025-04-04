import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const authService = inject(AuthService);

    if(!authService.isLoggedIn()) {
        return next(req);
    }

    const clonedRequest = req.clone({
    setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
    });

    console.log('clonedRequest', clonedRequest);
    
    return next(clonedRequest);
}
