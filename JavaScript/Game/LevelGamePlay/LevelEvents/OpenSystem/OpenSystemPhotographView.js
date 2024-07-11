"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemPhotographView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  PhotographController_1 = require("../../../Module/Photograph/PhotographController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPhotographView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    return (
      (PhotographController_1.PhotographController.PhotoTargets = void 0),
      e && e.PhotographConfig
        ? ((PhotographController_1.PhotographController.PhotoTargets =
            e.PhotographConfig.PhotoTargets),
          await PhotographController_1.PhotographController.TryOpenTogetherPhotograph())
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCommon",
              46,
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
