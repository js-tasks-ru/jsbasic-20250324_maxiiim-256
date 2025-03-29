function truncate(str, maxlength) {
let newStr = null;
if(str.length > maxlength){
  newStr = str.slice(0, maxlength - 1) + "…";
  return newStr;
}
else return str;
}
