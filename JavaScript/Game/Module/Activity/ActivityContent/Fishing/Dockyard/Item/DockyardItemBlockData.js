"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardItemBlockData = void 0);
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardItemBlockData {
  constructor(t) {
    (this.fYl = []),
      (this.Rotate = void 0),
      (this.LeftTopPosInPanel = { RowIndex: -1, ColIndex: -1 }),
      (this.PanelRange = {
        RowStartIndex: -1,
        RowEndIndex: -1,
        ColStartIndex: -1,
        ColEndIndex: -1,
      }),
      (this.LastPanelRange = {
        RowStartIndex: -1,
        RowEndIndex: -1,
        ColStartIndex: -1,
        ColEndIndex: -1,
      }),
      (this.SYl = Vector2D_1.Vector2D.Create()),
      (this.MYl = Vector2D_1.Vector2D.Create()),
      (this.wPr = Vector2D_1.Vector2D.Create()),
      (this.LeftTopAnchorOffset = Vector2D_1.Vector2D.Create()),
      (this.Data = void 0),
      (this.Data = t),
      (this.fYl = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(
        this.EYl,
        t.Rotate,
      )),
      (this.LeftTopPosInPanel.ColIndex = t.PosX),
      (this.LeftTopPosInPanel.RowIndex = t.PosY),
      (this.Rotate = t.Rotate),
      this.IYl(this.PanelRange, this.LeftTopPosInPanel),
      this.TYl(),
      this.bYl();
  }
  get EYl() {
    return this.Data.PosDoublyList;
  }
  RefreshData(t) {
    this.Data = t;
  }
  IsInUpOrDown() {
    return (
      this.Rotate === Protocol_1.Aki.Protocol.mR_.Proto_No ||
      this.Rotate === Protocol_1.Aki.Protocol.mR_.Proto_DirectionLeft
    );
  }
  bYl() {
    this.SYl.DeepCopy(
      DockyardPanelUtil_1.DockyardPanelUtil.CalculateOriginalPivot(
        this.EYl.length,
        this.EYl[0].length,
      ),
    );
  }
  IYl(t, i) {
    let s = 0,
      e = 0;
    (e = (
      this.IsInUpOrDown()
        ? ((s = this.EYl.length), this.EYl[0])
        : ((s = this.EYl[0].length), this.EYl)
    ).length),
      (t.RowStartIndex = i.RowIndex),
      (t.RowEndIndex = i.RowIndex + s - 1),
      (t.ColStartIndex = i.ColIndex),
      (t.ColEndIndex = i.ColIndex + e - 1);
  }
  LYl(t, i) {
    let s = 0;
    return (s =
      t < 0
        ? Math.abs(t % i) > i / 2
          ? Math.floor(t / i)
          : Math.ceil(t / i)
        : i / 2 < t % i
          ? Math.ceil(t / i)
          : Math.floor(t / i));
  }
  xYl(t, i) {
    let s = 0;
    return (s =
      0 < t
        ? Math.abs(-t % i) > i / 2
          ? Math.floor(-t / i)
          : Math.ceil(-t / i)
        : i / 2 < -t % i
          ? Math.ceil(-t / i)
          : Math.floor(-t / i));
  }
  AYl(t, i) {
    var s = this.LYl(t.X, i),
      t = this.xYl(t.Y, i);
    (this.LeftTopPosInPanel.ColIndex = s),
      (this.LeftTopPosInPanel.RowIndex = t),
      this.IYl(this.PanelRange, this.LeftTopPosInPanel);
  }
  TYl() {
    (this.LastPanelRange.RowStartIndex = this.PanelRange.RowStartIndex),
      (this.LastPanelRange.RowEndIndex = this.PanelRange.RowEndIndex),
      (this.LastPanelRange.ColStartIndex = this.PanelRange.ColStartIndex),
      (this.LastPanelRange.ColEndIndex = this.PanelRange.ColEndIndex);
  }
  RYl() {
    return (
      this.Rotate === Protocol_1.Aki.Protocol.mR_.Proto_No &&
        this.MYl.Set(this.SYl.X, this.SYl.Y),
      this.Rotate === Protocol_1.Aki.Protocol.mR_.Proto_DirectionDown &&
        this.MYl.Set(this.SYl.Y, 1 - this.SYl.X),
      this.Rotate === Protocol_1.Aki.Protocol.mR_.Proto_DirectionLeft &&
        this.MYl.Set(1 - this.SYl.X, 1 - this.SYl.Y),
      this.Rotate === Protocol_1.Aki.Protocol.mR_.Proto_DirectionUp &&
        this.MYl.Set(1 - this.SYl.Y, this.SYl.X),
      this.MYl
    );
  }
  GetTopLeftOffsetByRotate() {
    return (
      this.wPr.Set(0, 1),
      (this.MYl = this.RYl()),
      this.wPr.SubtractionEqual(this.MYl)
    );
  }
  RotateData() {
    [this.fYl, this.Rotate] =
      DockyardPanelUtil_1.DockyardPanelUtil.RotateItemGridData(
        this.fYl,
        this.Rotate,
      );
  }
  GetGridDataDoubleList() {
    return this.fYl;
  }
  GetPosDataList() {
    return this.Data.PosDataList;
  }
  GetRotateValue() {
    switch (this.Rotate) {
      case Protocol_1.Aki.Protocol.mR_.Proto_No:
        return 0;
      case Protocol_1.Aki.Protocol.mR_.Proto_DirectionDown:
        return -90;
      case Protocol_1.Aki.Protocol.mR_.Proto_DirectionLeft:
        return -180;
      case Protocol_1.Aki.Protocol.mR_.Proto_DirectionUp:
        return -270;
      default:
        return 0;
    }
  }
  GetOriginalPivot() {
    return this.SYl;
  }
  RefreshLeftTopPosInBackpack(t, i, s, e) {
    var h = this.GetTopLeftOffsetByRotate();
    this.IsInUpOrDown() ? ((h.X *= i), (h.Y *= s)) : ((h.X *= s), (h.Y *= i)),
      t.Addition(h, h),
      this.LeftTopAnchorOffset.DeepCopy(h),
      this.TYl(),
      this.AYl(h, e);
  }
  GetLeftTopPosRangeByLeftTopPos(t, i) {
    return (
      this.LeftTopAnchorOffset.DeepCopy(t),
      this.TYl(),
      this.AYl(t, i),
      this.PanelRange
    );
  }
  IsValidGridPos(t, i) {
    (t -= this.LeftTopPosInPanel.RowIndex),
      (i -= this.LeftTopPosInPanel.ColIndex);
    return 1 === this.fYl[t][i];
  }
  GetCenterPosInBackpack(t, i) {
    this.MYl = this.RYl();
    (i += this.MYl.X * this.fYl[0].length),
      (t += (1 - this.MYl.Y) * this.fYl.length);
    return Vector2D_1.Vector2D.Create(i, t);
  }
}
exports.DockyardItemBlockData = DockyardItemBlockData;
//# sourceMappingURL=DockyardItemBlockData.js.map
