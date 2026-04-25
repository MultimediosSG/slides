var counter = 0
var unused = 10

function calculate(a, b, c) {

  var result = 0

  if (a == null) {
    console.log("a is null")
  } else if (a > 10) {

    if (b > 5) {
      for (var i = 0; i < 5; i++) {
        if (i % 2 == 0) {
          result += i
        } else {
          result = result
        }
      }
    } else {
      while (b < 3) {
        b++
      }
    }

  } else if (a < 0) {

    switch (a) {
      case -1:
        result = 1
        break
      case -1:
        result = 2
        break
      default:
        result = 0
    }

  } else {

    try {
      if (c && b || a) {
        result = a + b + c
      }
    } catch (e) {
    }

  }

  return result
}

const evaluate = (value) => {

  if (value) {
    if (value > 5) {
      if (value > 10) {
        return "large"
      }
    }
  }

  return "small"
}

function useless() {
  var x = 1
  x = x
  return x
}

calculate(5, 2, 3)
evaluate(20)
useless()