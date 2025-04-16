"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlertAreaModel = exports.AlertAreaData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  AlertAreaConfigById_1 = require("../../../Core/Define/ConfigQuery/AlertAreaConfigById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class AlertAreaData {
  constructor(e, t) {
    (this.MinAlertValue = e),
      (this.MaxAlertValue = t),
      (this.AlertValue = 0),
      (this.AlertUiEnabled = !1),
      (this.AlertUiVisible = !1);
  }
}
exports.AlertAreaData = AlertAreaData;
class AlertAreaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.SMl = new Map());
  }
  GetAreaAlertEnabled(e) {
    return this.SMl.has(e);
  }
  GetAreaAlertUiEnabled(e) {
    e = this.SMl.get(e);
    return !!e && e.AlertUiEnabled;
  }
  GetAreaAlertUiVisible(e) {
    e = this.SMl.get(e);
    return !!e && e.AlertUiEnabled && e.AlertUiVisible;
  }
  GetAlertUiVisibleAreaId() {
    for (var [e, t] of this.SMl)
      if (t && t.AlertUiEnabled && t.AlertUiVisible) return e;
  }
  GetAreaAlertValue(e) {
    return this.SMl.get(e)?.AlertValue ?? 0;
  }
  UpdateAreaAlertValue(e, t) {
    var r,
      i = this.SMl.get(e);
    i &&
      ((r = MathUtils_1.MathUtils.Clamp(t, i.MinAlertValue, i.MaxAlertValue)),
      i.AlertValue !== r) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelPlay",
          39,
          "[区域警戒] 警戒值更新",
          ["AreaId", e],
          ["AlertValue", t],
        ),
      (i.AlertValue = r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUpdateAreaAlertValue,
        e,
        t,
      ));
  }
  UpdateAreaAlertUiEnabled(e, t) {
    var r = this.SMl.get(e);
    r &&
      r.AlertUiEnabled !== t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelPlay",
          39,
          "[区域警戒] 警戒UI开启/关闭",
          ["AreaId", e],
          ["Enable", t],
        ),
      t || this.UpdateAreaAlertUiVisible(e, !1),
      (r.AlertUiEnabled = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUpdateAreaAlertUiEnable,
        e,
        t,
      ));
  }
  UpdateAreaAlertUiVisible(e, t) {
    var r = this.SMl.get(e);
    r &&
      r.AlertUiEnabled &&
      r.AlertUiVisible !== t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelPlay",
          39,
          "[区域警戒] 警戒UI显示/隐藏",
          ["AreaId", e],
          ["Visible", t],
        ),
      (r.AlertUiVisible = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUpdateAreaAlertUiVisible,
        e,
        t,
      ));
  }
  EnableAlertArea(e, t, r, i) {
    var a;
    this.SMl.has(e) ||
      ((a = AlertAreaConfigById_1.configAlertAreaConfigById.GetConfig(e)) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "LevelPlay",
            39,
            "[区域警戒] 警戒值开启",
            ["AreaId", e],
            ["InitValue", t],
            ["InitUiEnable", r],
            ["InitUiVisible", i],
          ),
        ((a = new AlertAreaData(a.MinValue, a.MaxValue)).AlertValue =
          MathUtils_1.MathUtils.Clamp(t, a.MinAlertValue, a.MaxAlertValue)),
        (a.AlertUiEnabled = r),
        (a.AlertUiVisible = i),
        this.SMl.set(e, a),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateAreaAlertEnable,
          e,
          !0,
        ),
        a.AlertUiEnabled &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnUpdateAreaAlertUiEnable,
            e,
            !0,
          ),
        a.AlertUiVisible) &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateAreaAlertUiVisible,
          e,
          !0,
        ));
  }
  DisableAlertArea(e) {
    var t = this.SMl.get(e);
    t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "LevelPlay",
          39,
          "[区域警戒] 警戒值关闭",
          ["AreaId", e],
          ["AlertData", t],
        ),
      t.AlertUiEnabled &&
        t.AlertUiVisible &&
        ((t.AlertUiVisible = !1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateAreaAlertUiVisible,
          e,
          !1,
        )),
      t.AlertUiEnabled &&
        ((t.AlertUiEnabled = !1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateAreaAlertUiEnable,
          e,
          !1,
        )),
      this.SMl.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUpdateAreaAlertEnable,
        e,
        !1,
      ));
  }
}
exports.AlertAreaModel = AlertAreaModel;
//# sourceMappingURL=AlertAreaModel.js.map
