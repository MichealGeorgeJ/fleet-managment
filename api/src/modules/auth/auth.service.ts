import type { AuthRepo } from "./auth.repo";

export class AuthService {
    
    constructor(private readonly authRepo: AuthRepo){}

}