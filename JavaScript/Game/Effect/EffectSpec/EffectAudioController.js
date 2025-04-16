"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectAudioController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  DELTA_TIME_INTERNAL = 25,
  PRELOAD_ACTOR_COUNT = 20,
  SPAWN_ACTOR_COUNT = 2;
class EffectAudioController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    for (let o = 0; o < PRELOAD_ACTOR_COUNT; o++) {
      var t = ActorSystem_1.ActorSystem.Get(
        UE.BP_EffectAudio_C.StaticClass(),
        EffectAudioController.bqc.ToUeTransform(),
        void 0,
      );
      t &&
        ((t.bIsPermanentActor = !0),
        ActorSystem_1.ActorSystem.Put("特效音频播放Actor预创建回池", t));
    }
    return !0;
  }
  static OnTick(o) {
    (EffectAudioController.mie += o),
      EffectAudioController.mie < DELTA_TIME_INTERNAL ||
        ((EffectAudioController.mie = 0),
        EffectAudioController.Lqc(),
        EffectAudioController.wqc());
  }
  static wqc() {
    if (0 !== EffectAudioController.Rqc.size) {
      EffectAudioController.Aqc.Start();
      for (const r of EffectAudioController.Rqc) {
        var t = r[1];
        for (const f of t.EffectUidList) {
          var o = EffectAudioController.MQe.get(f);
          if (o && o.EffectActor?.IsValid()) {
            var o = o.EffectActor.D_K2_GetActorLocation(),
              e = new UE.Vector();
            if (
              (e.Set(o.X, o.Y, o.Z), 0 === t.EffectModel.LocationOffsets.Num())
            )
              t.Locations.Add(e);
            else
              for (let o = 0; o < t.EffectModel.LocationOffsets.Num(); o++)
                t.Locations.Add(
                  e.op_Addition(t.EffectModel.LocationOffsets.Get(o)),
                );
          }
        }
        0 < t.Locations.Num() &&
          (t.AkComponent.SetLocationOffsets(t.Locations), t.Locations.Empty());
      }
      EffectAudioController.Aqc.Stop();
    }
  }
  static AddPlayEffectAudio(o, t, e) {
    var r = ++EffectAudioController.Pqc,
      t = { ActorUid: 0, EffectActor: t };
    return (
      EffectAudioController.xqc.set(r, t),
      EffectAudioController.Uqc.set(r, { EffectModel: o, Priority: e }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EffectAudioCtrl] 加入待处理列表",
          ["EffectUid", r],
          ["AudioEvent", o.AudioEvent?.GetName()],
        ),
      r
    );
  }
  static OnStopEffectAudio(o, t) {
    var e;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[EffectAudioCtrl] Stop",
        ["EffectUid", o],
        ["Context", t],
      ),
      EffectAudioController.xqc.has(o)
        ? (EffectAudioController.xqc.delete(o),
          EffectAudioController.Uqc.delete(o),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              42,
              "[EffectAudioCtrl] Audio还在待处理列表中就Stop了",
              ["EffectUid", o],
            ))
        : EffectAudioController.MQe.has(o)
          ? ((t = EffectAudioController.MQe.get(o).ActorUid),
            EffectAudioController.Rqc.has(t)
              ? (e = EffectAudioController.Rqc.get(t)).EffectModel?.IsValid()
                ? (e.EffectUidList.delete(o),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Audio",
                      42,
                      "[EffectAudioCtrl][维护AudioMap] - DeleteAudioItem",
                      ["ActorUid", t],
                      ["EffectUid", o],
                      ["AudioEvent", e.EffectModel.AudioEvent?.GetName()],
                      ["AudioCount", EffectAudioController.MQe.size - 1],
                    ),
                  0 === e.EffectUidList.size &&
                    (EffectAudioController.gTt(e),
                    EffectAudioController.Dqc(e, e.Priority),
                    EffectAudioController.Rqc.delete(t)),
                  EffectAudioController.MQe.delete(o))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Audio",
                    42,
                    "[EffectAudioCtrl] EffectModel无效",
                    ["ActorUid", t],
                    ["EffectUid", o],
                  )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Audio",
                  42,
                  "[EffectAudioCtrl] ActorInfoMap没有指定ActorUid",
                  ["ActorUid", t],
                  ["EffectUid", o],
                ))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Audio",
              42,
              "[EffectAudioCtrl] AudioInfoMap中不存在指定的Uid",
              ["EffectUid", o],
            );
  }
  static Lqc() {
    if (0 !== EffectAudioController.xqc.size) {
      EffectAudioController.Bqc.Start();
      for (const e of EffectAudioController.xqc) {
        var o = e[0],
          t = e[1];
        EffectAudioController.kqc(o, t);
      }
      for (const r of EffectAudioController.Oqc)
        EffectAudioController.xqc.delete(r),
          EffectAudioController.Uqc.delete(r);
      (EffectAudioController.Oqc.length = 0),
        EffectAudioController.qqc >= SPAWN_ACTOR_COUNT &&
          0 !== EffectAudioController.xqc.size &&
          (EffectAudioController.mie = DELTA_TIME_INTERNAL),
        (EffectAudioController.qqc = 0),
        EffectAudioController.Gqc.clear(),
        EffectAudioController.Fqc.clear(),
        EffectAudioController.Bqc.Stop();
    }
  }
  static kqc(o, t) {
    var e, r, f;
    EffectAudioController.Uqc.has(o)
      ? (e = EffectAudioController.Uqc.get(o)).EffectModel.AudioEvent?.IsValid()
        ? EffectAudioController.qqc >= SPAWN_ACTOR_COUNT &&
          EffectAudioController.Nqc(e.EffectModel, e.Priority)
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Audio",
              42,
              "[EffectAudioCtrl] 本帧SpawnActor数量超额度,下一帧处理",
              ["EffectUid", o],
            )
          : (EffectAudioController.Oqc.push(o),
            (r = EffectAudioController.Vqc(e.EffectModel, e.Priority)),
            (t.ActorUid = r),
            EffectAudioController.Rqc.has(r)
              ? ((f = EffectAudioController.Rqc.get(r)).EffectUidList.add(o),
                EffectAudioController.MQe.set(o, t),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    42,
                    "[EffectAudioCtrl][维护AudioMap] ---- AddAudioItem",
                    ["ActorUid", r],
                    ["EffectUid", o],
                    ["AudioEvent", f.EffectModel.AudioEvent?.GetName()],
                    ["AudioCount", EffectAudioController.MQe.size],
                  ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Audio",
                  42,
                  "[EffectAudioCtrl] 未能正常获取指定ActorInfo",
                  ["ActorUid", r],
                  ["EffectUid", o],
                  ["AudioEvent", e.EffectModel.AudioEvent?.GetName()],
                ))
        : EffectAudioController.Oqc.push(o)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          42,
          "[EffectAudioCtrl] PendingEffectModelMap不含指定UID",
          ["EffectUid", o],
        );
  }
  static Nqc(o, t) {
    return 2 === t
      ? !EffectAudioController.Fqc.has(o)
      : !EffectAudioController.Gqc.has(o);
  }
  static Vqc(o, t) {
    return 2 === t
      ? EffectAudioController.jqc(o, EffectAudioController.Fqc, t)
      : EffectAudioController.jqc(o, EffectAudioController.Gqc, t);
  }
  static jqc(o, t, e) {
    if (!t.has(o)) {
      EffectAudioController.qqc++;
      var r = EffectAudioController.Hqc(o, e);
      if (!r)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              42,
              "[EffectAudioCtrl] 未能正常SpawnActor",
              ["AudioEvent", o.AudioEvent?.GetName()],
            ),
          0
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EffectAudioCtrl][合批] -------------- SpawnActor",
          ["ActorUid", r.ActorUid],
          ["AudioEvent", o.AudioEvent?.GetName()],
          ["EffectActor", r.Actor?.GetName()],
          ["Priority", e],
          ["ActorMapCount", EffectAudioController.Rqc.size + 1],
        ),
        void 0 !== e &&
          ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(
            e,
            r.Actor,
          ),
        t.set(o, r.ActorUid),
        EffectAudioController.Rqc.set(r.ActorUid, r),
        EffectAudioController.e0e(r, o, o.AudioEvent);
    }
    return t.get(o);
  }
  static Hqc(o, t) {
    var e = ActorSystem_1.ActorSystem.Get(
      UE.BP_EffectAudio_C.StaticClass(),
      EffectAudioController.bqc.ToUeTransform(),
      void 0,
    );
    if (e) {
      e.bIsPermanentActor = !0;
      var r = e.GetComponentByClass(UE.AkComponent.StaticClass());
      if (r)
        return {
          ActorUid: ++EffectAudioController.$qc,
          Actor: e,
          AkComponent: r,
          Locations: UE.NewArray(UE.Vector),
          EffectUidList: new Set(),
          AudioHandle: 0,
          EffectModel: o,
          Priority: t,
        };
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Audio", 42, "[EffectAudioCtrl] 获取AkComponent失败"),
        ActorSystem_1.ActorSystem.Put("获取AkComponent失败", e);
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "GetActor失败");
  }
  static Dqc(o, t) {
    void 0 !== t &&
      ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(
        0,
        o.Actor,
      ),
      o.AkComponent.SetComponentTickEnabled(!1),
      ActorSystem_1.ActorSystem.Put("特效音频播放完成Actor回池", o.Actor),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EffectAudioCtrl][合批] ------------ RecycleActor",
          ["ActorUid", o.ActorUid],
          ["AudioEvent", o.EffectModel.AudioEvent?.GetName()],
          ["ActorMapCount", EffectAudioController.Rqc.size - 1],
        );
  }
  static e0e(r, o, t, e = !1) {
    var f = r.AkComponent;
    if (f) {
      var i = t.GetName();
      if (f) {
        if (e) {
          if (t.IsInfinite)
            return void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Audio",
                42,
                "[EffectAudioCtrl] AudioEvent事件IsInfinite",
                ["ActorUid", r.ActorUid],
                ["AudioHandle", r.AudioHandle],
                ["EventName", i],
                ["EffectModel", o?.GetName()],
                ["EffectActor", r.Actor?.GetName()],
              )
            );
          e = new UE.TransformDouble(f.D_K2_GetComponentLocation());
          AudioSystem_1.AudioSystem.PostEvent(i, e, {
            CallbackMask: 1,
            CallbackHandler: (o, t) => {
              if (r.AudioHandle || 0 === o)
                for (const e of r.EffectUidList)
                  EffectAudioController.OnStopEffectAudio(e, "Callback");
            },
          });
        } else
          r.AudioHandle = AudioSystem_1.AudioSystem.PostEvent(i, f, {
            StopWhenOwnerDestroyed: !Info_1.Info.IsGameRunning(),
            CallbackMask: 1,
            CallbackHandler: (o, t) => {
              if (r.AudioHandle)
                for (const e of r.EffectUidList)
                  EffectAudioController.OnStopEffectAudio(e, "Callback");
            },
          });
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[EffectAudioCtrl][Audio事件] ---------- PostEvent",
            ["ActorUid", r.ActorUid],
            ["AudioHandle", r.AudioHandle],
            ["EffectModel", o?.GetName()],
            ["EffectActor", r.Actor?.GetName()],
          );
      }
    }
  }
  static gTt(o) {
    var t;
    0 !== o.AudioHandle &&
      (o.EffectModel.KeepAlive ||
        (AudioSystem_1.AudioSystem.ExecuteAction(o.AudioHandle, 0, {
          TransitionDuration: o.EffectModel.FadeOutTime,
          TransitionFadeCurve: o.EffectModel.FadeOutCurve,
        }),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[EffectAudioCtrl][Audio事件] ---------- StopEvent",
            ["ActorUid", o.ActorUid],
            ["AudioHandle", o.AudioHandle],
            ["EffectModel", o.EffectModel?.GetName()],
            ["EffectActor", o.Actor?.GetName()],
          ),
        (o.AudioHandle = 0)),
      (t = o.EffectModel?.TrailingAudioEvent)?.IsValid()) &&
      EffectAudioController.e0e(o, o.EffectModel, t, !0);
  }
}
((exports.EffectAudioController =
  EffectAudioController).IsTickEvenPausedInternal = !0),
  (EffectAudioController.$qc = 0),
  (EffectAudioController.Pqc = 0),
  (EffectAudioController.mie = 0),
  (EffectAudioController.bqc = Transform_1.Transform.Create(
    Quat_1.Quat.Identity,
    Vector_1.Vector.ZeroVector,
    Vector_1.Vector.ZeroVector,
  )),
  (EffectAudioController.Rqc = new Map()),
  (EffectAudioController.MQe = new Map()),
  (EffectAudioController.Bqc = Stats_1.Stat.Create(
    "EffectAudioController.HandlePendingMap",
  )),
  (EffectAudioController.Aqc = Stats_1.Stat.Create(
    "EffectAudioController.UpdateLocationOffsets",
  )),
  (EffectAudioController.xqc = new Map()),
  (EffectAudioController.Uqc = new Map()),
  (EffectAudioController.Gqc = new Map()),
  (EffectAudioController.Fqc = new Map()),
  (EffectAudioController.Oqc = []),
  (EffectAudioController.qqc = 0);
//# sourceMappingURL=EffectAudioController.js.map
