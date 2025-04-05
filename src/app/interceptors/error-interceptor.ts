import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

    // Check if user is logged in 
    const authService = inject(AuthService);
    if(!authService.isLoggedIn()) {
        return next(req);
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            // 401 - try to refresh token
            if (error.status === 401 ) {

                // 401 - refresh token request
                if (error.url?.includes('refresh-tokens')) {
                    console.log("refresh tokens failed!");
                    console.log("refreshError: ", error);
                    authService.logout();
                    return throwError(() => error);
                }

                // 401 - any
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        console.log("re-requesting after token refresh!");
                        const clonedRequest = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        });
                        return next(clonedRequest);
                    })
                );
    
            }

            // Do nothing
            return throwError(() => error);
        })
    );
            
}

