import { BaseRepo } from "../../shared/base/base.repo";

export class AuthRepo extends BaseRepo {
    constructor() {
        super();
    }

    public async findByEmail(email: string): Promise<any> {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await this.query(query, [email])
        return result.rows[0];
    }
}