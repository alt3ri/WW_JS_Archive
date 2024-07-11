"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeRewardController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class ExchangeRewardController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ExchangeRewardController.RequestExchangeData,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ExchangeRewardController.RequestExchangeData,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18290, ExchangeRewardController.wai),
      Net_1.Net.Register(14656, ExchangeRewardController.Bai);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18290), Net_1.Net.UnRegister(14656);
  }
}
(exports.ExchangeRewardController = ExchangeRewardController),
  ((_a = ExchangeRewardController).wai = (e) => {
    ModelManager_1.ModelManager.ExchangeRewardModel.OnExchangeRewardNotify(e);
  }),
  (ExchangeRewardController.Bai = (e) => {
    ModelManager_1.ModelManager.ExchangeRewardModel.OnShareInfoNotify(e);
  }),
  (ExchangeRewardController.RequestExchangeData = async () => {
    var e = new Protocol_1.Aki.Protocol.Hos(),
      e = await Net_1.Net.CallAsync(22639, e);
    ModelManager_1.ModelManager.ExchangeRewardModel.Phrase(e);
  });
//# sourceMappingURL=ExchangeRewardController.js.map
