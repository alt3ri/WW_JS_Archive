"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonRoleGachaPoolItem = void 0);
const UE = require("ue"),
  GachaPoolItem_1 = require("./GachaPoolItem"),
  RoleDescribeComponent_1 = require("./RoleDescribeComponent");
class CommonRoleGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments), (this.iHt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    this.iHt = [];
    var e = [];
    for (const s of [1, 2, 3]) {
      var o = this.GetItem(s);
      if (!o) break;
      var t = new RoleDescribeComponent_1.RoleDescribeComponent();
      e.push(t.CreateThenShowByActorAsync(o.GetOwner())), this.iHt.push(t);
    }
    await Promise.all(e);
  }
  Refresh() {
    if (this.GachaViewInfo) {
      var o = this.GachaViewInfo.ShowIdList;
      for (let e = 0; e < o.length && e < this.iHt.length; e++)
        this.iHt[e].Update(o[e]);
      var e = UE.Color.FromHex(this.GachaViewInfo.ThemeColor);
      this.GetTexture(4).SetColor(e);
    }
  }
}
exports.CommonRoleGachaPoolItem = CommonRoleGachaPoolItem;
//# sourceMappingURL=CommonRoleGachaPoolItem.js.map
