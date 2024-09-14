"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceGmController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
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
      t = 0;
    var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = o.length - 1; 0 <= e; e--) {
      var a = o[e],
        l = a.Entity.GetComponent(3)?.Owner;
      if (l !== Global_1.Global.BaseCharacter) {
        ++t,
          (r += PerformanceController_1.PerformanceController.ConsumeTickTime(
            "EntityTick" + a.Id,
          ));
        l = a.Entity.GetComponent(0);
        if (
          !ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(
            l.GetCreatureDataId(),
            "EntityPerformanceTest",
          )
        )
          return -1;
      }
    }
    return 0 < t ? r / t : 0;
  }
  static ClearEntityButRole() {
    var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = r.length - 1; 0 <= e; e--) {
      var t,
        o = r[e];
      o.Entity.GetComponent(3)?.Owner !== Global_1.Global.BaseCharacter &&
        ((o = o.Entity.GetComponent(0).GetCreatureDataId()),
        ((t = new Protocol_1.Aki.Protocol.Gzn()).VVn = 0),
        (t.P8n = "@GmRemoveMonster " + o),
        Net_1.Net.Call(29319, t, () => {}));
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
      !!(e = e.CharacterActorComponent.Entity.GetComponent(160)) &&
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
    const t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
      Number(e[0]),
    );
    if (!t) return !1;
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
        t.Id,
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
            ["CId", t.Id],
            ["Name", t.Name],
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
  static SetPlayerPerformanceTestMode(e) {
    PerformanceController_1.PerformanceController.SetPlayerTickPerformanceTest(
      e,
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
      r[e].Entity.GetComponent(102)?.SetTakeOverTick(!0);
    return !0;
  }
  static GetEntityTemplateList(e) {
    var e = Number(e[0]),
      r = this.a5i(e),
      t = [];
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(
      !0,
    ).values())
      o.BlueprintType.includes(r) && t.push(o.Id);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 36, "实体模板id列表", ["list", t]),
      !0
    );
  }
}
exports.PerformanceGmController = PerformanceGmController;
//# sourceMappingURL=PerformanceGmController.js.map
