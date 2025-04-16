"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportMarkItemView = void 0);
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  TemporaryTeleportMarkItemChildIconHandle_1 = require("./Handles/TemporaryTeleportMarkItemChildIconHandle"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TemporaryTeleportMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.iYa();
  }
  OnReset() {
    super.OnReset(), this.iYa();
  }
  OnSelectedStateChange(e) {
    this.Holder.IsServerDisable &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "Map_TeleportMark_Disable_Tips",
      );
  }
  OnSafeUpdate(e, r, t) {
    this.Holder && this.iYa();
  }
  iYa() {
    var e = this.Holder;
    this.GetSprite(2)?.SetUIActive(e.IsServerDisable);
  }
  CreateChildIconHandle(e) {
    return new TemporaryTeleportMarkItemChildIconHandle_1.TemporaryTeleportMarkItemChildIconHandle(
      e,
    );
  }
  UpdateIcon() {
    this.MarkItemChildIconHandle.Update(),
      this.MarkItemChildIconHandle.ApplyModified();
  }
}
exports.TemporaryTeleportMarkItemView = TemporaryTeleportMarkItemView;
//# sourceMappingURL=TemporaryTeleportMarkItemView.js.map
