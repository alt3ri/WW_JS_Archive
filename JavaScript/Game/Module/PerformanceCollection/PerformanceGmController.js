"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceGmController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  WorldFunctionLibrary_1 = require("../../World/Bridge/WorldFunctionLibrary"),
  ENTITY_PERFORMANCE_TEST_NUM = 1;
class PerformanceGmController {
  static s5i() {
    let r = 0,
      a = 0;
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = t.length - 1; 0 <= e; e--) {
      var o = t[e],
        l = o.Entity.GetComponent(3)?.Owner;
      if (l !== Global_1.Global.BaseCharacter) {
        ++a,
          (r += PerformanceController_1.PerformanceController.ConsumeTickTime(
            "EntityTick" + o.Id,
          ));
        l = o.Entity.GetComponent(0);
        if (
          !ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
            l.GetCreatureDataId(),
            "EntityPerformanceTest",
          )
        )
          return -1;
      }
    }
    return 0 < a ? r / a : 0;
  }
  static ClearEntityButRole() {
    var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = r.length - 1; 0 <= e; e--) {
      var a = r[e];
      a.Entity.GetComponent(3)?.Owner !== Global_1.Global.BaseCharacter &&
        ((a = a.Entity.GetComponent(0).GetCreatureDataId()),
        ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
          a,
          "EntityPerformanceTest",
        ));
    }
    return !0;
  }
  static a5i(e) {
    let r = "Nothing";
    switch (e) {
      case 0:
        r = "";
        break;
      case 1:
        r = "Gameplay";
        break;
      case 2:
        r = "Monster";
        break;
      case 3:
        r = "NPC";
        break;
      case 4:
        r = "Collect";
        break;
      case 5:
        r = "Animal";
        break;
      case 6:
        r = "SceneObj";
        break;
      case 7:
        r = "Treasure";
        break;
      case 8:
        r = "Player";
        break;
      case 9:
        r = "Teleport";
    }
    return r;
  }
  static IgnoreBattle() {
    var e = Global_1.Global.BaseCharacter;
    return (
      !!e &&
      !!(e = e.CharacterActorComponent.Entity.GetComponent(159)) &&
      (e.AddBuff(CharacterBuffIds_1.buffId.IgnoreHateBuff, {
        InstigatorId: e.CreatureDataId,
        Reason: "IgnoreBattle",
      }),
      !0)
    );
  }
  static KillAllEntityButRole() {
    this.ClearEntityButRole();
    var e = (0, puerts_1.$ref)(void 0),
      r =
        (UE.GameplayStatics.GetAllActorsOfClass(
          GlobalData_1.GlobalData.World,
          UE.TsSimpleNpc_C.StaticClass(),
          e,
        ),
        (0, puerts_1.$unref)(e));
    for (let e = 0; e < r.Num(); e++) r.Get(e).K2_DestroyActor();
    return !0;
  }
  static OpenWorldEntityCatchMode(e) {
    (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity =
      "0" !== e[0]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Performance",
          36,
          "捕捉WorldEntityName " +
            PerformanceController_1.PerformanceController
              .IsOpenCatchWorldEntity,
        );
  }
  static EntityPerformanceTestSingle(e) {
    this.IgnoreBattle() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 36, "忽略战斗失效"));
    var r = Global_1.Global.BaseCharacter.GetTransform();
    const a = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
      Number(e[0]),
    );
    if (!a) return !1;
    this.ClearEntityButRole(),
      cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0),
      PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
        !0,
      );
    for (let e = 0; e < ENTITY_PERFORMANCE_TEST_NUM; e++)
      WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(
        BigInt(
          ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
        ),
        a.Id,
        1,
        r,
        0,
      );
    e = 10 * TimeUtil_1.TimeUtil.InverseMillisecond;
    return (
      TimerSystem_1.TimerSystem.Delay(() => {
        var e = this.s5i();
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Performance",
            36,
            "EntityPerformanceTestSingle",
            ["CId", a.Id],
            ["Name", a.Name],
            ["Score", 100 * e],
          ),
          PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
            !1,
          ),
          cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1);
      }, e),
      !0
    );
  }
  static EntityPerformanceTestMode(e) {
    PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(
      e,
    );
    var e = e ? 0 : 1,
      r =
        (UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "a.ParallelAnimEvaluation " + e,
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "a.ParallelAnimUpdate " + e,
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "a.ParallelAnimInterpolation " + e,
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "fx.Niagara.SystemSimulation.AllowASync " + e,
        ),
        ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
    for (let e = r.length - 1; 0 <= e; e--)
      r[e].Entity.GetComponent(101)?.SetTakeOverTick(!0);
    return !0;
  }
  static GetEntityTemplateList(e) {
    var e = Number(e[0]),
      r = this.a5i(e),
      a = [];
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(
      !0,
    ).values())
      t.BlueprintType.includes(r) && a.push(t.Id);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 36, "实体模板id列表", ["list", a]),
      !0
    );
  }
}
exports.PerformanceGmController = PerformanceGmController;
//# sourceMappingURL=PerformanceGmController.js.map
