"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParkourMarkItem = void 0);
const ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class ParkourMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    const e =
      ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(
        this.MarkId,
      );
    return (
      ModelManager_1.ModelManager.ActivityRunModel?.GetActivityRunData(
        e.Id,
      )?.GetIsShow() ?? !1
    );
  }
}
exports.ParkourMarkItem = ParkourMarkItem;
// # sourceMappingURL=ParkourMarkItem.js.map
