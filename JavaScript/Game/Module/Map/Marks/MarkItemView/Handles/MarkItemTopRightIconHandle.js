"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemTopRightIconHandle = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemTopRightIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  OnInit() {
    (this.Context.MarkItemEntity.Resource.TopRightIconPath =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_ComIconFinish",
      )),
      this.Update(),
      this.ApplyModified();
  }
  OnUpdate() {
    var e = this.Context.MarkItemEntity;
    e.GamePlay.IsDisable
      ? (this.SetVisible(!0),
        (e.Resource.TopRightIconPath =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            WorldMapDefine_1.BLOCK_MARK_ICON_PATH,
          )),
        this.Context.SetSpriteByPathAction(
          e.Resource.TopRightIconPath,
          this.Context.TopRightIconSprite,
          !1,
        ))
      : e.GamePlay.IsFinish
        ? (this.SetVisible(!0),
          (e.Resource.TopRightIconPath =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_ComIconFinish",
            )),
          this.Context.SetSpriteByPathAction(
            e.Resource.TopRightIconPath,
            this.Context.TopRightIconSprite,
            !1,
          ))
        : this.SetVisible(!1);
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(1, e);
  }
  OnApplyModified() {
    var e,
      i = this.Context.MarkItemEntity.ViewLifeCircle;
    i.IsChildViewStateDirty(1) &&
      ((e = i.IsChildViewVisible(1)),
      i.SetChildViewVisibleClean(1),
      this.Context.TopRightIconSprite.SetUIActive(e));
  }
}
exports.MarkItemTopRightIconHandle = MarkItemTopRightIconHandle;
//# sourceMappingURL=MarkItemTopRightIconHandle.js.map
