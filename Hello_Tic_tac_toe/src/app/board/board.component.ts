import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[] = [];
  xIsNext: boolean = true;
  winner: string = "";
  xScore: number = 0;
  oScore: number = 0;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill("");
    this.winner = "";

    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  async makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    await this.delay(2000);
    this.calculateWinner();

  }

  winGame(box: string) {
    if (box == "X") {
      this.xScore += 1;
    }
    else{
    this.oScore += 1;
    }
    this.newGame()
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.winGame(this.squares[a]);
      }
    }
    return "";
  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}


