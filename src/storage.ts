// import path from "node:path"
// export const rootDir = path.resolve()

import { jobs } from ".";
import type { Job } from "./workers";

const rootDir = process.cwd();

// const storageDir = path.join(rootDir, "storage");

const path = `${rootDir}/storage/result.json`;

// const file = Bun.file(path);

const data = {
  name: "User1",
  role: "Full Stack Developer",
  active: true,
};

await Bun.write(path, JSON.stringify(data, null, 2));

// console.log(await file.text())
// console.log(storageDir);

export const writeFile = async (job: Job) => {
  const path = `${rootDir}/storage/jobs_${job.id}.json`;
  await Bun.write(path, JSON.stringify(job, null, 2));
};

export const readFile = async (jobId: string) => {
  const path = `${rootDir}/storage/jobs_${jobId}.json`;
  const file = Bun.file(path);
  const data = await file.json();

  return data;
//   return Bun.file(path) ? {} : false;
};
