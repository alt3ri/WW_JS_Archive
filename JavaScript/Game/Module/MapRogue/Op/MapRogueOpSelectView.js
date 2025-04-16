"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpSelectView = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpSelectView extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments),
      (this.CloseViewFunc = void 0),
      (this.UpdateViewFunc = void 0),
      (this.StepSize = 1),
      (this.MaxSelectCount = 0),
      (this.CurrentSelectCount = 0),
      (this.CanGiveUp = !1),
      (this.Ujt = !1);
  }
  get IsMax() {
    return this.CurrentSelectCount >= this.MaxSelectCount;
  }
  ToString() {
    return (
      `[SelectView] IncId:${this.IncId} Type:${this.Data.oac?.uac?.Lac} Cur:${this.CurrentSelectCount} Max:${this.MaxSelectCount} Lock:` +
      this.Ujt
    );
  }
  OnUpdate() {
    var e = this.Data.oac.uac;
    (this.MaxSelectCount = e.Rr1),
      (this.CurrentSelectCount = e.wr1),
      (this.CanGiveUp = e.mBc),
      this.UpdateViewFunc?.(),
      (this.Ujt = !1);
  }
  GetGainDataList() {
    return this.Data.oac?.uac?.Dac ?? [];
  }
  Select(e) {
    this.Ujt ||
      ((this.Ujt = !0),
      (this.OpExecuteClientId = e),
      this.ExecuteOp((e) => {
        e || (this.Ujt = !1);
      }));
  }
  OnStartExecute(e) {
    var t = this.Data.oac.uac;
    if (t)
      switch (t.Lac) {
        case Protocol_1.Aki.Protocol.Lac.Proto_Complex:
          UiManager_1.UiManager.OpenView("MapRogueRewardView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.Lac.RUs:
          UiManager_1.UiManager.OpenView("RogueBattleBuyRoleView", this.IncId);
          break;
        case Protocol_1.Aki.Protocol.Lac.Proto_RoleBuff:
          UiManager_1.UiManager.OpenView(
            "RogueBattleRoleBuffSelectView",
            this.IncId,
          );
          break;
        case Protocol_1.Aki.Protocol.Lac.$9n:
          UiManager_1.UiManager.OpenView(
            "RogueBattleSelectTokenView",
            this.IncId,
          );
      }
  }
  OnExecute(e) {}
  OnFinish(e) {}
  OnDelete(e) {
    this.CloseViewFunc?.();
  }
}
exports.MapRogueOpSelectView = MapRogueOpSelectView;
//# sourceMappingURL=MapRogueOpSelectView.js.map
