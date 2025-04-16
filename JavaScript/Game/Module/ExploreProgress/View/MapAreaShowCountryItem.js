"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapAreaShowCountryItem = void 0);
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
class MapAreaShowCountryItem extends CommonTabItem_1.CommonTabItem {
  OnRefresh(e, t, o) {
    this.UpdateTabIcon(e.Data?.GetIcon() ?? ""),
      this.GOl(e.Data?.GetTitleData());
  }
  GOl(e) {
    e = !!e?.Args[0]?.HasCanTakeStageReward();
    this.SetRedDotState(e);
  }
}
exports.MapAreaShowCountryItem = MapAreaShowCountryItem;
//# sourceMappingURL=MapAreaShowCountryItem.js.map
