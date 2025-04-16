"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemChildIconHandle = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkChildIconComponent_1 = require("../Components/MarkChildIconComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemChildIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  OnUpdate() {
    var e = this.Context.MarkItem;
    e.ShowSecondaryUiMultiMapIcon()
      ? (this.SetVisible(!0),
        (this.Context.MarkItemEntity.Resource.ChildIconPath =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            e.IsSelectThisFloor
              ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH
              : WorldMapDefine_1.MULTI_MAP_ICON_PATH,
          )))
      : this.SetVisible(!1);
  }
  async LoadComponentAsync() {
    return (
      void 0 === this.ComponentInternal &&
        ((this.ComponentInternal =
          new MarkChildIconComponent_1.MarkChildIconComponent()),
        await this.ComponentInternal.CreateByPoolResourceIdAsync(
          "UiItem_MarkChildNode_Prefab",
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
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(7, e);
  }
  OnApplyModified() {
    var e = this.Context.MarkItemEntity.ViewLifeCircle,
      t = e.IsChildViewVisible(7),
      i = this.Context.MarkItemEntity.Resource.IsChildIconPathDirty;
    if (t && i) {
      var i = this.GetOrCreateComponent();
      if (!this.IsComponentValid(i)) return;
      i.Icon = this.Context.MarkItemEntity.Resource.ChildIconPath;
    }
    e.IsChildViewStateDirty(7) &&
      ((i = this.GetOrCreateComponent()), this.IsComponentValid(i)) &&
      (e.SetChildViewVisibleClean(7), i.SetActive(t));
  }
}
exports.MarkItemChildIconHandle = MarkItemChildIconHandle;
//# sourceMappingURL=MarkItemChildIconHandle.js.map
