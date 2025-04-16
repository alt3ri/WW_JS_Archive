"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModifyDamageElement =
    exports.DamageAmplifyOnBeHit =
    exports.DamageAmplifyOnHit =
    exports.ShieldSnapshotModify =
    exports.CommonSnapshotModify =
    exports.SnapModifier =
      void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class SnapModifier {
  static VXo(t, s, i) {
    var e = new Map(),
      r = new Map(),
      a = s.Attacker.OwnerBuffComponent.BuffEffectManager,
      h = s.Target.OwnerBuffComponent.BuffEffectManager;
    for (const [c, u, f] of [
      [e, 0, a],
      [r, 1, a],
      [e, 2, h],
      [r, 3, h],
    ]) {
      var o = f.FilterById(
        [1, 46],
        (t) => t.TargetType === u && t.NeedCheckCritical === i,
      );
      this.HXo(t, s, c, o, u);
    }
    this.jXo(e, s.AttackerSnapshot), this.jXo(r, s.TargetSnapshot);
  }
  static PreCriticalModify(t, s) {
    this.VXo(t, s, !1);
  }
  static PostCriticalModify(t, s) {
    this.VXo(t, s, !0);
  }
  static HXo(t, s, i, e, r) {
    let a = void 0;
    switch (r) {
      case 0:
      case 2:
        a = s.Target.OwnerBuffComponent;
        break;
      case 3:
      case 1:
        a = s.Attacker.OwnerBuffComponent;
    }
    for (const h of e) h.TryExecute(t, a, i, s);
  }
  static jXo(t, s) {
    for (var [i, e] of t.entries()) {
      var i = CharacterAttributeTypes_1.EAttributeId[i],
        r = s.BaseValues[i],
        e = s.CurrentValues[i] + e;
      (s.BaseValues[i] = r), (s.CurrentValues[i] = e);
    }
  }
}
exports.SnapModifier = SnapModifier;
class SnapModifyBuffEffect extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.TargetType = void 0),
      (this.NeedCheckCritical = !1);
  }
  CheckAuthority() {
    return !1;
  }
  GetAttrValue(t, s, i, e) {
    t = this.WXo(t, e);
    return t
      ? 0 === i
        ? t.GetBaseValue(s)
        : t.GetCurrentValue(s)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            61,
            "[SnapModifier] Get attributeSet failed.",
          ),
        0);
  }
  WXo(t, s) {
    switch (s) {
      case 1:
        return this.OwnerEntity?.CheckGetComponent(171);
      case 0:
        return this.InstigatorEntity?.Entity?.CheckGetComponent(171);
      case 2:
        return t.AttackerSnapshot;
      case 3:
        return t.TargetSnapshot;
      default:
        return;
    }
  }
}
class CommonSnapshotModify extends SnapModifyBuffEffect {
  constructor() {
    super(...arguments),
      (this.AttrId =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.CalculationPolicy = 0),
      (this.RefAttrId =
        CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None),
      (this.RefValueType = 0),
      (this.StackType = 0),
      (this.RefTargetType = 2),
      (this.RefParam1 = 0),
      (this.RefParam2 = 0);
  }
  InitParameters(t) {
    var s = t.ExtraEffectParameters,
      i = t.ExtraEffectGrowParameters1,
      t = t.ExtraEffectGrowParameters2,
      e = this.Level;
    (this.TargetType = Number(s[0])),
      (this.AttrId = Number(s[1])),
      (this.CalculationPolicy = Number(s[2])),
      (this.RefAttrId = Number(s[3])),
      1 === this.CalculationPolicy && (this.RefAttrId = this.AttrId),
      (this.RefTargetType = Number(s[4])),
      (this.RefValueType = Number(s[5])),
      (this.StackType = Number(s[6] ?? 0)),
      (this.RefParam1 = AbilityUtils_1.AbilityUtils.GetLevelValue(i, e, 0)),
      (this.RefParam2 = AbilityUtils_1.AbilityUtils.GetLevelValue(t, e, 0)),
      (this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(
        (t) => 6 === t.Type,
      ));
  }
  OnExecute(s, i) {
    if (void 0 === s)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          19,
          "[SnapModifier] Modify without resultMap.",
        );
    else {
      var e = this.AttrId,
        r = s.get(e) ?? 0,
        a = this.Buff?.StackCount ?? 1,
        h = 1 === this.StackType ? this.RefParam1 * a : this.RefParam1,
        o = this.RefParam2;
      let t = 0;
      switch (this.CalculationPolicy) {
        case 0:
          t = h;
          break;
        case 1:
          var c = h * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
          t =
            this.GetAttrValue(
              i,
              this.RefAttrId,
              this.RefValueType,
              this.RefTargetType,
            ) * c;
          break;
        case 2:
          c = h * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
          t =
            this.GetAttrValue(
              i,
              this.RefAttrId,
              this.RefValueType,
              this.RefTargetType,
            ) *
              c +
            o;
      }
      s.set(e, r + t);
    }
  }
}
exports.CommonSnapshotModify = CommonSnapshotModify;
class ShieldSnapshotModify extends SnapModifyBuffEffect {
  constructor() {
    super(...arguments),
      (this.BuffHolderType = void 0),
      (this.ShieldId = 0),
      (this.AttributeId = 0),
      (this.CompareFactor = 0),
      (this.ConvertThreshold = 0),
      (this.ConvertLimit = 0),
      (this.ConvertMagnitude = 0),
      (this.ConvertRatio = 0);
  }
  InitParameters(t) {
    var s = t.ExtraEffectParameters,
      i = t.ExtraEffectGrowParameters1,
      t = t.ExtraEffectGrowParameters2;
    (this.TargetType = Number(s[0])),
      (this.BuffHolderType = Number(s[1])),
      (this.ShieldId = Number(s[2])),
      (this.AttributeId = Number(s[3])),
      (this.CompareFactor = Number(s[4])),
      (this.ConvertThreshold = Number(s[5])),
      (this.ConvertLimit = Number(s[6])),
      (this.ConvertMagnitude = AbilityUtils_1.AbilityUtils.GetLevelValue(
        i,
        this.Level,
        0,
      )),
      (this.ConvertRatio = AbilityUtils_1.AbilityUtils.GetLevelValue(
        t,
        this.Level,
        0,
      )),
      (this.NeedCheckCritical = this.RequireAndLimits.Requirements.some(
        (t) => 6 === t.Type,
      ));
  }
  OnExecute(i, e) {
    var r = i.get(this.AttributeId) ?? 0,
      a = this.BuffHolderType
        ? this.InstigatorEntity?.Entity
        : this.OwnerEntity;
    if (a) {
      var h,
        a = a.CheckGetComponent(74)?.GetShieldValue(this.ShieldId) ?? 0;
      let t = a >= this.ConvertThreshold,
        s = a;
      0 < this.ConvertLimit && (s = Math.min(s, this.ConvertLimit)),
        0 < this.CompareFactor &&
          ((h = 0 === this.BuffHolderType ? 1 : 0),
          (e = this.GetAttrValue(e, this.CompareFactor, 1, h)),
          (t =
            a >=
            e *
              this.ConvertThreshold *
              CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
          0 < this.ConvertLimit) &&
          (s = Math.min(
            a,
            e *
              this.ConvertLimit *
              CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
          )),
        t &&
          ((h =
            s *
              this.ConvertRatio *
              CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
            this.ConvertMagnitude),
          i.set(this.AttributeId, r + h));
    }
  }
}
exports.ShieldSnapshotModify = ShieldSnapshotModify;
class DamageAmplifyOnHit extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.Value = -0);
  }
  InitParameters(t) {
    this.Value = AbilityUtils_1.AbilityUtils.GetLevelValue(
      t.ExtraEffectGrowParameters1,
      this.Level,
      0,
    );
  }
  OnExecute() {
    return this.Value * (this.Buff?.StackCount ?? 1);
  }
  static ApplyEffects(t, s) {
    var i = s.Attacker.OwnerBuffComponent,
      e = s.Target.OwnerBuffComponent;
    let r = 0;
    for (const a of i.BuffEffectManager.FilterById(37))
      a.Check(t, e) && (r += a.Execute());
    return r;
  }
}
(exports.DamageAmplifyOnHit = DamageAmplifyOnHit).TempModifiedResult = 0;
class DamageAmplifyOnBeHit extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.Value = -0);
  }
  InitParameters(t) {
    this.Value = AbilityUtils_1.AbilityUtils.GetLevelValue(
      t.ExtraEffectGrowParameters1,
      this.Level,
      0,
    );
  }
  OnExecute() {
    return this.Value * (this.Buff?.StackCount ?? 1);
  }
  static ApplyEffects(t, s) {
    var i = s.Attacker.OwnerBuffComponent;
    let e = 0;
    for (const r of s.Target.OwnerBuffComponent.BuffEffectManager.FilterById(
      38,
    ))
      r.Check(t, i) && (e += r.Execute());
    return e;
  }
}
(exports.DamageAmplifyOnBeHit = DamageAmplifyOnBeHit).TempModifiedResult = 0;
class ModifyDamageElement extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.TargetType = 0), (this.DamageIds = new Set());
  }
  InitParameters(t) {
    this.TargetType = Number(t.ExtraEffectParameters[0]);
    for (const s of t.ExtraEffectParameters[1].split(","))
      this.DamageIds.add(Number(s));
  }
  OnExecute() {
    return this.TargetType;
  }
  static ApplyEffects(t, s) {
    if (t)
      for (const i of t.BuffEffectManager.FilterById(63))
        if (i.DamageIds.has(s)) return i.TargetType;
  }
}
exports.ModifyDamageElement = ModifyDamageElement;
//# sourceMappingURL=ExtraEffectSnapModifier.js.map
