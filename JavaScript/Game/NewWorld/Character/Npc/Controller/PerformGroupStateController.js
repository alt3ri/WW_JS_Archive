"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformGroupStateController = void 0);
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class PerformGroupStateController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(21145, this.SetPerformStateNotify), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(21145), !0;
  }
}
(exports.PerformGroupStateController =
  PerformGroupStateController).SetPerformStateNotify = (e) => {
  var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
    MathUtils_1.MathUtils.LongToNumber(e.P4n),
  );
  r?.Entity?.IsInit &&
    r.Entity.GetComponent(171).PerformGroupController.SwitchPerformState(e.F4n);
};
//# sourceMappingURL=PerformGroupStateController.js.map
