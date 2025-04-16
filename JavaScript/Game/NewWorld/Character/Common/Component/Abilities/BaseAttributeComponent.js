"use strict";
var BaseAttributeComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, r, i) {
      var s,
        a = arguments.length,
        o =
          a < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, r))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, r, i);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (s = t[n]) &&
            (o = (a < 3 ? s(o) : 3 < a ? s(e, r, o) : s(e, r)) || o);
      return 3 < a && o && Object.defineProperty(e, r, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseAttributeComponent = exports.AttributeSnapshot = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  StatDefine_1 = require("../../../../../Common/StatDefine"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  AbilityUtils_1 = require("./AbilityUtils"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
class AttributeSnapshot {
  constructor() {
    (this.BaseValues = {}), (this.CurrentValues = {});
  }
  GetBaseValue(t) {
    return this.BaseValues[CharacterAttributeTypes_1.EAttributeId[t]];
  }
  GetCurrentValue(t) {
    return this.CurrentValues[CharacterAttributeTypes_1.EAttributeId[t]];
  }
}
exports.AttributeSnapshot = AttributeSnapshot;
let BaseAttributeComponent =
  (BaseAttributeComponent_1 = class BaseAttributeComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.BaseValues = new Array(
          CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX,
        )),
        (this.CurrentValues = new Array(
          CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX,
        )),
        (this.ModifierLists = new Array(
          CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX,
        )),
        (this.BoundsLockerMap = new Map()),
        (this.CreatureDataComponent = void 0),
        (this.BuffComponent = void 0),
        (this.CurrentValueListenerMap = new Map()),
        (this.AnyCurrentValueListenerSet = new Set());
    }
    OnInit() {
      return (
        super.OnInit(),
        (this.CreatureDataComponent = this.Entity.CheckGetComponent(0)),
        (this.BuffComponent = this.Entity.GetComponent(207)),
        !0
      );
    }
    OnCreate() {
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.BaseValues[t] = 0;
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.CurrentValues[t] = 0;
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.ModifierLists[t] = new Map();
      return !0;
    }
    OnTick(t) {
      this.AutoRecoverAttr(t);
    }
    IsWritableAttribute(t) {
      if (
        CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) ||
        CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.has(t)
      )
        return !0;
      switch (t) {
        case CharacterAttributeTypes_1.EAttributeId.Proto_Tough:
        case CharacterAttributeTypes_1.EAttributeId.Proto_Jump:
          return !0;
        default:
          return CharacterAttributeTypes_1.specialEnergyIds.includes(t)
            ? !this.BuffComponent || this.BuffComponent.HasBuffAuthority()
            : !1;
      }
      return !1;
    }
    IsLocalAttribute(t) {
      return (
        t === CharacterAttributeTypes_1.EAttributeId.Proto_Jump ||
        (!!CharacterAttributeTypes_1.specialEnergyIds.includes(t) &&
          (!this.BuffComponent || this.BuffComponent.HasBuffAuthority()))
      );
    }
    SetBaseValue(e, r) {
      if (this.IsWritableAttribute(e)) {
        let t = r;
        var i,
          r = this.mbr(e),
          r =
            (void 0 !== r && (t = this.dbr(e, t, r)),
            CharacterAttributeTypes_1.attrsNotClampZero.includes(e) ||
              (t = Math.max(t, 0)),
            (t = Math.floor(t)),
            this.BaseValues[e]);
        r !== t &&
          ((this.BaseValues[e] = t),
          (r = this.CurrentValues[e]),
          this.UpdateCurrentValue(e),
          (i = this.CurrentValues[e]),
          this.DispatchCurrentValueEvent(e, i, r));
      }
    }
    AddBaseValue(t, e) {
      this.SetBaseValue(t, this.BaseValues[t] + e);
    }
    GetBaseValue(t) {
      return this.BaseValues[t];
    }
    GetCurrentValue(t) {
      return this.CurrentValues[t];
    }
    mbr(t) {
      t = CharacterAttributeTypes_1.attributeIdsWithMax.get(t);
      if (t) return this.GetCurrentValue(t);
    }
    SyncValueFromServer(t, e, r) {
      !this.IsLocalAttribute(t) &&
        (this.BaseValues[t] !== e && (this.BaseValues[t] = e),
        (e = this.CurrentValues[t]),
        (this.CurrentValues[t] = r),
        this.DispatchCurrentValueEvent(t, r, e),
        (r = CharacterAttributeTypes_1.attributeIdsMaxToAttrId.get(t))) &&
        this.SetBaseValue(r, this.BaseValues[r]);
    }
    UpdateCurrentValue(e) {
      if ((BaseAttributeComponent_1.s__.Start(), this.IsWritableAttribute(e))) {
        let t = this.Cbr(e);
        var r = CharacterAttributeTypes_1.attrsCurrentValueClamp.get(e),
          r;
        r && (t = Math.min(t, r)),
          CharacterAttributeTypes_1.attrsNotClampZero.includes(e) ||
            (t = Math.max(t, 0)),
          (r = this.CurrentValues[e]) !== t && (this.CurrentValues[e] = t);
      }
      BaseAttributeComponent_1.s__.Stop();
    }
    TakeSnapshot() {
      var e = new AttributeSnapshot();
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var r = CharacterAttributeTypes_1.EAttributeId[t];
        r &&
          ((e.BaseValues[r] = this.BaseValues[t] ?? 0),
          (e.CurrentValues[r] = this.CurrentValues[t] ?? 0));
      }
      return e;
    }
    AddModifier(t, e) {
      var r, i;
      return (
        BaseAttributeComponent_1.a__.Start(),
        !this.IsWritableAttribute(t) ||
        t <= CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None ||
        t >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
          ? (BaseAttributeComponent_1.a__.Stop(), -1)
          : ((r = BaseAttributeComponent_1.ModifierHandleGenerator++),
            (this.ModifierLists[t] = this.ModifierLists[t] ?? new Map()),
            this.ModifierLists[t].set(r, e),
            (e = this.CurrentValues[t]),
            this.UpdateCurrentValue(t),
            (i = this.CurrentValues[t]),
            this.DispatchCurrentValueEvent(t, i, e),
            BaseAttributeComponent_1.a__.Stop(),
            r)
      );
    }
    RemoveModifier(t, e) {
      var r;
      BaseAttributeComponent_1.h__.Start(),
        this.ModifierLists[t]?.delete(e) &&
          ((e = this.CurrentValues[t]),
          this.UpdateCurrentValue(t),
          (r = this.CurrentValues[t]),
          this.DispatchCurrentValueEvent(t, r, e)),
        BaseAttributeComponent_1.h__.Stop();
    }
    *GetAllModifiers(t) {
      if (this.ModifierLists[t])
        for (const e of this.ModifierLists[t].values()) yield e;
    }
    Cbr(t) {
      BaseAttributeComponent_1.l__.Start();
      var e = this.BaseValues[t];
      if (!this.ModifierLists[t]) return BaseAttributeComponent_1.l__.Stop(), e;
      let r = 0,
        i = 0,
        s = 1;
      var a = this.CheckIfNeedAdvanceMultiply(t);
      for (const n of this.GetAllModifiers(t)) {
        let e = 0;
        switch (n.Type) {
          case 0:
            e = n.Value1;
            break;
          case 1:
            i += n.Value1;
            break;
          case 2:
          case 4:
          case 9: {
            let t = n.SnapshotSource;
            void 0 === t &&
              (t = AbilityUtils_1.AbilityUtils.GetAttrValue(
                0 === n.SourceEntity
                  ? this
                  : ModelManager_1.ModelManager.CreatureModel.GetEntity(
                      n.SourceEntity,
                    )?.Entity?.GetComponent(171),
                n.SourceAttributeId,
                n.SourceCalculationType,
              ));
            var o = n.Min;
            if (o && (t -= o) <= 0) break;
            o = n.Ratio;
            if ((o && (t /= o), 9 === n.Type)) {
              i +=
                t * n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
              break;
            }
            e =
              t * n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
              n.Value2;
            o = n.Max;
            if ((o && e > o && (e = o), 4 === n.Type)) return e;
            break;
          }
          case 3:
            return n.Value1;
          case -1:
            s *= n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        }
        0 !== e &&
          (a
            ? (s *= e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1)
            : (r += e));
      }
      t = Math.floor(
        (e * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1) + r) * s,
      );
      return BaseAttributeComponent_1.l__.Stop(), t;
    }
    SyncRecoverPropFromServer(t, e, r, i, s) {
      var a = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t),
        o = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t);
      a && o
        ? (this.SyncValueFromServer(a, i, i),
          this.SyncValueFromServer(o, r, r),
          (a = e + i * s * CommonDefine_1.SECOND_PER_MILLIONSECOND),
          this.SyncValueFromServer(t, a, a))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 35, "自动属性未注册", ["属性", t]);
    }
    AutoRecoverAttr(t) {
      BaseAttributeComponent_1.___.Start();
      var e,
        r,
        i =
          t *
          Time_1.Time.FlowTimeDilation *
          CommonDefine_1.SECOND_PER_MILLIONSECOND;
      for ([
        e,
        r,
      ] of CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.entries()) {
        var s = this.GetCurrentValue(r);
        0 !== s && this.AddBaseValue(e, s * i);
      }
      BaseAttributeComponent_1.___.Stop();
    }
    AddBoundsLocker(t, e, r) {
      if (!this.IsWritableAttribute(t)) return -1;
      let i = this.BoundsLockerMap.get(t);
      return (
        i || this.BoundsLockerMap.set(t, (i = new Map())),
        i.has(r)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              22,
              "重复添加属性BoundsLock",
              ["attrId", t],
              ["handle", r],
            )
          : (i.set(r, e), this.SetBaseValue(t, this.BaseValues[t])),
        r
      );
    }
    RemoveBoundsLocker(t, e) {
      var r = this.BoundsLockerMap.get(t);
      return (
        !!r && !!r.delete(e) && (this.SetBaseValue(t, this.BaseValues[t]), !0)
      );
    }
    *GetAllBoundsLocker(t) {
      t = this.BoundsLockerMap.get(t);
      if (t) for (const e of t.values()) yield e;
    }
    dbr(t, e, r) {
      let i = e,
        s = void 0,
        a = r;
      for (const n of this.GetAllBoundsLocker(t)) {
        var o;
        n.LockLowerBounds &&
          ((o = n.LowerPercent * r + n.LowerOffset), (s = Math.max(s ?? o, o))),
          n.LockUpperBounds &&
            ((o = n.UpperPercent * r + n.UpperOffset),
            (a = Math.min(a ?? o, o)));
      }
      return (
        void 0 !== a && (i = Math.min(a, i)),
        (i = void 0 !== s ? Math.max(s, i) : i)
      );
    }
    AddIntervalLock(t, e, r, i, s) {
      var a;
      r !== CharacterAttributeTypes_1.EAttributeId.Proto_Life &&
        ((i = {
          LockUpperBounds: !(a = {
            LockUpperBounds: !0,
            LockLowerBounds: !1,
            UpperPercent: i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
            UpperOffset: s,
            LowerPercent: 0,
            LowerOffset: 0,
          }),
          LockLowerBounds: !0,
          UpperPercent: 1,
          UpperOffset: 0,
          LowerPercent: i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
          LowerOffset: s,
        }),
        this.AddBoundsLocker(r, 0 === t ? a : i, e));
    }
    RemoveIntervalLock(t, e, r) {
      this.RemoveBoundsLocker(r, e);
    }
    AddStateAttributeLock(t, e, r, i) {
      r = {
        LockUpperBounds: !0,
        LockLowerBounds: !0,
        UpperPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        UpperOffset: i,
        LowerPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        LowerOffset: i,
      };
      this.AddBoundsLocker(e, r, t);
    }
    RemoveStateAttributeLock(t, e) {
      this.RemoveBoundsLocker(e, t);
    }
    AddListener(t, e, r) {
      var i = this.CurrentValueListenerMap.get(t);
      i
        ? i.add(e)
        : ((i = new Set()).add(e), this.CurrentValueListenerMap.set(t, i));
    }
    AddListeners(t, e, r) {
      t.forEach((t) => {
        this.AddListener(t, e, r);
      });
    }
    RemoveListener(t, e) {
      t = this.CurrentValueListenerMap.get(t);
      return !!t && (t.delete(e), !0);
    }
    RemoveListeners(t, e) {
      t.forEach((t) => {
        this.RemoveListener(t, e);
      });
    }
    AddGeneralListener(t) {
      this.AnyCurrentValueListenerSet.add(t);
    }
    RemoveGeneralListener(t) {
      this.AnyCurrentValueListenerSet.delete(t);
    }
    DispatchCurrentValueEvent(e, r, i) {
      if ((BaseAttributeComponent_1.c__.Start(), i !== r)) {
        var s = this.CurrentValueListenerMap.get(e);
        if (s) {
          let t = BaseAttributeComponent_1.pbr.get(e);
          t ||
            BaseAttributeComponent_1.pbr.set(
              e,
              (t = Stats_1.Stat.CreateNoFlameGraph(
                `CurrentAttr#${e} event`,
                StatDefine_1.BATTLESTAT_GROUP,
              )),
            );
          for (const a of s) {
            t?.Start();
            try {
              a(e, r, i);
            } catch (t) {
              CombatLog_1.CombatLog.ErrorWithStack(
                "Attribute",
                this.Entity,
                "属性回调异常",
                t,
                ["属性", e],
              );
            }
            t?.Stop();
          }
        }
        for (const t of this.AnyCurrentValueListenerSet) {
          BaseAttributeComponent_1.vbr.Start();
          try {
            t(e, r, i);
          } catch (t) {
            CombatLog_1.CombatLog.ErrorWithStack(
              "Attribute",
              this.Entity,
              "全局属性回调异常",
              t,
              ["属性", e],
            );
          }
          BaseAttributeComponent_1.vbr.Stop();
        }
      }
      BaseAttributeComponent_1.c__.Stop();
    }
    CheckIfNeedAdvanceMultiply(t) {
      switch (t) {
        case CharacterAttributeTypes_1.EAttributeId.Proto_CdReduse:
        case CharacterAttributeTypes_1.EAttributeId.Proto_ToughChange:
        case CharacterAttributeTypes_1.EAttributeId.Proto_SkillToughRatio:
        case CharacterAttributeTypes_1.EAttributeId.vVn:
        case CharacterAttributeTypes_1.EAttributeId.Proto_AutoAttackSpeed:
        case CharacterAttributeTypes_1.EAttributeId.Proto_CastAttackSpeed:
          return !0;
        default:
          return !1;
      }
    }
    GetDebugString() {
      var e = [];
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t) {
        var r = t;
        (0 === this.BaseValues[r] && 0 === this.CurrentValues[r]) ||
          e.push(`${r} ${this.BaseValues[r]} ` + this.CurrentValues[r]);
      }
      return e.join("|");
    }
    GetLockDebugString() {
      let i = "";
      return (
        this.BoundsLockerMap.forEach((t, r) => {
          t.forEach((t, e) => {
            t.LockLowerBounds &&
              (i += `属性:${r} 下限:${100 * t.LowerPercent}%+${t.LowerOffset} handle:${e}
`),
              t.LockUpperBounds &&
                (i += `属性:${r} 上限:${100 * t.UpperPercent}%+${t.UpperOffset} handle:${e}
`);
          });
        }),
        i
      );
    }
  });
(BaseAttributeComponent.ModifierHandleGenerator = 100),
  (BaseAttributeComponent.s__ = Stats_1.Stat.Create(
    "BaseAttributeComponent.UpdateCurrentValue",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent.a__ = Stats_1.Stat.Create(
    "BaseAttributeComponent.AddModifier",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent.h__ = Stats_1.Stat.Create(
    "BaseAttributeComponent.RemoveModifier",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent.l__ = Stats_1.Stat.Create(
    "BaseAttributeComponent.EvaluateModifiers",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent.___ = Stats_1.Stat.Create(
    "BaseAttributeComponent.AutoRecoverAttr",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent.c__ = Stats_1.Stat.Create(
    "BaseAttributeComponent.DispatchCurrentValueEvent",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent.pbr = new Map()),
  (BaseAttributeComponent.vbr = Stats_1.Stat.Create(
    "AnyCurrentAttr event",
    StatDefine_1.BATTLESTAT_GROUP,
  )),
  (BaseAttributeComponent = BaseAttributeComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(170)],
      BaseAttributeComponent,
    )),
  (exports.BaseAttributeComponent = BaseAttributeComponent);
//# sourceMappingURL=BaseAttributeComponent.js.map
