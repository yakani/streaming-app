
const Check = async ()=>{
let authuser =  JSON.parse(localStorage.getItem('auth')) ||{auth:false};
const save  =  ()=>{
    localStorage.setItem('auth',JSON.stringify(authuser));
}
    try {
      const res = await  fetch(`${import.meta.env.VITE_Api}user`,{
            credentials:'include'
        });
        if(!res.ok){
            throw new Error('Failed to fetch data');
        }
        if(res.ok){
            authuser = {auth:true};
            save(); 
        }
    } catch (error) {
        console.log(error);
        authuser = {auth:false};
        save();
    }
    save();
}
export default  Check