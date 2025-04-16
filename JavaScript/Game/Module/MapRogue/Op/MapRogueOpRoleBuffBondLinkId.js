"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpRoleBuffBondLinkId = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpRoleBuffBondLinkId extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments),
      (this.CloseViewFunc = void 0),
      (this.UpdateViewFunc = void 0),
      (this.StepSize = 2),
      (this.MaxSelectCount = 0),
      (this.CurrentSelectCount = 0),
      (this.Ujt = !1);
  }
  ToString() {
    return (
      `[RoleBuff] IncId:${this.IncId} Type:${this.Data.ap1?.uac?.Lac} Cur:${this.CurrentSelectCount} Max:${this.MaxSelectCount} Lock:` +
      this.Ujt
    );
  }
  OnUpdate() {
    this.UpdateViewFunc?.(), (this.Ujt = !1);
  }
  OnStartExecute(e) {
    this.Data.ap1.uac &&
      UiManager_1.UiManager.OpenView("RogueBattleRoleStarUpView", this.IncId);
  }
  GetGainDataList() {
    return this.Data.ap1?.uac?.Dac ?? [];
  }
  OnExecute(e) {
    if (1 === this.CurrentStep)
      return 0 === this.Data.ap1.jo1.length
        ? void this.Execute(e)
        : void UiManager_1.UiManager.OpenView(
            "RogueBattleLinkUnlockView",
            this.IncId,
            (e) => {
              (UiManager_1.UiManager.IsViewOpen("RogueBattleRoleStarUpView") ||
                UiManager_1.UiManager.IsViewHide(
                  "RogueBattleRoleStarUpView",
                )) &&
                UiManager_1.UiManager.CloseView("RogueBattleRoleStarUpView");
            },
          );
    2 !== this.CurrentStep || this.Data.ap1?.uac?.k2s
      ? this.Execute(e)
      : UiManager_1.UiManager.OpenView(
          "RogueBattleRoleBuffSelectView",
          this.IncId,
          (e) => {
            (UiManager_1.UiManager.IsViewOpen("RogueBattleLinkUnlockView") ||
              UiManager_1.UiManager.IsViewHide("RogueBattleLinkUnlockView")) &&
              UiManager_1.UiManager.CloseView("RogueBattleLinkUnlockView"),
              (UiManager_1.UiManager.IsViewOpen("RogueBattleRoleStarUpView") ||
                UiManager_1.UiManager.IsViewHide(
                  "RogueBattleRoleStarUpView",
                )) &&
                UiManager_1.UiManager.CloseView("RogueBattleRoleStarUpView");
          },
        );
  }
  OnFinish(e) {}
  OnDelete(e) {
    UiManager_1.UiManager.IsViewOpen("RogueBattleRoleBuffSelectView") &&
      UiManager_1.UiManager.CloseView("RogueBattleRoleBuffSelectView"),
      this.CloseViewFunc?.();
  }
}
exports.MapRogueOpRoleBuffBondLinkId = MapRogueOpRoleBuffBondLinkId;
//# sourceMappingURL=MapRogueOpRoleBuffBondLinkId.js.map
