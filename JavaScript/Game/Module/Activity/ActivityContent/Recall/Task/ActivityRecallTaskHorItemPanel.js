"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTaskHorItemPanel = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallTaskHorItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.zda = void 0),
      (this.Zda = void 0),
      (this.ema = void 0),
      (this.FIa = () => {
        var e;
        1 === this.zda.RewardState
          ? ActivityRecallHelper_1.ActivityRecallHelper.RequestAllScoreRewards()
          : (([e] =
              ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreRewardInfoList(
                this.zda.Config,
              )[0]),
            (e = e.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      }),
      (this.VIa = () => {
        var e;
        1 === this.zda.RewardState
          ? ActivityRecallHelper_1.ActivityRecallHelper.RequestAllScoreRewards()
          : (([e] =
              ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreRewardInfoList(
                this.zda.Config,
              )[1]),
            (e = e.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      }),
      (this.Dja = () => {
        1 === this.zda.RewardState &&
          ActivityRecallHelper_1.ActivityRecallHelper.RequestAllScoreRewards();
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
      (this.BtnBindInfo = [[9, this.Dja]]);
  }
  OnStart() {
    (this.Zda = new SmallItemGrid_1.SmallItemGrid()),
      this.Zda.Initialize(this.GetItem(6).GetOwner()),
      this.Zda.BindOnCanExecuteChange(() => !1),
      this.Zda.BindOnExtendToggleClicked(this.FIa),
      (this.ema = new SmallItemGrid_1.SmallItemGrid()),
      this.ema.Initialize(this.GetItem(7).GetOwner()),
      this.ema.BindOnCanExecuteChange(() => !1),
      this.ema.BindOnExtendToggleClicked(this.VIa);
  }
  Refresh(e, t, i) {
    (this.zda = e), (this.GridIndex = i);
    var i =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreRewardInfoList(
          e.Config,
        ),
      l = e.RewardState,
      [s, r] = i[0],
      s =
        (ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
          this.Zda,
          s,
          r,
          [0 === l, 1 === l, 2 === l],
        ),
        1 < i.length),
      i =
        (this.ema.SetUiActive(s),
        s &&
          (([r, s] = i[1]),
          ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
            this.ema,
            r,
            s,
            [0 === l, 1 === l, 2 === l],
          )),
        this.GetText(3)),
      r = e.Config.NeedScore,
      s = (i.SetText("" + r), (i.useChangeColor = 2 === l), this.GetSprite(0)),
      [r, i] =
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetRecallTaskRelativeScore(
          e.Config,
        );
    s.SetFillAmount(r / i),
      this.GetItem(5).SetUIActive(1 === l),
      this.GetItem(1).SetUIActive(2 !== l),
      this.GetItem(2).SetUIActive(1 === l),
      this.GetItem(8).SetUIActive(2 === l);
  }
  Clear() {
    this.zda = void 0;
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.ActivityRecallTaskHorItemPanel = ActivityRecallTaskHorItemPanel;
//# sourceMappingURL=ActivityRecallTaskHorItemPanel.js.map
