"use strict";
let BaseAttributeComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, i) {
    let s;
    const a = arguments.length;
    let o =
      a < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, r)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, e, r, i);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (s = t[n]) && (o = (a < 3 ? s(o) : a > 3 ? s(e, r, o) : s(e, r)) || o);
    return a > 3 && o && Object.defineProperty(e, r, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseAttributeComponent = exports.AttributeSnapshot = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const StatDefine_1 = require("../../../../../Common/StatDefine");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
const AbilityUtils_1 = require("./AbilityUtils");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
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
        (this.BaseValues = new Array()),
        (this.CurrentValues = new Array()),
        (this.ModifierLists = new Array()),
        (this.BoundsLockerMap = new Map()),
        (this.BaseValueListenerMap = new Map()),
        (this.CurrentValueListenerMap = new Map()),
        (this.AnyBaseValueListenerSet = new Set()),
        (this.AnyCurrentValueListenerSet = new Set());
    }
    OnCreate() {
      this.BaseValues = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.BaseValues[t] = 0;
      this.CurrentValues = new Array(
        CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX,
      );
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.CurrentValues[t] = 0;
      this.ModifierLists = new Array(
        CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX,
      );
      for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t)
        this.ModifierLists[t] = new Map();
      return !0;
    }
    OnTick(t) {
      this.AutoRecoverAttr(t);
    }
    SetBaseValue(t, e) {
      let r = e;
      let i;
      let s;
      var e = this.Gbr(t);
      var e =
        (void 0 !== e && (r = this.Nbr(t, r, e)),
        CharacterAttributeTypes_1.attrsNotClampZero.includes(t) ||
          (r = Math.max(r, 0)),
        (r = Math.floor(r)),
        this.BaseValues[t]);
      e !== r &&
        ((this.BaseValues[t] = r),
        (i = this.CurrentValues[t]),
        this.UpdateCurrentValue(t),
        (s = this.CurrentValues[t]),
        this.DispatchBaseValueEvent(t, r, e),
        this.DispatchCurrentValueEvent(t, s, i));
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
    Gbr(t) {
      let e = CharacterAttributeTypes_1.attrsBaseValueClamp.get(t);
      return (
        e ||
        ((e = CharacterAttributeTypes_1.attrsBaseValueClampMax.get(t))
          ? this.GetCurrentValue(e)
          : void 0)
      );
    }
    InitValueFromServer(t, e, r) {
      (this.BaseValues[t] = e), (this.CurrentValues[t] = r);
    }
    SyncValueFromServer(t, e, r) {
      const i = this.BaseValues[t];
      const s = (i !== e && (this.BaseValues[t] = e), this.CurrentValues[t]);
      (this.CurrentValues[t] = r),
        this.DispatchBaseValueEvent(t, e, i),
        this.DispatchCurrentValueEvent(t, r, s);
    }
    UpdateCurrentValue(t) {
      let e = this.Obr(t);
      var r = CharacterAttributeTypes_1.attrsCurrentValueClamp.get(t);
      var r =
        (r && (e = Math.min(e, r)),
        CharacterAttributeTypes_1.attrsNotClampZero.includes(t) ||
          (e = Math.max(e, 0)),
        this.CurrentValues[t]);
      r !== e && (this.CurrentValues[t] = e);
    }
    TakeSnapshot() {
      const e = new AttributeSnapshot();
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        const r = CharacterAttributeTypes_1.EAttributeId[t];
        r &&
          ((e.BaseValues[r] = this.BaseValues[t] ?? 0),
          (e.CurrentValues[r] = this.CurrentValues[t] ?? 0));
      }
      return e;
    }
    AddModifier(t, e) {
      let r, i;
      return t <=
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None ||
        t >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
        ? -1
        : ((r = BaseAttributeComponent_1.ModifierHandleGenerator++),
          (this.ModifierLists[t] = this.ModifierLists[t] ?? new Map()),
          this.ModifierLists[t].set(r, e),
          (e = this.CurrentValues[t]),
          this.UpdateCurrentValue(t),
          (i = this.CurrentValues[t]),
          this.DispatchCurrentValueEvent(t, i, e),
          r);
    }
    RemoveModifier(t, e) {
      let r;
      this.ModifierLists[t]?.delete(e) &&
        ((e = this.CurrentValues[t]),
        this.UpdateCurrentValue(t),
        (r = this.CurrentValues[t]),
        this.DispatchCurrentValueEvent(t, r, e));
    }
    *GetAllModifiers(t) {
      if (this.ModifierLists[t])
        for (const e of this.ModifierLists[t].values()) yield e;
    }
    Obr(t) {
      const e = this.BaseValues[t];
      if (!this.ModifierLists[t]) return e;
      let r = 0;
      let i = 0;
      let s = 1;
      const a = this.CheckIfNeedAdvanceMultiply(t);
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
          case 4: {
            let t = n.SnapshotSource;
            void 0 === t &&
              (t = AbilityUtils_1.AbilityUtils.GetAttrValue(
                n.SourceEntity === 0
                  ? this
                  : ModelManager_1.ModelManager.CreatureModel.GetEntity(
                      n.SourceEntity,
                    )?.Entity?.GetComponent(156),
                n.SourceAttributeId,
                n.SourceCalculationType,
              ));
            let o = n.Min;
            if (o && (t -= o) <= 0) break;
            (o = n.Ratio),
              (o =
                (o && (t /= o),
                (e =
                  t *
                    n.Value1 *
                    CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
                  n.Value2),
                n.Max));
            if ((o && e > o && (e = o), n.Type === 4)) return e;
            break;
          }
          case 3:
            return n.Value1;
          case 9:
            s *= n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
        }
        e !== 0 &&
          (a
            ? (s *= e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1)
            : (r += e));
      }
      return Math.floor(
        (e * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1) + r) * s,
      );
    }
    SyncRecoverPropFromServer(t, e, r, i, s) {
      let a = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t);
      const o = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t);
      a && o
        ? (this.SyncValueFromServer(a, i, i),
          this.SyncValueFromServer(o, r, r),
          (a = e + i * s * CommonDefine_1.SECOND_PER_MILLIONSECOND),
          this.SyncValueFromServer(t, a, a))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 36, "自动属性未注册", ["属性", t]);
    }
    AutoRecoverAttr(t) {
      for (let [
        e,
        r,
      ] of CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.entries()) {
        r = this.GetCurrentValue(r);
        r !== 0 &&
          this.AddBaseValue(e, r * t * CommonDefine_1.SECOND_PER_MILLIONSECOND);
      }
    }
    AddBoundsLocker(t, e, r) {
      let i = this.BoundsLockerMap.get(t);
      return (
        i || this.BoundsLockerMap.set(t, (i = new Map())),
        i.has(r)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              23,
              "重复添加属性BoundsLock",
              ["attrId", t],
              ["handle", r],
            )
          : (i.set(r, e), this.SetBaseValue(t, this.BaseValues[t])),
        r
      );
    }
    RemoveBoundsLocker(t, e) {
      const r = this.BoundsLockerMap.get(t);
      return (
        !!r && !!r.delete(e) && (this.SetBaseValue(t, this.BaseValues[t]), !0)
      );
    }
    *GetAllBoundsLocker(t) {
      t = this.BoundsLockerMap.get(t);
      if (t) for (const e of t.values()) yield e;
    }
    Nbr(t, e, r) {
      let i = e;
      let s = void 0;
      let a = r;
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
      let a;
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
        this.AddBoundsLocker(r, t === 0 ? a : i, e));
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
      let i = this.CurrentValueListenerMap.get(t);
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
    DispatchBaseValueEvent(e, t, r) {
      if (r !== t) {
        const i = this.BaseValueListenerMap.get(e);
        if (i) {
          BaseAttributeComponent_1.kbr.get(e) ||
            BaseAttributeComponent_1.kbr.set(e, void 0);
          for (const s of i)
            try {
              s(e, t, r);
            } catch (t) {
              CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
                "Attribute",
                this.Entity,
                "属性回调异常",
                t,
                ["属性", e],
              );
            }
        }
        for (const a of this.AnyBaseValueListenerSet)
          try {
            a(e, t, r);
          } catch (t) {
            CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Attribute",
              this.Entity,
              "全局属性回调异常",
              t,
              ["属性", e],
            );
          }
      }
    }
    DispatchCurrentValueEvent(e, t, r) {
      if (r !== t) {
        const i = this.CurrentValueListenerMap.get(e);
        if (i) {
          BaseAttributeComponent_1.Vbr.get(e) ||
            BaseAttributeComponent_1.Vbr.set(e, void 0);
          for (const s of i)
            try {
              s(e, t, r);
            } catch (t) {
              CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
                "Attribute",
                this.Entity,
                "属性回调异常",
                t,
                ["属性", e],
              );
            }
        }
        for (const a of this.AnyCurrentValueListenerSet)
          try {
            a(e, t, r);
          } catch (t) {
            CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
              "Attribute",
              this.Entity,
              "全局属性回调异常",
              t,
              ["属性", e],
            );
          }
      }
    }
    CheckIfNeedAdvanceMultiply(t) {
      switch (t) {
        case CharacterAttributeTypes_1.EAttributeId.Proto_CdReduse:
        case CharacterAttributeTypes_1.EAttributeId.Proto_ToughChange:
        case CharacterAttributeTypes_1.EAttributeId.Proto_SkillToughRatio:
        case CharacterAttributeTypes_1.EAttributeId.R4n:
        case CharacterAttributeTypes_1.EAttributeId.Proto_AutoAttackSpeed:
        case CharacterAttributeTypes_1.EAttributeId.Proto_CastAttackSpeed:
          return !0;
        default:
          return !1;
      }
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
  (BaseAttributeComponent.kbr = new Map()),
  (BaseAttributeComponent.Fbr = void 0),
  (BaseAttributeComponent.Vbr = new Map()),
  (BaseAttributeComponent.Hbr = void 0),
  (BaseAttributeComponent = BaseAttributeComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(155)],
      BaseAttributeComponent,
    )),
  (exports.BaseAttributeComponent = BaseAttributeComponent);
// # sourceMappingURL=BaseAttributeComponent.js.map
