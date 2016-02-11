function start() {
    new mq('homepage-marquee');
    goScroll(allMarquees);
};

window.onload = start;

function objWidth(obj) {
    if (obj.offsetWidth) {
        return obj.offsetWidth;
    }
    if (obj.clip) {
        return obj.clip.width;
    }
    return 0;
}

var allMarquees = [];

function mq(id) {
    this.scrollObject = document.getElementById(id);
    var contentWidth = objWidth(this.scrollObject.getElementsByTagName('span')[0]) + 5;
    var fullWidth = objWidth(this.scrollObject);
    var content = this.scrollObject.getElementsByTagName('span');
    this.scrollObject.innerHTML = '';
    var objHeight = this.scrollObject.style.height;

    this.scrollObject.ary = [];
    var maxw = Math.ceil(fullWidth / contentWidth) + 1;

    console.log(this.scrollObject.ary);

    console.log("beginning for loop");

    //fill the area with content objects one after the other
    for (var i = 0; i < maxw; i++) {
        this.scrollObject.ary[i] = document.createElement('div');
        this.scrollObject.ary[i].innerHTML = content;
        this.scrollObject.ary[i].style.position = 'absolute';
        this.scrollObject.ary[i].style.left = (contentWidth * i) + 'px';
        this.scrollObject.ary[i].style.width = contentWidth + 'px';
        this.scrollObject.ary[i].style.height = objHeight;
        this.scrollObject.appendChild(this.scrollObject.ary[i]);

        console.log("finished an interation.");
        console.log("left: " + this.scrollObject.ary[i].style.left);
    }
    allMarquees.push(this.scrollObject);

    console.log("finished for loop");
    console.log(this.scrollObject.ary);
}

function goScroll(allMarquees) {
    if (!allMarquees) {
        return;
    }
    for (var j = allMarquees.length - 1; j > -1; j--) {
        maxa = allMarquees[j].ary.length;
        for (var i = 0; i < maxa; i++) {
            var x = allMarquees[j].ary[i].style;
            x.left = (parseInt(x.left, 10) - 1) + 'px';
        }
        var y = allMarquees[j].ary[0].style;
        if (parseInt(y.left, 10) + parseInt(y.width, 10) < 0) {
            var z = allMarquees[j].ary.shift();
            z.style.left = (parseInt(z.style.left) + parseInt(z.style.width) * maxa) + 'px';
            allMarquees[j].ary.push(z);
        }
    }
}