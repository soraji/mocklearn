import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RolesAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    
  }
}

export class RolesRefreshGuard extends AuthGuard('refresh') {
  getRequest(context: ExecutionContext) {
    
  }
}

