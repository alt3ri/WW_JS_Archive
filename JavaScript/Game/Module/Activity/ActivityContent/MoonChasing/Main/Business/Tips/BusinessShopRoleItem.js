"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessShopRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil");
class BusinessShopRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.RoleId = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(!1);
  }
  SwitchRoleSpineAnim(i, t) {
    this.GetSpine(0).SetAnimation(0, i, !0)?.SetMixDuration(t);
  }
  Refresh(i) {
    this.RoleId = i;
  }
  async RefreshAsync() {
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
      this.RoleId,
    );
    await this.SetSpineAssetByPath(
      i.SmallSpineAtlas,
      i.SmallSpineSkeletonData,
      this.GetSpine(0),
    ),
      this.GetSpine(0).SetAnimation(0, "idle", !0);
  }
  ShowDialog(i) {
    this.GetItem(1)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
  }
  ChangeRotation() {
    this.GetItem(3)?.SetUIRelativeRotation(new UE.Rotator(180, 0, 0));
  }
}
exports.BusinessShopRoleItem = BusinessShopRoleItem;
//# sourceMappingURL=BusinessShopRoleItem.js.map
