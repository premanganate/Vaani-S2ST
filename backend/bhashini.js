import axios from 'axios';
import { convertWavToBase64, base64ToWav } from './convertTobase64.js';
import fs from 'fs';

export default async function s2st(userId, apiKey, audioFP, src = 'en', target = 'ta', inputAudioFile = "input.wav", outputAudioFile = "output.wav") {
    try {
        console.log(src,target)
        const audioData = await convertWavToBase64(inputAudioFile);
        const audioBase64 = audioData["base64String"];
        const sampleRate = audioData["sampleRate"];
        
        const configUrl = 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline';
        const configHeaders = {
            "Content-Type": "application/json",
            "userID": userId,
            "ulcaApiKey": apiKey
        };
        const configPayload = {
            "pipelineTasks": [{
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": src
                    }
                }
            },
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": src,
                        "targetLanguage": target
                    }
                }
            },
            {
                "taskType": "tts",
                "config": {
                    "language": {
                        "sourceLanguage": target
                    }
                }
            }],
            "pipelineRequestConfig": {
                "pipelineId": "64392f96daac500b55c543cd"
            }
        };

        const configResponse = await axios.post(configUrl, configPayload, { headers: configHeaders });

        if (configResponse.status !== 200) {
            return {
                status_code: configResponse.status,
                message: "Error in translation request",
                translated_content: null
            };
        }

        const responseData = configResponse.data;
        const serviceId1 = responseData.pipelineResponseConfig[0].config[0].serviceId;
        const serviceId2 = responseData.pipelineResponseConfig[1].config[0].serviceId;
        const serviceId3 = responseData.pipelineResponseConfig[2].config[0].serviceId;
        const callbackUrl = responseData.pipelineInferenceAPIEndPoint.callbackUrl;
        const inferenceApiKey = responseData.pipelineInferenceAPIEndPoint.inferenceApiKey;

        const computeHeaders = {
            "Content-Type": "application/json",
            [inferenceApiKey.name]: inferenceApiKey.value
        };
        const computePayload = {
            "pipelineTasks": [{
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": src,
                    },
                    "serviceId": serviceId1,
                    "audioFormat": "wav",
                    "samplingRate": sampleRate
                }
            },
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": src,
                        "targetLanguage": target
                    },
                    "serviceId": serviceId2
                }
            },
            {
                "taskType": "tts",
                "config": {
                    "language": {
                        "sourceLanguage": target
                    },
                    "serviceId": serviceId3,
                    "gender": "male"
                }
            }],
            "inputData": {
                "audio": [
                    {
                        "audioContent": audioBase64
                    }
                ]
            }
        };

        const computeResponse = await axios.post(callbackUrl, computePayload, { headers: computeHeaders });

        if (computeResponse.status !== 200) {
            return {
                status_code: computeResponse.status,
                message: "Error in translation",
                translated_content: null
            };
        }

        const computeResponseData = computeResponse.data;
        const translatedAudioContent = computeResponseData.pipelineResponse[2].audio[0].audioContent;
        const translatedText = computeResponseData.pipelineResponse[1].output[0].target;

        base64ToWav(translatedAudioContent, outputAudioFile);

        return {
            status_code: 200,
            message: "Translation successful",
            translated_content: { translatedAudioFile: outputAudioFile, translatedText: translatedText }
        };
    } catch (error) {
        return {
            status_code: error.response ? error.response.status : 500,
            message: error.message,
            translated_content: null,
            e: error
        };
    }
}

// Example usage
/*
 (async () => {
    const result = await s2st(
        "222cde7638ca43c8a8fedca2f63369bd",
        "2205d5c2e9-2e4e-4acf-8d00-847f2d17bf9d",
        "test2base64.txt",
        "en",
        "ta",
        "test2.wav"
    );
    console.log(result);
})(); */