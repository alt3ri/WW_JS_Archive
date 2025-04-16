"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemporaryTeleportMarkItemChildIconHandle = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkItemChildIconHandle_1 = require("./MarkItemChildIconHandle");
class TemporaryTeleportMarkItemChildIconHandle extends MarkItemChildIconHandle_1.MarkItemChildIconHandle {
  OnUpdate() {
    var e;
    super.OnUpdate(),
      this.Context.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(7) ||
        ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          WorldMapDefine_1.TEMPORARY_TELEPORT_NORMAL_ICON_PATH,
        )),
        (this.Context.MarkItemEntity.Resource.ChildIconPath = e),
        this.SetVisible(!0));
  }
}
exports.TemporaryTeleportMarkItemChildIconHandle =
  TemporaryTeleportMarkItemChildIconHandle;
//# sourceMappingURL=TemporaryTeleportMarkItemChildIconHandle.js.map
