"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TicTacToeBoard = void 0);
class TicTacToeBoard {
  constructor() {
    (this.OriginBoardInfo = [0, 0, 2, 2, 1, 1, 0, 1, 2]),
      (this.BoardInfo = [0, 0, 2, 2, 1, 1, 0, 1, 2]),
      (this.NextPoints = [1, 2, 5, 0, -1, 8, 3, 6, 7]),
      (this.PrePoints = [3, 0, 1, 6, -1, 2, 7, 8, 5]),
      (this.CirclePoints = [1, 2, 5, 8, 7, 6, 3, 0]),
      (this.FOa = 3),
      (this.VOa = 4),
      (this.HOa = 3),
      (this.jOa = void 0),
      (this.WOa = void 0),
      (this.SelectNeighbors = new Array());
  }
  GetBoardInfo(t) {
    t.length = 0;
    for (const i of this.BoardInfo) t.push(i);
  }
  GetNextPoints(t) {
    t.length = 0;
    for (const i of this.NextPoints) t.push(i);
  }
  GetPrePoints(t) {
    t.length = 0;
    for (const i of this.PrePoints) t.push(i);
  }
  GetCirclePoints(t) {
    t.length = 0;
    for (const i of this.CirclePoints) t.push(i);
  }
  get BoardLength() {
    return this.FOa;
  }
  get CenterIndex() {
    return this.VOa;
  }
  get WinLineCount() {
    return this.HOa;
  }
  Init(t, i, s) {
    (this.HOa = t), (this.jOa = i), (this.WOa = s);
  }
  InitOriginBoardInfo(i) {
    (this.OriginBoardInfo.length = i.length),
      (this.BoardInfo.length = this.OriginBoardInfo.length);
    for (let t = 0; t < i.length; t++)
      (this.OriginBoardInfo[t] = i[t]), (this.BoardInfo[t] = i[t]);
  }
  InitBoardInfo(i) {
    this.BoardInfo.length = i.length;
    for (let t = 0; t < i.length; t++) this.BoardInfo[t] = i[t];
  }
  StartGame() {}
  ResetGame() {
    this.BoardInfo.length = 0;
    for (const t of this.OriginBoardInfo) this.BoardInfo.push(t);
  }
  CheckPieceSelect(t, i) {
    return this.BoardInfo.length > t && this.BoardInfo[t] === i;
  }
  CheckPieceMove(t, i, s) {
    return (
      this.BoardInfo[t] === s &&
      0 === this.BoardInfo[i] &&
      (t === this.VOa ||
        i === this.VOa ||
        this.PrePoints[i] === t ||
        this.NextPoints[i] === t)
    );
  }
  OnPieceMove(t, i) {
    var s;
    return (
      0 === this.BoardInfo[i] &&
      ((s = this.BoardInfo[t]),
      (this.BoardInfo[t] = 0),
      (this.BoardInfo[i] = s),
      this.CheckGameOver(i) || (this.WOa && this.WOa()),
      !0)
    );
  }
  CheckBoardValue(t, i) {
    return this.BoardInfo[t] === i;
  }
  GetNoneNeighbors(t) {
    if (((this.SelectNeighbors.length = 0), t === this.CenterIndex)) {
      var s,
        h = t % this.FOa,
        e = Math.floor(t / this.FOa);
      for (let i = e - 1; i < e + 2; i++)
        if (!(i < 0 || i >= this.FOa))
          for (let t = h - 1; t < 2 + h; t++)
            t < 0 ||
              t >= this.FOa ||
              ((s = i * this.FOa + t),
              0 === this.BoardInfo[s] && this.SelectNeighbors.push(s));
    } else if (-1 < t) {
      var i,
        r,
        o = t % this.FOa,
        f = Math.floor(t / this.FOa);
      for (let t = f - 1; t < f + 2; t++)
        t < 0 ||
          t >= this.FOa ||
          ((i = t * this.FOa + o),
          0 === this.BoardInfo[i] && this.SelectNeighbors.push(i));
      for (let t = o - 1; t < 2 + o; t++)
        t < 0 ||
          t >= this.FOa ||
          ((r = f * this.FOa + t),
          0 === this.BoardInfo[r] && this.SelectNeighbors.push(r));
      0 !== this.BoardInfo[this.VOa] ||
        this.SelectNeighbors.includes(this.VOa) ||
        this.SelectNeighbors.push(this.VOa);
    }
    return this.SelectNeighbors;
  }
  GetNoneNeighborsWithCustomInfos(s, t) {
    var h = new Array();
    if (t === this.CenterIndex) {
      var e,
        r = t % this.FOa,
        o = Math.floor(t / this.FOa);
      for (let i = o - 1; i < o + 2; i++)
        if (!(i < 0 || i >= this.FOa))
          for (let t = r - 1; t < 2 + r; t++)
            t < 0 ||
              t >= this.FOa ||
              (0 === s[(e = i * this.FOa + t)] && h.push(e));
    } else if (-1 < t) {
      var i,
        f,
        n = t % this.FOa,
        a = Math.floor(t / this.FOa);
      for (let t = a - 1; t < a + 2; t++)
        t < 0 ||
          t >= this.FOa ||
          (0 === s[(i = t * this.FOa + n)] && h.push(i));
      for (let t = n - 1; t < 2 + n; t++)
        t < 0 ||
          t >= this.FOa ||
          (0 === s[(f = a * this.FOa + t)] && h.push(f));
      0 !== s[this.VOa] || h.includes(this.VOa) || h.push(this.VOa);
    }
    return h;
  }
  CheckGameOver(h) {
    var e = this.BoardInfo[h];
    if (0 !== e) {
      var r = this.CirclePoints.length,
        o = this.CirclePoints.length / 2;
      if (h !== this.VOa) {
        let t = this.HOa - 1,
          i = this.NextPoints[h];
        for (; t--; ) {
          if (this.BoardInfo[i] !== e) {
            t++;
            break;
          }
          i = this.NextPoints[i];
        }
        let s = this.PrePoints[h];
        for (; t--; ) {
          if (this.BoardInfo[s] !== e) {
            t++;
            break;
          }
          s = this.PrePoints[s];
        }
        if (t < 1) return this.jOa && this.jOa(e), !0;
        if (e === this.BoardInfo[this.VOa]) {
          h = this.CirclePoints.indexOf(h);
          if (-1 < h)
            if (e === this.BoardInfo[this.CirclePoints[(h + o) % r]])
              return this.jOa && this.jOa(e), !0;
        }
      } else
        for (let t = 0; t < o; t++) {
          var i = (t + o) % r;
          if (
            e === this.BoardInfo[this.CirclePoints[t]] &&
            e === this.BoardInfo[this.CirclePoints[i]]
          )
            return this.jOa && this.jOa(e), !0;
        }
    }
    return !1;
  }
  GetDebugBoardInfo(t) {
    t.Empty();
    for (const i of this.BoardInfo) t.Add(i);
  }
}
exports.TicTacToeBoard = TicTacToeBoard;
//# sourceMappingURL=TicTacToeBoard.js.map
