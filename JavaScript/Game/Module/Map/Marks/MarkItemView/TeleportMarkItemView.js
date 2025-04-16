"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItemView = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView"),
  TeleportMarkItemChildIconHandle_1 = require("./Handles/TeleportMarkItemChildIconHandle");
class TeleportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e),
      (this.Zbn = (e) => {
        var t = this.Holder;
        (t.IsSelectThisFloor = t.GetMultiMapId() === e),
          this.OnIconPathChanged(t.IconPath);
      }),
      (this.uRi = (e) => {
        this.MarkConfig.MarkId === e &&
          this.OnIconPathChanged(this.Holder.IconPath);
      }),
      (this.OnMarkItemStateChange = (e) => {
        (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
          this.Holder.MarkId,
        )).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable
          ? this.GetSprite(2).SetUIActive(!0)
          : this.GetSprite(2).SetUIActive(!1);
      });
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMarkItemShowStateChange,
      this.OnMarkItemStateChange,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.Zbn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uRi,
      );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMarkItemShowStateChange,
      this.OnMarkItemStateChange,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSelectMultiMap,
        this.Zbn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnlockTeleport,
        this.uRi,
      );
  }
  OnAfterShow() {
    super.OnAfterShow(), this.bl();
  }
  OnReset() {
    super.OnReset(), this.bl();
  }
  bl() {
    this.UpdateMultiMapFloorSelectState(!0),
      this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, t, r) {
    this.UpdateMultiMapFloorSelectState();
  }
  UpdateMultiMapFloorSelectState(e = !1) {
    var t;
    (2 === this.Holder?.MapType && !e) ||
      ((t = (e = this.Holder).IsSelectThisFloor),
      (e.IsSelectThisFloor = e.GetIsSelectThisFloor()),
      t === e.IsSelectThisFloor) ||
      this.OnIconPathChanged(e.IconPath);
  }
  OnIconPathChanged(e) {
    var t;
    void 0 !== this.MarkItemChildIconHandle &&
      ((t = this.GetSprite(1)),
      this.LoadIcon(t, e),
      this.MarkItemChildIconHandle.Update(),
      this.MarkItemChildIconHandle.ApplyModified());
  }
  OnSelectedStateChange(e) {
    e &&
      (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
        this.Holder.MarkId,
      )).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable &&
      (ModelManager_1.ModelManager.MapModel.IsMarkForbidGravityTeleport(
        this.Holder.MarkId,
        this.Holder.MarkType,
      )
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "MultiModeCannotTeleport",
          )
        : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "Map_TeleportMark_Disable_Tips",
          ));
  }
  CreateChildIconHandle(e) {
    return new TeleportMarkItemChildIconHandle_1.TeleportMarkItemChildIconHandle(
      e,
    );
  }
}
exports.TeleportMarkItemView = TeleportMarkItemView;
//# sourceMappingURL=TeleportMarkItemView.js.map
