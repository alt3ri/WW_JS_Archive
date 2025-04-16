"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGridDecoration = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GRID_TAKE_SPRITE =
    "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_PieceFlag.SP_PieceFlag";
class MapRogueGridDecoration extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Amt(e) {
    const i = this.GetSprite(0);
    this.SetSpriteByPath(e, i, !1, void 0, (e) => {
      e && i.SetUIActive(!0);
    });
  }
  Refresh(e) {
    var i = 0 <= e.ExtraPathIndex;
    this.GetSprite(0).SetUIActive(!1),
      e.IsExplore && 0 !== e.GridEventId
        ? this.Amt(GRID_TAKE_SPRITE)
        : i &&
          (i =
            ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(
              e.GridTypeId,
            )) &&
          ((i = Array.from(i.DecorationPath.keys())),
          this.Amt(i[e.ExtraPathIndex]));
  }
  SetVision(e) {
    this.SetActive(e);
  }
}
exports.MapRogueGridDecoration = MapRogueGridDecoration;
//# sourceMappingURL=MapRogueGridDecoration.js.map
