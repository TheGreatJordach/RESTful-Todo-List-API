import { InternalServerErrorException, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CacheModule } from "@nestjs/cache-manager";
import * as process from "node:process";

@Module({
  imports:[ConfigModule.forRoot({isGlobal: true, envFilePath: '.env', cache:true}),
  CacheModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async () => {
      const ttl:number = parseInt(process.env.CACHE_TTL) || 60*5
      const max:number = parseInt(process.env.CACHE_MAX) || 100

      if (isNaN(ttl)|| ttl< 0) {
        throw new InternalServerErrorException(`CACHE_TTL mus be a Positive Integer, current value is ${ttl}`);
      }

      if (isNaN(max)|| max< 0) {
        throw new InternalServerErrorException(`CACHE_MAX mus be a Positive Integer, current value is ${max}`);
      }

      console.log(`✨✨✨--> Cache TTL and Cache MAX loaded | { Max:${max} Ttl:${ttl}ms ` )

      return {
        isGlobal: true,
        isGlobalCache: true,
        isGlobalCacheCached: true,
        isGlobalData:true,
        ttl,
        max      }
    }
  })
  ],
})
export class AppConfigModule {}
