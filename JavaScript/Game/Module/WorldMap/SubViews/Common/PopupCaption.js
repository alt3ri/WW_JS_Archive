"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupCaption = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class PopupCaption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.OnCloseCall = void 0),
      (this.OnClickCloseBtn = () => {
        this.OnCloseCall?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.OnClickCloseBtn]]);
  }
  SetTitleIcon(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(e, this.GetSprite(0), !1);
  }
  SetTitleLocalTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.PopupCaption = PopupCaption;
//# sourceMappingURL=PopupCaption.js.map
