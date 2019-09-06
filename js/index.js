window.onload = function() {
  // 获取所有需要操作的元素DOM
  var container = this.document.getElementById("container");
  var list = this.document.getElementById("list");
  var buttons = this.document
    .getElementById("buttons")
    .getElementsByTagName("span");
  var prev = this.document.getElementById("prev");
  var next = this.document.getElementById("next");
  // 底部圆形按钮定位
  var index = 1;
  // 设置一个动画时不能切换图片的flag
  var animated = false;

  // 实现点击具体圆形按钮呈现高亮样式
  function showButton() {
    for (var i = 0; i < buttons.length; i++) {
      // 将之前高亮的按钮都清除高亮样式
      if (buttons[i].className == "on") {
        buttons[i].className = "";
        break;
      }
    }
    buttons[index - 1].className = "on";
  }

  // 实现点击左右箭头按钮图片轮播效果
  function animate(offset) {
    animated = true;
    var newLeft = parseFloat(list.style.left) + offset;
    // 位移总时间
    var time = 300;
    // 位置间隔时间
    var interval = 10;
    // 每次位移量
    var speed = offset / (time / interval);

    function go() {
      if (
        (speed < 0 && parseFloat(list.style.left) > newLeft) ||
        (speed > 0 && parseFloat(list.style.left) < newLeft)
      ) {
        list.style.left = parseFloat(list.style.left) + speed + "rem";
        // 运行递归实现动画
        setTimeout(go, interval);
      } else {
        animated = false;
        list.style.left = newLeft + "rem";
        // 判断第一张和最后一张
        if (newLeft > -37.5) {
          list.style.left = -187.5 + "rem";
        }
        if (newLeft < -187.5) {
          list.style.left = -37.5 + "rem";
        }
      }
    }
    go();
  }

  // 箭头按钮 下一张 的按钮点击事件
  next.onclick = function() {
    if (index == 5) {
      index = 1;
    } else {
      index += 1;
    }
    showButton();
    if (!animated) {
      animate(-37.5);
    }
  };

  // 箭头按钮 上一张 的按钮点击事件
  prev.onclick = function() {
    if (index == 1) {
      index = 5;
    } else {
      index -= 1;
    }
    showButton();
    if (!animated) {
      animate(37.5);
    }
  };

  // 实现任意点击圆形按钮切换到相应的图片位置，并为点击的圆形按钮呈现高亮样式
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].onclick = function() {
      if (this.className == "on") {
        return;
      }
      var newIndex = parseInt(this.getAttribute("index"));
      var offset = (newIndex - index) * -37.5;

      if (!animated) {
        animate(offset);
      }
      index = newIndex;
      showButton();
    };
  }

  // 实现图片轮播的自动播放
  // 设置一个定时器,每隔1s触发一次箭头按钮next的点击事件
  function play() {
    timer = setInterval(function() {
      next.onclick();
    }, 3000);
  }
  // 实现取消图片轮播的自动播放
  function stop() {
    clearInterval(timer);
  }

  // 实现鼠标移至container上时触发取消图片轮播自动播放的效果
  container.onmouseover = stop;
  container.onmouseout = play;

  play();
};
