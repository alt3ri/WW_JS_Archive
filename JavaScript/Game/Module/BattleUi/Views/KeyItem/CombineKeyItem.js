"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombineKeyItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const InputSettings_1 = require("../../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager");
const KeyItemBase_1 = require("./KeyItemBase");
class CombineKeyItem extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments), (this.__t = "");
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  GetKeyText() {}
  GetKeyTexture() {
    return this.GetTexture(0);
  }
  RefreshAction(t) {
    super.RefreshAction(t),
      this.ActionName !== t &&
        (this.UnBindAction(),
        (this.ActionName = t),
        (this.AxisName = void 0),
        this.BindAction());
    const e =
      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
        this.ActionName,
      );
    if (e) {
      const i = new Map();
      if ((e.GetCurrentPlatformKeyNameMap(i), i))
        for (const [s, r] of i)
          return (
            this.RefreshKey(InputSettings_1.InputSettings.GetKey(s)),
            this.RefreshSubKey(InputSettings_1.InputSettings.GetKey(r)),
            this.GetTexture(2).SetUIActive(!0),
            void this.GetText(1).SetUIActive(!0)
          );
    }
    this.GetTexture(2).SetUIActive(!1),
      this.GetText(1).SetUIActive(!1),
      InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        this.ActionName,
      ) && super.RefreshAction(t);
  }
  RefreshSubKey(t) {
    const e = t.GetKeyName();
    if (this.__t !== e) {
      t = t.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        const i = this.GetTexture(2);
        i.SetUIActive(!1),
          this.SetTextureByPath(t, i, void 0, () => {
            i.SetSizeFromTexture(), i.SetUIActive(!0);
          });
      }
      this.__t = e;
    }
  }
  OnSetGray() {
    var t = this.GetTexture(0);
    var t = (t.SetChangeColor(this.IsGray, t.changeColor), this.GetTexture(2));
    t.SetChangeColor(this.IsGray, t.changeColor);
  }
}
exports.CombineKeyItem = CombineKeyItem;
// # sourceMappingURL=CombineKeyItem.js.map
