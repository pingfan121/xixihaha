

/**
 * 页面的初始数据
 */


    var data = {
        count: 4,
        colors: {},
        width: 0,
        max_score: 0,
        curr_score: 0,
        point: {}
    }

    var canvas1;

    /**
     * 生命周期函数--监听页面加载
     */
    function onLoad(canvas)
    {
        canvas1 = canvas;


        initColor();
        onStart();

        console.log("测试", "测试出来");
    }

    function initColor() {

        var colors = data.colors;

        colors.c0 = "#9d9087";
        colors.c2 = "#fedcbd";
        colors.c4 = "#dec674";
        colors.c8 = "#c7a252";
        colors.c16 = "#f26522";
        colors.c32 = "#dbce8f";
        colors.c64 = "#c99979";
        colors.c128 = "#de773f";
        colors.c256 = "#bed742";
        colors.c512 = "#da765b";
        colors.c1024 = "#fdb933";
        colors.c2048 = "#f173ac";
        colors.c4096 = "#f7acbc";
        colors.c8192 = "#ef5b9c";
        colors.c16384 = "#45b97c";
        colors.c32768 = "#f15b6c";
        colors.c65536 = "#f8aba6";
        colors.c131072 = "#f391a9";
        colors.c262144 = "#bd6758";
        colors.c524288 = "#d64f44";
        colors.c1048576 = "#c76968";
        colors.c2097152 = "#f26522";
        colors.c4194304 = "#78a355";
        colors.c8388608 = "#faa755";
        colors.c16777216 = "#fab27b";
        colors.c33554432 = "#426ab3";
        colors.c67108864 = "#ae6642";
        colors.c134217728 = "#9b95c9";
        colors.c268435456 = "#d5c59f";
        colors.c536870912 = "#df9464";
        colors.c1073741824 = "#87843b";
    }

    function touchstart(event) {
        data.point.x = event.touches[0].pageX;
        data.point.y = event.touches[0].pageY;

    }

    function touchend(event) {
        var end = {};

        end.x = event.touches[0].pageX;
        end.y = event.touches[0].pageY;

        var res = OperGame(data.point, end);

        if (res == 0)  //游戏结束
        {

        }
        else if (res == 1)//合并了
        {
            playSound();
        }
        else  //只是移动
        {
            playSound();
        }

        console.error("结果:" + res);

        onUpdate();

    }
    function onRestart() {

        var grids = [];

        if (data.count == 4) {
            wx.setStorageSync("grids_4", grids);
        }
        else {
            wx.setStorageSync("grids_6", grids);
        }


        onStart();
    }

    function onStart() {
        var max = "";
        var grids = [];

        if (data.count == 4) {
            max = getdata('max_4');
            grids = getdata('grids_4');
        }
        else {
            max = getdata('max_6');
            grids = getdata('grids_6');
        }

        console.error("最大分数" + max);

        if (max == undefined || max == "") {
            max = 0;
        }

        if (grids == undefined || grids == null || grids == '') {
            grids = [];
        }
        //读取数据
        init2(data.count, grids, max);
        onUpdate();
    }
    function onResetCount() {
        if (data.count == 4) {
            setData({ count: 6 });
        }
        else {
            setData({ count: 4 });
        }


        onStart();

    }

    function playSound() {
        //wx.playBackgroundAudio('../../../src/move.wav');
    }

    function onUpdate()
    {
        onDraw();

        //setData({
        //    curr_score: getcurrscore(),
        //    max_score: getmaxscore()
        //})

        var s_max = "";
        var s_grids = "";

        if (data.count == 4) {
            s_max = "max_4";
            s_grids = "grids_4";
        }
        else {
            s_max = "max_6";
            s_grids = "grids_6";
        }

        var grids = getgrids();

        var score = getmaxscore();

        //保存最大分
        setdata(s_max, score);
        //保存格子数据
        setdata(s_grids, grids);
    }
    //画图
    function onDraw()
    {
        var canvas = canvas1.getContext('2d');
       
        var gap = 5;

        var count = getcount();
        var width = canvas1.width;
        console.error("------" + width);

        var grid_width = (width - (count + 1) * gap) / count;

        canvas.fillStyle = "#72777b";
        canvas.fillRect(0, 0, width, width);


        console.error("格子宽度" + width);
        console.error("格子宽度:" + grid_width);


        var grids = getgrids();

        for (var i = 0; i < grids.length; i++) {
            for (var k = 0; k < grids[i].length; k++) {

                var grid = grids[i][k];

                var starty = gap + i * grid_width + i * gap;
                var startx = gap + k * grid_width + k * gap;

                var temp = data.colors["c" + grid.num];

                canvas.fillStyle=temp;

                canvas.fillRect(startx, starty, grid_width, grid_width);

                if (grid.num != 0) {
                    if (grids[i][k].num < 100000) {
                        //  canvas.setFontSize();
                        var size = grid_width / 3;

                        canvas.font=size+"px Arial";
                    }
                    else if (grids[i][k].num < 10000000) {
                        //  canvas.setFontSize(grid_width / 4);
                  //      canvas.font.fontsize = grid_width / 4;
                    }
                    else if (grids[i][k].num < 100000000) {
                        //  canvas.setFontSize(grid_width / 5);
                  //      canvas.font.fontsize = grid_width / 5;
                    }
                    else if (grids[i][k].num < 2100000000) {
                        // canvas.setFontSize(grid_width / 6);
                //        canvas.font.fontsize = grid_width / 6;
                    }

                    canvas.fillStyle="#000000";
                    canvas.textAlign = 'center';
                    canvas.textBaseline = 'middle';
                    canvas.fillText(grids[i][k].num + "", startx + grid_width / 2, starty + grid_width / 2);

                }
            }
        }

    }
