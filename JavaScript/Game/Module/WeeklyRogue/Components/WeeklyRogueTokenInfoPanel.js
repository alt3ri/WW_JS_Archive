"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueTokenInfoPanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  WeeklyRogueTokenGrid_1 = require("./WeeklyRogueTokenGrid"),
  WeeklyRogueTokenItem_1 = require("./WeeklyRogueTokenItem");
class WeeklyRogueTokenInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TokenLayout = void 0),
      (this.TokenItem = void 0),
      (this.eV_ = (e, o) => {
        this.TokenLayout?.SelectGridProxy(e, !1),
          this.TokenItem?.UpdateByConfigId(o),
          this.TokenItem?.SetActive(!0);
      }),
      (this.tV_ = () => {
        var e = new WeeklyRogueTokenGrid_1.WeeklyRogueTokenInfoGrid();
        return (e.OnSelectedChange = this.eV_), e;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.TokenItem = new WeeklyRogueTokenItem_1.WeeklyRogueTokenItem()),
      await this.TokenItem.CreateByActorAsync(this.GetItem(2).GetOwner()),
      (this.TokenLayout = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.tV_,
      )),
      await this.TokenLayout.RefreshByDataAsync(
        ModelManager_1.ModelManager.WeeklyRogueModel.BuffList,
      ),
      this.GetItem(3).SetUIActive(
        0 === ModelManager_1.ModelManager.WeeklyRogueModel.BuffList.length,
      ),
      0 < ModelManager_1.ModelManager.WeeklyRogueModel.BuffList.length &&
        this.TokenLayout.SelectGridProxy(0, !0);
  }
}
exports.WeeklyRogueTokenInfoPanel = WeeklyRogueTokenInfoPanel;
//# sourceMappingURL=WeeklyRogueTokenInfoPanel.js.map
