import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactions: TransactionsService) {}

  @Get()
  list(@Req() request: any, @Query('kind') kind?: string) {
    return this.transactions.list(request.user.companyId, kind);
  }

  @Post()
  create(@Req() request: any, @Body() body: any) {
    return this.transactions.create(request.user.companyId, request.user.sub, body);
  }

  @Post('links')
  link(@Body() body: { parentId: string; childId: string; relationType?: string }) {
    return this.transactions.link(body);
  }
}
