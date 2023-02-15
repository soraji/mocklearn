import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { response, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from "@nestjs/passport";

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

@Controller('auth')
@ApiTags('로그인 API')
export class AuthController{
  constructor(
    private readonly authService: AuthService,

    private readonly userService: UserService,
  ) {}

  @Post("/login")
  async login(
    @Body() body,
    @Res({ passthrough: true }) res: Response
  ): Promise<string> {
    const email = body.email;
    const password = body.password;
    
    const user = await this.userService.findUserByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.authService.setRefreshToken({ user, res });

    return this.authService.getAccessToken({ user });
  }

  @Post("/restoreToken")
  restoreAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ):string{
    return "";
    // return this.authService.getAccessToken({ user: res })
  }

  //-----------------------구글 로그인-----------------------------//
  @Get("/login/google")
  @UseGuards(AuthGuard("google"))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    this.authService.OAuthLogin({req, res});
  }

  //-----------------------카카오 로그인-----------------------------//
  @Get("/login/kakao")
  @UseGuards(AuthGuard("kakao"))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    this.authService.OAuthLogin({req, res});
  }

  //-----------------------네이버 로그인-----------------------------//
  @Get("/login/naver")
  @UseGuards(AuthGuard("naver"))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    this.authService.OAuthLogin({req, res});
  }
}