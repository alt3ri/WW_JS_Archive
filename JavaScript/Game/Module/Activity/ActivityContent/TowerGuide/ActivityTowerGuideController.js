"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTowerGuideController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivitySubViewTowerGuide_1 = require("./ActivitySubViewTowerGuide"),
  ActivityTowerGuideData_1 = require("./ActivityTowerGuideData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivityTowerGuideController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.e4e = (e, t) => {
        var r = ActivityTowerGuideController.t4e();
        r && r.RefreshRewardState(t);
      });
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_TowerGuide";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewTowerGuide_1.ActivitySubViewTowerGuide();
  }
  OnCreateActivityData(e) {
    return new ActivityTowerGuideData_1.ActivityTowerGuideData();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRecordUpdate,
      this.e4e,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRecordUpdate,
      this.e4e,
    );
  }
  static t4e() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityTowerGuideController.CurrentActivityId,
    );
  }
  static RequestTowerReward(e) {
    var t = new Protocol_1.Aki.Protocol.s0s();
    (t.Q6n = e),
      Net_1.Net.Call(17911, t, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                21283,
              )
            : ActivityTowerGuideController.RequestTowerRewardInfo());
      });
  }
  static RequestTowerRewardInfo() {
    var e = new Protocol_1.Aki.Protocol.h0s();
    Net_1.Net.Call(6788, e, (e) => {
      if (e) {
        var t = ActivityTowerGuideController.t4e();
        if (t) for (const r of e.Q6n) t.SetRewardClaimed(r, !0);
      }
    });
  }
}
(exports.ActivityTowerGuideController =
  ActivityTowerGuideController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityTowerGuideController.js.map
