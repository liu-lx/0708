function bg(data){
    html = '';
    data.forEach(item =>{
        html += `
         <tr class='tr'>
        <td><input type="checkbox"></td>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
            <input type="button" value="删除" class='remove'>
            <input type="button" value="上移" class='up' >
            <input type="button" value="下移" class='down'>
        </td>
       </tr> `
    })
    tbody.innerHTML = html;
    
    let tr = tbody.querySelectorAll('.tr');
    for(let i=0; i<tr.length;i+=2){
        tr[i].style.background = 'red';
    };
    let s1 = document.querySelectorAll('.s1')
    remove();//删除
    up();//上移
    down();//下移
    
};
bg(data)

//添加
add.onclick = function () {
    data.splice(data.length, 0, {
        id: data.length,
        name: nama.value,
        price: age.value,
    });
    bg(data);
};



//增删除
function remove(){
    let move = document.querySelectorAll('.remove')
    console.log(move);
    for(let i=0; i<move.length; i++){
        move[i].onclick = function () {
            
            data.splice(i, 1);
           
            bg(data);
        }

    }
}

//上移
function up() {
    const up = document.querySelectorAll('.up');
    for (let i = 0; i < up.length; i++) {
        up[i].upIndex = i;
        up[i].onclick = function () {
            if (this.upIndex <= up[0]) {
                this.upIndex=0
            };
            let replace = data[i];
            data[i] = data[i - 1];
            data[i - 1] = replace;
            bg(data);

        };
    };
};

//下移
function down() {
    const down = document.querySelectorAll('.down');
    for (let i = 0; i < down.length; i++) {
        down[i].downIndex = i;
        down[i].onclick = function () {
            if (this.downIndex === down.length - 1) {
                return;
            }else{            
                let replace = data[i];
                data[i] = data[i + 1];
                data[i + 1] = replace;
                bg(data);
            }
            // data.sort((a,b)=>{
            //     a = a[data[id]]
            //     b = b[dara[id]]
            //     return a - b
             
            // })   排序

        };
    };
};
//chekebox
//排序  失败
// function sort(s){
//     this.data = ["id", "price"];
//     let tr = tbody.querySelectorAll('.tr');
    
//     this.s1Btn.forEach((item, i) => {
//     tr.forEach((ele,i)=>{
//         ele.onoff = true;
//         // let that = tr.ele;
//         stBtn.onclick = function(){
//             if(this.onoff){
//                 // that.s1[i]=tr[i]
//                 data.sort((a,b)=>{
//                     a = a[ele.s1[i]]
//                     b = b[ele.s1[i]];
//                     return a-b;
//                 })
//                 bg(data)
//             }
//         }
//         ele.onoff = false;
      
//     })
// }



