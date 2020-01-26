var webPush = require('web-push');
const vapidKeys ={
    "publicKey": "BLCLF2gb_aXZiv3YpXlPkUFFIPBNfd315pbWPAJvA5vPVmhsqcY5Ig9tNvE4iLs6cSop-E9APp_aLFgqKwJIAag",
    "privateKey": "L13LjWaFBss4SkX0HbQX-yAs7bJHSZBBRPiIlZcBtlk"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fhR5i79HRU0:APA91bHtqRBykMalUiu2wv4_qypFBG47wx8cE-sX9iqcX2a1Z8KSGAfIAutQkY9Mu7wiGDhqSMEUNY9Qe0WoHBVrSGA1tN4q1_JMy1W-X-M-ehkNxbYtTWVjkY2twZ9zDulWsZUFWW8T",
    "keys": {
        "p256dh": "BJT7T+ehDNI7+H0wrkIXuqwSsWzUpcGIitp9/PhSvQCylNooYljNti+56cRIro8O4ES1yaE8ZPptbliUIGVUAxk=",
        "auth": "loo02sXXkMSaMwhF4qFpGQ=="
    }
};

var payload = 'Selamat! Aplikasi anda sudah dapat menerima push notifikasi';
var options = {
    gcmAPIKey: '963345478251',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
)
.catch(function(err){
    console.log(err);
});