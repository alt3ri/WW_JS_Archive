"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpineRoleGachaPoolItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  GachaPoolItem_1 = require("./GachaPoolItem"),
  RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class SpineRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments), (this.mWt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.SpineSkeletonAnimationComponent],
    ];
  }
  async OnBeforeStartAsync() {
    (this.mWt = new RoleDescribeComponent_1.RoleDescribeComponent()),
      await this.mWt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh() {
    var e;
    this.GachaViewInfo &&
      ((e = this.GachaViewInfo.ShowIdList[0]),
      this.mWt.Update(e, 6 !== this.GachaType),
      StringUtils_1.StringUtils.IsBlank(this.GachaViewInfo.TextTexture) ||
        this.SetTextureByPath(
          this.GachaViewInfo.TextTexture,
          this.GetTexture(1),
        ),
      this.GetSpine(2).SetAnimation(0, "idle", !0));
  }
  SetDescUiActive(e) {
    this.mWt.SetUiActive(e);
  }
}
exports.SpineRoleGachaPoolItem = SpineRoleGachaPoolItem;
//# sourceMappingURL=SpineRoleGachaPoolItem.js.map
