"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  TowerDetailInformationBuffItem_1 = require("./TowerDetailInformationBuffItem"),
  TowerDetailInformationMonsterItem_1 = require("./TowerDetailInformationMonsterItem");
class TowerDetailInformationItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.fDo = void 0),
      (this.ppt = void 0),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    (this.fDo =
      new TowerDetailInformationBuffItem_1.TowerDetailInformationBuffItem(
        this.GetItem(1),
      )),
      (this.ppt =
        new TowerDetailInformationMonsterItem_1.TowerDetailInformationMonsterItem(
          this.GetItem(2),
        ));
  }
  pDo() {
    this.GetItem(1).SetUIActive(!1), this.GetItem(2).SetUIActive(!1);
  }
  Update(e) {
    this.pDo(),
      0 === e.Type
        ? (this.GetItem(1).SetUIActive(!0),
          this.fDo.Update(e.TowerDetailBuffData))
        : (this.GetItem(2).SetUIActive(!0),
          this.ppt.Update(e.MonsterData, e.Type)),
      this.vDo(e),
      this.MDo(e.Type);
  }
  OnBeforeDestroy() {
    this.ppt.Destroy(), this.fDo.Destroy();
  }
  vDo(e) {
    this.GetText(0).SetText(e.Title);
  }
  MDo(e) {
    let t = 0 !== e && 1 !== e ? !1 : !0;
    this.GetItem(3).SetUIActive(t);
  }
}
exports.TowerDetailInformationItem = TowerDetailInformationItem;
//# sourceMappingURL=TowerDetailInformationItem.js.map
