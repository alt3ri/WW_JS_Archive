"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CorniceMeetingMarkItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityCorniceMeetingController_1 = require("../../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingController"),
  SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class CorniceMeetingMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    var e,
      r =
        ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeByMarkId(
          this.MarkId,
        );
    return (
      void 0 !== r &&
      (void 0 ===
      (e =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData())
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Map",
              64,
              "[地图系统]CorniceMeetingMarkItem->CheckCanShowView, 获取数据为空",
            ),
          !1)
        : e.GetIsShow(r.Id))
    );
  }
}
exports.CorniceMeetingMarkItem = CorniceMeetingMarkItem;
//# sourceMappingURL=CorniceMeetingMarkItem.js.map
