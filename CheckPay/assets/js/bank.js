var deposit =""

const Commas=(x)=> {
    return x.toString().replace("-", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const num=(x)=>{
    return parseFloat(x)
}

  const updateDeposit=()=>{
    cnt=0
    debit=0
    credit=0
    upi=0
    noupi=0
    for (i of deposit.Payload[0].data){
        if($("#bank-list > input[type=checkbox]").get(cnt).checked)
            for(j of i.decryptedFI.account.transactions.transaction){
                let amt= num(j.amount)
                if(j.type=="CREDIT")credit+=amt
                if(j.type=="DEBIT")debit+=amt
                if(j.narration.substring(0,3)=="UPI")upi+=amt
                else noupi+=amt
            }
        cnt++
    }
    credit=credit.toFixed(2)
    debit=debit.toFixed(2)
    Pi("dep-pi",[credit,debit],["credit","debit"])
    Pi("dep-pii",[upi,noupi],["upi","Non upi"])
    insert("dep-c","₹ "+ Commas(credit))
    insert("dep-d","₹ "+Commas(debit))
    insert("dep-u","₹ "+Commas(upi))
}
$( ()=> {
    getPulseData("2021/1.json",(data)=>{
        val=[]
        lab=[]
        for(i of data.data.transactionData){
            lab.push(i.name)
            val.push(i.paymentInstruments[0].amount)
        }
        Pi("pulse-pi",val,lab)
    })
    getPulseData("2018/1.json",(data)=>{
        val=[]
        lab=[]
        for(i of data.data.transactionData){
            lab.push(i.name)
            val.push(i.paymentInstruments[0].amount)
        }
        Pi("user-pi",val,lab)
    })
    const cal = (cur_val,invest_val) =>{
        return (((cur_val-invest_val)/invest_val)*100).toFixed(3)+"%";
     }
    getData('DEPOSIT',(data)=>{
        deposit=data;
        var bankList=$("#bank-list").get(0)
        var bankTile=$("#bank-tile").get(0)
        const thm=["bg-gradient-danger","bg-gradient-info","bg-gradient-success"]
        var cnt=0
        bankList.innerHTML=""
        bankTile.innerHTML=""
        for (i of data.Payload[0].data){
            i=i.decryptedFI.account 
            bankList.innerHTML+=`<input checked onchange="updateDeposit()"  type="checkbox"><strong style="color: cadetblue;"> ${i.profile.holders.holder[0].name} </strong> <br> a/c: ${i.maskedAccNumber}</input><hr>`
            bankTile.innerHTML+=`<div class="col-md-4 stretch-card grid-margin">
                <div class="card ${thm[cnt%3]} card-img-holder text-white">
                <div class="card-body">
                    <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image">
                    <h4 class="font-weight-normal mb-3">Current Balance<i class="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">₹ ${Commas(i.summary.currentBalance)}</h2>
                    <h5 class="card-text">Branch: ${i.summary.branch}</h5>
                    <h6 class="card-text">MICR: ${i.summary.ifscCode}</h6>
                    <h6 class="card-text">IFSC: ${i.summary.ifscCode}</h6>
                </div>
                </div>
            </div>`
            cnt=(cnt+1)%3
        }
        bankList.innerHTML+=`<span type="button" onclick="logout()">Sign Out</span>`
        updateDeposit()
      
    })
    getData('TERM_DEPOSIT',(data)=>{
        Bar("fd-bar",[data.summary.principalAmount,data.summary.currentValue],["invested Value","Current Value"])
        insert("fd-i",data.summary.interestRate+"%")
        insert("fd-md",data.summary.maturityDate)
        insert("td-pro-mar",cal(data.summary.currentValue,data.summary.principalAmount))
    })
    getData('RECCURING_DEPOSIT',(data)=>{
        Bar("rec-bar",[data.summary.principalAmount,data.summary.currentValue],["invested Value","Current Value"])
        insert("rec-i",data.summary.interestRate+"%")
        insert("rec-md",data.summary.maturityDate)
        insert("rec-ra",data.summary.recurringAmount)
        insert("rd-pro-mar",cal(data.summary.currentValue,data.summary.principalAmount))
    })
    getData('CREDIT_CARD',(data)=>{
        Bar("cc-bar",[data.summary.creditLimit,data.summary.totalDueAmount],["Credit Limit","used credit"])
        insert("cc-lp",data.summary.loyaltyPoints)
    })
    getData('CD',(data)=>{
        Bar("cd-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("cd-i",data.summary.holdings.holding.yield+"%")
        insert("cd-md",data.summary.holdings.holding.maturityDate)
        insert("cd-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('IDR',(data)=>{
        Bar("idr-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("idr-r",data.summary.investment.holdings.holding.rate+"%")
    })
})

