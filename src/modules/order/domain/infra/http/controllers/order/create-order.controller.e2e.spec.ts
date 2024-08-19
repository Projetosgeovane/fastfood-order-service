import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import request from 'supertest';

describe('Create Network (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /fos/order', async () => {
    const response = await request(app.getHttpServer())
      .post('/fos/order')
      .send({
        customerId: '15151561',
        totalAmount: 100,
        paymentMethod: 'credit-card',
        products: [
          {
            title: 'string',
            quantity: 1,
            unit_price: 1,
          },
        ],
      });

    expect(response.statusCode).toBe(201);

    // const paymentOnDatabase = await prisma.order.findUnique({
    //   where: {
    //     orderId: '23141421414141414524',
    //   },
    // });

    // expect(paymentOnDatabase).toBeTruthy();

    // const responseWithCode = await request(app.getHttpServer())
    //   .post('/api_v1/network')
    //   .send({
    //     name: 'lorem-ipson-with-code',
    //     networkTypeID: 'SIGFOX',
    //     parserEnabled: false,
    //     code: 'string-code',
    //   });

    // expect(responseWithCode.statusCode).toBe(201);

    // const networkWithCodeOnDatabase = await prisma.read.network.findUnique({
    //   where: {
    //     name: 'lorem-ipson-with-code',
    //   },
    // });

    // expect(networkWithCodeOnDatabase).toBeTruthy();
    // expect(networkWithCodeOnDatabase.code).toBe('string-code');
    // expect(networkWithCodeOnDatabase.codeHash).toBeTruthy();
    // expect(networkWithCodeOnDatabase.codeCurrentVersion).toBe(1);
  });
});
