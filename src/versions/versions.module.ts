import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VersionTask } from "./entity/version-entity";

@Module({
  imports:[TypeOrmModule.forFeature([VersionTask])]
})
export class VersionsModule {}
