"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombineKeyItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  KeyItemBase_1 = require("./KeyItemBase");
class CombineKeyItem extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments),
      (this.Tut = ""),
      (this.CUa = void 0),
      (this.mhh = !1),
      (this.dhh = !1),
      (this.Lah = () => {
        Info_1.Info.IsInGamepad() &&
          this.ActionName === InputMappingsDefine_1.actionMappings.幻象1 &&
          this.RefreshAction(this.ActionName);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  Reset() {
    super.Reset(), (this.CUa = void 0);
  }
  AddEvents() {
    super.AddEvents(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged,
        this.Lah,
      );
  }
  RemoveEvents() {
    super.RemoveEvents(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged,
        this.Lah,
      );
  }
  GetKeyText() {}
  GetKeyTexture() {
    return this.GetTexture(0);
  }
  RefreshAction(t) {
    if (
      (this.ActionName !== t &&
        (this.UnBindAction(),
        (this.ActionName = t),
        (this.AxisName = void 0),
        this.BindAction()),
      !this.Chh())
    ) {
      var e =
        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
          this.ActionName,
        );
      if (e) {
        var i = new Map();
        if ((e.GetCurrentPlatformKeyNameMap(i), i))
          for (var [s, n] of i)
            return (
              this.RefreshKey(InputSettings_1.InputSettings.GetKey(s)),
              this.RefreshSubKey(InputSettings_1.InputSettings.GetKey(n)),
              this.GetTexture(2).SetUIActive(!0),
              this.GetText(1).SetUIActive(!this.mhh),
              this.GetKeyTexture().SetUIActive(!this.mhh),
              void (this.dhh = !0)
            );
      }
      (this.dhh = !1),
        this.GetTexture(2).SetUIActive(!1),
        this.GetText(1).SetUIActive(!1),
        this.GetKeyTexture().SetUIActive(!this.mhh),
        InputSettingsManager_1.InputSettingsManager.GetActionBinding(
          this.ActionName,
        ) && super.RefreshAction(t);
    }
  }
  Chh() {
    if (
      Info_1.Info.IsInGamepad() &&
      this.ActionName === InputMappingsDefine_1.actionMappings.幻象1 &&
      2 ===
        ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData
          ?.SwitchInteractData.State
    ) {
      var t =
        InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
          InputMappingsDefine_1.actionMappings.通用交互,
        );
      if (t) {
        var e = new Map();
        if ((t.GetCurrentPlatformKeyNameMap(e), e))
          for (var [i, s] of e)
            return (
              this.RefreshKey(InputSettings_1.InputSettings.GetKey(i)),
              this.RefreshSubKey(InputSettings_1.InputSettings.GetKey(s)),
              this.GetTexture(2).SetUIActive(!0),
              this.GetText(1).SetUIActive(!this.mhh),
              this.GetKeyTexture().SetUIActive(!this.mhh),
              (this.dhh = !0)
            );
      }
      (this.dhh = !1),
        this.GetTexture(2).SetUIActive(!1),
        this.GetText(1).SetUIActive(!1),
        this.GetKeyTexture().SetUIActive(!this.mhh);
      t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.通用交互,
      )?.GetCurrentPlatformKey();
      if (t) return this.RefreshKey(t), !0;
    }
    return !1;
  }
  RefreshSubKey(t) {
    var e = t.GetKeyName();
    if (this.Tut !== e) {
      const i = t.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        const s = this.GetTexture(2);
        s.SetUIActive(!1),
          (this.CUa = i),
          this.SetTextureByPath(i, s, void 0, () => {
            this.CUa === i && (s.SetSizeFromTexture(), s.SetUIActive(!0));
          });
      }
      this.Tut = e;
    }
  }
  HideMainKey(t) {
    this.mhh !== t &&
      ((this.mhh = t),
      this.GetText(1).SetUIActive(!this.mhh && this.dhh),
      this.GetKeyTexture().SetUIActive(!this.mhh || !this.dhh));
  }
  OnSetGray() {
    var t = this.GetTexture(0),
      t = (t.SetChangeColor(this.IsGray, t.changeColor), this.GetTexture(2));
    t.SetChangeColor(this.IsGray, t.changeColor);
  }
}
exports.CombineKeyItem = CombineKeyItem;
//# sourceMappingURL=CombineKeyItem.js.map
