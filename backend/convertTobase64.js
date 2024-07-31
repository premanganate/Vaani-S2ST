import fs from 'fs';
import wavDecoder from 'wav-decoder';

//const path = require('path');

// Function to convert a WAV file to a base64 string


export async function convertWavToBase64(filePath) {
  // Read the file as a buffer
  const fileBuffer = fs.readFileSync(filePath);
    var sampleRate = 48000; 
  try{
    let audioData = await wavDecoder.decode(fileBuffer);
  
      // Return the sampling rate
      sampleRate = audioData.sampleRate;
  }

  catch (error){
    console.error("Error getting samplign rate: ", error);
  }
  console.log("Sample rate: ", sampleRate);


  // Convert the buffer to a base64 string
  const base64String = fileBuffer.toString('base64');

  return {"base64String" : base64String, "sampleRate": sampleRate};
}    
export function base64ToWav(base64Content, outputFilePath) {
    // Remove the base64 header if present
    if (base64Content.includes(',')) {
        base64Content = base64Content.split(',')[1];
    }

    // Decode the base64 content to binary data
    const binaryData = Buffer.from(base64Content, 'base64');

    // Write the binary data to a .wav file
    fs.writeFileSync(outputFilePath, binaryData, 'binary');
    console.log("File saved to ${outputFilePath}");
}





// Example usage
//const filePath = path.join(__dirname, 'example.wav'); // Replace with your WAV file path
// const base64String = convertWavToBase64('test.wav');

// console.log('Base64 String:', base64String);
