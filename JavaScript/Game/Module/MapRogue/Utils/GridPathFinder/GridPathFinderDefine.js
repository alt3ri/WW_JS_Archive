"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.backTrace =
    exports.calculateHeuristic =
    exports.Grids =
    exports.Node =
      void 0);
class Node {
  constructor(t) {
    (this.Id = 0),
      (this.Position = { X: 0, Y: 0 }),
      (this.F = 0),
      (this.G = 0),
      (this.H = 0),
      (this.Cost = 0),
      (this.ParentNode = void 0),
      (this.IsOnClosedList = !1),
      (this.IsOnOpenList = !1),
      (this.IsWalkable = !0),
      (this.Id = t.GridId),
      (this.Position = t.Position),
      (this.Cost = t.Cost),
      (this.H = 0),
      (this.G = 0),
      (this.F = 0),
      (this.ParentNode = void 0),
      (this.IsOnClosedList = !1),
      (this.IsOnOpenList = !1),
      (this.IsWalkable = t.Walkable ?? !0);
  }
  _2c() {
    this.F = this.G + this.H;
  }
  SetG(t) {
    (this.G = t), this._2c();
  }
  SetH(t) {
    (this.H = t), this._2c();
  }
  SetValueToZero() {
    this.F = this.G = this.H = 0;
  }
}
exports.Node = Node;
class Grids {
  constructor(i) {
    (this.Width = 0),
      (this.Height = 0),
      (this.GridNodes = []),
      (this.Width = i.Width),
      (this.Height = i.Height),
      (this.GridNodes = []);
    let e = 0;
    for (let s = 0; s < this.Height; s++) {
      var r = [];
      for (let t = 0; t < this.Width; t++) {
        var h = i.Matrix[e],
          h = new Node({
            GridId: e,
            Position: { X: t, Y: s },
            Cost: h.Cost,
            Walkable: h.Walkable,
          });
        r.push(h), e++;
      }
      this.GridNodes.push(r);
    }
  }
  GetNodeAt(t) {
    return this.GridNodes[t.Y][t.X];
  }
  GetNodeByIndex(t) {
    var s = this.Width,
      i = t % s,
      t = Math.floor(t / s);
    return this.GridNodes[t][i];
  }
  IsWalkableAt(t) {
    return this.GridNodes[t.Y][t.X].IsWalkable;
  }
  c2c(t) {
    return 0 <= t.X && t.X < this.Width && 0 <= t.Y && t.Y < this.Height;
  }
  GetSurroundingNodes(t) {
    var s = [];
    for (const i of [
      { X: t.X, Y: t.Y + 1 },
      { X: t.X + 1, Y: t.Y },
      { X: t.X, Y: t.Y - 1 },
      { X: t.X - 1, Y: t.Y },
    ])
      this.c2c(i) && this.IsWalkableAt(i) && s.push(this.GetNodeAt(i));
    return s;
  }
  ResetGrids() {
    for (const t of this.GridNodes)
      for (const s of t)
        (s.IsOnClosedList = !1),
          (s.IsOnOpenList = !1),
          (s.ParentNode = void 0),
          s.SetValueToZero();
  }
}
function calculateHeuristic(t, s, i) {
  var e = Math.abs(i.X - s.X),
    r = Math.abs(i.Y - s.Y);
  switch (t) {
    case 0:
      return e + r;
    case 1:
      return Math.sqrt(e * e + r * r);
    case 2:
      return Math.max(e, r);
    case 3:
      return e + r - 0.58 * Math.min(e, r);
  }
  return 0;
}
function backTrace(t, s, i) {
  var e = [];
  let r = i ? t : t.ParentNode;
  for (; r.ParentNode; ) e.push(r.Id), (r = r.ParentNode);
  return s && e.push(r.Id), e.reverse();
}
(exports.Grids = Grids),
  (exports.calculateHeuristic = calculateHeuristic),
  (exports.backTrace = backTrace);
//# sourceMappingURL=GridPathFinderDefine.js.map
