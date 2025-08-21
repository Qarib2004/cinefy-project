import { IsString } from "class-validator";

export class RefreshTokenDto{
    @IsString({message:"You have not transmitted an refresh token or is it not a line!"})
    refreshToken: string
}