import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('ROOT API')
export class AppController {

  @Get()
  @ApiOperation({ summary: '루트 API', description: '루트 엔드포인트' })
  @ApiCreatedResponse({ description: '모크런에 오신 여러분을 환영합니다! ෆ꒰◍ᐡᐤᐡ◍꒱' })
  getHello(): string {
    return '모크런에 오신 여러분을 환영합니다! ෆ꒰◍ᐡᐤᐡ◍꒱'
  }
}
