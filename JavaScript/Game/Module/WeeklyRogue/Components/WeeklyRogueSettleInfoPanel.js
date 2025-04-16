"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueSettleInfoPanelItem = exports.WeeklyRogueSettleInfoPanel =
    void 0);
const UE = require("ue"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueSettleInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.eGe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      () => new WeeklyRogueSettleInfoPanelItem(),
    );
  }
  UpdateData(e) {
    const t = [];
    t.push({
      Title: "WeeklyRogueSettleProgressTitle",
      Content: e.iqs + "/" + e.rqs,
      IsDoubleItem: !1,
    }),
      t.push({
        Title: "WeeklyRogueSettleScoreReward",
        Content: e.SMs.toString(),
        IsDoubleItem: !1,
      });
    e = new UiAsyncTask_1.UiAsyncTask(
      "WeeklyRogueSettleInfoPanel.UpdateData",
      async () => {
        await this.eGe?.RefreshByDataAsync(t);
      },
    );
    this.RunAsyncTask(e);
  }
}
exports.WeeklyRogueSettleInfoPanel = WeeklyRogueSettleInfoPanel;
class WeeklyRogueSettleInfoPanelItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ];
  }
  Refresh(e, t, s) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      this.GetText(2).SetText(e.Content),
      this.GetItem(3)?.SetUIActive(e.IsDoubleItem);
  }
}
exports.WeeklyRogueSettleInfoPanelItem = WeeklyRogueSettleInfoPanelItem;
//# sourceMappingURL=WeeklyRogueSettleInfoPanel.js.map
