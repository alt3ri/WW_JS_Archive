"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerMonsterListItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  ShipTowerMonsterInfoItem_1 = require("./ShipTowerMonsterInfoItem");
class ShipTowerMonsterListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LD_ = void 0),
      (this.Bqe = () => {
        return new ShipTowerMonsterInfoItem_1.ShipTowerMonsterInfoItem();
      });
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.LD_ = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.Bqe,
      ));
  }
  UpdateData(e) {
    this.GetText(0).SetText(e.Title),
      this.LD_?.RefreshByData(e.MonsterInfoList);
  }
}
exports.ShipTowerMonsterListItem = ShipTowerMonsterListItem;
//# sourceMappingURL=ShipTowerMonsterListItem.js.map
