"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRewardTaskItem = void 0);
const UE = require("ue"),
  SkipTaskManager_1 = require("../../../../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivitySmallItemGrid_1 = require("../../../../UniversalComponents/ActivitySmallItemGrid"),
  FINISHED_ITEM_ALPHA = 0.6,
  NORMAL_ITEM_ALPHA = 1;
class FishingRewardTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.sOn = void 0),
      (this.bOe = void 0),
      (this.JGe = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid()),
      (this.IOe = () => {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.sOn.JumpId);
      }),
      (this.qOe = () => {
        this.sOn.ReceiveDelegate?.(this.sOn.TaskId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.IOe],
        [0, this.qOe],
      ]);
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(6),
      this.JGe,
    );
  }
  Refresh(i, t, e) {
    var r = 2 === (this.sOn = i).Status,
      s = 0 === i.Status,
      a = 1 === i.Status,
      h = [];
    for (const o of i.RewardList) {
      var l = { Item: o, HasClaimed: r };
      h.push(l);
    }
    this.bOe.RefreshByData(h),
      this.GetButton(0).RootUIComp.SetUIActive(s),
      this.GetItem(3).SetUIActive(r),
      this.GetText(2).SetUIActive(a && 0 === i.JumpId),
      this.GetButton(1).RootUIComp.SetUIActive(a && 0 !== i.JumpId);
    s = r ? FINISHED_ITEM_ALPHA : NORMAL_ITEM_ALPHA;
    this.GetItem(7).SetAlpha(s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TitleTextId),
      this.GetText(5)?.SetText(i.Current + "/" + i.Target);
  }
}
exports.FishingRewardTaskItem = FishingRewardTaskItem;
//# sourceMappingURL=FishingRewardTaskItem.js.map
