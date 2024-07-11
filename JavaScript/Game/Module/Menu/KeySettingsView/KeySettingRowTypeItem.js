"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowTypeItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowTypeItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  Refresh(e) {
    let i, t, s;
    e.GetRowType() === 1 &&
      ((s = e.KeyTypeIconSpritePath),
      (i = this.GetSprite(0)),
      (t = this.GetText(1)),
      StringUtils_1.StringUtils.IsEmpty(s)
        ? i.SetUIActive(!1)
        : (this.SetSpriteByPath(e.KeyTypeIconSpritePath, i, !1),
          i.SetUIActive(!0)),
      (s = e.KeyTypeName),
      StringUtils_1.StringUtils.IsEmpty(s)
        ? t.SetUIActive(!1)
        : (LguiUtil_1.LguiUtil.SetLocalTextNew(t, s), t.SetUIActive(!0)));
  }
}
exports.KeySettingRowTypeItem = KeySettingRowTypeItem;
// # sourceMappingURL=KeySettingRowTypeItem.js.map
