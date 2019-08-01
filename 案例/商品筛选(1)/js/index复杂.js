var choose = document.getElementById('choose');
var ul = document.getElementById('type');
var olis = ul.getElementsByTagName('li');
var option = ul.getElementsByTagName('a');
for(var i=0;i<olis.length;i++){
	olis[i].index = i;
}
var arr = [];

for(var i=0;i<option.length;i++){	
	option[i].onclick = function(){
		var pid = this.parentNode.index;
		var sibilings = this.parentNode.children;
		for(var j=0;j<sibilings.length;j++){
			sibilings[j].style.color = '';
		}
		this.style.color = 'red';
		var mark = document.createElement('mark');
		mark.innerHTML = this.innerHTML;
		var a = document.createElement('a');
		a.innerHTML = 'X';
		a.href = 'javascript:;';
		mark.appendChild(a);
		mark.pid = pid;
		//arr.push(mark);
		arr[pid] = mark;
		/*arr.sort(function(a,b){
			return a.pid-b.pid;
		})*/
		choose.innerHTML = '你的选择';
		for(var k=0;k<arr.length;k++){
			if(arr[k]!=undefined){
				choose.appendChild(arr[k]);
			}	
		}
		//choose.appendChild(mark);
	}
}
