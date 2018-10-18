window.onload = function() {
    var list = document.getElementById('list');var pre = document.getElementById('pre');
    var next = document.getElementById('next');
    function animate(offset) {
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';

        if(newLeft < -3000){
            list.style.left = -600 + 'px';
        }
        if(newLeft > -600){
            list.style.left = -3000 + 'px';
        }
    }

    pre.onclick = function() {
        animate(600);
    };
    next.onclick = function() {
        animate(-600);
    };
    var timer;
    function play() {
        timer = setInterval(function () {
            next.onclick()
        }, 1500)
    }
    play();
    var container = document.getElementById('container');

    function stop() {
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var index = 1;

    function buttonsShow(){
        //clear pre style class
        for (var i = 0; i<buttons.length;i++){
            if(buttons[i].className=='on'){
                buttons[i].className='';
            }
        }
        //array from 0,index + 1;
        buttons[index - 1].className = 'on';
    }
    pre.onclick = function(){
        index --;
        if(index<1){
            index = 5;
        }
        buttonsShow()
        animate(600);
    }
    next.onclick = function(){
        //由于定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
        index ++;
        if(index > 5){
            index = 1;
        }
        buttonsShow();
        animate(-600);
    }
    for (var i = 0; i < buttons.length; i++) {
        // 这里使用的是立即执行函数，
        (function(i) {
            buttons[i].onclick = function() {
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 600 * (index - clickIndex);
                animate(offset);
                index = clickIndex;
                buttonsShow();
            }
        })(i)
    }
}
