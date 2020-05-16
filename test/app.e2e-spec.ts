import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { PermitsModule } from './../src/permits/permits.module';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let mongoDB: MongoMemoryServer;

    const timeout: number = 120_000;

    beforeEach(async () => {
        mongoDB = new MongoMemoryServer();
        const uri = await mongoDB.getUri();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ MongooseModule.forRoot(uri), PermitsModule,  ConfigModule.forRoot({
                envFilePath: ['test/.env.e2e'],
            }),]
        }).compile();
        
        console.debug(process.env.JWT_SECRET)
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await mongoDB.stop();
        // will be restarted clean in BeforeEach
    }, timeout);

    // At the end: close app
    afterAll(async () => {
        await mongoDB.stop()
        await app.close();
    }, timeout);

    it('/ (GET)', () => {
        return expect(true).toBe(true);
    });

    it(
        'Cant create permit, because auth missing',
        async () => {
            return await request(app.getHttpServer())
                .post('/permits')
                .send()
                .expect(401);
        },
        timeout,
    );

    it(
        'Cant create permit, because auth wrong',
        async () => {
            return await request(app.getHttpServer())
                .post('/permits')
                .auth("test", {type: "bearer"})
                .send()
                .expect(403);
        },
        timeout,
    );

});
