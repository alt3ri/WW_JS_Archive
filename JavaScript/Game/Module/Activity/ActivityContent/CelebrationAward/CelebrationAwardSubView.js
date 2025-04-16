"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CelebrationAwardSubView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityTimePointRewardController_1 = require("../TimePointReward/ActivityTimePointRewardController"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class CelebrationAwardSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityTimePointRewardData = void 0),
      (this.LNe = void 0),
      (this.v_1 = void 0),
      (this.y_1 = void 0),
      (this.$01 = !1),
      (this.uT1 = !1),
      (this.S_1 = () => {
        var i = this.ActivityTimePointRewardData.GetRewardDataList();
        1 === i[0].RewardState &&
          ActivityTimePointRewardController_1.ActivityTimePointRewardController.GetRewardById(
            this.ActivityTimePointRewardData.Id,
            i[0].Id,
          );
      }),
      (this.u6e = (i) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          i.Data[0].ItemId,
        );
      }),
      (this.wNe = (i) => {
        this.ActivityBaseData.Id === i && (this.sqe(), this.Nda());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [3, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [0, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.SpineSkeletonAnimationComponent],
      [12, UE.SpineSkeletonAnimationComponent],
    ]),
      (this.BtnBindInfo = [[7, this.S_1]]);
  }
  OnSetData() {
    this.ActivityTimePointRewardData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = [],
      e = this.GetItem(0);
    (this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      i.push(this.LNe.CreateThenShowByActorAsync(e.GetOwner())),
      (this.v_1 = new SmallItemGrid_1.SmallItemGrid()),
      i.push(this.v_1.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())),
      this.v_1.BindOnExtendToggleClicked(this.u6e),
      (this.y_1 = new SmallItemGrid_1.SmallItemGrid()),
      i.push(this.y_1.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())),
      this.y_1.BindOnExtendToggleClicked(this.u6e),
      await Promise.all(i);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.wNe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.wNe,
    );
  }
  OnStart() {
    var i = this.ActivityTimePointRewardData.LocalConfig,
      e =
        (this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
        this.gxl(),
        !StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    this.LNe.SetSubTitleVisible(e),
      e && this.LNe.SetSubTitleByTextId(i.DescTheme),
      this.GetSpine(11)
        .SetAnimation(0, "start", !1)
        .AnimationComplete.Add(() => {
          this.GetSpine(11).SetAnimation(0, "idle", !0);
        }),
      this.sqe(),
      this.Nda();
  }
  OnBeforeShow() {
    this.uT1
      ? this.PlaySubViewSequence("ShowView")
      : (this.PlaySubViewSequence("Start1"), (this.uT1 = !0));
  }
  sqe() {
    var i,
      e,
      t = this.ActivityTimePointRewardData.GetRewardDataList(),
      r = [];
    for ([
      i,
      e,
    ] of ConfigManager_1.ConfigManager.ActivityTimePointRewardConfig.GetTimePointRewardById(
      t[0].Id,
    ).RewardItem) {
      var s = [{ IncId: 0, ItemId: i }, e],
        s = {
          Data: s,
          Type: 4,
          ItemConfigId: s[0].ItemId,
          BottomText: s[1].toString(),
          IsLockVisible: 0 === t[0].RewardState,
          IsReceivedVisible: 2 === t[0].RewardState,
        };
      r.push(s);
    }
    this.v_1.Apply(r[0]),
      this.v_1.BindOnCanExecuteChange(() => !1),
      this.y_1.Apply(r[1]),
      this.y_1.BindOnCanExecuteChange(() => !1);
  }
  Nda() {
    var i = this.ActivityTimePointRewardData.GetRewardDataList(),
      e = 0 === i[0].RewardState;
    this.GetText(4).SetUIActive(e),
      this.GetText(5).SetUIActive(e),
      this.GetText(3).SetUIActive(e),
      this.GetItem(6).SetUIActive(!e),
      e
        ? ((e = i[0].RewardTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()),
          this.M_1(e))
        : ((e = 1 === i[0].RewardState),
          this.GetText(8).SetUIActive(!e),
          this.GetButton(7).RootUIComp.SetUIActive(e),
          this.$01 ||
            (this.GetSpine(12)
              .SetAnimation(0, "start", !1)
              .AnimationComplete.Add(() => {
                this.GetSpine(12).SetAnimation(0, "idle", !0);
              }),
            (this.$01 = !0)));
  }
  M_1(i) {
    var e,
      t,
      i = i * TimeUtil_1.TimeUtil.Millisecond;
    i >= CommonDefine_1.SECOND_PER_DAY
      ? ((t = i / TimeUtil_1.TimeUtil.Hour),
        (e = Math.floor(t / TimeUtil_1.TimeUtil.OneDayHourCount)),
        (t = Math.ceil(t - e * TimeUtil_1.TimeUtil.OneDayHourCount)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "CelebrationAwardLeftTimeDay",
          `<color=#f39233>${e}</color>`,
          `<color=#f39233>${t}</color>`,
        ))
      : i >= CommonDefine_1.SECOND_PER_HOUR
        ? ((e = i / TimeUtil_1.TimeUtil.Minute),
          (t = Math.floor(e / TimeUtil_1.TimeUtil.Minute)),
          (e = Math.ceil(e - t * TimeUtil_1.TimeUtil.Minute)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "CelebrationAwardLeftTimeHour",
            `<color=#f39233>${t}</color>`,
            `<color=#f39233>${e}</color>`,
          ))
        : i >= CommonDefine_1.SECOND_PER_MINUTE
          ? ((t = i),
            (e = Math.floor(i / TimeUtil_1.TimeUtil.Minute)),
            (t = Math.ceil(t - e * TimeUtil_1.TimeUtil.Minute)),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              "CelebrationAwardLeftTimeSecond",
              `<color=#f39233>${e}</color>`,
              `<color=#f39233>${t}</color>`,
            ))
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              "CelebrationAwardLeftTimeLessSecond",
              `<color=#f39233>${Math.max(Math.floor(i), 1)}</color>`,
            );
  }
  gxl() {
    var [i, e] =
      ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
        this.ActivityTimePointRewardData,
      );
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(e);
  }
  OnTimer(i) {
    this.Nda(), this.gxl();
  }
}
exports.CelebrationAwardSubView = CelebrationAwardSubView;
//# sourceMappingURL=CelebrationAwardSubView.js.map
