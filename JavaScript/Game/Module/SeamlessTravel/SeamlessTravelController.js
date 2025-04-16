"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeamlessTravelController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  SeamlessTravelTreadmill_1 = require("./SeamlessTravelTreadmill");
class SeamlessTravelController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterTransitionMap,
        this.qea,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EndTravelMap,
        this.Gea,
      ),
      this.PauseTick(),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterTransitionMap,
        this.qea,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EndTravelMap,
        this.Gea,
      ),
      !0
    );
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelTreadmill &&
      ModelManager_1.ModelManager.SeamlessTravelModel?.SeamlessTravelTreadmill.Tick(
        e,
      );
  }
  static StartTravel(e) {
    var r;
    return ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
      ? (r =
          ModelManager_1.ModelManager.SeamlessTravelModel
            .SeamlessTravelController)?.IsValid()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:开始]"),
          ResourceSystem_1.ResourceSystem.SetForceLoadModeInGame(
            GlobalData_1.GlobalData.World,
            !0,
          ),
          (ModelManager_1.ModelManager.SeamlessTravelModel.InSeamlessTraveling =
            !0),
          ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle &&
            (TimerSystem_1.TimerSystem.Remove(
              ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle,
            ),
            (ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessEndHandle =
              void 0)),
          WorldGlobal_1.WorldGlobal.PlayerClientTravel(r, e),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SeamlessTravel",
              29,
              "[无缝加载:失败]PlayerController无效",
            ),
          !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SeamlessTravel",
            29,
            "[无缝加载:失败]未开启无缝加载模式",
          ),
        !1);
  }
  static EnableSeamlessTravel(a) {
    var e = Global_1.Global.CharacterController;
    if (!e?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            29,
            "[开启无缝加载:失败]PlayerController无效",
          ),
        !1
      );
    const l = ModelManager_1.ModelManager.SeamlessTravelModel;
    (l.Config = a),
      l.CreatePromise(),
      (l.IsSeamlessTravel = !0),
      (l.SeamlessTravelPlayerEntityHandle =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
    for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      this.HMl(s);
      var r = s.Entity.GetComponent(0),
        o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r.VisionSkillServerEntityId,
        ),
        o = (o && this.HMl(o), r.CustomServerEntityIds);
      0 < o.length &&
        o.forEach((e) => {
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          e && this.HMl(e);
        }),
        r.VisionControlCreatureDataId &&
          (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
            r.VisionControlCreatureDataId,
          )) &&
          this.HMl(o);
    }
    l.SeamlessTravelController = e;
    var t =
      CameraController_1.CameraController.FightCamera.LogicComponent
        .CameraActor;
    return (
      (e.bUseSeamlessCameraActor = !0),
      (e.SeamlessCameraActor = t),
      SeamlessTravelController.AddSeamlessTravelActor(t),
      (l.SeamlessTravelCamera = t),
      (l.SeamlessTravelTreadmill =
        new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill()),
      l.SeamlessTravelTreadmill.Init(a, (e) => {
        l.MeshAssetLoadedPromise?.SetResult(e);
      }),
      this.ResumeTick(),
      a?.EffectPath
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            a?.EffectPath,
            UE.EffectScreenPlayData_C,
            (e) => {
              var r;
              e?.IsValid()
                ? ((r =
                    ScreenEffectSystem_1.ScreenEffectSystem.GetInstance()).PlayScreenEffect(
                    e,
                  ),
                  SeamlessTravelController.AddSeamlessTravelActor(r),
                  (l.SeamlessTravelScreenEffect = e),
                  (l.SeamlessTravelEffectPlayer = r),
                  0 < a.EffectExpandTime
                    ? TimerSystem_1.TimerSystem.Delay(() => {
                        l.EffectFillScreenPromise?.SetResult(!0);
                      }, a.EffectExpandTime * MathUtils_1.MathUtils.SecondToMillisecond)
                    : l.EffectFillScreenPromise?.SetResult(!0))
                : l.EffectFillScreenPromise?.SetResult(!1);
            },
            102,
          )
        : l.EffectFillScreenPromise?.SetResult(!1),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
        4,
        [12, 23],
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:开启无缝加载模式]"),
      !0
    );
  }
  static HMl(e) {
    var r = ModelManager_1.ModelManager.SeamlessTravelModel,
      a = e.Entity.GetComponent(3);
    if (
      !ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravelActor(
        a.Actor,
      )
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "[无缝加载:添加保留实体", [
          "EntityId",
          e.Id,
        ]),
        SeamlessTravelController.AddSeamlessTravelActor(a.Actor),
        r.SeamlessTravelPlayerTeamHandles.push(e);
      var l = a.Actor.K2_GetComponentsByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        ),
        o = l.Num();
      for (let e = 0; e < o; ++e) {
        var t = l.Get(e);
        t instanceof UE.SkeletalMeshComponent &&
          (t.PrimaryComponentTick.bStartWithTickEnabled = !1);
      }
      a?.CreatureData.GetEntityType() ===
      Protocol_1.Aki.Protocol.kks.Proto_Monster
        ? ((e = e.Entity.GetComponent(46)),
          r.SeamlessTravelTeamDefaultController.push(e.TsAiController),
          SeamlessTravelController.AddSeamlessTravelActor(e.TsAiController))
        : (r.SeamlessTravelTeamDefaultController.push(a.DefaultController),
          SeamlessTravelController.AddSeamlessTravelActor(a.DefaultController));
    }
  }
  static AddSeamlessTravelActor(e) {
    ModelManager_1.ModelManager.SeamlessTravelModel.AddSeamlessTravelActor(e);
  }
  static async PreLeaveLevel() {
    if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
      const e = ModelManager_1.ModelManager.SeamlessTravelModel;
      if (e?.IsSeamlessTravel) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SeamlessTravel",
            50,
            "[无缝加载:过渡特效填满屏幕(开始)]",
          ),
          await e.EffectFillScreenPromise.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SeamlessTravel",
              50,
              "[无缝加载:过渡特效填满屏幕(完成)]",
            ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SeamlessTravel",
              50,
              "[无缝加载:等待地板资产加载(开始)]",
            ),
          await e.MeshAssetLoadedPromise.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SeamlessTravel",
              50,
              "[无缝加载:等待地板资产加载(完成)]",
            ),
          SeamlessTravelController.AddSeamlessTravelActor(
            e.SeamlessTravelTreadmill.GetFloorActor(),
          );
        const r = e.SeamlessTravelPlayerEntityHandle.Entity.GetComponent(3),
          a = MathUtils_1.MathUtils.CommonTempVector;
        a.DeepCopy(r.ActorLocationProxy),
          (a.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT),
          e.SeamlessTravelTreadmill.ResetLockOnLocation(a),
          TimerSystem_1.TimerSystem.Next(() => {
            r.TeleportAndFindStandLocation(a),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(
                !1,
                !0,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SeamlessTravel",
                  50,
                  "[无缝加载:地板显形(开始)]",
                ),
              e.SeamlessTravelTreadmill.AppearEffect(() => {
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SeamlessTravel",
                    50,
                    "[无缝加载:地板显形(完成)]",
                  ),
                  e.TransitionFloorLoadedPromise.SetResult(!0);
              });
          }),
          await e.TransitionFloorLoadedPromise.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SeamlessTravel",
              29,
              "[无缝加载:PreLeaveLevel完成]",
            );
      }
    }
  }
  static PostLeaveLevel() {
    ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PostLeaveLevel完成]");
  }
  static PreOpenLevel() {
    return !0;
  }
  static async PostOpenLevel() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    return (
      !!e.IsSeamlessTravel &&
      (0 < e.Config.LeastTime &&
        GlobalData_1.GlobalData.World.SetSeamlessTravelMidpointPause(!0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:进入过渡场景(开始)]"),
      await e.EnterTransitionMapPromise.Promise,
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:进入过渡场景(完成)]"),
      0 < e.Config.LeastTime &&
        TimerSystem_1.TimerSystem.Delay(() => {
          GlobalData_1.GlobalData.World.SetSeamlessTravelMidpointPause(!1);
        }, e.Config.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond),
      !0)
    );
  }
  static PostLoadedLevel() {
    ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SeamlessTravel", 29, "[无缝加载:PostLoadedLevel完成]");
  }
  static SetCurrentEntityAction(a) {
    if (!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel)
      return !1;
    if (!Global_1.Global.BaseCharacter?.CharacterActorComponent) return !1;
    const l = Global_1.Global.BaseCharacter.CharacterActorComponent,
      o = MathUtils_1.MathUtils.CommonTempVector;
    return (
      o.DeepCopy(l.CreatureData.GetLocation()),
      TimerSystem_1.TimerSystem.Next(() => {
        var e = Rotator_1.Rotator.Create(
            a.BornRotation[0],
            a.BornRotation[2],
            a.BornRotation[1],
          ),
          r = e.Yaw - l.ActorRotationProxy.Yaw,
          e =
            (l.TeleportAndFindStandLocation(o),
            l.SetInputRotator(e),
            l.SetActorRotation(e.ToUeRotator(), "[无缝加载:修正朝向]", !1),
            Vector_1.Vector.Create()),
          e =
            (Rotator_1.Rotator.Create(0, r, 0)
              .Quaternion()
              .RotateVector(l.ActorVelocityProxy, e),
            l.MoveComp.SetForceSpeed(e),
            CameraController_1.CameraController.FightCamera.LogicComponent
              .CameraRotation),
          r = MathUtils_1.MathUtils.WrapAngle(e.Yaw + r),
          r = new UE.Rotator(e.Pitch, r, e.Roll);
        CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
          r,
        ),
          CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(
            !1,
            !0,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SeamlessTravel",
              50,
              "[无缝加载:修正到目标位置和朝向]",
            );
      }),
      !0
    );
  }
  static async EndSeamlessTravel() {
    var e,
      r,
      a = ModelManager_1.ModelManager.SeamlessTravelModel;
    a?.SeamlessTravelPlayerTeamHandles?.length
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:开始结束]"),
        ResourceSystem_1.ResourceSystem.SetForceLoadModeInGame(
          GlobalData_1.GlobalData.World,
          !1,
        ),
        (e = a.SeamlessTravelEffectPlayer),
        (r = a.SeamlessTravelScreenEffect),
        e?.EndScreenEffect(r),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]关闭屏幕特效"),
        await TimerSystem_1.TimerSystem.Wait(
          a.Config.EffectCollapseTime *
            MathUtils_1.MathUtils.SecondToMillisecond *
            3,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]结束关闭屏幕特效"),
        this.FinishSeamlessTravel())
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]Finish找不到PlayerActor");
  }
  static FinishSeamlessTravel() {
    var e = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (e?.SeamlessTravelPlayerTeamHandles?.length) {
      for (const o of e.SeamlessTravelPlayerTeamHandles) {
        var r = o.Entity?.GetComponent(3).Actor.K2_GetComponentsByClass(
            UE.SkeletalMeshComponent.StaticClass(),
          ),
          a = r.Num();
        for (let e = 0; e < a; ++e) {
          var l = r.Get(e);
          l instanceof UE.SkeletalMeshComponent &&
            (l.PrimaryComponentTick.bStartWithTickEnabled = !0);
        }
      }
      (e.SeamlessEndHandle = void 0),
        (e.SeamlessTravelPlayerTeamHandles.length = 0),
        (e.SeamlessTravelController.bUseSeamlessCameraActor = !1),
        (e.SeamlessTravelController.SeamlessCameraActor = void 0),
        (e.SeamlessTravelController = void 0),
        (e.SeamlessTravelTeamDefaultController.length = 0),
        (e.SeamlessTravelCamera = void 0),
        (e.SeamlessTravelEffectPlayer = void 0),
        (e.SeamlessTravelScreenEffect = void 0),
        e.SeamlessTravelTreadmill?.Destroy(),
        (e.SeamlessTravelTreadmill = void 0),
        this.PauseTick(),
        (e.Config = void 0),
        e.ClearPromise(),
        e.ClearSeamlessTravelActor(),
        (e.InSeamlessTraveling = !1),
        (e.IsSeamlessTravel = !1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI,
        ),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
          4,
        ),
        InputDistributeController_1.InputDistributeController.RefreshInputTag(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:完成]");
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("WorldLevel", 50, "[无缝加载]Finish找不到PlayerActor");
  }
  static WasRoleEntityInSeamlessTraveling(e) {
    return (
      !!e &&
      !!ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel &&
      !!(e = e.GetComponent(0)) &&
      this.WasRoleInSeamlessTraveling(e.GetCreatureDataId())
    );
  }
  static WasRoleInSeamlessTraveling(e) {
    var r = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (r?.IsSeamlessTravel)
      for (const a of r.SeamlessTravelPlayerTeamHandles)
        if (a.Valid) {
          if (a.Entity.GetComponent(0).GetCreatureDataId() === e) return !0;
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SeamlessTravel",
              4,
              "[无缝加载:需要保留的实体被删除！]",
              ["EntityId", a.Id],
            );
    return !1;
  }
}
((exports.SeamlessTravelController = SeamlessTravelController).qea = () => {
  var e = ModelManager_1.ModelManager.SeamlessTravelModel;
  e.IsSeamlessTravel && e.EnterTransitionMapPromise?.SetResult(!0);
}),
  (SeamlessTravelController.Gea = () => {
    const e = ModelManager_1.ModelManager.SeamlessTravelModel;
    if (e.IsSeamlessTravel) {
      var r;
      e.EnterDestinationMapPromise?.SetResult(!0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SeamlessTravel",
            50,
            "[无缝加载]进入目标地图并重新设置位置",
          );
      const a = Global_1.Global.BaseCharacter?.CharacterActorComponent;
      a &&
        ((r = MathUtils_1.MathUtils.CommonTempVector).DeepCopy(
          a.CreatureData.GetLocation(),
        ),
        (r.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT),
        e.SeamlessTravelTreadmill.ResetLockOnLocation(r),
        TimerSystem_1.TimerSystem.Next(() => {
          a.TeleportAndFindStandLocation(
            MathUtils_1.MathUtils.CommonTempVector,
          ),
            CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(
              !1,
              !0,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载:地板隐形(开始)]"),
            e.SeamlessTravelTreadmill.DisappearEffect(() => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SeamlessTravel",
                  50,
                  "[无缝加载:地板隐形(完成)]",
                ),
                e.TransitionFloorUnloadedPromise.SetResult(!0);
            });
        }));
    }
  });
//# sourceMappingURL=SeamlessTravelController.js.map
