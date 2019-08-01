var lis = document.querySelectorAll('#type>li');
var divs = document.querySelectorAll('#div>div');
for(var i=0;i<lis.length;i++){
	fn(i);
}
function fn(n){
	var a = lis[n].getElementsByTagName('a');
	var mark = document.createElement('mark');
	var is = document.createElement('i');
	var span = document.createElement('span');
	for(var i=0;i<a.length;i++){
		a[i].onclick = function(){
			console.log(n);
			for(var j=0;j<a.length;j++){
				a[j].style.color = '';
			}
			this.style.color = '#28a5c4';
			if(divs[n].children.length===0){				
				mark.appendChild(span);
				mark.appendChild(is);
				divs[n].appendChild(mark);					
			}
			span.innerHTML = this.innerHTML;
		}
	}
	is.onclick = function (){
		divs[n].removeChild(mark);
		for(var i=0;i<a.length;i++){
			a[i].style.color = '';
		}
	}
}