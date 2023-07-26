import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as JWT } from "passport-jwt";
import { User } from "./user.entity";
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(JWT) {
    constructor() {
        super({
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: {username: string}): Promise<User> {
        const {username} = payload
        const user: User = await User.findOne({where: {username}})

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}