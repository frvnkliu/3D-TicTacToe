export class TicTacToe3D{
    /*
        Constructor for our game simulator
    */
    constructor(){
        this.turns = 0; //current turn

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
                this.board[i][j].fill(0);
            }
        }
    }

    /*
        Takes a position [x,y,z] and checks if this point is available to be moved
    */
    canMove(pos){
        const [x,y,z] = pos;
        return this.board[x][y][z] == 0;
    }

    /*
        Takes a position [x,y,z] and places a move at that point
        returns true if this is a winning move
    */
    makeMove(pos){
        console.log(this.getCurrPlayer());
        const [x,y,z] = pos;
        if (this.canMove(pos)){
            if (this.turns%2==1){
                this.board[x][y][z]=1;
            }else{
                this.board[x][y][z]=-1;
            }
            this.turns++;
            return (this.won(pos)) ? this.getCurrPlayer() : 0;           
        }else{
            return -1;
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
            //fixing two axis
            cx+= this.board[k][y][z];
            cy+= this.board[x][k][z];
            cz+= this.board[x][y][k];

            //fixing 1 axis
            if(x==z){
                cxz1 += this.board[k][y][k];
            } else if(x + z == 3){
                cxz2 += this.board[k][y][3-k];
            }
            if(x==y) {cxy1 += this.board[k][k][z];
            }else if(x + y == 3){
                cxy2 += this.board[k][3-k][z];
            }
            if(y==z) {cyz1 += this.board[x][k][k];
            }else if(y + z == 3){
                cyz2 += this.board[x][k][3-k];
            }
        }
        /*
        console.log(`cx: ${cx}, cy: ${cy}, cz: ${cz}`);
        console.log(`cxz1: ${cxz1}, cxy1: ${cxy1}, cyz1: ${cyz1}`);
        console.log(`cxz2: ${cxz2}, cxy2: ${cxy2}, cyz1: ${cyz2}`);
        */
        if (Math.abs(cx) === 4 || Math.abs(cy) === 4 || Math.abs(cz) === 4) {
            return true;
        }
        if (Math.abs(cxz1) === 4 || Math.abs(cxy1) === 4 || Math.abs(cyz1) === 4 ) {
            return true;
        }
        if (Math.abs(cxz2) === 4 || Math.abs(cxy2) === 4 || Math.abs(cyz2) === 4 ) {
            return true;
        }
        // check if on one of the 4 super diagonals
        // x==y || 3-x == y
        let cxyz=0; let cxyz1=0; let cxyz2=0; let cxyz3=0;
        for(let k = 0; k<4; k++){
            if(x==y && y==z){
                cxyz+= this.board[k][k][k];
            }
            if (x==y && y==3-z){
                cxyz1 += this.board[k][k][3-k];
            }
            if (x==3-y && y==z){
                cxyz2 += this.board[3-k][k][k];
            }
            if (x==3-y && y==3-z){
                cxyz3 += this.board[k][3-k][k];
            }
            
        }
        if (Math.abs(cxyz) === 4 || Math.abs(cxyz1) === 4 || Math.abs(cxyz2) === 4 || Math.abs(cxyz3) === 4) {
            return true;
        }

        
    }

    getCurrPlayer(){
       return this.turns%2 ? 2 : 1;
    }
};
