import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { Query } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(EmailService)
  private emailService: EmailService;
  @Inject(RedisService)
  private redisService: RedisService;
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `您的验证码是${code}`,
    });
    return '发送成功';
  }
}
