import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

@Controller('auth')
@ApiTags('로그인 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly userService: UserService
  ) {}

  /****************************** 로그인 ******************************/
  @Post('/login')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'user@gmail.com' },
        password: { type: 'string', example: '1234' }
      }
    }
  })
  @ApiOperation({ summary: '로그인' })
  async login(
    @Body() body,
    @Req() req,
    @Res({ passthrough: true }) res
  ): Promise<string> {
    const email = body.email;
    const password = body.password;

    const user = await this.userService.findUserByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    this.authService.setRefreshToken({ user, res, req });

    return this.authService.getAccessToken({ user });
  }

  /****************************** restore 토큰 ******************************/
  @ApiBearerAuth()
  @UseGuards(AuthGuard('access'))
  @ApiOperation({ summary: 'accessToken 복구' })
  @Post('/restoreToken')
  restoreAccessToken(@Req() req): string {
    return this.authService.getAccessToken({ user: req.user });
  }

  /******************* 구글 로그인 *******************/
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: '구글 소셜 로그인' })
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  /******************* 카카오 로그인 *******************/
  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  @ApiOperation({ summary: '카카오 소셜 로그인' })
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    this.authService.OAuthLogin({ req, res });
  }

  /******************* 네이버 로그인 *******************/
  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  @ApiOperation({ summary: '네이버 소셜 로그인' })
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response
  ) {
    this.authService.OAuthLogin({ req, res });
  }
}
