"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformController = void 0);
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PerformAction_1 = require("./PerformAction");
class PerformController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(24302, this.tX_), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(24302), !0;
  }
  static RecoverTreeInfo(e) {
    for (const r of e)
      ModelManager_1.ModelManager.PerformModel.SetSightTarget(r);
  }
  static OnLeaveLevel() {
    return PerformAction_1.PerformActionPool.Clear(), !0;
  }
}
(exports.PerformController = PerformController).tX_ = (e) => {
  for (const r of e.hK_)
    ModelManager_1.ModelManager.PerformModel.SetSightTarget(r);
};
//# sourceMappingURL=PerformController.js.map
