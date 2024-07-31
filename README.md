# Vaani-S2ST

This project provides a speech-to-speech translation service between Tamil and English using a web interface. The user can choose their desired Source and Target Language, and then hold the microphone icon on the web interface and speak into it. Our interface will then return the translated audio as well as text. This project has been developed using Government of India's Bhashini API and received the 1st Runner Up prize at the TechEthos Software Engineering Hackathon conducted at VIT Chennai. 

## Table of Contents
1. [Frontend Setup](#frontend-setup)
    - [Modules Used](#frontend-modules-used)
    - [Setup Instructions](#frontend-setup-instructions)
    - [Usage](#frontend-usage)
2. [Backend Setup](#backend-setup)
    - [Modules Used](#backend-modules-used)
    - [Setup Instructions](#backend-setup-instructions)
    - [Usage](#backend-usage)
3. [Connecting Frontend and Backend](#connecting-frontend-and-backend)
4. [Additional Notes](#additional-notes)

## Frontend Setup

### Frontend Modules Used
- `react`
- `react-dom`
- `axios`
- `font-awesome` (CDN link in `public/index.html`)

### Frontend Setup Instructions

1. **Create a new React project:**
    ```bash
    npx create-react-app frontend
    cd frontend
    ```

2. **Install necessary dependencies:**
    ```bash
    npm install axios
    ```

3. **Replace `src/App.js` and `src/App.css` with the provided files from frontend.zip**

4. **Add FontAwesome to `public/index.html`:** <br>
If you want to use FontAwesome Module instead of linking it using javascript refer to this link  https://docs.fontawesome.com/v5/web/use-with/react/

### Frontend Usage

1. **Start the development server:**
    ```bash
    npm start
    ```

2. **Access the app in your browser at `http://localhost:3000`.**

## Backend Setup

### Backend Modules Used
- `express`
- `multer`
- `cors`

### Backend Setup Instructions
1. **Create an account to use bhasini API**
   https://bhashini.gov.in/ulca/user/login

2. **Create a new Node.js project:**
    ```bash
    mkdir backend
    cd backend
    npm init -y
    ```

3. **Modify package.json**
   ```bash
   // Let the first 4 elements in object be like this
    "name": "backend",
    "version": "1.0.0",
    "main": "index.js",
    "type": "module",
   ```

4. **Install necessary dependencies:**
    ```bash
    npm install express multer cors
    ```

5. **Create the following files:**
    - `index.js`
    - `bhashini.js`
    - `convertTobase64.js`

6. **Replace the contents of these files with the provided code from backend.zip**

### Backend Usage

1. **Start the server:**
    ```bash
    node index.js
    ```

2. **The server will run on port 3005. Ensure this port is not in use.**

## Additional Notes

- Ensure both frontend and backend servers are running concurrently.
- Adjust CORS settings if deploying to different domains.
- Ensure you have `ffmpeg` installed on your server if required for audio processing.

வாணி-S2ST
=========

இந்த திட்டம் வலை இடைமுகத்தைப் பயன்படுத்தி பேசுதல்-மூலம்-பேசுதல் மொழிபெயர்ப்பு சேவையை வழங்குகிறது. முன்புறம் React உடன் கட்டப்பட்டுள்ளது, பின்னணி Express ஐ பயன்படுத்துகிறது.

உள்ளடக்க அட்டவணை
----------------

1.  [முன்புற அமைப்பு](#frontend-setup)
    
    *   [பயன்படுத்தப்பட்ட மாட்யூல்கள்](#frontend-modules-used)
        
    *   [அமைப்பு வழிமுறைகள்](#frontend-setup-instructions)
        
    *   [பயன்பாடு](#frontend-usage)
        
2.  [பின்னணி அமைப்பு](#backend-setup)
    
    *   [பயன்படுத்தப்பட்ட மாட்யூல்கள்](#backend-modules-used)
        
    *   [அமைப்பு வழிமுறைகள்](#backend-setup-instructions)
        
    *   [பயன்பாடு](#backend-usage)
        
3.  [முன்புறம் மற்றும் பின்னணி இணைத்தல்](#connecting-frontend-and-backend)
    
4.  [கூடுதல் குறிப்புகள்](#additional-notes)
    

முன்புற அமைப்பு
---------------

### முன்புறம் பயன்படுத்தப்பட்ட மாட்யூல்கள்

*   react
    
*   react-dom
    
*   axios
    
*   font-awesome (public/index.html இல் CDN இணைப்பு)
    

### முன்புற அமைப்பு வழிமுறைகள்

1.  bashCopy codenpx create-react-app frontendcd frontend
    
2.  bashCopy codenpm install axios
    
3.  **src/App.js மற்றும் src/App.css ஐ frontend.zip இல் உள்ள கோப்புகளுடன் மாற்றவும்**
    
4.  **public/index.html இல் FontAwesome ஐச் சேர்க்கவும்:**  
    FontAwesome மாட்யூலை javascript ஐ பயன்படுத்தி இணைப்பதற்குப் பதிலாக இதைப் பயன்படுத்த [https://docs.fontawesome.com/v5/web/use-with/react/](https://docs.fontawesome.com/v5/web/use-with/react/) இல் உள்ளதைக் குறிக்கவும்
    

### முன்புறம் பயன்பாடு

1.  bashCopy codenpm start
    
2.  **உங்கள் உலாவியில் http://localhost:3000 இல் பயன்பாட்டை அணுகவும்.**
    

பின்னணி அமைப்பு
---------------

### பின்னணி பயன்படுத்தப்பட்ட மாட்யூல்கள்

*   express
    
*   multer
    
*   cors
    

### பின்னணி அமைப்பு வழிமுறைகள்

1.  **bhasini API ஐ பயன்படுத்த கணக்கொன்றை உருவாக்கவும்**[https://bhashini.gov.in/ulca/user/login](https://bhashini.gov.in/ulca/user/login)
    
2.  bashCopy codemkdir backendcd backendnpm init -y
    
3.  bashCopy code// முதல் 4 கூறுகளை இவ்வாறு வைத்திருக்கவும் "name": "backend", "version": "1.0.0", "main": "index.js", "type": "module",
    
4.  bashCopy codenpm install express multer cors
    
5.  **பின்வரும் கோப்புகளை உருவாக்கவும்:**
    
    *   index.js
        
    *   bhashini.js
        
    *   convertTobase64.js
        
6.  **இந்த கோப்புகளின் உள்ளடக்கங்களை backend.zip இல் உள்ள கோடுடன் மாற்றவும்**
    

### பின்னணி பயன்பாடு

1.  bashCopy codenode index.js
    
2.  **சேவையகம் port 3005 இல் இயங்கும். இந்த port பயன்படுத்தப்படவில்லை என உறுதிசெய்யவும்.**
    

கூடுதல் குறிப்புகள்
-------------------

*   முன்புறம் மற்றும் பின்னணி சேவையகங்கள் இரண்டும் ஒன்றாக இயங்குவதை உறுதிசெய்யவும்.
    
*   வெவ்வேறு இடங்களில் பயன்படுத்த CORS அமைப்புகளை சரிசெய்யவும்.
    
*   உங்கள் சேவையகத்தில் ஆடியோ செயலாக்கத்திற்கு ffmpeg நிறுவியிருக்க வேண்டும்.
