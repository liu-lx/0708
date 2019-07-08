let {getParents,getParent} = tools;
//生成面包屑
function renderBreadNav(){
    let html = '';
    let ary = getParents(globalId);
    ary.forEach((item,i,all)=>{
        if(i != all.length-1){
            // html += `<a data-id='${item.id}' href='javascript:;'>${item.title}</a>`;
            html += `<a data-id="${item.id}" href="javascript:;">${item.title}</a>`;
        }else{
            // html += `<span>${item.title}</span>`;
            html += `<span>${item.title}</span>`;
        }
    })
    breadNav.innerHTML = html;
}

breadNav.onclick = function(ev){
    if(ev.target.tagName === 'A'){
        let ary = getChild(globalId);
        ary.forEach(item=>item.checked = false);
        renderBreadNav(ev.target.getAttribute('data-id'));
        renderBreadNav();
        checkedAll.className = ''
    }
}
renderBreadNav()
