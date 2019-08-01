;window.requestAnimationFrame = window.requestAnimationFrame||function(a){return setTimeout(a,1000/60)};
window.cancelAnimationFrame = window.cancelAnimationFrame||clearTimeout;//关闭动画帧和打开动画帧
function FragmentBanner(option) {

	//实例化时，可传的参数  必传的参数：1.container 容器  2.imgs 图片的集合
	this.whiteList = ['container','controller','size','imgs','size','grid','index','fnTime','boxTime','type'];

	//容器将包容控制器
	this.container = '.banner';
	
	//默认的控制器
	this.controller = {
		view : '.banner-view',
		btn : '.banner-btn',
		num : '.banner-number',
		progre : '.banner-progres'
	};

	//栅格 行*列 
	//栅(shān)格数据就是将空间分割成有规律的网格，每一个网格称为一个单元，并在各单元上赋予相应的属性值来表示实体的一种数据形式。
	this.grid = {
		line : 5,
		list : 10
	};
	 
	//容器的大小
	this.size = {
		width : 1200,
		height : 675,
	};

	//切换类型
	this.type = 1;

	//索引位置
	this.index = 0;

	//函数每次切换时间
	this.fnTime = 5000;

	//栅格每次运动时间
	this.boxTime = 2000;

	//栅格运动结束的时间
	this.activeTime = new Date();
    //有设置走设置 没设置走默认
	for(var a = 0,attrLenght = this.whiteList.length; a < attrLenght;a++){
		var attr = this.whiteList[a];
		if(option[attr] != undefined){			
			this[attr] = option[attr];
		}
	}
	for(var i in option){
		if(this.whiteList[i] !== undefined){ ; }
	}
	this.init();
}

FragmentBanner.prototype = {

	constructor : FragmentBanner,

	init : function(){

		this.container = document.querySelector(this.container)
		//获取包容控制器的容器
		if(!this.container){
			return alert('获取banner容器失败');
		}else{
			//this.size 容器的大小
			this.container.style.width = this.size.width+'px';
			this.container.style.height = this.size.height+'px';
		}
		
		this.elem = {};//里面放的控制器controller的每项
		//控制器 判断控制器是否有内容
		for(var e in this.controller){
			this.elem[e] = this.container.querySelector(this.controller[e]);
			if(this.elem[e] == null){
				// return 防止在alert点了确认报错
			 return alert('获取'+e+'容器');
			}
		}

		//栅格
		var w = this.size.width / this.grid.list,//容器的宽/列数
			h = this.size.height / this.grid.line;//容器的高/行数
        // w h 代表碎片化后的一个小图片的宽和高 
		this.elem.viewBox = new Array();
		//在this.elem 对象里加入数组
		//碎片化的图片
		for(var i = 0,iL = this.grid.line;i < iL;i++){//行

			for(var j = 0,jL = this.grid.list;j < jL;j++){//列

				var newI = document.createElement('i');
				this.setCss(newI,{
					width : w+'px',
					height : h+'px',
					left : 0,
					top : 0,
					opacity : 1,
					backgroundImage : 'url("'+this.imgs[this.index]+'")',
					backgroundSize : this.size.width + 'px ' + this.size.height +'px',
					backgroundPosition : w * -j+'px ' + h * -i+'px'
				});
				this.elem.view.appendChild(newI);//把i加到视图里
				this.elem.viewBox.push(newI);
			}
		}

		//按钮动作
		for (var b = 1; b >= 0; b--) {
			var oB = document.createElement('span');
			(b) ? oB.innerHTML = '&lt;' : oB.innerHTML = '&gt;';//1的时候是
			oB.setIndex = b;
			oB.onclick = function(obj){
				this.show({
					switch : true,
					change : obj.setIndex == 0
				});
			}.bind(this,oB);//改变This指向
			this.elem.btn.appendChild(oB);//在控制器上加上span 点击换图片 上下
		}
		console.log(this);
		//数量  几个。。。
		for(var n = 0,nL = this.imgs.length; n < nL;n++){

			var oI = document.createElement('i');

			oI.setIndex = n;
			oI.onclick = function(obj){
				//显示动画
				this.show({
					switch : true,
					change : obj.setIndex
				});
			}.bind(this,oI)
			this.elem.num.appendChild(oI);
		}
		this.elem.numFind = this.elem.num.querySelectorAll('i');//添加。。。

		//进度条
		this.progre = new Array;
		for(var p = 1;p >= 0;p--){
			var oP = document.createElement('i');
			this.setCss(oP,{
				width : 0,
				backgroundColor : p ? '#00c3ff' : '#ffc300'
			});
			this.elem.progre.appendChild(oP);
			this.progre.push(oP);//添加进度条
		}

		//显示动画
		this.show();
		this.elem.numFind[this.index].className = 'on';//第几个。。。
	},

	setIndex : function(){//设置索引

		this.index %= this.imgs.length;
		
		this.index = (this.index < 0) ? this.imgs.length - 1 : this.index;

		this.elem.numFind[this.index].className = 'on'; 
	},

	getTypeTime : function(){

		var timer = new Array();
		switch(this.type){
			case 1:
				timer.push(this.boxTime / 4 + Math.random() * this.boxTime / 4);
				timer.push(timer[0]);
			break;

			default:

				timer.push([Math.random() * this.boxTime / 5,this.boxTime / 10 * 3]);
				timer.push(timer[0][0] + timer[0][1]);
			break;
		}

		return timer;
	},
	
	show : function(order){

		order = order || {};

		if(new Date() >= this.activeTime){//。。。的颜色切换

			this.elem.numFind[this.index].className = '';

			//下次播放动画时候的进度条
			this.setCss(this.progre[1],{width : 0})
				.anime(this.progre[1],{
					width : this.size.width
				},this.fnTime,function(){
					this.show({
						switch : true,
						change : true
					});
				}.bind(this));
			
			var status = true,
				activeTime = 0;

			for( var i = 0,iL = this.elem.viewBox.length;i < iL;i++ ){
				var startTime = this.getTypeTime(),
					endTime = this.getTypeTime(),
					obj = this.elem.viewBox[i];
					activeTime = Math.max(activeTime,startTime[1] + endTime[1]);
				this.anime(obj,{
					left :  Math.ceil(Math.random() * this.size.width * 2 - this.size.width),
					top : Math.ceil(Math.random() * this.size.height * 2 - this.size.height),
					opacity: 0
				}, startTime[0] ,function(obj){

					if(order.switch && status){
						if(/number/i.test(typeof order.change)){

							this.index = order.change;
						}else{

							(order.change) ? ++this.index : --this.index;
						}
						this.setIndex();
						this.elem.numFind[this.index].className = 'on';
						status = false;
					}

					this.setCss(obj,{backgroundImage : 'url("'+this.imgs[this.index]+'")'})
						.anime(obj,{
							left : 0,
							top : 0,
							opacity : 1
						},endTime[0]);
				}.bind(this,obj));
			}

			//栅格结束运动的时间
			this.activeTime = new Date(new Date().getTime() + activeTime);

			this.setCss(this.progre[0],{width : 0})
				.anime(this.progre[0],{
					width : this.size.width
				},activeTime);
		}
	},

	setCss : function(obj,json){//封装的设置css样式

		for( c in json){

			if(c == 'opacity'){

				obj.style.opacity = c;
				obj.style.filter = "alpha(opacity="+ (json[c]*100) +")";
			}else{

				obj.style[c] = json[c];
			}
		}

		return this;
	},

	anime : function(obj,attr,endTime,callback) {
		(obj.timer) && cancelAnimationFrame(obj.timer);
		var cssJosn = obj.currentStyle || getComputedStyle(obj,null),
			start = {},end = {},goTime;

		//设置初始属性值和结束属性值
		for(var key in attr){
			if(attr[key] != parseFloat(cssJosn[key])){

				start[key] = parseFloat(cssJosn[key]);
				end[key] = attr[key] - start[key];
			}
		}

		goTime = new Date();

		if(endTime instanceof Array){

		 	(function delayFn(){

		 		if((new Date() - goTime) >= endTime[0]){

		 			endTime = endTime[1];
		 			goTime = new Date();
		 			ref();
		 		}else{

		 			obj.timer = requestAnimationFrame(delayFn);
		 		}
		 	})();
		}else{

			ref();
		}


		function ref(){

			var prop = (new Date() - goTime) / endTime;
			(prop >= 1) ? prop = 1 : obj.timer = requestAnimationFrame(ref);
			for(var key in start){

				var val = -end[key] * prop *(prop-2) + start[key];

				if(key == 'opacity'){

					obj.style.opacity = val;
					obj.style.filter = "alpha(opacity="+ (val*100) +")";
				}else{

					obj.style[key] =  val+'px';
				}
			}

			(prop === 1) && callback && callback.call(obj);
		};
	}
}


