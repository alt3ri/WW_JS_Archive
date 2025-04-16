"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MapDebugger_1 = require("../Map/Mark/Debug/MapDebugger");
class TrackController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterNearbyTrackRange,
        this.gRo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.fRo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveNearbyTrack,
        this.fRo,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterNearbyTrackRange,
        this.gRo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveNearbyTrackRange,
        this.fRo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveNearbyTrack,
        this.fRo,
      ),
      !0
    );
  }
  static StartTrack(e, r = !0) {
    return (
      !!e &&
      (ModelManager_1.ModelManager.WorldMapModel.EnableDebug
        ? MapDebugger_1.MapDebugger.PrintTrackDataInfo(
            "追踪控制器.开始追踪:",
            e,
          )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Track",
            63,
            "开始追踪:",
            ["追踪类型:", e.TrackSource],
            ["追踪Id:", e.Id],
            ["追踪目标:", e.TrackTarget],
            ["追踪数据:", e],
          ),
      (e.IsSubTrack = r),
      ModelManager_1.ModelManager.TrackModel.AddTrackData(e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMark, e),
      !0)
    );
  }
  static EndTrack(e, r) {
    var t = ModelManager_1.ModelManager.TrackModel.GetTrackData(e, r);
    return (
      !!t &&
      (ModelManager_1.ModelManager.WorldMapModel.EnableDebug
        ? MapDebugger_1.MapDebugger.PrintTrackDataInfo(
            "追踪控制器.取消追踪:",
            t,
          )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Track",
            63,
            "取消追踪:",
            ["追踪类型:", t.TrackSource],
            ["追踪Id:", t.Id],
            ["追踪目标:", t.TrackTarget],
            ["追踪数据:", t],
          ),
      ModelManager_1.ModelManager.TrackModel.RemoveTrackData(e, r),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnTrackMark, t),
      !0)
    );
  }
  static SetTrackMarkOccupied(e, r, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SetTrackMarkOccupied,
      e,
      r,
      t,
    );
  }
}
((exports.TrackController = TrackController).gRo = (r) => {
  if (r) {
    var t = r.GetComponent(158);
    if (t?.Valid && "Compass" !== t.TrackConfigType) {
      var n = r.GetComponent(1).CreatureData.GetPbEntityInitData(),
        o = (0, IComponent_1.getComponent)(
          n.ComponentsData,
          "InteractComponent",
        ),
        e = r.GetComponent(194);
      if (!e || !e.HasTag(1196894179)) {
        let e = 3;
        o && (e = o.Range / 100),
          TrackController.StartTrack({
            TrackSource: 3,
            Id: r.Id,
            IconPath: t?.IconPath ?? "",
            TrackHideDis: e,
            TrackTarget:
              ControllerHolder_1.ControllerHolder.CharacterController.GetActorByEntity(
                r,
              ),
            TrackType: t.TrackType,
            Offset: t.IconOffset,
            IsSubTrack: !1,
            AreaId: n?.AreaId,
          });
      }
    }
  }
}),
  (TrackController.fRo = (e) => {
    TrackController.EndTrack(3, e.Id);
  });
//# sourceMappingURL=TrackController.js.map
