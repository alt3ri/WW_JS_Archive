"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTagMediumIconItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleTagMediumIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  Refresh(e, i, r) {
    let t;
    let o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(e);
    void 0 === o
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 59, "RoleTagMediumIconItem无效tagId", [
          "TagId",
          e,
        ])
      : ((e = this.GetSprite(2)),
        (t = this.GetText(1)),
        this.SetSpriteByPath(o.TagIcon, e, !1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, o.TagName),
        (o = UE.Color.FromHex(o.TagNameColor)),
        this.GetSprite(0).SetColor(o),
        e.SetColor(o),
        t.SetColor(o));
  }
}
exports.RoleTagMediumIconItem = RoleTagMediumIconItem;
// # sourceMappingURL=RoleTagMediumIconItem.js.map
