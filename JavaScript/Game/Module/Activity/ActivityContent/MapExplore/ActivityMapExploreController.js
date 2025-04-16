"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMapExploreController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityMapExploreData_1 = require("./ActivityMapExploreData"),
  ActivitySubViewMapExplore_1 = require("./ActivitySubViewMapExplore");
class ActivityMapExploreController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_MapExplorationMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewMapExplore_1.ActivitySubViewMapExplore();
  }
  OnCreateActivityData(e) {
    return (
      (this.Data = new ActivityMapExploreData_1.ActivityMapExploreData()),
      this.Data
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27884, (e) => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Temp", 69, "stc", ["", e]),
        this.Data.UpdateTaskState(e.E$s),
        this.uOc();
    });
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27884);
  }
  async RequestGetReward(e) {
    var t = new Protocol_1.Aki.Protocol.atc(),
      e =
        ((t.gps = e),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Temp", 69, "atc", ["", t]),
        await Net_1.Net.CallAsync(29494, t));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Temp", 69, "htc", ["", e]),
      e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          29494,
        );
  }
  uOc() {
    this.Data?.Id &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Data.Id,
      );
  }
}
exports.ActivityMapExploreController = ActivityMapExploreController;
//# sourceMappingURL=ActivityMapExploreController.js.map
