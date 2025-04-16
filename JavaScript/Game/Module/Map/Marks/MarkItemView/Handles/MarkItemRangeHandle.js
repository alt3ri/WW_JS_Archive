"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemRangeHandle = void 0);
const MarkRangeImageComponent_1 = require("../Components/MarkRangeImageComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemRangeHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkRangeImageComponent_1.MarkRangeImageComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkArea_Prefab",
          this.Context.MarkComponentContainer,
        )),
      this.ComponentInternal
    );
  }
  GetOrCreateComponent() {
    return (
      void 0 === this.ComponentInternal &&
        this.LoadComponentAsync().then(() => {
          this.ApplyModified();
        }),
      this.ComponentInternal
    );
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(2, e);
  }
  OnApplyModified() {
    var e,
      t,
      n = this.Context.MarkItemEntity.ViewLifeCircle;
    n.IsChildViewStateDirty(2) &&
      ((e = this.GetOrCreateComponent()), this.IsComponentValid(e)) &&
      ((t = n.IsChildViewVisible(2)),
      n.SetChildViewVisibleClean(2),
      this.ResetRangeComponent(e),
      e.SetActive(t));
  }
  ResetRangeComponent(e) {
    var t = this.Context.MarkItemEntity.GetComponent(11).RangeSize;
    e.RangeArea?.SetWidth(2 * t),
      e.RangeArea?.SetHeight(2 * t),
      e.RangeImage?.SetWidth(2 * t),
      e.RangeImage?.SetHeight(2 * t),
      this.OnResetRangeComponent(e);
  }
  OnResetRangeComponent(e) {}
}
exports.MarkItemRangeHandle = MarkItemRangeHandle;
//# sourceMappingURL=MarkItemRangeHandle.js.map
