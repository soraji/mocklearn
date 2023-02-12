import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return '모크런에 오신 여러분을 환영합니다!'
  }
}
