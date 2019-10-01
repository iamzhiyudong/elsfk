    
function game() {
        this.x = 120; //控制水平位置
        this.y = 0; //控制垂直位置
        this.pause = true;
        this.over = false;
        this.cols = [];
        for (var i = 0; i < 15; i++) {
            this.cols[i] = [];
        };
        this.score = 0;
        this.map = [
            //T
            [
                [
                    [0, -30],
                    [30, -30],
                    [60, -30],
                    [30, -60]
                ],
                [
                    [30, -30],
                    [30, -60],
                    [30, -90],
                    [60, -60]
                ],
                [
                    [0, -60],
                    [30, -60],
                    [60, -60],
                    [30, -30]
                ],
                [
                    [30, -30],
                    [30, -60],
                    [30, -90],
                    [0, -60]
                ]
            ] // ,
            // //I
            // [
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [60, -30],
            //         [90, -30]
            //     ],
            //     [
            //         [0, -30],
            //         [0, -60],
            //         [0, -90],
            //         [0, -120]
            //     ],
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [60, -30],
            //         [90, -30]
            //     ],
            //     [
            //         [0, -30],
            //         [0, -60],
            //         [0, -90],
            //         [0, -120]
            //     ]
            // ],
            // //L
            // [
            //     [
            //         [30, -30],
            //         [30, -60],
            //         [30, -90],
            //         [60, -30]
            //     ],
            //     [
            //         [0, -60],
            //         [30, -60],
            //         [60, -60],
            //         [0, -30]
            //     ],
            //     [
            //         [30, -30],
            //         [30, -60],
            //         [30, -90],
            //         [0, -90]
            //     ],
            //     [
            //         [0, -60],
            //         [30, -60],
            //         [60, -60],
            //         [60, -90]
            //     ]
            // ],
            // //S
            // [
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [0, -60],
            //         [30, -60]
            //     ],
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [0, -60],
            //         [30, -60]
            //     ],
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [0, -60],
            //         [30, -60]
            //     ],
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [0, -60],
            //         [30, -60]
            //     ]
            // ],
            // //倒L
            // [
            //     [
            //         [30, -30],
            //         [30, -60],
            //         [30, -90],
            //         [60, -90]
            //     ],
            //     [
            //         [0, -60],
            //         [30, -60],
            //         [60, -60],
            //         [60, -30]
            //     ],
            //     [
            //         [30, -30],
            //         [30, -60],
            //         [30, -90],
            //         [0, -30]
            //     ],
            //     [
            //         [0, -60],
            //         [30, -60],
            //         [60, -60],
            //         [0, -90]
            //     ]
            // ],
            // //Z
            // [
            //     [
            //         [0, -60],
            //         [30, -60],
            //         [30, -30],
            //         [60, -30]
            //     ],
            //     [
            //         [0, -30],
            //         [0, -60],
            //         [30, -60],
            //         [30, -90]
            //     ],
            //     [
            //         [0, -90],
            //         [30, -90],
            //         [30, -60],
            //         [60, -60]
            //     ],
            //     [
            //         [30, -30],
            //         [30, -60],
            //         [60, -60],
            //         [60, -90]
            //     ]
            // ],
            // //倒Z
            // [
            //     [
            //         [0, -30],
            //         [30, -30],
            //         [30, -60],
            //         [60, -60]
            //     ],
            //     [
            //         [0, -90],
            //         [0, -60],
            //         [30, -60],
            //         [30, -30]
            //     ],
            //     [
            //         [0, -60],
            //         [30, -60],
            //         [30, -90],
            //         [60, -90]
            //     ],
            //     [
            //         [30, -60],
            //         [30, -90],
            //         [60, -60],
            //         [60, -30]
            //     ]
            // ]
        ];
    };



    game.prototype = {
        //游戏开始 生成初始数据
        start: function () {
            this.r1 = Math.floor(Math.random() * this.map.length); //随机的形状
            this.r2 = Math.floor(Math.random() * 4); //随机的朝向

            this.r3 = Math.floor(Math.random() * this.map.length); //预览图形的形状
            this.r4 = Math.floor(Math.random() * 4); //预览图形的朝向
            //this.newRandom();
            this.showBlock();
            this.autoMove();
            this.keyMove();
            var that = this;
            $(".buttonStart").on("click", function () {


                that.pause = !that.pause;
                if (that.pause) {
                    $(this).text("开 始")
                } else {
                    $(this).text("暂 停")
                }
            });

        },

        newRandom: function () {
            this.r1 = Math.floor(Math.random() * this.map.length); //随机的形状
            this.r2 = Math.floor(Math.random() * 4); //随机的朝向

            this.r3 = Math.floor(Math.random() * this.map.length); //预览图形的形状
            this.r4 = Math.floor(Math.random() * 4); //预览图形的朝向

        },
        //生成可移动的块
        showBlock: function () {
            for (var i = 0; i < 4; i++) {
                $("<div class='blockmove move'></div>").css({
                    top: this.map[this.r1][this.r2][i][1] + this.y + "px",
                    left: this.map[this.r1][this.r2][i][0] + this.x + "px",
                    //backgroundColor: "red"
                }).appendTo(".gameBox");
                $("<div class='nextSmallBlock'></div>").css({
                    top: (this.map[this.r3][this.r4][i][1] / 3) * 2 + 80 + "px",
                    left: (this.map[this.r3][this.r4][i][0] / 3) * 2 + 0 + "px",
                    //backgroundColor: "red"
                }).appendTo(".nextBox")
            }
        },
        restBlock: function () {
            //将即将固定的块记录到数组中
            this.addCols();
            // $(".move").
            this.r1 = this.r3;
            this.r2 = this.r4;
            this.r3 = Math.floor(Math.random() * this.map.length); //预览图形的形状
            this.r4 = Math.floor(Math.random() * 4); //预览图形的朝向
            $(".nextSmallBlock").removeClass("nextSmallBlock");
        },
        addCols: function () {
            var moves = $(".move");
            for (var i = 0; i < moves.length; i++) {
                var top = Math.round(moves.eq(i).position().top);
                //获取每一个小块的行，数组索引值
                if (top < 0) {
                    this.over = true;
                    alert("Game Over!")
                    window.location.reload();
                    break;
                }
                var index = top / 30;
                this.cols[index].push(1);
            };
            console.log(this.cols);
            this.addScore();
        },
        addScore: function () {
            var that = this;
            //排满的行数
            var num = 0;
            //记录得分
            var score = 0;
            for (var i = 0; i < 15; i++) {
                if (that.cols[i].length == 11) {
                    num += 1;
                    for (var j = i; j >= 0; j--) {
                        this.cols[j] = this.cols[j - 1] || [];
                    };
                    this.removeLine(i);
                };
            };
            if (num == 1) {
                score = 100;
            };
            if (num == 2) {
                score = 300;
            };
            if (num == 3) {
                score = 600;
            };
            if (num == 4) {
                score = 900;
            };
            this.score = this.score + score;
            $(".score").text("分数:" + this.score);

        },
        removeLine: function (t) { //行数
            var blocks = $(".blockmove");
            for (var i = 0; i < blocks.length; i++) {
                var top = Math.round(blocks.eq(i).position().top);
                if (top == t * 30) {
                    bocks.eq(i).remove();
                } else if (top < t * 30) {
                    blocks.eq(i).css("top", top + 30 + "px");
                }
            }
        },
        //调整y的大小，用来控制块的向下移动
        autoMove: function () {
            var that = this;

            var time = setInterval(function () {
                if (that.pause || that.judgeWin() || that.over) {
                    return false;
                }
                if ((that.y + that.maxY()) > 420 || that.judgeY()) {
                    //移除到底的小方格的move类名，防止再次移动
                    $(".move").addClass("done");
                    $(".move").removeClass("move");


                    that.y = 0;
                    that.x = 120;
                    that.restBlock();
                    //clearInterval(time);
                    //that.newRandom();
                    that.showBlock();
                    //that.autoMove();

                    return false;
                }
                that.y += 30; //y的初始值为0 移动每次加30
                that.move(); //先移动再调用move来实现刷新位置

            }, 600)
        },
        //调整并显示块的当前位置
        move: function () {
            var blocks = $(".move");
            for (var i = 0; i < blocks.length; i++) {
                blocks.eq(i).css({
                    top: this.map[this.r1][this.r2][i][1] + this.y + "px", //调整y的值后 修改每个块的坐标
                    left: this.map[this.r1][this.r2][i][0] + this.x + "px"
                })
            }
        },

        keyMove: function () {
            var that = this;

            $(document).on("keydown", function (event) {
                if (that.pause || that.judgeWin() || that.over) {
                    return false;
                }
                var code = event.keyCode;
                console.log(code)
                if (code == 39) {
                    //向右
                    if ((that.maxX() + that.x) >= 300 || that.judgeX()) {
                        return false;
                    };
                    that.x += 30;
                    //console.log("moveX");
                    that.move();
                }
                if (code == 37) {
                    //向左
                    if (that.x == 0 || that.judgeX()) {
                        return false;
                    }
                    that.x -= 30;
                    that.move();
                }
                if (code == 40) {
                    //向左
                    if ((that.y + that.maxY()) > 420 || that.judgeY()) {
                        return false;
                    }
                    that.y += 30;
                    that.move();
                }
                if (code == 38) {
                    //向上
                    if ((that.y + that.maxY()) >= 420 || that.judgeY() || that.judgeX()) {
                        return false;
                    }
                    if (that.r2 == 3) {
                        that.r2 = 0;
                    } else {
                        that.r2 += 1;
                    }

                    that.move();
                }
            })
        },
        //
        canRotate: function (r2) {
            var that = this;
            var t = true;
            var blocks = $(".block").not(".move")
            for (var i = 0; i < blocks.length; i++) {
                var bTop = Math.round(blocks.eq(i).position().top);
                var bLeft = Math.round(blocks.eq(i).position().left);
                for (var j = 0; j < 4; j++) {
                    var mTop = that.map[that.r1][r2][j][1] + that.y;
                    var mLeft = that.map[that.r1][r2][j][0] + that.x;
                    console.log(bTop, mTop, bLeft, mLeft)
                    if (mLeft >= 300) {
                        t = false;
                        break;
                    };
                    if (mTop >= 420) {
                        t = false;
                        break;
                    };
                    if (bTop == mTop && bLeft == mLeft) {
                        t = false;
                        break;
                    };
                };
            };
            return t;
        },
        //获取最右边的小方格的x值
        maxX: function () {
            var x = 0;
            for (var i = 0; i < 4; i++) { //每个图形数组有4个，进行遍历
                if (this.map[this.r1][this.r2][i][0] > x) {
                    x = this.map[this.r1][this.r2][i][0];
                };
            };
            return x;
        },
        //获取最下边的小方格的y值
        maxY: function () {
            var y = 0;
            for (var i = 0; i < 4; i++) {
                if (this.map[this.r1][this.r2][i][1] > y) {
                    y = this.map[this.r1][this.r2][i][1];
                };
            };
            return y;
        },
        //判断纵向是否相撞
        judgeY: function () {
            for (var i = 0; i < $(".move").length; i++) {
                var nowX = $(".move").eq(i).position().left;
                var nowY = $(".move").eq(i).position().top;
                for (var j = 0; j < $(".done").length; j++) {
                    var doneX = $(".done").eq(j).position().left;
                    var doneY = $(".done").eq(j).position().top;
                    if (nowX == doneX) {
                        // if (nowY + 30 == doneY && doneY == 30) {
                        //     return true;
                        // }
                        if (nowY + 30 == doneY) {
                            return true;
                        }
                    }
                }

            }
        },
        //判断横向是否相撞
        judgeX: function () {
            for (var i = 0; i < $(".move").length; i++) {
                var nowX = $(".move").eq(i).position().left;
                var nowY = $(".move").eq(i).position().top;
                for (var j = 0; j < $(".done").length; j++) {
                    var doneX = $(".done").eq(j).position().left;
                    var doneY = $(".done").eq(j).position().top;
                    if (nowY == doneY) {
                        if (nowX - 30 == doneX || nowX + 30 == doneX) {
                            return true;
                        }
                    }
                }

            }

        },
        //判断纵向是否相撞
        judgeWin: function () {
            var length = $(".move").length;
            for (var i = 0; i < length; i++) {
                var nowX = $(".move").eq(i).position().left;
                var nowY = $(".move").eq(i).position().top;
                for (var j = 0; j < $(".done").length; j++) {
                    var doneX = $(".done").eq(j).position().left;
                    var doneY = $(".done").eq(j).position().top;
                    if (nowX == doneX) {
                        if (nowY + 30 == doneY && doneY == 30 && nowY == 0) {
                            return true;
                        }

                    }
                }

            }
        },


    };


    var game = new game();
    game.start();