import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redusClient: RedisClientType;
  async get(key: string) {
    return await this.redusClient.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redusClient.set(key, value);
    if (ttl) {
      return await this.redusClient.expire(key, ttl);
    }
  }
}
