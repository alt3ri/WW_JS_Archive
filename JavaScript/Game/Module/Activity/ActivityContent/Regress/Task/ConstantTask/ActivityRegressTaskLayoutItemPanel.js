"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTaskLayoutItemPanel = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  SmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/SmallItemGrid"),
  ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder"),
  ActivityRegressHelper_1 = require("../../Misc/ActivityRegressHelper");
class ActivityRegressTaskLayoutItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.dma = void 0),
      (this.mma = void 0),
      (this.Cma = void 0),
      (this.HIa = () => {
        var e;
        1 === this.dma.RewardState
          ? ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards()
          : ((e =
              ModelManager_1.ModelManager.ActivityRegressModel.GetRegressScoreRewardInfoList(
                this.dma.Config,
              )[0].ItemInfo.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      }),
      (this.jIa = () => {
        var e;
        1 === this.dma.RewardState
          ? ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards()
          : ((e =
              ModelManager_1.ModelManager.ActivityRegressModel.GetRegressScoreRewardInfoList(
                this.dma.Config,
              )[1].ItemInfo.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      }),
      (this.FKa = () => {
        1 === this.dma.RewardState &&
          ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestAllTaskScoreRewards();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.FKa]]);
  }
  OnStart() {
    (this.mma = new SmallItemGrid_1.SmallItemGrid()),
      this.mma.Initialize(this.GetItem(6).GetOwner()),
      this.mma.BindOnCanExecuteChange(() => !1),
      this.mma.BindOnExtendToggleClicked(this.HIa),
      (this.Cma = new SmallItemGrid_1.SmallItemGrid()),
      this.Cma.Initialize(this.GetItem(7).GetOwner()),
      this.Cma.BindOnCanExecuteChange(() => !1),
      this.Cma.BindOnExtendToggleClicked(this.jIa);
  }
  Refresh(e, t, i) {
    (this.dma = e), (this.GridIndex = i);
    var i =
        ModelManager_1.ModelManager.ActivityRegressModel.GetRegressScoreRewardInfoList(
          e.Config,
        ),
      r = e.RewardState,
      s = i[0],
      s =
        (ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(
          this.mma,
          s,
        ),
        1 < i.length),
      i =
        (this.Cma.SetUiActive(s),
        s &&
          ((s = i[1]),
          ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(
            this.Cma,
            s,
          )),
        this.GetText(3)),
      s = e.Config.NeedScore,
      s = (i.SetText("" + s), (i.useChangeColor = 2 === r), this.GetSprite(0)),
      [i, e] =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskRelativeScore(
          e.Config,
        );
    s.SetFillAmount(i / e),
      this.GetItem(5).SetUIActive(1 === r),
      this.GetItem(1).SetUIActive(2 !== r),
      this.GetItem(2).SetUIActive(1 === r),
      this.GetItem(8).SetUIActive(2 === r);
  }
  Clear() {
    this.dma = void 0;
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.ActivityRegressTaskLayoutItemPanel = ActivityRegressTaskLayoutItemPanel;
//# sourceMappingURL=ActivityRegressTaskLayoutItemPanel.js.map
