"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetActorVisible = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const PATH_LENGTH = 3;
class LevelEventSetActorVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    const o = e;
    if (o) {
      e = t;
      if (e) {
        t = EntitySystem_1.EntitySystem.Get(e.EntityId);
        if (t?.Valid)
          if (o.Targets && o.Targets.length !== 0)
            if (t.GetComponent(182)?.Owner) {
              const a = t.GetComponent(147);
              if (a) {
                const s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
                  GlobalData_1.GlobalData.World,
                  UE.KuroActorSubsystem.StaticClass(),
                );
                const n = o.SyncChildActor || !1;
                for (const E of o.Targets) {
                  const r = E.PathName;
                  var i = r.split(".");
                  if (i.length < PATH_LENGTH)
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "LevelEvent",
                        7,
                        "[SetActorVisible]actor路径错误",
                        ["RefPath", r],
                      );
                  else {
                    i = i[1] + "." + i[2];
                    if (a.IsValidPlatFormPath(i)) {
                      var i = new UE.FName(i);
                      const c = s.GetActor(i);
                      if (c?.IsValid())
                        switch (
                          (c.SetActorEnableCollision(o.Enable), o.ActorType)
                        ) {
                          case "MeshActor":
                            c.SetActorHiddenInGame(!o.Enable);
                            var l = o.Enable ? 3 : 0;
                            c instanceof UE.StaticMeshActor &&
                              (o.Enable
                                ? c.SetLogicallyShow(3)
                                : c.SetLogicallyHidden()),
                              c instanceof UE.BP_KuroISMGroup_C &&
                                (o.Enable
                                  ? c.SeyLogicallyShowForAllChildren()
                                  : c.SeyLogicallyHiddenForAllChildren()),
                              c.RootComponent?.IsValid() &&
                                c.RootComponent instanceof
                                  UE.PrimitiveComponent &&
                                (c.RootComponent.SetCollisionEnabled(l),
                                c.RootComponent.SetHiddenInGame(!o.Enable, n));
                            break;
                          case "SoundActor":
                            c instanceof UE.KuroAmbientSoundActor &&
                              c.RootComponent instanceof
                                UE.KuroAmbientSoundComponent &&
                              (o.Enable
                                ? c.RootComponent.PlaySound()
                                : c.RootComponent.StopSound());
                            break;
                          case "EffectActor":
                            c instanceof UE.BP_EffectActor_C &&
                              (o.Enable
                                ? c.Play("[SetActorVisible]SceneEffectPlay")
                                : c.Stop(
                                    "[SetActorVisible]SceneEffectStop",
                                    !1,
                                  ));
                            break;
                          case "LightsGroup":
                            c instanceof UE.BP_LightsGroup_C &&
                              c.ToggleLights(o.Enable);
                            break;
                          case "PPVolume":
                            c instanceof UE.KuroPostProcessVolume &&
                              (c.bEnabled = o.Enable);
                            break;
                          case "CullDistanceVolume":
                            c instanceof UE.CullDistanceVolume &&
                              (c.bEnabled = o.Enable);
                            break;
                          case "Skybox":
                            c instanceof UE.BP_CloudFuBen_C &&
                              c.ChangeSky(o.Enable);
                        }
                      else
                        Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "LevelEvent",
                            7,
                            "[SetActorVisible]目标actor不存在",
                            ["RefPath", r],
                          );
                    }
                  }
                }
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("LevelEvent", 7, "状态控制组件不存在");
            } else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("LevelEvent", 7, "状态控制actor不存在");
          else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelEvent", 7, "目标actor未配置", [
                "PbDataId",
                t.GetComponent(0)?.GetPbDataId(),
              ]);
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 7, "状态控制entity不存在");
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            7,
            "此LevelEvent只能配置在SceneActorRefComponent中",
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
  }
}
exports.LevelEventSetActorVisible = LevelEventSetActorVisible;
// # sourceMappingURL=LevelEventSetActorVisible.js.map
