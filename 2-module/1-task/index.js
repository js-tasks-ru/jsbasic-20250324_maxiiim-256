function sumSalary(obj){
  let result = 0; 

  for(let key in obj){
    if(Number.isInteger(obj[key])) result += obj[key];
  }

  return result;
};


