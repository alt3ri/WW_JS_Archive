"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotController = void 0);
const ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../Manager/ModelManager");
class RedDotController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !0;
  }
  static BindRedDot(e, t, a, r = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.BindUi(r, t, a);
  }
  static UnBindRedDot(e) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.UnBindUi();
  }
  static UnBindRedDotAndClearData(e) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.UnBindUiAndClearData();
  }
  static UnBindGivenUi(e, t, a = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.UnBindGivenUi(a, t);
  }
  static UnBindGivenUiAndDeleteData(e, t, a = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.UnBindGivenUiAndDeleteData(a, t);
  }
}
exports.RedDotController = RedDotController;
//# sourceMappingURL=RedDotController.js.map
