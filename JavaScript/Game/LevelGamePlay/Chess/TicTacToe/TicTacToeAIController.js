"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TicTacToeAiController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TicTacToeController_1 = require("./TicTacToeController"),
  MAX_AI_ITERATION_COUNT = 20,
  MAX_PLAYER_ITERATION_COUNT = 5;
class TicTacToeAiController extends TicTacToeController_1.TicTacToeController {
  constructor() {
    super(...arguments),
      (this.mOa = 1),
      (this.dOa = new Array()),
      (this.COa = new Array()),
      (this.gOa = new Array()),
      (this.pOa = new Array()),
      (this.fOa = new Array()),
      (this.vOa = new Array()),
      (this.MOa = new Array()),
      (this.SOa = new Array()),
      (this.EOa = 100),
      (this.yOa = 5),
      (this.IOa = -5),
      (this.TOa = this.IOa),
      (this.LOa = 0.8),
      (this.DOa = 5),
      (this.AOa = 8),
      (this.ROa = 3),
      (this.UOa = 3),
      (this.xOa = 2),
      (this.POa = 0.8),
      (this.wOa = 5),
      (this.BOa = -300);
  }
  InitAi(t, i, s) {
    super.Init(t, i),
      (this.mOa = s),
      this.ChessBoard.GetBoardInfo(this.dOa),
      this.ChessBoard.GetNextPoints(this.COa),
      this.ChessBoard.GetPrePoints(this.gOa),
      this.ChessBoard.GetCirclePoints(this.pOa);
    for (let t = 0; t < MAX_AI_ITERATION_COUNT; t++) this.vOa.push(new Array());
    for (let t = 0; t < MAX_PLAYER_ITERATION_COUNT; t++)
      this.MOa.push(new Array());
  }
  MovePiece(t) {
    var i = this.SelectIndex,
      s = super.MovePiece(t);
    return (
      s ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelPlay",
            36,
            "[TicTacToe]AI Move Failed",
            ["oldIndex", i],
            ["newIndex", t],
          )),
      s
    );
  }
  OnStartRound() {
    this.ChessBoard.GetBoardInfo(this.dOa);
    let i = -1,
      s = -99999,
      h = -1;
    for (let t = 0; t < this.dOa.length; t++) {
      var r;
      this.dOa[t] === this.SelfCamp &&
        (r = this.bOa(t))[0] > s &&
        ((i = t), (s = r[0]), (h = r[1]));
    }
    var t;
    -1 < i &&
      ((t = this.qOa(i, h)),
      this.SOa.push(t),
      this.SOa.length > this.wOa && this.SOa.splice(0, 1),
      (this.SelectIndex = i),
      this.MovePiece(h)),
      (this.TOa *= this.LOa);
  }
  OnStartGame() {
    super.OnStartGame(), (this.SOa.length = 0), (this.TOa = this.IOa);
  }
  qOa(t, i) {
    return 100 * t + i;
  }
  bOa(t) {
    let i = -99999,
      s = -1;
    var h = this.ChessBoard.GetNoneNeighbors(t);
    if (!(h.length < 1))
      for (const a of h) {
        (this.dOa[t] = 0), (this.dOa[a] = this.SelfCamp), (this.fOa.length = 0);
        for (const o of this.dOa) this.fOa.push(o);
        if (this.CheckGameOver(this.fOa, a)) return [this.EOa * this.yOa, a];
        var r = Math.min(MAX_AI_ITERATION_COUNT, this.UOa) - 1,
          e = this.qOa(t, a),
          e = this.SOa.includes(e) ? this.BOa : 0,
          r =
            this.OOa(this.fOa, this.SelfCamp) +
            this.GOa(this.mOa, this.fOa, r, r, !1, this.SelfCamp, this.mOa) +
            e;
        r > i && ((i = r), (s = a)),
          (this.dOa[t] = this.SelfCamp),
          (this.dOa[a] = 0);
      }
    return [i, s];
  }
  CheckGameOver(h, r) {
    var e = h[r];
    if (0 !== e) {
      var a = this.pOa.length,
        o = this.pOa.length / 2;
      if (r !== this.ChessBoard.CenterIndex) {
        let t = this.ChessBoard.WinLineCount - 1;
        var l = this.COa[r];
        let i = this.COa[r];
        for (; t--; ) {
          if (h[i] !== e) {
            t++;
            break;
          }
          if ((i = this.COa[i]) === l) break;
        }
        var n = this.COa[r];
        let s = this.gOa[r];
        for (; t--; ) {
          if (h[s] !== e) {
            t++;
            break;
          }
          if ((s = this.gOa[s]) === n) break;
        }
        if (t < 1) return !0;
        if (e === h[this.ChessBoard.CenterIndex]) {
          r = this.pOa.indexOf(r);
          if (-1 < r) if (e === h[this.pOa[(r + o) % a]]) return !0;
        }
      } else
        for (let t = 0; t < o; t++) {
          var i = (t + o) % a;
          if (e === h[this.pOa[t]] && e === h[this.pOa[i]]) return !0;
        }
    }
    return !1;
  }
  GOa(h, r, e, a, o, l, n) {
    if (e < 0) return 0;
    let f = 1;
    for (let t = a; t > e; t--) f *= this.POa;
    var u,
      _ = e - 1;
    if (h === l) {
      let s = -99999;
      for (let t = 0; t < r.length; t++)
        if (r[t] === h)
          for (const A of this.ChessBoard.GetNoneNeighborsWithCustomInfos(
            r,
            t,
          )) {
            if (0 !== r[A]) return -1;
            if (((r[t] = 0), (r[A] = h), this.CheckGameOver(r, A)))
              return this.EOa * this.yOa * f;
            let i = void 0;
            (i = (o ? this.MOa : this.vOa)[a - e]).length = r.length;
            for (let t = 0; t < r.length; t++) i[t] = r[t];
            var T = this.OOa(i, h) * f + this.GOa(n, i, _, a, o, l, n);
            T > s && (s = T), (r[t] = h), (r[A] = 0);
          }
      return s;
    }
    let v = 9999;
    for (let s = 0; s < r.length; s++)
      if (r[s] === h)
        for (const c of this.ChessBoard.GetNoneNeighborsWithCustomInfos(r, s)) {
          if (0 !== r[c]) return -1;
          if (((r[s] = 0), (r[c] = h), this.CheckGameOver(r, c)))
            return this.EOa * this.TOa * f;
          let i = void 0;
          (i = (o ? this.MOa : this.vOa)[a - e]).length = r.length;
          for (let t = 0; t < r.length; t++) i[t] = r[t];
          let t = 0;
          (t = o
            ? this.OOa(r, h) * -f + this.GOa(l, i, _, a, o, l, n)
            : ((u = Math.min(MAX_PLAYER_ITERATION_COUNT, this.xOa) - 1),
              this.OOa(r, h) * -f +
                this.GOa(l, i, u, u, !0, n, l) * this.POa * -f)) < v && (v = t),
            (r[s] = h),
            (r[c] = 0);
        }
    return v;
  }
  RefreshAiInfo(t) {
    (this.IOa = t.LostWeight),
      (this.LOa = t.RoundDecay),
      (this.UOa = t.IterationCount),
      (this.xOa = t.PlayerIterationCount),
      (this.POa = t.IterationDecay);
  }
  kOa(t, i, s, h, r) {
    let e = this.EOa,
      a = 0,
      o = 0,
      l = s,
      n = this.COa[0];
    for (
      ;
      0 < l &&
      (t[n] === i
        ? (l--,
          0 < a &&
            (r || (a = Math.min(a - o, h ? this.ROa : this.ROa * this.DOa)),
            (e -= a + o),
            (a = 0),
            (o = 0)))
        : l < s &&
          ((o = 0 === t[n] ? this.ROa : this.ROa * this.AOa), (a += o)),
      (n = this.COa[n]) !== this.COa[0]);

    );
    l = this.ChessBoard.WinLineCount;
    let f = this.EOa,
      u = ((a = 0), (o = 0), (l = s), this.gOa[0]);
    for (
      ;
      0 < l &&
      (t[u] === i
        ? (l--,
          0 < a &&
            (r || (a = Math.min(a - o, h ? this.ROa : this.ROa * this.DOa)),
            (f -= a + o),
            (a = 0),
            (o = 0)))
        : l < s &&
          ((o = 0 === t[u] ? this.ROa : this.ROa * this.AOa), (a += o)),
      (u = this.gOa[u]) !== this.gOa[0]);

    );
    return Math.max(f, e);
  }
  NOa(e, t) {
    var a = e[t];
    let o = -99999;
    var l = this.pOa.length,
      n = l / 2;
    for (let r = 0; r < n; r++) {
      let i = 0,
        s = -1,
        h = -1;
      for (let t = r; t < r + n; t++) {
        var f = e[this.pOa[t]];
        if (f === a) {
          s = i;
          break;
        }
        i += 0 === f ? this.ROa : this.ROa * this.AOa;
      }
      i = 0;
      for (let t = r; t > r - n; t--) {
        var u = t < 0 ? t + l : t,
          u = e[this.pOa[u]];
        if (u === a) {
          s = Math.min(s, i);
          break;
        }
        i += 0 === u ? this.ROa : this.ROa * this.AOa;
      }
      i = 0;
      for (let t = r + n; t > r; t--) {
        var _ = e[this.pOa[t]];
        if (_ === a) {
          h = i;
          break;
        }
        i += 0 === _ ? this.ROa : this.ROa * this.AOa;
      }
      for (let t = r + n; t < r + n + n; t++) {
        var T = t >= l ? t - l : t,
          T = e[this.pOa[T]];
        if (T === a) {
          h = Math.min(h, i);
          break;
        }
        i += 0 === T ? this.ROa : this.ROa * this.AOa;
      }
      o = Math.max(o, this.EOa - h - s);
    }
    return o;
  }
  OOa(i, s) {
    var h = this.ChessBoard.CenterIndex,
      r = this.ChessBoard.WinLineCount,
      e = 0 === i[h];
    if (i[h] !== s) {
      const a = this.kOa(i, s, r, e, !1);
      let t = this.NOa(i, h) - this.ROa * this.DOa;
      return e || (t -= this.ROa * this.DOa), Math.max(a, t);
    }
    const a = this.kOa(i, s, r - 1, !1, !0);
    e = this.NOa(i, h) - this.ROa * this.DOa;
    return Math.max(a, e);
  }
}
exports.TicTacToeAiController = TicTacToeAiController;
//# sourceMappingURL=TicTacToeAIController.js.map
