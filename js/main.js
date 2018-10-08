window.onload = function () {
    var row = 4, col = 4, // Change the Values Here!
        bool = true, btn = document.querySelectorAll('button')[0];
    btn.onclick = function () {
        bool ? shuffle() : shuffle.stop();
        bool = !bool;
    };
    for (var i = 0, j; i < row; i++) {
        j = col;
        document.querySelectorAll('table')[0].appendChild(document.createElement('tr'));
        while (j-- > 0)
            document.querySelectorAll('tr')[i].appendChild(document.createElement('td'));
    }
    var box = document.querySelectorAll('td'), move = 0, p = row * col - 1;
    var nth = box.length - 1;
    for (var i = 0; i <= nth;) {
        box[i].addEventListener('click', clicked(i));
        box[i].innerHTML = ++i;
    }
    function clicked(k) {
        return function () {
            document.querySelectorAll('span')[0].innerHTML = 'Ходы: ' + ++move;
            play(k);
            if (box[nth].style.visibility == 'hidden') check(box);
        };
    }
    function play(k) {
        var gap = [-col, -1, 1, col];
        if (k < col) gap[0] = 0;
        if (k % col == 0) gap[1] = 0;
        if (k % col == col - 1) gap[2] = 0;
        for (var i = 0; i < 4; i++)
            if (box[k + gap[i]].style.visibility == 'hidden') {
                box[k + gap[i]].innerHTML = box[k].innerHTML;
                box[k + gap[i]].style.visibility = 'visible';
                box[k].style.visibility = 'hidden';
                break;
            }
    }
    function shuffle()
    {
        if (p == nth) box[p].style.visibility = 'hidden';
        btn.style.background = 'skyblue';
        var H = Math.floor(Math.random() * 2), X, q;
        move = q = 0;
        var loop = setInterval(function () {
            if (H == 0 && p % col == 0) p++; else q++;
            if (H == 0 && p % col == col - 1) p--; else q++;
            if (H == 1 && p < col) p += col; else q++;
            if (H == 1 && p > (row - 1) * col - 1) p -= col; else q++;
            if (q == 4) {
                X = Math.floor(Math.random() * 2);
                if (H == 0 && X == 0) p--;
                if (H == 0 && X == 1) p++;
                if (H == 1 && X == 0) p -= col;
                if (H == 1 && X == 1) p += col;
            }
            H = H ? 0 : 1; q = 0;
            function stop() {
                btn.style.background = 'white';
                clearInterval(loop);
            } shuffle.stop = stop;
            if (p >= 0 && p < row * col) play(p); else alert("oh yeah!");
        }, 100);
    }
    function check(arr) {
        var i = 0;
        while (i < nth)
            if (arr[i].innerHTML == ++i) continue; else break;
        if (i == nth) {
            box[nth].style.visibility = 'visible';
            box[nth].innerHTML = row * col;
            p = row * col - 1;
            alert("Congratulations!\nYou Completed the Puzzle in " + move + " Moves.");
        }
    }
}
