let time = new Date(Date.now() + 10000);
// let time = new Date('2019/05/03 12:11:00');
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
        this.render(data);
        this.data = data;
        this.bgs = document.getElementsByClassName('bg');
        this.inputdate = document.getElementsByClassName('inputdate');
        this.times = document.getElementsByClassName('times');
        this.btns = document.getElementsByClassName('btns');
        this.lis = document.querySelectorAll('#ul>li');
        this.bigC = document.getElementsByClassName('big-c');
        this.li1 = document.querySelector('#footer>.style2>.li1');
        this.li2 = document.querySelector('#footer>.style2>.li2');
        this.li3 = document.querySelector('#footer>.style2>.li3');
        this.li2Price = document.querySelector('#footer>.list>.li2');
        this.list = document.querySelector('.list');
        this.timer = null;
        this.shelvesData = [];
        this.events();
    }
    render(data) {
        //渲染data数据到页面
        let html = '';
        data.forEach(function (item) {
            ul.innerHTML += `<li>
            <div class="bg"></div>
            <div>
                <input class="inputdate" type="text" value="${item.shelfTime}">
                <input type="button" value="确认" class="btns">
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
                <strong class="price">¥${item.price}</strong>
            </p>

            <div class="big-c">
                <div class="med-c">
                    <div class="half1">
                        <span>★</span>
                        <span>★</span>
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
        })
    };
    events() {
        //绑定点击事件
        for (let i = 0; i < this.inputdate.length; i++) {
            this.btns[i].onclick = () => {
                this.changeTime(i);
            }
            this.btns[i].click();//自动触发点击事件
        };
    }
    changeTime(index) {
        //改变时间 倒计时
        this.timer = setInterval(() => {
            this.nowTime = Date.now(); //当前时间
            this.tarTime = Date.parse(this.inputdate[index].value); //目标时间 
            this.diffTime = (this.tarTime - this.nowTime) / 1000; //时间差（秒）
            if (this.diffTime <= 0) {
                //时间差如果小于0，就清除定时器，不再执行下面的代码
                clearInterval(this.timer);
                return;
            };
            //小时/分钟/秒  数字 => 转换成字符串
            let hours = Math.floor(this.diffTime / 60 / 60).toString();
            this.diffTime %= (60 * 60);
            let minutes = Math.floor(this.diffTime / 60).toString();
            let seconds = Math.floor(this.diffTime % 60).toString();
            // padStart(2, '0') 字符串方法：小于两位前面添0
            hours = hours.padStart(2, '0');
            minutes = minutes.padStart(2, '0');
            seconds = seconds.padStart(2, '0');
            // 把得到的字符串hours/minutes/seconds 拼接成'xx:xx:xx'格式
            let time = hours + ':' + minutes + ':' + seconds;
            // 当时间为00的时候，执行shake()方法（抖一抖）
            time === '00:00:00' ? this.shake(index) : null;
            // time === '00:00:00' ? this.lowerShelf(index) : null;
            // time === '00:00:00' ? this.shelvesList(index) : null;
            //把得出的hours/minutes/seconds字符串添加到页面中（字符串拼接）
            this.times[index].innerHTML = ` 剩余
            <span>${hours[0]}</span>
            <span>${hours[1]}</span>
            <strong>:</strong>
            <span>${minutes[0]}</span>
            <span>${minutes[1]}</span>
            <strong>:</strong>
            <span>${seconds[0]}</span>
            <span>${seconds[1]}</span>
            `;
        }, 1000);
    }
    shake(index) {
        //抖一抖
        let ary = [10, -10, 8, -8, 6, -6, 4, -4, 2, -2, 0];
        let num = 0;
        let timer = null;
        timer = setInterval(() => {
            num++;
            //定时器每次执行都让当前的整个li部分的left值移动，移动的值是数组中每一项的距离
            this.lis[index].style.left = ary[num] + 'px';
            if (num === ary.length) {
                //当移动完毕(即计数的值等于数组长度)，清除定时器，同时执行lowerShelf()方法（下架商品下落列表）
                clearInterval(timer)
                this.lowerShelf(index);
            }

        }, 16.7)
    };
    lowerShelf(index) {
        //下架提醒（盖章）
        //1.显示遮罩 2.显示盖章 3.过渡10s 4.x轴减小1倍 5.234合并到元素的样式中
        this.bgs[index].style.display = 'block'; 
        Object.assign(this.bigC[index].style, {
            visibility: 'visible',
            transition: '0.5s',
            transform: 'scale(1)'
        });
        this.shelvesList(index);//盖章之后执行shelvesList()（下架商品下落到列表）
        // this.bigC[index].style.visibility = 'visible';
        // this.bigC[index].style.transition = '0.5s';
        // this.bigC[index].style.transform = 'scale(1)';
    }
    shelvesList(index) {
        // this.li1.innerHTML = this.data[index].info;
        // this.li2.innerHTML = '￥' + this.data[index].price;
        // this.li3.innerHTML = `<img src='${this.data[index].img}'/>`;
        //把列表内容渲染到页面中
        let html = ` <ul class="style2">
        <li class="li1">${this.data[index].info}</li>
        <li class="li2">￥${this.data[index].price}</li>
        <li class="li3"><img src="${this.data[index].img}"/></li>
        </ul>`;
        // this.list.innerHTML = this.list.innerHTML + html;、
        // insertAdjacentHTML('afterend', html) 把元素添加到指定元素的下面
        this.list.insertAdjacentHTML('afterend', html);
        // this.shelvesData 下架商品 每下架一个产品，就在空数组里添加一个对象，对象内容包括索引，标题，价格等信息
        this.shelvesData.push({
            index:index,
            info:this.data[index].info,
            price:this.data[index].price*1
        })
        this.subPrice();//下落到列表后执行subPrice()方法（计算总价）
    }
    subPrice() {
        let total = 0;
        this.shelvesData.forEach((item,i)=>{
            total += item.price;
        })
        this.li2Price.innerHTML = '价钱' + '(总价：' + total + ')';
        // this.li2Price.innerHTML = '价钱(总价：total)';
    }
}
let n = new shop(data);