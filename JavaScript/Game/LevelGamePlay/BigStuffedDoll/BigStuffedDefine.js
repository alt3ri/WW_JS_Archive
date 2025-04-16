"use strict";
function calculateCellSize(t, s) {
  return t <= s ? s - t + 1 : exports.BIGSTUFFEDDOLL_RINGCELLCOUNT - t + 1 + s;
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ContinuousArea =
    exports.Area =
    exports.BigStuffedRingInfo =
    exports.BigStuffedGameInfo =
    exports.calculateCellSize =
    exports.SINGLECELL_ANGLE =
    exports.BIGSTUFFEDDOLL_RINGCELLCOUNT =
      void 0),
  (exports.BIGSTUFFEDDOLL_RINGCELLCOUNT = 36),
  (exports.SINGLECELL_ANGLE = 10),
  (exports.calculateCellSize = calculateCellSize);
class BigStuffedGameInfo {
  constructor() {
    (this.rfl = new Map()),
      (this.ofl = []),
      (this.CurrentArrowStayTotalIndex = -1),
      (this.CurrentArrowStayRingId = -1),
      (this.CurrentArrowStayRelativeValidAreaIndex = -1),
      (this.CurrentArrowStayCellIndex = 0);
  }
  AddRingInfo(t, s) {
    s = new BigStuffedRingInfo(t, s);
    return this.rfl.set(t, s), this.ofl.push(s), s;
  }
  Clear() {
    for (var [, t] of this.rfl) t.Clear();
    this.rfl.clear(),
      (this.ofl.length = 0),
      (this.CurrentArrowStayTotalIndex = -1),
      (this.CurrentArrowStayRingId = -1),
      (this.CurrentArrowStayRelativeValidAreaIndex = -1),
      (this.CurrentArrowStayCellIndex = 0);
  }
  GetRingInfo(t) {
    return this.rfl.get(t);
  }
  UpdateCurrentArrowStayInfo() {
    if (0 !== this.ofl.length) {
      let t = 0,
        s = 0;
      for (const e of this.ofl) {
        if (((t += e.ValidAreas.length), this.CurrentArrowStayTotalIndex < t)) {
          (this.CurrentArrowStayRingId = e.RingId),
            (this.CurrentArrowStayRelativeValidAreaIndex =
              this.CurrentArrowStayTotalIndex - s);
          break;
        }
        s = t;
      }
    }
  }
  GetValidAreaNum() {
    let t = 0;
    for (const s of this.ofl) t += s.ValidAreas.length;
    return t;
  }
  OnArrowDirectionReverse() {
    for (const t of this.ofl) t.OnArrowDirectionReverse();
  }
}
exports.BigStuffedGameInfo = BigStuffedGameInfo;
class BigStuffedRingInfo {
  constructor(t, s) {
    (this.RingId = t),
      (this.ArrowDirection = s),
      (this.ValidAreas = []),
      (this.Sbl = new Map()),
      (this.Mbl = new Map()),
      (this.ybl = new Map());
  }
  Clear() {
    (this.ValidAreas.length = 0),
      this.Sbl.clear(),
      this.Mbl.clear(),
      this.ybl.clear();
  }
  GetValidAreas() {
    return this.ValidAreas;
  }
  AddValidArea(t, s) {
    this.ValidAreas.push(new Area(t, s, this.ArrowDirection));
  }
  ClearValidAreas() {
    this.ValidAreas.length = 0;
  }
  GetGoodAreas() {
    return this.Sbl;
  }
  GetGoodArea(t) {
    return this.Sbl.get(t);
  }
  AddGoodArea(t, s, e) {
    this.Sbl.set(t, new ContinuousArea(t, s, e, this.ArrowDirection));
  }
  RemoveGoodArea(t) {
    this.Sbl.delete(t);
  }
  GetPerfectAreas() {
    return this.Mbl;
  }
  AddPerfectArea(t, s, e) {
    this.Mbl.set(t, new ContinuousArea(t, s, e, this.ArrowDirection));
  }
  RemovePerfectArea(t) {
    this.Mbl.delete(t);
  }
  GetBonusAreas() {
    return this.ybl;
  }
  AddBonusArea(t, s, e) {
    this.ybl.set(t, new ContinuousArea(t, s, e, this.ArrowDirection));
  }
  OnArrowDirectionReverse() {
    switch (this.ArrowDirection) {
      case 0:
        this.ArrowDirection = 1;
        break;
      case 1:
        this.ArrowDirection = 0;
    }
    for (const r of this.ValidAreas) r.OnArrowDirectionReverse();
    for (var [, t] of this.Sbl) t.OnArrowDirectionReverse();
    for (var [, s] of this.Mbl) s.OnArrowDirectionReverse();
    for (var [, e] of this.ybl) e.OnArrowDirectionReverse();
  }
}
exports.BigStuffedRingInfo = BigStuffedRingInfo;
class Area {
  constructor(t, s, e) {
    (this.StartCellIndex = t),
      (this.EndCellIndex = s),
      (this.ArrowDirection = e);
  }
  OnArrowDirectionReverse() {
    switch (this.ArrowDirection) {
      case 0:
        this.ArrowDirection = 1;
        break;
      case 1:
        this.ArrowDirection = 0;
    }
  }
}
class ContinuousArea extends (exports.Area = Area) {
  constructor(t, s, e, r) {
    super(s, e, r),
      (this.ContinuousIndex = t),
      (this.StartCellIndex = s),
      (this.EndCellIndex = e),
      (this.ArrowDirection = r);
  }
}
exports.ContinuousArea = ContinuousArea;
//# sourceMappingURL=BigStuffedDefine.js.map
