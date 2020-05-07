import { Injectable } from '@nestjs/common';
import * as jsonfile from 'jsonfile';

export interface User {
    userId: string;
    username: string;
    hashedPassword: string;
}

@Injectable()
export class UsersService {
    private users: User[];
    private pathToUsersJson = process.env.PATH_USERS_JSON || "authorizedUsers.json"

    constructor() {
        this.reload().catch(err => {
            console.error("could not inizialize authorized users from " + this.pathToUsersJson, err);
            process.exit(1);
        })
    }

    reload() {
        return new Promise((resolve, reject) => {
            jsonfile.readFile(this.pathToUsersJson, (err, json) => {
                if (err) {
                    return reject(err);
                } else {
                    this.users = json;
                    return resolve();
                }
            })
        })
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
