"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaRewardPreviewPopView = void 0);
const UE = require("ue"),
  ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  RewardPreviewListItem_1 = require("./RewardPreviewListItem");
class SilentAreaRewardPreviewPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.J2o = 0),
      (this.T8e = void 0),
      (this.z2o = () => new RewardPreviewListItem_1.RewardPreviewListItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = []);
  }
  async OnBeforeStartAsync() {}
  OnStart() {
    (this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.z2o,
    )),
      (this.J2o = this.OpenParam),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "SilentArea_rewardinfo",
      );
  }
  OnBeforeShow() {
    this.Wni();
  }
  Wni() {
    var e = [];
    for (const w of ExchangeRewardById_1.configExchangeRewardById.GetConfig(
      this.J2o,
    ).RewardId)
      e.push(w);
    e.sort((e, i) => e[0] - i[0]);
    var i,
      r,
      t = [],
      s = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    let a = 0,
      o = 0;
    for ([i, r] of e)
      t.push([i, r]), a < i && s >= i && ((a = i), (o = t.length - 1));
    this.T8e?.RefreshByDataAsync(e).finally(() => {
      TimerSystem_1.TimerSystem.Next(() => {
        this.T8e.ScrollToTop(o);
      });
    });
  }
}
exports.SilentAreaRewardPreviewPopView = SilentAreaRewardPreviewPopView;
//# sourceMappingURL=SilentAreaRewardPreviewPopView.js.map
