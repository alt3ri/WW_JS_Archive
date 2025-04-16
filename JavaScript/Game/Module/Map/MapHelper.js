"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapHelper = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  MapUtil_1 = require("./MapUtil");
class MapHelper {
  static CheckAndShowCrossMapTips(e, r, i, a) {
    (e = ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(e, r)),
      (r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    if (MapUtil_1.MapUtil.IsDungeonDiffWorld(e, r)) {
      if (void 0 !== i && 0 < i) {
        r = this.GetLevelOneAreaNameLocalTextId(i);
        if (!StringUtils_1.StringUtils.IsBlank(r))
          return (
            (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r)),
            void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "CrossMapMainTips",
              i,
            )
          );
      }
      r = MapUtil_1.MapUtil.GetMapNameByInstanceId(e, a);
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
        "CrossMapMainTips",
        r,
      );
    }
  }
  static GetLevelOneAreaNameLocalTextId(e) {
    var r = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e),
      r = 0 !== r ? r : e;
    return ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r)?.Title ?? "";
  }
  static GetDoubleRestAndMaxTimes(e) {
    if (1 === e.MarkConfig.RelativeSubType) {
      var i =
          ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
            [3],
            !1,
          ),
        a = void 0 !== i;
      let e = 0,
        r = 0;
      if ((i && ((i = i.GetNumTxtAndParam()), (e = i[1]), (r = i[2])), a))
        return [
          a,
          e,
          r,
          0 < e ? "Reward_doubling_time" : "Reward_doubling_end",
          0 < e ? "Reward_doubling_tips" : "Reward_doubling_end_tips",
        ];
    }
    i =
      0 !== (i = e.MarkConfig.RelativeId)
        ? i
        : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
            e.MarkConfigId,
          );
    return ModelManager_1.ModelManager.ActivityRegressModel.DungeonHasDoubleDropTimes(
      i,
      21,
    ) ||
      ModelManager_1.ModelManager.ActivityRegressModel.LevelPlayHasDoubleDropTimes(
        i,
        21,
      )
      ? ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(
          21,
        )
      : ModelManager_1.ModelManager.ActivityRegressModel.DungeonHasDoubleDropTimes(
            i,
            7,
          ) ||
          ModelManager_1.ModelManager.ActivityRegressModel.LevelPlayHasDoubleDropTimes(
            i,
            7,
          )
        ? ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(
            7,
          )
        : [!1, 0, 0, "", ""];
  }
}
exports.MapHelper = MapHelper;
//# sourceMappingURL=MapHelper.js.map
