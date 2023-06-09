const addPictureButton = document.getElementById("add-picture");
const downloadLink = document.getElementById("download-link");
const toggleColor = document.getElementById("toggle-color");
const uploadPictureFirst = document.getElementById("first");
let queuedImagesArray = [],
	savedForm = document.querySelector("#saved-form"),
	queuedForm = document.querySelector("#queued-form"),
	savedDiv = document.querySelector(".saved-div"),
	queuedDiv = document.querySelector(".queued-div"),
	inputDiv = document.querySelector(".input-div"),
	input = document.querySelector(".input-div input"),
	serverMessage = document.querySelector(".server-message"),
	deleteImages = [];
let crossColor = "red";

toggleColor.addEventListener("change", function () {
  crossColor = this.checked ? "orange" : "red";
});

addPictureButton.addEventListener("click", function () {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;
      img.onload = function () {
        const modifiedImg = addCross(img, crossColor);
        downloadLink.href = modifiedImg;
        downloadLink.click();
      };
    };
  };
  input.click();
});

function addCross(img, color) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width, 0);
  ctx.stroke();
  return canvas.toDataURL("image/jpeg");
}

input.addEventListener("change", () => {
  const files = input.files
  for(let i = 0; i < files.length; i++) {
    queuedImagesArray.push(files[i])
  }
  queuedForm.reset()
  displayQueuedImages()
});

