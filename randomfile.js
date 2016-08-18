function baz() {
  2 + 23
  4 + 55
  console.log('foo');
}

function foo() { baz(); }

function bar() { foo(); }

bar();

bar();

bar();