export class TicTacToe3D{
    /*
        Constructor for our game simulator
    */
    constructor(){
        this.turn = 1; //current turn

        //ToDo: Initialize 4x4x4 board
        this.board = [];
        for (let i=0;i<4;i++){
            const x = [];
            for (let j=0;j<4;j++){
                const y = [];
                for (let k=0;k<4;k++){
                    y.push(0);
                }
                x.push(y);
            }
            this.board.push(x);
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
        let cxz1 =0;let cxy1=0;let cyz1=0;
        let cxz2 =0;let cxy2=0;let cyz2=0;
        for(let k = 0; k<4; k++){
            cx+= board[k][y][z];
            cy+= board[x][k][z];
            cz+= board[x][y][k];
            if(x==z){
                cxz1 += board[k][y][k];
            } else if(x + z == 3){
                cxz2 += board[k][y][3-k];
            }
            if(x==y) {cxy1 += board[k][k][z];
            }else if(x+y==3){
                cxy2 += board[k][3-k][z];
            }
            if(y==z) {cyz1 += board[x][k][k];
            }else if(y+z==3){
                cyz2 += board[x][k][3-k];
            }
        }
        if (Math.abs(cx) === 4 || Math.abs(cy) === 4 || Math.abs(cz) === 4) {
            return true;
        }
        if (Math.abs(cxz1) === 4 || Math.abs(cxy1) === 4 || Math.abs(cyz1) === 4 ) {
            return true;
        }
        // check if on one of the 4 super diagonals
        // x==y || 3-x == y
        let cxyz=0; let cxyz1=0; let cxyz2=0; let cxyz3=0;
        for(let k = 0; k<4; k++){
            if(x==y && y==z){
                cxyz+= board[k][k][k];
            }
            if (x==y && y==3-z){
                cxyz1 += board[k][k][3-k];
            }
            if (x==3-y && y==z){
                cxyz2 += board[3-k][k][k];
            }
            if (x==3-y && y==3-z){
                cxyz3 += board[k][3-k][k];
            }
            
        }
        if (Math.abs(cxyz) === 4 || Math.abs(cxyz1) === 4 || Math.abs(cxyz2) === 4 || Math.abs(cxyz3) === 4) {
            return true;
        }

        
    }
};
