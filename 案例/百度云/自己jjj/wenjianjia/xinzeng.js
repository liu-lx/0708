//未来会加点东西？？新增文件夹
create.onclick = function(){
    fempty.style.display = 'none';
    let div = document.createElement('div');
    div.className = 'file-item';
    let img = document.createElement('img');
    img.src = 'img/folder-b.png';


    let input = document.createElement('input');
    input.className = 'editor';
    input.value = '新建文件夹';
    let is = document.createElement('i');

    div.append(img);
    div.append(input);
    div.append(is);

    folders.appendChild(div);
    input.style.display = 'block';
    input.select();

    input.onblur = function (){//事件会在对象失去焦点时发生。
        let v = this.value;
        let ary = getChild(globalId);
        let resault = ary.some(item => item.title ===v);
        let id = new Date;
        if(!resault){
            data[id] = {
                title:v,
                id,
                pid:globalId,
                checked:false
            }
        }else{
            let v2 = v;
            let num = 0;
            while(resault){
                v2 = v2.replace(/\(\d+\)/,'') + `(${++num})`;
                resault = ary.some(item=>item.title === v2);
            }
            data[id] = {
                title:v2,
                id,
                pid:globalId,
                checked:false
            }
        }
        render(globalId);
        renderTree(0);
        fullbox('新建文件夹成功')
    }

}