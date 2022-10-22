
$( ()=> {
 getData('EPF',(data)=>{
     Pi("epf-pi",[data.summary.employeeBalance, data.summary.employerBalance],["employee","employer"])
     Bar("epf-bar",[data.summary.employeeBalance, data.summary.employerBalance],["employee","employer"])
     insert("epf-cb",data.summary.currentBalance)
     insert("epf-tb",data.summary.totalBalance)
    })


getData('PPF',(data)=>{
    insert("ppf-cb",data.summary.currenBalance)
    insert("ppf-md",data.summary.maturityDate)
    })
})
