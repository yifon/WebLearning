
function clock(){this.init.apply(this,arguments)};
clock.prototype = {
    init:function(opts){
        opts = opts ||{};
        var hour = this.getId(opts.hours || 'hour');
        var minutes = this.getId(opts.minutes || 'minutes');
        var seconds = this.getId(opts.seconds || 'seconds');
        var time,nHour,nMinutes,nSeconds,srotate,mrotate,hrotate,sdegree,mdegree,hdegree;
        setInterval(function(){
            time = new Date();
            nHour = time.getHours();//0-23
            nMinutes = time.getMinutes();//0-59
            nSeconds = time.getSeconds();//0-59
            //每格表示的度数为360/60=6度
            sdegree = nSeconds * 6;
            mdegree = nMinutes * 6;
            //时针的度数应该为当前时间的小时数+与分针对应的小时度数
            //(nHour%12) * 30 == (nHour%12) * (360/12)
            //nMinutes/2 == (nMinutes/60)*5*6 这里的(nMinutes/60)*5表示的是与分针对应的小时刻度，然后每格的度数6
            hdegree = (nHour%12) * 30 + Math.floor(nMinutes/2);
            srotate = 'rotate(' + sdegree + 'deg)';
            mrotate = 'rotate(' + mdegree + 'deg)';
            hrotate = 'rotate(' + hdegree + 'deg)';
            seconds.style.cssText = '-moz-transform:'+ srotate + '; -webkit-transform:' + srotate;
            minutes.style.cssText = '-moz-transform:'+ mrotate + '; -webkit-transform:' + mrotate;
            hour.style.cssText = '-moz-transform:'+ hrotate + '; -webkit-transform:' + hrotate;
            document.title = nHour + ':' + nMinutes + ':' + nSeconds;
        },1000);
    },
    getId:function(el){
        return typeof el=='string' ? document.getElementById(el) : el;
    }
}

new clock();
