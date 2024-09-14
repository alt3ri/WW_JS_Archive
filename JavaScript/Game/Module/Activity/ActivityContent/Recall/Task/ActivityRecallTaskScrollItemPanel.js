"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTaskScrollItemPanel = void 0);
const UE = require("ue"),
  MapMarkByMarkId_1 = require("../../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallTaskScrollItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sft = void 0),
      (this.Pe = void 0),
      (this.p4e = void 0),
      (this.aPa = void 0),
      (this.tWt = () => {
        var e = this.Pe.Config,
          i =
            ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetTaskRewardState(
              e.Id,
            );
        0 === i
          ? ActivityRecallHelper_1.ActivityRecallHelper.RecallTaskJump(
              this.Pe.Config,
            )
          : 1 === i &&
            (ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.IsRecallTaskScoreOverExp() &&
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "RecallActivity_Task_Max",
              ),
            ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallController.RequestClaimTaskReward(
              e.Id,
            ));
      }),
      (this.q3e = () => {
        var e = this.Pe.Config,
          [e] =
            ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreItemInfo(
              e,
            ),
          e = e.Id;
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
        ((this.p4e = new ButtonItem_1.ButtonItem(e)),
        this.p4e.SetFunction(this.tWt),
        this.p4e.SetShowText("RecallActivity_Go"),
        this.GetItem(10));
    (this.aPa = new ButtonItem_1.ButtonItem(e)), this.aPa.SetFunction(this.tWt);
  }
  RefreshByData(e) {
    var i = (this.Pe = e).Config,
      [t, l] =
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetTaskProgressTuple(
          i.Id,
        );
    let r =
      ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetTaskRewardState(
        i.Id,
      );
    var a = this.GetText(1),
      c =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(a, i.TargetName), this.GetText(8)),
      o = this.GetItem(2),
      s = (o.SetUIActive(!0), e.Config.TaskType),
      _ = this.GetText(3),
      e =
        (_.SetUIActive(!0),
        s === ActivityRecallDefine_1.EActivityRecallTaskType.DailyA ||
        s === ActivityRecallDefine_1.EActivityRecallTaskType.DailyB
          ? _.SetText(`(${t}/${l})`)
          : _.SetText(t + "/" + l),
        e.Config.TaskSubType),
      [a, t] =
        (s === ActivityRecallDefine_1.EActivityRecallTaskType.Constant &&
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            _,
            "RecallActivity_Task_Tips",
            t,
            l,
          ),
          1 === e &&
            (void 0 ===
              ActivityRecallHelper_1.ActivityRecallHelper.GetFirstMainLineUnFinishTaskId() &&
              1 !== r &&
              ((r = 2),
              o.SetUIActive(!1),
              _.SetUIActive(!1),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                a,
                "RecallActivity_Task_Story_Empty",
              )),
            c.SetText("")),
          2 === e) &&
          ((s =
            ActivityRecallHelper_1.ActivityRecallHelper.GetFirstMainLineUnFinishTaskId()),
          (t =
            ActivityRecallHelper_1.ActivityRecallHelper.GetFirstShowRoleQuest()),
          void 0 === s && void 0 === t && 1 !== r
            ? ((r = 2),
              o.SetUIActive(!1),
              _.SetUIActive(!1),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                a,
                "RecallActivity_Task_Role_Empty",
              ),
              c.SetText(""))
            : void 0 !== t
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  c,
                  "RecallActivity_Recommended_Role",
                  t.Name,
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  c,
                  "RecallActivity_Recommended_Role_Lock",
                )),
        4 === e &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            c,
            "RecallActivity_Recommended_Energy",
          ),
        3 === e &&
          (void 0 !==
          (l =
            ActivityRecallHelper_1.ActivityRecallHelper.GetMinExploreAreaInfo())
            ? ((s = l.DeliveryMarkId),
              (o = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(s)),
              (_ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                o.MarkTitle,
              )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                c,
                "RecallActivity_Recommended_Area",
                _,
              ))
            : c.SetText("")),
        2 === r && c.SetText(""),
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreItemInfo(
          i,
        ));
    ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
      this.sft,
      a,
      t,
      [0 === r, 1 === r, 2 === r],
    ),
      this.p4e.SetUiActive(0 === r),
      this.aPa.SetUiActive(1 === r),
      this.GetText(6).SetUIActive(!1),
      this.GetItem(5).SetUIActive(2 === r),
      this.GetItem(9).SetUIActive(2 === r);
  }
}
exports.ActivityRecallTaskScrollItemPanel = ActivityRecallTaskScrollItemPanel;
//# sourceMappingURL=ActivityRecallTaskScrollItemPanel.js.map
