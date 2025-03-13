import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { Global } from '@nestjs/common/decorators';
import { createClient } from 'redis';
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6380,
          },
          database: 1,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
