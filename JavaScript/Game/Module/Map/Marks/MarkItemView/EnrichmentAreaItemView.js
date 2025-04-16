"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaItemView = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EnrichmentAreaItemRangeHandle_1 = require("./Handles/EnrichmentAreaItemRangeHandle"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class EnrichmentAreaItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e),
      (this.Zbn = (e) => {
        var t = this.Holder;
        (t.IsSelectThisFloor = t.GetMultiMapId() === e),
          this.OnIconPathChanged(t.IconPath);
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      (this.Holder.MarkItemEntity.ViewLifeCircle.EnableVerticalPointer = !1),
      this.MarkItemRangeHandle.SetVisible(!0);
  }
  OnReset() {
    super.OnReset(),
      (this.Holder.MarkItemEntity.ViewLifeCircle.EnableVerticalPointer = !1),
      this.MarkItemRangeHandle.SetVisible(!0);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapSelectMultiMap,
      this.Zbn,
    );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapSelectMultiMap,
      this.Zbn,
    );
  }
  OnAfterShow() {
    super.OnAfterShow(),
      this.UpdateMultiMapFloorSelectedState(),
      this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, t, i) {
    var n, r, s;
    this.Holder &&
      ((n = this.GetSprite(1)),
      (r = (s = this.Holder).CheckCanShowIcon()),
      (s = s.CheckCanShowView()),
      n?.SetUIActive(r),
      this.MarkItemRangeHandle.SetVisible(s));
  }
  OnIconPathChanged(e) {
    var t = this.Holder.CheckCanShowIcon(),
      i = this.GetSprite(1);
    t ? this.LoadIcon(i, e) : i.SetUIActive(t),
      this.MarkItemChildIconHandle.Update();
  }
  UpdateMultiMapFloorSelectedState() {
    var e = this.Holder,
      t = this.Holder.IsSelectThisFloor;
    (this.Holder.IsSelectThisFloor = e.GetIsSelectThisFloor()),
      t !== this.Holder.IsSelectThisFloor && this.OnIconPathChanged(e.IconPath);
  }
  CreateRangeHandle(e) {
    return new EnrichmentAreaItemRangeHandle_1.EnrichmentAreaItemRangeHandle(e);
  }
}
exports.EnrichmentAreaItemView = EnrichmentAreaItemView;
//# sourceMappingURL=EnrichmentAreaItemView.js.map
