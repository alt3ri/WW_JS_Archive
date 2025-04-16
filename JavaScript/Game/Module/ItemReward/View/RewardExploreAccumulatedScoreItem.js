"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreAccumulatedScoreItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreAccumulatedScoreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._D_ = void 0),
      (this.cD_ = void 0),
      (this.uD_ = () => {
        return new ScoreItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this._D_ = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.uD_,
    )),
      (this.cD_ = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.uD_,
      ));
  }
  Refresh(e) {
    var t = e.DetailScoreDataList,
      t =
        (t && this._D_?.RefreshByData(t),
        (t = e.TotalScoreDataList) && this.cD_?.RefreshByData(t),
        e.CurScore),
      e = e.MaxScore,
      i = e <= t;
    i
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "riskofrain_UIScore",
          t,
          e,
        )
      : this.GetText(4)?.SetText(t + "/" + e),
      this.GetItem(5).SetUIActive(i);
  }
}
exports.RewardExploreAccumulatedScoreItem = RewardExploreAccumulatedScoreItem;
class ScoreItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.DescTextId),
      this.GetText(1).SetText(e.ScoreText);
  }
}
//# sourceMappingURL=RewardExploreAccumulatedScoreItem.js.map
