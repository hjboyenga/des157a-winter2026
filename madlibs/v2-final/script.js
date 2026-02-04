(function() {
    'use strict';
    console.log('reading js');

    const submitBtn = document.querySelector('#submit-btn');
    const madlib = document.querySelector('#madlib-answer');

    submitBtn.addEventListener('click', function(event){
        event.preventDefault();
        const yourFirstName = document.querySelector('#yourFirstName').value;
        const adj1 = document.querySelector('#adj1').value;
        const verb1 = document.querySelector('#verb1').value;
        const animal = document.querySelector('#animal').value;
        const adj2 = document.querySelector('#adj2').value;
        const noun = document.querySelector('#noun').value;
        const thingNoun = document.querySelector('#thingNoun').value;
        const verbing = document.querySelector('#verbing').value;

        let mytext; 
        if (yourFirstName == ''){
            mytext = "Please provide your Name";
            document.querySelector('#yourFirstName').focus();
        }
        else if (adj1 == ''){
            mytext = "Please provide an Adjective (describes something - ex: spooky, bright, weird)";
            document.querySelector('#adj1').focus();
        }
        else if (verb1 == ''){
            mytext = "Please provide a Verb (an action word - ex: dance, whisper, jump)";
            document.querySelector('#verb1').focus();
        }
        else if (animal == ''){
            mytext = "Please provide an Animal (ex: zebra, dolphin, dragon)";
            document.querySelector('#animal').focus();
        }
        else if (adj2 == ''){
            mytext = "Please provide an Adjective (describes something - ex: sparkly, mysterious, chaotic)";
            document.querySelector('#adj2').focus();
        }
        else if (noun == ''){
            mytext = "Please provide a Noun (a person, place, or thing - ex: rocket, tornado, pancake)";
            document.querySelector('#noun').focus();
        }
        else if (thingNoun == ''){
            mytext = 'Please provide a "Thing" Noun (an object you can hold - ex: spatula, tambourine, rubber duck)';
            document.querySelector('#thingNoun').focus();
        }
        else if (verbing == ''){
            mytext = 'Please provide a Verb ending in "-ing" (ex: dancing, screaming, backflipping)';
            document.querySelector('#verbing').focus();
        }
        else { 
            mytext = `The stadium fell ${adj1} silent. Even the wind refused to ${verb1}. From the tunnel emerged ${yourFirstName} draped in a cape patterned like a glowing ${animal}, eyes burning with pure passion. ${yourFirstName}'s spikes shimmered with a dangerously ${adj2} energy that suggested both speed and poor decision making. The gun fired. ${yourFirstName} launched forward like a ${noun}. Halfway through the race, they dramatically pulled a ${thingNoun} from their pocket, everyone took one look mid stride, and slowed down. The crowd gasped. Commentators fainted. ${yourFirstName} crossed the finish line while ${verbing} directly into destiny itself. Some say the track still remembers their footsteps. Others say it filed a restraining order.`;
        }
    madlib.style.display = 'block';
    setTimeout(function() {window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });}, 100);
        madlib.innerHTML = mytext;
        document.querySelector('#yourFirstName').value = '';
        document.querySelector('#adj1').value = '';
        document.querySelector('#verb1').value = '';
        document.querySelector('#animal').value = '';
        document.querySelector('#adj2').value = '';
        document.querySelector('#noun').value = '';
        document.querySelector('#thingNoun').value = '';
        document.querySelector('#verbing').value = '';
    });
})();