"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.instanceDungeonEntranceViewGetterDataMap =
    exports.instanceDetectItemGetterDataMap =
      void 0);
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController"),
  ActivitySolarSpeedController_1 = require("../../Activity/ActivityContent/SolarisSpeed/Controller/ActivitySolarSpeedController");
(exports.instanceDetectItemGetterDataMap = {
  [4]: void 0,
  7: void 0,
  8: void 0,
  9: void 0,
  10: void 0,
  11: void 0,
  15: void 0,
  19: void 0,
  20: void 0,
  12: void 0,
  21: void 0,
  22: {
    SubtitleTextIdGetter:
      ActivityMowingRiskController_1.ActivityMowingRiskController
        .GetInstanceSubtitleTextIdByInstanceId,
    SubtitleArgsGetter:
      ActivityMowingRiskController_1.ActivityMowingRiskController
        .GetInstanceSubtitleArgsByInstanceId,
    CheckFinishedGetter:
      ActivityMowingRiskController_1.ActivityMowingRiskController
        .CheckInstanceFinishedByInstanceId,
  },
  23: void 0,
  24: void 0,
  25: void 0,
  26: void 0,
  27: void 0,
  28: {
    SubtitleTextIdGetter:
      ActivitySolarSpeedController_1.ActivitySolarSpeedController
        .GetInstanceSubtitleTextIdByInstanceId,
    SubtitleArgsGetter:
      ActivitySolarSpeedController_1.ActivitySolarSpeedController
        .GetInstanceSubtitleArgsByInstanceId,
  },
  29: void 0,
  30: void 0,
  32: void 0,
  33: void 0,
  31: void 0,
  35: void 0,
  34: void 0,
}),
  (exports.instanceDungeonEntranceViewGetterDataMap = {
    [1]: void 0,
    2: void 0,
    3: void 0,
    4: void 0,
    5: void 0,
    6: void 0,
    7: void 0,
    8: void 0,
    9: void 0,
    10: void 0,
    11: void 0,
    12: {
      DefaultSelectDataGetter:
        ActivityMowingRiskController_1.ActivityMowingRiskController
          .GetEntranceViewDefaultSelectData,
    },
    13: void 0,
    14: void 0,
  });
//# sourceMappingURL=InstanceDungeonMapDefine.js.map
