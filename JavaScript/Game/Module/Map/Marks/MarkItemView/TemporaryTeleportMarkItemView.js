"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportMarkItemView = void 0);
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TemporaryTeleportMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.OnIconPathChanged(this.Holder.IconPath),
      this.xQa();
  }
  OnSelectedStateChange(e) {
    this.Holder.IsServerDisable &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "Map_TeleportMark_Disable_Tips",
      );
  }
  OnSafeUpdate(e, r, t) {
    this.Holder && this.xQa();
  }
  xQa() {
    var e = this.Holder;
    this.GetSprite(2).SetUIActive(e.IsServerDisable);
  }
}
exports.TemporaryTeleportMarkItemView = TemporaryTeleportMarkItemView;
//# sourceMappingURL=TemporaryTeleportMarkItemView.js.map
