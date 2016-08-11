

function* naturalNumbers() {
  let i = 0;
  while(true){ 
    yield i++
  }
}

const gen = naturalNumbers();

gen.next();
gen.next();
gen.next();
gen.next();



