"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourMarkItem = void 0);
const ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class ParkourMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    var e = ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(
      this.MarkId,
    );
    return (
      void 0 !== e &&
      (ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        e.Id,
      )?.GetIsShow() ??
        !1)
    );
  }
}
exports.ParkourMarkItem = ParkourMarkItem;
//# sourceMappingURL=ParkourMarkItem.js.map
