"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportMarkItemView = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TemporaryTeleportMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.OnIconPathChanged(this.Holder.IconPath),
      (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.Holder.MarkId,
      )).ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable &&
        this.GetSprite(2).SetUIActive(!0);
  }
  OnSelectedStateChange(e) {
    (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
      this.Holder.MarkId,
    )).ShowFlag === Protocol_1.Aki.Protocol.I6s.Proto_ShowDisable &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "Map_TeleportMark_Disable_Tips",
      );
  }
}
exports.TemporaryTeleportMarkItemView = TemporaryTeleportMarkItemView;
//# sourceMappingURL=TemporaryTeleportMarkItemView.js.map
