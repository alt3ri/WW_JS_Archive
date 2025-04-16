"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItemChildIconHandle = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkItemChildIconHandle_1 = require("./MarkItemChildIconHandle");
class TeleportMarkItemChildIconHandle extends MarkItemChildIconHandle_1.MarkItemChildIconHandle {
  OnUpdate() {
    var e = this.Context.MarkItem;
    e.IsDungeonEntrance
      ? (this.SetVisible(!e.IsFogUnlock),
        e.IsFogUnlock ||
          (this.Context.MarkItemEntity.Resource.ChildIconPath =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              WorldMapDefine_1.SUB_ICON_PATH,
            )))
      : super.OnUpdate();
  }
}
exports.TeleportMarkItemChildIconHandle = TeleportMarkItemChildIconHandle;
//# sourceMappingURL=TeleportMarkItemChildIconHandle.js.map
