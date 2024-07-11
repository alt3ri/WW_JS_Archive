"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectSmallItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CollectSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, l, o) {
    var e = {
        Type: 4,
        Data: e,
        ItemConfigId: e.ItemInfo.Id,
        BottomText: e.Count.toString(),
      },
      e = (this.Apply(e), ModelManager_1.ModelManager.MingSuModel),
      r = e.GetCurrentDragonPoolId(),
      t = e.CurrentPreviewLevel,
      i = e.GetTargetDragonPoolLevelById(r),
      a = e.GetTargetDragonPoolMaxLevelById(r);
    if (t === i + 1 || (t === i && t === a)) {
      if (2 === e.GetTargetDragonPoolActiveById(r))
        return void this.SetReceivedVisible(!0);
    } else if (t <= i) return void this.SetReceivedVisible(!0);
    this.SetReceivedVisible(!1);
  }
}
exports.CollectSmallItemGrid = CollectSmallItemGrid;
//# sourceMappingURL=CollectSmallItemGrid.js.map
