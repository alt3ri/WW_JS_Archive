"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpShowView = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpShowView extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments), (this.StepSize = 1), (this.AutoFinish = !0);
  }
  ToString() {
    return (
      `[ShowView] IncId:${this.IncId} Step:${this.CurrentStep} SubType:` +
      this.Data.nac?.dac
    );
  }
  OnUpdate() {
    this.Data.nac.dac === Protocol_1.Aki.Protocol.dac.Proto_InstResult &&
      (this.ExecuteInMapView = !1);
  }
  OnStartExecute(e) {
    var t = this.Data.nac;
    if (t)
      switch (t.dac) {
        case Protocol_1.Aki.Protocol.dac.Proto_GridTake:
          UiManager_1.UiManager.OpenView("MapRogueGridTakeView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.dac.Proto_InstResult:
          UiManager_1.UiManager.OpenView(
            "RogueBattleSettleView",
            this.Data.nac.pac,
          );
          break;
        case Protocol_1.Aki.Protocol.dac.Proto_RoleBond:
          UiManager_1.UiManager.OpenView(
            "RogueBattleRoleStarUpView",
            this.IncId,
          );
          break;
        case Protocol_1.Aki.Protocol.dac.Proto_AddToken:
          UiManager_1.UiManager.OpenView(
            "RogueBattleTokenSelectResultView",
            this.IncId,
          );
      }
  }
  OnExecute(e) {
    this.AutoFinish && this.Execute(e);
  }
  OnFinish(e) {}
  OnBeforeStartExecuteCheck(e) {
    var t = this.Data.nac;
    return !(
      !t ||
      (t.dac === Protocol_1.Aki.Protocol.dac.Proto_RoleBond &&
        UiManager_1.UiManager.IsViewOpen("RogueBattleRoleBuffSelectView"))
    );
  }
}
exports.MapRogueOpShowView = MapRogueOpShowView;
//# sourceMappingURL=MapRogueOpShowView.js.map
