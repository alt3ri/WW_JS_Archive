"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityShipTowerData = void 0);
const LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData");
class ActivityShipTowerData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.CurSeason;
    return (
      !(e <= 0) &&
      ((LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerSeason,
      ) ?? 0) < e ||
        ModelManager_1.ModelManager.ShipTowerModel.IsCanReceiveAward())
    );
  }
}
exports.ActivityShipTowerData = ActivityShipTowerData;
//# sourceMappingURL=ActivityShipTowerData.js.map
