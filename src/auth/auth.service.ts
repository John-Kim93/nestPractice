import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService){}

    async getAllUsers() {
        return await User.find();
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const {username, password} = authCredentialDto
        const user = await User.findOne({where : {username}})

        if (user && (await bcrypt.compare(password, user.password))) {
            // 중요한 정보 x
            const payload = { username }
            const accessToken = await this.jwt.sign(payload)
            return { accessToken: accessToken}
        } else {
            throw new UnauthorizedException('login failed')
        }
    }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto
        
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = User.create({username, password: hashedPassword})
        try {
            await User.save(user)
        } catch(error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async deleteUser(id: number): Promise<void> {
        const result = await User.delete(id)
        
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }
}
