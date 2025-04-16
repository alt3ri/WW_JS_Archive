"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdditionBulletInterval =
    exports.AdditionBulletDuration =
    exports.AdditionBulletSize =
    exports.ExtraEffectModifyBuffMaxStack =
    exports.ModifyBuffDurationOrPeriodByInstigator =
    exports.ModifyBuffDurationOrPeriod =
    exports.PreventReduceStack =
    exports.ModifyToughReduce =
    exports.AddBuffToVision =
    exports.FrozenEffect =
    exports.AddPassiveSkill =
    exports.TimeScaleEffect =
    exports.LockLowerBound =
    exports.LockUpperBound =
    exports.LockValue =
    exports.ShieldEffect =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../../../Core/Utils/DataTableUtil"),
  PanelQteController_1 = require("../../../../../../Module/PanelQte/PanelQteController"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  AbilityUtils_1 = require("../AbilityUtils"),
  ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class ShieldEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.ShieldTemplateId = 0);
  }
  InitParameters(t) {
    this.ShieldTemplateId = Number(t.ExtraEffectParameters[0]);
  }
  OnExecute() {}
  GetDebugEffectString() {
    return `添加护盾${this.ShieldTemplateId}(纯服务端逻辑)`;
  }
}
exports.ShieldEffect = ShieldEffect;
class LockValue extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.AttributeId =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.Offset = 0),
      (this.Percent = -0);
  }
  InitParameters(t) {
    (this.AttributeId = Number(t.ExtraEffectParameters[0])),
      (this.Offset = Number(t.ExtraEffectParameters[1])),
      (this.Percent = 0),
      2 < t.ExtraEffectParameters.length &&
        (this.Percent = Number(t.ExtraEffectParameters[2]));
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(170)?.AddStateAttributeLock(
      this.ActiveHandleId,
      this.AttributeId,
      this.Percent,
      this.Offset,
    );
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(170)?.RemoveStateAttributeLock(
      this.ActiveHandleId,
      this.AttributeId,
    );
  }
  GetDebugEffectString() {
    return `锁定属性${this.AttributeId}为${this.Percent}% + ` + this.Offset;
  }
}
exports.LockValue = LockValue;
class LockUpperBound extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.AttributeId =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.Offset = 0),
      (this.Percent = -0);
  }
  InitParameters(t) {
    (this.AttributeId = Number(t.ExtraEffectParameters[0])),
      (this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters1,
        this.Level,
        0,
      )),
      (this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters2,
        this.Level,
        0,
      )),
      2 < t.ExtraEffectParameters.length &&
        (this.Percent = Number(t.ExtraEffectParameters[2]));
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(170)?.AddIntervalLock(
      0,
      this.ActiveHandleId,
      this.AttributeId,
      this.Percent,
      this.Offset,
    );
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(170)?.RemoveIntervalLock(
      0,
      this.ActiveHandleId,
      this.AttributeId,
    );
  }
  GetDebugEffectString() {
    return (
      `锁定属性${this.AttributeId}的上限为${(this.Percent / 100).toFixed(1)}% + ` +
      this.Offset
    );
  }
}
exports.LockUpperBound = LockUpperBound;
class LockLowerBound extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.AttributeId =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.Offset = 0),
      (this.Percent = -0);
  }
  InitParameters(t) {
    (this.AttributeId = Number(t.ExtraEffectParameters[0])),
      (this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters1,
        this.Level,
        0,
      )),
      (this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters2,
        this.Level,
        0,
      )),
      2 < t.ExtraEffectParameters.length &&
        (this.Percent = Number(t.ExtraEffectParameters[2]));
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(170)?.AddIntervalLock(
      1,
      this.ActiveHandleId,
      this.AttributeId,
      this.Percent,
      this.Offset,
    );
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(170)?.RemoveIntervalLock(
      1,
      this.ActiveHandleId,
      this.AttributeId,
    );
  }
  GetDebugEffectString() {
    return (
      `锁定属性${this.AttributeId}的下限为${(this.Percent / 100).toFixed(1)}% + ` +
      this.Offset
    );
  }
}
exports.LockLowerBound = LockLowerBound;
class TimeScaleEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.Priority = 0),
      (this.Dilation = 0),
      (this.CurveId = -1),
      (this.CurveDt = void 0),
      (this.Active = !0);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.Priority = Number(t[0])),
      (this.Dilation = Number(t[1])),
      (this.CurveId = Number(t[3] ?? -1)),
      (this.CurveId = this.CurveId % 1 == 0 ? this.CurveId : -1);
  }
  OnCreated() {
    this.yXo();
  }
  OnExecute() {}
  OnRemoved() {
    (this.Active = !1), this.IXo(), (this.CurveDt = void 0);
  }
  StartTimeScaleEffect() {
    this.yXo();
  }
  StopTimeScaleEffect() {
    this.IXo();
  }
  yXo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        35,
        "AddTimeScaleByBuff",
        ["this.CurveDt", void 0 === this.CurveDt],
        ["this.CurveId", this.CurveId],
      ),
      -1 === this.CurveId || this.CurveDt
        ? this.TXo()
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Bullet", 35, "AddTimeScaleLoad", [
              "this.CurveId",
              this.CurveId,
            ]),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            "/Game/Aki/Data/Fight/DT_BuffTimeScaleCurve.DT_BuffTimeScaleCurve",
            UE.DataTable,
            (t) => {
              this.Active
                ? ((this.CurveDt = t), this.TXo())
                : Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Bullet", 35, "TimeScaleHasRemoved");
            },
          ));
  }
  TXo() {
    var t = this.CurveDt
      ? DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.CurveDt,
          this.CurveId.toString(),
        )
      : void 0;
    this.OwnerEntity?.CheckGetComponent(16)?.AddTimeScaleByBuff(
      this.ActiveHandleId,
      this.Priority,
      this.Dilation,
      t?.时间膨胀时长,
      t?.时间膨胀变化曲线,
    ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          35,
          "AddTimeScaleByBuff",
          ["curve?.时间膨胀时长", t?.时间膨胀时长],
          ["curve?.时间膨胀变化曲线", t?.时间膨胀变化曲线],
        );
  }
  IXo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Bullet", 35, "RemoveTimeScaleByBuff", [
        "this.ActiveHandleId",
        this.ActiveHandleId,
      ]),
      this.OwnerEntity?.CheckGetComponent(16)?.RemoveTimeScaleByBuff(
        this.ActiveHandleId,
      );
  }
  GetDebugEffectString() {
    return -1 === this.CurveId
      ? `设置时间膨胀(倍率${this.Dilation})`
      : `设置时间膨胀(倍率${this.Dilation} 曲线${this.CurveId})`;
  }
}
exports.TimeScaleEffect = TimeScaleEffect;
class AddPassiveSkill extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.SkillIds = void 0);
  }
  InitParameters(t) {
    this.SkillIds =
      t.ExtraEffectParameters[0].split("#").map((t) => Number(t)) ?? [];
  }
  OnCreated() {
    var t = this.OwnerBuffComponent.GetPassiveSkillComponent();
    if (t?.Valid)
      for (const e of this.SkillIds)
        this.Buff
          ? t.LearnPassiveSkill(e, {
              NeedBroadcast: !0,
              Buff: this.Buff,
              CombatMessageId: this.Buff.MessageId,
            })
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Bullet", 35, "没有Buff不能加被动技能");
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent.GetPassiveSkillComponent();
    if (t?.Valid) for (const e of this.SkillIds) t.ForgetPassiveSkill(e, !0);
  }
  GetDebugEffectString() {
    return "添加被动技能" + this.SkillIds?.join(",");
  }
}
exports.AddPassiveSkill = AddPassiveSkill;
class FrozenEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.LockName = ""),
      (this.PanelQteId = 0),
      (this.PanelQteHandleId = 0);
  }
  InitParameters(t) {
    (this.LockName = "" + this.ActiveHandleId),
      0 < t.ExtraEffectParameters.length &&
        (this.PanelQteId = Number(t.ExtraEffectParameters[0]));
  }
  OnCreated() {
    this.OwnerBuffComponent?.GetEntity()
      ?.CheckGetComponent(16)
      ?.LockFrozen(this.LockName),
      this.PanelQteId &&
        (this.PanelQteHandleId =
          PanelQteController_1.PanelQteController.StartBuffQte(
            this.PanelQteId,
            this.BuffId,
            this.ActiveHandleId,
            this.OwnerBuffComponent?.GetEntity(),
            this.Buff.MessageId,
          ));
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerBuffComponent?.GetEntity()
      ?.CheckGetComponent(16)
      ?.UnlockFrozen(this.LockName),
      this.PanelQteId &&
        0 < this.PanelQteHandleId &&
        PanelQteController_1.PanelQteController.StopQte(this.PanelQteHandleId);
  }
  GetDebugEffectString() {
    return "冻结" + (0 < this.PanelQteId ? "并播放QTE" + this.PanelQteId : "");
  }
}
exports.FrozenEffect = FrozenEffect;
class AddBuffToVision extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.SummonType = 0),
      (this.SummonIndex = 0),
      (this.BuffIds = []);
  }
  InitParameters(t) {
    t.ExtraEffectParameters &&
      ((this.SummonType = Number(t.ExtraEffectParameters[0] ?? 0)),
      (this.SummonIndex = Number(t.ExtraEffectParameters[1] ?? 0)),
      (this.BuffIds =
        t.ExtraEffectParameters[2]?.split("#")?.map((t) => Number(t ?? 0)) ??
        []));
  }
  OnCreated() {
    var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.OwnerEntity,
        this.SummonType,
        this.SummonIndex,
      )?.Entity,
      e = this.Buff?.MessageId,
      s =
        (e ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Bullet", 35, "没有父Buff的上下文信息")),
        t?.GetComponent(172));
    if (s)
      for (const i of this.BuffIds)
        s.AddBuff(i, {
          InstigatorId:
            this.InstigatorBuffComponent?.CreatureDataId ??
            ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          PreMessageId: e,
          Reason: `buff${this.BuffId}向召唤物共享buff`,
        });
  }
  OnExecute() {}
  OnRemoved() {
    var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      this.OwnerEntity,
      this.SummonType,
    )?.Entity?.GetComponent(172);
    if (t)
      for (const e of this.BuffIds)
        t.RemoveBuff(e, -1, `召唤者的buff${this.BuffId}移除`);
  }
}
exports.AddBuffToVision = AddBuffToVision;
class ModifyToughReduce extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.ModifyRate = 0), (this.ModifierHandle = 0);
  }
  InitParameters(t) {
    t.ExtraEffectParameters &&
      (this.ModifyRate = Number(t.ExtraEffectParameters[0] ?? 0));
  }
  OnCreated() {
    var t = this.OwnerEntity?.CheckGetComponent(170);
    t &&
      (this.ModifierHandle = t.AddModifier(
        CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce,
        { Type: -1, Value1: this.ModifyRate },
      ));
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerEntity?.CheckGetComponent(170);
    t &&
      t.RemoveModifier(
        CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce,
        this.ModifierHandle,
      );
  }
  GetDebugEffectString() {
    return `修改韧性扣减率${(100 * this.ModifyRate).toFixed(1)}%`;
  }
}
exports.ModifyToughReduce = ModifyToughReduce;
class PreventReduceStack extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.InvolvedBuffIds = []);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    t && (this.InvolvedBuffIds = t[0].split("#").map((t) => Number(t)));
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t)
      for (const e of this.InvolvedBuffIds) t.AddBuffRoutineExpirationLock(e);
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t)
      for (const e of this.InvolvedBuffIds)
        t.RemoveBuffRoutineExpirationLock(e);
  }
  GetDebugEffectString() {
    return `阻止buff${this.InvolvedBuffIds.join(",")}随时间自然衰减`;
  }
}
exports.PreventReduceStack = PreventReduceStack;
class ModifyBuffDurationOrPeriod extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.InvolvedBuffIds = []),
      (this.DurationRate = 0),
      (this.PeriodRate = 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    (this.DurationRate = AbilityUtils_1.AbilityUtils.GetLevelValue(
      t.ExtraEffectGrowParameters1,
      this.Level,
      0,
    )),
      (this.PeriodRate = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters2,
        this.Level,
        0,
      )),
      e &&
        (this.InvolvedBuffIds = e[0].split("#").map((t) => Number(t.trim())));
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t && (0 !== this.DurationRate || 0 !== this.PeriodRate))
      for (const e of this.InvolvedBuffIds)
        t.AddBuffTimeModifier(
          e,
          this.ActiveHandleId,
          this.PeriodRate,
          this.DurationRate,
          !1,
        );
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t)
      for (const e of this.InvolvedBuffIds)
        t.RemoveBuffTimeModifier(e, this.ActiveHandleId, !1);
  }
  GetDebugEffectString() {
    var t = "修改buff" + this.InvolvedBuffIds.join(",");
    return (
      (t += ` 持续时间${0 <= this.DurationRate ? "+" : ""}${(0.01 * this.DurationRate).toFixed(1)}%`) +
      ` 周期${0 <= this.DurationRate ? "+" : ""}${(0.01 * this.PeriodRate).toFixed(1)}%`
    );
  }
}
exports.ModifyBuffDurationOrPeriod = ModifyBuffDurationOrPeriod;
class ModifyBuffDurationOrPeriodByInstigator extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.InvolvedBuffIds = []),
      (this.DurationRate = 0),
      (this.PeriodRate = 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    (this.DurationRate = AbilityUtils_1.AbilityUtils.GetLevelValue(
      t.ExtraEffectGrowParameters1,
      this.Level,
      0,
    )),
      (this.PeriodRate = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t.ExtraEffectGrowParameters2,
        this.Level,
        0,
      )),
      e &&
        (this.InvolvedBuffIds = e[0].split("#").map((t) => Number(t.trim())));
  }
  OnCreated() {
    var t = this.OwnerBuffComponent;
    if (t && (0 !== this.DurationRate || 0 !== this.PeriodRate))
      for (const e of this.InvolvedBuffIds)
        t.AddBuffTimeModifier(
          e,
          this.ActiveHandleId,
          this.PeriodRate,
          this.DurationRate,
          !0,
        );
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t)
      for (const e of this.InvolvedBuffIds)
        t.RemoveBuffTimeModifier(e, this.ActiveHandleId, !0);
  }
  GetDebugEffectString() {
    var t = "修改由该持有者施加的buff" + this.InvolvedBuffIds.join(",");
    return (
      (t += ` 持续时间${0 <= this.DurationRate ? "+" : ""}${(0.01 * this.DurationRate).toFixed(1)}%`) +
      ` 周期${0 <= this.DurationRate ? "+" : ""}${(0.01 * this.PeriodRate).toFixed(1)}%`
    );
  }
}
exports.ModifyBuffDurationOrPeriodByInstigator =
  ModifyBuffDurationOrPeriodByInstigator;
class ExtraEffectModifyBuffMaxStack extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.InvolvedBuffIds = []), (this.StackValues = []);
  }
  InitParameters(t) {
    for (const i of t.ExtraEffectParameters) {
      var [e, s] = i.split("#");
      this.InvolvedBuffIds.push(Number(e)), this.StackValues.push(Number(s));
    }
  }
  OnCreated() {
    var e = this.OwnerBuffComponent;
    if (e)
      for (let t = 0; t < this.InvolvedBuffIds.length; t++)
        e.AddBuffStackModifier(
          this.InvolvedBuffIds[t],
          this.ActiveHandleId,
          this.StackValues[t],
        );
  }
  OnExecute() {}
  OnRemoved() {
    var t = this.OwnerBuffComponent;
    if (t && 0 < this.InvolvedBuffIds.length)
      for (const e of this.InvolvedBuffIds)
        t.RemoveBuffStackModifier(e, this.ActiveHandleId);
  }
  GetDebugEffectString() {
    var t = "修改buff" + this.InvolvedBuffIds;
    return (t += " 修改层数" + this.StackValues);
  }
}
exports.ExtraEffectModifyBuffMaxStack = ExtraEffectModifyBuffMaxStack;
const SIZE_SCALE_PARAMS_LEN = 4,
  SIZE_SCALE_INDEX_BULLETROWNAME = 0,
  SIZE_SCALE_INDEX_X = 1,
  SIZE_SCALE_INDEX_Y = 2,
  SIZE_SCALE_INDEX_Z = 3;
class AdditionBulletSize extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.NSc = new Map()), (this.VSc = new Array());
  }
  OnExecute() {}
  InitParameters(t) {
    var e = t.ExtraEffectParameters,
      s = e?.length ?? 0;
    for (let t = 0; t < s; t++) {
      var i,
        r,
        h = e[t],
        o = h.split("#");
      o.length < SIZE_SCALE_PARAMS_LEN
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BuffItem",
            20,
            "参数数量不足, 需要4个",
            ["Buff", this.BuffId],
            ["参数", h],
            ["参数索引", t],
            ["参数数量", s],
          )
        : ((h = o[SIZE_SCALE_INDEX_BULLETROWNAME]),
          (i = Number(o[SIZE_SCALE_INDEX_X])),
          (r = Number(o[SIZE_SCALE_INDEX_Y])),
          (o = Number(o[SIZE_SCALE_INDEX_Z])),
          this.NSc.set(h, t * SIZE_SCALE_INDEX_Z),
          this.VSc.push(i),
          this.VSc.push(r),
          this.VSc.push(o),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BuffItem",
              20,
              "AdditionBulletSizeByInstigator.Init",
              ["子弹ID", h],
              ["子弹缩放X", i],
              ["子弹缩放Y", r],
              ["子弹缩放Z", o],
            ));
    }
  }
  GetBulletSizeScale(t) {
    var e,
      s = this.NSc.get(t);
    if (!(void 0 === s || s < 0)) {
      if (!(s >= this.VSc.length))
        return (
          (e = this.Buff.StackCount),
          [
            this.VSc[s] * e,
            this.VSc[s + SIZE_SCALE_INDEX_X] * e,
            this.VSc[s + SIZE_SCALE_INDEX_Y] * e,
          ]
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "BuffItem",
          20,
          "获取到的索引超过了参数数量",
          ["Buff", this.BuffId],
          ["参数索引", s],
          ["参数数量", this.VSc.length],
          ["子弹ID", t],
        );
    }
  }
}
exports.AdditionBulletSize = AdditionBulletSize;
const DURATION_SCALE_PARAMS_LEN = 2,
  DURATION_SCALE_INDEX_BULLETROWNAME = 0,
  DURATION_SCALE_INDEX_DURATION = 1;
class AdditionBulletDuration extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.jSc = new Map());
  }
  OnExecute() {}
  InitParameters(t) {
    var e = t.ExtraEffectParameters,
      s = e?.length ?? 0;
    for (let t = 0; t < s; t++) {
      var i = e[t],
        r = i.split("#");
      r.length < DURATION_SCALE_PARAMS_LEN
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BuffItem",
            20,
            "参数数量不足, 需要2个",
            ["Buff", this.BuffId],
            ["参数", i],
            ["参数索引", t],
            ["参数数量", s],
          )
        : ((i = r[DURATION_SCALE_INDEX_BULLETROWNAME]),
          (r = Number(r[DURATION_SCALE_INDEX_DURATION])),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BuffItem",
              20,
              "AdditionBulletDurationByInstigator.Init",
              ["子弹ID", i],
              ["子弹持续时间", r],
            ),
          this.jSc.set(i, Number(r)));
    }
  }
  GetBulletDuration(t) {
    return (this.jSc.get(t) ?? 0) * this.Buff.StackCount;
  }
}
exports.AdditionBulletDuration = AdditionBulletDuration;
const INTERVAL_SCALE_PARAMS_LEN = 2,
  INTERVAL_SCALE_INDEX_BULLETROWNAME = 0,
  INTERVAL_SCALE_INDEX_INTERVAL = 1;
class AdditionBulletInterval extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.HSc = new Map());
  }
  OnExecute() {}
  InitParameters(t) {
    var e = t.ExtraEffectParameters,
      s = e?.length ?? 0;
    for (let t = 0; t < s; t++) {
      var i = e[t],
        r = i.split("#");
      r.length < INTERVAL_SCALE_PARAMS_LEN
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BuffItem",
            20,
            "参数数量不足, 需要2个",
            ["Buff", this.BuffId],
            ["参数", i],
            ["参数索引", t],
            ["参数数量", s],
          )
        : ((i = r[INTERVAL_SCALE_INDEX_BULLETROWNAME]),
          (r = Number(r[INTERVAL_SCALE_INDEX_INTERVAL])),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BuffItem",
              20,
              "AdditionBulletIntervalByInstigator.Init",
              ["子弹ID", i],
              ["子弹作用间隔", r],
            ),
          this.HSc.set(i, r));
    }
  }
  GetBulletInterval(t) {
    return (this.HSc.get(t) ?? 0) * this.Buff.StackCount;
  }
}
exports.AdditionBulletInterval = AdditionBulletInterval;
//# sourceMappingURL=ExtraEffectMisc.js.map
