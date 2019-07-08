let time = new Date(Date.now() + 10000);
let data = [
    {
        shelfTime: time,
        img: 'img/1.jpg',
        info: 'iphone7s plus 炫酷手机',
        price: '8888'
    },
    {
        shelfTime: time,
        img: 'img/2.jpg',
        info: '27 英寸配置 Retina 5K显示屏',
        price: '15999'
    },
    {
        shelfTime: time,
        img: 'img/3.jpg',
        info: '魅族、锥子、小米 “集”群',
        price: '20000'
    },
    {
        shelfTime: time,
        img: 'img/4.jpg',
        info: 'iWatch 智能手表不智能',
        price: '5000'
    },
]
class shop {
    constructor(data) {
        this.render(data);//页面
        this.data = data;
        this.bgs = document.getElementsByClassName('bg');//黑色半透明章子
        this.inputdate = document.getElementsByClassName('inputdate')
        this.times = docuemnt.getElementsByClassName('times');
        this.btns = document.getElementsByClassName('btns');
        this.events()
    }
    render(data) {
        let html = '';
        data.forEach( item => {
            ul.innerHTML +=`<li>
            <div class="bg"></div>
            <div>
                <input class="inputdate" type="text" value="${item.shelfTime}">
                <input type="button" value="确认" class="btn">
            </div>
            <p class="times">剩余
                <span>0</span>
                <span>0</span>
                <strong>:</strong>
                <span>0</span>
                <span>0</span>
                <strong>:</strong>
                <span>0</span>
                <span>0</span>
            </p>
            <img src="${item.img}">
            <h5>${item.info}</h5>
            <p>抢购价：
                <strong class="price">${item.price}</strong>
            </p>

            <div class="big-c">
            
            
                        <span>★</span>
                    </div>
                    <P>商品已下架</P>
                    <div class="half2">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                    </div>
                </div>
            </div>
        </li>`;
        });

    };
    events(){
        for(let i=0; i<btns.length; i++){
            this.btns[i].onclick = ()=>{
              this.change
                
            }
        }
    }

}
let n = new shop(data);