// import path from "node:path"
// export const rootDir = path.resolve()

const rootDir = process.cwd();

// const storageDir = path.join(rootDir, "storage");

const path = `${rootDir}/storage/result.json`

// const file = Bun.file(path);

const data = {
  name: "User1",
  role: "Full Stack Developer",
  active: true,
};

await Bun.write(path, JSON.stringify(data, null, 2));


// console.log(await file.text())
// console.log(storageDir);
