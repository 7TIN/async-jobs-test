import { sleep, write } from "bun";
import { jobs } from ".";
import { readFile, writeFile } from "./storage";

export const worker1 = async (jobId: string) => {
  console.log("worker started");
  // const job = jobs.get(jobId)!;
  const file : Job = await readFile(jobId)!;

  console.log(file);
  // console.log(await file.json())

  file.status = "running";
  await writeFile(file);
  // job.status = "running"

  await sleep(9999);
  // job.progress = 50
  file.progress = 50;
  await writeFile(file);

  await sleep(9999);
  file.progress = 100;
  // job.progress = 100
  file.status = "completed";

  await writeFile(file);

  // job.status = "completed"

  // await new Promise((r) => {
  //     setTimeout(() => {
  //         console.log("hello")
  //     }, 5000)
  //     // setTimeout(r,5000);
  // })
};

export const worker2 = async () => {
  console.log("worker");
};

export type Job = {
  id: string;
  status: "running" | "queued" | "failure" | "completed";
  progress: number;
  message: string;
};
