let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
};



function sumSalary(obj){
  // при попытке не использовать временную переменную, а добавить свойство к объекту
  // и складывать к нему obj[key] получаю на выходе либо NaN, либо 7800
  let result = null; 

  for(let key in obj){
    if(Number.isInteger(obj[key])) result += obj[key];
  }

  if (result !== null) return result;

  return 0;
};


