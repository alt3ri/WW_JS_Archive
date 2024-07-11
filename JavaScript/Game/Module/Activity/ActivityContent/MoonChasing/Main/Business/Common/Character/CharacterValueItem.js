"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterValueItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract");
class CharacterValueItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.OriginalProgressWidth = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
    ];
  }
  OnStart() {
    (this.OriginalProgressWidth = this.GetSprite(1).Width),
      this.GetSprite(2).SetFillAmount(0);
  }
  Refresh(e) {
    this.GetText(0).SetText(e.CurrentValue.toString()),
      this.RefreshProgress(e.CurrentValue, e.MaxValue),
      this.RefreshSprite(e.Id);
  }
  RefreshCurrentValue(e) {
    this.GetText(0).SetText(e.toString());
  }
  RefreshProgress(e, r) {
    e = this.OriginalProgressWidth * (e < r ? e / r : 1);
    this.GetSprite(1)?.SetWidth(e);
  }
  RefreshSprite(e) {
    e = ConfigManager_1.ConfigManager.BusinessConfig.GetCharacterConfig(e);
    this.SetSpriteByPath(e.BarSprite, this.GetSprite(1), !1);
  }
  RefreshProgressAdd(e, r) {
    e /= r;
    this.GetSprite(2).SetFillAmount(e);
  }
  SetLightProgressWidth() {
    var e = this.GetSprite(1).GetWidth();
    this.GetSprite(3)?.SetWidth(e);
  }
}
exports.CharacterValueItem = CharacterValueItem;
//# sourceMappingURL=CharacterValueItem.js.map
