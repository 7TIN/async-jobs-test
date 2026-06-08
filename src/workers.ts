import { sleep } from "bun";
import { jobs } from ".";
import { readFile } from "./storage";

export const worker1 = async(jobId : string) => {
    console.log("worker started");
    // const job = jobs.get(jobId)!;
    const file = await readFile(jobId);
    
    console.log(file);
    // console.log(await file.json()) 

    // job.status = "running"

    await sleep(5000);
    // job.progress = 50

    await sleep(3000);
    // job.progress = 100

    // job.status = "completed"

    // await new Promise((r) => {
    //     setTimeout(() => {
    //         console.log("hello")
    //     }, 5000)
    //     // setTimeout(r,5000);
    // })
}

export const worker2 = async() => {
    console.log("worker");
}

export type Job = {
    id : string;
    status : "running" | "queued" | "failure" | "completed";
    progress : number;
    message : string;
}