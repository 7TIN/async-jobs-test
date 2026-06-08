import { Hono } from "hono";
import { worker1, type Job } from "./workers";
import { createFile, readFile } from "./storage";

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
    console.log(jobId)

    // const job = jobs.get(jobId)
    const jobData = await readFile(jobId);

    return c.json({
        status : 200,
        jobDetails : jobData
    });

})


app.post("/start", async(c) => {
    const jobId = crypto.randomUUID();

    const job : Job = {
        id: jobId,
        status: "queued",
        progress: 0,
        message: "",
    }
    await createFile(job);

    // jobs.set(jobId, {
    //     id: jobId,
    //     status: "queued",
    //     progress: 0,
    //     message: "",
    // })

    void worker1(jobId);

    return c.json({
        jobId : jobId
    })
})

app.get("/call", async (c) => {

  await Promise.all([worker1("1"), worker1("2"), worker1("3")]);

});

Bun.serve({
  port: "3000",
  fetch: app.fetch,
});

console.log(`server running on http://localhost:${3000}`,);
