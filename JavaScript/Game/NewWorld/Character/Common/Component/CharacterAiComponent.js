"use strict";
let CharacterAiComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let r;
    const s = arguments.length;
    let n =
      s < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, o);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (r = t[h]) && (n = (s < 3 ? r(n) : s > 3 ? r(e, i, n) : r(e, i)) || n);
    return s > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAiComponent = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const AiController_1 = require("../../../../AI/Controller/AiController");
const TsAiController_1 = require("../../../../AI/Controller/TsAiController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
const DEFAULT_LEVELAI_AIC_PATH =
  "/Game/Aki/AI/AINPC/Common/AIC_CommonNPC.AIC_CommonNPC_C";
let CharacterAiComponent =
  (CharacterAiComponent_1 = class CharacterAiComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.kFr = void 0),
        (this.FFr = void 0),
        (this.Uxr = void 0),
        (this.DisableAiHandle = void 0),
        (this.VFr = new Map()),
        (this.Hte = void 0),
        (this.HFr = void 0),
        (this.jFr = ""),
        (this.WFr = !1),
        (this.KFr = void 0),
        (this.QFr = new Array()),
        (this.XFr = new Set()),
        (this.xat = !1),
        (this.$Fr = !1),
        (this.Mne = 0),
        (this.yYe = () => {
          this.FFr?.OnSkillEnd();
        }),
        (this.YFr = void 0);
    }
    static get Dependencies() {
      return [3, 0];
    }
    get TsAiController() {
      return this.kFr;
    }
    get AiController() {
      return this.FFr;
    }
    OnInitData() {
      return (
        (this.FFr = new AiController_1.AiController()),
        (this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle(
          "SetAiDisableInGame",
        )),
        this.Entity.GetComponent(0).IsRole() && this.DisableAi("玩家主控权"),
        !0
      );
    }
    CheckAndInitTsAiController() {
      let t;
      const e = this.Entity.GetComponent(3);
      this.kFr
        ? this.kFr.Possess(e.Actor)
        : ((t = this.JFr(e.ActorTransform)).Possess(e.Actor),
          this.zFr(t, "CheckAndInitTsAiController"));
    }
    OnInit() {
      (this.Mne = this.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
        (this.Hte = this.Entity.GetComponent(3)),
        (this.HFr = this.Entity.GetComponent(65));
      const t = this.Hte.Actor.GetController();
      return (
        t &&
          (t.SetActorTickEnabled(!1), Log_1.Log.CheckWarn()) &&
          Log_1.Log.Warn(
            "AI",
            30,
            "AIC配置在AI基础表，请清理BP自带的AIC配置信息",
            ["ConfigId", this.Mne],
            ["Actor", this.Hte.Actor?.GetName()],
            ["AIController", t?.GetName()],
          ),
        !0
      );
    }
    OnStart() {
      let t;
      return (
        this.FFr.SetAiDesignComp(this),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.yYe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeMode,
          this.AiController.OnChangeMode,
        ),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          ((t =
            this.Entity.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.HBs.Proto_Npc),
          this.Hte.SetAutonomous(!1, t)),
        this.ZFr(),
        !0
      );
    }
    OnActivate() {
      (this.xat = !0),
        this.e3r(),
        this.TsAiController && this.t3r(),
        this.VFr.size || this.FFr?.SetEnable(!0);
    }
    JFr(t) {
      var t = ActorSystem_1.ActorSystem.Get(
        UE.TsAiController_C.StaticClass(),
        t,
        void 0,
      );
      const e =
        (t.SetActorTickEnabled(!1),
        t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass()));
      for (let t = 0; t < e.Num(); t++) e.Get(t).SetComponentTickEnabled(!1);
      return t;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.yYe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeMode,
          this.AiController.OnChangeMode,
        ),
        this.DisableAi("CharacterAiComponent OnEnd"),
        this.RemoveTsAiController(),
        this.FFr?.Clear(),
        (this.FFr = void 0),
        this.DisableAiHandle.Clear(),
        (this.QFr.length = 0),
        !(this.xat = !1)
      );
    }
    OnClear() {
      return this.VFr.clear(), !0;
    }
    ZFr() {
      let t = 0;
      let e = this.Hte.CreatureData.GetPbEntityInitData();
      (t =
        e?.ComponentsData &&
        (e = (0, IComponent_1.getComponent)(e.ComponentsData, "AiComponent"))
          ?.AiId &&
        !e.Disabled
          ? e.AiId
          : t)
        ? this.LoadAiConfigs(t)
        : this.i3r()
          ? this.o3r()
          : this.DisableAi("Ai Config");
    }
    OnTick(t) {
      if (
        !this.Hte.CreatureData.GetRemoveState() &&
        this.kFr &&
        this.xat &&
        !this.WFr
      ) {
        this.FFr && this.FFr.Tick(t);
        const e = t * MathUtils_1.MathUtils.MillisecondToSecond;
        GlobalData_1.GlobalData.IsPlayInEditor &&
          this.kFr.IsDebugDraw &&
          this.kFr.DrawDebugLines(e),
          this.$Fr && this.KFr && this.KFr.KuroTickComponentOutside(e);
        for (const i of this.QFr) i.KuroTickComponentOutside(e);
      }
    }
    LoadAiConfigs(t) {
      let e;
      t
        ? this.FFr.AiBase?.Id !== t &&
          ((e =
            this.Hte.CreatureData.GetEntityType() ===
            Protocol_1.Aki.Protocol.HBs.Proto_Npc),
          this.FFr.LoadAiConfigs(t, e),
          this.FFr.AiBase
            ? (this.VFr.has("Ai Config") && this.EnableAi("Ai Config"),
              this.r3r())
            : this.DisableAi("Ai Config"))
        : this.DisableAi("Ai Config");
    }
    r3r() {
      const i = this.FFr.AiBase;
      if (i && i.AiController) {
        let t = i.AiController;
        t.endsWith("_C") || (t += "_C");
        const o = this.Hte.Actor.GetController();
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (t) => {
          if (t?.IsValid()) {
            if (o?.GetClass().GetName() === t.GetName()) this.zFr(o);
            else if (this.Hte?.Valid)
              if (
                UE.KuroStaticLibrary.GetDefaultObject(t)?.IsA(
                  UE.TsAiController_C.StaticClass(),
                )
              ) {
                var t = ActorSystem_1.ActorSystem.Get(
                  t,
                  this.Hte.ActorTransform,
                  void 0,
                );
                const e =
                  (t.SetActorTickEnabled(!1),
                  t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass()));
                for (let t = 0; t < e.Num(); t++)
                  e.Get(t).SetComponentTickEnabled(!1);
                ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
                  t,
                  this.Hte.Owner,
                  2,
                  "CharacterAiComponent.LoadUeControllerByConfig",
                  void 0,
                  2,
                  2,
                  2,
                  !1,
                ),
                  this.zFr(t, "AiController加载成功");
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "AI",
                    30,
                    "配置的AI控制器不是TsAiController",
                    ["Path", i.AiController],
                  );
          } else this.zFr(o, "AiController加载失败，使用默认AIController配置");
        });
      }
    }
    SetAiHateConfig(t) {
      (this.jFr = t), this.kFr && this.kFr.SetAiHateConfig(t);
    }
    SetAiTickLock(t) {
      this.WFr = t;
    }
    zFr(t, e = "") {
      this.kFr === t
        ? CombatDebugController_1.CombatDebugController.CombatInfo(
            "Ai",
            this.Entity,
            "CharacterAiComponent.SetUeController，AiController相同忽略执行",
            ["reason", e],
          )
        : t instanceof TsAiController_1.default
          ? (CombatDebugController_1.CombatDebugController.CombatInfo(
              "Ai",
              this.Entity,
              "CharacterAiComponent.SetUeController",
              ["reason", e],
            ),
            this.AiController?.AiConditionEvents.Clear(),
            this.AiController?.AiPerceptionEvents.Clear(!0),
            this.RemoveTsAiController(),
            (this.kFr = t),
            this.kFr.InitAiController(this),
            this.jFr && t.SetAiHateConfig(this.jFr),
            t.Possess(this.Hte.Actor),
            this.xat && this.t3r())
          : CombatDebugController_1.CombatDebugController.CombatInfo(
              "Ai",
              this.Entity,
              "CharacterAiComponent.SetUeController，controller is not TsAiController",
              ["reason", e],
            );
    }
    i3r() {
      let t;
      return (
        !!BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree &&
        !!(t = this.Hte.CreatureData.GetPbEntityInitData())?.ComponentsData &&
        !!(0, IComponent_1.getComponent)(t.ComponentsData, "LevelAiComponent")
      );
    }
    t3r() {
      let t, e;
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Ai",
        this.Entity,
        "CharacterAiComponent.StartUeController",
      ),
        this.i3r()
          ? ((e = this.Hte.CreatureData.GetPbDataId()),
            (t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
            (e = BehaviorTreeDefines_1.BehaviorTreeDefines.GetBehaviorTreePath(
              e,
              t,
              !0,
            )),
            this.s3r(e))
          : this.FFr.AiBase && this.s3r(this.FFr.AiBase.BehaviorTree),
        this.kFr.OnStart(),
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? this.YFr && this.h3r(this.YFr)
          : this.kFr.获取控制权时(),
        (this.QFr.length = 0);
    }
    RestartBehaviorTree() {
      let t;
      this.IsAiDriver &&
        (t = this.TsAiController.BrainComponent) &&
        t.RestartLogic();
    }
    EnableAi(t) {
      let e = this.VFr.get(t);
      return this.VFr.delete(t)
        ? !!this.DisableAiHandle.Enable(e, this.constructor.name) &&
            (this.DisableAiHandle.Empty &&
              (this.IsAiDriver &&
                (e = this.TsAiController.BrainComponent) &&
                (e.RestartLogic(),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnAiEnable,
                )),
              CombatDebugController_1.CombatDebugController.CombatInfo(
                "Ai",
                this.Entity,
                "CharacterAiComponent.SetEnable",
                ["enabled", !0],
              ),
              this.Enable(this.Uxr, "CharacterAiComponent.EnableAi"),
              (this.Uxr = void 0),
              this.FFr?.SetEnable(!0)),
            !0)
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              30,
              "[CharacterAiComponent] 开启Ai使用了未定义的Key",
              ["entity", this.Entity.constructor.name],
              ["PbDataId", this.Mne],
              ["Key", t],
            ),
          !1);
    }
    DisableAi(t) {
      let e;
      this.VFr.has(t)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            30,
            "[CharacterAiComponent] 重复使用关闭Ai的Key",
            ["entity", this.Entity.constructor.name],
            ["PbDataId", this.Mne],
            ["Key", t],
          )
        : ((e = this.DisableAiHandle.Disable(t, this.constructor.name)),
          this.VFr.set(t, e),
          this.IsEnabled() &&
            (this.IsAiDriver &&
              (t = this.TsAiController.BrainComponent) &&
              (t.StopLogic("PauseAI"),
              EventSystem_1.EventSystem.EmitWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnAiDisable,
              )),
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "Ai",
              this.Entity,
              "CharacterAiComponent.SetEnable",
              ["enabled", !1],
            ),
            (this.Uxr = this.Disable("[CharacterAiComponent.DisableAi]")),
            this.FFr?.SetEnable(!1)));
    }
    IsEnabled() {
      return void 0 === this.Uxr;
    }
    DumpDisableAiInfo() {
      return this.DisableAiHandle.DumpDisableInfo();
    }
    get IsAiDriver() {
      return !(!this.TsAiController || (!this.i3r() && !this.FFr?.AiBase));
    }
    get HasBrain() {
      return this.IsAiDriver && void 0 !== this.KFr;
    }
    RemoveTsAiController() {
      ObjectUtils_1.ObjectUtils.IsValid(this.kFr) &&
        (ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(
          this.kFr,
        ) &&
          ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
            this.kFr,
            !1,
            "CharacterAiComponent.RemoveTsAiController",
            1,
            1,
            1,
          ),
        this.kFr.Pawn?.IsValid() &&
          this.kFr.Pawn.DetachFromControllerPendingDestroy(),
        this.kFr.Clear()),
        (this.kFr = void 0),
        (this.KFr = void 0);
    }
    SetLoadCompletePlayer(t) {
      this.XFr.add(t);
    }
    CheckLoadComplete(t) {
      return (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        (!!(t = t.GetComponent(0)?.GetPlayerId()) && this.XFr.has(t))
      );
    }
    s3r(i) {
      i &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            30,
            "准备加载行为树AI",
            ["Id", this.FFr?.CharActorComp?.CreatureData.GetPbDataId()],
            ["Path", i],
          ),
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BehaviorTree, (t) => {
          let e;
          this.kFr &&
            (t?.IsValid()
              ? this.kFr.SetupBehaviorTree(t) &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "AI",
                    30,
                    "开始运行行为树AI",
                    ["Id", this.FFr.CharActorComp.CreatureData.GetPbDataId()],
                    ["TreeName", t.GetName()],
                  ),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnRunBehaviorTree,
                ),
                (this.KFr = this.kFr.BrainComponent),
                this.KFr?.SetComponentTickEnabled(!1),
                GlobalData_1.GlobalData.IsPlayInEditor &&
                  (e =
                    this.FFr.CharActorComp.Actor.TsCharacterDebugComponent) &&
                  (e.BehaviorTree = t),
                this.xat) &&
                this.e3r()
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "AI",
                  51,
                  "加载行为树AI资源失败",
                  [
                    "PbDataId",
                    this.FFr.CharActorComp.CreatureData.GetPbDataId(),
                  ],
                  ["Path", i],
                ));
        }));
    }
    e3r() {
      this.$Fr || (this.kFr && (this.$Fr = !0));
    }
    OnSyncAiInformation(t) {
      let e;
      this.Entity.IsInit
        ? this.h3r(t)
        : ((e =
            t.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Ai",
            this.Entity,
            "切换控制权等待Entity初始化完成",
            ["v", e],
          ),
          (this.YFr = t));
    }
    h3r(e) {
      const i =
        e.aFn === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      const t =
        (CombatDebugController_1.CombatDebugController.CombatInfo(
          "Ai",
          this.Entity,
          "切换控制权",
          ["v", i],
        ),
        this.Hte.CreatureData.SetBlackboardsByProtocol(e.c4n.u4n),
        this.FFr.AiHateList);
      for (const n of e.c4n.efs) {
        var o = MathUtils_1.MathUtils.LongToNumber(n.rkn);
        var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
        o && t.ChangeHatred(o.Id, 0, n._4n);
      }
      for (const h of e.c4n.tfs)
        this.FFr.SetCoolDownTime(
          h.skn,
          MathUtils_1.MathUtils.LongToNumber(h.akn),
          !1,
          "切换控制权",
        );
      const r = this.Entity.GetComponent(3);
      if (r.IsAutonomousProxy !== i) {
        let t = i;
        const s = this.Entity.GetComponent(46);
        s &&
          s.IsLocal &&
          (s.CurrentState === 2 || s.CurrentState === 4) &&
          (t = !0),
          r.SetAutonomous(i, t),
          i && this.TsAiController?.获取控制权时(),
          this.FFr.OnSwitchControl(i, e.aFn),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharSwitchControl,
            i,
          ),
          i && this.HFr.OnControl();
      } else this.FFr.SetControllerPlayerId(e.aFn);
    }
    SwitchControl(t) {
      this.Entity.GetComponent(3).SetAutonomous(t),
        t && this.TsAiController?.获取控制权时(),
        this.FFr.OnSwitchControl(
          t,
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          t,
        );
    }
    static AiHateNotify(t, e) {
      const i = t.GetComponent(38).FFr.AiHateList;
      for (const r of e.efs) {
        var o = MathUtils_1.MathUtils.LongToNumber(r.rkn);
        var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
        o && i.ChangeHatred(o.Id, 0, r._4n);
      }
    }
    o3r() {
      const i = this.Hte.Actor.GetController();
      ResourceSystem_1.ResourceSystem.LoadAsync(
        DEFAULT_LEVELAI_AIC_PATH,
        UE.Class,
        (t) => {
          if (t?.IsValid())
            if (i?.GetClass().GetName() === t.GetName()) this.zFr(i);
            else if (this.Hte?.Valid)
              if (
                UE.KuroStaticLibrary.GetDefaultObject(t)?.IsA(
                  UE.TsAiController_C.StaticClass(),
                )
              ) {
                var t = ActorSystem_1.ActorSystem.Get(
                  t,
                  this.Hte.ActorTransform,
                  void 0,
                );
                const e =
                  (t.SetActorTickEnabled(!1),
                  t.K2_GetComponentsByClass(UE.ActorComponent.StaticClass()));
                for (let t = 0; t < e.Num(); t++)
                  e.Get(t).SetComponentTickEnabled(!1);
                ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
                  t,
                  this.Hte.Owner,
                  2,
                  "CharacterAiComponent.LoadAndRunLevelAiBehaviorTree",
                  void 0,
                  2,
                  2,
                  2,
                  !1,
                ),
                  this.zFr(t, "测试加载LevelAi行为树"),
                  this.VFr.has("Ai Config") && this.EnableAi("Ai Config");
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "AI",
                    30,
                    "配置的AI控制器不是TsAiController",
                    ["Path", DEFAULT_LEVELAI_AIC_PATH],
                  );
        },
      );
    }
  });
(CharacterAiComponent.n3r = void 0),
  (CharacterAiComponent.a3r = void 0),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("y2n")],
    CharacterAiComponent,
    "AiHateNotify",
    null,
  ),
  (CharacterAiComponent = CharacterAiComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(38)],
      CharacterAiComponent,
    )),
  (exports.CharacterAiComponent = CharacterAiComponent);
// # sourceMappingURL=CharacterAiComponent.js.map
