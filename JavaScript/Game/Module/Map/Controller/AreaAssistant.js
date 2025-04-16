"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
class AreaAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.BLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.Mbs);
      }),
      (this.bLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.Sbs);
      }),
      (this.qLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.Mbs),
          ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.Sbs);
      }),
      (this.GLi = (e) => {
        ModelManager_1.ModelManager.MapModel.AddUnlockedFogs(e.mbs);
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(27560, this.GLi),
      Net_1.Net.Register(23133, this.qLi),
      Net_1.Net.Register(29073, this.bLi),
      Net_1.Net.Register(26599, this.BLi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27560),
      Net_1.Net.UnRegister(23133),
      Net_1.Net.UnRegister(29073),
      Net_1.Net.UnRegister(26599);
  }
  async RequestUnlockedAreaInfo() {
    var e = Protocol_1.Aki.Protocol.Qss.create(),
      e = await Net_1.Net.CallAsync(18691, e);
    e &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            23293,
          )
        : ModelManager_1.ModelManager.MapModel.FullUpdateUnlockedFogs(e.mbs));
  }
}
exports.AreaAssistant = AreaAssistant;
//# sourceMappingURL=AreaAssistant.js.map
