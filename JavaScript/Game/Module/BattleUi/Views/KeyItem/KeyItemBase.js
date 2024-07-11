"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeyItemBase = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DISABLE_ALPHA = 0.2;
class KeyItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.ActionName = void 0),
      (this.AxisName = void 0),
      (this.Lut = void 0),
      (this.HEe = void 0),
      (this.KeyTexturePath = void 0),
      (this.IsEnable = !1),
      (this.IsGray = !1),
      (this.XBo = () => {
        StringUtils_1.StringUtils.IsEmpty(this.ActionName)
          ? StringUtils_1.StringUtils.IsEmpty(this.AxisName) ||
            this.RefreshAxis(this.AxisName)
          : this.RefreshAction(this.ActionName);
      }),
      (this.Dut = (t) => {
        StringUtils_1.StringUtils.IsEmpty(this.ActionName) ||
          this.ActionName !== t ||
          this.RefreshAction(this.ActionName);
      }),
      (this.Rut = (t) => {
        StringUtils_1.StringUtils.IsEmpty(this.AxisName) ||
          this.AxisName !== t ||
          this.RefreshAxis(this.AxisName);
      }),
      (this.Uut = (t, i) => {
        this.OnInputAction(t, i);
      });
  }
  OnStartImplement() {
    this.Ore();
  }
  OnBeforeDestroyImplement() {
    this.UnBindAction(), this.kre(), this.Reset();
  }
  Reset() {
    (this.Lut = void 0),
      (this.HEe = void 0),
      (this.ActionName = void 0),
      (this.AxisName = void 0),
      (this.KeyTexturePath = void 0);
  }
  SetCustomKeyName(t) {
    this.Lut = t;
  }
  RefreshAction(t) {
    if (
      (this.UnBindAction(),
      (this.ActionName = t),
      (this.AxisName = void 0),
      this.Lut)
    )
      this.RefreshKey(InputSettings_1.InputSettings.GetKey(this.Lut));
    else {
      t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        this.ActionName,
      );
      if (!t)
        return void (
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "[KeyItem]刷新按键图标时找不到对应Action",
            ["actionName", this.ActionName],
          )
        );
      t = t.GetCurrentPlatformKey();
      if (!t)
        return void (
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "[KeyItem]刷新按键图标时Action没有对应按键",
            ["actionName", this.ActionName],
          )
        );
      this.RefreshKey(t);
    }
    this.BindAction();
  }
  RefreshAxis(t) {
    this.UnBindAction(),
      (this.AxisName = t),
      (this.ActionName = void 0),
      this.Lut
        ? this.RefreshKey(InputSettings_1.InputSettings.GetKey(this.Lut))
        : (t = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t)) &&
          (t = t.GetCurrentPlatformKey()) &&
          this.RefreshKey(t.GetKey());
  }
  BindAction() {
    StringUtils_1.StringUtils.IsEmpty(this.ActionName) ||
      InputDistributeController_1.InputDistributeController.BindAction(
        this.ActionName,
        this.Uut,
      );
  }
  UnBindAction() {
    StringUtils_1.StringUtils.IsEmpty(this.ActionName) ||
      InputDistributeController_1.InputDistributeController.UnBindAction(
        this.ActionName,
        this.Uut,
      );
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAxisKeyChanged,
        this.Rut,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAxisKeyChanged,
        this.Rut,
      );
  }
  OnInputAction(t, i) {}
  RefreshKey(t) {
    var i = t.GetKeyName();
    this.HEe !== i &&
      ((t = t.GetKeyIconPath()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          8,
          "[KeyItem]设置按键图片",
          ["actionName", this.ActionName],
          ["keyName", i],
          ["keyTexturePath", t],
        ),
      StringUtils_1.StringUtils.IsEmpty(t) ? this.SetKeyText(i) : this.Aut(t),
      (this.HEe = i));
  }
  RefreshKeyByName(t) {
    t = InputSettings_1.InputSettings.GetKey(t);
    t && this.RefreshKey(t);
  }
  SetKeyText(t) {
    var i = this.GetKeyText();
    this.GetKeyTexture()?.SetUIActive(!1),
      i &&
        (StringUtils_1.StringUtils.IsEmpty(t)
          ? i.SetUIActive(!1)
          : (i.SetText(t), i.SetUIActive(!0)));
  }
  SetLocalText(t, ...i) {
    var e = this.GetKeyText();
    this.GetKeyTexture()?.SetUIActive(!1),
      e &&
        (StringUtils_1.StringUtils.IsEmpty(t)
          ? e.SetUIActive(!1)
          : (LguiUtil_1.LguiUtil.SetLocalText(e, t, ...i), e.SetUIActive(!0)));
  }
  Aut(t) {
    this.GetKeyText()?.SetUIActive(!1);
    const i = this.GetKeyTexture();
    i &&
      (i.SetUIActive(!1),
      StringUtils_1.StringUtils.IsEmpty(t) ||
        ((this.KeyTexturePath = t),
        this.SetTextureByPath(t, i, void 0, () => {
          this.KeyTexturePath === t &&
            (i.SetSizeFromTexture(), i.SetUIActive(!0));
        })));
  }
  SetEnable(t, i = !1) {
    (this.IsEnable === t && !i) ||
      (t ? this.RootItem.SetAlpha(1) : this.RootItem.SetAlpha(DISABLE_ALPHA),
      (this.IsEnable = t));
  }
  SetGray(t) {
    this.IsGray !== t && ((this.IsGray = t), this.OnSetGray());
  }
  OnSetGray() {}
}
exports.KeyItemBase = KeyItemBase;
//# sourceMappingURL=KeyItemBase.js.map
