"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationAttributeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll"),
  FormationPropertyById_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  FormationAttributeController_1 = require("./FormationAttributeController");
class FormationAttributeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.pK = new Map()),
      (this.zBe = new Map()),
      (this.BoundsLockerMap = new Map());
  }
  GetConfig(e) {
    var t,
      r = this.pK.get(e);
    return (
      r ||
        ((r = {
          RawConfig: (t =
            FormationPropertyById_1.configFormationPropertyById.GetConfig(e)),
          ForbidIncreaseTags: (t.MarkTag ?? []).map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ),
          ForbidDecreaseTags: (t.ResistTag ?? []).map((e) =>
            GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
          ),
        }),
        this.pK.set(e, r)),
      r
    );
  }
  OnInit() {
    var e = Time_1.Time.WorldTime;
    for (const t of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList())
      this.zBe.set(t.Id, {
        Max: t.InitMax,
        BaseMax: t.InitMax,
        Value: t.InitValue,
        Speed: t.InitRecoveryRate,
        BaseSpeed: t.InitRecoveryRate,
        Timestamp: e,
      });
    return !0;
  }
  OnClear() {
    return this.pK.clear(), this.zBe.clear(), !0;
  }
  GetValue(e) {
    var t,
      r,
      o = this.GetData(e);
    return o
      ? ((r = this.GetPredictedServerStopTime() - o.Timestamp),
        0 === (t = o.Speed) || r <= 0
          ? o.Value
          : ((r = r * CommonDefine_1.SECOND_PER_MILLIONSECOND * t),
            this.ClampValue(e, o.Value + r, 0, o.Max)))
      : 0;
  }
  GetMax(e) {
    return this.GetData(e)?.Max ?? 0;
  }
  GetBaseMax(e) {
    return this.GetData(e)?.BaseMax ?? 0;
  }
  GetBaseRate(e) {
    return this.GetData(e)?.BaseSpeed ?? 0;
  }
  GetSpeed(e) {
    return this.GetData(e)?.Speed ?? 0;
  }
  GetData(e) {
    var t = this.zBe.get(e);
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("CombatInfo", 20, "尝试读取不存在的队伍属性。", [
        "typeId",
        e,
      ]);
  }
  SetData(e, t, r, o, i, a) {
    e = this.GetData(e);
    e &&
      ((e.Max = t),
      (e.BaseMax = r),
      (e.Value = o),
      (e.Speed = i),
      (e.Timestamp = a));
  }
  SetSpeed(e, t) {
    var r = this.GetData(e);
    r &&
      ((e = this.GetValue(e)),
      (r.Timestamp = this.GetPredictedServerStopTime()),
      (r.Value = e),
      (r.Speed = t));
  }
  SetValue(e, t) {
    var r = this.GetData(e);
    r &&
      ((r.Timestamp = this.GetPredictedServerStopTime()),
      (r.Value = this.ClampValue(e, t, 0, r.Max)));
  }
  SetMax(e, t) {
    var r = this.zBe.get(e);
    r &&
      ((e = this.GetValue(e)),
      (r.Timestamp = this.GetPredictedServerStopTime()),
      (r.Value = Math.min(e, t)),
      (r.Max = t));
  }
  ClampValue(e, t, r, o) {
    let i = t,
      a = r,
      s = o;
    var n,
      t = this.BoundsLockerMap.get(e);
    if (t)
      for (const h of t.values())
        h.LockLowerBounds &&
          ((n = h.LowerPercent * o + h.LowerOffset), (a = Math.max(a ?? n, n))),
          h.LockUpperBounds &&
            ((n = h.UpperPercent * o + h.UpperOffset),
            (s = Math.min(s ?? n, n)));
    return (
      void 0 !== s && (i = Math.min(s, i)),
      (i = void 0 !== a ? Math.max(a, i) : i)
    );
  }
  AddBoundsLocker(e, t, r) {
    this.SetValue(e, this.GetValue(e));
    let o = this.BoundsLockerMap.get(e);
    return (
      o || this.BoundsLockerMap.set(e, (o = new Map())),
      o.has(r) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          20,
          "重复添加队伍属性锁",
          ["attrId", e],
          ["handle", r],
        ),
      o.set(r, t),
      this.SetValue(e, this.GetValue(e)),
      r
    );
  }
  RemoveBoundsLocker(e, t) {
    this.SetValue(e, this.GetValue(e));
    var r = this.BoundsLockerMap.get(e);
    return !(!r || !r.delete(t) || (this.SetValue(e, this.GetValue(e)), 0));
  }
  GetPredictedServerStopTime() {
    return Number(
      FormationAttributeController_1.FormationAttributeController.GetPredictedServerStopTime(),
    );
  }
}
exports.FormationAttributeModel = FormationAttributeModel;
//# sourceMappingURL=FormationAttributeModel.js.map
