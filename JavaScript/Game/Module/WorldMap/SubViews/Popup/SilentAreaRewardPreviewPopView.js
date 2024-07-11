"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaRewardPreviewPopView = void 0);
const UE = require("ue");
const ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const RewardPreviewListItem_1 = require("./RewardPreviewListItem");
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
    const e = [];
    for (const w of ExchangeRewardById_1.configExchangeRewardById.GetConfig(
      this.e2o,
    ).RewardId)
      e.push(w);
    e.sort((e, i) => e[0] - i[0]);
    let i;
    let r;
    const t = [];
    const s = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    let a = 0;
    let o = 0;
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
// # sourceMappingURL=SilentAreaRewardPreviewPopView.js.map
