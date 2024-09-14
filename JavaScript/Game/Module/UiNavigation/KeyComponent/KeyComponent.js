"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeyBaseComponent = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
  PcAndGamepadProgressBar_1 = require("./PcAndGamepadProgressBar");
class KeyBaseComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._wo = !1),
      (this.uwo = void 0),
      (this.cwo = void 0),
      (this.HEe = ""),
      (this.mwo = !1),
      (this.MSo = "");
  }
  async OnBeforeStartAsync() {
    this.mwo &&
      ((this.cwo = new PcAndGamepadProgressBar_1.PcAndGamepadProgressBar()),
      await this.cwo.Init(this.GetSquareItem(), this.GetCircleItem())),
      this.HEe && (await this.dwo(this.HEe)),
      this.But(this.mwo);
  }
  SetKeyName(e) {
    this.HEe = e;
  }
  SetIsNeedLongPress(e) {
    this.mwo = e;
  }
  RefreshKeyIcon(e) {
    this.SetKeyName(e), this.Cwo(e);
  }
  RefreshNameText(e) {
    !StringUtils_1.StringUtils.IsEmpty(e) &&
    e !== HotKeyViewDefine_1.SPECIAL_TEXT &&
    (e = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyText(e))
      ? (this.SetNameTextById(e), this.SetNameTextVisible(!0))
      : this.SetNameTextVisible(!1);
  }
  Cwo(e) {
    this.dwo(e);
  }
  async dwo(e) {
    const t = this.GetKeyTexture();
    if (t && !StringUtils_1.StringUtils.IsEmpty(e)) {
      var i = InputSettings_1.InputSettings.GetKey(e);
      if (i) {
        i = i.GetKeyIconPath();
        if (!StringUtils_1.StringUtils.IsEmpty(i) && i !== this.MSo) {
          "0" === (this.MSo = i) &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiNavigationHotKey",
              11,
              "读取到图片路径为0的情况",
              ["keyName", e],
            );
          const s = new CustomPromise_1.CustomPromise();
          this.gwo(!1),
            this.SetTextureByPath(i, t, void 0, () => {
              t.SetSizeFromTexture(), s.SetResult();
            }),
            await s.Promise,
            this.gwo(!0);
        }
      }
    }
  }
  gwo(e) {
    var t = this.GetKeyTexture();
    t && t.SetUIActive(e);
  }
  SetNameTextById(e) {
    var t;
    this._wo ||
      ((t = this.GetNameText()) && LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
  }
  SetNameText(e) {
    var t = this.GetNameText();
    t && t.SetText(e);
  }
  SetNameTextForce(e) {
    this._wo = e;
  }
  GetIsForceSetText() {
    return this._wo;
  }
  SetNameTextVisible(e) {
    var t = this.GetNameText();
    t && t.SetUIActive(e);
  }
  But(e) {
    var t = this.GetLongPressItem();
    t && t.bIsUIActive !== e && t.SetUIActive(e);
  }
  SetLongPressState(e) {
    this.but(e), this.fwo(0 === e);
  }
  but(e) {
    this.cwo && this.cwo.SetProgressPercent(e);
  }
  fwo(e) {
    var t = this.GetLongPressTipTexture();
    t && t.SetUIActive(e);
  }
  SetHotKeyType(e) {
    this.uwo = e;
  }
  SetActive(e) {
    super.SetActive(e), this.uwo?.KeyItemNotifySetActive(e);
  }
}
exports.KeyBaseComponent = KeyBaseComponent;
//# sourceMappingURL=KeyComponent.js.map
