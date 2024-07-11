"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectStageItem = void 0);
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CalabashCollectStageItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  Refresh(t, e, s) {
    var r = this.GetText(0);
    var r =
      (r.ShowTextNew(t.Info),
      r.SetChangeColor(t.IsUnlock, r.changeColor),
      this.GetText(1));
    r.SetText(t.Num.toString()),
      r.SetChangeColor(t.IsUnlock, r.changeColor),
      this.GetItem(2).SetUIActive(t.IsUnlock),
      this.GetItem(3).SetUIActive(!t.IsUnlock);
  }
}
exports.CalabashCollectStageItem = CalabashCollectStageItem;
// # sourceMappingURL=CalabashCollectStageItem.js.map
