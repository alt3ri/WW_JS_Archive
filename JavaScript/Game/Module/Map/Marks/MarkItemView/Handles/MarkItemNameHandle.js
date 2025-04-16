"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemNameHandle = void 0);
const MarkNameComponent_1 = require("../Components/MarkNameComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemNameHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  constructor() {
    super(...arguments), (this.pDe = void 0);
  }
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal = new MarkNameComponent_1.MarkNameComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkMapName_Prefab",
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
  SetName(e) {
    this.pDe = e;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(3, e);
  }
  OnApplyModified() {
    var e,
      t,
      n = this.Context.MarkItemEntity.ViewLifeCircle;
    n.IsChildViewStateDirty(3) &&
      ((e = this.GetOrCreateComponent()), this.IsComponentValid(e)) &&
      ((t = n.IsChildViewVisible(3)),
      n.SetChildViewVisibleClean(3),
      void 0 !== this.pDe && e.SetNameParam(this.pDe),
      e.SetActive(t));
  }
}
exports.MarkItemNameHandle = MarkItemNameHandle;
//# sourceMappingURL=MarkItemNameHandle.js.map
