"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTokenGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RogueBattleTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Data = void 0), (this.SelectCallback = void 0);
  }
  OnRefresh(e, t, i) {
    var o = (this.Data = e).wac;
    o &&
      (o =
        ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(
          o.v9n,
        )) &&
      ((e = {
        Type: 4,
        Data: e,
        IconPath: o.BuffIcon,
        QualityId: o.Quality,
        QualityType: "MediumItemGridQualitySpritePath",
        BottomTextId: o.BuffName,
      }),
      this.Apply(e));
  }
  OnExtendToggleStateChanged(e) {
    1 === e && this.OnSelected(!0);
  }
  OnSelected(e) {
    this.SetSelected(!0), e && this.SelectCallback?.(this.GridIndex, this.Data);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.RogueBattleTokenGrid = RogueBattleTokenGrid;
//# sourceMappingURL=RogueBattleTokenGrid.js.map
