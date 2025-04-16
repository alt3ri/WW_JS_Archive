"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemRoguelikeActivity = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RoguelikeController_1 = require("../../../Module/Roguelike/RoguelikeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRoguelikeActivity extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    if (100 !== e.BoardId)
      return RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView();
    {
      const r = new CustomPromise_1.CustomPromise();
      return 0 ===
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.CycleId
        ? !1
        : (UiManager_1.UiManager.OpenView(
            "WeeklyRogueActivityView",
            void 0,
            (e) => {
              r.SetResult(e);
            },
          ),
          r.Promise);
    }
  }
  GetViewName(e) {
    return 100 === e.BoardId
      ? "WeeklyRogueActivityView"
      : "RoguelikeActivityView";
  }
}
exports.OpenSystemRoguelikeActivity = OpenSystemRoguelikeActivity;
//# sourceMappingURL=OpenSystemRoguelikeActivity.js.map
