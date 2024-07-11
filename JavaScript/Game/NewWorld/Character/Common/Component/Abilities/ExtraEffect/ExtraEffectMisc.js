"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModifyToughReduce =
    exports.AddBuffToVision =
    exports.FrozenEffect =
    exports.AddPassiveSkill =
    exports.TimeScaleEffect =
    exports.LockLowerBound =
    exports.LockUpperBound =
    exports.LockValue =
    exports.ShieldEffect =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../../../Core/Utils/DataTableUtil");
const PanelQteController_1 = require("../../../../../../Module/PanelQte/PanelQteController");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const AbilityUtils_1 = require("../AbilityUtils");
const ActiveBuffConfigs_1 = require("../Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ShieldEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.ShieldTemplateId = 0);
  }
  InitParameters(t) {
    this.ShieldTemplateId = Number(t.ExtraEffectParameters[0]);
  }
  OnExecute() {}
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
      t.ExtraEffectParameters.length > 2 &&
        (this.Percent = Number(t.ExtraEffectParameters[2]));
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(155)?.AddStateAttributeLock(
      this.ActiveHandleId,
      this.AttributeId,
      this.Percent,
      this.Offset,
    );
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(155)?.RemoveStateAttributeLock(
      this.ActiveHandleId,
      this.AttributeId,
    );
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
      t.ExtraEffectParameters.length > 2 &&
        (this.Percent = Number(t.ExtraEffectParameters[2]));
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(155)?.AddIntervalLock(
      0,
      this.ActiveHandleId,
      this.AttributeId,
      this.Percent,
      this.Offset,
    );
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(155)?.RemoveIntervalLock(
      0,
      this.ActiveHandleId,
      this.AttributeId,
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
      t.ExtraEffectParameters.length > 2 &&
        (this.Percent = Number(t.ExtraEffectParameters[2]));
  }
  OnCreated() {
    this.OwnerEntity?.CheckGetComponent(155)?.AddIntervalLock(
      1,
      this.ActiveHandleId,
      this.AttributeId,
      this.Percent,
      this.Offset,
    );
  }
  OnExecute() {}
  OnRemoved() {
    this.OwnerEntity?.CheckGetComponent(155)?.RemoveIntervalLock(
      1,
      this.ActiveHandleId,
      this.AttributeId,
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
    this.LQo();
  }
  OnExecute() {}
  OnRemoved() {
    (this.Active = !1), this.DQo(), (this.CurveDt = void 0);
  }
  StartTimeScaleEffect() {
    this.LQo();
  }
  StopTimeScaleEffect() {
    this.DQo();
  }
  LQo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        36,
        "AddTimeScaleByBuff",
        ["this.CurveDt", void 0 === this.CurveDt],
        ["this.CurveId", this.CurveId],
      ),
      this.CurveId === -1 || this.CurveDt
        ? this.RQo()
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Bullet", 36, "AddTimeScaleLoad", [
              "this.CurveId",
              this.CurveId,
            ]),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            "/Game/Aki/Data/Fight/DT_BuffTimeScaleCurve.DT_BuffTimeScaleCurve",
            UE.DataTable,
            (t) => {
              this.Active
                ? ((this.CurveDt = t), this.RQo())
                : Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Bullet", 36, "TimeScaleHasRemoved");
            },
          ));
  }
  RQo() {
    const t = this.CurveDt
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
          36,
          "AddTimeScaleByBuff",
          ["curve?.时间膨胀时长", t?.时间膨胀时长],
          ["curve?.时间膨胀变化曲线", t?.时间膨胀变化曲线],
        );
  }
  DQo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Bullet", 36, "RemoveTimeScaleByBuff", [
        "this.ActiveHandleId",
        this.ActiveHandleId,
      ]),
      this.OwnerEntity?.CheckGetComponent(16)?.RemoveTimeScaleByBuff(
        this.ActiveHandleId,
      );
  }
}
exports.TimeScaleEffect = TimeScaleEffect;
class AddPassiveSkill extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.SkillIds = void 0);
  }
  InitParameters(t) {
    this.SkillIds =
      t.ExtraEffectParameters[0].split("#").map((t) => BigInt(t)) ?? [];
  }
  OnCreated() {
    const t = this.OwnerBuffComponent.GetPassiveSkillComponent();
    if (t?.Valid)
      for (const e of this.SkillIds)
        this.Buff
          ? t.LearnPassiveSkill(e, { NeedBroadcast: !0, Buff: this.Buff })
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Bullet", 36, "没有Buff不能加被动技能");
  }
  OnExecute() {}
  OnRemoved() {
    const t = this.OwnerBuffComponent.GetPassiveSkillComponent();
    if (t?.Valid) for (const e of this.SkillIds) t.ForgetPassiveSkill(e, !0);
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
      t.ExtraEffectParameters.length > 0 &&
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
        this.PanelQteHandleId > 0 &&
        PanelQteController_1.PanelQteController.StopQte(this.PanelQteHandleId);
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
        t.ExtraEffectParameters[2]?.split("#")?.map((t) => BigInt(t ?? 0n)) ??
        []));
  }
  OnCreated() {
    const t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      this.OwnerEntity,
      this.SummonType,
      this.SummonIndex,
    )?.Entity;
    const e = this.Buff?.MessageId;
    const s =
      (e ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Bullet", 36, "没有父Buff的上下文信息")),
      t?.GetComponent(157));
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
    const t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      this.OwnerEntity,
      this.SummonType,
    )?.Entity?.GetComponent(157);
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
    const t = this.OwnerEntity?.CheckGetComponent(155);
    t &&
      (this.ModifierHandle = t.AddModifier(
        CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce,
        { Type: 9, Value1: this.ModifyRate },
      ));
  }
  OnExecute() {}
  OnRemoved() {
    const t = this.OwnerEntity?.CheckGetComponent(155);
    t &&
      t.RemoveModifier(
        CharacterAttributeTypes_1.EAttributeId.Proto_ToughReduce,
        this.ModifierHandle,
      );
  }
}
exports.ModifyToughReduce = ModifyToughReduce;
// # sourceMappingURL=ExtraEffectMisc.js.map
