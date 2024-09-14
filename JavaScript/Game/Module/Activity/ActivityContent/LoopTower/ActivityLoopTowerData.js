"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLoopTowerData = void 0);
const LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivityLoopTowerData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    return (
      -1 !== ModelManager_1.ModelManager.TowerModel.CurrentSeason &&
      ((LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason,
      ) ?? -1) < ModelManager_1.ModelManager.TowerModel.CurrentSeason ||
        ModelManager_1.ModelManager.TowerModel.CanGetReward())
    );
  }
}
exports.ActivityLoopTowerData = ActivityLoopTowerData;
//# sourceMappingURL=ActivityLoopTowerData.js.map
