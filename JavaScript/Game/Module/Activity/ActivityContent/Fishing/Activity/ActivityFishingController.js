"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityFishingController = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  ActivityFishingData_1 = require("./ActivityFishingData"),
  ActivityFishingSubView_1 = require("./View/ActivityFishingSubView");
class ActivityFishingController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(t) {}
  OnGetActivityResource(t) {
    return "UiItem_FishingActivity";
  }
  OnCreateSubPageComponent(t) {
    return new ActivityFishingSubView_1.ActivityFishingSubView();
  }
  OnCreateActivityData(t) {
    return new ActivityFishingData_1.ActivityFishingData();
  }
  OnActivityFirstUnlock(t) {
    UiManager_1.UiManager.OpenView("FishingActivityUnlockView");
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingRefreshHandBookRewardView,
      ActivityFishingController.PWa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnLockGoods,
        ActivityFishingController.y9_,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingRefreshHandBookRewardView,
      ActivityFishingController.PWa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnLockGoods,
        ActivityFishingController.y9_,
      );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(18463, ActivityFishingController.ZP_),
      Net_1.Net.Register(19569, ActivityFishingController.ex_),
      Net_1.Net.Register(26760, ActivityFishingController.tx_);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18463),
      Net_1.Net.UnRegister(19569),
      Net_1.Net.UnRegister(26760);
  }
  static GetCurrentActivityData() {
    var t =
      ModelManager_1.ModelManager.ActivityModel?.GetCurrentActivitiesByType(
        Protocol_1.Aki.Protocol.uks.Proto_FishingActivity,
      );
    let e = void 0;
    return (
      t?.forEach((t) => {
        e = t;
      }),
      e
    );
  }
  static FishingActivityLimitRewardRequest(t) {
    var e = new Protocol_1.Aki.Protocol.ky_();
    (e.gps = t),
      Net_1.Net.Call(27827, e, (t) => {
        t &&
          t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            21412,
          );
      });
  }
  static FishingActivityMilestoneRewardRequest(t) {
    var e = new Protocol_1.Aki.Protocol.Oy_(),
      i = this.GetCurrentActivityData();
    i &&
      ((e.w6n = i.Id),
      (e.KM_ = t),
      Net_1.Net.Call(27456, e, (t) => {
        t &&
          t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            18905,
          );
      }));
  }
}
(exports.ActivityFishingController = ActivityFishingController),
  ((_a = ActivityFishingController).ZP_ = (t) => {
    var e = _a.GetCurrentActivityData();
    e &&
      (e.RefreshLimitTimeTaskDataList(t.E$s, !0),
      e.RefreshActivityRedDotState());
  }),
  (ActivityFishingController.ex_ = (t) => {
    var e = _a.GetCurrentActivityData();
    e && (e.RefreshMilestoneReward(t.WM_, !0), e.RefreshActivityRedDotState());
  }),
  (ActivityFishingController.tx_ = (t) => {
    var e = _a.GetCurrentActivityData();
    e && (e.MilestoneRewardItemAccumulate = t.QM_);
  }),
  (ActivityFishingController.y9_ = (t) => {
    t.has(209) && _a.PWa();
  }),
  (ActivityFishingController.PWa = () => {
    var t = _a.GetCurrentActivityData();
    t && t.RefreshActivityRedDotState();
  });
//# sourceMappingURL=ActivityFishingController.js.map
