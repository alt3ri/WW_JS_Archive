"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonMonsterView = void 0);
const ue_1 = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  TowerElementItem_1 = require("../TowerDetailUi/View/TowerElementItem"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  InstanceDungeonMonsterGrid_1 = require("./InstanceDungeonMonsterGrid");
class InstanceDungeonMonsterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.yyn = 0),
      (this.Mli = void 0),
      (this.H1i = void 0),
      (this.j1i = () => {
        return new InstanceDungeonMonsterGrid_1.InstanceDungeonMonsterGrid();
      }),
      (this.jli = () => {
        return new TowerElementItem_1.TowerElementItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIGridLayout],
      [2, ue_1.UIItem],
      [3, ue_1.UIHorizontalLayout],
    ];
  }
  OnStart() {
    (this.yyn = this.OpenParam),
      this.GetText(0).ShowTextNew(
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.yyn)
          .MonsterTips,
      ),
      (this.H1i = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.j1i,
      )),
      (this.Mli = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.jli,
      ));
  }
  OnBeforeShow() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      this.yyn,
    );
    this.H1i.RefreshByData(e.MonsterPreview),
      0 < e.RecommendElement?.length
        ? (this.GetItem(2)?.SetUIActive(!0),
          this.Mli.RefreshByData(e.RecommendElement))
        : this.GetItem(2)?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.H1i.ClearChildren();
  }
}
exports.InstanceDungeonMonsterView = InstanceDungeonMonsterView;
//# sourceMappingURL=InstanceDungeonMonsterView.js.map
