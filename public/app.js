const buttonIds = ['wakeUpTime', 'goToBedTime', 'napTime', 'sleepNotes'];

buttonIds.forEach((buttonId) => {
    logSleepTime(buttonId);
});

function logSleepTime(buttonId) {
    document.getElementById(buttonId).addEventListener('click', function () {
        let currentTime = new Date();
        console.log({ currentTime })

        fetch('/sleep-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"dataType": buttonId})
        })
            .then(response => response.json())
            .then(data => {
                alert('Success:', data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}

document.getElementById('getScreenWidth').addEventListener('click', function() {
    var screenWidth = window.innerWidth;
    console.log('Screen width: ' + screenWidth);
    
    // Send screenWidth to your server here.
    // This depends on your server setup. An example using fetch:
    fetch('screen-width', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ width: screenWidth }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
});

