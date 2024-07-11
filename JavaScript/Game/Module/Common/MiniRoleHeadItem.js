"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MiniRoleHeadItem = void 0);
const UE = require("ue");
const RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class MiniRoleHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super(),
      this.CreateThenShowByResourceIdAsync("UiItem_MiniRoleHead_Prefab", e, !1),
      (this.Gxt = i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    let e;
    const i = this.GetTexture(0);
    i &&
      (e = RoleInfoById_1.configRoleInfoById.GetConfig(this.Gxt)) &&
      (e = e.RoleHeadIconBig) !== "" &&
      e.length !== 0 &&
      this.SetRoleIcon(e, i, this.Gxt);
  }
}
exports.MiniRoleHeadItem = MiniRoleHeadItem;
// # sourceMappingURL=MiniRoleHeadItem.js.map
