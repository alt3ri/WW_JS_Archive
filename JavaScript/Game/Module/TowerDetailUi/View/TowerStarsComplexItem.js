"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerStarsComplexItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class TowerStarsComplexItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  Refresh(t, e, r) {
    this.GetItem(0).SetUIActive(t[0]),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        t[1].DesText,
        ...t[1].Params,
      );
  }
}
exports.TowerStarsComplexItem = TowerStarsComplexItem;
//# sourceMappingURL=TowerStarsComplexItem.js.map
