"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TicTacToeController = void 0);
class TicTacToeController {
  constructor() {
    (this.SelfCamp = 1),
      (this.SelectIndex = -1),
      (this.WinLineCount = 3),
      (this.ChessBoard = void 0),
      (this.OnPieceMove = void 0);
  }
  Init(t, e) {
    (this.ChessBoard = t), (this.SelfCamp = e);
  }
  OnStartRound() {}
  OnStartGame() {
    this.SelectIndex = -1;
  }
  get IsSelecting() {
    return -1 < this.SelectIndex;
  }
  get SelectPieceIndex() {
    return this.SelectIndex;
  }
  SelectPiece(t) {
    if (this.SelectIndex !== t) {
      if (!this.ChessBoard.CheckPieceSelect(t, this.SelfCamp))
        return !(this.SelectIndex = -1);
      this.SelectIndex = t;
    }
    return !0;
  }
  ResetSelectPiece(t) {
    return this.SelectIndex === t && ((this.SelectIndex = -1), !0);
  }
  GetSelectNeighbor() {
    return this.ChessBoard.GetNoneNeighbors(this.SelectIndex);
  }
  RegisterEvent(t) {
    this.OnPieceMove = t;
  }
  MovePiece(t) {
    return this.ChessBoard?.CheckPieceMove(
      this.SelectIndex,
      t,
      this.SelfCamp,
    ) && this.ChessBoard?.OnPieceMove(this.SelectIndex, t)
      ? (this.OnPieceMove && this.OnPieceMove(this.SelectIndex, t),
        (this.SelectIndex = -1),
        !0)
      : !(this.SelectIndex = -1);
  }
  OnResetGame() {
    this.OnStartGame();
  }
}
exports.TicTacToeController = TicTacToeController;
//# sourceMappingURL=TicTacToeController.js.map
