import { Role } from "./role";

export class LoginResponse {
    roles: Role[];
    access_token: string;
    refresh_token: string;
    expires_in: number | null;
    refresh_expires_in: number | null;
    token_type: string | null;

    constructor(roles: Role[], access_token: string, refresh_token: string, expires_in: number | null, refresh_expires_in: number | null, token_type: string | null) {
        this.roles = roles;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in = expires_in;
        this.refresh_expires_in = refresh_expires_in;
        this.token_type = token_type;
    }
}
