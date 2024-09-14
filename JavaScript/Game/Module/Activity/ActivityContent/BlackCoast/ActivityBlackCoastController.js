"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityBlackCoastController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityBlackCoastData_1 = require("./ActivityBlackCoastData"),
  ActivitySubViewBlackCoast_1 = require("./ActivitySubViewBlackCoast");
class ActivityBlackCoastController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.x9a = (t) => {
        for (const e of ActivityBlackCoastController.P9a())
          e.StageUpdate(t.gMs);
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(25198, this.x9a);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25198);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityBlackCoastController.qdi,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityBlackCoastController.qdi,
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const t of [
      "BlackCoastActivityMainView",
      "BlackCoastActivityTaskView",
    ])
      if (UiManager_1.UiManager.IsViewOpen(t)) return !0;
    return !1;
  }
  OnOpenView(t) {}
  OnGetActivityResource(t) {
    return "UiItem_ActivityBlackCoast";
  }
  OnCreateSubPageComponent(t) {
    return new ActivitySubViewBlackCoast_1.ActivitySubViewBlackCoast();
  }
  OnCreateActivityData(t) {
    return new ActivityBlackCoastData_1.ActivityBlackCoastData();
  }
  OnActivityFirstUnlock(t) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipBlackCoastView");
  }
  static P9a() {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
      Protocol_1.Aki.Protocol.uks.Proto_BlackCoastTheme,
    );
  }
  static RequestDataProgressReward(t, e) {
    var r = new Protocol_1.Aki.Protocol.ith();
    (r.w6n = t),
      (r.w9a = e),
      Net_1.Net.Call(21211, r, (t) => {
        if (t)
          if (t.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.fMs,
              23378,
            );
          else for (const e of this.P9a()) e.SetProgressRewardDataGot(t.Cih);
      });
  }
  static RequestTaskReward(r, o) {
    var t = new Protocol_1.Aki.Protocol.eth();
    (t.gps = o),
      Net_1.Net.Call(28429, t, (t) => {
        if (t)
          if (t.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.fMs,
              18382,
            );
          else for (const e of this.P9a()) e.SetTaskRewardGot(r, o);
      });
  }
}
(exports.ActivityBlackCoastController = ActivityBlackCoastController),
  ((_a = ActivityBlackCoastController).qdi = (t, e) => {
    var r = _a.P9a();
    if (0 !== r.length)
      for (const o of r)
        o.GetProgressItemId === t &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            o.Id,
          );
  });
//# sourceMappingURL=ActivityBlackCoastController.js.map
