"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationBuffItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  TowerDetailInformationBuffSubItem_1 = require("./TowerDetailInformationBuffSubItem");
class TowerDetailInformationBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.dDo = void 0),
      (this.CDo = void 0),
      (this.gDo = (e, t, i) => {
        t =
          new TowerDetailInformationBuffSubItem_1.TowerDetailInformationBuffSubItem(
            t,
          );
        return t.Update(e), { Key: i, Value: t };
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
    ];
  }
  OnStart() {
    this.CDo = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(1),
      this.gDo,
    );
  }
  Update(e) {
    (this.dDo = e), this.Og();
  }
  Og() {
    this.CDo.RebuildLayoutByDataNew(this.dDo.Buffs);
  }
  OnBeforeDestroy() {
    this.CDo.ClearChildren();
  }
}
exports.TowerDetailInformationBuffItem = TowerDetailInformationBuffItem;
//# sourceMappingURL=TowerDetailInformationBuffItem.js.map
