"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffExtraEffectLibrary = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeIntervalCheck_1 = require("../CharacterAttributeIntervalCheck"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffectBaseTypes"),
  ADD_BULLET_MIN_INTERVAL = 0.5;
class BuffExtraEffectLibrary {
  static ResolveRequireAndLimits(e, r, a) {
    var t,
      i,
      s = new ExtraEffectBaseTypes_1.RequireAndLimits();
    s.CheckType = r.ExtraEffectRequirementSetting;
    for ([t, i] of r.ExtraEffectRequirement.entries()) {
      var u = r.ExtraEffectRequirementPara[t].split("#");
      switch (i) {
        case 3:
          var [T, b, l, y, p] = u;
          s.Requirements.push({
            Type: i,
            RequireTargetType: T === StringUtils_1.ZERO_STRING ? 0 : 1,
            RequireInterval:
              new CharacterAttributeIntervalCheck_1.AttributeIntervalCheck(
                Number(b),
                Number(y),
                Number(p),
                1 === Number(l),
              ),
          });
          break;
        case 6:
          s.Requirements.push({
            Type: i,
            IsCritical: u[0] === StringUtils_1.ONE_STRING,
          });
          break;
        case 9:
          s.Requirements.push({
            Type: i,
            RequireTargetType: Number(u[0]),
            IsExist: u[1] === StringUtils_1.ONE_STRING,
            RequireTagContainer: (u?.slice(2) ?? [])
              .map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
              .filter((e) => void 0 !== e),
          });
          break;
        case 10:
          s.Requirements.push({
            Type: i,
            RequirePartTags: (u ?? [])
              .map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
              .filter((e) => void 0 !== e),
          });
          break;
        case 11:
          s.Requirements.push({
            Type: i,
            RequireBulletTags: (u ?? [])
              .map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
              .filter((e) => void 0 !== e),
          });
          break;
        case 13:
          s.Requirements.push({
            Type: i,
            RequireTargetType: Number(u[0]),
            MonsterGenres: u.slice(1).map((e) => Number(e)),
          });
          break;
        case 1:
          s.Requirements.push({ Type: i, SkillIds: u.map((e) => BigInt(e)) });
          break;
        case 2:
          s.Requirements.push({
            Type: i,
            SkillGenres: u.map((e) => Number(e)),
          });
          break;
        case 4:
          s.Requirements.push({ Type: i, SmashTypes: u.map((e) => Number(e)) });
          break;
        case 5:
          s.Requirements.push({ Type: i, BulletIds: u.map((e) => BigInt(e)) });
          break;
        case 7:
          s.Requirements.push({
            Type: i,
            ElementTypes: u.map((e) => Number(e)),
          });
          break;
        case 8:
          s.Requirements.push({
            Type: i,
            WeaponTypes: u.map((e) => Number(e)),
          });
          break;
        case 12:
          s.Requirements.push({
            Type: i,
            DamageTypes: u.map((e) => Number(e)),
          });
          break;
        case 17:
          s.Requirements.push({
            Type: i,
            IncludeType: Number(u[0]),
            DamageSubTypes: u.slice(1).map((e) => Number(e)),
          });
          break;
        case 14:
          s.Requirements.push({
            Type: i,
            BuffId: BigInt(u[0]),
            RequireTargetType: Number(u[1]),
            MinStack: Number(u[2]),
            MaxStack: Number(u[3]),
          });
          break;
        case 15:
          s.Requirements.push({
            Type: i,
            RequireTargetType: Number(u[0]),
            SummonType: Number(u[1]),
            SummonIndex: Number(u[2]),
            IsExist: u[3] === StringUtils_1.ONE_STRING,
            RequireTagContainer: (u?.slice(4) ?? [])
              .map((e) => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
              .filter((e) => void 0 !== e),
          });
          break;
        case 16:
          s.Requirements.push({
            Type: i,
            CalculationTypes: u.map((e) => Number(e)),
          });
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              20,
              "未知的ExtraEffect条件类型",
              ["requireType", i],
              ["buffId", e],
            );
      }
    }
    var c = s.Limits;
    return (
      (c.ExtraEffectCd = AbilityUtils_1.AbilityUtils.GetLevelValue(
        r.ExtraEffectCd,
        a,
        -1,
      )),
      3 === r.ExtraEffectId &&
        (c.ExtraEffectCd = Math.max(c.ExtraEffectCd, ADD_BULLET_MIN_INTERVAL)),
      (c.ExtraEffectRemoveStackNum = r.ExtraEffectRemoveStackNum),
      (c.ExtraEffectProbability = AbilityUtils_1.AbilityUtils.GetLevelValue(
        r.ExtraEffectProbability,
        a,
        CharacterAttributeTypes_1.PER_TEN_THOUSAND,
      )),
      s
    );
  }
}
exports.BuffExtraEffectLibrary = BuffExtraEffectLibrary;
//# sourceMappingURL=ExtraEffectLibrary.js.map
