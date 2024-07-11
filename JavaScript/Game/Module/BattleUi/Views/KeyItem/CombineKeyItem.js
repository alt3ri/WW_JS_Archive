"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombineKeyItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
  KeyItemBase_1 = require("./KeyItemBase");
class CombineKeyItem extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments), (this.Tut = ""), (this.LIa = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  Reset() {
    super.Reset(), (this.LIa = void 0);
  }
  GetKeyText() {}
  GetKeyTexture() {
    return this.GetTexture(0);
  }
  RefreshAction(t) {
    this.ActionName !== t &&
      (this.UnBindAction(),
      (this.ActionName = t),
      (this.AxisName = void 0),
      this.BindAction());
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
    var e = t.GetKeyName();
    if (this.Tut !== e) {
      const i = t.GetKeyIconPath();
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        const s = this.GetTexture(2);
        s.SetUIActive(!1),
          (this.LIa = i),
          this.SetTextureByPath(i, s, void 0, () => {
            this.LIa === i && (s.SetSizeFromTexture(), s.SetUIActive(!0));
          });
      }
      this.Tut = e;
    }
  }
  OnSetGray() {
    var t = this.GetTexture(0),
      t = (t.SetChangeColor(this.IsGray, t.changeColor), this.GetTexture(2));
    t.SetChangeColor(this.IsGray, t.changeColor);
  }
}
exports.CombineKeyItem = CombineKeyItem;
//# sourceMappingURL=CombineKeyItem.js.map
