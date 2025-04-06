function showSalary(users, age) {
  let newStr = '';
  
 for(const user of users){
   if(user.age <= age) newStr += `${user.name}, ${user.balance}\n`
 }
  newStr = newStr.slice(0, -1);
return newStr;
}
