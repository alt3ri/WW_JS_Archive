"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemPhotographView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPhotographView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    return (
      (ControllerHolder_1.ControllerHolder.PhotographController.PhotoTargets =
        void 0),
      e && e.PhotographConfig
        ? ((ControllerHolder_1.ControllerHolder.PhotographController.PhotoTargets =
            e.PhotographConfig.PhotoTargets),
          await ControllerHolder_1.ControllerHolder.PhotographController.TryOpenTogetherPhotograph())
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCommon",
              45,
              "打开系统界面：拍照 但找不到对应的目标",
            ),
          !1)
    );
  }
  GetViewName(e) {
    return "PhotographView";
  }
}
exports.OpenSystemPhotographView = OpenSystemPhotographView;
//# sourceMappingURL=OpenSystemPhotographView.js.map
