"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemRogueShop = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WeeklyRogueController_1 = require("../../../Module/WeeklyRogue/WeeklyRogueController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRogueShop extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()
      ? (WeeklyRogueController_1.WeeklyRogueController.Instance?.OpenTokenSelectViewById(
          -1,
        ) ?? !1)
      : ControllerHolder_1.ControllerHolder.RoguelikeController.OpenBuffSelectViewById(
          -1,
        );
  }
  GetViewName(e, r) {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      const o =
        ModelManager_1.ModelManager.WeeklyRogueModel?.GetOptionByBindId(-1);
      return WeeklyRogueController_1.WeeklyRogueController.Instance.GetViewNameByType(
        o.h5n,
      );
    }
    const o =
      ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(-1);
    return ControllerHolder_1.ControllerHolder.RoguelikeController.GetViewNameByGainType(
      o.RoguelikeGainDataType,
    );
  }
}
exports.OpenSystemRogueShop = OpenSystemRogueShop;
//# sourceMappingURL=OpenSystemRogueShop.js.map
