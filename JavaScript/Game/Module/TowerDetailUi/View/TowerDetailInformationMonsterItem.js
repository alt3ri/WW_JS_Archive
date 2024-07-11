"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationMonsterItem = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const TowerDetailInformationMonsterSubItem_1 = require("./TowerDetailInformationMonsterSubItem");
class TowerDetailInformationMonsterItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.MonsterLayout = void 0),
      (this.ILo = void 0),
      (this.jli = (e, t, i) => {
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
        this.jli,
      ));
  }
  Update(e, t) {
    (this.ILo = e), this.Og();
  }
  Og() {
    const e = this.ILo.MonsterInfos;
    this.MonsterLayout.RebuildLayoutByDataNew(e);
  }
  OnBeforeDestroy() {
    this.MonsterLayout.ClearChildren();
  }
}
exports.TowerDetailInformationMonsterItem = TowerDetailInformationMonsterItem;
// # sourceMappingURL=TowerDetailInformationMonsterItem.js.map
