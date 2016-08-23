function* fibonacci(){
  var fn1 = 0;
  var fn2 = 1;
  while (true){  
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    yield current;
  }
}

const fibGen = fibonacci();

console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
