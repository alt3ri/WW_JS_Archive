"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerMonsterWordItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ShipTowerMonsterWordInfoItem_1 = require("./ShipTowerMonsterWordInfoItem");
class ShipTowerMonsterWordItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LD_ = void 0),
      (this.Bqe = () => {
        return new ShipTowerMonsterWordInfoItem_1.ShipTowerMonsterWordInfoItem();
      });
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.LD_ = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.Bqe,
      ));
  }
  UpdateData(e) {
    this.GetText(0).SetText(e.Title), this.LD_?.RefreshByData(e.InfoList);
  }
}
exports.ShipTowerMonsterWordItem = ShipTowerMonsterWordItem;
//# sourceMappingURL=ShipTowerMonsterWordItem.js.map
