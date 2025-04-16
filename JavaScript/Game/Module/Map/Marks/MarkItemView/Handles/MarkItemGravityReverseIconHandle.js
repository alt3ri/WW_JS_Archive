"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemGravityReverseIconHandle = void 0);
const MarkGravityReverseIconComponent_1 = require("../Components/MarkGravityReverseIconComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemGravityReverseIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkGravityReverseIconComponent_1.MarkGravityReverseIconComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkReverse",
          this.Context.MarkComponentContainer,
        )),
      this.ComponentInternal
    );
  }
  GetOrCreateComponent() {
    return (
      void 0 === this.ComponentInternal &&
        this.LoadComponentAsync().then(() => {
          this.ComponentInternal?.GetRootItem().SetUIRelativeScale3D(
            this.Context.MarkItem.CornerScaleVector,
          ),
            this.ApplyModified();
        }),
      this.ComponentInternal
    );
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(9, e);
  }
  OnApplyModified() {
    var e,
      t,
      n = this.Context.MarkItemEntity.ViewLifeCircle;
    n.IsChildViewStateDirty(9) &&
      ((e = this.GetOrCreateComponent()), this.IsComponentValid(e)) &&
      ((t = n.IsChildViewVisible(9)),
      n.SetChildViewVisibleClean(9),
      (e.Gravity = this.Context.MarkItemEntity.GamePlay.Gravity),
      e.SetActive(t));
  }
}
exports.MarkItemGravityReverseIconHandle = MarkItemGravityReverseIconHandle;
//# sourceMappingURL=MarkItemGravityReverseIconHandle.js.map
