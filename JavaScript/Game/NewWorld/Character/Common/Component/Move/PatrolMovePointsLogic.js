"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolMovePointsLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const MAX_DISTANCE = 200;
class PatrolMovePointsLogic {
  constructor() {
    (this.Hte = void 0),
      (this.lJo = !1),
      (this._Jo = !1),
      (this.ooe = !1),
      (this.JYo = -1),
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
    (this.TargetIndex = 0), (this.JYo = -1);
  }
  CheckMoveLastPoint() {
    return !this.lJo && this.TargetIndex === this.MovePoint.length - 1;
  }
  GetPreviousLocation() {
    return this.JYo >= 0 ? this.MovePoint[this.JYo].Position : void 0;
  }
  UpdateMovePoints(t) {
    let i = [];
    let e = ((i = Array.isArray(t.Points) ? t.Points : [t.Points]), !0);
    this.uJo(this.MovePoint, i)
      ? (e = !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "移动路径变更",
            ["实体ID", this.Hte.CreatureData.GetPbDataId()],
            ["PreviousIndex", this.JYo],
            ["MovePathLength", this.MovePoint.length],
            ["NewMovePathLength", i.length],
          ),
        (this.JYo = -1),
        t.Loop &&
          !t.CircleMove &&
          void 0 !== t.StartWithInversePath &&
          (this.ooe = t.StartWithInversePath)),
      (this.MovePoint = i),
      (this.lJo = t.Loop),
      (this._Jo = t.CircleMove ?? !1),
      void 0 !== t.StartIndex &&
      t.StartIndex >= 0 &&
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
          this.cJo(t.StartIndex))
        : t.UsePreviousIndex &&
            this.JYo >= 0 &&
            this.JYo < this.MovePoint.length
          ? (this.cJo(this.JYo),
            this.GetNextPoint() < this.MovePoint.length &&
              this.cJo(this.GetNextPoint()),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                43,
                "使用上次的移动点",
                ["实体ID", this.Hte.CreatureData.GetPbDataId()],
                ["PreviousIndex", this.JYo],
                ["TargetIndex", this.TargetIndex],
              ))
          : t.UseNearestPoint && e
            ? this.mJo()
            : this.cJo(0);
  }
  ChangeToNextPoint() {
    this.dJo(this.GetNextPoint());
  }
  GetNextPoint() {
    let t = 0;
    let i;
    return (
      this.lJo
        ? this._Jo
          ? (t = (this.TargetIndex + 1) % this.MovePoint.length)
          : this.ooe
            ? this.TargetIndex === 0
              ? ((this.ooe = !1),
                (t = 0),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 51, "往返式巡逻：回到起点", [
                    "PbDataID",
                    this.Hte.CreatureData.GetPbDataId(),
                  ]),
                ((i = Protocol_1.Aki.Protocol.YYn.create()).rkn =
                  MathUtils_1.MathUtils.NumberToLong(
                    this.Hte.CreatureData.GetCreatureDataId(),
                  )),
                (i.okn = !0),
                Net_1.Net.Call(10604, i, () => {}))
              : (t = this.TargetIndex - 1)
            : this.TargetIndex === this.MovePoint.length - 1
              ? ((this.ooe = !0),
                (t = this.MovePoint.length - 2),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 51, "往返式巡逻：走到终点", [
                    "PbDataID",
                    this.Hte.CreatureData.GetPbDataId(),
                  ]),
                ((i = Protocol_1.Aki.Protocol.YYn.create()).rkn =
                  MathUtils_1.MathUtils.NumberToLong(
                    this.Hte.CreatureData.GetCreatureDataId(),
                  )),
                (i.okn = !1),
                Net_1.Net.Call(10604, i, () => {}))
              : (t = this.TargetIndex + 1)
        : (t = this.TargetIndex + 1),
      t
    );
  }
  OnArriveMovePoint() {
    const t = this.TargetPoint;
    t?.Index !== -1 &&
      (t?.Actions &&
        t.Actions.length > 0 &&
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
          t.Actions,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id),
        ),
      t?.Callback && t.Callback(),
      t?.IsHide) &&
      this.CJo(t);
  }
  CJo(t) {
    this.Hte.SkeletalMesh?.SetVisibility(!t.IsHide);
    let i;
    const e = this.Hte.Entity.GetComponent(185);
    e &&
      ((i = -841499802),
      t.IsHide ? e.HasTag(i) || e.AddTag(i) : e.HasTag(i) && e.RemoveTag(i));
  }
  UpdatePreIndex() {
    return (
      this.JYo < 0 &&
        (this.ooe
          ? (this.JYo = Math.min(this.MovePoint.length, this.TargetIndex + 1))
          : (this.JYo = Math.max(0, this.TargetIndex - 1))),
      this.JYo
    );
  }
  gJo(t, i) {
    return (
      t === i ||
      !(!t || !i || t.Index !== i.Index || !t.Position.Equals(i.Position))
    );
  }
  uJo(i, e) {
    if (i !== e) {
      if (!i || !e) return !1;
      if (i.length !== e.length) return !1;
      const s = i.length;
      for (let t = 0; t < s; ++t) if (!this.gJo(i[t], e[t])) return !1;
    }
    return !0;
  }
  dJo(t) {
    return (
      (this.JYo = this.TargetIndex),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "更新移动路径经过点下标",
          ["实体ID", this.Hte.CreatureData.GetPbDataId()],
          ["PreviousIndex", this.JYo],
          ["MovePoint.length", this.MovePoint.length],
        ),
      this.cJo(t)
    );
  }
  cJo(t) {
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
  mJo() {
    const t = this.UTe();
    (this.TargetIndex = t - 1 >= 0 ? t - 1 : 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "使用最近的移动点",
          ["实体ID", this.Hte.CreatureData.GetPbDataId()],
          ["当前最近的点Index", t],
          ["TargetIndex", this.TargetIndex],
        ),
      this.cJo(t);
  }
  UTe() {
    let e = 0;
    let s = Number.MAX_VALUE;
    const h = this.Hte.ActorLocationProxy;
    for (let t = 0, i = this.MovePoint.length; t < i; t++) {
      let r = this.MovePoint[t];
      r.Index >= 0 &&
        (r = Vector_1.Vector.Dist(h, r.Position)) < s &&
        ((s = r), (e = t));
    }
    if (
      e === 0 ||
      (e === this.MovePoint.length - 1 &&
        s < MAX_DISTANCE &&
        Vector_1.Vector.Dist(
          this.MovePoint[0].Position,
          this.MovePoint[this.MovePoint.length - 1].Position,
        ) < MAX_DISTANCE)
    )
      return 0;
    for (let t = 0; t < this.MovePoint.length - 1; t++) {
      const i = this.MovePoint[t].Position;
      let o = this.MovePoint[t + 1].Position;
      const n =
        (this.jye.Set(o.X, o.Y, o.Z),
        this.jye.Subtraction(i, this.jye),
        this.jye.Size());
      this.RTe.Set(h.X, h.Y, h.Z),
        this.RTe.Subtraction(o, this.RTe),
        this.jye.DotProduct(this.RTe) > 0 ||
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
// # sourceMappingURL=PatrolMovePointsLogic.js.map
