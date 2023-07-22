const firebaseConfig = {
    apiKey: "AIzaSyAhH6rNR5kk6idMgvp4MXcg272RRVggJhM",
    authDomain: "ksongie.firebaseapp.com",
    projectId: "ksongie",
    storageBucket: "ksongie.appspot.com",
    messagingSenderId: "301054294597",
    appId: "1:301054294597:web:dbb736d22a6bddc105c12c",
    measurementId: "G-0XT710NR2D"
};

firebase.initializeApp(firebaseConfig);

function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;
            console.log(user);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

// Line login
// JavaScript
function loginWithLine() {
    // ตั้งค่า Channel ID และ Channel Secret ที่ได้รับจาก LINE Developer
    const channelID = '2000195510';
    const channelSecret = 'b70c30ed9031a3cb0fa5d224429be49b';

    // ตั้งค่า callback URL ที่ LINE Login API ใน LINE Developer Console
    const callbackURL = 'http://localhost:5501/line_callback.html';

    // สร้าง URL สำหรับเปิดหน้าต่าง POPUP ของ LINE Login
    const lineLoginURL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelID}&redirect_uri=${encodeURIComponent(callbackURL)}&state=YOUR_STATE&scope=openid%20profile&nonce=YOUR_NONCE`;

    window.location = lineLoginURL;
}

function regis(params) {
    
}