/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="score4_AI.ts" />

class Score4State {
    board: number[][];
    info: string;
    wins: number;
    losses: number;
    brain_depth: number;
}

class Score4 extends React.Component<any, Score4State> {
    brain: Score4_AI;

    static GAME_OVER_MESSAGE = "GAME OVER - Try again?";
    constructor() {
        super();
        this.reset();
        this.state.wins = 0;
        this.state.losses = 0;
        this.brain = new Score4_AI(this.state.board);
        this.state.brain_depth = this.brain.defaultDepth;
    }

    dropDisk(oldBoard, column, color) {
        var newBoard = oldBoard;
        for(var row=Score4_AI.height-1; row>=0; row--) {
            if (newBoard[row][column] === 0) {
                // Immutable - stay immutable, kid!
                newBoard[row] = newBoard[row].slice(0)
                newBoard[row][column] = color;
                return newBoard;
            }
        }
        return null;
    }

    gameOver() {
        return this.state.info === Score4.GAME_OVER_MESSAGE;
    }

    checkEndGame(getMsg: ()=>string, getBoard: ()=>number[][]):boolean {
        var msg:string, check = this.brain.CheckWinner();
        if (check.allDone) {
            if (check.winner == 4)
                this.state.losses++;
            else if (check.winner == -4)
                this.state.wins++;
            msg = Score4.GAME_OVER_MESSAGE;
        } else
            msg = getMsg();
        this.setState({
            board: getBoard(),
            info: msg,
            wins: this.state.wins,
            losses: this.state.losses,
            brain_depth: this.state.brain_depth
        });
        return check.allDone;
    }

    handleClick(column) {
        if (this.gameOver())
            return;
        var newBoard = this.dropDisk(this.state.board, column, -1);
        this.brain.board = newBoard;
        if (this.checkEndGame(
                () => "Thinking, please wait...",
                () => (newBoard !== null ? newBoard : this.state.board) )
            )
            return;
        // Give the browser the opportunity to draw the tiles
        setTimeout(this.playMove.bind(this), 100);
    }

    playMove() {
        var start_t = new Date();
        var result = this.brain.minimax(true, 1, this.state.brain_depth);
        var end_t = new Date();
        if (result[0] != -1) {
            this.brain.board = this.state.board;
            this.brain.dropDiskMutate(result[0], 1);
        }
        this.checkEndGame(
            () =>
                "CPU was thinking for " +
                (end_t.getTime() - start_t.getTime())/1000.0 +
                " seconds."
            ,
            () => this.state.board);
    }

    reset() {
        if (this.state === undefined || this.state === null)
            this.state = new Score4State();
        this.state.board = [];
        for (var y=0; y<Score4_AI.height; y++) {
            var r = [];
            for (var x=0; x<Score4_AI.width; x++) {
                r.push(0)
            }
            this.state.board.push(r);
        }
        var bottom = Score4_AI.height-1;
        var middle = Math.floor(Score4_AI.width/2);
        this.state.board[bottom][middle] = 1;
        this.state.info = "Click on any column to drop a green chip...";
    }

    render() {
        var self = this;
        var resetAndRepaint = () => {
            self.reset();
            this.setState({
                board: this.state.board,
                info: this.state.info,
                wins: this.state.wins,
                losses: this.state.losses,
                brain_depth: this.state.brain_depth
            });
        };
        var dumber = () => {
            if (this.state.brain_depth > 2)
                this.setState({
                    board: this.state.board,
                    info: this.state.info,
                    wins: this.state.wins,
                    losses: this.state.losses,
                    brain_depth: this.state.brain_depth-1
                });
        };
        var smarter = () => {
            if (this.state.brain_depth < this.brain.defaultDepth+1)
                this.setState({
                    board: this.state.board,
                    info: this.state.info,
                    wins: this.state.wins,
                    losses: this.state.losses,
                    brain_depth: this.state.brain_depth+1
                });
        };
            
        var cellMaker = (y:number, x:number) => {
            return (
                <td key={x} onClick={self.handleClick.bind(self, x)}>
                    <div
                        className={
                            (() => {
                                switch(self.state.board[y][x]) {
                                case  4: return "red_won_coin";
                                case  1: return "red_coin";
                                case -1: return "green_coin";
                                case -4: return "green_won_coin";
                                default: return "no_coin";
                                }
                            })()
                        }
                    />
                </td>
            );
        };
        var proclaim = 
            (n:number) => String(n) + " victor" + (n === 1? "y.":"ies.")
        ;
        var range = (n:number) => {
            var result = [];
            for(var i=0; i<n; i++) 
                result.push(i);
            return result;
        };
        return (
            <div>
                <table>
                    <tr>
                        <td style={{"min-width":"7em"}}>
                            <div style={{
                                "vertical-align": "middle"
                            }}>
                                <span style={{color:"green", "align":"right"}}><b>You</b>:</span><br/>
                                {proclaim(this.state.wins)}
                            </div>
                        </td>
                        <td>
                            <table className={"grid_table"}>
                            {
                                range(Score4_AI.height).map( y => (
                                        <tr key={y}>
                                        {
                                            range(Score4_AI.width).map( 
                                                x => cellMaker(y, x)
                                            )
                                        }
                                        </tr>
                                    )
                                )
                            }
                            </table>
                            <p>{this.state.info}</p>
                            <div>
                                <button type="button" onClick={resetAndRepaint} style={{float:'left'}}>
                                    <b>New game</b>
                                </button>
                                <div style={{float:'right'}}>
                                    <button type="button" onClick={dumber}><b>Be dumber!</b></button>
                                    <span style={{width:10}}>&nbsp;</span>
                                    {this.state.brain_depth} moves ahead
                                    <span style={{width:10}}>&nbsp;</span>
                                    <button type="button" onClick={smarter}><b>Be smarter!</b></button>
                                </div>
                            </div>
                        </td>
                        <td style={{"min-width":"7em"}}>
                            <div style={{
                                "vertical-align": "middle"
                            }}>
                                <span style={{color:"red", "align":"right"}}><b>CPU</b>:</span><br/>
                                {proclaim(this.state.losses)}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    showComponent() {
        React.render(
            <Score4 />, document.getElementById('board'));
    }
}

(function(window, document, undefined) {
    window.onload = function() {
        var game = new Score4();
        game.showComponent();
    }
})(window, document, undefined);
