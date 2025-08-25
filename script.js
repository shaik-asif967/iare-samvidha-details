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
    // Student photo URL format
    url = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${roll}/${roll}.jpg`;
  } else {
    // Certificate/documents URL format
    url = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${roll}/DOCS/${roll}_${type}.jpg`;
  }

  // Show result
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>Roll No: ${roll}</h3>
    <p>Document: ${type.replace(/_/g, " ")}</p>
    <a href="${url}" target="_blank">🔗 Open in New Tab</a>
    <br><img src="${url}" alt="Document Image" 
         onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Not+Found';">
  `;
});
