"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderModuleModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  GlobalData_1 = require("../../GlobalData"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  CharRenderShell_1 = require("../Character/Manager/CharRenderShell"),
  RenderDataManager_1 = require("../Data/RenderDataManager"),
  DebugDrawManager_1 = require("../DebugDraw/DebugDrawManager"),
  EffectManagerBusinessProxy_1 = require("../Effect/EffectManagerBusinessProxy"),
  SceneInteractionManager_1 = require("../Scene/Interaction/SceneInteractionManager"),
  ItemMaterialManager_1 = require("../Scene/Item/MaterialController/ItemMaterialManager"),
  ItemMaterialParameterCollectionController_1 = require("../Scene/Item/MaterialController/ItemMaterialParameterCollectionController"),
  RenderModuleConfig_1 = require("./RenderModuleConfig");
class RenderModuleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.F1r = []),
      (this.V1r = new Map()),
      (this.H1r = new Map()),
      (this.j1r = void 0),
      (this.W1r = 5),
      (this.K1r = 5),
      (this.Q1r = !1),
      (this.X1r = !1),
      (this.$1r = 0);
  }
  GetCurrentKeyState(e) {
    return e === this.j1r ? this.W1r : 0;
  }
  GetIdleClearAtmosphere(e) {
    return e === this.j1r && this.Q1r;
  }
  SetBattleState(e, t, r = !1) {
    (this.j1r = e),
      (this.W1r = t),
      (this.K1r = t),
      4 === this.W1r ? ((this.Q1r = !0), (this.W1r = 0)) : (this.Q1r = !1),
      (this.X1r = r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderBattle",
          12,
          "BOSS战设置战斗状态Inner",
          ["key", e],
          ["state", t],
        );
  }
  IsStateInstantTransition() {
    return this.X1r;
  }
  Y1r(e) {
    return 4 === e
      ? "无状态"
      : 0 === e
        ? "静止状态"
        : 1 === e
          ? "战斗1阶段"
          : 2 === e
            ? "战斗2阶段"
            : 3 === e
              ? "战斗3阶段"
              : "错误";
  }
  GetWuYinQuBattleDebugInfo() {
    var e = UE.NewArray(UE.BuiltinString);
    const t = new Array();
    return (
      t.push(this.GetCurrentBattleKey() + "," + this.Y1r(this.K1r)),
      this.H1r.forEach((e) => {
        UE.KismetSystemLibrary.IsValid(e) &&
          ((e = e.GetKey() + "," + this.Y1r(e.GetCurrentBattleState())),
          t.push(e));
      }),
      WorldGlobal_1.WorldGlobal.ToUeStringArray(t, e),
      e
    );
  }
  GetBattleState(e) {
    return this.j1r === e ? this.W1r : 0;
  }
  GetCurrentBattleKey() {
    return this.j1r;
  }
  AddBattleReference(e) {
    this.$1r++, 0 < this.$1r && this.SetStreamingSourceState(e, !0);
  }
  GetSnowIntensity() {
    return RenderDataManager_1.RenderDataManager.Get()?.GetSnowIntensity();
  }
  GetRainIntensity() {
    return RenderDataManager_1.RenderDataManager.Get()?.GetRainIntensity();
  }
  DecBattleReference() {
    this.$1r--,
      this.$1r <= 0 && this.SetStreamingSourceState(new UE.Vector(0, 0, 0), !1);
  }
  SetStreamingSourceState(e, t) {}
  GetWuYinQuBattleActorByName(e) {
    if (this.H1r.has(e)) return this.H1r.get(e);
  }
  AddWuYinQuBattleActor(e) {
    var t;
    return UE.KismetSystemLibrary.IsValid(e)
      ? ((t = e.GetKey()),
        !e.IsInitialize() &&
          void 0 === this.GetWuYinQuBattleActorByName(t) &&
          !!e.Init() &&
          (this.H1r.set(t, e), !0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderBattle", 12, "无音区actor添加失败1"),
        !1);
  }
  RemoveWuYinQuBattleActor(e) {
    return UE.KismetSystemLibrary.IsValid(e)
      ? ((e = e.GetKey()), !!this.H1r.has(e) && (this.H1r.delete(e), !0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderBattle", 12, "无音区actor移除失败1"),
        !1);
  }
  AddTickableObject(e) {
    this.F1r.indexOf(e, 0) < 0 && this.F1r.push(e);
  }
  RemoveTickableObject(e) {
    e = this.F1r.indexOf(e, 0);
    e < 0 ||
      (this.F1r.length <= 2
        ? this.F1r.splice(e, 1)
        : ((this.F1r[e] = this.F1r[this.F1r.length - 1]), this.F1r.pop()));
  }
  AddCharRenderShell(e) {
    var t = new CharRenderShell_1.CharRenderShell();
    t.Init(e), this.V1r.set(e, t);
  }
  RemoveCharRenderShell(e) {
    return this.V1r.delete(e);
  }
  Tick(r) {
    const t = 0.001 * r;
    this.F1r.forEach((e) => {
      try {
        e.Tick(t);
      } catch (e) {
        e instanceof Error &&
          Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Render",
            26,
            "TickableObject Tick执行异常",
            e,
            ["error", e.message],
          );
      }
    }),
      this.V1r.forEach((e) => {
        try {
          e.Tick(t);
        } catch (e) {
          e instanceof Error &&
            Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Render",
              26,
              "RenderShell Tick执行异常",
              e,
              ["error", e.message],
            );
        }
      }),
      TickSystem_1.TickSystem.IsPaused ||
        this.H1r.forEach((t) => {
          try {
            var e;
            UE.KismetSystemLibrary.IsValid(t) &&
              ((e = t.Key?.toString()),
              this.j1r === e
                ? this.W1r !== t.GetCurrentBattleState() &&
                  t.ChangeState(this.W1r, this.IsStateInstantTransition())
                : 0 !== t.GetCurrentBattleState() &&
                  t.ChangeState(0, this.IsStateInstantTransition()),
              t.Tick(r));
          } catch (e) {
            e instanceof Error &&
              Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Render",
                26,
                "WuYinQuBattleActor 执行异常",
                e,
                ["error", e.message],
                ["object", t.GetName()],
              );
          }
        });
    try {
      RenderDataManager_1.RenderDataManager.Get().TickForce(r),
        TickSystem_1.TickSystem.IsPaused ||
          RenderDataManager_1.RenderDataManager.Get().Tick(r);
    } catch (e) {
      e instanceof Error &&
        Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack(
          "Render",
          26,
          "RenderDataManager Tick执行异常",
          e,
          ["error", e.message],
        );
    }
    try {
      TickSystem_1.TickSystem.IsPaused ||
        SceneInteractionManager_1.SceneInteractionManager.Tick(r);
    } catch (e) {
      e instanceof Error &&
        Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack(
          "Render",
          26,
          "SceneInteractionManager Tick执行异常",
          e,
          ["error", e.message],
        );
    }
    try {
      ItemMaterialManager_1.ItemMaterialManager.Tick(r);
    } catch (e) {
      e instanceof Error &&
        Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack(
          "Render",
          26,
          "ItemMaterialManager Tick执行异常",
          e,
          ["error", e.message],
        );
    }
    try {
      TickSystem_1.TickSystem.IsPaused ||
        DebugDrawManager_1.DebugDrawManager.Tick(r);
    } catch (e) {
      e instanceof Error &&
        Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack(
          "Render",
          26,
          "DebugDrawManager Tick执行异常",
          e,
          ["error", e.message],
        );
    }
  }
  OnInit() {
    return (
      (this.$1r = 0),
      (this.F1r = []),
      (this.V1r = new Map()),
      (this.H1r = new Map()),
      (this.j1r = void 0),
      (this.W1r = 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderBattle", 12, "初始化BOSS战渲染模块"),
      RenderDataManager_1.RenderDataManager.Get(),
      EffectManagerBusinessProxy_1.EffectManagerBusinessProxy.Get(),
      SceneInteractionManager_1.SceneInteractionManager.Initialize(),
      ItemMaterialManager_1.ItemMaterialManager.Initialize(),
      DebugDrawManager_1.DebugDrawManager.Initialize(),
      !0
    );
  }
  OnClear() {
    return (
      this.J1r(),
      (this.F1r = []),
      (this.V1r = new Map()),
      (this.H1r = new Map()),
      (this.j1r = void 0),
      (this.W1r = 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderBattle", 12, "清理BOSS战渲染模块"),
      RenderDataManager_1.RenderDataManager.Get().Destroy(),
      DebugDrawManager_1.DebugDrawManager.Destroy(),
      !0
    );
  }
  OnLeaveLevel() {
    return (
      this.J1r(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderBattle", 12, "BOSS战渲染模块离开关卡"),
      !0
    );
  }
  J1r() {
    (this.F1r = []),
      (this.V1r = new Map()),
      (this.H1r = new Map()),
      (this.j1r = void 0),
      (this.W1r = 0),
      (this.$1r = 0);
  }
  EnableGlobalData(e) {
    return -1;
  }
  EnableActorData(e, t) {
    return t && e
      ? ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(t, e)
      : -1;
  }
  DisableGlobal(e) {}
  DisableAllGlobal() {}
  DisableActorData(e) {
    ItemMaterialManager_1.ItemMaterialManager.DisableActorData(e);
  }
  DisableAllActorData() {
    ItemMaterialManager_1.ItemMaterialManager.DisableAllActorData();
  }
  UpdateItemMaterialParameterCollection(e) {
    ItemMaterialParameterCollectionController_1.ItemMaterialParameterCollectionController.UpdateMaterialParameterCollection(
      e,
      RenderDataManager_1.RenderDataManager.Get().GetSceneInteractionMaterialParameterCollection(),
    );
  }
  static OnStartTeleport() {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.StopSomeWeatherBeforeTeleport(
      GlobalData_1.GlobalData.World,
    );
  }
  static OnCompleteTeleport() {
    UE.KuroRenderingRuntimeBPPluginBPLibrary.ResumeSomeWeatherAfterTeleport(
      GlobalData_1.GlobalData.World,
    );
  }
}
exports.RenderModuleModel = RenderModuleModel;
//# sourceMappingURL=RenderModuleModel.js.map
