"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReputationRewardsView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
const InfluenceRewardItem_1 = require("../Item/InfluenceRewardItem");
class ReputationRewardsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.wni = void 0),
      (this.sGe = (e, i, r) => {
        var i = new InfluenceRewardItem_1.InfluenceRewardItem(i);
        const t = this.wni.RewardIndex >= r;
        return i.UpdateItem(e, t), { Key: r, Value: i };
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnBeforeCreate() {
    const e = this.OpenParam;
    this.wni =
      ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
        e,
      );
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.sGe,
    );
  }
  OnAfterShow() {
    this.xqe.RefreshByData(this.wni.GetReward());
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren(), (this.xqe = void 0);
  }
}
exports.ReputationRewardsView = ReputationRewardsView;
// # sourceMappingURL=ReputationRewardsView.js.map
