
function GetQS(name){
    var s=location.href.substr(location.href.indexOf("?")+1),
    qs=[];
    var hl=s.indexOf("#");
    if(hl>0){
        s=s.substring(0,hl);
    }
    var arr=s.split("&");
    for(var i=0;i < arr.length;i++){ 
        num=arr[i].indexOf("="); 
        if(num>0){ 
            var n=arr[i].substring(0,num);
            if(name==n){
                return arr[i].substr(num+1);
            }
        } 
    }
    return null;
}

