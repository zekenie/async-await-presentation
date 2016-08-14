// https://gist.github.com/jakearchibald/31b89cba627924972ad6
// WITHOUT ERRORS
// function spawn(generatorFunc) {
//   function continuer(arg) {
//     var result;
//     result = generator.next(arg);
//     if (result.done) {
//       return result.value;
//     } else {
//       return Promise.resolve(result.value).then(onFulfilled);
//     }
//   }
//   var generator = generatorFunc();
//   var onFulfilled = continuer.bind(continuer);
//   return onFulfilled();
// }
// 
function spawn(generatorFunc) {
  function continuer(verb, arg) {
    var result;
    try {
      result = generator[verb](arg);
    } catch (err) {
      return Promise.reject(err);
    }
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(onFulfilled, onRejected);
    }
  }
  var generator = generatorFunc();
  var onFulfilled = continuer.bind(continuer, "next");
  var onRejected = continuer.bind(continuer, "throw");
  return onFulfilled();
}

function async(generatorFn) {
  return function() {
    const gen = generatorFn(...arguments);
    let promise = gen.next().value;
    while(!gen.done) {
        promise = promise
          .then(result => gen.next(result).value)
    }
    return promise;
  }
}


var dosomething = async(function* (a,b,c) {
  var users = yield Promise.resolve(1)
  var something = yield Promise.resolve(2);
})

dosomething(1,2,3).then(console.log).catch(console.error);