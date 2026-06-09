import { sleep, write } from "bun";
import { jobs } from ".";
import { readFile, writeFile } from "./storage";

export const worker1 = async (jobId: string) => {
  console.log("worker started");
  const file: Job = await readFile(jobId)!;

  console.log(file);

  file.status = "running";
  await writeFile(file);

  await sleep(1000);
  file.progress = 50;
  await writeFile(file);

  await sleep(1000);
  file.progress = 100;

  file.status = "completed";
  await writeFile(file);
};

export const worker = async (jobid: string) => {
  const job: Job = await readFile(jobid);

  job.status = "running";
  await writeFile(job);
  const totalFrames = 100;

  for (let frame = 1; frame <= totalFrames; frame++) {
    await sleep(1000);

    job.progress = Math.floor((frame / totalFrames) * 100);

    await writeFile(job);
  }

  job.status = "completed";
  await writeFile(job);

//   console.log("worker");
};

export type Job = {
  id: string;
  status: "running" | "queued" | "failure" | "completed";
  progress: number;
  message: string;
};
