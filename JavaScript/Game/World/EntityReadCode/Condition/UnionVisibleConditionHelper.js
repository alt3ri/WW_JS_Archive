"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionVisibleConditionHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbClock_1 = require("./FbClock"),
  FbCompareVar_1 = require("./FbCompareVar"),
  FbPreChildQuest_1 = require("./FbPreChildQuest"),
  FbPreQuest_1 = require("./FbPreQuest"),
  FbTimePeriod_1 = require("./FbTimePeriod"),
  FbWeather_1 = require("./FbWeather");
class UnionVisibleConditionHelper {
  static GetUnionVisibleConditionObject(e) {
    switch (e) {
      case fb_condition_1.UnionVisibleCondition.Clock:
        return new fb_condition_1.Clock();
      case fb_condition_1.UnionVisibleCondition.CompareVar:
        return new fb_condition_1.CompareVar();
      case fb_condition_1.UnionVisibleCondition.PreChildQuest:
        return new fb_condition_1.PreChildQuest();
      case fb_condition_1.UnionVisibleCondition.PreQuest:
        return new fb_condition_1.PreQuest();
      case fb_condition_1.UnionVisibleCondition.TimePeriod:
        return new fb_condition_1.TimePeriod();
      case fb_condition_1.UnionVisibleCondition.Weather:
        return new fb_condition_1.Weather();
      default:
        return;
    }
  }
  static ReadUnionVisibleCondition(e, i) {
    if (void 0 !== i)
      switch (e) {
        case fb_condition_1.UnionVisibleCondition.Clock:
          return FbClock_1.FbClock.Create(i);
        case fb_condition_1.UnionVisibleCondition.CompareVar:
          return FbCompareVar_1.FbCompareVar.Create(i);
        case fb_condition_1.UnionVisibleCondition.PreChildQuest:
          return FbPreChildQuest_1.FbPreChildQuest.Create(i);
        case fb_condition_1.UnionVisibleCondition.PreQuest:
          return FbPreQuest_1.FbPreQuest.Create(i);
        case fb_condition_1.UnionVisibleCondition.TimePeriod:
          return FbTimePeriod_1.FbTimePeriod.Create(i);
        case fb_condition_1.UnionVisibleCondition.Weather:
          return FbWeather_1.FbWeather.Create(i);
        default:
          return;
      }
  }
}
exports.UnionVisibleConditionHelper = UnionVisibleConditionHelper;
//# sourceMappingURL=UnionVisibleConditionHelper.js.map
