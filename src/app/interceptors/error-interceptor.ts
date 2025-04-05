import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";

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

                //401 - refresh token failed - logout
                if (error.url?.includes('refresh-tokens')) {
                    console.log("refresh tokens failed!");
                    authService.logout();
                    return throwError(() => error);
                }

                //401 - any other request - refresh token
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        console.log("refreshed tokens!");
                        const clonedRequest = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        });
                        return next(clonedRequest); // Resend the original request with the new access token
                    }),
                    catchError((refreshError) => {
                        console.log("refresh tokens failed!");
                        authService.logout();
                        return throwError(() => refreshError);
                    })
                );

            }

            // Do nothing
            return throwError(() => error);
        })
    );
            
}

