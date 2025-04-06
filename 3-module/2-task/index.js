function filterRange(arr, a, b){
  const filt = []
  for (const value of arr){
    if(value >= a && value <= b) filt.push(value);
  }
  return filt;
}

