"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssItemSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
class DangoAbyssItemSmallItemGrid extends SmallItemGrid_1.SmallItemGrid {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e) {
    var t = e.GetConfig(),
      r =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(
          e.GetConfigId(),
        );
    t &&
      r &&
      ((r = {
        Type: 4,
        Data: e,
        ItemConfigId: e.GetConfigId(),
        BottomTextId: t.Name,
        IsLockVisible: e.GetIsLock(),
      }),
      this.Apply(r));
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.DangoAbyssItemSmallItemGrid = DangoAbyssItemSmallItemGrid;
//# sourceMappingURL=DangoAbyssItemSmallItemGrid.js.map
