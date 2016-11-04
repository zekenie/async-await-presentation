function State(ageLimit) { 
  this.ageLimit = ageLimit;
}

function Drinker(age, state) {
  this.age = age;
  this.state = state;
}

Drinker.prototype.isEligible = function() {
  return this.age >= this.state.ageLimit;
};

function filterEligibleDrinkers(people) {
  return people.filter(function(person) {
    return person.isEligible();
  });
}

var ny = new State(21);
var il = new State(21);
var jersey = new State(16); // just kidding...

var drinkers = [ new Drinker(12, ny),
                 new Drinker(45, il),
                 new Drinker(23, jersey),
                 new Drinker(67, ny),
                 new Drinker(11, il),
                 new Drinker(13, jersey),
                 new Drinker(45, il) ];

filterEligibleDrinkers(drinkers);