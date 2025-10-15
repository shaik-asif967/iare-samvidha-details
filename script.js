const form = document.getElementById("docForm");
const resultBox = document.getElementById("resultBox");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const roll = document.getElementById("rollNo").value.trim();
  const type = document.getElementById("docType").value;

  if (!roll || !type) {
    alert("Please enter Roll No and select a document.");
    return;
  }

  let url = "";

  if (type === "PHOTO") {
    url = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${roll}/${roll}.jpg`;
  } else if (type === "FIELDPROJECT") {
    // Field project report (PDF)
    url = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/FIELDPROJECT/2024-25_${roll}_FM.pdf`;
  } else {
    // Certificate/documents URL
    url = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${roll}/DOCS/${roll}_${type}.jpg`;
  }

  resultBox.style.display = "block";

  // If it's a PDF, embed it
  if (url.endsWith(".pdf")) {
    resultBox.innerHTML = `
      <h3>Roll No: ${roll}</h3>
      <p>Document: ${type.replace(/_/g, " ")}</p>
      <a href="${url}" target="_blank">🔗 Open PDF in New Tab</a>
      <br><iframe src="${url}" width="100%" height="400px" style="border-radius:10px; margin-top:10px;"></iframe>
    `;
  } else {
    resultBox.innerHTML = `
      <h3>Roll No: ${roll}</h3>
      <p>Document: ${type.replace(/_/g, " ")}</p>
      <a href="${url}" target="_blank">🔗 Open in New Tab</a>
      <br><img src="${url}" alt="Document Image" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Not+Found';">
    `;
  }
});
