"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRoundItem = void 0);
const UE = require("ue"),
  LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../../Module/Util/Grid/GridProxyAbstract"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  fishingIconPath = {
    [1]: "SP_Fishing_IconMaterial",
    0: "SP_Fishing_IconFish",
  };
class FishingRoundItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.GetSprite(1).SetUIActive(!1);
  }
  Refresh(e, i, r) {}
  ShowIcon(e) {
    const i = this.GetSprite(1);
    (e = fishingIconPath[e]),
      (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e));
    this.SetSpriteByPath(e, i, !1, void 0, () => {
      i.SetUIActive(!0),
        this.LevelSequencePlayer.PlayLevelSequenceByName("Fish");
    });
  }
}
exports.FishingRoundItem = FishingRoundItem;
//# sourceMappingURL=FishingRoundItem.js.map
