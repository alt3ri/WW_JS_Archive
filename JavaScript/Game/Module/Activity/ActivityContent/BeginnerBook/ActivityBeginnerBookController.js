"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityBeginnerBookController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityBeginnerBookData_1 = require("./ActivityBeginnerBookData"),
  ActivitySubViewBeginnerBook_1 = require("./ActivitySubViewBeginnerBook");
class ActivityBeginnerBookController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), (this.sNe = 0);
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_BeginnerBook";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewBeginnerBook_1.ActivitySubViewBeginnerBook();
  }
  OnCreateActivityData(e) {
    return (
      (this.sNe = e.Ekn),
      new ActivityBeginnerBookData_1.ActivityBeginnerBookData()
    );
  }
  async NewJourneyRequest() {
    const i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      this.sNe,
    );
    var e = Protocol_1.Aki.Protocol.Ros.create(),
      e =
        ((e.XFn = i.AllBeginnerTargetList),
        await Net_1.Net.CallAsync(13629, e));
    for (const r of e.RPs)
      i.UnLockBeginnerMap.set(r.IPs, r.TPs),
        i.FinishBeginnerMap.set(r.IPs, r.LPs);
    i.AllBeginnerTargetList.sort((e, r) => {
      var t = i.FinishBeginnerMap.get(e) ? 1 : 0,
        o = i.FinishBeginnerMap.get(r) ? 1 : 0;
      return t == o
        ? ((e =
            ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
              e,
            )),
          (r =
            ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
              r,
            )),
          e.Sort - r.Sort)
        : t - o;
    });
  }
  OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 5, "初始化鸣域新程"),
      !0
    );
  }
  OnClear() {
    return !0;
  }
}
exports.ActivityBeginnerBookController = ActivityBeginnerBookController;
//# sourceMappingURL=ActivityBeginnerBookController.js.map
