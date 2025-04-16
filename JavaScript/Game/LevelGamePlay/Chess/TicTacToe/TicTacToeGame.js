"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TicTacToeGame = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TicTacToeAIController_1 = require("./TicTacToeAIController"),
  TicTacToeBoard_1 = require("./TicTacToeBoard"),
  TicTacToeController_1 = require("./TicTacToeController");
class TicTacToeGame {
  constructor() {
    (this.Controller = new TicTacToeController_1.TicTacToeController()),
      (this.AiController = new TicTacToeAIController_1.TicTacToeAiController()),
      (this.Board = new TicTacToeBoard_1.TicTacToeBoard()),
      (this.WinLineCount = 3),
      (this.CampLoop = [1, 2]),
      (this.PlayerCamp = 1),
      (this.AiCamp = 2),
      (this.CurrentCamp = this.CampLoop[0]),
      (this.AutoNextRound = !1),
      (this.QOa = 0),
      (this.L5a = !0),
      (this.KOa = 0),
      (this.OnGameOverCallback = (t) => {
        this.OnGameOver(t);
      }),
      (this.OnEndRoundCallback = () => {
        this.OnEndRound();
      });
  }
  Init(t, i) {
    this.Board.Init(
      this.WinLineCount,
      this.OnGameOverCallback,
      this.OnEndRoundCallback,
    ),
      this.Controller.Init(this.Board, this.PlayerCamp),
      this.AiController.InitAi(this.Board, this.AiCamp, this.PlayerCamp),
      this.Controller.RegisterEvent(i),
      this.AiController.RegisterEvent(i),
      this.SetOffensive(t);
  }
  RefreshAiEnable(t) {
    this.L5a !== t &&
      (this.L5a || this.CurrentCamp !== this.AiCamp || this.StartRound(),
      (this.L5a = t));
  }
  StartRound() {
    this.CurrentCamp === this.PlayerCamp
      ? this.Controller.OnStartRound()
      : this.CurrentCamp === this.AiCamp
        ? this.L5a && this.AiController.OnStartRound()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelPlay", 36, "[TicTacToe]当前回合阵营错误");
  }
  OnIndexSelect(t) {
    return this.Controller.IsSelecting
      ? !!this.Controller.ResetSelectPiece(t) || this.Controller.MovePiece(t)
      : this.Controller.SelectPiece(t);
  }
  OnIndexMove(t, i) {
    return (
      this.Controller.SelectPiece(t),
      !!this.Controller.IsSelecting && this.Controller.MovePiece(i)
    );
  }
  NextRound() {
    this.QOa++;
    var t = this.CampLoop.length;
    (this.CurrentCamp = this.CampLoop[this.QOa % t]), this.StartRound();
  }
  SetCurrentRound(t) {
    this.QOa = t;
    t = this.CampLoop.length;
    (this.CurrentCamp = this.CampLoop[this.QOa % t]),
      (this.KOa = 0),
      this.StartRound();
  }
  get IsPlayerRound() {
    return this.CurrentCamp === this.PlayerCamp;
  }
  get PlayerWin() {
    return this.KOa === this.PlayerCamp;
  }
  get AiWin() {
    return this.KOa === this.AiCamp;
  }
  get IsFinish() {
    return 0 !== this.KOa;
  }
  StartGame() {
    (this.QOa = 0),
      (this.CurrentCamp = this.CampLoop[0]),
      (this.KOa = 0),
      this.StartRound();
  }
  ResetGame() {
    this.Controller.OnResetGame(),
      this.AiController.OnResetGame(),
      this.Board.ResetGame(),
      this.StartGame();
  }
  OnGameOver(t) {
    this.KOa = t;
  }
  OnEndRound() {
    this.AutoNextRound && this.NextRound();
  }
  RefreshAiInfo(t) {
    this.AiController.RefreshAiInfo(t);
  }
  InitBoardInfo(t, i, s = !1) {
    var h = new Array();
    h.length = this.Board.BoardLength * this.Board.BoardLength;
    for (let t = 0; t < h.length; t++) h[t] = 0;
    for (const e of t) e < h.length && (h[e] = this.AiCamp);
    for (const r of i) r < h.length && (h[r] = this.PlayerCamp);
    s ? this.Board.InitOriginBoardInfo(h) : this.Board.InitBoardInfo(h);
  }
  GetPlayerPieces() {
    var i = new Array(),
      s = new Array();
    this.Board.GetBoardInfo(s);
    for (let t = 0; t < s.length; t++) s[t] === this.PlayerCamp && i.push(t);
    return i;
  }
  SetOffensive(t) {
    this.CampLoop = t
      ? [this.AiCamp, this.PlayerCamp]
      : [this.PlayerCamp, this.AiCamp];
  }
  GetNoneNeighbors(t) {
    return this.Board.GetNoneNeighbors(t);
  }
  CheckCanMove(t) {
    return this.Board.CheckBoardValue(t, 0);
  }
  CheckIsPlayerPiece(t) {
    return this.Board.CheckBoardValue(t, this.PlayerCamp);
  }
  CheckIsCenter(t) {
    return this.Board.CenterIndex === t;
  }
  CheckGameOver(t) {
    return this.Board.CheckGameOver(t);
  }
}
exports.TicTacToeGame = TicTacToeGame;
//# sourceMappingURL=TicTacToeGame.js.map
