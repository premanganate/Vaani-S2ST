import React, { useRef, useState } from 'react';
import axios from 'axios';
import WavEncoder from 'wav-encoder';
import './App.css';

const AudioRecorder = () => {
  const [recordedUrl, setRecordedUrl] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTamilToEnglish, setIsTamilToEnglish] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      console.log("Starting recording...");
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        console.log("Stopping recording...");
        const recordedBlob = new Blob(chunks.current, { type: 'audio/wav' });
        const arrayBuffer = await recordedBlob.arrayBuffer();
        const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
        const wavArrayBuffer = await WavEncoder.encode({
          sampleRate: audioBuffer.sampleRate,
          channelData: [audioBuffer.getChannelData(0)]
        });
        const wavBlob = new Blob([wavArrayBuffer], { type: 'audio/wav' });
        chunks.current = [];

        // Send the WAV file to the backend
        sendAudioFile(wavBlob);
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const sendAudioFile = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'recording.wav');
    formData.append('translationDirection', JSON.stringify(isTamilToEnglish ? { src: 'ta', target: 'en' } : { src: 'en', target: 'ta' }));

    try {
      const response = await axios.post('http://localhost:3005/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { translatedText, audioPath } = response.data;

      setTimeout(()=>{
        console.log(audioPath)
        setTranslatedText(translatedText);
        setRecordedUrl(`http://localhost:3005${audioPath}`);

        console.log('File uploaded and translated successfully');
      },1000)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='container'>
      <div className="greeting-message">Hi, I am வாணி. What can I translate for you today?</div>
      {recordedUrl && (<audio controls src={recordedUrl} />)}
      {translatedText && (
        <div>
          <p className='text'>{translatedText}</p>
        </div>
      )}
      <div className="translation">
        <button
          className={`translation-button ${!isTamilToEnglish ? 'active' : ''}`}
          onClick={() => { console.log('Switching to English to Tamil'); setIsTamilToEnglish(false); }}
        >
          English - Tamil
        </button>
        <button
          className={`translation-button ${isTamilToEnglish ? 'active' : ''}`}
          onClick={() => { console.log('Switching to Tamil to English'); setIsTamilToEnglish(true); }}
        >
          Tamil - English
        </button>
      </div>
      <button
        className="microphone-button"
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
      >
        <i className={`fa-solid ${isRecording ? 'fa-ear-listen' : 'fa-microphone'} microphone-icon`}></i>
      </button>
    </div>
  );
};

export default AudioRecorder;