function camelize(str){
  let newStr = str.split('-');
  
  for(let i = 1; i < newStr.length; i += 1 ){
  newStr[i] = newStr[i].split('')
  newStr[i][0] = newStr[i][0].toUpperCase();
  newStr[i] = newStr[i].join('');
  }
  
  newStr = newStr.join('');

  return newStr
}
