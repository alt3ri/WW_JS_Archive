"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemWeeklyRogueToken = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  WeeklyRogueController_1 = require("../../../Module/WeeklyRogue/WeeklyRogueController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemWeeklyRogueToken extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    return (
      (ModelManager_1.ModelManager.WeeklyRogueModel.CurrentBindId = e.BoardId),
      WeeklyRogueController_1.WeeklyRogueController.Instance?.OpenTokenSelectViewById(
        e.BoardId,
      ) ?? !1
    );
  }
  GetViewName(e, o) {
    e = ModelManager_1.ModelManager.WeeklyRogueModel?.GetOptionByBindId(
      e.BoardId,
    );
    return WeeklyRogueController_1.WeeklyRogueController.Instance.GetViewNameByType(
      e.h5n,
    );
  }
}
exports.OpenSystemWeeklyRogueToken = OpenSystemWeeklyRogueToken;
//# sourceMappingURL=OpenSystemWeeklyRogueTokenSelect.js.map
