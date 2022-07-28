
export function displayTag(tagName) {
    document.getElementById(tagName).style.display = 'block';
}

export function hideTag(tagName) {
    document.getElementById(tagName).style.display = 'none';
}

export function disableButton(buttonName) {
    document.getElementById(buttonName).disabled = true;
}

export function enableButton(buttonName) {
    document.getElementById(buttonName).disabled = false; 
}

document.addEventListener('DOMContentLoaded', () => {
    
    // alert 
    document.getElementById('alert-btn').addEventListener('click', () => {
        displayTag('alert-dialog');
        disableButton('confirm-btn');
        disableButton('prompt-btn');
    });

    document.getElementById('alert-ok-btn').addEventListener('click', () => {
        hideTag('alert-dialog');
        enableButton('confirm-btn');
        enableButton('prompt-btn');
    });

    // confirm
    document.getElementById('confirm-btn').addEventListener('click', () => {
        displayTag('confirm-dialog');
        disableButton('alert-btn');
        disableButton('prompt-btn');
    });

    document.getElementById('confirm-ok-btn').addEventListener('click', () => {
        hideTag('confirm-dialog');
        document.getElementById('output-tag').innerHTML = 'The value returned by the confirm method is : true';
        enableButton('alert-btn');
        enableButton('prompt-btn'); 
    });

    document.getElementById('confirm-cancel-btn').addEventListener('click', () => {
        hideTag('confirm-dialog');
        document.getElementById('output-tag').innerHTML = 'The value returned by the confirm method is : false';
        enableButton('alert-btn');
        enableButton('prompt-btn');  
    });

    // prompt
    document.getElementById('prompt-btn').addEventListener('click', () => {
        displayTag('prompt-dialog');
        disableButton('alert-btn');
        disableButton('confirm-btn');
    });

    document.getElementById('prompt-ok-btn').addEventListener('click', () => {
        hideTag('prompt-dialog');
        
        let userInput = document.getElementById('name-input').value;
        
        let cleanUserInput = DOMPurify.sanitize(userInput); // clean user input

        if(cleanUserInput == null || cleanUserInput == '') {
           document.getElementById('output-tag').innerHTML = 'User did not enter anything'; 
        }
        else {
            document.getElementById('output-tag').innerHTML = 'User entered : ' + cleanUserInput; 
        }

        document.getElementById('name-input').value = '';

        enableButton('alert-btn');
        enableButton('confirm-btn');

    });

    document.getElementById('prompt-cancel-btn').addEventListener('click', () => {
        hideTag('prompt-dialog');

        document.getElementById('output-tag').innerHTML = 'User did not enter anything'; 
        
        document.getElementById('name-input').value = '';

        enableButton('alert-btn');
        enableButton('confirm-btn');
    });

});
