const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const mergeButton = document.getElementById('merge');
const downloadLink = document.getElementById('download');
const resultCanvas = document.getElementById('result');
const resultCtx = resultCanvas.getContext('2d');

function mergeImages() {
  const img1 = new Image();
  const img2 = new Image();
  img1.onload = function() {
    img2.onload = function() {
      const avgHeight = (img1.height + img2.height) / 2;
      const scale1 = avgHeight / img1.height;
      const scale2 = avgHeight / img2.height;
      const width = img1.width * scale1 + img2.width * scale2 + 6; // Add 6 pixels for the border
      const height = avgHeight + 6; // Add 6 pixels for the border
      resultCanvas.width = width;
      resultCanvas.height = height;
      resultCtx.fillStyle = 'white'; // Set the fill color to white for the border
      resultCtx.fillRect(0, 0, width, height); // Fill the entire canvas with white
      resultCtx.drawImage(img1, 3, 3, img1.width * scale1, avgHeight); // Draw the first image with 3 pixel offset for border
      resultCtx.drawImage(img2, img1.width * scale1 + 6, 3, img2.width * scale2, avgHeight); // Draw the second image with 3 pixel offset for border
      // Draw the right border
      resultCtx.fillStyle = 'white';
      resultCtx.fillRect(width - 3, 0, 3, height);
      downloadLink.href = resultCanvas.toDataURL('image/jpg');
      downloadLink.style.display = 'block';
    };
    img2.src = URL.createObjectURL(image2.files[0]);
  };
  img1.src = URL.createObjectURL(image1.files[0]);
}

mergeButton.addEventListener('click', mergeImages);
