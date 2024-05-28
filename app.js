function openTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].style.backgroundColor = "";
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.style.backgroundColor = "#0056b3";
}


// Steganography in Image
function hideMessageInImage() {
    const fileInput = document.getElementById('imageFile');
    const message = document.getElementById('imageMessage').value;
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Encode the message length first
            const messageLength = message.length;
            if (messageLength > 255) {
                alert("Message is too long to be hidden in the image.");
                return;
            }
            data[0] = messageLength;

            // Encode the message
            for (let i = 0; i < messageLength; i++) {
                data[i * 4 + 4] = message.charCodeAt(i);
            }

            ctx.putImageData(imageData, 0, 0);
            alert("Message hidden in image.");
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
}

function revealMessageFromImage() {
    const fileInput = document.getElementById('imageFile');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Decode the message length first
            const messageLength = data[0];

            // Decode the message
            let message = '';
            for (let i = 0; i < messageLength; i++) {
                message += String.fromCharCode(data[i * 4 + 4]);
            }

            alert("Hidden message: " + message);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
}

function saveImage() {
    const canvas = document.getElementById('imageCanvas');
    const link = document.createElement('a');
    link.download = 'stego-image.png';
    link.href = canvas.toDataURL();
    link.click();
}
