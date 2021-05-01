<body>
    <h1 style="text-align: center;">Uark Tour</h1>
    <br>
    <h3 style="text-align: center;"><a href="https://uark-tour-db-server.herokuapp.com/all">Link to our MongoDB API</a>
    </h3>
    <h3 style="text-align: center;">Steps to get project running locally</h3>
    <ol style="width: 50%; margin: 0 auto">
        <li>
            <h4>Download project to local machine</h4>
            <p>Download project and unzip it</p>
        </li>
        <li>
            <h4>Download Nodejs</h4>
            <p>You will need to download Nodejs on your machine, and make sure your system variables are updated. <a
                    href="https://nodejs.org/en/download/">Link to dwonload Nodejs</a> </p>
        </li>
        <li>
            <h4>Install expo on local machine</h4>
            <p>Run npm install -g expo-cli on computer terminal</p>
        </li>
        <li>
            <h4>Install dependicies for project</h4>
            <p>Navigate to the uark-tour folder on your terminal and run npm i</p>
        </li>
        <li>
            <h4>Create a .env file with API KEY</h4>
            <p>While in the uark-tour folder create a file called .env, then open this file and put in the next line <br>
                GOOGLE_API=(API KEY) <br> where the value of the API KEY will be email to you, or you can use your own google maps
                api key with directions enabled</p>
            </li>
            <li>
            <h4>Start project</h4>
            <p>While in the uark-tour folder on your terminal run npm start</p>
        </li>
        <li>
            <h4>Set app to tunnel</h4>
            <p>Once the app starts there will be a web page that opens this page will have multiple options. One option
                will be a network type, by default it is set to LAN. Select the tunnel option this will make it so you
                can use the app while on your phone data. Addtionally there will be a qr code that displays on this
                webpage, that will be needed in later steps</p>
        </li>
        <li>
            <h4>Download Expo Go on phone</h4>
            <p>On your phone navigate to the applicaiton store and search for Expo Go. Download the app</p>
        </li>
        <li>
            <h4>Run app on phone</h4>
            <p>Using the camera on your phone scan the qr code from the web page. this will load the application on your
                phone.</p>
        </li>
    </ol>

</body>