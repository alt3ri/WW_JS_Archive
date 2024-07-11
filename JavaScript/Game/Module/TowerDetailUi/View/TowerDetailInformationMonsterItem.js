"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationMonsterItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  TowerDetailInformationMonsterSubItem_1 = require("./TowerDetailInformationMonsterSubItem");
class TowerDetailInformationMonsterItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.MonsterLayout = void 0),
      (this.EDo = void 0),
      (this.j1i = (e, t, i) => {
        t =
          new TowerDetailInformationMonsterSubItem_1.TowerDetailInformationMonsterSubItem(
            t,
          );
        return t.Update(e.MonsterId, e.ShowLevel), { Key: i, Value: t };
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIGridLayout],
    ];
  }
  OnStart() {
    this.GetItem(1).SetUIParent(this.GetGridLayout(2).GetRootComponent()),
      (this.MonsterLayout = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetGridLayout(2),
        this.j1i,
      ));
  }
  Update(e, t) {
    (this.EDo = e), this.Og();
  }
  Og() {
    var e = this.EDo.MonsterInfos;
    this.MonsterLayout.RebuildLayoutByDataNew(e);
  }
  OnBeforeDestroy() {
    this.MonsterLayout.ClearChildren();
  }
}
exports.TowerDetailInformationMonsterItem = TowerDetailInformationMonsterItem;
//# sourceMappingURL=TowerDetailInformationMonsterItem.js.map
