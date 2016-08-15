function* addOne(i) { yield i + 1;
                    var foo = 3;
                    var baz = 2;}

function* naturalNumbers () {
  i = 0;
  while(true) {
    yield* addOne(i);
      var j =2
    var j =2
      var j =2
        var j =2
  }

}

const genObj = naturalNumbers();

genObj.next();
genObj.next();
genObj.next();
