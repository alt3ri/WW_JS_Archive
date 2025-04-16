"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemTrackHandle = void 0);
const MarkTrackComponent_1 = require("../Components/MarkTrackComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemTrackHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    var e;
    return (
      void 0 === this.ComponentInternal &&
        (((e = new MarkTrackComponent_1.MarkTrackComponent()).MapType =
          this.Context.MarkItem.MapType),
        (e.TrackFxScale = this.Context.MarkItem.TrackFxScale),
        (this.ComponentInternal = e),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkTrackNia_Prefab",
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
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(6, e);
  }
  OnApplyModified() {
    var e,
      t,
      n = this.Context.MarkItemEntity.ViewLifeCircle;
    n.IsChildViewStateDirty(6) &&
      ((e = this.GetOrCreateComponent()), this.IsComponentValid(e)) &&
      ((t = n.IsChildViewVisible(6)),
      n.SetChildViewVisibleClean(6),
      e.SetActive(t));
  }
}
exports.MarkItemTrackHandle = MarkItemTrackHandle;
//# sourceMappingURL=MarkItemTrackHandle.js.map
