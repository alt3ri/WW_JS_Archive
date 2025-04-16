"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharRenderShell = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  GameBudgetInterfaceController_1 = require("../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  TickProcessSystem_1 = require("../../../../Core/Tick/TickProcessSystem"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneTeamDefine_1 = require("../../../Module/SceneTeam/SceneTeamDefine"),
  GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator"),
  RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
class CharRenderShell {
  constructor() {
    (this.RenderingComponent = void 0),
      (this.veh = !1),
      (this.yW = void 0),
      (this.s6a = void 0),
      (this.P1h = !1),
      (this.Mq_ = !1),
      (this.RoleEntity = void 0),
      (this.xie = (e, t) => {
        this.RoleEntity && e.Id === this.RoleEntity.Id && this.A4i();
      }),
      (this.lSl = () => {
        this.RenderingComponent?.ShouldTickAfterGoDown()
          ? (this.Mq_ = !0)
          : this.o3a();
      }),
      (this.OtherRoleEntityId = 0),
      (this.rZe = (e, t) => {
        this.j4_ &&
          (e.Id === this.OtherRoleEntityId
            ? this.A4i()
            : t?.Id === this.OtherRoleEntityId &&
              (this.RenderingComponent?.ShouldTickAfterGoDown()
                ? (this.Mq_ = !0)
                : this.o3a()));
      }),
      (this.yI1 = 0),
      (this.par = (e, t, i) => {
        Time_1.Time.IsAfterPrePhysicTick
          ? 0 === this.yI1 &&
            (this.yI1 =
              TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
                5,
                !0,
                this.A$a,
              ))
          : TimerSystem_1.TimerSystem.Next(this.gc_);
      }),
      (this.A$a = (e) => {
        (this.yI1 = 0), this.RenderingComponent?.UpdateMaterialEffectsOnly();
      }),
      (this.gc_ = (e) => {
        this.yW && this.pc_ < Time_1.Time.Frame && this.Tick(0, !0);
      }),
      (this.a6a = (e) => {
        this.yW &&
          cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
            GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsCharacterRenderConfig.GroupName,
            this.yW,
            e,
          );
      }),
      (this.pc_ = 0),
      (this.ScheduledAfterTick = void 0),
      (this.OnEnabledChange = void 0),
      (this.i3a = !1),
      (this.r3a = 0),
      (this.LocationProxyFunction = void 0);
  }
  get IsAlwaysTick() {
    return this.veh;
  }
  Init(e) {
    if (
      ((this.RenderingComponent = e),
      (this.veh = 5 === e.RenderType || 6 === e.RenderType || e.IsUiUpdate),
      !this.veh)
    ) {
      var t = this.RenderingComponent.GetOwner();
      if (t instanceof TsBaseCharacter_1.default) {
        var i = t.EntityId,
          r = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(i),
          s = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var h = s[e];
          if (h?.GetCreatureDataId() === r) {
            if (h.IsMyRole())
              return void (
                (h = t.CharacterActorComponent?.Entity) &&
                ((this.RoleEntity = h),
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.OnChangeRole,
                  this.xie,
                ),
                EventSystem_1.EventSystem.AddWithTarget(
                  h,
                  EventDefine_1.EEventName.OnRoleGoDownFinish,
                  this.lSl,
                ))
              );
            h = t.CharacterActorComponent?.Entity;
            if (h)
              if (
                h.GetComponent(0)?.GetEntityType() ===
                Protocol_1.Aki.Protocol.kks.Proto_Player
              )
                return (
                  (this.OtherRoleEntityId = i),
                  EventSystem_1.EventSystem.Add(
                    EventDefine_1.EEventName.OnOtherChangeRole,
                    this.rZe,
                  ),
                  void this.A4i()
                );
          }
        }
      }
      this.A4i();
    }
  }
  Clear() {
    this.veh || this.o3a(),
      this.Xjt &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.RoleEntity,
          EventDefine_1.EEventName.OnRoleGoDownFinish,
          this.lSl,
        ),
        (this.RoleEntity = void 0)),
      this.j4_ &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnOtherChangeRole,
          this.rZe,
        ),
        (this.OtherRoleEntityId = 0));
  }
  A4i() {
    if (
      CharRenderShell.CharRenderShellGameBudgetOptimize &&
      this.RenderingComponent
    )
      if (this.Mq_) this.Mq_ = !1;
      else {
        this.yW &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "HudUnit",
              36,
              "CharRenderShell RegisterTick: 重复注册Tick",
              [
                "Actor",
                UE.KismetSystemLibrary.GetPathName(
                  this.RenderingComponent.GetCachedOwner(),
                ),
              ],
            ),
          this.o3a()),
          (this.r3a = Time_1.Time.WorldTimeSeconds);
        var e = this.Xjt
            ? GameBudgetAllocatorConfigCreator_1
                .GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig
            : GameBudgetAllocatorConfigCreator_1
                .GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig,
          t =
            ((this.yW =
              GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
                e.GroupName,
                e.SignificanceGroup,
                this,
                this.RenderingComponent.GetCachedOwner(),
              )),
            this.RenderingComponent.GetOwner());
        if (
          (t &&
            ((this.s6a = t),
            EventSystem_1.EventSystem.AddWithTarget(
              this.s6a,
              EventDefine_1.EEventName.OnMarkActorInFighting,
              this.a6a,
            )),
          this.P1h ||
            ((this.P1h = !0),
            EventSystem_1.EventSystem.AddWithTarget(
              this.RenderingComponent,
              EventDefine_1.EEventName.OnAddMaterialController,
              this.par,
            )),
          t instanceof UE.BP_SplitScreen_C)
        ) {
          if (t.CharacterActor_1) {
            var i = t.CharacterActor_1.ChildActor;
            if (i)
              return void cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
                e.GroupName,
                this.yW,
                i,
              );
          }
          if (t.CharacterActor_2) {
            var i = t.CharacterActor_2.ChildActor;
            if (i)
              return void cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
                e.GroupName,
                this.yW,
                i,
              );
          }
          t.CharacterActor_3 &&
            (i = t.CharacterActor_3.ChildActor) &&
            cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
              e.GroupName,
              this.yW,
              i,
            );
        }
        t instanceof UE.BP_MaterialControllerRenderActor_C &&
          t.RefActor &&
          (cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(
            e.GroupName,
            this.yW,
            t.RefActor,
          ),
          (this.i3a = t.RefActor.WasRecentlyRendered()));
      }
  }
  get Xjt() {
    return void 0 !== this.RoleEntity;
  }
  get j4_() {
    return 0 !== this.OtherRoleEntityId;
  }
  o3a() {
    this.P1h &&
      ((this.P1h = !1), this.RenderingComponent) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.RenderingComponent,
        EventDefine_1.EEventName.OnAddMaterialController,
        this.par,
      ),
      CharRenderShell.CharRenderShellGameBudgetOptimize &&
        (this.s6a &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.s6a,
            EventDefine_1.EEventName.OnMarkActorInFighting,
            this.a6a,
          ),
          (this.s6a = void 0)),
        this.yW &&
          (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
            this,
          ),
          (this.yW = void 0)),
        (this.Mq_ = !1));
  }
  ScheduledTick(e, t, i) {
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Start();
    try {
      (this.pc_ = Time_1.Time.Frame), this.Tick(e);
    } catch (e) {
      e instanceof Error &&
        Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack("Render", 25, "RenderShell Tick执行异常", e, [
          "error",
          e.message,
        ]);
    }
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Stop();
  }
  OnWasRecentlyRenderedOnScreenChange(e) {
    (this.i3a = e), this.i3a || (this.r3a = Time_1.Time.WorldTimeSeconds);
  }
  Tick(i, r = !1) {
    if (
      (!CharRenderShell.CharRenderShellGameBudgetOptimize ||
        Info_1.Info.IsInEditorTick() ||
        r ||
        this.Mq_ ||
        this.veh ||
        this.i3a) &&
      this.RenderingComponent
    )
      if (this.Mq_ && !this.RenderingComponent.ShouldTickAfterGoDown())
        this.o3a();
      else if (!TickSystem_1.TickSystem.IsPaused || this.veh) {
        RenderModuleConfig_1.RenderStats.StatCharRenderShellTick.Start();
        let e = i,
          t =
            (0 < this.r3a &&
              ((e += Time_1.Time.WorldTimeSeconds - this.r3a), (this.r3a = 0)),
            0);
        PerformanceController_1.PerformanceController
          .IsEntityTickPerformanceTest &&
          (t = cpp_1.KuroTime.GetMilliseconds64()),
          this.RenderingComponent.Tick(e),
          PerformanceController_1.PerformanceController
            .IsEntityTickPerformanceTest &&
            (r = this.RenderingComponent.GetOwner()) instanceof
              TsBaseCharacter_1.default &&
            PerformanceController_1.PerformanceController.CollectComponentTickPerformanceInfo(
              r.EntityId,
              "CharRenderingComponent",
              !0,
              cpp_1.KuroTime.GetMilliseconds64() - t,
            ),
          RenderModuleConfig_1.RenderStats.StatCharRenderShellTick.Stop();
      }
  }
}
(exports.CharRenderShell = CharRenderShell).CharRenderShellGameBudgetOptimize =
  !0;
//# sourceMappingURL=CharRenderShell.js.map
