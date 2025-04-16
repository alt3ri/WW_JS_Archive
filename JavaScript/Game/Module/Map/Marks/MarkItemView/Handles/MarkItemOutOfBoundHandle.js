"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemOutOfBoundHandle = void 0);
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  MarkOutOfBoundComponent_1 = require("../Components/MarkOutOfBoundComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemOutOfBoundHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkOutOfBoundComponent_1.MarkOutOfBoundComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkOut_Prefab",
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
  OnSetVisible(t) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(4, t);
  }
  OnApplyModified() {
    this.ApplyDirectionModified();
    var t,
      e,
      o = this.Context.MarkItemEntity.ViewLifeCircle;
    o.IsChildViewStateDirty(4) &&
      ((t = this.GetOrCreateComponent()), this.IsComponentValid(t)) &&
      ((e = o.IsChildViewVisible(4)),
      o.SetChildViewVisibleClean(4),
      t.SetActive(e));
  }
  ApplyDirectionModified() {
    var t,
      e,
      o,
      n = this.Context.MarkItemEntity.Resource;
    n.IsOutOfBoundDirectionDirty &&
      ((t = this.GetOrCreateComponent()), this.IsComponentValid(t)) &&
      ((e = this.Context.MarkItem.UiPosition),
      (e = Vector2D_1.Vector2D.Create(e.X, e.Y)),
      (o = n.OutOfBoundDirection),
      e.SubtractionEqual(o),
      t.SetOutOfBoundDirection(e),
      n.SetOutOfBoundDirectionClean());
  }
}
exports.MarkItemOutOfBoundHandle = MarkItemOutOfBoundHandle;
//# sourceMappingURL=MarkItemOutOfBoundHandle.js.map
