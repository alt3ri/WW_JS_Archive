"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CaveHoleMarkItemChildIconHandle = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkItemChildIconHandle_1 = require("./MarkItemChildIconHandle");
class CaveHoleMarkItemChildIconHandle extends MarkItemChildIconHandle_1.MarkItemChildIconHandle {
  OnUpdate() {
    var e,
      a = this.Context.MarkItem;
    a.IsMultiMap()
      ? ((e = a.IsSelectThisFloor),
        (a = a.LocateInGround()),
        this.SetVisible(!(a && e)),
        (this.Context.MarkItemEntity.Resource.ChildIconPath =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            e
              ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH
              : WorldMapDefine_1.MULTI_MAP_ICON_PATH,
          )))
      : this.SetVisible(!1);
  }
}
exports.CaveHoleMarkItemChildIconHandle = CaveHoleMarkItemChildIconHandle;
//# sourceMappingURL=CaveHoleMarkItemChildIconHandle.js.map
