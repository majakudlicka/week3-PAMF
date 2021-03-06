
module('giphy API');
test('banned words handling', (assert) => {
    var result = guessMovieApp.bannedWords({
        name: 'Lord of the rings From Rocks'
    }, function(err, res){
      var expected = ['lord', 'OF', 'THE', 'rings', 'FROM', 'rocks'];
      assert.deepEqual(res.gifs, expected, 'app recognizes banned words array');
    });


});

test('test that Giphy.buildURL creates a valid Giphy url', (assert) => {
  var result = Giphy.buildURL("lord");
  console.log(result);
  var expected = "https://api.giphy.com/v1/gifs/search?q=lord";
  assert.ok(result.includes (expected));
  result = Giphy.buildURL("finn");
  console.log(result);
  expected = "https://api.giphy.com/v1/gifs/search?q=finn";
  assert.ok(result.includes(expected));
});

test('test that conditionalArrayMapApply function outputs the right array accoring to the condition', (assert) => {
  var arr = [1,2,'hello', 'world'];
  var ifthis = Number.isInteger;
  var thenthis = function(n){
    return "number";
  };
  var elsethis = function(n){
    return "string";
  };
  var result = Giphy.conditionalArrayMapApply(arr, ifthis, thenthis, elsethis);
  var expected = ["number", "number", "string", "string"];
  assert.deepEqual(result, expected);

  result = Giphy.conditionalArrayMap(arr, ifthis, thenthis, elsethis);
  expected = [thenthis, thenthis, elsethis, elsethis];
  assert.deepEqual(result, expected);
});

test('check that waterfall with args corretly outputs an array with results from each task in order, even if it\'s asynchronous', (assert) => {
  var done = assert.async();
  var add1 = function (arg, cb) {
    cb(null, arg + 1);
  };

  var add2 = function (arg, cb) {
    setTimeout(function() {
      cb(null, arg + 2);
    }, 100);
  };

  var args = [1, 2, 3, 4, 5];
  var tasks = [add1, add2, add1, add2, add2];

  var result = null;
  var expected = [2, 4, 4, 6, 7];

  Giphy.waterfallWithArgs(args, tasks, function (err, resp) {
    result = resp;
    assert.deepEqual(result, expected, 'runs the tasks in the correct order with the correct arguments');
    done();
  });

});

module('MOVIEDB function');
test('tests that random number function returns a random number between 1 and 50 when n=50', (assert) => {
    var result = (MovieDB.random(50) > 0 && MovieDB.random(50) < 51);
    assert.ok(result);
});

test('tests that random number function returns a random number between 1 and 20 when n=20', (assert) => {
    var result = (MovieDB.random(20) > 0 && MovieDB.random(20) < 21);
    assert.ok(result);
});

module('Element creation')
test("test that first p elements have the class 'columns'", (assert) => {
    result = createElements.create('p', 'columns', null, 'https://www.hello.com/img_/hello_logo_hero.png').className;
    expected = 'columns';
    assert.equal(result, expected);
});
test("test that an images are created", (assert) => {
    result = createElements.create('img', 'columns', null, 'https://www.hello.com/img_/hello_logo_hero.png').tagName === 'IMG';
    assert.ok(result);
});
test("test that innerHTML is being created on new element", (assert) => {
    result = createElements.create('p', 'columns', 'hello', 'https://www.hello.com/img_/hello_logo_hero.png').innerHTML;
    expected = 'hello';
    assert.equal(result, expected);
});
test("test that image has the right src", (assert) => {
    result = createElements.create('p', 'columns', null, 'https://www.hello.com/img_/hello_logo_hero.png').src;
    expected = 'https://www.hello.com/img_/hello_logo_hero.png'

    ;
    assert.equal(result, expected);
});
