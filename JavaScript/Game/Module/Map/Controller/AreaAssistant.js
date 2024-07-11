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
        ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.dbs);
      }),
      (this.bLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.mbs);
      }),
      (this.qLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetUnlockMultiMapIds(e.dbs),
          ModelManager_1.ModelManager.MapModel.SetUnlockMapBlockIds(e.mbs);
      }),
      (this.GLi = (e) => {
        ModelManager_1.ModelManager.MapModel.AddUnlockedAreas(e.sbs);
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(6092, this.GLi),
      Net_1.Net.Register(13615, this.qLi),
      Net_1.Net.Register(27809, this.bLi),
      Net_1.Net.Register(17122, this.BLi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(6092),
      Net_1.Net.UnRegister(13615),
      Net_1.Net.UnRegister(27809),
      Net_1.Net.UnRegister(17122);
  }
  async RequestUnlockedAreaInfo() {
    var e = Protocol_1.Aki.Protocol.Fss.create(),
      e = await Net_1.Net.CallAsync(7732, e);
    e &&
      (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            29965,
          )
        : ModelManager_1.ModelManager.MapModel.FullUpdateUnlockedAreas(e.sbs));
  }
}
exports.AreaAssistant = AreaAssistant;
//# sourceMappingURL=AreaAssistant.js.map
