import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, CanActivate, ValidationPipe } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { PermitsModule } from './../src/permits/permits.module';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './../src/auth/jwt.guard';
import { Reason } from 'src/permits/permit.service';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let mongoDB: MongoMemoryServer;

    const fakeGuard: CanActivate = { canActivate: () => true };

    const timeout: number = 120_000;
    const testReson: Reason = 'TO-TOURISTIC';

    beforeEach(async () => {
        mongoDB = new MongoMemoryServer();
        const uri = await mongoDB.getUri();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(uri),
                PermitsModule,
                ConfigModule.forRoot({
                    envFilePath: ['test/.env.e2e'],
                }),
            ],
        })
            .overrideGuard(JwtGuard)
            .useValue(fakeGuard)
            .compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterEach(async () => {
        await mongoDB.stop();
        // will be restarted clean in BeforeEach
    }, timeout);

    // At the end: close app
    afterAll(async () => {
        await app.close();
    }, timeout);

    it('/ (GET)', () => {
        return expect(true).toBe(true);
    });

    it(
        'Create Permits',
        async () => {
            return await request(app.getHttpServer())
                .post('/permits')
                .send({ reason: testReson })
                .expect(201)
                .then(async res => {
                    expect(res.body.code).toHaveLength(6);
                    expect(res.body.reasonAbbrevation).toBe('TO');
                });
        },
        timeout,
    );

    it(
        'Create 2 Permits',
        async () => {
            return await request(app.getHttpServer())
                .post('/permits/numberOfPermits/2')
                .send({ reason: testReson })
                .expect(201)
                .then(async res => {
                    expect(res.body).toHaveLength(2);
                    expect(res.body[0].code).toHaveLength(6);
                    expect(res.body[1].code).toHaveLength(6);
                    expect(res.body[0].reasonAbbrevation).toBe('TO');
                    expect(res.body[1].reasonAbbrevation).toBe('TO');
                    expect(res.body[0].code != res.body[1].code).toBe(true);
                });
        },
        timeout,
    );



    it(
        'Cant create 2 Permits, because reason  are missing',
        async () => {
            return await request(app.getHttpServer())
                .post('/permits/numberOfPermits/2')
                .send({ reason: null })
                .expect(400)

        },
        timeout,
    );

    it(
        'Cant create Permit, because reason  are missing',
        async () => {
            return await request(app.getHttpServer())
                .post('/permits')
                .send({ reason: null })
                .expect(400)

        },
        timeout,
    );
});
