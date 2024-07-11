"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterNameItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../../../Util/LguiUtil");
class CharacterNameItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1);
  }
  Refresh(e) {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetCharacterConfig(
      e.Id,
    );
    e.UseScoreName
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.ScoreName)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name),
      this.GetSprite(1).SetColor(UE.Color.FromHex(t.Color));
  }
  SetGoodItemActive(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
}
exports.CharacterNameItem = CharacterNameItem;
//# sourceMappingURL=CharacterNameItem.js.map
