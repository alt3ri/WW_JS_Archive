"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class BuildingRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.$pt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1))),
      this.HideDialog();
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
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
  ShowDialog(e) {
    this.GetItem(1)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e),
      this.$pt?.PlayLevelSequenceByName("Start");
  }
  HideDialog() {
    this.GetItem(1)?.SetUIActive(!1);
  }
}
exports.BuildingRoleItem = BuildingRoleItem;
//# sourceMappingURL=BuildingRoleItem.js.map
