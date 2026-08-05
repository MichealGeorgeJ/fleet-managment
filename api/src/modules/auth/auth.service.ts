import { SessionEventRepo } from "./session-event.repo";
import { SessionRepo } from "./session.repo";
import { UserService } from "../users/user.service";

export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly sessionRepo: SessionRepo,
        private readonly sessionEventRepo: SessionEventRepo
    ) { }

}