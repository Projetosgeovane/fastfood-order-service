import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { OrderFactory } from 'src/test/factories/make-order.factory';
import request from 'supertest';

describe('FetchOrdersController', () => {
  let app: INestApplication;
  let orderFactory: OrderFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    orderFactory = moduleRef.get(OrderFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[GET] /fos/order/id', async () => {
    await orderFactory.makePrismaOrder({
      totalAmount: faker.number.int(),
      status: 'PENDING',
    });
    await orderFactory.makePrismaOrder({
      totalAmount: faker.number.int(),
      status: 'PENDING',
    });
    await orderFactory.makePrismaOrder({
      totalAmount: faker.number.int(),
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .get('/fos/orders?page=1')
      .send();

    expect(response.statusCode).toBe(200);

    // const orderOnDatabase = await prisma.order.findMany();

    // expect(orderOnDatabase).toHaveLength(3);
  });
});
