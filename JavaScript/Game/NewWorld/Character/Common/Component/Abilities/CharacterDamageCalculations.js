"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Calculation = exports.ENERGY_SHARE_RATE = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const AbnormalDamageConfigByLevel_1 = require("../../../../../../Core/Define/ConfigQuery/AbnormalDamageConfigByLevel");
const RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem");
const AbilityUtils_1 = require("./AbilityUtils");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const DAMAGE_CONSTANT1 = 2;
const DAMAGE_CONSTANT2 = 800;
const DAMAGE_CONSTANT3 = 8;
const DAMAGE_CONSTANT4 = 2;
const DAMAGE_CONSTANT5 = 0.8;
const DAMAGE_CONSTANT6 = 5;
const DAMAGE_CONSTANT_K = 4e4;
const DAMAGE_CONSTANT_A = 1;
const DAMAGE_CONSTANT_B = 0.8;
const DAMAGE_CONSTANT_MU = 40;
const DAMAGE_CONSTANT_SIGMA = 0.5;
const DAMAGE_CONSTANT_WEIGHT = 0.1;
const ELEMENT_CONTER_RATE = 1;
const REACTION_LIMIT_CONSTANT = 3e3;
const REACTION_EXTRACT_CONSTANT = 8;
const REACTION_LOWER_BOUND_CONSTANT = 1830;
const DAMAGE_FALLING_10000 = 1e4;
function getAttrFromSnapshots(t, e, r) {
  return r < CharacterAttributeTypes_1.EAttributeId.Proto_Lv ||
    r >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX
    ? 0
    : (e !== 0 ? t.TargetSnapshot : t.AttackerSnapshot).GetCurrentValue(r);
}
exports.ENERGY_SHARE_RATE = 3e3;
const formulas = {
  1: function (t, e, r, a, A, s, i, _, u, c, T, C, n, h, b, l, y, o, p) {
    const N = getAttrFromSnapshots.bind(this, t);
    var n = N(n, C) * (h * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) + b;
    var C =
      N(o, y) * (l * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) +
      p +
      N(T, c) * n;
    return e === 1
      ? ((h =
          t.TargetSnapshot.CurrentValues.Proto_HealedChange *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
        (b =
          t.AttackerSnapshot.CurrentValues.Proto_HealChange *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
        Math.max(C * (1 + h + b), 0))
      : ((o = Calculation.CalculateHurt(
          t,
          r.Element,
          r.Type,
          r.RelatedProperty,
          AbilityUtils_1.AbilityUtils.GetLevelValue(r.RateLv, a, 0),
          A,
          s,
          i,
          C,
        )),
        Math.max(o, 0));
  },
  2: function (t, e, r, a, A, s, i, _, u, c, T, C, n) {
    T =
      getAttrFromSnapshots.bind(this, t)(T, c) *
        (C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) +
      n;
    return e === 1
      ? -Math.min(t.TargetSnapshot.CurrentValues.Proto_Life - T, 0)
      : Math.max(t.TargetSnapshot.CurrentValues.Proto_Life - T, 0);
  },
  3: function (t, e, r, a, A, s, i, _, u, c, T, C, n) {
    return (
      getAttrFromSnapshots.bind(this, t)(T, c) *
        (C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) +
      n
    );
  },
  4: function (t, e, r, a, A, s, i, _, u, c, T, C, n, h) {
    t =
      getAttrFromSnapshots.bind(this, t)(T, c) *
        (C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) +
      n;
    return Math.min(
      t,
      _ * (h * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
    );
  },
  5: function (t, e, r, a, A, s, i, _, u, c, T) {
    return (
      (t.TargetSnapshot.CurrentValues.Tkn *
        (c * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND)) /
        u +
      T
    );
  },
  6: function (t, e, r, a, A, s, i, _, u, c, T, C, n, h, b) {
    (t = getAttrFromSnapshots.bind(this, t)),
      (T =
        t(T, c) * (C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) +
        t(h, n) * (b * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND));
    return Math.max(T, 0);
  },
  7: function (t, e, r, a, A, s, i, _, u, c, T, C, n, h, b) {
    (T =
      getAttrFromSnapshots.bind(this, t)(T, c) *
        (C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) +
      n),
      (c =
        t.TargetSnapshot.CurrentValues.Proto_Life -
        (t.TargetSnapshot.CurrentValues.Tkn *
          h *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
          b));
    return Math.max(0, Math.min(T, c));
  },
  1001: function (t, e, r, a, A, s, i, _, u, c, T, C, n, h, b) {
    var r = r.Element;
    const l = t.AttackerSnapshot;
    var t = t.TargetSnapshot;
    const y = l.CurrentValues.Proto_Lv;
    let o = 0;
    switch (r) {
      case 1:
        o =
          AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(
            y,
          )?.Abnormal1003 ?? 0;
        break;
      case 2:
        o =
          AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(
            y,
          )?.Abnormal1004 ?? 0;
        break;
      case 3:
        o =
          AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(
            y,
          )?.Abnormal1002 ?? 0;
        break;
      case 4:
        o =
          AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(
            y,
          )?.Abnormal1001 ?? 0;
        break;
      case 5:
        o =
          AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(
            y,
          )?.Abnormal1005 ?? 0;
        break;
      case 6:
        o =
          AbnormalDamageConfigByLevel_1.configAbnormalDamageConfigByLevel.GetConfig(
            y,
          )?.Abnormal1006 ?? 0;
    }
    var c = c * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const p = Math.min(Calculation.GetElementDamageReduce(t, r), 1);
    let N = Calculation.GetElementResistant(t, r);
    var r = Calculation.GetElementIgnoreResistance(l, r);
    let E = 0;
    E =
      N - r <= 0
        ? 1 - (N - r) / DAMAGE_CONSTANT4
        : N - r < DAMAGE_CONSTANT5
          ? 1 - (N - r)
          : 1 / (1 + (N - r) * DAMAGE_CONSTANT6);
    (N = t.CurrentValues.Proto_Def),
      (r =
        l.CurrentValues.Proto_IgnoreDefRate *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (N = Math.min(
        DAMAGE_CONSTANT1,
        1 / ((N * (1 - r)) / (DAMAGE_CONSTANT2 + y * DAMAGE_CONSTANT3) + 1),
      )),
      (r = Math.min(
        t.CurrentValues.Proto_DamageReduce *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        1,
      )),
      (t = Math.max(
        l.CurrentValues.Proto_SpecialDamageChange *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        -1,
      ));
    return o * c * N * E * (1 - r) * (1 - p) * (1 + t);
  },
};
class Calculation {
  static CalculateHurt(t, e, r, a, A, s, i, _, u = 0) {
    const c = t.AttackerSnapshot;
    let T = t.TargetSnapshot;
    var A = A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    let C = this.GetElementDamageBonus(c, e);
    const n = Math.min(this.GetElementDamageReduce(T, e), 1);
    let h = this.GetElementResistant(T, e);
    let b = this.GetElementIgnoreResistance(c, e);
    let l = 0;
    l =
      h - b <= 0
        ? 1 - (h - b) / DAMAGE_CONSTANT4
        : h - b < DAMAGE_CONSTANT5
          ? 1 - (h - b)
          : 1 / (1 + (h - b) * DAMAGE_CONSTANT6);
    (h = this.GetAttackTypeDamageBonus(c, r)),
      (b = getAttrFromSnapshots(t, 0, a)),
      (r = T.CurrentValues.Proto_Def),
      (t =
        c.CurrentValues.Proto_IgnoreDefRate *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (a = c.CurrentValues.Proto_Lv),
      (r = Math.min(
        DAMAGE_CONSTANT1,
        1 / ((r * (1 - t)) / (DAMAGE_CONSTANT2 + a * DAMAGE_CONSTANT3) + 1),
      )),
      (t =
        1 +
        c.CurrentValues.Proto_DamageChange *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND +
        C +
        h),
      (a = T.CurrentValues.Proto_ElementPropertyType),
      (C = Math.min(
        T.CurrentValues.Proto_DamageReduce *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        1,
      )),
      (h =
        1 +
        c.CurrentValues.Proto_SpecialDamageChange *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (T = Calculation.CalculateElementMatchUpRate(e, a)),
      (e =
        c.CurrentValues.Proto_CritDamage *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      (a =
        (A * b + i + u) *
        (s ? e : 1) *
        r *
        t *
        l *
        (1 - C) *
        (1 - n) *
        h *
        T *
        Math.max(1 + _ * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, 0));
    return Math.max(0, a);
  }
  static GetElementResistant(t, e) {
    switch (e) {
      case 0:
        return (
          t.CurrentValues.Proto_DamageResistancePhys *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 1:
        return (
          t.CurrentValues.Proto_DamageResistanceElement1 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 2:
        return (
          t.CurrentValues.Proto_DamageResistanceElement2 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 3:
        return (
          t.CurrentValues.Proto_DamageResistanceElement3 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 4:
        return (
          t.CurrentValues.Proto_DamageResistanceElement4 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 5:
        return (
          t.CurrentValues.Proto_DamageResistanceElement5 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 6:
        return (
          t.CurrentValues.Proto_DamageResistanceElement6 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      default:
        return 0;
    }
    return 0;
  }
  static GetElementIgnoreResistance(t, e) {
    switch (e) {
      case 0:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistancePhys *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 1:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistanceElement1 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 2:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistanceElement2 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 3:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistanceElement3 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 4:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistanceElement4 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 5:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistanceElement5 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 6:
        return (
          t.CurrentValues.Proto_IgnoreDamageResistanceElement6 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      default:
        return 0;
    }
    return 0;
  }
  static GetElementDamageReduce(t, e) {
    switch (e) {
      case 0:
        return (
          t.CurrentValues.Proto_DamageReducePhys *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 1:
        return (
          t.CurrentValues.Proto_DamageReduceElement1 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 2:
        return (
          t.CurrentValues.Proto_DamageReduceElement2 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 3:
        return (
          t.CurrentValues.Proto_DamageReduceElement3 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 4:
        return (
          t.CurrentValues.Proto_DamageReduceElement4 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 5:
        return (
          t.CurrentValues.Proto_DamageReduceElement5 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 6:
        return (
          t.CurrentValues.Proto_DamageReduceElement6 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      default:
        return 0;
    }
    return 0;
  }
  static GetElementDamageBonus(t, e) {
    switch (e) {
      case 0:
        return (
          t.CurrentValues.Proto_DamageChangePhys *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 1:
        return (
          t.CurrentValues.Proto_DamageChangeElement1 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 2:
        return (
          t.CurrentValues.Proto_DamageChangeElement2 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 3:
        return (
          t.CurrentValues.Proto_DamageChangeElement3 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 4:
        return (
          t.CurrentValues.Proto_DamageChangeElement4 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 5:
        return (
          t.CurrentValues.Proto_DamageChangeElement5 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 6:
        return (
          t.CurrentValues.Proto_DamageChangeElement6 *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      default:
        return 0;
    }
    return 0;
  }
  static GetAttackTypeDamageBonus(t, e) {
    switch (e) {
      case 0:
        return (
          t.CurrentValues.Proto_DamageChangeAuto *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 1:
        return (
          t.CurrentValues.Proto_DamageChangeCast *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 2:
        return (
          t.CurrentValues.Proto_DamageChangeUltra *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 3:
        return (
          t.CurrentValues.Proto_DamageChangeQte *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 4:
        return (
          t.CurrentValues.Proto_DamageChangeNormalSkill *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
      case 5:
        return (
          t.CurrentValues.Proto_DamageChangePhantom *
          CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND
        );
    }
    return 0;
  }
  static LKo(t, e, r, a) {
    var r = getAttrFromSnapshots(t, 0, r);
    var a = a * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const A =
      t.TargetSnapshot.CurrentValues.Proto_HealedChange *
      CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var t =
      t.AttackerSnapshot.CurrentValues.Proto_HealChange *
      CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    return Math.max(0, (a * r + e) * (A + t + 1));
  }
  static ToughCalculation(t, e, r) {
    return (
      r *
      (t.CurrentValues.Proto_ToughChange *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) *
      (e.CurrentValues.Proto_ToughReduce *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND) *
      (e.CurrentValues.Proto_SkillToughRatio *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND)
    );
  }
  static LandingDamageCalculationRole(t, e, r, a) {
    const A = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "landing_damage_args_role",
    );
    var s = t / A[0] - 1;
    var s = s > 0 ? s : 0;
    var i = A[2] / DAMAGE_FALLING_10000;
    var _ = A[3] / DAMAGE_FALLING_10000;
    var i = Math.pow(r, i) * _;
    var _ = s + i;
    const u = Math.floor(_ * a);
    return u > 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            29,
            "角色跌落伤害",
            ["上一帧速度", t],
            ["这一帧速度", e],
            ["damage", u],
            ["time", r],
            ["lifeMax", a],
            ["landing_damage_args_role", A],
            ["rateBase", s],
            ["rateT", i],
            ["rate", _],
          ),
        u)
      : 0;
  }
  static LandingDamageCalculationMonster(t, e) {
    let r;
    const a = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "landing_damage_args_monster",
    );
    return t < a[0]
      ? 0
      : ((r = Math.floor(
          (Math.pow(t, a[1] / DAMAGE_FALLING_10000) *
            (a[3] / DAMAGE_FALLING_10000) *
            e) /
            a[2],
        )),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            29,
            "怪物跌落伤害",
            ["height", t],
            ["landing_damage_args_monster", a],
            ["damage", r],
            ["lifeMax", e],
          ),
        r);
  }
  static ReactionDamageRateCalculation(t, e, r, a, A, s, i) {
    s =
      2 -
      REACTION_LIMIT_CONSTANT /
        (s * REACTION_EXTRACT_CONSTANT + REACTION_LOWER_BOUND_CONSTANT);
    let _ = 0;
    switch (a) {
      case 0:
        _ = t.CurrentValues.Proto_DamageChangePhys;
        break;
      case 1:
        _ = t.CurrentValues.Proto_DamageChangeElement1;
        break;
      case 2:
        _ = t.CurrentValues.Proto_DamageChangeElement2;
        break;
      case 3:
        _ = t.CurrentValues.Proto_DamageChangeElement3;
        break;
      case 4:
        _ = t.CurrentValues.Proto_DamageChangeElement4;
        break;
      case 5:
        _ = t.CurrentValues.Proto_DamageChangeElement5;
        break;
      case 6:
        _ = t.CurrentValues.Proto_DamageChangeElement6;
    }
    _ *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var a =
      t.CurrentValues.Proto_CritDamage *
      CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var i = i ? a : 1;
    var a = A.A * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const u = A.B * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const c = A.C * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const T = A.D * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const C = A.E * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const n = A.F * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    var A = A.G * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    const h = t.CurrentValues.Proto_Lv;
    const b = t.CurrentValues.Proto_Atk;
    var e = e.CurrentValues.Proto_Lv;
    const l =
      DAMAGE_CONSTANT_WEIGHT /
      (1 / DAMAGE_CONSTANT_K +
        DAMAGE_CONSTANT_A *
          Math.pow(
            DAMAGE_CONSTANT_B,
            (h + DAMAGE_CONSTANT_MU) * DAMAGE_CONSTANT_SIGMA,
          ));
    var r =
      r *
      CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND *
      (1 + s * a + u * h + C) *
      i *
      (1 + b * c) *
      (1 + _ * T) *
      (1 / (1 + e / (n + h * A))) *
      l;
    return Math.ceil(r);
  }
  static CalculateElementMatchUpRate(t, e) {
    switch (t) {
      case 0:
        return 1;
      case 1:
        return e === 4 ? ELEMENT_CONTER_RATE : 1;
      case 2:
        return e === 1 ? ELEMENT_CONTER_RATE : 1;
      case 3:
        return e === 2 ? ELEMENT_CONTER_RATE : 1;
      case 4:
        return e === 3 ? ELEMENT_CONTER_RATE : 1;
      case 5:
        return e === 6 ? ELEMENT_CONTER_RATE : 1;
      case 6:
        return e === 5 ? ELEMENT_CONTER_RATE : 1;
      default:
        return 1;
    }
    return 1;
  }
  static CalculateFormula(t, e, r, a, A, s, i, _, u) {
    let c = r.FormulaType;
    const T = r.CalculateType;
    let C = 0;
    if (c) {
      if (!(c in formulas))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "unexpected formula type",
              ["damageId", r.Id],
              ["formula type", c],
            ),
          0
        );
      C = formulas[c](
        e,
        T,
        r,
        a,
        A,
        i,
        t.Accumulation,
        u,
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam1, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam2, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam3, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam4, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam5, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam6, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam7, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam8, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam9, a, 0),
        AbilityUtils_1.AbilityUtils.GetLevelValue(r.FormulaParam10, a, 0),
      );
    } else {
      (c = r.RelatedProperty),
        (u = AbilityUtils_1.AbilityUtils.GetLevelValue(r.RateLv, a, 0));
      C =
        T === 0
          ? this.CalculateHurt(e, r.Element, r.Type, c, u, A, i, _)
          : ((A = AbilityUtils_1.AbilityUtils.GetLevelValue(
              r.CureBaseValue,
              a,
              0,
            )),
            this.LKo(e, A, c, u));
    }
    (i = t.RandomSeed),
      (t.RandomSeed = RandomSystem_1.default.GetNextRandomSeed(i, 1)),
      (_ = AbilityUtils_1.AbilityUtils.GetLevelValue(
        r.FluctuationUpper,
        a,
        CharacterAttributeTypes_1.PER_TEN_THOUSAND,
      )),
      (e = AbilityUtils_1.AbilityUtils.GetLevelValue(
        r.FluctuationLower,
        a,
        CharacterAttributeTypes_1.PER_TEN_THOUSAND,
      )),
      (A =
        ((_ - e) * (i % CharacterAttributeTypes_1.PER_TEN_THOUSAND) + e) *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
    return (C = Math.ceil(C * s * A)), (C = T === 1 ? -C : C);
  }
}
exports.Calculation = Calculation;
// # sourceMappingURL=CharacterDamageCalculations.js.map
