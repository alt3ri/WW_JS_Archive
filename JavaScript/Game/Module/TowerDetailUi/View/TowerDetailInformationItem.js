"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationItem = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TowerDetailInformationBuffItem_1 = require("./TowerDetailInformationBuffItem");
const TowerDetailInformationMonsterItem_1 = require("./TowerDetailInformationMonsterItem");
class TowerDetailInformationItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.MLo = void 0),
      (this.sft = void 0),
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
    (this.MLo =
      new TowerDetailInformationBuffItem_1.TowerDetailInformationBuffItem(
        this.GetItem(1),
      )),
      (this.sft =
        new TowerDetailInformationMonsterItem_1.TowerDetailInformationMonsterItem(
          this.GetItem(2),
        ));
  }
  SLo() {
    this.GetItem(1).SetUIActive(!1), this.GetItem(2).SetUIActive(!1);
  }
  Update(e) {
    this.SLo(),
      e.Type === 0
        ? (this.GetItem(1).SetUIActive(!0),
          this.MLo.Update(e.TowerDetailBuffData))
        : (this.GetItem(2).SetUIActive(!0),
          this.sft.Update(e.MonsterData, e.Type)),
      this.ELo(e),
      this.yLo(e.Type);
  }
  OnBeforeDestroy() {
    this.sft.Destroy(), this.MLo.Destroy();
  }
  ELo(e) {
    this.GetText(0).SetText(e.Title);
  }
  yLo(e) {
    const t = e !== 0 && e !== 1 ? !1 : !0;
    this.GetItem(3).SetUIActive(t);
  }
}
exports.TowerDetailInformationItem = TowerDetailInformationItem;
// # sourceMappingURL=TowerDetailInformationItem.js.map
