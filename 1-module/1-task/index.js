function factorial(n) {
  let result = n;
  
  if((result === 1) || (result === 0)) {
    result = 1;
    return result;
  }
  else{

    for (let i = 0; i < n; i++){
      n -=1;
      result *= n;
    };

  };
 
 return result;
}


