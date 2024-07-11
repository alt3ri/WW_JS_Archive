"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MotionController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class MotionController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(9975, MotionController.hqi),
      Net_1.Net.Register(10771, MotionController.lqi),
      Net_1.Net.Register(4959, MotionController._qi),
      Net_1.Net.Register(14592, MotionController.uqi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(9975),
      Net_1.Net.UnRegister(10771),
      Net_1.Net.UnRegister(4959),
      Net_1.Net.UnRegister(14592);
  }
}
((exports.MotionController = MotionController).RequestUnlockMotion = (e, o) => {
  var t = new Protocol_1.Aki.Protocol.kts();
  (t.O6n = e),
    (t.P7n = o),
    Net_1.Net.Call(6347, t, (e) => {
      e.A9n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.A9n,
            19789,
          )
        : ModelManager_1.ModelManager.MotionModel.OnMotionUnlock(e.O6n, e.P7n);
    });
}),
  (MotionController.hqi = (e) => {
    ModelManager_1.ModelManager.MotionModel.OnNewMotionCanUnlock(e.O6n, e.KPs);
  }),
  (MotionController.lqi = (e) => {
    ModelManager_1.ModelManager.MotionModel.OnRoleMotionActive(e);
  }),
  (MotionController._qi = (e) => {
    ModelManager_1.ModelManager.MotionModel.OnGetAllRoleMotionInfo(e);
  }),
  (MotionController.uqi = (e) => {
    ModelManager_1.ModelManager.MotionModel.OnMotionFinishCondition(e);
  });
//# sourceMappingURL=MotionController.js.map
