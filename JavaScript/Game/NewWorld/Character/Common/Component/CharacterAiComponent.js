"use strict";
var CharacterAiComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, o) {
      var r,
        s = arguments.length,
        n =
          s < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, o);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (n = (s < 3 ? r(n) : 3 < s ? r(e, i, n) : r(e, i)) || n);
      return 3 < s && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAiComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IVar_1 = require("../../../../../UniverseEditor/Interface/IVar"),
  AiController_1 = require("../../../../AI/Controller/AiController"),
  TsAiController_1 = require("../../../../AI/Controller/TsAiController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
  DEFAULT_LEVELAI_AIC_PATH =
    "/Game/Aki/AI/AINPC/Common/AIC_CommonNPC.AIC_CommonNPC_C";
let CharacterAiComponent =
  (CharacterAiComponent_1 = class CharacterAiComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.vFr = void 0),
        (this.MFr = void 0),
        (this.sxr = void 0),
        (this.DisableAiHandle = void 0),
        (this.EFr = new Map()),
        (this.Hte = void 0),
        (this.SFr = void 0),
        (this.yFr = ""),
        (this.IFr = !1),
        (this.TFr = void 0),
        (this.LFr = new Array()),
        (this.DFr = new Set()),
        (this.jht = !1),
        (this.RFr = !1),
        (this.Mne = 0),
        (this.lRa = !1),
        (this.bJe = () => {
          this.MFr?.OnSkillEnd();
        }),
        (this.UFr = void 0),
        (this.C$a = (t, e) => {
          if (this.g$a(t, e))
            switch ((0, IVar_1.getVarTypeByIndex)(e.iTs)) {
              case "Boolean":
                BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
                  this.Entity.Id,
                  t,
                  e.rTs,
                );
                break;
              case "Float":
                BlackboardController_1.BlackboardController.SetFloatValueByEntity(
                  this.Entity.Id,
                  t,
                  e.sTs,
                );
                break;
              case "Int":
                BlackboardController_1.BlackboardController.SetIntValueByEntity(
                  this.Entity.Id,
                  t,
                  MathUtils_1.MathUtils.LongToNumber(e.oTs),
                );
                break;
              case "String":
                BlackboardController_1.BlackboardController.SetStringValueByEntity(
                  this.Entity.Id,
                  t,
                  e.nTs,
                );
            }
        });
    }
    static get Dependencies() {
      return [3, 0];
    }
    get TsAiController() {
      return this.vFr;
    }
    get AiController() {
      return this.MFr;
    }
    OnInitData() {
      return (
        (this.MFr = new AiController_1.AiController()),
        (this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle(
          "SetAiDisableInGame",
        )),
        this.Entity.GetComponent(0).IsRole() && this.DisableAi("玩家主控权"),
        !0
      );
    }
    CheckAndInitTsAiController() {
      var t,
        e = this.Entity.GetComponent(3);
      this.vFr
        ? this.vFr.Possess(e.Actor)
        : ((t = this.AFr(e.ActorTransform)).Possess(e.Actor),
          this.PFr(t, "CheckAndInitTsAiController"));
    }
    OnInit() {
      (this.Mne = this.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
        (this.Hte = this.Entity.GetComponent(3)),
        (this.SFr = this.Entity.GetComponent(68));
      var t = this.Hte.Actor.GetController();
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
      var t;
      return (
        this.MFr.SetAiDesignComp(this),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.bJe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeMode,
          this.AiController.OnChangeMode,
        ),
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          ((t =
            this.Entity.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.kks.Proto_Npc),
          this.Hte.SetAutonomous(!1, t)),
        this.xFr(),
        !0
      );
    }
    OnActivate() {
      (this.jht = !0),
        this.wFr(),
        this.TsAiController && this.BFr(),
        this.EFr.size || this.MFr?.SetEnable(!0),
        (ModelManager_1.ModelManager.CombatMessageModel.AnyHateChange = !0);
    }
    AFr(t) {
      var t = ActorSystem_1.ActorSystem.Get(
          UE.TsAiController_C.StaticClass(),
          t,
          void 0,
        ),
        e =
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
          this.bJe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeMode,
          this.AiController.OnChangeMode,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EntityVarUpdate,
          this.C$a,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EntityVarUpdate,
            this.C$a,
          ),
        this.DisableAi("CharacterAiComponent OnEnd"),
        this.RemoveTsAiController(),
        this.MFr?.Clear(),
        (this.MFr = void 0),
        this.DisableAiHandle.Clear(),
        (this.LFr.length = 0),
        !(this.jht = !1)
      );
    }
    OnClear() {
      return this.EFr.clear(), !0;
    }
    xFr() {
      let t = 0;
      var e = this.Hte.CreatureData.GetPbEntityInitData();
      (t =
        e?.ComponentsData &&
        (e = (0, IComponent_1.getComponent)(e.ComponentsData, "AiComponent"))
          ?.AiId &&
        !e.Disabled
          ? e.AiId
          : t)
        ? this.LoadAiConfigs(t)
        : this.bFr()
          ? (this.Mca(), this.qFr())
          : this.DisableAi("Ai Config");
    }
    OnTick(t) {
      if (
        !this.Hte.CreatureData.GetRemoveState() &&
        this.vFr &&
        this.jht &&
        !this.IFr
      ) {
        this.MFr && this.MFr.Tick(t);
        var e = t * MathUtils_1.MathUtils.MillisecondToSecond;
        GlobalData_1.GlobalData.IsPlayInEditor &&
          this.lRa &&
          this.vFr.DrawDebugLines(e),
          this.RFr && this.TFr && this.TFr.KuroTickComponentOutside(e);
        for (const i of this.LFr) i.KuroTickComponentOutside(e);
      }
    }
    LoadAiConfigs(t) {
      var e;
      t
        ? this.MFr.AiBase?.Id !== t &&
          ((e =
            this.Hte.CreatureData.GetEntityType() ===
            Protocol_1.Aki.Protocol.kks.Proto_Npc),
          this.MFr.LoadAiConfigs(t, e),
          this.MFr.AiBase
            ? (this.EFr.has("Ai Config") && this.EnableAi("Ai Config"),
              this.GFr())
            : this.DisableAi("Ai Config"))
        : this.DisableAi("Ai Config");
    }
    GFr() {
      const i = this.MFr.AiBase;
      if (i && i.AiController) {
        let t = i.AiController;
        t.endsWith("_C") || (t += "_C");
        const o = this.Hte.Actor.GetController();
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (t) => {
          if (t?.IsValid()) {
            if (o?.GetClass().GetName() === t.GetName()) this.PFr(o);
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
                  ),
                  e =
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
                  this.PFr(t, "AiController加载成功");
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "AI",
                    30,
                    "配置的AI控制器不是TsAiController",
                    ["Path", i.AiController],
                  );
          } else this.PFr(o, "AiController加载失败，使用默认AIController配置");
        });
      }
    }
    SetAiHateConfig(t) {
      (this.yFr = t), this.vFr && this.vFr.SetAiHateConfig(t);
    }
    SetAiTickLock(t) {
      this.IFr = t;
    }
    PFr(t, e = "") {
      this.vFr === t
        ? CombatLog_1.CombatLog.Info(
            "Ai",
            this.Entity,
            "CharacterAiComponent.SetUeController，AiController相同忽略执行",
            ["reason", e],
          )
        : t instanceof TsAiController_1.default
          ? (CombatLog_1.CombatLog.Info(
              "Ai",
              this.Entity,
              "CharacterAiComponent.SetUeController",
              ["reason", e],
            ),
            CharacterAiComponent_1.NFr.Start(),
            this.AiController?.AiConditionEvents.Clear(),
            this.AiController?.AiPerceptionEvents.Clear(!0),
            this.RemoveTsAiController(),
            (this.vFr = t),
            this.vFr.InitAiController(this),
            this.yFr && t.SetAiHateConfig(this.yFr),
            t.Possess(this.Hte.Actor),
            this.jht && this.BFr(),
            CharacterAiComponent_1.NFr.Stop())
          : CombatLog_1.CombatLog.Info(
              "Ai",
              this.Entity,
              "CharacterAiComponent.SetUeController，controller is not TsAiController",
              ["reason", e],
            );
    }
    bFr() {
      var t;
      return (
        !!BehaviorTreeDefines_1.BehaviorTreeDefines.UseLevelAiBehaviorTree &&
        !!(t = this.Hte.CreatureData.GetPbEntityInitData())?.ComponentsData &&
        !!(0, IComponent_1.getComponent)(t.ComponentsData, "LevelAiComponent")
          ?.BtTreeAsset
      );
    }
    BFr() {
      if (
        (CombatLog_1.CombatLog.Info(
          "Ai",
          this.Entity,
          "CharacterAiComponent.StartUeController",
        ),
        this.bFr())
      ) {
        var e = this.Hte.CreatureData.GetPbEntityInitData();
        if (e) {
          e = (0, IComponent_1.getComponent)(
            e.ComponentsData,
            "LevelAiComponent",
          )?.BtTreeAsset;
          if (e && "" !== e) {
            let t = e.lastIndexOf(".");
            -1 === t && (t = e.length);
            var i = e.lastIndexOf("/", t - 1),
              o = e.substring(i + 1, t),
              e = e.substring(0, i + 1) + (o + ".") + o;
            this.OFr(e);
          }
        }
      } else this.MFr.AiBase && this.OFr(this.MFr.AiBase.BehaviorTree);
      CharacterAiComponent_1.kFr.Start(),
        this.vFr.OnStart(),
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? this.UFr && this.FFr(this.UFr)
          : this.vFr.获取控制权时(),
        (this.LFr.length = 0),
        CharacterAiComponent_1.kFr.Stop();
    }
    RestartBehaviorTree() {
      var t;
      this.IsAiDriver &&
        (t = this.TsAiController.BrainComponent) &&
        t.RestartLogic();
    }
    EnableAi(t) {
      var e = this.EFr.get(t);
      return this.EFr.delete(t)
        ? !!this.DisableAiHandle.Enable(e, this.constructor.name) &&
            (this.DisableAiHandle.Empty &&
              (this.IsAiDriver &&
                (e = this.TsAiController.BrainComponent) &&
                (e.RestartLogic(),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnAiEnable,
                )),
              CombatLog_1.CombatLog.Info(
                "Ai",
                this.Entity,
                "CharacterAiComponent.SetEnable",
                ["enabled", !0],
              ),
              this.Enable(this.sxr, "CharacterAiComponent.EnableAi"),
              (this.sxr = void 0),
              this.MFr?.SetEnable(!0)),
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
      var e;
      this.EFr.has(t)
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
          this.EFr.set(t, e),
          this.IsEnabled() &&
            (this.IsAiDriver &&
              (t = this.TsAiController.BrainComponent) &&
              (t.StopLogic("PauseAI"),
              EventSystem_1.EventSystem.EmitWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnAiDisable,
              )),
            CombatLog_1.CombatLog.Info(
              "Ai",
              this.Entity,
              "CharacterAiComponent.SetEnable",
              ["enabled", !1],
            ),
            (this.sxr = this.Disable("[CharacterAiComponent.DisableAi]")),
            this.MFr?.SetEnable(!1)));
    }
    IsEnabled() {
      return void 0 === this.sxr;
    }
    DumpDisableAiInfo() {
      return this.DisableAiHandle.DumpDisableInfo();
    }
    get IsAiDriver() {
      return !(!this.TsAiController || (!this.bFr() && !this.MFr?.AiBase));
    }
    get HasBrain() {
      return this.IsAiDriver && void 0 !== this.TFr;
    }
    RemoveTsAiController() {
      ObjectUtils_1.ObjectUtils.IsValid(this.vFr) &&
        (ModelManager_1.ModelManager.AttachToActorModel.GetEntityIdByActor(
          this.vFr,
        ) &&
          ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
            this.vFr,
            !1,
            "CharacterAiComponent.RemoveTsAiController",
            1,
            1,
            1,
          ),
        this.vFr.Pawn?.IsValid() &&
          this.vFr.Pawn.DetachFromControllerPendingDestroy(),
        this.vFr.Clear()),
        (this.vFr = void 0),
        (this.TFr = void 0);
    }
    SetLoadCompletePlayer(t) {
      this.DFr.add(t);
    }
    CheckLoadComplete(t) {
      return (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        (!!(t = t.GetComponent(0)?.GetPlayerId()) && this.DFr.has(t))
      );
    }
    SetDebugDraw(t) {
      this.lRa = t;
    }
    OFr(i) {
      i &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            30,
            "准备加载行为树AI",
            ["Id", this.MFr?.CharActorComp?.CreatureData.GetPbDataId()],
            ["Path", i],
          ),
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BehaviorTree, (t) => {
          var e;
          this.vFr &&
            (t?.IsValid()
              ? this.vFr.SetupBehaviorTree(t) &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "AI",
                    30,
                    "开始运行行为树AI",
                    ["Id", this.MFr.CharActorComp.CreatureData.GetPbDataId()],
                    ["TreeName", t.GetName()],
                  ),
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.OnRunBehaviorTree,
                ),
                (this.TFr = this.vFr.BrainComponent),
                this.TFr?.SetComponentTickEnabled(!1),
                GlobalData_1.GlobalData.IsPlayInEditor &&
                  (e =
                    this.MFr.CharActorComp.Actor.TsCharacterDebugComponent) &&
                  (e.BehaviorTree = t),
                this.jht) &&
                this.wFr()
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "AI",
                  51,
                  "加载行为树AI资源失败",
                  [
                    "PbDataId",
                    this.MFr.CharActorComp.CreatureData.GetPbDataId(),
                  ],
                  ["Path", i],
                ));
        }));
    }
    wFr() {
      this.RFr || (this.vFr && (this.RFr = !0));
    }
    OnSyncAiInformation(t) {
      var e;
      this.Entity.IsInit
        ? this.FFr(t)
        : ((e =
            t.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
          CombatLog_1.CombatLog.Info(
            "Ai",
            this.Entity,
            "切换控制权等待Entity初始化完成",
            ["v", e],
          ),
          (this.UFr = t));
    }
    FFr(e) {
      var i = e.W5n === ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        t =
          (CombatLog_1.CombatLog.Info("Ai", this.Entity, "切换控制权", [
            "v",
            i,
          ]),
          this.Hte.CreatureData.SetBlackboardsByProtocol(e.tVn.eVn),
          this.MFr.AiHateList);
      for (const n of e.tVn.ISs) {
        var o = MathUtils_1.MathUtils.LongToNumber(n.F4n),
          o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
        o && t.ChangeHatred(o.Id, 0, n.Z8n);
      }
      for (const a of e.tVn.TSs)
        this.MFr.SetCoolDownTime(
          a.j4n,
          MathUtils_1.MathUtils.LongToNumber(a.W4n),
          !1,
          "切换控制权",
        );
      var r = this.Entity.GetComponent(3);
      if (r.IsAutonomousProxy !== i) {
        let t = i;
        var s = this.Entity.GetComponent(48);
        s &&
          s.IsLocal &&
          (2 === s.CurrentState || 4 === s.CurrentState) &&
          (t = !0),
          r.SetAutonomous(i, t),
          i && this.TsAiController?.获取控制权时(),
          this.MFr.OnSwitchControl(i, e.W5n),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharSwitchControl,
            i,
          ),
          i && this.SFr.OnControl();
      } else this.MFr.SetControllerPlayerId(e.W5n);
    }
    SwitchControl(t) {
      this.Entity.GetComponent(3).SetAutonomous(t),
        t && this.TsAiController?.获取控制权时(),
        this.MFr.OnSwitchControl(
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
      var i = t.GetComponent(40).MFr.AiHateList;
      for (const r of e.ISs) {
        var o = MathUtils_1.MathUtils.LongToNumber(r.F4n),
          o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
        o && i.ChangeHatred(o.Id, 0, r.Z8n);
      }
    }
    qFr() {
      const i = this.Hte.Actor.GetController();
      ResourceSystem_1.ResourceSystem.LoadAsync(
        DEFAULT_LEVELAI_AIC_PATH,
        UE.Class,
        (t) => {
          if (t?.IsValid())
            if (i?.GetClass().GetName() === t.GetName()) this.PFr(i);
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
                  ),
                  e =
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
                  this.PFr(t, "测试加载LevelAi行为树"),
                  this.EFr.has("Ai Config") && this.EnableAi("Ai Config");
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
    Mca() {
      var t = this.Entity.GetComponent(0)?.GetPbEntityInitData();
      if (t) {
        t = (0, IComponent_1.getComponent)(t.ComponentsData, "VarComponent");
        if (t) {
          for (const e of t.Vars)
            if (e.IsClient)
              switch (e.Type) {
                case "Int":
                  BlackboardController_1.BlackboardController.SetIntValueByEntity(
                    this.Entity.Id,
                    e.Name,
                    e.Value,
                  );
                  break;
                case "Float":
                  BlackboardController_1.BlackboardController.SetFloatValueByEntity(
                    this.Entity.Id,
                    e.Name,
                    e.Value,
                  );
                  break;
                case "String":
                  BlackboardController_1.BlackboardController.SetStringValueByEntity(
                    this.Entity.Id,
                    e.Name,
                    e.Value,
                  );
                  break;
                case "Boolean":
                  BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
                    this.Entity.Id,
                    e.Name,
                    e.Value,
                  );
              }
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EntityVarUpdate,
            this.C$a,
          );
        }
      }
    }
    g$a(t, e) {
      var i = this.Entity?.GetComponent(0);
      if (i?.IsNpc() || i?.IsAnimal()) {
        i = i.GetPbEntityInitData();
        if (i) {
          i = (0, IComponent_1.getComponent)(i.ComponentsData, "VarComponent");
          if (i) {
            var o = (0, IVar_1.getVarTypeByIndex)(e.iTs);
            for (const r of i.Vars)
              if (t === r.Name) return !!r.IsClient && r.Type === o;
          }
        }
      }
      return !1;
    }
  });
(CharacterAiComponent.NFr = Stats_1.Stat.Create("SetUeController")),
  (CharacterAiComponent.kFr = Stats_1.Stat.Create("StartUeController")),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("a3n")],
    CharacterAiComponent,
    "AiHateNotify",
    null,
  ),
  (CharacterAiComponent = CharacterAiComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(40)],
      CharacterAiComponent,
    )),
  (exports.CharacterAiComponent = CharacterAiComponent);
//# sourceMappingURL=CharacterAiComponent.js.map
