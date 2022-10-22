
$( ()=> {
 const cal = (cur_val,invest_val) =>{
    return (((cur_val-invest_val)/invest_val)*100).toFixed(3)+"%";
 }
    getData('MUTUAL_FUNDS',(data)=>{
        Bar("mf-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("mut-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
        insert("mf-amc",data.summary.investment.holdings.holding[0].amc)
        // insert("mf-ed",data)
        // insert("mf-ty",data)
        // insert("mf-pa",data)
    })
    getData('BONDS',(data)=>{
        Bar("bond-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("bond-cr",data.summary.holdings.holding.couponRate)
        insert("bond-md",data.summary.holdings.holding.maturityDate)
        insert("bond-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('DEBENTURES',(data)=>{
        Bar("db-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("db-y",data.summary.holdings.holding.yield)
        insert("db-md",data.summary.holdings.holding.maturityDate)
        insert("deb-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('ETF',(data)=>{
        Bar("etf-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("etf-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('NPS',(data)=>{
        Pi("nps-pi",[data.summary.debtAssetValue,data.summary.equityAssetValue,data.summary.otherAssetValue],["Debt Asset","Equity Asset","Other Asset"])
        insert("nps-t1",data.summary.tier1Status)
        insert("nps-t2",data.summary.tier2Status)
        insert("nps-cv",data.summary.currentValue)
    })
    getData('GOVT_SECURITIES',(data)=>{
        Bar("gs-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("gs-md",data.summary.holdings.holding.maturityDate)
        insert("gs-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('CP',(data)=>{
        Bar("cp-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("cp-t",data.summary.investment.holdings.holding.tenureMoths)
        insert("cp-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('REIT',(data)=>{
        Bar("reit-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("reit-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
  
    getData('AIF',(data)=>{
        Bar("aif-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("aif-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('INVIT',(data)=>{
        Bar("invit-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("iit-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('SIP',(data)=>{
        Bar("sip-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("sip-md",data.summary.investments.maturityDate)
        insert("sip-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('EQUITIES',(data)=>{
        Bar("eq-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("eq-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })
    getData('CIS',(data)=>{
        Bar("cis-bar",[data.summary.investmentValue,data.summary.currentValue],["invested Value","Current Value"])
        insert("cis-pro-mar",cal(data.summary.currentValue,data.summary.investmentValue))
    })

})
