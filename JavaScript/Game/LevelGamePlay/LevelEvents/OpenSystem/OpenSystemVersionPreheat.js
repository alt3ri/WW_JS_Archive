"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemVersionPreheat = void 0);
const ActivityVersionPreheatController_1 = require("../../../Module/Activity/ActivityContent/VersionPreheat/Controller/ActivityVersionPreheatController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemVersionPreheat extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    e = e.BoardId;
    return 0 !== e
      ? ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(
          e,
          !0,
        )
      : ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenTargetViewAsyncById(
          void 0,
          !1,
        );
  }
  GetViewName() {
    return "VersionPreheatVoteView";
  }
}
exports.OpenSystemVersionPreheat = OpenSystemVersionPreheat;
//# sourceMappingURL=OpenSystemVersionPreheat.js.map
