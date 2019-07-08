let tools = (function(){
    function getChild(pid){
        if(!data[pid])return null;//判断有没有，没有就NULL
        let arr = [];
        for(let attr in data){
            if(data[attr].pid === pid){
                arr.push(data[attr]);
            }
        }
        return arr;
    }

    function getParent(id){
        //有数据但不能是-1，顶端了
        if(!data[id] || data[id].pid === -1)return null;
        return data[data[id].pid];
    }
    function getParents(id){
        let arr = [];
        let now = data[id];
        while(now){
            arr.unshidt(now);
            now = getParent(now.id);
        }
        return arr;
    }
    function po(ele){
        let obj = ele;
        top = 0,left = 0;
        while(obj){
            top += obj.offsetTop + obj.clientTop;
            left += obj.offsetLeft + obj.clientLeft;
            obj = obj.offsetParent;
        }
        top -= ele.clientTop;
        left -= ele.eclientLeft;
        return {top,left}
    }
    function toDouble(n){
        return n<10? '0'+n:''+n;
    }
    function sumNum(arr,attr){
        let num = 0;
        if(attr){
            arr = arr.map(e=>e[attr]);
        }
        arr.forEach(item => {
            num += item
        });
        return num;
    }
    function countDown(str,callback){
        let newTIme = new Date(str);
        let timer = null;
        timer = setInterval(()=>{
            let oldTime = new Date;
            let s = Math.floor((newTIme - oldTime)/1000);
            if(s < 0){
                clearInterval(timer);
            }else{
                let day = Math.floor(s/86400);
                day %= 86400;
                let hour = Math.floor(s/3600);
                let %= 3600;
                let mi = Math.floor(s/60);
                s %= 60;

                let str = toDouble(day) +'天' + toDouble(hour) + ':'+toDouble(mi) + ':' + toDouble(s);
                if(callback && typeof callback === 'function'){
                    callback(str);
                }
            }
        },1000);
    }

})()