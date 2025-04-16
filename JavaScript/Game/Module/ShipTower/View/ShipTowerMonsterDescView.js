"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerMonsterDescView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  TabComponent_1 = require("../../Common/TabComponent/TabComponent"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ShipTowerMonsterListItem_1 = require("./ShipTowerMonsterListItem"),
  ShipTowerMonsterWordItem_1 = require("./ShipTowerMonsterWordItem"),
  ShipTowerTeamTabItem_1 = require("./ShipTowerTeamTabItem");
class ShipTowerMonsterDescView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.Ivt = void 0),
      (this.I6e = 0),
      (this.yD_ = void 0),
      (this.SD_ = void 0),
      (this.MD_ = void 0),
      (this.ED_ = void 0),
      (this.ID_ = void 0),
      (this.fqe = () => {
        return new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
      }),
      (this.KOl = (i) => {
        this.I6e = i;
        i = this.OpenParam?.StageData.TeamDataList[this.I6e];
        i && this.TD_(i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.Ivt = new TabComponent_1.TabComponent(
        this.GetItem(3),
        this.fqe,
        this.KOl,
        void 0,
      )),
      (this.ED_ = this.GetItem(1)),
      (this.ID_ = this.GetItem(2));
    var i = this.GetItem(0),
      t = LguiUtil_1.LguiUtil.CopyItem(this.ED_, i),
      t =
        ((this.SD_ = new ShipTowerMonsterWordItem_1.ShipTowerMonsterWordItem()),
        await this.SD_.Init(t),
        LguiUtil_1.LguiUtil.CopyItem(this.ED_, i)),
      t =
        ((this.yD_ = new ShipTowerMonsterWordItem_1.ShipTowerMonsterWordItem()),
        await this.yD_.Init(t),
        LguiUtil_1.LguiUtil.CopyItem(this.ID_, i)),
      i =
        ((this.MD_ = new ShipTowerMonsterListItem_1.ShipTowerMonsterListItem()),
        await this.MD_.Init(t),
        this.ED_.SetUIActive(!1),
        this.ID_.SetUIActive(!1),
        this.OpenParam?.StageData.TeamDataList.length ?? 2);
    await this.Ivt.RefreshTabItemByLengthAsync(i);
  }
  La_() {
    var i = this.Ivt.GetTabItemMap(),
      t = this.OpenParam?.StageData.TeamDataList ?? [];
    for (const [e, s] of i) s.UpdateName(t[e].AreaName);
    i = t.findIndex((i) => i.InstId === this.OpenParam?.InstId);
    const e = Math.max(i, 0);
    this.Ivt.SelectToggleByIndex(e, !0);
  }
  OnBeforeShow() {
    this.La_();
  }
  TD_(i) {
    this.yD_?.UpdateData(i.GetInfoAttr());
    var t = i.GetInfoWord();
    t && this.SD_?.UpdateData(t),
      this.SD_?.SetActive(!!t),
      this.MD_?.UpdateData(i.GetMonsterListItemData());
  }
}
exports.ShipTowerMonsterDescView = ShipTowerMonsterDescView;
//# sourceMappingURL=ShipTowerMonsterDescView.js.map
