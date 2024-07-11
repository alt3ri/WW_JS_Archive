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
      (this.e2o = 0),
      (this.u6e = void 0),
      (this.t2o = () => new RewardPreviewListItem_1.RewardPreviewListItem());
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
    (this.u6e = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.t2o,
    )),
      (this.e2o = this.OpenParam),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "SilentArea_rewardinfo",
      );
  }
  OnBeforeShow() {
    this.Wri();
  }
  Wri() {
    var e = [];
    for (const w of ExchangeRewardById_1.configExchangeRewardById.GetConfig(
      this.e2o,
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
    this.u6e?.RefreshByDataAsync(e).finally(() => {
      TimerSystem_1.TimerSystem.Next(() => {
        this.u6e.ScrollToTop(o);
      });
    });
  }
}
exports.SilentAreaRewardPreviewPopView = SilentAreaRewardPreviewPopView;
//# sourceMappingURL=SilentAreaRewardPreviewPopView.js.map
