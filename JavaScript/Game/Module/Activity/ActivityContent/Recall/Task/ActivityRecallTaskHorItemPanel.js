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
      (this.F_a = void 0),
      (this.V_a = void 0),
      (this.H_a = void 0),
      (this.ySa = () => {
        var e;
        1 === this.F_a.RewardState
          ? ActivityRecallHelper_1.ActivityRecallHelper.RequestAllScoreRewards()
          : (([e] =
              ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreRewardInfoList(
                this.F_a.Config,
              )[0]),
            (e = e.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      }),
      (this.ISa = () => {
        var e;
        1 === this.F_a.RewardState
          ? ActivityRecallHelper_1.ActivityRecallHelper.RequestAllScoreRewards()
          : (([e] =
              ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreRewardInfoList(
                this.F_a.Config,
              )[1]),
            (e = e.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  OnStart() {
    (this.V_a = new SmallItemGrid_1.SmallItemGrid()),
      this.V_a.Initialize(this.GetItem(6).GetOwner()),
      this.V_a.BindOnCanExecuteChange(() => !1),
      this.V_a.BindOnExtendToggleClicked(this.ySa),
      (this.H_a = new SmallItemGrid_1.SmallItemGrid()),
      this.H_a.Initialize(this.GetItem(7).GetOwner()),
      this.H_a.BindOnCanExecuteChange(() => !1),
      this.H_a.BindOnExtendToggleClicked(this.ISa);
  }
  Refresh(e, t, i) {
    (this.F_a = e), (this.GridIndex = i);
    var i =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreRewardInfoList(
          e.Config,
        ),
      l = e.RewardState,
      [r, s] = i[0],
      r =
        (ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
          this.V_a,
          r,
          s,
          [0 === l, 1 === l, 2 === l],
        ),
        1 < i.length),
      i =
        (this.H_a.SetUiActive(r),
        r &&
          (([s, r] = i[1]),
          ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
            this.H_a,
            s,
            r,
            [0 === l, 1 === l, 2 === l],
          )),
        this.GetText(3)),
      s = e.Config.NeedScore,
      r = ((i.text = s.toString()), this.GetSprite(0)),
      [i, s] =
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetRecallTaskRelativeScore(
          e.Config,
        );
    r.SetFillAmount(i / s),
      this.GetItem(5).SetUIActive(1 === l),
      this.GetItem(1).SetUIActive(2 !== l),
      this.GetItem(2).SetUIActive(1 === l || 2 === l);
  }
  Clear() {
    this.F_a = void 0;
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.ActivityRecallTaskHorItemPanel = ActivityRecallTaskHorItemPanel;
//# sourceMappingURL=ActivityRecallTaskHorItemPanel.js.map
