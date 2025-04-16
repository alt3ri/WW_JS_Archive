"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxDetectorItemRangeHandle = void 0);
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  MarkDetectorRangeImageComponent_1 = require("../Components/MarkDetectorRangeImageComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class TreasureBoxDetectorItemRangeHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkDetectorRangeImageComponent_1.MarkDetectorRangeImageComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_ProbeArea",
          this.Context.MarkParentItem,
        )),
      this.ComponentInternal
    );
  }
  GetOrCreateComponent() {
    return (
      void 0 === this.ComponentInternal &&
        this.LoadComponentAsync().then(() => {
          var e = this.ComponentInternal,
            t = Vector2D_1.Vector2D.Create(
              this.Context.MarkItem.UiPosition.X,
              this.Context.MarkItem.UiPosition.Y,
            ),
            t =
              (e.GetRootItem().SetAnchorOffset(t.ToUeVector2D(!0)),
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "TreasureBoxDetectionMaxDistance",
              ));
          e.RangeImage.SetWidth((t / 100) * 2),
            e.RangeImage.SetHeight((t / 100) * 2),
            e.GetRootItem().SetHierarchyIndex(0),
            this.ApplyModified();
        }),
      this.ComponentInternal
    );
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(2, e);
  }
  UpdateRangeScale() {
    var e, t;
    this.Context.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(2) &&
      ((e = this.GetOrCreateComponent()).SetRangeScale(1, 1, 1),
      (t = Vector2D_1.Vector2D.Create(
        this.Context.MarkItem.UiPosition.X,
        this.Context.MarkItem.UiPosition.Y,
      )),
      e.GetRootItem()?.SetAnchorOffset(t.ToUeVector2D(!0)));
  }
  OnApplyModified() {
    var e,
      t,
      o = this.Context.MarkItemEntity.ViewLifeCircle;
    o.IsChildViewStateDirty(2) &&
      ((e = this.GetOrCreateComponent()), this.IsComponentValid(e)) &&
      ((t = o.IsChildViewVisible(2)),
      o.SetChildViewVisibleClean(2),
      this.UpdateRangeScale(),
      e.SetActive(t));
  }
}
exports.TreasureBoxDetectorItemRangeHandle = TreasureBoxDetectorItemRangeHandle;
//# sourceMappingURL=TreasureBoxDetectorItemRangeHandle.js.map
