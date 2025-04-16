"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaItemRangeHandle = void 0);
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  MarkBlueRangeImageComponent_1 = require("../Components/MarkBlueRangeImageComponent"),
  MarkItemRangeHandle_1 = require("./MarkItemRangeHandle");
class EnrichmentAreaItemRangeHandle extends MarkItemRangeHandle_1.MarkItemRangeHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkBlueRangeImageComponent_1.MarkBlueRangeImageComponent()),
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
          this.ApplyModified();
        }),
      this.ComponentInternal
    );
  }
  OnResetRangeComponent(e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.TakeMarkComponentExitContainer,
      this.Context.MarkItemEntity.GamePlay.MarkType,
      0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TakeMarkComponentEnterContainer,
        this.ComponentInternal.GetRootItem(),
        this.Context.MarkItemEntity.GamePlay.MarkType,
        0,
      ),
      super.OnResetRangeComponent(e);
    var t = Vector2D_1.Vector2D.Create(
      this.Context.MarkItem.UiPosition.X,
      this.Context.MarkItem.UiPosition.Y,
    );
    e.GetRootItem().SetAnchorOffset(t.ToUeVector2D(!0));
  }
  DestroyComponent() {
    this.ComponentInternal &&
      (this.ComponentInternal.RecycleToPool(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TakeMarkComponentExitContainer,
        this.Context.MarkItemEntity.GamePlay.MarkType,
        0,
      ),
      (this.ComponentInternal = void 0));
  }
}
exports.EnrichmentAreaItemRangeHandle = EnrichmentAreaItemRangeHandle;
//# sourceMappingURL=EnrichmentAreaItemRangeHandle.js.map
