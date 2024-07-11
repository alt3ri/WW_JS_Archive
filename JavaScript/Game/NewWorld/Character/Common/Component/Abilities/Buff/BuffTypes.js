"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffDefinition = void 0);
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
class BuffDefinition {
  constructor() {
    (this.Id = void 0),
      (this.Desc = ""),
      (this.FormationPolicy = 0),
      (this.Probability = CharacterAttributeTypes_1.PER_TEN_THOUSAND),
      (this.PrematureExpirationEffects = void 0),
      (this.RoutineExpirationEffects = void 0),
      (this.OverflowEffects = void 0),
      (this.Modifiers = []),
      (this.StackLimitCount = 1),
      (this.StackingType = 0),
      (this.DefaultStackCount = 1),
      (this.StackAppendCount = 0),
      (this.DenyOverflowAdd = !1),
      (this.ClearStackOnOverflow = !1),
      (this.DurationPolicy = 0),
      (this.DurationMagnitude = void 0),
      (this.DurationMagnitude2 = void 0),
      (this.DurationCalculationPolicy = void 0),
      (this.GameplayCueIds = void 0),
      (this.Period = 0),
      (this.ExecutePeriodicOnAdd = !1),
      (this.PeriodicInhibitionPolicy = 0),
      (this.StackDurationRefreshPolicy = 1),
      (this.StackPeriodResetPolicy = 1),
      (this.StackExpirationRemoveNumber = 0),
      (this.DurationAffectedByBulletTime = !1),
      (this.RemoveBuffWithTags = void 0),
      (this.GrantedTags = void 0),
      (this.AddInstigatorTagRequirements = void 0),
      (this.AddInstigatorTagIgnores = void 0),
      (this.AddTagRequirements = void 0),
      (this.AddTagIgnores = void 0),
      (this.ActivateTagRequirements = void 0),
      (this.ActivateTagIgnores = void 0),
      (this.RemoveTagExistAll = void 0),
      (this.RemoveTagIgnores = void 0),
      (this.ImmuneTags = void 0),
      (this.ImmuneTagIgnores = void 0),
      (this.RemoveTagExistAny = void 0),
      (this.BuffAction = void 0),
      (this.HasBuffEffect = !1),
      (this.HasBuffPeriodExecution = !1),
      (this.EffectInfos = []);
  }
}
exports.BuffDefinition = BuffDefinition;
//# sourceMappingURL=BuffTypes.js.map
