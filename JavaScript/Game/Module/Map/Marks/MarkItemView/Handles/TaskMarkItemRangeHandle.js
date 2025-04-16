"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskMarkItemRangeHandle = void 0);
const MarkRangeImageComponent_1 = require("../Components/MarkRangeImageComponent"),
  MarkItemRangeHandle_1 = require("./MarkItemRangeHandle");
class TaskMarkItemRangeHandle extends MarkItemRangeHandle_1.MarkItemRangeHandle {
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkRangeImageComponent_1.MarkRangeImageComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkArea_Prefab",
          this.Context.MarkParentItem,
        )),
      this.ComponentInternal
    );
  }
  OnResetRangeComponent(e) {
    super.OnResetRangeComponent(e);
    var a = this.Context.MarkRootItem.GetAnchorOffset();
    e.GetRootItem().SetAnchorOffset(a), e.GetRootItem().SetAsFirstHierarchy();
  }
}
exports.TaskMarkItemRangeHandle = TaskMarkItemRangeHandle;
//# sourceMappingURL=TaskMarkItemRangeHandle.js.map
