export const getRandom=(seed=100)=>{
  console.log('seed',seed);
  return Math.round(Math.random()*seed)
}
