
var jwt=localStorage.getItem("jwt")
const check=()=>{
fetch(`https://bridge-test-api.herokuapp.com/checklogin`,
    {
        method:'get',
        mode:'cors',
        credentials: 'same-origin',
        headers: {"Content-type": "application/json; charset=UTF-8","x-access-token":jwt},
    }
    ).then((resp)=>resp.json())
    .then((resp)=>{
            {
               console.log(resp)
               if(resp.wait!=true)
               window.location.href="https://ansuman528.github.io/VisualPe/index.htl"
                window.setTimeout(check,3000)
            }
        })
    .catch(()=>{ 
    })
}
check()