//定义根目录字体大小，通过rem实现适配 
document.addEventListener("DOMContentLoaded", function() { 
  var html = document.documentElement; 
  var windowWidth = html.clientWidth; 
  //console.log(windowWidth) 
  html.style.fontSize = windowWidth / 7.5 + "px"; 
}, false); 
// 获取弹窗 
var modal = document.getElementById('myModal'); 
// 打开弹窗的按钮对象 
var btn = document.getElementById("myBtn"); 
// 获取 <span> 元素，用于关闭弹窗 that closes the modal 
var span = document.getElementsByClassName("close")[0]; 
/*创建密码输入框*/
var entryArea = document.querySelector(".paymentArea-Entry-Row"); 
for(var i = 0; i < 6; i++) { 
  var li = document.createElement("li"); 
  entryArea.appendChild(li); 
} 
/*键盘操作*/
// 获取键盘
var doms = document.querySelectorAll('ul li a'); 
// 获取输入框内容
var entryLis = document.querySelectorAll(".paymentArea-Entry-Row li"); 
var pwds = ""; //存储密码 
var count = 0; //记录点击次数 
for(var i = 0; i < doms.length; i++) { 
  ! function(dom, index) { 
    dom.addEventListener('click', function() { 
      var txt = this.innerHTML; 
      switch(txt) { 
        case "清空": 
          if(count != 0) { 
            for(var i = 0; i < entryLis.length; i++) { 
              entryLis[i].innerHTML = ""; 
            } 
            pwds = ""; 
            count = 0; 
            console.log(pwds)
            console.log(count) 
          } 
          break; 
        case "删除": 
          if(count != 0) { 
            console.log(pwds) 
            entryLis[count - 1].innerHTML = ""; 
            pwds = pwds.substring(0, pwds.length - 1); 
            count--; 
            console.log(pwds) 
            console.log(count) 
          } 
          break; 
        default: 
          /*通过判断点击次数 向输入框填充内容*/
          if(count < 6) { 
            /*创建一个图片对象 插入到方框中*/
            var img = new Image(); 
            img.src = "./image/timg.jpeg"; 
            entryLis[count].appendChild(img); 
            /*为存储密码的对象赋值*/
            if(pwds == "") { 
              pwds = txt; 
            } else { 
              pwds += txt; 
            } 
            count++; 
            if(pwds.length == 6) { 
              location.href = "https://www.baidu.com"; 
            } 
          } else { 
            return; 
            // alert("超出限制") 
          } 
      } 
    }); 
  }(doms[i], i); 
} 
// 点击按钮打开弹窗 
btn.onclick = function() { 
  modal.style.display = "block"; 
} 
// 点击 <span> (x), 关闭弹窗 
span.onclick = function() { 
  modal.style.display = "none"; 
  if(count != 0) { 
    for(var i = 0; i < entryLis.length; i++) { 
      entryLis[i].innerHTML = ""; 
    } 
    pwds = ""; 
    count = 0; 
  } 
} 
// 在用户点击其他地方时，关闭弹窗 
window.onclick = function(event) { 
  if(event.target == modal) { 
    modal.style.display = "none"; 
    if(count != 0) { 
    for(var i = 0; i < entryLis.length; i++) { 
      entryLis[i].innerHTML = ""; 
    } 
    pwds = ""; 
    count = 0; 
  } 
  } 
} 