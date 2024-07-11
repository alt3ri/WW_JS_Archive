"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetActorVisible = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  PATH_LENGTH = 3;
class LevelEventSetActorVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var o = e;
    if (o) {
      e = t;
      if (e) {
        var a = EntitySystem_1.EntitySystem.Get(e.EntityId);
        if (a?.Valid)
          if (o.Targets && 0 !== o.Targets.length)
            if (a.GetComponent(185)?.Owner) {
              var n = a.GetComponent(149);
              if (n) {
                var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
                    GlobalData_1.GlobalData.World,
                    UE.KuroActorSubsystem.StaticClass(),
                  ),
                  s = o.SyncChildActor || !1;
                for (const L of o.Targets) {
                  var i = L.PathName,
                    c = i.split(".");
                  if (c.length < PATH_LENGTH)
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "LevelEvent",
                        7,
                        "[SetActorVisible]actor路径错误",
                        ["RefPath", i],
                      );
                  else {
                    c = c[1] + "." + c[2];
                    if (n.IsValidPlatFormPath(c)) {
                      var c = new UE.FName(c),
                        l = r.GetActor(c);
                      if (l?.IsValid()) {
                        c = a.GetComponent(0).GetPbDataId();
                        switch (
                          (ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
                            "SceneItemReferenceComponent_" + c,
                          ) &&
                            Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "LevelEvent",
                              40,
                              "[SetActorVisible] [疑难杂症] 行为开关Actor",
                              [
                                "RefEntityPbDataId",
                                a.GetComponent(0)?.GetPbDataId(),
                              ],
                              ["TargetPath", i],
                              ["ActorType", o.ActorType],
                              ["Enable", o.Enable],
                              ["ActionGuid", this.ActionGuid],
                              ["Context", t],
                            ),
                          l.SetActorEnableCollision(o.Enable),
                          o.ActorType)
                        ) {
                          case "MeshActor":
                            l.SetActorHiddenInGame(!o.Enable);
                            var E = o.Enable ? 3 : 0;
                            l instanceof UE.StaticMeshActor &&
                              (o.Enable
                                ? l.SetLogicallyShow(3)
                                : l.SetLogicallyHidden()),
                              l instanceof UE.BP_KuroISMGroup_C &&
                                (o.Enable
                                  ? l.SeyLogicallyShowForAllChildren()
                                  : l.SeyLogicallyHiddenForAllChildren()),
                              l.RootComponent?.IsValid() &&
                                l.RootComponent instanceof
                                  UE.PrimitiveComponent &&
                                (l.RootComponent.SetCollisionEnabled(E),
                                l.RootComponent.SetHiddenInGame(!o.Enable, s));
                            break;
                          case "SoundActor":
                            l instanceof UE.KuroAmbientSoundActor &&
                              l.RootComponent instanceof
                                UE.KuroAmbientSoundComponent &&
                              (o.Enable
                                ? l.RootComponent.PlaySound()
                                : l.RootComponent.StopSound());
                            break;
                          case "EffectActor":
                            l instanceof UE.BP_EffectActor_C &&
                              (o.Enable
                                ? l.Play("[SetActorVisible]SceneEffectPlay")
                                : l.Stop(
                                    "[SetActorVisible]SceneEffectStop",
                                    !1,
                                  ));
                            break;
                          case "LightsGroup":
                            l instanceof UE.BP_LightsGroup_C &&
                              l.ToggleLights(o.Enable);
                            break;
                          case "PPVolume":
                            l instanceof UE.KuroPostProcessVolume &&
                              (l.bEnabled = o.Enable);
                            break;
                          case "CullDistanceVolume":
                            l instanceof UE.CullDistanceVolume &&
                              (l.bEnabled = o.Enable);
                            break;
                          case "Skybox":
                            l instanceof UE.BP_CloudFuBen_C &&
                              l.ChangeSky(o.Enable);
                        }
                      } else
                        Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "LevelEvent",
                            7,
                            "[SetActorVisible]目标actor不存在",
                            ["RefPath", i],
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
                a.GetComponent(0)?.GetPbDataId(),
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
//# sourceMappingURL=LevelEventSetActorVisible.js.map
