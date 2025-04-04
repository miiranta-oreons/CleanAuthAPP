import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable, Injector } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor {
    private authService: AuthService = inject(AuthService);
    
    interceptor: HttpInterceptorFn = (req, next) => {
        if(this.authService.isLoggedIn()) {
            const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
            }
            });
            return next(clonedRequest);
        }
        return next(req);
    };

}