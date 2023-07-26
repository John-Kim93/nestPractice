import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[A-Za-z0-9]*$/, {
        message: 'password only accepts alphabet and number'
    })
    password: string;
}