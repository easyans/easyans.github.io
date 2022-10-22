


$( ()=> {
 getData('ULIP',(data)=>{
    insert("ulip-sd",data.profile.riders.rider.policyStartDate)
    insert("ulip-ed",data.profile.riders.rider.policyEndDate)
    insert("ulip-ty",data.profile.riders.rider.tenureYears)
    insert("ulip-pa",data.profile.riders.rider.premiumAmount)
    })


getData('INSURANCE_POLICIES',(data)=>{
    insert("ip-sd",data.profile.riders.rider[0].policyStartDate)
    insert("ip-ed",data.profile.riders.rider[0].policyEndDate)
    insert("ip-ty",data.profile.riders.rider[0].tenureYears)
    insert("ip-pa",data.profile.riders.rider[0].premiumAmount)
    })
})
