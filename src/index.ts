import { Hono } from "hono";
import { worker, type Job } from "./workers";
import { readFile, writeFile } from "./storage";
import { sleep } from "bun";

const app = new Hono();

export const jobs = new Map<string, Job>();

app.get("/", (c) =>
  c.json({
    status: "ok",
    message: "hello",
  }),
);

// app.get("/call", async (c) => {
//     const work = await worker1();
//     return c.json(work);
// })

app.get("/jobs/:jobid", async (c) => {
  const jobId = c.req.param("jobid");
  console.log(jobId);

  // const job = jobs.get(jobId)
  const jobData = await readFile(jobId);

  return c.json({
    status: 200,
    jobDetails: jobData,
  });
});

app.get("/stress-read/:jobId", async (c) => {
  try {
    const jobId = c.req.param("jobId");

    for (let i = 0; i < 100; i++) {
      await sleep(50);
      const job = await readFile(jobId);
      console.log("ok", job.progress);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/start", async (c) => {
  const jobId = crypto.randomUUID();

  const job: Job = {
    id: jobId,
    status: "queued",
    progress: 0,
    message: "",
  };
  await writeFile(job);

  // jobs.set(jobId, {
  //     id: jobId,
  //     status: "queued",
  //     progress: 0,
  //     message: "",
  // })

  void worker(jobId);

  return c.json({
    jobId: jobId,
  });
});

app.get("/call", async (c) => {
  await Promise.all([worker("1"), worker("2"), worker("3")]);
});

Bun.serve({
  port: "3000",
  fetch: app.fetch,
});

console.log(`server running on http://localhost:${3000}`);
