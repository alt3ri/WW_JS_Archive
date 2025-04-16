"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemActivity = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemActivity extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    if (!e) return !0;
    const r = new CustomPromise_1.CustomPromise();
    return (
      !!ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(
        e.BoardId,
        4,
        (e) => {
          r.SetResult(e);
        },
      ) && r.Promise
    );
  }
  GetViewName(e, t) {
    return "CommonActivityView";
  }
}
exports.OpenSystemActivity = OpenSystemActivity;
//# sourceMappingURL=OpenSystemActivity.js.map
