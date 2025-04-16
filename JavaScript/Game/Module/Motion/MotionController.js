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
    Net_1.Net.Register(25018, MotionController.hqi),
      Net_1.Net.Register(19816, MotionController.lqi),
      Net_1.Net.Register(18813, MotionController._qi),
      Net_1.Net.Register(24862, MotionController.uqi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25018),
      Net_1.Net.UnRegister(19816),
      Net_1.Net.UnRegister(18813),
      Net_1.Net.UnRegister(24862);
  }
}
((exports.MotionController = MotionController).RequestUnlockMotion = (e, o) => {
  var t = new Protocol_1.Aki.Protocol.Wts();
  (t.Q6n = e),
    (t.F7n = o),
    Net_1.Net.Call(25197, t, (e) => {
      e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.G9n,
            28846,
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
