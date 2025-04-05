import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

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

    return next(clonedRequest);
}
