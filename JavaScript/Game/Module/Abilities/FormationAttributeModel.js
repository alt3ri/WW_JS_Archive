"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationAttributeModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll"),
  FormationPropertyById_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
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
      i = this.GetData(e);
    return i
      ? ((r = this.GetPredictedServerStopTime() - i.Timestamp),
        0 === (t = i.Speed) || r <= 0
          ? i.Value
          : ((r = r * CommonDefine_1.SECOND_PER_MILLIONSECOND * t),
            this.ClampValue(e, i.Value + r, 0, i.Max)))
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
      Log_1.Log.Error("CombatInfo", 19, "尝试读取不存在的队伍属性。", [
        "typeId",
        e,
      ]);
  }
  SetData(e, t, r, i, o, a) {
    e = this.GetData(e);
    e &&
      ((e.Max = t),
      (e.BaseMax = r),
      (e.Value = i),
      (e.Speed = o),
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
  ClampValue(e, t, r, i) {
    let o = t,
      a = r,
      s = i;
    var n,
      t = this.BoundsLockerMap.get(e);
    if (t)
      for (const h of t.values())
        h.LockLowerBounds &&
          ((n = h.LowerPercent * i + h.LowerOffset), (a = Math.max(a ?? n, n))),
          h.LockUpperBounds &&
            ((n = h.UpperPercent * i + h.UpperOffset),
            (s = Math.min(s ?? n, n)));
    return (
      void 0 !== s && (o = Math.min(s, o)),
      (o = void 0 !== a ? Math.max(a, o) : o)
    );
  }
  AddBoundsLocker(e, t, r) {
    this.SetValue(e, this.GetValue(e));
    let i = this.BoundsLockerMap.get(e);
    return (
      i || this.BoundsLockerMap.set(e, (i = new Map())),
      i.has(r) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          19,
          "重复添加队伍属性锁",
          ["attrId", e],
          ["handle", r],
        ),
      i.set(r, t),
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
    return Time_1.Time.ServerCombatStopTime;
  }
}
exports.FormationAttributeModel = FormationAttributeModel;
//# sourceMappingURL=FormationAttributeModel.js.map
