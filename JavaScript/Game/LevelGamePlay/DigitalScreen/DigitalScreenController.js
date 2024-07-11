"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DigitalScreenController = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class DigitalScreenController extends UiControllerBase_1.UiControllerBase {
  static async OpenDigitalScreenById(e) {
    var r = ModelManager_1.ModelManager.DigitalScreenModel.GetDataConfig(e);
    if (!ModelManager_1.ModelManager.DigitalScreenModel.InitDigitalScreen(e))
      return !1;
    let a = "DigitalScreenA";
    return (
      0 === r?.Prefab
        ? (a = "DigitalScreenA")
        : 1 === r?.Prefab && (a = "DigitalScreenB"),
      !!UiManager_1.UiManager.IsViewOpen(a) ||
        void 0 !== (await UiManager_1.UiManager.OpenViewAsync(a))
    );
  }
}
exports.DigitalScreenController = DigitalScreenController;
//# sourceMappingURL=DigitalScreenController.js.map
