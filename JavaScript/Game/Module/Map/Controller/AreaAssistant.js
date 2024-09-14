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
        ModelManager_1.ModelManager.MapModel.AddUnlockedAreas(e.mbs);
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(27312, this.GLi),
      Net_1.Net.Register(18695, this.qLi),
      Net_1.Net.Register(28539, this.bLi),
      Net_1.Net.Register(16666, this.BLi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27312),
      Net_1.Net.UnRegister(18695),
      Net_1.Net.UnRegister(28539),
      Net_1.Net.UnRegister(16666);
  }
  async RequestUnlockedAreaInfo() {
    var e = Protocol_1.Aki.Protocol.Qss.create(),
      e = await Net_1.Net.CallAsync(25829, e);
    e &&
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            22201,
          )
        : ModelManager_1.ModelManager.MapModel.FullUpdateUnlockedAreas(e.mbs));
  }
}
exports.AreaAssistant = AreaAssistant;
//# sourceMappingURL=AreaAssistant.js.map
