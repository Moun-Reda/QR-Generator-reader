let generator = document.getElementById("generate");
let reader = document.getElementById("read");
let closebtn = document.querySelectorAll(".close");
let textInput = document.querySelector(".input-text");
let generateBtn = document.getElementsByClassName("generate");
let resutlOfGenerating = document.querySelector(".resultOfGenerating");
let outQR = document.querySelector(".the-qr");
let dawnloadBtn = document.getElementsByClassName("dawnload");
let imgInput = document.querySelector(".input-img");
let resultOfreading = document.querySelector(".resultOfReading");
let readingOutput = document.querySelector(".qr-result");
let copyBtn = document.querySelector(".copy");
let fileInput = document.getElementById("qr-upload");
let uploadLabel = document.querySelector(".upload-label");

function appearGenrator() {
  generator.style.display = "flex";
  reader.style.display = "none";
}

function appearReader() {
  reader.style.display = "flex";
  generator.style.display = "none";
}

function Close() {
  reader.style.display = "none";
  generator.style.display = "none";
  resutlOfGenerating.style.display = "none";
  outQR.src = null;
  textInput.value = "";
  resultOfreading.style.display = "none";
  uploadLabel.textContent = "Upload QR Code Image To Read";
  readingOutput.innerHTML = "";
}

let qrimg = "";
function generate() {
  let inputvalue = textInput.value;
  if (inputvalue.trim()) {
    qrimg = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputvalue}`;
    outQR.src = qrimg;
    outQR.alt = "QR Code";
    resutlOfGenerating.style.display = "flex";
  } else {
    textInput.placeholder = "Enter a valid text or URL.";
    outQR.src = null;
    resutlOfGenerating.style.display = "none";

    return;
  }
}

function dawnloadImg() {
  if (qrimg) {
    fetch(qrimg)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
}

fileInput.addEventListener("change", () => {
  const fileName = fileInput.files[0]?.name || "choose a file";
  uploadLabel.textContent = fileName;
});

function scanQR() {
  let file = imgInput.files[0];
  if (!file) {
    uploadLabel.textContent = "choose a file";
    return;
  }
  let formData = new FormData();
  formData.append("file", file);

  fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      resultOfreading.style.display = "flex";
      readingOutput.innerHTML =
        data[0].symbol[0].data || "Couldn't read the QR Code";
    })
    .catch(() => {
      resultOfreading.style.display = "flex";
      readingOutput.innerHTML = "Couldn't read the QR Code";
    });
}

function copyToClipboard() {
  navigator.clipboard.writeText(readingOutput.innerHTML);
}
