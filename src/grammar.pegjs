start
 = Content

Content
  = _ v:(Object/Keyword)*{ 
    let accumulator = ""
    function goDown (val,acc = "") {
    	if(typeof val === "string"){
        	return {[val]:[acc,val].filter(s=>!!s).join("-")}
        }
        const key = Object.keys(val)[0]
        return { [key]:val[key].map(k => goDown(k,[acc,key].filter(s=>!!s).join("-"))).reduce((a,b)=> ({...a,...b})) }
    }
    return v.map(vv => goDown(vv)).reduce((a,b)=> ({...a,...b}))
 }
Object
  = _ key:Keyword _ "{" _ value:(Object/Keyword)* _ "}" { return {[key]: value } } 
Keyword
  = _ name:[a-z0-9A-Z]+ _ { return name.join("") } 

_ "whitespace"
  = [ \t\n\r]*