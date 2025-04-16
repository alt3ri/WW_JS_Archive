"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GridPathFinder = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  GridPathFinderDefine_1 = require("./GridPathFinderDefine");
class GridPathFinder {
  constructor(i, t = !0, s = !0, r = 0) {
    (this.n2c = t),
      (this.s2c = s),
      (this.a2c = r),
      (this.hB = void 0),
      (this.h2c = []),
      (this.l2c = []),
      (this.hB = new GridPathFinderDefine_1.Grids(i));
  }
  FindPath(i, t) {
    (this.h2c = []), (this.l2c = []), this.hB.ResetGrids();
    var r,
      s = this.hB.GetNodeAt(i),
      e = this.hB.GetNodeAt(t);
    if (this.hB.IsWalkableAt(t) && this.hB.IsWalkableAt(i)) {
      (s.IsOnOpenList = !0), this.l2c.push(s);
      for (let t = 0; t < this.hB.Height; t++)
        for (let i = 0; i < this.hB.Width; i++) {
          var h = this.hB.GetNodeAt({ X: i, Y: t });
          h.IsWalkable
            ? h.SetH(
                (0, GridPathFinderDefine_1.calculateHeuristic)(
                  this.a2c,
                  h.Position,
                  e.Position,
                ),
              )
            : (h.SetValueToZero(), (h.IsOnClosedList = !0), this.h2c.push(h));
        }
      let i = 0;
      for (; 0 !== this.l2c.length; ) {
        let t = 0,
          s = this.l2c[0];
        for (let i = 0; i < this.l2c.length; i++) {
          var o = this.l2c[i];
          o.F < s.F && ((s = o), (t = i));
        }
        if (
          ((s.IsOnOpenList = !1),
          this.l2c.splice(t, 1),
          (s.IsOnClosedList = !0),
          this.h2c.push(s),
          s === e)
        )
          return (0, GridPathFinderDefine_1.backTrace)(e, this.n2c, this.s2c);
        for (const d of this.hB.GetSurroundingNodes(s.Position))
          !d.IsOnClosedList &&
            ((r = s.G + d.Cost), !d.IsOnOpenList || r < d.G) &&
            (d.SetG(r),
            (d.ParentNode = s),
            d.IsOnOpenList
              ? (d.ParentNode = s)
              : ((d.IsOnOpenList = !0), this.l2c.push(d)));
        if (++i > MathUtils_1.MathUtils.Int32Max) {
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCommon",
              37,
              "[GridPathFinder] 寻路搜索次数过多中止",
            );
          break;
        }
      }
    }
    return [];
  }
  UpdateGrid(i) {
    var t = this.hB.GetNodeByIndex(i.GridIndex);
    (t.IsWalkable = i.Walkable), (t.Cost = i.Cost);
  }
}
exports.GridPathFinder = GridPathFinder;
//# sourceMappingURL=GridPathFinder.js.map
