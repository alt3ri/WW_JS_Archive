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
    Net_1.Net.Register(24294, MotionController.hqi),
      Net_1.Net.Register(20835, MotionController.lqi),
      Net_1.Net.Register(18891, MotionController._qi),
      Net_1.Net.Register(26611, MotionController.uqi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24294),
      Net_1.Net.UnRegister(20835),
      Net_1.Net.UnRegister(18891),
      Net_1.Net.UnRegister(26611);
  }
}
((exports.MotionController = MotionController).RequestUnlockMotion = (e, o) => {
  var t = new Protocol_1.Aki.Protocol.Wts();
  (t.Q6n = e),
    (t.F7n = o),
    Net_1.Net.Call(18903, t, (e) => {
      e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.G9n,
            21359,
          )
        : ModelManager_1.ModelManager.MotionModel.OnMotionUnlock(e.Q6n, e.F7n);
    });
}),
  (MotionController.hqi = (e) => {
    ModelManager_1.ModelManager.MotionModel.OnNewMotionCanUnlock(e.Q6n, e.eUs);
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
