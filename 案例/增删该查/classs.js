class bg{
    constructor(){
        this.data = data;
        // this.render(data);
        this.tr = document.querySelectorAll('#tbody>tr');
        this.add = document.querySelectorAll('#add');
        this.render(data);
        this.bianse(tbody);
        this.tianjia()
    }
    render(data) {
        // 渲染页面
        let html = '';
        data.forEach(item => {
            html += `<tr>
            <td><input type="checkbox"></td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <input type="button" value="删除" class="remove">
                <input type="button" value="上移" class="up">
                <input type="button" value="下移" class="down">
            </td>
        </tr>`;
        });     
        tbody.innerHTML = html;
    }
    bianse(){
        for(let i=0; i<this.tr.length;i+=2){
            this.tr[i].style.background = 'red';
        }
    };
    tianjia(){
        let taat = this;
        console.log(this.add);
        
        this.add.onklick = function(){
            taat.push({
                id:taat.data.length,
                nama:taat.name,
                price:taat.agr,
            })
            render(taat.data)
        }

  
    }

}
new bg();