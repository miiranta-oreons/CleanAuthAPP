export interface RegisterResponse {
    id?: string;
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    normalizedEmail?: string;
    emailConfirmed: boolean;
    passwordHash?: string;
    securityStamp?: string;
    concurrencyStamp?: string;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    name?: string;
    age?: number;
    refreshToken?: string;
    refreshTokenExpiration?: string;
}