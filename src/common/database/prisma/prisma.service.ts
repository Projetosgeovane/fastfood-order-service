import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

interface SecretDatabase {
  hostname: string;
  ro_hostname: string;
  username: string;
  password: string;
  db: string;
  max_pool: string;
  min_pool: string;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
    console.log('Connecting to database')
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnecting from database')
  }
}
