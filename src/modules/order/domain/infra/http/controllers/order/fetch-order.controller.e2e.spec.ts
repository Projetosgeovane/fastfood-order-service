import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import request from 'supertest';
import { OrderFactory } from 'test/factories/make-Order.factory';

describe('FetchOrdersByIdController', () => {
  let app: INestApplication;
  let OrderFactory: OrderFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    OrderFactory = moduleRef.get(OrderFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[GET] /fos/Order/id', async () => {
    await OrderFactory.makePrismaOrder({
      amount: faker.number.int(),
      orderId: randomUUID(),
      status: 'PENDING',
    });
    await OrderFactory.makePrismaOrder({
      amount: faker.number.int(),
      orderId: randomUUID(),
      status: 'PENDING',
    });
    await OrderFactory.makePrismaOrder({
      amount: faker.number.int(),
      orderId: randomUUID(),
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .get('/fos/Order/id')
      .query({
        param: 'id',
      })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.Orders).toHaveLength(2);

    const OrderOnDatabase = await prisma.Order.findMany();

    expect(OrderOnDatabase).toHaveLength(3);

    const response2 = await request(app.getHttpServer())
      .get('/fps/Order/id')
      .query({
        param: 'id',
      })
      .send();

    expect(response2.statusCode).toBe(200);
    expect(response2.body.Orders).toHaveLength(0);

    const response3 = await request(app.getHttpServer())
      .get('/fps/Order/id')
      .query({
        param: '',
      })
      .send();

    expect(response3.statusCode).toBe(400);
  });
});
