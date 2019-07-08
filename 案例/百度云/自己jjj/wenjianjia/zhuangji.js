//撞击，选中
let {po,duang} = tools;
const kuang = document.querySelector('.kuang');
let checkedNum = 0;
fBox.onmousedown = function(ev){
    console.log(ev.target);
    
    if(ev.target.classList.contains('file-item') || ev.target.parentNode.classList.contains('file-item')){
        return false;
    }
    let ary = getChild(globalId);
    ary.forEach(item => item.checked=false);
    renderBreadNav(globalId);
    let disX = ev.pageX - fBox.offsetLeft;
    let {top} = po(fBox);
    let disY = ev.pageY - top;

    kuang.style.display = 'block';
    kuang.style.left = disX + 'px';
    kuang.style.top = disY + 'px';

    fBox.onmousemove = function(ev){
        checkedNum = 0;
        let w = Math.abs((ev.pageX - fBox.offsetLeft) - disX);
        let h = Math.abs((ev.pageY - top) - disY);
        kuang.style.width = w + 'px';
        kuang.style.height = h + 'px';

        let l = Math.min(disX,(ev.pageX - fBox.offsetLeft));
        let t = Math.min(disY,(ev.pageY-top));
        kuang.style.left = l + 'px';
        kuang.style.top = t + 'px';
        
        let fileItem = document.querySelectorAll('.file-item');

        fileItem.forEach((ele,i)=>{
            if(duang(kuang,ele,folders.scrollTop)){
                data[ele.dataset.id].checked = true;
                checkedNum ++;
            }else{
                data[ele.dataset.id].checked = false;
            }
        })
        if(checkedNum === fileItem.length){
            checkedAll,className = 'checked';
        }else{
            checkedAll.className = '';
        }

        render(globalId);
        return false
    }
    document.onmouseup = function(){
        kuang.style.display = 'none';
        kuang.style.width = kuang.style.height = 0;
        fBox.onmousemove = document.onmouseup = null;
    }
}