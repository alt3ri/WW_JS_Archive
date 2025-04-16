"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DigitalScreenController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class DigitalScreenController extends UiControllerBase_1.UiControllerBase {
  static async OpenDigitalScreenById(e, r, a = !1) {
    var i = ModelManager_1.ModelManager.DigitalScreenModel.GetDataConfig(e);
    if (!ModelManager_1.ModelManager.DigitalScreenModel.InitDigitalScreen(e))
      return !1;
    let o = "DigitalScreenA";
    if (
      (0 === i?.Prefab
        ? (o = "DigitalScreenA")
        : 1 === i?.Prefab && (o = "DigitalScreenB"),
      UiManager_1.UiManager.IsViewOpen(o))
    )
      return !0;
    let t = void 0;
    if (a) {
      const n = new CustomPromise_1.CustomPromise();
      UiManager_1.UiManager.OpenViewByPlot(o, r, (e, r) => {
        (t = r), n.SetResult();
      }),
        await n.Promise;
    } else t = await UiManager_1.UiManager.OpenViewAsync(o, r);
    return void 0 !== t;
  }
}
exports.DigitalScreenController = DigitalScreenController;
//# sourceMappingURL=DigitalScreenController.js.map
