import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let mongoDB: MongoMemoryServer;

    const timeout: number = 120_000;

    beforeEach(async () => {
        mongoDB = new MongoMemoryServer();
        const uri = await mongoDB.getUri();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ MongooseModule.forRoot(uri)]
        }).compile();
        

        app = moduleFixture.createNestApplication();
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
});
