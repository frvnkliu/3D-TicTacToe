export class TicTacToe3D{
    /*
        Constructor for our game simulator
    */
    constructor(){
        this.turn = 1; //current turn

        //ToDo: Initialize 4x4x4 board
        this.board = [];
        for (let i=0;i<4;i++){
            x = [];
            for (let j=0;j<4;j++){
                y = [];
                for (let k=0;k<4;k++){
                    y.append(0);
                }
                x.append(y);
            }
            this.board.append(x);
        }
        //ToDo?: Initialize column/row/diagonal sums for checking if player has won
        
    }
    /*
        Resets board to initial state
    */
    resetGame(){
        this.turns = 0;
        for (let i=0;i<4;i++){
            for (let j=0;j<4;j++){
                board[i][j].fill(0);
            }
        }
    }

    /*
        Takes a position [x,y,z] and checks if this point is available to be moved
    */
    canMove(pos){
        const [x,y,z] = pos;
        return this.board[x][y][z]!=0
    }

    /*
        Takes a position [x,y,z] and places a move at that point
        returns true if this is a winning move
    */
    makeMove(pos){
        const [x,y,z] = pos;
        if (this.canMove(pos)){
            if (this.turn%2==1){
                this.board[x][y][z]==1;
            }else{
                this.board[x][y][z]==-1;
            }
            this.turn++;
            return this.won(pos);         
        }else{
            return false;
        }
    }

    /*
        Input:
        pos - position [x,y,z] of the last played move

        Checks if a player has won the game, and if so returns the player (1,2)
        Assumes that only one player can win the game (4 in a row)
    */
    won(pos){
        const [x,y,z] = pos;

        // check straight lines
        let cx = 0;let cy = 0; let cz = 0;
        let cxz =0;let cxy=0;let cyz=0;
        for(let k = 0; k<4; k++){
            cx+= board[k][y][z];
            cy+= board[x][k][z];
            cz+= board[x][y][k];
            cxz+= board[k][y][k];
            cxy+= board[k][k][z];
            cyz+= board[x][k][k];
        }
        if (Math.abs(cx) === 4 || Math.abs(cy) === 4 || Math.abs(cz) === 4) {
            return true;
        }
        if (Math.abs(cxz) === 4 || Math.abs(cxy) === 4 || Math.abs(cyz) === 4 ) {
            return true;
        }
        // check
        let cxyz=0;
        for(let k = 0; k<4; k++){
            cxyz+= board[k][k][k];
        }
        
    }
};
