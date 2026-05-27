import 'dotenv/config';
import mongoose from 'mongoose';
import Submission from './models/Submission.js';

const SEEDS = [
  {
    manuscriptNumber: 4757,
    title: 'Cool Idea: But sample size = 2',
    status: 'published',
    createdAt: new Date('2021-05-17T09:04:00'),
    updatedAt: new Date('2021-05-17T09:05:00'),
  },
  {
    manuscriptNumber: 4754,
    title: "Reviewer 2 please don't be too harsh this time",
    status: 'published',
    createdAt: new Date('2021-05-14T01:09:00'),
    updatedAt: new Date('2021-05-17T09:00:00'),
  },
  {
    manuscriptNumber: 4753,
    title: 'Too Esoteric of a Topic',
    status: 'unsubmitted',
    createdAt: new Date('2021-05-14T06:32:00'),
    updatedAt: new Date('2021-05-18T13:54:00'),
  },
  {
    manuscriptNumber: 4498,
    title: 'Analysis of Brainrot',
    status: 'published',
    createdAt: new Date('2021-05-13T08:48:00'),
    updatedAt: new Date('2021-05-13T16:09:00'),
  },
];

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

for (const seed of SEEDS) {
  const { createdAt, updatedAt, ...fields } = seed;
  await Submission.collection.insertOne({
    ...fields,
    authors: [],
    doi: '',
    abstract: '',
    researchObjectType: 'Software',
    createdAt,
    updatedAt,
  });
  console.log(`Inserted: ${seed.title}`);
}

console.log('Seeding complete.');
await mongoose.disconnect();
