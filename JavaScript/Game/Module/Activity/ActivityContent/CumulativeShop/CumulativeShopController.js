"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CumulativeShopController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  CumulativeShopData_1 = require("./CumulativeShopData"),
  CumulativeShopSubView_1 = require("./CumulativeShopSubView");
class CumulativeShopController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_CumulativeShop";
  }
  OnCreateSubPageComponent(e) {
    return new CumulativeShopSubView_1.CumulativeShopSubView();
  }
  OnCreateActivityData(e) {
    return (
      (CumulativeShopController.ActivityId = e.s5n),
      new CumulativeShopData_1.CumulativeShopData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(
      21458,
      CumulativeShopController.ConsumptiveTaskInfoNotify,
    );
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21458);
  }
  static ConsumptiveRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.hd1.create();
    (t.w6n = this.ActivityId),
      (t.gps = e),
      Net_1.Net.Call(16517, t, (t) => {
        if (t) {
          t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              21056,
            );
          var r = this.GetCumulativeShopData(),
            o =
              (r.TaskDataMap.set(t.md1.s5n, t.md1),
              ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(
                t.md1.s5n,
              )),
            o = o.TaskTab;
          let e = r.TaskTabMap.get(o);
          (e = e || []).includes(t.md1.s5n) || e.push(t.md1.s5n),
            r.TaskTabMap.set(o, e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CumulativeShopTaskRefresh,
              o,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              this.ActivityId,
            );
        }
      });
  }
  static GetCumulativeShopData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      this.ActivityId,
    );
  }
  static ConsumptiveActivityInfoRequest() {
    var e = Protocol_1.Aki.Protocol.V01.create();
    Net_1.Net.Call(23706, e, (e) => {
      var t = this.GetCumulativeShopData(),
        e = (t.TaskDataMap.clear(), t.TaskTabMap.clear(), e._d1.cMs);
      for (const o of e) {
        t.TaskDataMap.set(o.s5n, o);
        var r =
          ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(
            o.s5n,
          ).TaskTab;
        let e = t.TaskTabMap.get(r);
        (e = e || []).push(o.s5n), t.TaskTabMap.set(r, e);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CumulativeShopTaskViewDataRefresh,
      );
    });
  }
}
(exports.CumulativeShopController = CumulativeShopController),
  ((_a = CumulativeShopController).ActivityId = 0),
  (CumulativeShopController.ConsumptiveTaskInfoNotify = (e) => {
    var t = _a.GetCumulativeShopData(),
      r =
        (t.TaskDataMap.set(e.pd1.s5n, e.pd1),
        ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(
          e.pd1.s5n,
        )),
      r = r.TaskTab;
    let o = t.TaskTabMap.get(r);
    (o = o || []).includes(e.pd1.s5n) || o.push(e.pd1.s5n),
      t.TaskTabMap.set(r, o),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CumulativeShopTaskRefresh,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        _a.ActivityId,
      );
  });
//# sourceMappingURL=CumulativeShopController.js.map
