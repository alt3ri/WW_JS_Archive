"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonLevelUpAttributeItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil");
class CommonLevelUpAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
    ];
  }
  Refresh(t) {
    void 0 !== t.IconPath &&
      this.SetTextureByPath(t.IconPath, this.GetTexture(4)),
      this.GetTexture(4).SetUIActive(void 0 !== t.IconPath),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name),
      t.PreText
        ? this.GetText(1).SetText(t.PreText)
        : this.GetText(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(t.ShowArrow ?? !1),
      t.CurText
        ? this.GetText(3).SetText(t.CurText)
        : this.GetText(3).SetUIActive(!1);
  }
}
exports.CommonLevelUpAttributeItem = CommonLevelUpAttributeItem;
//# sourceMappingURL=CommonLevelUpAttributeItem.js.map
