"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeTrackController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class TimeTrackController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CameraViewTargetChanged,
      this.OnViewTargetChanged,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraViewTargetChanged,
        this.OnViewTargetChanged,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CameraViewTargetChanged,
      this.OnViewTargetChanged,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CameraViewTargetChanged,
        this.OnViewTargetChanged,
      );
  }
  static SafeRegisterEvents(e) {
    EventSystem_1.EventSystem.HasWithTarget(
      e.Entity,
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    ) ||
      EventSystem_1.EventSystem.AddWithTarget(
        e.Entity,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  static SafeUnRegisterEvents(e) {
    EventSystem_1.EventSystem.HasWithTarget(
      e.Entity,
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e.Entity,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  static OpenTimeTrackControlView(e, t, a) {
    var r;
    UiManager_1.UiManager.IsViewOpen("TimeTrackControlView")
      ? a && (a(!1), (this.B7 = void 0))
      : (ModelManager_1.ModelManager.TimeTrackControlModel.SetCurrentTimeTrackControl(
          e,
          t,
        ),
        (r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)),
        this.SafeRegisterEvents(r),
        (this.B7 = a),
        this.TimelineTraceStartRequest(e, t));
  }
  static HandleTimeTrackControlViewClose() {
    this.TimelineTraceExitRequest();
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      ModelManager_1.ModelManager.TimeTrackControlModel.RefEntityId,
    )?.Entity?.GetComponent(150);
    e && e.ForceExitSeqCamera(),
      (ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera =
        !1),
      (ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi = !1);
  }
  static TimelineTraceStartRequest(t, e) {
    var a = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId,
      r =
        (void 0 === a &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneGameplay",
            7,
            "时间控制装置启动请求:当前没有有效的控制实体",
          ),
        Protocol_1.Aki.Protocol.NCs.create());
    (r.F4n = MathUtils_1.MathUtils.NumberToLong(a)),
      (r.c5n = e),
      Net_1.Net.Call(15147, r, (e) => {
        e
          ? (ModelManager_1.ModelManager.TimeTrackControlModel.InitControlInfo(
              e,
            ),
            (ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera =
              !0),
            (ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi = !0),
            this.Gwe(e.PSs, t)
              ? Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneGameplay",
                  46,
                  "时间控制装置启动请求:HandleStaticSceneSeq成功",
                  ["entityid", t],
                )
              : (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                this.HandleTimeTrackControlViewClose(),
                this.FinishCallback(!1),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneGameplay",
                    46,
                    "时间控制装置启动请求:HandleStaticSceneSeq失败",
                    ["entityid", t],
                  )))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneGameplay",
                46,
                "时间控制装置启动请求:response请求失败",
                ["entityid", t],
              ),
            this.FinishCallback(!1));
      });
  }
  static TimelineTraceControlRequest(e) {
    var t = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId,
      a =
        (void 0 === t &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneGameplay",
            7,
            "时间控制装置变更请求:当前没有有效的控制实体",
          ),
        (ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated = !1),
        Protocol_1.Aki.Protocol.VCs.create());
    (a.f6n = e),
      (a.F4n = MathUtils_1.MathUtils.NumberToLong(t)),
      Net_1.Net.Call(18608, a, (e) => {
        var t;
        (ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated = !0),
          e &&
            (e.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTimelineMove
              ? EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnTimeTrackControlUpdate,
                  e.nps,
                  e.Cvs,
                )
              : e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs &&
                ((t =
                  ModelManager_1.ModelManager.TimeTrackControlModel
                    .ControlPoint),
                ModelManager_1.ModelManager.TimeTrackControlModel.UpdateControlInfo(
                  e.nps,
                ),
                this.Nwe(t, e.nps),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnTimeTrackControlUpdate,
                  e.nps,
                  e.Cvs,
                )));
      });
  }
  static TimelineTraceExitRequest() {
    var e = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId,
      t =
        (void 0 === e &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneGameplay",
            7,
            "时间控制装置退出请求:当前没有有效的控制实体",
          ),
        Protocol_1.Aki.Protocol.HCs.create());
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(25003, t, (e) => {});
  }
  static Gwe(t, a) {
    if (t?.length) {
      for (let e = t.length - 1; 0 <= e; e--) {
        var r = MathUtils_1.MathUtils.LongToNumber(t[e]),
          i = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
        if (i?.Valid) {
          i = i.Entity?.GetComponent(150);
          if (i && i.ForceEnterSeqCamera())
            return (
              (ModelManager_1.ModelManager.TimeTrackControlModel.RefEntityId =
                r),
              (ModelManager_1.ModelManager.TimeTrackControlModel.RefTrueEntityId =
                a),
              !0
            );
        }
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          46,
          "时间控制装置启动请求:失败，没找到合适的entityId",
          ["entityid", a],
        );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          46,
          "时间控制装置启动请求:失败，inId数组长度异常",
          ["entityid", a],
        );
    return this.FinishCallback(!1), !1;
  }
  static Nwe(e, t) {
    var a = ModelManager_1.ModelManager.TimeTrackControlModel.ControllerEntity;
    a?.Valid
      ? ((a = a.Entity.GetComponent(121)),
        ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigStatesCounts() <
          2 ||
          (t !== e && a?.PlayActiveSeqForDuration(t < e, -1)))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneGameplay",
          40,
          "时间控制装置自身表现变化:当前没有有效的控制实体",
        );
  }
  static FinishCallback(e) {
    this.B7 &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          46,
          "时间控制装置启动请求:FinishCallback",
        ),
      this.B7(e),
      (this.B7 = void 0));
  }
}
(exports.TimeTrackController = TimeTrackController),
  ((_a = TimeTrackController).B7 = void 0),
  (TimeTrackController.VBn = () => {
    _a.FinishCallback(!0);
  }),
  (TimeTrackController.OnViewTargetChanged = (e) => {
    CameraController_1.CameraController.Model.IsToLockOnCameraMode() &&
      _a.B7 &&
      (e <= 1
        ? TimerSystem_1.TimerSystem.Delay(_a.VBn, 1e3)
        : TimerSystem_1.TimerSystem.Delay(_a.VBn, 1e3 * e));
  }),
  (TimeTrackController.zpe = (e, t) => {
    TimeTrackController.SafeUnRegisterEvents(t),
      UiManager_1.UiManager.IsViewOpen("TimeTrackControlView") &&
        UiManager_1.UiManager.CloseView("TimeTrackControlView");
  });
//# sourceMappingURL=TimeTrackController.js.map
