import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor {
    private authService: AuthService = inject(AuthService);

    interceptor: HttpInterceptorFn = (req, next) => {
        // Catch any error responses from the server
        return next(req).pipe(
            catchError((error: HttpErrorResponse) => {
                
                if (error.status === 401) {
                    if (this.authService.isLoggedIn()) {
                        return this.handle401Error(req, next);
                    }
                }

                return next(req);
            })
        );

    };

    private handle401Error(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
        console.log('Handling 401 error...');
        return next(req);
    }

}