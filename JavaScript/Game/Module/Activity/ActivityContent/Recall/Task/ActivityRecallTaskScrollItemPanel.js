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
      (this.VIa = void 0),
      (this.j_a = () => {
        var e = this.Pe.Config;
        1 ===
          ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetTaskRewardState(
            e.Id,
          ) &&
          (ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.IsRecallTaskScoreOverExp() &&
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "RecallActivity_Task_Max",
            ),
          ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallController.RequestClaimTaskReward(
            e.Id,
          ));
      }),
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
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
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
    (this.ComponentRegisterInfos = [
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
    ]),
      (this.BtnBindInfo = [[0, this.j_a]]);
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
    (this.VIa = new ButtonItem_1.ButtonItem(e)), this.VIa.SetFunction(this.tWt);
  }
  RefreshByData(e) {
    var i = (this.Pe = e).Config,
      [t, l] =
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetTaskProgressTuple(
          i.Id,
        ),
      r = this.GetText(3);
    r.text = t + "/" + l;
    let a =
      ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.GetTaskRewardState(
        i.Id,
      );
    var t = this.GetText(1),
      l =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.TargetName), this.GetText(8)),
      c = this.GetItem(2),
      o = (c.SetUIActive(!0), e.Config.TaskType),
      e = e.Config.TaskSubType,
      [s, e] =
        (o === ActivityRecallDefine_1.EActivityRecallTaskType.Constant &&
          (1 === e &&
            (void 0 ===
              ActivityRecallHelper_1.ActivityRecallHelper.GetFirstMainLineUnFinishTaskId() &&
              1 !== a &&
              ((a = 2),
              c.SetUIActive(!1),
              r.SetUIActive(!1),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                t,
                "RecallActivity_Task_Story_Empty",
              )),
            (l.text = "")),
          2 === e) &&
          ((o =
            ActivityRecallHelper_1.ActivityRecallHelper.GetFirstMainLineUnFinishTaskId()),
          (s =
            ActivityRecallHelper_1.ActivityRecallHelper.GetFirstShowRoleQuest()),
          void 0 === o && void 0 === s && 1 !== a
            ? ((a = 2),
              c.SetUIActive(!1),
              r.SetUIActive(!1),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                t,
                "RecallActivity_Task_Role_Empty",
              ),
              (l.text = ""))
            : void 0 !== s
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  l,
                  "RecallActivity_Recommended_Role",
                  s.Name,
                )
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  l,
                  "RecallActivity_Recommended_Role_Lock",
                )),
        4 === e &&
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            l,
            "RecallActivity_Recommended_Energy",
          ),
        3 === e &&
          (void 0 !==
          (o =
            ActivityRecallHelper_1.ActivityRecallHelper.GetMinExploreAreaInfo())
            ? ((c = o.DeliveryMarkId),
              (r = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(c)),
              (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                r.MarkTitle,
              )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                l,
                "RecallActivity_Recommended_Area",
                t,
              ))
            : (l.text = "")),
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallTaskScoreItemInfo(
          i,
        ));
    ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
      this.sft,
      s,
      e,
      [0 === a, 1 === a, 2 === a],
    ),
      this.p4e.SetUiActive(0 === a),
      this.VIa.SetUiActive(1 === a),
      this.GetText(6).SetUIActive(!1),
      this.GetItem(5).SetUIActive(2 === a),
      this.GetItem(9).SetUIActive(2 === a);
  }
}
exports.ActivityRecallTaskScrollItemPanel = ActivityRecallTaskScrollItemPanel;
//# sourceMappingURL=ActivityRecallTaskScrollItemPanel.js.map
