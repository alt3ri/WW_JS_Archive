"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeConvert = exports.AttributeEventEffects = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  BulletController_1 = require("../../../../../Bullet/BulletController"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeIntervalCheck_1 = require("../CharacterAttributeIntervalCheck"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase"),
  ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AttributeEventEffects extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.GoalType = 0),
      (this.Ids = []),
      (this.Times = void 0),
      (this.KQo = void 0),
      (this.QQo = void 0),
      (this.XQo = !1),
      (this.jht = !1),
      (this.$Qo = new Array()),
      (this.YQo = 0),
      (this._yo = (t, i, e) => {
        var s = this.jht;
        (this.jht = this.KQo.CheckListenActiveness(i, this.QQo)),
          s !== this.jht &&
            (this.jht
              ? this.TryExecute({}, this.OwnerBuffComponent)
              : this.zQo());
      });
  }
  InitParameters(t) {
    var i = t.ExtraEffectParameters,
      e = t.ExtraEffectGrowParameters1,
      t = t.ExtraEffectGrowParameters2,
      s = this.Level,
      h = Number(i[0]),
      r = 1 === Number(i[1]),
      e = AbilityUtils_1.AbilityUtils.GetLevelValue(e, s, -1),
      t = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, -1);
    (this.KQo = new CharacterAttributeIntervalCheck_1.AttributeIntervalCheck(
      h,
      e,
      t,
      r,
    )),
      (this.GoalType = Number(i[2])),
      (this.Ids = i[3].split("#").map((t) => Number(t))),
      (this.XQo = 1 === Number(i[4] ?? 0)),
      1 === Number(i[5] ?? 0) ? (this.YQo = 2) : (this.YQo = 0),
      1 === Number(i[6] ?? 0) ? (this.TargetType = 2) : (this.TargetType = 0);
  }
  OnCreated() {
    var t = this.JQo();
    t
      ? ((this.QQo = t.GetComponent(171)),
        this.KQo.IsPerTenThousand && void 0 === this.KQo.MaxAttributeId
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              19,
              "Buff额外效果6 监听属性变化到特定区间，基于相对最大值的万分比，但是监听的属性没有对应的最大值属性，该效果无效",
              ["buff Id", this.BuffId],
              ["属性Id", this.KQo.ListenAttributeId],
            )
          : ((t = this.QQo.GetCurrentValue(this.KQo.ListenAttributeId)),
            this._yo(this.KQo.ListenAttributeId, t, t),
            this.QQo.AddListener(
              this.KQo.ListenAttributeId,
              this._yo,
              "ExtraEffectAttributeEvent",
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          19,
          "Invalid listen target when add extra effect attribute event",
          ["handle", this.ActiveHandleId],
          ["instigator id", this.InstigatorEntityId],
          [
            "instigator name",
            this.InstigatorBuffComponent?.ActorComponent?.Owner?.GetName(),
          ],
          ["owner id", this.OwnerEntity?.Id],
          [
            "owner name",
            this.OwnerBuffComponent?.GetActorComponent()?.Owner?.GetName(),
          ],
          ["listen type", this.YQo],
        );
  }
  OnRemoved() {
    this.QQo?.RemoveListener(this.KQo.ListenAttributeId, this._yo);
  }
  CheckExecutable() {
    return !!this.OwnerBuffComponent?.HasBuffAuthority();
  }
  OnExecute() {
    if (this.jht)
      switch (this.GoalType) {
        case 1:
          this.ExecuteAddBullet();
          break;
        case 0:
          this.ExecuteAddBuffs();
      }
  }
  JQo() {
    return 2 !== this.YQo ? this.OwnerEntity : this.InstigatorEntity?.Entity;
  }
  GetEffectTarget() {
    return 2 !== this.TargetType
      ? this.OwnerBuffComponent
      : this.InstigatorBuffComponent;
  }
  zQo() {
    if (0 === this.GoalType) {
      if (this.XQo)
        for (const t of this.$Qo)
          this.GetEffectTarget()?.RemoveBuffByHandle(
            t,
            -1,
            `因为其它buff属性监听额外效果而移除（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
          );
      this.$Qo.length = 0;
    }
  }
  ExecuteAddBuffs() {
    var i = this.GetEffectTarget();
    if (this.CheckExecutable() && i)
      for (let t = 0; t < this.Ids.length; t++) {
        var e = this.Ids[t],
          s = AbilityUtils_1.AbilityUtils.GetArrayValue(
            this.Times,
            t,
            ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BUFF_ADD_TIMES,
          ),
          e = i.AddBuffLocal(e, {
            InstigatorId: this.InstigatorBuffComponent.CreatureDataId,
            Level: this.Level,
            OuterStackCount: s,
            PreMessageId: this.Buff.MessageId,
            ServerId: this.ServerId,
            Reason: `因为其它buff额外效果而添加（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
          });
        this.XQo && 0 < e && this.$Qo.push(e);
      }
  }
  ExecuteAddBullet() {
    var t = this.GetEffectTarget().GetActorComponent(),
      i = t?.ActorTransform,
      e = this.InstigatorEntity,
      s = t?.Entity;
    if (i && e && s)
      for (let t = 0; t < this.Ids.length; t++) {
        var h = String(this.Ids[t]),
          r = AbilityUtils_1.AbilityUtils.GetArrayValue(
            this.Times,
            t,
            ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES,
          ),
          a = this.Buff.MessageId;
        for (let t = 0; t < r; t++)
          BulletController_1.BulletController.CreateBulletCustomTarget(
            s,
            h,
            i,
            { SyncType: 1, CreateOnAuthority: !1 },
            a,
          );
      }
  }
}
exports.AttributeEventEffects = AttributeEventEffects;
class AttributeConvert extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.xul =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.Pul =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.wul =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.Bul = !1),
      (this.bul = 2),
      (this.qul = !1),
      (this.dBi = 0),
      (this.yB = 0),
      (this._yo = (t, i, e) => {
        this.OwnerBuffComponent
          ? ((i -= e),
            (1 === this.bul && i <= 0) ||
              (0 === this.bul && 0 <= i) ||
              this.TryExecute({}, this.OwnerBuffComponent, i))
          : CombatLog_1.CombatLog.Error(
              "Buff",
              this.OwnerEntity,
              "属性转换额外效果没有找到buff组件",
              ["handle", this.ActiveHandleId],
              ["buff Id", this.BuffId],
            );
      });
  }
  InitParameters(t) {
    var i,
      e = t.ExtraEffectParameters,
      s = t.ExtraEffectGrowParameters1,
      t = t.ExtraEffectGrowParameters2,
      h = this.Level;
    (this.xul = Number(e[0])),
      (this.wul = Number(e[1])),
      (this.Bul = 1 === Number(e[2])),
      this.Bul &&
        ((i = CharacterAttributeTypes_1.attributeIdsWithMax.get(this.xul))
          ? (this.Pul = i)
          : CombatLog_1.CombatLog.Error(
              "Buff",
              this.OwnerEntity,
              "属性转换额外效果监听属性为万分比时，监听属性没有对应的最大值属性",
              ["handle", this.ActiveHandleId],
              ["buff Id", this.BuffId],
              ["instigator id", this.InstigatorEntityId],
              ["属性Id", this.xul],
            )),
      (this.bul = Number(e[3])),
      (this.qul = 1 === Number(e[4])),
      (this.dBi =
        AbilityUtils_1.AbilityUtils.GetLevelValue(s, h, -1) *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (this.yB = AbilityUtils_1.AbilityUtils.GetLevelValue(t, h, -1));
  }
  OnCreated() {
    var t = this.ExactOwnerEntity?.GetComponent(171);
    t
      ? (this.Bul &&
          this.Pul ===
            CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None) ||
        t.AddListener(this.xul, this._yo, "ExtraEffectAttributeEvent")
      : CombatLog_1.CombatLog.Error(
          "Buff",
          this.OwnerEntity,
          "Invalid listen target when add extra effect attribute event",
          ["handle", this.ActiveHandleId],
          ["buff Id", this.BuffId],
          ["instigator id", this.InstigatorEntityId],
        );
  }
  OnRemoved() {
    this.OwnerEntity?.GetComponent(170)?.RemoveListener(this.xul, this._yo);
  }
  OnExecute(i) {
    var e = this.OwnerEntity?.GetComponent(170);
    if (e) {
      let t = this.qul ? Math.abs(i) : i;
      this.Bul &&
        (t =
          (t / e.GetCurrentValue(this.Pul)) *
          CharacterAttributeTypes_1.PER_TEN_THOUSAND);
      i = this.dBi * t + this.yB;
      e.AddBaseValue(this.wul, i);
    } else
      CombatLog_1.CombatLog.Error(
        "Buff",
        this.OwnerEntity,
        "属性转换额外效果没有找到属性组件",
        ["handle", this.ActiveHandleId],
        ["buff Id", this.BuffId],
      );
  }
}
exports.AttributeConvert = AttributeConvert;
//# sourceMappingURL=ExtraEffectAttributeEvent.js.map
