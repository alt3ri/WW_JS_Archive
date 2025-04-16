"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventShowPlotPhoto = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventShowPlotPhoto extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    e &&
      ((ControllerHolder_1.ControllerHolder.PhotographController.CameraCaptureType = 1),
      UiManager_1.UiManager.IsViewOpen("PhotographView") ||
        (ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(
          1,
        ) &&
          TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
            "PhotographView",
          )),
      this.FinishExecute(!0));
  }
}
exports.LevelEventShowPlotPhoto = LevelEventShowPlotPhoto;
//# sourceMappingURL=LevelEventShowPlotPhoto.js.map
