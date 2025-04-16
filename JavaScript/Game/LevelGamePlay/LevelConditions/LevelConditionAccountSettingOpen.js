"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionAccountSettingOpen = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAccountSettingOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return (
      !!e.LimitParams &&
      void 0 !== (e = Number(e.LimitParams.get("Id"))) &&
      ControllerHolder_1.ControllerHolder.ChannelController.CheckAccountSettingOpen(
        e,
      )
    );
  }
}
exports.LevelConditionAccountSettingOpen = LevelConditionAccountSettingOpen;
//# sourceMappingURL=LevelConditionAccountSettingOpen.js.map
