"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlertAreaController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ALERT_VAL_PROGRESS_INTERVAL = 1e3;
class AlertAreaController extends ControllerBase_1.ControllerBase {
  static OnClear() {
    for (const e of Array.from(this.MMl.keys()))
      this.DisableAlertValueProgressTimer(e);
    return this.MMl.clear(), !0;
  }
  static UpdateAlertDataByServerNotify(e) {
    for (const r of e.BE_)
      this.DisableAlertValueProgressTimer(r),
        ModelManager_1.ModelManager.AlertAreaModel?.DisableAlertArea(r);
    for (const t of e.DE_)
      ModelManager_1.ModelManager.AlertAreaModel?.GetAreaAlertEnabled(t.p6n)
        ? (ModelManager_1.ModelManager.AlertAreaModel?.UpdateAreaAlertValue(
            t.p6n,
            t.kE_,
          ),
          ModelManager_1.ModelManager.AlertAreaModel?.UpdateAreaAlertUiEnabled(
            t.p6n,
            t.OE_,
          ),
          ModelManager_1.ModelManager.AlertAreaModel?.UpdateAreaAlertUiVisible(
            t.p6n,
            t.GE_,
          ),
          0 !== t.qE_
            ? this.EnableAlertValueProgressTimer(
                t.p6n,
                t.qE_,
                ALERT_VAL_PROGRESS_INTERVAL,
              )
            : this.DisableAlertValueProgressTimer(t.p6n))
        : (ModelManager_1.ModelManager.AlertAreaModel?.EnableAlertArea(
            t.p6n,
            t.kE_,
            t.OE_,
            t.GE_,
          ),
          0 !== t.qE_ &&
            this.EnableAlertValueProgressTimer(
              t.p6n,
              t.qE_,
              ALERT_VAL_PROGRESS_INTERVAL,
            ));
  }
  static EnableAlertValueProgressTimer(r, t, e) {
    this.DisableAlertValueProgressTimer(r);
    e = TimerSystem_1.TimerSystem.Forever(() => {
      var e;
      ModelManager_1.ModelManager.AlertAreaModel?.GetAreaAlertEnabled(r)
        ? ((e =
            ModelManager_1.ModelManager.AlertAreaModel.GetAreaAlertValue(r)),
          ModelManager_1.ModelManager.AlertAreaModel.UpdateAreaAlertValue(
            r,
            e + t,
          ))
        : this.DisableAlertValueProgressTimer(r);
    }, e);
    this.MMl.set(r, e);
  }
  static DisableAlertValueProgressTimer(e) {
    var r = this.MMl.get(e);
    r &&
      (TimerSystem_1.TimerSystem.Has(r) && TimerSystem_1.TimerSystem.Remove(r),
      this.MMl.delete(e));
  }
}
(exports.AlertAreaController = AlertAreaController).MMl = new Map();
//# sourceMappingURL=AlertAreaController.js.map
