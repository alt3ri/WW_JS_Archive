"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectSmallItemGrid = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CollectSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, l, o) {
    var e = {
      Type: 4,
      Data: e,
      ItemConfigId: e.ItemInfo.Id,
      BottomText: e.Count.toString(),
    };
    var e = (this.Apply(e), ModelManager_1.ModelManager.MingSuModel);
    const r = e.GetCurrentDragonPoolId();
    const t = e.CurrentPreviewLevel;
    const i = e.GetTargetDragonPoolLevelById(r);
    const a = e.GetTargetDragonPoolMaxLevelById(r);
    if (t === i + 1 || (t === i && t === a)) {
      if (e.GetTargetDragonPoolActiveById(r) === 2)
        return void this.SetReceivedVisible(!0);
    } else if (t <= i) return void this.SetReceivedVisible(!0);
    this.SetReceivedVisible(!1);
  }
}
exports.CollectSmallItemGrid = CollectSmallItemGrid;
// # sourceMappingURL=CollectSmallItemGrid.js.map
