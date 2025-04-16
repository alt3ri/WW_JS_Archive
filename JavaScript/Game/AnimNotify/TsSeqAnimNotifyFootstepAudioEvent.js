"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../Core/Audio/AudioSystem"),
  Log_1 = require("../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  SequenceUtils_1 = require("../Module/Plot/Sequence/SequenceUtils"),
  VoxelUtils_1 = require("../Utils/VoxelUtils"),
  MATERIAL_ID_WAT = 6,
  MATERIAL_ID_SHR = 14;
class TsSeqAnimNotifyFootstepAudioEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.Variant = 0),
      (this.FootstepEvent = void 0),
      (this.FootTraceElement = void 0),
      (this.FootstepVariantMap = UE.NewMap(UE.BuiltinInt, UE.BuiltinString));
  }
  Constructor() {}
  K2_Notify(e, t) {
    if (!e)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Audio", 45, "不存在的MeshComp", [
            "AnimNotify",
            this.GetName(),
          ]),
        !1
      );
    e = e.GetOwner();
    if (!e)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Audio", 45, "不存在的MeshComp Owner", [
            "AnimNotify",
            this.GetName(),
          ]),
        !1
      );
    let o = !1;
    var i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
    if (1 !== i && 3 !== i) {
      i = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor();
      if (
        i &&
        ((o = i.GetAnimAudio()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            45,
            "存在Seq",
            ["seq", i.GetName()],
            ["AnimAudio", o],
          ),
        o)
      ) {
        AudioSystem_1.AudioSystem.SetSwitch(
          "footstep_texture",
          "DirtSurface",
          e,
        );
        const s =
          this.FootstepEvent &&
          (0, AudioSystem_1.parseAudioEventPath)(this.FootstepEvent);
        if (!s)
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                45,
                "[Game.AnimNotify] eventName为空",
                ["EventName", s],
                ["AnimNotify", this.GetName()],
              ),
            !1
          );
        const r = AudioSystem_1.AudioSystem.GetAkComponent(e);
        return AudioSystem_1.AudioSystem.PostEvent(s, r), !0;
      }
    } else
      o =
        ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ??
        !1;
    if (!o) return !1;
    this.FootstepVariantMap.Set(0, "land"),
      this.FootstepVariantMap.Set(1, "run"),
      this.FootstepVariantMap.Set(2, "runstop"),
      this.FootstepVariantMap.Set(3, "sprint"),
      this.FootstepVariantMap.Set(4, "sprintstop"),
      this.FootstepVariantMap.Set(5, "walk"),
      this.FootstepVariantMap.Set(6, "walkstop"),
      this.FootstepVariantMap.Set(7, "turnback");
    i = e.D_K2_GetActorLocation();
    (this.FootTraceElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.FootTraceElement.bIsSingle = !0),
      (this.FootTraceElement.bTraceComplex = !1),
      (this.FootTraceElement.bIgnoreSelf = !0),
      (this.FootTraceElement.WorldContextObject = e),
      this.FootTraceElement.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
      ),
      this.FootTraceElement.SetStartLocation(i.X, i.Y, i.Z),
      this.FootTraceElement.SetEndLocation(i.X, i.Y, i.Z - 400),
      UE.KuroTraceLibrary.LineTrace(this.FootTraceElement, "");
    const r = AudioSystem_1.AudioSystem.GetAkComponent(e);
    AudioSystem_1.AudioSystem.SetSwitch(
      "footstep_variant",
      this.FootstepVariantMap.Get(this.Variant),
      e,
    );
    i = this.GetFootstepTexture();
    this.FootTraceElement.Dispose();
    const s =
      this.FootstepEvent &&
      (0, AudioSystem_1.parseAudioEventPath)(this.FootstepEvent);
    return s
      ? (AudioSystem_1.AudioSystem.SetSwitch("footstep_texture", i, e),
        AudioSystem_1.AudioSystem.PostEvent(s, r),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            45,
            "[Game.AnimNotify] eventName为空",
            ["EventName", s],
            ["AnimNotify", this.GetName()],
          ),
        !1);
  }
  GetNotifyName() {
    return "SeqAnimNotifyFootstepAudioEvent";
  }
  GetFootstepTexture() {
    var e = this.FootTraceElement?.HitResult;
    if (!e?.IsValid()) return "DirtSurface";
    let t = !1;
    var o,
      i = e.Components.Get(0),
      i =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(
          i,
        );
    return (t = !(!i?.IsValid() || "WaterLightLand" !== i.GetName()) || t)
      ? this.CheckWaterSurfaceType(e)
      : ((i = Vector_1.Vector.Create()),
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, 0, i),
        (e = i.ToUeVector()),
        (i = (0, puerts_1.$ref)(void 0)),
        (o = (0, puerts_1.$ref)(void 0)),
        GlobalData_1.GlobalData.World
          ? VoxelUtils_1.VoxelUtils.TryGetVoxelInfo(
              GlobalData_1.GlobalData.World,
              e,
              i,
              -1,
              o,
            )
            ? (i = (0, puerts_1.$unref)(i))
              ? i.MtlID === MATERIAL_ID_WAT || i.MtlID === MATERIAL_ID_SHR
                ? "DirtSurface"
                : UE.KuroVoxelSystem.GetMtlNameByID(i.MtlID)
              : (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "LevelEvent",
                    45,
                    "[WorldController]Streaming:获取voxelInfo信息失败",
                    ["Location", e],
                    ["ErrorCode", (0, puerts_1.$unref)(o)],
                  ),
                "DirtSurface")
            : (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "LevelEvent",
                  45,
                  "[WorldController]Streaming:获取体素信息失败",
                  ["Location", e],
                  ["ErrorCode", (0, puerts_1.$unref)(o)],
                ),
              "DirtSurface")
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("LevelEvent", 45, "World为空"),
            "DirtSurface"));
  }
  CheckWaterSurfaceType(t) {
    if (t) {
      var o = t.GetHitCount();
      for (let e = 0; e < o; ++e)
        if (
          2 ===
          t.Components.Get(e).BodyInstance.CollisionResponses.ResponseToChannels
            .GameTraceChannel2
        )
          return "WaterSurface";
    }
    return "DirtSurface";
  }
}
exports.default = TsSeqAnimNotifyFootstepAudioEvent;
//# sourceMappingURL=TsSeqAnimNotifyFootstepAudioEvent.js.map
