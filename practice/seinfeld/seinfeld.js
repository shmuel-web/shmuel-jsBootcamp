/*
 The Seinfeld Task
 Kramer: 'Yo Yo Ma.'
 George: 'I'm speechless. I have no speech'
 Jerry: 'You know, it's so nice when it happens good'
 Elaine: 'Ugh, I hate people'
 */

function Character(firstname, lastname, catchFraze) {
    if (!catchFraze){
        catchFraze = 'ERROR missing catch fraze';
    }
    this.firstname = firstname || 'ERROR missing first name';
    this.lastname = lastname || 'ERRORmissing last name';
    this.saySomething = function () {
        console.log(catchFraze);
    }
}

var kramer = new Character('cosmo', 'kramer','Yo Yo Ma.');

var george = new Character('george', 'kostanza', 'I\'m speechless. I have no speech');

var jerry = new Character('jerry', 'seinfeld', 'You know, it\'s so nice when it happens good');

var elaine = new Character('elaine', 'benyse', 'Ugh, I hate people');

var characters = [kramer, george, jerry, elaine];



characters.forEach(function (charcter) {
    console.log('my name is ' + charcter.firstname, charcter.lastname);
    charcter.saySomething();
});
