"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotController = void 0);
const ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../Manager/ModelManager");
class RedDotController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !0;
  }
  static BindRedDot(e, r, o, t = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.BindUi(t, r, o);
  }
  static UnBindRedDot(e) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.UnBindUi();
  }
  static UnBindGivenUi(e, r, o = 0) {
    e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
    e && e.UnBindGivenUi(o, r);
  }
}
exports.RedDotController = RedDotController;
//# sourceMappingURL=RedDotController.js.map
