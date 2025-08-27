# QR Code Generator & Reader

This is a web-based application that allows users to generate QR codes from text or URLs, upload QR code images to decode their contents, download generated QR codes, and copy scanned results to the clipboard. It is built using HTML, CSS, and JavaScript, and integrates with the QRServer API for both generation and decoding.

## Features

- Generate QR codes from any text or URL
- Upload QR code images and decode their contents
- Download generated QR codes as PNG files
- Copy decoded results to clipboard
- Responsive and accessible user interface

## Technologies Used

- HTML5 and CSS3 for structure and styling
- JavaScript (Vanilla) for interactivity and API integration
- QRServer API for QR code generation and decoding

## API Endpoints

### Generate QR Code
GET https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YOUR_TEXT

### Read QR Code from Image
POST https://api.qrserver.com/v1/read-qr-code/
FormData: { file: uploaded_image }

## How It Works

- QR Generation: The user enters text or a URL, which is sent to the QRServer API. The returned image is displayed and can be downloaded.
- QR Reading: The user uploads an image file. The image is sent to the QRServer API, which returns the decoded content. The result is displayed and can be copied to the clipboard.

## Challenges Faced

1. Handling Multiple DOM Elements  
Initially, I used getElementsByClassName, which returns a collection. This caused issues when trying to access .value or .style directly. I resolved this by switching to querySelector for single elements and querySelectorAll when looping through multiple.

2. Downloading QR Images  
I wanted users to choose where to save the QR code image. Using a temporary <a> element with download and URL.createObjectURL(blob) allowed me to trigger the browser's native "Save As" dialog.

3. Reading QR Images via API  
Integrating the QRServer Read API required converting the uploaded image into FormData and handling the JSON response. I added error handling to display fallback messages when decoding fails.

4. UI Feedback and Reset  
Managing the visibility of sections and resetting inputs after actions was essential for a clean user experience. I created a Close() function to reset all states and hide unnecessary elements.

## Author
Created by Moun — Intelligent Systems student focused on web development and AI integration.
