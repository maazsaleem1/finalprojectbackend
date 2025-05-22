import IORedis from 'ioredis';
import { Queue, Worker } from 'bullmq';

const connection = new IORedis({
    host: '127.0.0.1', port: 6379,
    maxRetriesPerRequest: null
});

const QUEUE_NAME = 'defaultQueue'; // Define the queue name
export const queue = new Queue(QUEUE_NAME);