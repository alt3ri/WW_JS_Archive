"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTimeLimitRewardTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiTabViewBase_1 = require("../../../../../../Ui/Base/UiTabViewBase"),
  UiTabSequence_1 = require("../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  WeaponTrialData_1 = require("../../../../../Weapon/Data/WeaponTrialData"),
  ActivityWeaponDescribeComponent_1 = require("../../../UniversalComponents/ActivityWeaponDescribeComponent"),
  ActivityFishingController_1 = require("../ActivityFishingController"),
  ActivityFishingDefine_1 = require("../ActivityFishingDefine"),
  FishingTaskData_1 = require("../FishingTaskData"),
  FishingRewardProgressPanel_1 = require("./Components/FishingRewardProgressPanel"),
  FishingRewardTargetTabItem_1 = require("./Components/FishingRewardTargetTabItem"),
  FishingRewardTaskItem_1 = require("./Components/FishingRewardTaskItem");
class FishingTimeLimitRewardTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.B7t = void 0),
      (this.qoh = void 0),
      (this.fcl = void 0),
      (this.hfl = void 0),
      (this.boh = void 0),
      (this.Cua = -1),
      (this.fqe = () =>
        new FishingRewardTargetTabItem_1.FishingRewardTargetTabItem()),
      (this.Wwn = (e) => {
        this.Cua !== e &&
          -1 !== this.Cua &&
          this.B7t.GetLayoutItemByIndex(this.Cua)?.SetToggleState(!1, !1),
          (this.Cua = e),
          this.Ooh(this.Cua, !0);
      }),
      (this._x_ = () => new FishingRewardTaskItem_1.FishingRewardTaskItem()),
      (this.cx_ = () => {
        for (const e of this.B7t.GetLayoutItemList()) e.RefreshRedDot();
        this.Ooh(this.Cua, !1);
      }),
      (this.ux_ = (e) => {
        ActivityFishingController_1.ActivityFishingController.FishingActivityLimitRewardRequest(
          e,
        );
      }),
      (this.dx_ = () => {
        var e = this.boh.GetAllMilestoneReward(),
          i = this.boh.MilestoneRewardMaxCount,
          t = this.boh.MilestoneRewardItemAccumulate;
        this.hfl.RefreshProgressItem(t, i, e);
      }),
      (this.mx_ = () => {
        var e = this.boh.GetAllAvailableGetMilestoneRewardIds();
        0 < e.length &&
          ActivityFishingController_1.ActivityFishingController.FishingActivityMilestoneRewardRequest(
            e,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e, i;
    (this.boh = this.ExtraParams),
      this.boh &&
        ((e = []),
        (this.B7t = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(1),
          this.fqe,
        )),
        (this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(
          this.GetScrollViewWithScrollbar(3),
          this._x_,
        )),
        (i = this.boh.GetRewardTargetTabList()),
        e.push(this.B7t.RefreshByDataAsync(this.cOn(i))),
        (this.hfl =
          new FishingRewardProgressPanel_1.FishingRewardProgressPanel()),
        e.push(this.hfl.CreateByActorAsync(this.GetItem(5).GetOwner())),
        (this.hfl.OnClickToGet = this.mx_),
        this.AddChild(this.hfl),
        (this.fcl =
          new ActivityWeaponDescribeComponent_1.ActivityWeaponDescribeComponent()),
        e.push(this.fcl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
        await Promise.all(e),
        this.B7t.GetLayoutItemByIndex(0).SetToggleState(!0, !0),
        this.dx_());
  }
  OnStart() {
    var e = this.boh.GetActivityConfig(),
      i = new WeaponTrialData_1.WeaponTrialData();
    i.SetTrialId(e.PreviewWeaponId),
      this.fcl.Refresh(i.GetItemId(), !1),
      this.fcl.SetLookButtonVisible(!0),
      this.fcl.BindWeaponPreviewFunction([e.PreviewWeaponId]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh,
      this.cx_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
        this.dx_,
      );
  }
  OnBeforeShow() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)
      ?.GetLevelSequencePlayer()
      ?.PlayLevelSequenceByName("Start");
  }
  OnBeforeHide() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)
      ?.GetLevelSequencePlayer()
      ?.PlayLevelSequenceByName("Close");
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh,
      this.cx_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
        this.dx_,
      );
  }
  cOn(i) {
    var t = [];
    for (let e = 0; e < i.length; e++) {
      var s = new ActivityFishingDefine_1.FishingRewardTargetTabData();
      (s.NameTextId = i[e].GroupName),
        (s.Index = e),
        (s.ClickedCallback = this.Wwn),
        (s.RefreshRedDot = (e) =>
          this.boh.GetTimeLimitTasksRedDotStateByGroupId(e)),
        t.push(s);
    }
    return t;
  }
  Ooh(e, i) {
    e = this.boh.GetTimeLimitTasksByGroupId(e + 1);
    this.qoh.RefreshByData(
      this.fx_(e),
      () => {
        i && this.qoh.ScrollToTop(0);
      },
      !0,
    );
  }
  fx_(e) {
    var i = [];
    for (const n of e) {
      var t =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(
            n.Id,
          ),
        s = new FishingTaskData_1.FishingTaskData();
      (s.TaskId = n.Id),
        (s.Status = n.Status),
        (s.Current = n.Current),
        (s.Target = n.Target),
        (s.JumpId = t.JumpId),
        (s.TitleTextId = t.TaskName),
        (s.RewardList =
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
            t.DropId,
          )),
        (s.ReceiveDelegate = this.ux_),
        i.push(s);
    }
    return i;
  }
}
exports.FishingTimeLimitRewardTabView = FishingTimeLimitRewardTabView;
//# sourceMappingURL=FishingTimeLimitRewardTabView.js.map
