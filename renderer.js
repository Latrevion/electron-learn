const info = document.getElementById("info");
const fs = window.require('fs')

info.innerHTML = `Chrome (v${window.versions.chrome}),Node.js(v${window.versions.node})`;

const btn = document.getElementById("btn");
const titleInput = document.getElementById("title");
const btn2 = document.getElementById("btn2");
const contentInput = document.getElementById("content");
const counter = document.getElementById("count");
btn.addEventListener("click", () => {
  const title = titleInput.value;
  window.electron.setTitle(title);
});
btn2.addEventListener("click", async () => {
  const content = contentInput.value;
  const len = await window.electron.writeFile(content);
  console.log(len);
  info.innerHTML = `File Size: ${len}`;
  const theFile = await fs.promises.readFile("test.txt", {
    encoding: "utf-8",
  });
  info.innerHTML += `File content : ${theFile}`;
});

window.electron.onUpdateCount((value) => {
  counter.innerText = value.toString();
});
