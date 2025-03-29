function ucFirst(str) {
  if(str.length >= 1){
    newStr = str[0].toUpperCase() + str.slice(1);
    return newStr;
  }
  else{
    str.toUpperCase();
    return str;
  }
}
