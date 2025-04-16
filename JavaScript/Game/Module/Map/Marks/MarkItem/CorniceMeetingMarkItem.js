"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CorniceMeetingMarkItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ActivityCorniceMeetingController_1 = require("../../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingController"),
  SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class CorniceMeetingMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    var e,
      t =
        ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeByMarkId(
          this.MarkId,
        );
    return (
      void 0 !== t &&
      void 0 !==
        (e =
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData()) &&
      e.GetIsShow(t.Id)
    );
  }
}
exports.CorniceMeetingMarkItem = CorniceMeetingMarkItem;
//# sourceMappingURL=CorniceMeetingMarkItem.js.map
