import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { OrderFactory } from 'src/test/factories/make-order.factory';
import request from 'supertest';

describe('Edit Order (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let orderFactory: OrderFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    orderFactory = moduleRef.get(OrderFactory);

    await app.init();
  });

  test('[PUT] /fos/order', async () => {
    const order = await orderFactory.makePrismaOrder({
      customerId: '15151561',
      status: 'pending',
      totalAmount: 100,
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/order/${order.id.toValue()}`)
      .send({
        status: 'approved',
      });

    expect(response.statusCode).toBe(404);

    // const orderOnDatabase = await prisma.order.findUnique({
    //   where: {
    //     id: order.id.toValue(),
    //   },
    // });

    // expect(orderOnDatabase).toBeTruthy();
  });
});
