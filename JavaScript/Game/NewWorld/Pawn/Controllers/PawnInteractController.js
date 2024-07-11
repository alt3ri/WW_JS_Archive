"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInteractController = exports.InteractEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const Global_1 = require("../../../Global");
const LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ChildQuestNodeBase_1 = require("../../../Module/GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase");
const GeneralLogicTreeUtil_1 = require("../../../Module/GeneralLogicTree/GeneralLogicTreeUtil");
const TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils");
const PlotController_1 = require("../../../Module/Plot/PlotController");
const SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary");
const DEFAULT_INTERACT_RANGE = 300;
const PROFILE_DETECT_VISIBLE_BLOCK =
  "PawnInteractController_DetectVisibleBlock";
const DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET = 10;
const EXECUTION_MAX_HEIGHT_DIFF = 50;
class InteractEntity {
  constructor(t) {
    (this.IsAdvice = !1),
      (this.Jh = void 0),
      (this.Hte = void 0),
      (this.EntityId = void 0),
      (this.InteractRange = -0),
      (this.c_i = 0),
      (this.gor = -100),
      (this.por = -9999),
      (this.DirectOptionInstanceIds = []),
      (this.DirectOptionNames = []),
      (this.Jh = t),
      (this.EntityId = t?.Id),
      (this.IsAdvice = void 0 !== t.GetComponent(0).GetAdviceInfo()),
      (this.Hte = t.GetComponent(1)),
      (this.DirectOptionInstanceIds = new Array()),
      (this.DirectOptionNames = new Array());
  }
  get Priority() {
    let t, i;
    return this.Jh
      ? (this.IsAdvice &&
          ((i = this.Hte.ActorLocationProxy),
          (t =
            Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorLocationProxy),
          (i = Vector_1.Vector.Distance(i, t)),
          (this.c_i =
            MathCommon_1.MathCommon.Clamp(i / this.InteractRange, 0, 1) *
            this.gor)),
        this.c_i)
      : this.por;
  }
  GetEntity() {
    return this.Jh;
  }
}
exports.InteractEntity = InteractEntity;
class PawnInteractController {
  constructor(t) {
    (this.Hte = void 0),
      (this.vor = void 0),
      (this.Mor = void 0),
      (this.Sor = void 0),
      (this.Eor = void 0),
      (this.yor = void 0),
      (this.Ior = void 0),
      (this.Tor = ""),
      (this.Lor = DEFAULT_INTERACT_RANGE),
      (this.Dor = -1),
      (this.SectorRange = void 0),
      (this.LocationOffset = void 0),
      (this.Ror = -0),
      (this.Uor = "Option"),
      (this.IsTurnAround = !1),
      (this.IsTurnRecoveryImmediately = !1),
      (this.IsWaitTurnComplete = !1),
      (this.InteractIcon = "Dialog"),
      (this.PreTalkConfigs = void 0),
      (this.PlayerInteractiveRange = void 0),
      (this.IsPlayerTurnAround = !1),
      (this.NUe = 0),
      (this.Aor = 0),
      (this.Por = 0),
      (this.InteractEntity = void 0),
      (this.wor = void 0),
      (this.Bor = Vector_1.Vector.Create()),
      (this.aXt = void 0),
      (this.TempDirectOptionInstances = new Array()),
      (this.PreDirectOptionInstances = new Array()),
      (this.OnInteractionUpdate = void 0),
      (this.OnInteractActionEnd = void 0),
      (this.InteractEntity = new InteractEntity(t.Entity)),
      (this.vor = t),
      (this.Hte = t.Entity.GetComponent(1)),
      this.qor(),
      (this.InteractEntity.InteractRange = Math.max(
        this.InteractRange,
        this.InteractExitRange,
      ));
  }
  Dispose() {
    (this.Hte = void 0),
      (this.vor = void 0),
      (this.Mor = void 0),
      (this.Eor = void 0),
      (this.yor = void 0),
      (this.Sor = void 0),
      (this.wor = void 0),
      (this.Ior = void 0),
      (this.PlayerInteractiveRange = void 0),
      (this.PreTalkConfigs = void 0),
      (this.SectorRange = void 0),
      (this.OnInteractionUpdate = void 0),
      (this.OnInteractActionEnd = void 0);
  }
  get DefaultShowOption() {
    const t = this.GetInteractiveOption();
    return this.HasDynamicOption && t?.DoIntactType === "Direct" && t.TidContent
      ? PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent)
      : StringUtils_1.StringUtils.IsEmpty(this.Tor)
        ? void 0
        : PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Tor);
  }
  GetInteractType() {
    return this.Uor;
  }
  qor() {
    const t = this.Hte.CreatureData;
    let i = t.GetPbEntityInitData();
    if (i) {
      (this.Mor = new Array()),
        (this.Eor = new Array()),
        (this.yor = new Array()),
        (this.Sor = new Array());
      const e = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "InteractComponent",
      );
      if (e) {
        if (
          ((this.PreTalkConfigs = e.PreFlow),
          e.Range && (this.Lor = e.Range),
          e.ExitRange && (this.Dor = e.ExitRange),
          e.SectorRange && (this.SectorRange = e.SectorRange),
          e.SectorRangeFromPlayerToEntity)
        )
          switch (e.SectorRangeFromPlayerToEntity.Type) {
            case IComponent_1.EInteractPlayerDiractionType.LeisureInteraction:
              this.PlayerInteractiveRange = e.SectorRangeFromPlayerToEntity;
              break;
            case IComponent_1.EInteractPlayerDiractionType.Npc:
          }
        if (
          (e.InteractPointOffset &&
            (this.LocationOffset = Vector_1.Vector.Create(
              e.InteractPointOffset.X || 0,
              e.InteractPointOffset.Y,
              e.InteractPointOffset.Z,
            )),
          e.TidContent && (this.Tor = e.TidContent),
          (this.Uor = e.DoIntactType),
          e.TurnAroundType)
        ) {
          switch (e.TurnAroundType) {
            case IComponent_1.EInteractTurnAround.FaceEachOther:
            case IComponent_1.EInteractTurnAround
              .FaceEachOtherWithRecoveryImmediately:
              (this.IsTurnAround = !0),
                (this.IsPlayerTurnAround = !0),
                e.IsWaitForTurnAroundComplete && (this.IsWaitTurnComplete = !0);
              break;
            case IComponent_1.EInteractTurnAround.PlayerTurnToInteractor:
              this.IsPlayerTurnAround = !0;
          }
          e.TurnAroundType ===
            IComponent_1.EInteractTurnAround
              .FaceEachOtherWithRecoveryImmediately &&
            (this.IsTurnRecoveryImmediately = !0);
        }
        (this.aXt = e.MatchRoleOption), this.Gor(e);
      } else this.Ror = this.Lor;
      i = t.ComponentDataMap.get("tps")?.tps;
      this.Nor(i, e?.RandomInteract, t.GetPbDataId()),
        this.Oor(i),
        i && this.vor.SetServerLockInteract(i.hMs, "Init Interact Controller"),
        this.kor();
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Interaction",
          7,
          "[PawnInteractComponent.OnStart] 交互组件初始化失败",
          ["CreatureGenID:", t.GetOwnerId()],
          ["PbDataId:", t.GetPbDataId()],
        );
  }
  Oor(t) {
    if (t?.sMs)
      for (const r of t.sMs) {
        const i = ModelManager_1.ModelManager.InteractionModel.GetDynamicConfig(
          r.gFn,
        );
        const e =
          LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
            r.Hms,
          );
        this.AddDynamicInteractOption(i, e, r.nMs, !1);
      }
  }
  ClearDirectOptions() {
    this.InteractEntity &&
      ((this.InteractEntity.DirectOptionInstanceIds.length = 0),
      (this.InteractEntity.DirectOptionNames.length = 0));
  }
  UpdateDirectOptions(t = !0, i = !1) {
    if (this.Mor && this.Hte) {
      const e = this.Hte.Owner;
      if (
        e &&
        this.InteractEntity &&
        ((this.TempDirectOptionInstances.length = 0),
        (this.InteractEntity.DirectOptionInstanceIds.length = 0),
        (this.InteractEntity.DirectOptionNames.length = 0),
        !this.HasDynamicOption)
      ) {
        for (const r of this.Mor)
          r.Disabled ||
            r.DoIntactType !== "Direct" ||
            (i && r.Type.Type !== "Flow") ||
            (r.CustomOptionType !== 1 &&
              this.For(r) &&
              (this.TempDirectOptionInstances.push(r),
              this.InteractEntity.DirectOptionInstanceIds.push(r.InstanceId),
              this.InteractEntity.DirectOptionNames.push(r.TidContent)));
        if (t) {
          let i = !1;
          if (
            this.PreDirectOptionInstances.length ===
            this.TempDirectOptionInstances.length
          ) {
            for (let t = 0; t < this.TempDirectOptionInstances.length; t++)
              if (
                this.TempDirectOptionInstances[t] !==
                this.PreDirectOptionInstances[t]
              ) {
                i = !0;
                break;
              }
          } else i = !0;
          if (i) {
            TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView(),
              (this.PreDirectOptionInstances.length = 0);
            for (const n of this.TempDirectOptionInstances)
              this.PreDirectOptionInstances.push(n);
          }
        }
      }
    }
  }
  Nor(t, i, e) {
    if (t && t.aMs && t.aMs.length)
      if (i)
        for (const n of t.aMs) {
          var r = i.Options[n].Option;
          var r = this.Vor(r, 2);
          (r.RandomOptionIndex = n), this.Mor.push(r);
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Interaction", 19, "找不到随机交互组件的配置", [
            "实体配置Id",
            e,
          ]);
  }
  Gor(e) {
    if (
      (e.InteractIcon
        ? (this.InteractIcon = e.InteractIcon)
        : e.InteractDefaultIcon
          ? (this.InteractIcon = e.InteractDefaultIcon)
          : (this.InteractIcon = "Dialog"),
      e.Options?.length > 0)
    )
      for (let t = 0, i = e.Options.length; t < i; t++) {
        const r = this.Vor(e.Options[t], 0);
        this.Mor.push(r);
      }
  }
  kor() {
    this.Hor(),
      this.jor(),
      (this.Sor.length = 0),
      this.OnInteractionUpdate && this.OnInteractionUpdate(),
      this.vor && this.vor.UpdateInteractRange();
  }
  IsInSectorRange() {
    if (!this.SectorRange) return !0;
    const e = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.Begin);
    const r = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.End);
    var n = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (n) {
      let t = void 0;
      var s = this.Hte.CreatureData.GetEntityType();
      var s =
        ((t =
          s === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
            ? this.Hte.ActorRightProxy
            : this.Hte.ActorForwardProxy),
        PawnInteractController.cz);
      const o = PawnInteractController.fz;
      var n =
        (n.ActorLocationProxy.Subtraction(this.GetInteractPoint(), s),
        (s.Z = 0),
        s.Normalize(),
        s.DotProduct(t));
      let i = Math.acos(n) * MathUtils_1.MathUtils.RadToDeg;
      if (
        (s.CrossProduct(t, o),
        o.Z > 0 && (i *= -1),
        (i = MathCommon_1.MathCommon.WrapAngle(i)),
        r < e)
      ) {
        if (i > e || i < r) return !0;
      } else if (i > e && i < r) return !0;
    }
    return !1;
  }
  IsInPlayerInteractiveRange() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) return !1;
    if (!this.PlayerInteractiveRange) return !0;
    if (
      this.PlayerInteractiveRange.Begin === -MathUtils_1.PI_DEG &&
      this.PlayerInteractiveRange.End === MathUtils_1.PI_DEG
    )
      return !0;
    const i = PawnInteractController.cz;
    const e = PawnInteractController.fz;
    var t =
      (i.FromUeVector(this.Hte.ActorLocationProxy),
      i.SubtractionEqual(t.ActorLocationProxy),
      (i.Z = 0),
      i.Normalize(),
      t.ActorForwardProxy);
    const r = i.DotProduct(t);
    let n = Math.acos(r) * MathUtils_1.MathUtils.RadToDeg;
    return (
      i.CrossProduct(t, e),
      e.Z > 0 && (n *= -1),
      n > this.PlayerInteractiveRange.Begin &&
        n < this.PlayerInteractiveRange.End
    );
  }
  IsMatchRoleOption() {
    return !this.aXt || this.aXt?.length <= 0
      ? !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
      : SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.aXt);
  }
  GetInteractPoint() {
    this.Bor.DeepCopy(this.Hte.ActorLocationProxy);
    const t = PawnInteractController.cz;
    const i = this.LocationOffset;
    return (
      !i ||
        (i.X === 0 && i.Y === 0 && i.Z === 0) ||
        (i.X !== 0 &&
          (this.Hte.ActorForwardProxy.Multiply(i.X, t),
          this.Bor.AdditionEqual(t)),
        i.Y !== 0 &&
          (this.Hte.ActorRightProxy.Multiply(i.Y, t),
          this.Bor.AdditionEqual(t)),
        i.Z !== 0 &&
          (this.Hte.ActorUpProxy.Multiply(i.Z, t), this.Bor.AdditionEqual(t))),
      this.Bor
    );
  }
  Hor() {
    if (((this.Ror = this.Lor), this.Mor))
      for (const t of this.Mor) t.Range > this.Ror && (this.Ror = t.Range);
  }
  jor() {
    this.Mor &&
      this.Mor.length !== 0 &&
      ((this.Ior = this.Mor[0]), (this.wor = void 0));
  }
  GetInteractiveOption(i = !1) {
    if (this.Por === Time_1.Time.Frame && this.wor) return this.wor;
    if (this.Hte && this.Hte.Owner) {
      const e = this.Mor;
      if (e) {
        this.wor = void 0;
        for (let t = e.length - 1; t > -1; t--) {
          const r = e[t];
          if (!r.Disabled)
            if (!i || r.Type.Type === "Flow")
              if (this.For(r)) {
                this.wor = r;
                break;
              }
        }
        return (this.Por = Time_1.Time.Frame), this.wor;
      }
    }
  }
  Vor(t, i, e, r = 0, n = 0) {
    const s = t.Range || this.Lor;
    let o = this.Uor;
    t.DoIntactType && (o = t.DoIntactType);
    const h = new LevelGameplayActionsDefine_1.CommonInteractOption();
    return h.Init(++this.NUe, t, e, s, o, i, r, n), h;
  }
  AddDynamicInteractOption(t, i, e, r = !0) {
    if (!this.Mor) return -1;
    let n = 0;
    let s = 0;
    i &&
      (i instanceof LevelGeneralContextDefine_1.QuestContext
        ? ((s = 1), (n = i.QuestId))
        : i instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
          i.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
          ((s = 1), (n = i.TreeConfigId)));
    t = this.Vor(t, 1, i, 0, s);
    return (
      (t.OptionContentId = n),
      void 0 !== e && (t.TidContent = e),
      this.Mor.push(t),
      this.Eor.push(t),
      s === 1 && (this.yor.push(t), this.Wor()),
      i &&
        ((e = this.Kor(t.Context)),
        this.ChangeOptionDisabled(t.InstanceId, !e)),
      r && this.kor(),
      t.InstanceId
    );
  }
  Wor() {
    this.yor.sort((t, i) => {
      (t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
        t.OptionContentId,
      )),
        (i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          i.OptionContentId,
        ));
      return t && i
        ? t.Type !== i.Type
          ? t.Type - i.Type
          : t.ChapterId !== i.ChapterId
            ? t.ChapterId - i.ChapterId
            : t.Id - i.Id
        : -1;
    });
  }
  RemoveDynamicInteractOption(i) {
    if (!this.Mor) return !1;
    let e = !1;
    for (let t = this.Eor.length - 1; t > -1; t--) {
      const r = this.Eor[t];
      if (r.Guid === i) {
        (e = r.ContentType === 1), this.Eor.splice(t, 1);
        break;
      }
    }
    if (e)
      for (let t = this.yor.length - 1; t > -1; t--)
        if (this.yor[t].Guid === i) {
          this.yor.splice(t, 1);
          break;
        }
    let n = !1;
    for (let t = this.Mor.length - 1; t > -1; t--)
      if (this.Mor[t].Guid === i) {
        (n = !0), this.Mor.splice(t, 1)[0].Dispose();
        break;
      }
    return n && this.kor(), n;
  }
  AddClientInteractOption(t, i, e = "Option", r, n, s = 0, o) {
    var h = new LevelGameplayActionsDefine_1.CommonActionInfo();
    var t = ((h.Params = t), new Array());
    var h =
      (t.push(h), new LevelGameplayActionsDefine_1.CommonInteractActions());
    var t =
      ((h.Actions = t),
      new LevelGameplayActionsDefine_1.CommonInteractOption());
    return (
      (t.Type = h),
      (t.Condition = i),
      (t.DoIntactType = e),
      r && (t.Range = r),
      n && (t.TidContent = n),
      o && (this.LocationOffset = o),
      this.Mor
        ? ((h = this.Vor(t, 3, void 0, s)),
          this.Mor.push(h),
          this.kor(),
          h.InstanceId)
        : -1
    );
  }
  RemoveClientInteractOption(i) {
    if (!this.Mor) return !1;
    let e = !1;
    for (let t = this.Mor.length - 1; t > -1; t--)
      if (this.Mor[t].InstanceId === i) {
        (e = !0), this.Mor.splice(t, 1)[0].Dispose();
        break;
      }
    return e && this.kor(), e;
  }
  OnChangeModeFinish() {
    if (this.Mor)
      for (const i of this.Mor) {
        var t;
        i.Context &&
          i.OptionType === 1 &&
          ((t = this.Kor(i.Context)),
          this.ChangeOptionDisabled(i.InstanceId, !t));
      }
  }
  ChangeOptionText(i, t) {
    let e;
    this.Mor && (e = this.Mor.find((t) => t.Guid === i)) && (e.TidContent = t);
  }
  ChangeOptionDisabled(i, t) {
    let e;
    this.Mor &&
      (e = this.Mor.find((t) => t.InstanceId === i)) &&
      (e.Disabled = t);
  }
  ChangeInteractOption(t) {
    this.Ior = t;
  }
  get CurrentInteractOption() {
    return this.Ior;
  }
  get Options() {
    if (this.Sor && this.Mor)
      for (let t = (this.Sor.length = 0), i = this.Mor.length; t < i; t++) {
        const e = this.Mor[t];
        e.Disabled || this.Sor.push(e);
      }
    return this.Sor;
  }
  get ShowOptions() {
    const e = new Array();
    for (const t of this.yor)
      StringUtils_1.StringUtils.IsEmpty(t.TidContent) ||
        t.Disabled ||
        t.DoIntactType !== "Option" ||
        (this.For(t) && e.push(t));
    for (let t = 0, i = this.Mor.length; t < i; t++) {
      const r = this.Mor[t];
      StringUtils_1.StringUtils.IsEmpty(r.TidContent) ||
        r.Disabled ||
        r.DoIntactType !== "Option" ||
        r.ContentType === 1 ||
        (this.For(r) && e.push(r));
    }
    return e.push(void 0), e;
  }
  get HasDynamicOption() {
    return this.Eor.length > 0;
  }
  get Owner() {
    return this.Hte?.Owner;
  }
  get EntityId() {
    return this.Hte?.Entity?.Id;
  }
  get CreatureData() {
    return this.Hte?.CreatureData;
  }
  HasInteractOptions() {
    return void 0 !== this.Mor?.length && this.Mor?.length > 0;
  }
  get InteractRange() {
    return this.Ror;
  }
  get InteractExitRange() {
    return this.Dor === -1 ? this.Ror : this.Dor;
  }
  GetAutoTriggerOption() {
    if (this.Mor)
      for (let t = 0, i = this.Mor.length; t < i; t++) {
        const e = this.Mor[t];
        if (e.DoIntactType === "Auto") if (this.For(e)) return e;
      }
  }
  InteractOption(t = 0) {
    t >= this.Mor.length ||
      (!(t = this.Mor[t]).Disabled &&
        this.For(t) &&
        (PlotController_1.PlotController.EndInteraction(t.Type.Type === "Flow"),
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
          t,
          this,
        )));
  }
  For(t) {
    if (
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
        t.Condition,
        this.Hte.Owner,
        LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id),
      )
    )
      return !1;
    if (t.OptionType === 3 && t.CustomOptionType === 1) {
      t = this.Hte;
      if (t) {
        let i =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            3,
          );
        if (i) {
          (i = i.ActorLocationProxy.Z - i.HalfHeight),
            (t = t.ActorLocationProxy.Z - t.HalfHeight);
          if (Math.abs(i - t) > EXECUTION_MAX_HEIGHT_DIFF || this.Qor())
            return !1;
        }
      }
    }
    return !0;
  }
  Qor() {
    let t;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let e = i.Entity.GetComponent(3);
    var i = i.Entity.GetComponent(26)?.ExecutionTrace;
    return i
      ? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          i,
          e.ActorLocationProxy,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          i,
          this.Hte.ActorLocationProxy,
        ),
        !!TraceElementCommon_1.TraceElementCommon.LineTrace(
          i,
          PROFILE_DETECT_VISIBLE_BLOCK,
        ) &&
          ((t = PawnInteractController.cz),
          e.ActorUpProxy.Multiply(
            e.HalfHeight - DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET,
            t,
          ),
          e.ActorLocationProxy.Addition(t, t),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t),
          (0, RegisterComponent_1.isComponentInstance)(this.Hte, 3)
            ? ((e = PawnInteractController.fz),
              this.Hte.ActorUpProxy.Multiply(
                this.Hte.HalfHeight - DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET,
                e,
              ),
              this.Hte.ActorLocationProxy.Addition(e, e),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e))
            : TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                i,
                this.Hte.ActorLocationProxy,
              ),
          !!TraceElementCommon_1.TraceElementCommon.LineTrace(
            i,
            PROFILE_DETECT_VISIBLE_BLOCK,
          )))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Interaction", 37, "ExecutionTrace is undefined"),
        !1);
  }
  HandlePreInterativeLogic() {
    this.PreTalkConfigs;
  }
  RecordInteraction() {
    this.Aor++;
  }
  HasDynamicOptionType(t) {
    for (const r of this.Eor)
      if (r.Context.Type === 6) {
        const i = r.Context.TreeConfigId;
        const e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          i,
        )?.GetNode(r.Context.NodeId);
        if (e && e instanceof ChildQuestNodeBase_1.ChildQuestNodeBase)
          for (const n of t) if (e.ChildQuestType === n) return !0;
      }
    return !1;
  }
  HasDynamicOptionTask() {
    for (const t of this.Eor)
      if (t.Context.Type === 6) return t.Context.NodeId === 0;
    return !1;
  }
  CheckInteractCount(t, i) {
    switch (i) {
      case 0:
        return this.Aor === t;
      case 1:
        return this.Aor !== t;
      case 2:
        return this.Aor < t;
      case 3:
        return this.Aor <= t;
      case 4:
        return this.Aor > t;
      case 5:
        return this.Aor >= t;
    }
    return !1;
  }
  GetPbDataId() {
    return this.Hte.CreatureData.GetPbDataId();
  }
  GetOptionByIndex(t) {
    if (this.Mor) {
      const i = t + 1;
      for (const e of this.Mor) if (e.InstanceId === i) return e;
    }
  }
  GetOptionByInstanceId(t) {
    if (this.Mor) for (const i of this.Mor) if (i.InstanceId === t) return i;
  }
  GetOptionByGuid(t) {
    if (t && this.Mor) for (const i of this.Mor) if (i.Guid === t) return i;
  }
  HandleInteractRequest() {
    this.vor?.Valid &&
      (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
        this.vor.Entity.Id,
      ) === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
        this.vor.Entity.GetComponent(36)?.MoveToLocationLogic?.PushMoveInfo(),
      this.vor.SetInteractionState(!1, "发送交互请求"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag()),
      this.OnInteractActionEnd && this.OnInteractActionEnd();
  }
  HandleInteractResponse(t, i) {
    this.vor?.Valid &&
      (this.vor.SetServerLockInteract(i, "Interaction Response"),
      this.vor.SetInteractionState(!0, "接收交互应答")),
      t !== Protocol_1.Aki.Protocol.lkn.Sys
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "交互失败", ["errorCode", t]),
          this.vor.SetServerLockInteract(!1, "交互失败"),
          t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrSceneEntityNotExist &&
            t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrInteractRange &&
            t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrInteractCd &&
            t !== Protocol_1.Aki.Protocol.lkn.Proto_ErrPreCondition &&
            t !==
              Protocol_1.Aki.Protocol.lkn.Proto_ErrInteractOptionGuidInvalid &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t,
              18507,
            ),
          !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
            UiManager_1.UiManager.IsViewShow("PlotView") &&
            PlotController_1.PlotController.EndInteraction(!1, !0))
        : ((i = this.Hte?.Entity?.GetComponent(125)) && i.CloseAllCollisions(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnInteractDropItemSuccess,
          ));
  }
  HandleInteractClientAction() {
    this.vor?.Valid &&
      (this.vor.SetInteractionState(!1, "执行纯客户端行为"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
  FinishInteractClientAction() {
    this.vor?.Valid &&
      (this.vor.SetInteractionState(!0, "完成纯客户端行为"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
  Kor(t) {
    if (!t) return !0;
    let i = !0;
    switch (t.Type) {
      case 2:
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
        e && (i = e.IsInteractValid);
        break;
      case 3:
        e =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            t.LevelPlayId,
          );
        e && (i = e.IsInteractValid);
        break;
      case 6:
        e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
          t.BtType,
          t.TreeConfigId,
        );
        e && (i = e.IsInteractValid);
    }
    return i;
  }
  GetInteractionDebugInfos() {
    if (this.Mor && this.Mor?.length > 0) {
      let t = "";
      for (const e of this.Mor) {
        t =
          (t =
            (t =
              (t = t + ("选项: " + (e.TidContent || "空名字")) + "\t\t") +
              ("交互选项类型: " +
                LevelGameplayActionsDefine_1.optionTypeLogString[
                  e.OptionType
                ]) +
              "\t\t") +
            ("交互类型: " + e.DoIntactType) +
            "\t\t") +
          ("Enable: " + !e.Disabled) +
          "\t\t";
        const i = this.For(e);
        if (((t += "满足开启条件: " + i), !i))
          for (const r of e.Condition.Conditions)
            t = (t += "\n") + "Condition: " + JSON.stringify(r);
        e.OptionType === 1 &&
          (t = (t += "\nContext:\n") + JSON.stringify(e.Context)),
          (t += "\n\n");
      }
      return t;
    }
    return "无";
  }
}
((exports.PawnInteractController = PawnInteractController).cz =
  Vector_1.Vector.Create()),
  (PawnInteractController.fz = Vector_1.Vector.Create());
// # sourceMappingURL=PawnInteractController.js.map
