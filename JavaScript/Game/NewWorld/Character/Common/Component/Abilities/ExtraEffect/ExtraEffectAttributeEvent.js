"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeEventEffects = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  BulletController_1 = require("../../../../../Bullet/BulletController"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeIntervalCheck_1 = require("../CharacterAttributeIntervalCheck"),
  ExtraEffectBase_1 = require("./ExtraEffectBase"),
  ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AttributeEventEffects extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.GoalType = 0),
      (this.Ids = void 0),
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
      r = Number(i[0]),
      h = 1 === Number(i[1]),
      e = AbilityUtils_1.AbilityUtils.GetLevelValue(e, s, -1),
      t = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, -1);
    (this.KQo = new CharacterAttributeIntervalCheck_1.AttributeIntervalCheck(
      r,
      e,
      t,
      h,
    )),
      (this.GoalType = Number(i[2])),
      (this.Ids = i[3].split("#").map((t) => BigInt(t))),
      (this.XQo = 1 === Number(i[4] ?? 0)),
      1 === Number(i[5] ?? 0) ? (this.YQo = 2) : (this.YQo = 0),
      1 === Number(i[6] ?? 0) ? (this.TargetType = 2) : (this.TargetType = 0);
  }
  OnCreated() {
    var t = this.JQo();
    t
      ? ((this.QQo = t.GetComponent(159)),
        this.KQo.IsPerTenThousand && void 0 === this.KQo.MaxAttributeId
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              20,
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
          20,
          "Invalid listen target when add extra effect attribute event",
          ["handle", this.ActiveHandleId],
          ["instigator id", this.InstigatorEntityId],
          [
            "instigator name",
            this.InstigatorBuffComponent?.ActorComponent?.Actor?.GetName(),
          ],
          ["owner id", this.OwnerEntity?.Id],
          [
            "owner name",
            this.OwnerBuffComponent?.GetActorComponent()?.Actor?.GetName(),
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
      s = t?.Actor;
    if (i && e && s)
      for (let t = 0; t < this.Ids.length; t++) {
        var r = String(this.Ids[t]),
          h = AbilityUtils_1.AbilityUtils.GetArrayValue(
            this.Times,
            t,
            ExtraEffectPassiveEffects_1.DEFAULT_PASSIVE_BULLET_TIMES,
          ),
          a = this.Buff.MessageId;
        for (let t = 0; t < h; t++)
          BulletController_1.BulletController.CreateBulletCustomTarget(
            s,
            r,
            i,
            { SyncType: 1 },
            a,
          );
      }
  }
}
exports.AttributeEventEffects = AttributeEventEffects;
//# sourceMappingURL=ExtraEffectAttributeEvent.js.map
