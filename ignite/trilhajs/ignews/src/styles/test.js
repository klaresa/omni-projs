function check(palavra) {
  let list = palavra.split('');
  let size = list.length;
  let cont = list.length;

  console.log('checking: ', list)

  while (cont > 1) {
    console.log(list)

    if (list[0] === list[size - 1]) {
      console.log('first :', list[0])
      console.log('last :', list[size - 1])

      list.shift()
      list.pop()
    }
    size = list.length;
    cont--;
  }

  if (list.length <= 1) {
    console.log('equal')
  } else {
    console.log('not equal')
  }
}

check('natan')
check('anna')
