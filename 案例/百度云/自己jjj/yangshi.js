const fempty = document.querySelector('.f-empty');
let globalId = 0;
function render(id) {
    globalId = id * 1;
    folders.innerHTML = '';
    let ary = getChild(globalId);
    if (ary && ary.length) {
        fempty.style.display = 'none';
        checkedAll.className = ary.every(e => e.checked) ? 'checked' : '';
        ary.forEach((ele, i) => {
            let div = document.createElement('div');
            div.className = ele.checked?'file-item active':'file-item';
            div.dataset.id = ele.id;
            let img = document.createElement('img');
            img.src = 'img/folder-b.png';
            img.ondblclick = function () {
                let arr = getChild(ele.id);
                if (arr && arr.length) {
                    render(ele.id);
                } else {
                    fempty.style.display = 'block';
                    globalId = ele.id;
                    folders.innerHTML = '';
                }
                checkedAll.className = '';
                ary.forEach(item => item.checked = false);
                renderBreadNav();//面包屑
            }
            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = ele.title;
            span.contentEditable = true;
            let input = document.createElement('input');
            input.className = "editor";
            input.value = ele.title;
            let is = document.createElement('i');
            is.className = ele.checked ? 'checked' : '';

            is.onclick = function () {
                data[ele.id].checked = this.classList.toggle('checked');
                render(globalId)
            }
            div.append(img);
            div.append(span);
            div.append(input);
            folders.appendChild(div);
        })
    } else {
        fempty.style.adsplay = 'block';
        checkedAll.className = '';
    }
}
render(0)

