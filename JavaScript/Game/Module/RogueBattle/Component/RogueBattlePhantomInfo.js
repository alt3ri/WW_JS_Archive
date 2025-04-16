"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattlePhantomInfo = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattlePhantomInfoAffix_1 = require("./RogueBattlePhantomInfoAffix");
class RogueBattlePhantomInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.AffixLayout = void 0),
      (this.gVc = () =>
        new RogueBattlePhantomInfoAffix_1.RogueBattlePhantomInfoAffix());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    this.AffixLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.gVc,
    );
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetPhantomData(),
      t = [];
    e
      ? (t.push(this.AffixLayout.RefreshByDataAsync(e.Pac.rVc)),
        (e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResPokemon(
          e.Pac.v9n,
        )) &&
          (t.push(this.SetTextureAsync(e.PokemonIcon, this.GetTexture(1))),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.PokemonName)))
      : (t.push(this.AffixLayout.RefreshByDataAsync([])),
        this.GetText(2)?.SetText("")),
      await Promise.all(t);
  }
}
exports.RogueBattlePhantomInfo = RogueBattlePhantomInfo;
//# sourceMappingURL=RogueBattlePhantomInfo.js.map
