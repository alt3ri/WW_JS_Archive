"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQuestShapePanelItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  FishingDefine_1 = require("../../FishingDefine");
class FishingQuestShapePanelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.RowIndex = 0), (this.ColumnIndex = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, i, s) {
    (this.RowIndex = e[0]), (this.ColumnIndex = e[1]);
  }
  SetGirdSprite(e, i) {
    if (0 === e) {
      const s = this.GetSprite(0),
        i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.EMPTY_SPRITE,
        );
      void this.SetSpriteByPath(i, s, !1);
    } else {
      const s = this.GetSprite(0);
      this.SetSpriteByPath(i, s, !1);
    }
  }
}
exports.FishingQuestShapePanelItem = FishingQuestShapePanelItem;
//# sourceMappingURL=FishingQuestShapePanelItem.js.map
