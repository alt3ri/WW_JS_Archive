"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerSettlementDeTermLayoutItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  BabelTowerSettlementDeTermItem_1 = require("./BabelTowerSettlementDeTermItem");
class BabelTowerSettlementDeTermLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.TemplateActor = void 0),
      (this.r1c = void 0),
      (this.jTc = () =>
        new BabelTowerSettlementDeTermItem_1.BabelTowerSettlementDeTermItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.r1c = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.jTc,
      this.TemplateActor,
    );
  }
  Refresh(e, t, r) {
    this.r1c?.RefreshByData(e);
  }
  SetLayoutPadding(e) {
    this.GetHorizontalLayout(0).SetPadding(e);
  }
}
exports.BabelTowerSettlementDeTermLayoutItem =
  BabelTowerSettlementDeTermLayoutItem;
//# sourceMappingURL=BabelTowerSettlementDeTermLayoutItem.js.map
