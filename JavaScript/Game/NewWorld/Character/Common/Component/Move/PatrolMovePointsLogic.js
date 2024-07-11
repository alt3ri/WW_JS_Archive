"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolMovePointsLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  MAX_DISTANCE = 200;
class PatrolMovePointsLogic {
  constructor() {
    (this.Hte = void 0),
      (this.szo = !1),
      (this.azo = !1),
      (this.ooe = !1),
      (this.XJo = -1),
      (this.TargetIndex = 0),
      (this.TargetPoint = void 0),
      (this.MovePoint = []),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create());
  }
  Init(t) {
    this.Hte = t;
  }
  Reset() {
    (this.TargetIndex = 0), (this.XJo = -1);
  }
  CheckMoveLastPoint() {
    return !this.szo && this.TargetIndex === this.MovePoint.length - 1;
  }
  GetPreviousLocation() {
    return 0 <= this.XJo ? this.MovePoint[this.XJo].Position : void 0;
  }
  UpdateMovePoints(t) {
    let i = [],
      e = ((i = Array.isArray(t.Points) ? t.Points : [t.Points]), !0);
    this.hzo(this.MovePoint, i)
      ? (e = !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "移动路径变更",
            ["实体ID", this.Hte.CreatureData.GetPbDataId()],
            ["PreviousIndex", this.XJo],
            ["MovePathLength", this.MovePoint.length],
            ["NewMovePathLength", i.length],
          ),
        (this.XJo = -1),
        t.Loop &&
          !t.CircleMove &&
          void 0 !== t.StartWithInversePath &&
          (this.ooe = t.StartWithInversePath)),
      (this.MovePoint = i),
      (this.szo = t.Loop),
      (this.azo = t.CircleMove ?? !1),
      void 0 !== t.StartIndex &&
      0 <= t.StartIndex &&
      t.StartIndex < this.MovePoint.length
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              51,
              "使用起始点移动",
              ["实体ID", this.Hte.CreatureData.GetPbDataId()],
              ["初始点Index", t.StartIndex],
              ["TargetIndex", this.TargetIndex],
            ),
          this.lzo(t.StartIndex))
        : t.UsePreviousIndex &&
            0 <= this.XJo &&
            this.XJo < this.MovePoint.length
          ? (this.lzo(this.XJo),
            this.GetNextPoint() < this.MovePoint.length &&
              this.lzo(this.GetNextPoint()),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "AI",
                43,
                "使用上次的移动点",
                ["实体ID", this.Hte.CreatureData.GetPbDataId()],
                ["PreviousIndex", this.XJo],
                ["TargetIndex", this.TargetIndex],
              ))
          : t.UseNearestPoint && e
            ? this._zo()
            : this.lzo(0);
  }
  ChangeToNextPoint() {
    this.uzo(this.GetNextPoint());
  }
  GetNextPoint() {
    let t = 0;
    var i;
    return (
      this.szo
        ? this.azo
          ? (t = (this.TargetIndex + 1) % this.MovePoint.length)
          : this.ooe
            ? 0 === this.TargetIndex
              ? ((this.ooe = !1),
                (t = 0),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 51, "往返式巡逻：回到起点", [
                    "PbDataID",
                    this.Hte.CreatureData.GetPbDataId(),
                  ]),
                ((i = Protocol_1.Aki.Protocol.Hes.create()).P4n =
                  MathUtils_1.MathUtils.NumberToLong(
                    this.Hte.CreatureData.GetCreatureDataId(),
                  )),
                (i.B4n = !0),
                Net_1.Net.Call(21490, i, () => {}))
              : (t = this.TargetIndex - 1)
            : this.TargetIndex === this.MovePoint.length - 1
              ? ((this.ooe = !0),
                (t = this.MovePoint.length - 2),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 51, "往返式巡逻：走到终点", [
                    "PbDataID",
                    this.Hte.CreatureData.GetPbDataId(),
                  ]),
                ((i = Protocol_1.Aki.Protocol.Hes.create()).P4n =
                  MathUtils_1.MathUtils.NumberToLong(
                    this.Hte.CreatureData.GetCreatureDataId(),
                  )),
                (i.B4n = !1),
                Net_1.Net.Call(21490, i, () => {}))
              : (t = this.TargetIndex + 1)
        : (t = this.TargetIndex + 1),
      t
    );
  }
  OnArriveMovePoint() {
    var t = this.TargetPoint;
    -1 !== t?.Index &&
      (t?.Actions &&
        0 < t.Actions.length &&
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
          t.Actions,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id),
        ),
      t?.Callback && t.Callback(),
      t?.IsHide) &&
      this.czo(t);
  }
  czo(t) {
    this.Hte.SkeletalMesh?.SetVisibility(!t.IsHide);
    var i,
      e = this.Hte.Entity.GetComponent(188);
    e &&
      ((i = -841499802),
      t.IsHide ? e.HasTag(i) || e.AddTag(i) : e.HasTag(i) && e.RemoveTag(i));
  }
  UpdatePreIndex() {
    return (
      this.XJo < 0 &&
        (this.ooe
          ? (this.XJo = Math.min(this.MovePoint.length, this.TargetIndex + 1))
          : (this.XJo = Math.max(0, this.TargetIndex - 1))),
      this.XJo
    );
  }
  mzo(t, i) {
    return (
      t === i ||
      !(!t || !i || t.Index !== i.Index || !t.Position.Equals(i.Position))
    );
  }
  hzo(i, e) {
    if (i !== e) {
      if (!i || !e) return !1;
      if (i.length !== e.length) return !1;
      var s = i.length;
      for (let t = 0; t < s; ++t) if (!this.mzo(i[t], e[t])) return !1;
    }
    return !0;
  }
  uzo(t) {
    return (
      (this.XJo = this.TargetIndex),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "更新移动路径经过点下标",
          ["实体ID", this.Hte.CreatureData.GetPbDataId()],
          ["PreviousIndex", this.XJo],
          ["MovePoint.length", this.MovePoint.length],
        ),
      this.lzo(t)
    );
  }
  lzo(t) {
    return (
      (this.TargetIndex = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "更新移动路径目标点下标",
          ["实体ID", this.Hte.CreatureData.GetPbDataId()],
          ["TargetIndex", t],
          ["MovePoint.length", this.MovePoint.length],
        ),
      this.TargetIndex < this.MovePoint.length
        ? ((this.TargetPoint = this.MovePoint[this.TargetIndex]), !0)
        : ((this.TargetPoint = void 0), !1)
    );
  }
  _zo() {
    var t = this.UTe();
    (this.TargetIndex = 0 <= t - 1 ? t - 1 : 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "使用最近的移动点",
          ["实体ID", this.Hte.CreatureData.GetPbDataId()],
          ["当前最近的点Index", t],
          ["TargetIndex", this.TargetIndex],
        ),
      this.lzo(t);
  }
  UTe() {
    let e = 0,
      s = Number.MAX_VALUE;
    var h = this.Hte.ActorLocationProxy;
    for (let t = 0, i = this.MovePoint.length; t < i; t++) {
      var r = this.MovePoint[t];
      0 <= r.Index &&
        (r = Vector_1.Vector.Dist(h, r.Position)) < s &&
        ((s = r), (e = t));
    }
    if (
      0 === e ||
      (e === this.MovePoint.length - 1 &&
        s < MAX_DISTANCE &&
        Vector_1.Vector.Dist(
          this.MovePoint[0].Position,
          this.MovePoint[this.MovePoint.length - 1].Position,
        ) < MAX_DISTANCE)
    )
      return 0;
    for (let t = 0; t < this.MovePoint.length - 1; t++) {
      var i = this.MovePoint[t].Position,
        o = this.MovePoint[t + 1].Position,
        n =
          (this.jye.Set(o.X, o.Y, o.Z),
          this.jye.Subtraction(i, this.jye),
          this.jye.Size());
      this.RTe.Set(h.X, h.Y, h.Z),
        this.RTe.Subtraction(o, this.RTe),
        0 < this.jye.DotProduct(this.RTe) ||
          (this.RTe.Set(h.X, h.Y, h.Z),
          this.RTe.Subtraction(i, this.RTe),
          this.jye.DotProduct(this.RTe) < 0) ||
          (this.jye.CrossProduct(this.RTe, this.jye),
          (o = this.jye.Size() / n) < s &&
            ((s = o), (e = this.ooe ? t : t + 1)));
    }
    return e;
  }
}
exports.PatrolMovePointsLogic = PatrolMovePointsLogic;
//# sourceMappingURL=PatrolMovePointsLogic.js.map
