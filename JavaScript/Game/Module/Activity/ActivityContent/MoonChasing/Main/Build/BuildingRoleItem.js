"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BuildingRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(!1);
  }
  async RefreshSpine(e) {
    e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e);
    await this.SetSpineAssetByPath(
      e.SmallSpineAtlas,
      e.SmallSpineSkeletonData,
      this.GetSpine(0),
    ),
      this.GetSpine(0).SetAnimation(0, "idle", !0);
  }
}
exports.BuildingRoleItem = BuildingRoleItem;
//# sourceMappingURL=BuildingRoleItem.js.map
