
class Score4_AI {

    defaultDepth: number;

    //static width = 9;
    static width = 7;
    //static height = 8;
    static height = 6;
    static orangeWins = 1000000;
    static yellowWins = -1000000;

    static steps = [
       [ [0,0], [-1,1],  [-2,2],  [-3,3]  ],  // diagonal, up-right
       [ [0,0], [0,1],   [0,2],   [0,3]   ],  // horizontal,right
       [ [0,0], [1,1],   [2,2],   [3,3]   ],  // diagonal, down-right
       [ [0,0], [1,0],   [2,0],   [3,0]   ]   // vertical, down
    ];

    static inside(y,x) {
        return y>=0 && y<Score4_AI.height && x>=0 && x<Score4_AI.width;
    }

    constructor(public board:number[][]) {
        var platform = navigator.platform + "," + navigator.userAgent;

        var GetDepthLevel = function(a) {
            if (/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
                return 5;
            }
            else {
                return 6;
            }
        }
        this.defaultDepth = GetDepthLevel(navigator.userAgent||navigator.vendor);
    }

    CheckWinner():{allDone:boolean,winner:number} {
        var board = this.board;
        var x, y, idx;

        for (y=0; y<Score4_AI.height; y++) {
            for (x=0; x<Score4_AI.width; x++) {
                for (var direction=0; direction<4; direction++) {
                    var score = 0;
                    for (idx=0; idx<4; idx++) {
                        var yofs = Score4_AI.steps[direction][idx][0];
                        var xofs = Score4_AI.steps[direction][idx][1];
                        if (Score4_AI.inside(y+yofs,x+xofs)) {
                            var value = board[y+yofs][x+xofs];
                            if (value==1 || value==-1)
                                score += value;
                        }
                    }
                    if (score==4 || score==-4) {
                        for (idx=0; idx<4; idx++) {
                            yofs = Score4_AI.steps[direction][idx][0];
                            xofs = Score4_AI.steps[direction][idx][1];
                            if (Score4_AI.inside(y+yofs,x+xofs))
                                this.board[y+yofs][x+xofs] = score;
                        }
                        return {allDone:true, winner:score};
                    }
                }
            }
        }
        for (x=0; x<Score4_AI.width; x++)
            if (board[0][x] == 0)
                return {allDone:false, winner:0};
        return {allDone:true, winner:0}; // All filled-up, tie!
    }

    dropDiskMutate(column, color)
    {
        for(var row=Score4_AI.height-1; row>=0; row--) {
            if (this.board[row][column] === 0) {
                this.board[row][column] = color;
                return row;
            }
        }
        return -1;
    }

    minimax(maximizeOrMinimize, color, depth) {
        var state = this.board;
        if (0 === depth) {
            return [-1, this.ScoreBoard()];
        } else {
            var bestScore=maximizeOrMinimize?-10000000:10000000;
            var bestMove=-1;
            for (var column=0; column<Score4_AI.width; column++) {
                if (state[0][column]!==0) continue;
                var rowFilled = this.dropDiskMutate(column, color);
                if (rowFilled === -1)
                    continue;
                var s = this.ScoreBoard();
                if (s == (maximizeOrMinimize?Score4_AI.orangeWins:Score4_AI.yellowWins)) {
                    bestMove = column;
                    bestScore = s;
                    state[rowFilled][column] = 0;
                    break;
                }
                var result = this.minimax(!maximizeOrMinimize, color==1?-1:1, depth-1);
                var scoreInner = result[1];
                //if (depth == 7)
                //    alert("Score for " + column + ": " + scoreInner);
                state[rowFilled][column] = 0;
                // when loss is certain, avoid forfeiting the match,
                // by shifting scores by depth...
                if (scoreInner == Score4_AI.orangeWins || scoreInner == Score4_AI.yellowWins)
                    scoreInner -= depth*color;
                if (maximizeOrMinimize) {
                    if (scoreInner>=bestScore) {
                        bestScore = scoreInner;
                        bestMove = column;
                    } 
                } else {
                    if (scoreInner<=bestScore) {
                        bestScore = scoreInner;
                        bestMove = column;
                    }
                }
            }
            return [bestMove, bestScore];
        }
    }

    ScoreBoard() {
        var counters = [0,0,0,0,0,0,0,0,0];
        var x, y, score, idx;
        var state = this.board;

        // Horizontal spans
        for(y=0; y<Score4_AI.height; y++) {
            score = state[y][0] + state[y][1] + state[y][2];
            for(x=3; x<Score4_AI.width; x++) {
                score += state[y][x];
                counters[score+4]++;
                score -= state[y][x-3];
            }
        }
        // Vertical spans
        for(x=0; x<Score4_AI.width; x++) {
            score = state[0][x] + state[1][x] + state[2][x];
            for(y=3; y<Score4_AI.height; y++) {
                score += state[y][x];
                counters[score+4]++;
                score -= state[y-3][x];
            }
        }
        // Down-right (and up-left) diagonals
        for(y=0; y<Score4_AI.height-3; y++) {
            for(x=0; x<Score4_AI.width-3; x++) {
                score = 0;
                for(idx=0; idx<4; idx++) {
                    score += state[y+idx][x+idx];
                }
                counters[score+4]++;
            }
        }
        // up-right (and down-left) diagonals
        for(y=3; y<Score4_AI.height; y++) {
            for(x=0; x<Score4_AI.width-3; x++) {
                score = 0;
                for(idx=0; idx<4; idx++) {
                    score += state[y-idx][x+idx];
                }
                counters[score+4]++;
            }
        }
        if (counters[0] !== 0)
            return Score4_AI.yellowWins;
        else if (counters[8] !== 0)
            return Score4_AI.orangeWins;
        else 
            return counters[5] + 2*counters[6] + 5*counters[7] - counters[3] - 2*counters[2] - 5*counters[1];
    }

}
