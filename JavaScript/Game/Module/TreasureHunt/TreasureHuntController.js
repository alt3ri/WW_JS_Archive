"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureHuntController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil"),
  TrackController_1 = require("../Track/TrackController");
class TreasureHuntController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.av(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterNearbyTrackRange,
        this.JD_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.ZD_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveNearbyTrack,
        this.ZD_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.M6l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.E6l,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      this.av(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterNearbyTrackRange,
        this.JD_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.ZD_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveNearbyTrack,
        this.ZD_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.M6l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.E6l,
      ),
      !0
    );
  }
  static OnLeaveLevel() {
    return this.av(), !0;
  }
  static av() {
    (this.gHl = 0), (this.fHl = 0), this.SetCompassActive(!1, 1, !1);
  }
  static AddCompassTrack(e) {
    ModelManager_1.ModelManager.TreasureHuntModel?.IsInTracking(e) ||
      (ModelManager_1.ModelManager.TreasureHuntModel?.AddCompassTrack(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Track", 67, "[TreasureHuntModel]添加追踪信息", [
          "entityId",
          e,
        ]));
  }
  static RemoveCompassTrack(e) {
    ModelManager_1.ModelManager.TreasureHuntModel?.IsInTracking(e) &&
      (ModelManager_1.ModelManager.TreasureHuntModel?.RemoveCompassTrack(e),
      this.fHl === e && this.ClearNearbyTrack(),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Track", 67, "[TreasureHuntModel]移除追踪信息", [
        "entityId",
        e,
      ]);
  }
  static SetCompassActive(e, t, r = !0) {
    var n = this.gHl,
      a = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.gHl, e, t);
    (this.gHl = a) !== n &&
      ((n = 0 === a),
      ModelManager_1.ModelManager.TreasureHuntModel?.SetCompassActive(n)),
      r &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Track",
          67,
          "[TreasureHuntController]设置指南针显示",
          ["isVisible", e],
          ["reason", t],
          ["state", a],
        );
  }
  static SetNearbyTrack(e) {
    this.ClearNearbyTrack();
    var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e)?.Entity,
      r = t?.GetComponent(158);
    t &&
      r &&
      ((t = {
        TrackSource: 3,
        Id: e,
        IconPath: r.IconPath ?? "",
        TrackTarget:
          ControllerHolder_1.ControllerHolder.CharacterController.GetActorByEntity(
            t,
          ),
        TrackType: r.TrackType,
        Offset: r.IconOffset,
        IsSubTrack: !1,
      }),
      TrackController_1.TrackController.StartTrack(t),
      (this.fHl = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Track", 67, "[TreasureHuntController]设置附近追踪", [
          "entityId",
          e,
        ]),
      ModelManager_1.ModelManager.TreasureHuntModel?.SetNearbyTrack(e));
  }
  static ClearNearbyTrack() {
    0 !== this.fHl &&
      (TrackController_1.TrackController.EndTrack(3, this.fHl),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Track", 67, "[TreasureHuntController]清理附近追踪", [
          "entityId",
          this.fHl,
        ]),
      (this.fHl = 0)),
      ModelManager_1.ModelManager.TreasureHuntModel?.ClearNearbyTrack();
  }
}
(exports.TreasureHuntController = TreasureHuntController),
  ((_a = TreasureHuntController).gHl = 0),
  (TreasureHuntController.fHl = 0),
  (TreasureHuntController.JD_ = (e) => {
    var t;
    e &&
      e.Valid &&
      (t = e.GetComponent(158))?.Valid &&
      "Compass" === t.TrackConfigType &&
      _a.AddCompassTrack(e.Id);
  }),
  (TreasureHuntController.ZD_ = (e) => {
    var t;
    e &&
      e.Valid &&
      (t = e.GetComponent(158))?.Valid &&
      "Compass" === t.TrackConfigType &&
      _a.RemoveCompassTrack(e.Id);
  }),
  (TreasureHuntController.M6l = (e) => {
    e.IsRolePassenger(!0) &&
      ModelManager_1.ModelManager.TreasureHuntModel?.SetDetectVehicleType(
        e.VehicleType,
      );
  }),
  (TreasureHuntController.E6l = (e) => {
    e.IsRolePassenger(!0) &&
      ModelManager_1.ModelManager.TreasureHuntModel?.SetDetectVehicleType(
        void 0,
      );
  });
//# sourceMappingURL=TreasureHuntController.js.map
