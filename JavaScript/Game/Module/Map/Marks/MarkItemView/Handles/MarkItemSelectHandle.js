"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemSelectHandle = void 0);
const MarkSelectComponent_1 = require("../Components/MarkSelectComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemSelectHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkSelectComponent_1.MarkSelectComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkChoose_Prefab",
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
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(5, e);
  }
  OnApplyModified() {
    var e,
      t,
      n = this.Context.MarkItemEntity.ViewLifeCircle;
    n.IsChildViewStateDirty(5) &&
      ((e = this.GetOrCreateComponent()), this.IsComponentValid(e)) &&
      ((t = n.IsChildViewVisible(5)),
      n.SetChildViewVisibleClean(5),
      e.SetActive(t));
  }
}
exports.MarkItemSelectHandle = MarkItemSelectHandle;
//# sourceMappingURL=MarkItemSelectHandle.js.map
