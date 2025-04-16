"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  RenderDataManager_1 = require("../Data/RenderDataManager"),
  DebugDrawManager_1 = require("../DebugDraw/DebugDrawManager"),
  SceneCharacterInteraction_1 = require("../Scene/Interaction/SceneCharacterInteraction"),
  FoliageClusteredEffectManager_1 = require("./ClusteredStuff/FoliageClusteredEffectManager"),
  EffectGlobal_1 = require("./EffectGlobal"),
  ScreenEffectSystem_1 = require("./ScreenEffectSystem/ScreenEffectSystem");
class EffectBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SetMaterialControllerDataSync(e, t, a) {
    if (!(t.length <= 0 || "None" === t)) {
      var r,
        o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)?.Entity;
      const c = o?.GetComponent(3)?.Actor?.CharRenderingComponent;
      c
        ? (a
            ? ResourceSystem_1.ResourceSystem.LoadAsync(
                t,
                UE.PD_CharacterControllerDataGroup_C,
                (e) => {
                  e
                    ? c?.AddMaterialControllerDataGroup(e)
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error("Battle", 4, "无法找到材质效果组", [
                        "materialDataPath",
                        t,
                      ]);
                },
              )
            : ResourceSystem_1.ResourceSystem.LoadAsync(
                t,
                UE.PD_CharacterControllerData_C,
                (e) => {
                  e
                    ? c?.AddMaterialControllerData(e)
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error("Battle", 4, "无法找到材质效果", [
                        "materialDataPath",
                        t,
                      ]);
                },
              ),
          ((r = Protocol_1.Aki.Protocol.ae_.create()).sVn =
            new Protocol_1.Aki.Protocol.sVn()),
          (r.sVn.nVn = t),
          (r.sVn.aVn = a),
          CombatMessage_1.CombatNet.Send(21610, o, r))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 19, "无法找到角色渲染组件", [
            "entityId",
            e,
          ]);
    }
  }
  static RecycleEffect(e) {}
  static AddDebugLineFromPlayer(e, t, a) {
    return DebugDrawManager_1.DebugDrawManager.AddDebugLineFromPlayer(
      Vector_1.Vector.Create(e),
      t,
      a,
    );
  }
  static ClearDebugDraw() {
    DebugDrawManager_1.DebugDrawManager.ClearDebugDraw();
  }
  static ValidateKuroAnimNotify(e) {
    return e.K2_ValidateAssets();
  }
  static ValidateKuroAnimNotifyState(e) {
    return e.K2_ValidateAssets();
  }
  static SetVisualizeCharacterWaterEffectTrace(e) {
    SceneCharacterInteraction_1.default.SetTraceDebug(e);
  }
  static SetEffectSpawnLogEnabled(e) {
    EffectGlobal_1.EffectGlobal.EnableSpawnLog = e;
  }
  static BeginDebugDrawFoliageDetect(e, t) {
    FoliageClusteredEffectManager_1.FoliageClusteredEffectManager.Get().BeginDebugDraw(
      e,
      t,
    );
  }
  static EndDebugDrawFoliageDetect() {
    FoliageClusteredEffectManager_1.FoliageClusteredEffectManager.Get().EndDebugDraw();
  }
  static RefreshFoliageDetectConfig() {
    FoliageClusteredEffectManager_1.FoliageClusteredEffectManager.Get().CacheFromConfig();
  }
  static SetEffectInPoolEnabled(e) {
    EffectGlobal_1.EffectGlobal.AllowEffectInPool = e;
  }
  static SetEffectOutPoolEnabled(e) {
    EffectGlobal_1.EffectGlobal.AllowEffectOutPool = e;
  }
  static EnableSceneObjectWaterEffectShowDebugTrace(e) {
    EffectGlobal_1.EffectGlobal.SceneObjectWaterEffectShowDebugTrace = e;
  }
  static SetTsWriteTimeToCollectionEnabled(e) {
    Info_1.Info.IsGameRunning() &&
      RenderDataManager_1.RenderDataManager.Get().SetWriteTime(e);
  }
  static EffectCgMode(e) {
    EffectGlobal_1.EffectGlobal.CgMode = e;
  }
  static GetScreenEffectSystem() {
    return ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
  }
  static ChangeMaterialTextures(a, e) {
    a &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.KuroChangeMaterialsTextures,
        (t) => {
          if (t?.IsValid()) {
            let e = a.GetComponentByClass(
              UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
            );
            (e =
              e ||
              a.AddComponentByClass(
                UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
                !1,
                void 0,
                !1,
              )).ChangeMaterialsWithDataAsset(t);
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                25,
                "ChangeMaterialTextures失败，因为asset无效",
                ["Path", e],
                ["actor", a?.GetName()],
              );
        },
      );
  }
}
exports.default = EffectBlueprintFunctionLibrary;
//# sourceMappingURL=EffectBlueprintFunctionLibrary.js.map
