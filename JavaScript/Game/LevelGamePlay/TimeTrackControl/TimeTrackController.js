"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeTrackController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
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
    let r;
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
    const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      ModelManager_1.ModelManager.TimeTrackControlModel.RefEntityId,
    )?.Entity?.GetComponent(147);
    e && e.ForceExitSeqCamera(),
      (ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera =
        !1),
      (ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi = !1);
  }
  static TimelineTraceStartRequest(t, e) {
    const a = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId;
    const r =
      (void 0 === a &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneGameplay",
          7,
          "时间控制装置启动请求:当前没有有效的控制实体",
        ),
      Protocol_1.Aki.Protocol.Ous.create());
    (r.rkn = MathUtils_1.MathUtils.NumberToLong(a)),
      (r.Akn = e),
      Net_1.Net.Call(21256, r, (e) => {
        e &&
          (ModelManager_1.ModelManager.TimeTrackControlModel.InitControlInfo(e),
          (ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera =
            !0),
          (ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi = !0),
          this.Gwe(e.sfs, t)
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneGameplay",
                46,
                "时间控制装置启动请求:HandleStaticSceneSeq成功",
                ["entityid", t],
              )
            : (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
              this.HandleTimeTrackControlViewClose(),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneGameplay",
                  46,
                  "时间控制装置启动请求:HandleStaticSceneSeq失败",
                  ["entityid", t],
                )));
      });
  }
  static TimelineTraceControlRequest(e) {
    const t = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId;
    const a =
      (void 0 === t &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneGameplay",
          7,
          "时间控制装置变更请求:当前没有有效的控制实体",
        ),
      (ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated = !1),
      Protocol_1.Aki.Protocol.Nus.create());
    (a.BFn = e),
      (a.rkn = MathUtils_1.MathUtils.NumberToLong(t)),
      Net_1.Net.Call(7782, a, (e) => {
        let t;
        (ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated = !0),
          e &&
            (e.Kms === Protocol_1.Aki.Protocol.lkn.Proto_ErrTimelineMove
              ? EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnTimeTrackControlUpdate,
                  e.GCs,
                  e.Kms,
                )
              : e.Kms === Protocol_1.Aki.Protocol.lkn.Sys &&
                ((t =
                  ModelManager_1.ModelManager.TimeTrackControlModel
                    .ControlPoint),
                ModelManager_1.ModelManager.TimeTrackControlModel.UpdateControlInfo(
                  e.GCs,
                ),
                this.Nwe(t, e.GCs),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnTimeTrackControlUpdate,
                  e.GCs,
                  e.Kms,
                )));
      });
  }
  static TimelineTraceExitRequest() {
    const e = ModelManager_1.ModelManager.TimeTrackControlModel.CreatureDataId;
    const t =
      (void 0 === e &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneGameplay",
          7,
          "时间控制装置退出请求:当前没有有效的控制实体",
        ),
      Protocol_1.Aki.Protocol.Vus.create());
    (t.rkn = MathUtils_1.MathUtils.NumberToLong(e)),
      Net_1.Net.Call(13904, t, (e) => {});
  }
  static Gwe(t, a) {
    if (t?.length) {
      for (let e = t.length - 1; e >= 0; e--) {
        const r = MathUtils_1.MathUtils.LongToNumber(t[e]);
        let n = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
        if (n?.Valid) {
          n = n.Entity?.GetComponent(147);
          if (n && n.ForceEnterSeqCamera())
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
    return !1;
  }
  static Nwe(e, t) {
    let a = ModelManager_1.ModelManager.TimeTrackControlModel.ControllerEntity;
    a?.Valid
      ? ((a = a.Entity.GetComponent(118)),
        ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigStatesCounts() <
          2 || a?.PlayActiveSeqForDuration(t < e, -1))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "SceneGameplay",
          40,
          "时间控制装置自身表现变化:当前没有有效的控制实体",
        );
  }
}
(exports.TimeTrackController = TimeTrackController),
  ((_a = TimeTrackController).B7 = void 0),
  (TimeTrackController.ePn = () => {
    _a.B7 && (_a.B7(!0), (_a.B7 = void 0));
  }),
  (TimeTrackController.OnViewTargetChanged = (e) => {
    CameraController_1.CameraController.Model.IsToLockOnCameraMode() &&
      (e <= 1
        ? TimerSystem_1.TimerSystem.Delay(_a.ePn, 1e3)
        : TimerSystem_1.TimerSystem.Delay(_a.ePn, 1e3 * e));
  }),
  (TimeTrackController.zpe = (e, t) => {
    TimeTrackController.SafeUnRegisterEvents(t),
      UiManager_1.UiManager.IsViewOpen("TimeTrackControlView") &&
        UiManager_1.UiManager.CloseView("TimeTrackControlView");
  });
// # sourceMappingURL=TimeTrackController.js.map
