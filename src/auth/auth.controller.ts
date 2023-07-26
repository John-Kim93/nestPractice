import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get('/')
    getAllUsers(): Promise<User[]> {
        return this.authService.getAllUsers();
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto)
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.authService.deleteUser(id)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user)
    }
}
