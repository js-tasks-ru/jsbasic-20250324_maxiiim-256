function getMinMax(str) {
  const newStr=[];
  str = str.split(' ');
  
  for(let i = 0; i < str.length; i+=1){
    if(Number(str[i])) newStr.push(str[i])
  };
  
  return {
    min: Math.min(...newStr),
    max: Math.max(...newStr)
  };
}