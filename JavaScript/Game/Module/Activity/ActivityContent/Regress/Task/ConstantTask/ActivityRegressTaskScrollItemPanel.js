"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTaskScrollItemPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../../../Common/Button/ButtonItem"),
  SmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/SmallItemGrid"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder"),
  ActivityRegressHelper_1 = require("../../Misc/ActivityRegressHelper");
class ActivityRegressTaskScrollItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sft = void 0),
      (this.Pe = void 0),
      (this.El1 = void 0),
      (this.uPa = void 0),
      (this.tWt = () => {
        var e = this.Pe.Config,
          i =
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
              e.Id,
            );
        0 === i
          ? ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.JumpByQuestConfig(
              this.Pe.Config,
            )
          : 1 === i &&
            (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsRegressTaskScoreOverExp() &&
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "RecallActivity_Task_Max",
              ),
            ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimTaskReward(
              e.Id,
            ));
      }),
      (this.q3e = () => {
        var e = this.Pe.Config,
          e =
            ModelManager_1.ModelManager.ActivityRegressModel.GetRegressTaskRewardItemInfo(
              e,
            ).ItemInfo.Id;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(4).GetOwner()),
      this.sft.BindOnCanExecuteChange(() => !1),
      this.sft.BindOnExtendToggleClicked(this.q3e);
    var e = this.GetItem(7),
      e =
        ((this.El1 = new ButtonItem_1.ButtonItem(e)),
        this.El1.SetFunction(this.tWt),
        this.El1.SetShowText("RecallActivity_Go"),
        this.GetItem(10));
    (this.uPa = new ButtonItem_1.ButtonItem(e)), this.uPa.SetFunction(this.tWt);
  }
  RefreshByData(e) {
    var i = (this.Pe = e).Config,
      t = this.Il1(),
      r = this.GetText(1),
      r =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(r, i.TargetName), this.GetText(8)),
      e =
        (0 === e.TaskType ? this.Tl1() : this.bl1(),
        2 === t && r.SetText(""),
        ModelManager_1.ModelManager.ActivityRegressModel.GetRegressTaskRewardItemInfo(
          i,
        )),
      r =
        (ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(
          this.sft,
          e,
        ),
        e.ItemInfo),
      i = e.ItemCount,
      l = 0 === e.RewardState,
      e = 2 === e.RewardState;
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGrid(
      this.sft,
      r,
      i,
      [l, !1, e],
    ),
      this.El1.SetUiActive(0 === t),
      this.uPa.SetUiActive(1 === t),
      this.GetText(6).SetUIActive(!1),
      this.GetItem(5).SetUIActive(2 === t),
      this.GetItem(9).SetUIActive(2 === t);
  }
  Tl1() {
    var e = this.Pe.Config,
      i = e.Id,
      [t, r] =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(
          i,
        ),
      l = this.GetText(3),
      i =
        (l.SetUIActive(!0),
        l.SetText(t + "/" + r),
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
          i,
        )),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          l,
          "RecallActivity_Task_Tips",
          t,
          r,
        ),
        this.GetItem(2).SetUIActive(!0),
        e.TaskSubType);
    1 === t &&
      ((r =
        ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1)),
      (e =
        ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest()),
      void 0 === r && void 0 === e && 1 !== i
        ? (this.GetItem(2).SetUIActive(!1),
          l.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "Recall_task_new_Finish01",
          ),
          this.GetText(8).SetText(""))
        : void 0 !== r
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "RecallActivity_Recommended_Role",
              r.Name,
            )
          : void 0 !== e
            ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(8),
                "RecallActivity_Recommended_Role",
                e.Name,
              )
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(8),
                "RecallActivity_Recommended_Role_Lock",
              )),
      2 === t &&
        ((r =
          ModelManager_1.ModelManager.ExploreProgressModel.IsCollectAllStageReward()) &&
        1 !== i
          ? (this.GetItem(2).SetUIActive(!1),
            l.SetUIActive(!1),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(1),
              "Recall_task_new_Finish02",
            ))
          : void 0 !==
              (e =
                ActivityRegressHelper_1.ActivityRegressHelper.GetMinExploreAreaInfo()) &&
            ((t = e.DeliveryMarkId),
            (i = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(t)),
            (l = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
              i.MarkTitle,
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "RecallActivity_Recommended_Area",
              l,
            )),
        r) &&
        this.GetText(8).SetText("");
  }
  bl1() {
    var e = this.Pe.Config.Id,
      [e, i] =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(
          e,
        ),
      t = this.GetText(3);
    t.SetUIActive(!0), t.SetText(`(${e}/${i})`), this.GetText(8).SetText("");
  }
  Il1() {
    var e,
      i = this.Pe.Config,
      t = i.Id,
      i = i.TaskType;
    let r =
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
        t,
      );
    return (r =
      0 === i &&
      (1 === (t = this.Pe.Config.TaskSubType) &&
        ((i =
          ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId()),
        (e =
          ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest()),
        void 0 === i) &&
        void 0 === e &&
        1 !== r &&
        (r = 2),
      2 === t &&
        ModelManager_1.ModelManager.ExploreProgressModel.IsCollectAllStageReward() &&
        1 !== r)
        ? 2
        : r);
  }
}
exports.ActivityRegressTaskScrollItemPanel = ActivityRegressTaskScrollItemPanel;
//# sourceMappingURL=ActivityRegressTaskScrollItemPanel.js.map
