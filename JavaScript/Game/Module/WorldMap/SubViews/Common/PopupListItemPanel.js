"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupListItemPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class PopupListItemPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UISprite],
    ];
  }
  SetTxtLActive(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetTxtLNewTxt(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
  }
  SetTxtRActive(t) {
    this.GetText(1).SetUIActive(t);
  }
  SetTxtRNewTxt(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...e);
  }
  SetTxtRTxt(t) {
    this.GetText(1).SetText(t);
  }
  SetTxtRTxtColor(t) {
    this.GetText(1).SetColor(UE.Color.FromHex(t));
  }
  SetBtnHelpA2Active(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
  SetTexIconActive(t) {
    this.GetTexture(3).SetUIActive(t);
  }
  SetTexIcon(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, this.GetTexture(3));
  }
  SetIconActive(t) {
    this.GetSprite(4).SetUIActive(t);
  }
  SetIconSprite(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, this.GetSprite(4), !1);
  }
}
exports.PopupListItemPanel = PopupListItemPanel;
//# sourceMappingURL=PopupListItemPanel.js.map
