"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnInteractController = exports.InteractEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  Global_1 = require("../../../Global"),
  LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ChildQuestNodeBase_1 = require("../../../Module/GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase"),
  GeneralLogicTreeUtil_1 = require("../../../Module/GeneralLogicTree/GeneralLogicTreeUtil"),
  TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils"),
  PlotController_1 = require("../../../Module/Plot/PlotController"),
  SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
  DEFAULT_INTERACT_RANGE = 300,
  PROFILE_DETECT_VISIBLE_BLOCK = "PawnInteractController_DetectVisibleBlock",
  DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET = 10,
  EXECUTION_MAX_HEIGHT_DIFF = 50;
class InteractEntity {
  constructor(t) {
    (this.IsAdvice = !1),
      (this.Jh = void 0),
      (this.Hte = void 0),
      (this.EntityId = void 0),
      (this.InteractRange = -0),
      (this.cui = 0),
      (this.Crr = -100),
      (this.grr = -9999),
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
    var t, i;
    return this.Jh
      ? (this.IsAdvice &&
          ((i = this.Hte.ActorLocationProxy),
          (t =
            Global_1.Global.BaseCharacter.CharacterActorComponent
              .ActorLocationProxy),
          (i = Vector_1.Vector.Distance(i, t)),
          (this.cui =
            MathCommon_1.MathCommon.Clamp(i / this.InteractRange, 0, 1) *
            this.Crr)),
        this.cui)
      : this.grr;
  }
  GetEntity() {
    return this.Jh;
  }
}
exports.InteractEntity = InteractEntity;
class PawnInteractController {
  constructor(t) {
    (this.Hte = void 0),
      (this.frr = void 0),
      (this.prr = void 0),
      (this.vrr = void 0),
      (this.Mrr = void 0),
      (this.Err = void 0),
      (this.Srr = void 0),
      (this.yrr = ""),
      (this.Irr = DEFAULT_INTERACT_RANGE),
      (this.Trr = -1),
      (this.SectorRange = void 0),
      (this.LocationOffset = void 0),
      (this.Lrr = -0),
      (this.Drr = "Option"),
      (this.IsTurnAround = !1),
      (this.IsTurnRecoveryImmediately = !1),
      (this.IsWaitTurnComplete = !1),
      (this.InteractIcon = "Dialog"),
      (this.PreTalkConfigs = void 0),
      (this.PlayerInteractiveRange = void 0),
      (this.IsPlayerTurnAround = !1),
      (this.NUe = 0),
      (this.Rrr = 0),
      (this.Urr = 0),
      (this.InteractEntity = void 0),
      (this.Arr = void 0),
      (this.Prr = Vector_1.Vector.Create()),
      (this.a$t = void 0),
      (this.TempDirectOptionInstances = new Array()),
      (this.PreDirectOptionInstances = new Array()),
      (this.OnInteractionUpdate = void 0),
      (this.OnInteractActionEnd = void 0),
      (this.InteractEntity = new InteractEntity(t.Entity)),
      (this.frr = t),
      (this.Hte = t.Entity.GetComponent(1)),
      this.wrr(),
      (this.InteractEntity.InteractRange = Math.max(
        this.InteractRange,
        this.InteractExitRange,
      ));
  }
  Dispose() {
    (this.Hte = void 0),
      (this.frr = void 0),
      (this.prr = void 0),
      (this.Mrr = void 0),
      (this.Err = void 0),
      (this.vrr = void 0),
      (this.Arr = void 0),
      (this.Srr = void 0),
      (this.PlayerInteractiveRange = void 0),
      (this.PreTalkConfigs = void 0),
      (this.SectorRange = void 0),
      (this.OnInteractionUpdate = void 0),
      (this.OnInteractActionEnd = void 0);
  }
  get DefaultShowOption() {
    var t = this.GetInteractiveOption();
    return this.HasDynamicOption && "Direct" === t?.DoIntactType && t.TidContent
      ? PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent)
      : StringUtils_1.StringUtils.IsEmpty(this.yrr)
        ? void 0
        : PublicUtil_1.PublicUtil.GetConfigTextByKey(this.yrr);
  }
  GetInteractType() {
    return this.Drr;
  }
  wrr() {
    var t = this.Hte.CreatureData,
      i = t.GetPbEntityInitData();
    if (i) {
      (this.prr = new Array()),
        (this.Mrr = new Array()),
        (this.Err = new Array()),
        (this.vrr = new Array());
      var e = (0, IComponent_1.getComponent)(
        i.ComponentsData,
        "InteractComponent",
      );
      if (e) {
        if (
          ((this.PreTalkConfigs = e.PreFlow),
          e.Range && (this.Irr = e.Range),
          e.ExitRange && (this.Trr = e.ExitRange),
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
          e.TidContent && (this.yrr = e.TidContent),
          (this.Drr = e.DoIntactType),
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
        (this.a$t = e.MatchRoleOption), this.Brr(e);
      } else this.Lrr = this.Irr;
      i = t.ComponentDataMap.get("vys")?.vys;
      this.brr(i, e?.RandomInteract, t.GetPbDataId()),
        this.qrr(i),
        i && this.frr.SetServerLockInteract(i.IIs, "Init Interact Controller"),
        this.Grr();
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
  qrr(t) {
    if (t?.EIs)
      for (const r of t.EIs) {
        var i = ModelManager_1.ModelManager.InteractionModel.GetDynamicConfig(
            r.W5n,
          ),
          e =
            LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(
              r.nvs,
            );
        this.AddDynamicInteractOption(i, e, r.SIs, r.dca, !1);
      }
  }
  ClearDirectOptions() {
    this.InteractEntity &&
      ((this.InteractEntity.DirectOptionInstanceIds.length = 0),
      (this.InteractEntity.DirectOptionNames.length = 0));
  }
  UpdateDirectOptions(t = !0, i = !1) {
    if (this.prr && this.Hte) {
      var e = this.Hte.Owner;
      if (
        e &&
        this.InteractEntity &&
        ((this.TempDirectOptionInstances.length = 0),
        (this.InteractEntity.DirectOptionInstanceIds.length = 0),
        (this.InteractEntity.DirectOptionNames.length = 0),
        !this.HasDynamicOption)
      ) {
        for (const r of this.prr)
          r.Disabled ||
            "Direct" !== r.DoIntactType ||
            (i && "Flow" !== r.Type.Type) ||
            (1 !== r.CustomOptionType &&
              this.Nrr(r) &&
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
  brr(t, i, e) {
    if (t && t.yIs && t.yIs.length)
      if (i)
        for (const n of t.yIs) {
          var r = i.Options[n].Option,
            r = this.Orr(r, 2);
          (r.RandomOptionIndex = n), this.prr.push(r);
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Interaction", 19, "找不到随机交互组件的配置", [
            "实体配置Id",
            e,
          ]);
  }
  Brr(e) {
    if (
      (e.InteractIcon
        ? (this.InteractIcon = e.InteractIcon)
        : e.InteractDefaultIcon
          ? (this.InteractIcon = e.InteractDefaultIcon)
          : (this.InteractIcon = "Dialog"),
      0 < e.Options?.length)
    )
      for (let t = 0, i = e.Options.length; t < i; t++) {
        var r = this.Orr(e.Options[t], 0);
        this.prr.push(r);
      }
  }
  Grr() {
    this.krr(),
      this.Frr(),
      (this.vrr.length = 0),
      this.OnInteractionUpdate && this.OnInteractionUpdate(),
      this.frr && this.frr.UpdateInteractRange();
  }
  IsInSectorRange() {
    if (!this.SectorRange) return !0;
    var e = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.Begin),
      r = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.End),
      n = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (n) {
      let t = void 0;
      var s = this.Hte.CreatureData.GetEntityType(),
        s =
          ((t =
            s === Protocol_1.Aki.Protocol.wks.Proto_SceneItem
              ? this.Hte.ActorRightProxy
              : this.Hte.ActorForwardProxy),
          PawnInteractController.cz),
        o = PawnInteractController.fz,
        n =
          (n.ActorLocationProxy.Subtraction(this.GetInteractPoint(), s),
          (s.Z = 0),
          s.Normalize(),
          s.DotProduct(t));
      let i = Math.acos(n) * MathUtils_1.MathUtils.RadToDeg;
      if (
        (s.CrossProduct(t, o),
        0 < o.Z && (i *= -1),
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
    var i = PawnInteractController.cz,
      e = PawnInteractController.fz,
      t =
        (i.FromUeVector(this.Hte.ActorLocationProxy),
        i.SubtractionEqual(t.ActorLocationProxy),
        (i.Z = 0),
        i.Normalize(),
        t.ActorForwardProxy),
      r = i.DotProduct(t);
    let n = Math.acos(r) * MathUtils_1.MathUtils.RadToDeg;
    return (
      i.CrossProduct(t, e),
      0 < e.Z && (n *= -1),
      n > this.PlayerInteractiveRange.Begin &&
        n < this.PlayerInteractiveRange.End
    );
  }
  IsMatchRoleOption() {
    return !this.a$t || this.a$t?.length <= 0
      ? !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
      : SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.a$t);
  }
  GetInteractPoint() {
    this.Prr.DeepCopy(this.Hte.ActorLocationProxy);
    var t = PawnInteractController.cz,
      i = this.LocationOffset;
    return (
      !i ||
        (0 === i.X && 0 === i.Y && 0 === i.Z) ||
        (0 !== i.X &&
          (this.Hte.ActorForwardProxy.Multiply(i.X, t),
          this.Prr.AdditionEqual(t)),
        0 !== i.Y &&
          (this.Hte.ActorRightProxy.Multiply(i.Y, t),
          this.Prr.AdditionEqual(t)),
        0 !== i.Z &&
          (this.Hte.ActorUpProxy.Multiply(i.Z, t), this.Prr.AdditionEqual(t))),
      this.Prr
    );
  }
  krr() {
    if (((this.Lrr = this.Irr), this.prr))
      for (const t of this.prr) t.Range > this.Lrr && (this.Lrr = t.Range);
  }
  Frr() {
    this.prr &&
      0 !== this.prr.length &&
      ((this.Srr = this.prr[0]), (this.Arr = void 0));
  }
  GetInteractiveOption(i = !1) {
    if (this.Urr === Time_1.Time.Frame && this.Arr) return this.Arr;
    if (this.Hte && this.Hte.Owner) {
      var e = this.prr;
      if (e) {
        this.Arr = void 0;
        for (let t = e.length - 1; -1 < t; t--) {
          var r = e[t];
          if (!r.Disabled)
            if (!i || "Flow" === r.Type.Type)
              if (this.Nrr(r)) {
                this.Arr = r;
                break;
              }
        }
        return (this.Urr = Time_1.Time.Frame), this.Arr;
      }
    }
  }
  Orr(t, i, e, r = 0, n = 0, s = !1) {
    var o = t.Range || this.Irr;
    let h = this.Drr;
    t.DoIntactType && (h = t.DoIntactType);
    var a = new LevelGameplayActionsDefine_1.CommonInteractOption();
    return a.Init(++this.NUe, t, e, o, h, i, r, n, s), a;
  }
  AddDynamicInteractOption(t, i, e, r = !1, n = !0) {
    if (!this.prr) return -1;
    let s = 0,
      o = 0;
    i &&
      (i instanceof LevelGeneralContextDefine_1.QuestContext
        ? ((o = 1), (s = i.QuestId))
        : i instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
          i.BtType === Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest &&
          ((o = 1), (s = i.TreeConfigId)));
    t = this.Orr(t, 1, i, 0, o, r);
    return (
      (t.OptionContentId = s),
      void 0 !== e && (t.TidContent = e),
      this.prr.push(t),
      this.Mrr.push(t),
      1 === o && (this.Err.push(t), this.Vrr()),
      i &&
        ((r = this.Hrr(t.Context)),
        this.ChangeOptionDisabled(t.InstanceId, !r)),
      n && this.Grr(),
      t.InstanceId
    );
  }
  Vrr() {
    this.Err.sort((t, i) => {
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
    if (!this.prr) return !1;
    let e = !1;
    for (let t = this.Mrr.length - 1; -1 < t; t--) {
      var r = this.Mrr[t];
      if (r.Guid === i) {
        (e = 1 === r.ContentType), this.Mrr.splice(t, 1);
        break;
      }
    }
    if (e)
      for (let t = this.Err.length - 1; -1 < t; t--)
        if (this.Err[t].Guid === i) {
          this.Err.splice(t, 1);
          break;
        }
    let n = !1;
    for (let t = this.prr.length - 1; -1 < t; t--)
      if (this.prr[t].Guid === i) {
        (n = !0), this.prr.splice(t, 1)[0].Dispose();
        break;
      }
    return n && this.Grr(), n;
  }
  AddClientInteractOption(t, i, e = "Option", r, n, s = 0, o) {
    var h = new LevelGameplayActionsDefine_1.CommonActionInfo(),
      t = ((h.Params = t), new Array()),
      h = (t.push(h), new LevelGameplayActionsDefine_1.CommonInteractActions()),
      t =
        ((h.Actions = t),
        new LevelGameplayActionsDefine_1.CommonInteractOption());
    return (
      (t.Type = h),
      (t.Condition = i),
      (t.DoIntactType = e),
      r && (t.Range = r),
      n && (t.TidContent = n),
      o && (this.LocationOffset = o),
      this.prr
        ? ((h = this.Orr(t, 3, void 0, s)),
          this.prr.push(h),
          this.Grr(),
          h.InstanceId)
        : -1
    );
  }
  RemoveClientInteractOption(i) {
    if (!this.prr) return !1;
    let e = !1;
    for (let t = this.prr.length - 1; -1 < t; t--)
      if (this.prr[t].InstanceId === i) {
        (e = !0), this.prr.splice(t, 1)[0].Dispose();
        break;
      }
    return e && this.Grr(), e;
  }
  OnChangeModeFinish() {
    if (this.prr)
      for (const i of this.prr) {
        var t;
        i.Context &&
          1 === i.OptionType &&
          ((t = this.Hrr(i.Context)),
          this.ChangeOptionDisabled(i.InstanceId, !t));
      }
  }
  ChangeOptionText(i, t) {
    var e;
    this.prr && (e = this.prr.find((t) => t.Guid === i)) && (e.TidContent = t);
  }
  ChangeOptionDisabled(i, t) {
    var e;
    this.prr &&
      (e = this.prr.find((t) => t.InstanceId === i)) &&
      (e.Disabled = t);
  }
  ChangeInteractOption(t) {
    this.Srr = t;
  }
  get CurrentInteractOption() {
    return this.Srr;
  }
  get Options() {
    if (this.vrr && this.prr)
      for (let t = (this.vrr.length = 0), i = this.prr.length; t < i; t++) {
        var e = this.prr[t];
        e.Disabled || this.vrr.push(e);
      }
    return this.vrr;
  }
  get ShowOptions() {
    var e = new Array();
    for (const t of this.Err)
      StringUtils_1.StringUtils.IsEmpty(t.TidContent) ||
        t.Disabled ||
        "Option" !== t.DoIntactType ||
        (this.Nrr(t) && e.push(t));
    for (let t = 0, i = this.prr.length; t < i; t++) {
      var r = this.prr[t];
      StringUtils_1.StringUtils.IsEmpty(r.TidContent) ||
        r.Disabled ||
        "Option" !== r.DoIntactType ||
        1 === r.ContentType ||
        (this.Nrr(r) && e.push(r));
    }
    return e.push(void 0), e;
  }
  get HasDynamicOption() {
    return 0 < this.Mrr.length;
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
    return void 0 !== this.prr?.length && 0 < this.prr?.length;
  }
  get InteractRange() {
    return this.Lrr;
  }
  get InteractExitRange() {
    return -1 === this.Trr ? this.Lrr : this.Trr;
  }
  GetAutoTriggerOption() {
    if (this.prr)
      for (let t = 0, i = this.prr.length; t < i; t++) {
        var e = this.prr[t];
        if ("Auto" === e.DoIntactType) if (this.Nrr(e)) return e;
      }
  }
  InteractOption(t = 0) {
    t >= this.prr.length ||
      (!(t = this.prr[t]).Disabled &&
        this.Nrr(t) &&
        (PlotController_1.PlotController.EndInteraction("Flow" === t.Type.Type),
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(
          t,
          this,
        )));
  }
  Nrr(t) {
    if (
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
        t.Condition,
        this.Hte.Owner,
        LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id),
      )
    )
      return !1;
    if (3 === t.OptionType && 1 === t.CustomOptionType) {
      t = this.Hte;
      if (t) {
        var i =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            3,
          );
        if (i) {
          (i = i.ActorLocationProxy.Z - i.HalfHeight),
            (t = t.ActorLocationProxy.Z - t.HalfHeight);
          if (Math.abs(i - t) > EXECUTION_MAX_HEIGHT_DIFF || this.jrr())
            return !1;
        }
      }
    }
    return !0;
  }
  jrr() {
    var t,
      i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
      e = i.Entity.GetComponent(3),
      i = i.Entity.GetComponent(26)?.ExecutionTrace;
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
    this.Rrr++;
  }
  HasDynamicOptionType(t) {
    for (const r of this.Mrr)
      if (6 === r.Context.Type) {
        var i = r.Context.TreeConfigId,
          e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i)?.GetNode(
            r.Context.NodeId,
          );
        if (e && e instanceof ChildQuestNodeBase_1.ChildQuestNodeBase)
          for (const n of t) if (e.ChildQuestType === n) return !0;
      }
    return !1;
  }
  HasDynamicOptionTask() {
    for (const t of this.Mrr)
      if (6 === t.Context.Type) return 0 === t.Context.NodeId;
    return !1;
  }
  CheckInteractCount(t, i) {
    switch (i) {
      case 0:
        return this.Rrr === t;
      case 1:
        return this.Rrr !== t;
      case 2:
        return this.Rrr < t;
      case 3:
        return this.Rrr <= t;
      case 4:
        return this.Rrr > t;
      case 5:
        return this.Rrr >= t;
    }
    return !1;
  }
  GetPbDataId() {
    return this.Hte.CreatureData.GetPbDataId();
  }
  GetOptionByIndex(t) {
    if (this.prr) {
      var i = t + 1;
      for (const e of this.prr) if (e.InstanceId === i) return e;
    }
  }
  GetOptionByInstanceId(t) {
    if (this.prr) for (const i of this.prr) if (i.InstanceId === t) return i;
  }
  GetOptionByGuid(t) {
    if (t && this.prr) for (const i of this.prr) if (i.Guid === t) return i;
  }
  HandleInteractRequest() {
    this.frr?.Valid &&
      (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
        this.frr.Entity.Id,
      ) === Protocol_1.Aki.Protocol.wks.Proto_Npc &&
        this.frr.Entity.GetComponent(37)?.MoveToLocationLogic?.PushMoveInfo(),
      this.frr.SetInteractionState(!1, "发送交互请求"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag()),
      this.OnInteractActionEnd && this.OnInteractActionEnd();
  }
  HandleInteractResponse(t, i) {
    this.frr?.Valid &&
      (this.frr.SetServerLockInteract(i, "Interaction Response"),
      this.frr.SetInteractionState(!0, "接收交互应答")),
      t !== Protocol_1.Aki.Protocol.O4n.NRs
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Interaction", 37, "交互失败", ["errorCode", t]),
          this.frr.SetServerLockInteract(!1, "交互失败"),
          t !== Protocol_1.Aki.Protocol.O4n.Proto_ErrSceneEntityNotExist &&
            t !== Protocol_1.Aki.Protocol.O4n.Proto_ErrInteractRange &&
            t !== Protocol_1.Aki.Protocol.O4n.Proto_ErrInteractCd &&
            t !== Protocol_1.Aki.Protocol.O4n.Proto_ErrPreCondition &&
            t !==
              Protocol_1.Aki.Protocol.O4n.Proto_ErrInteractOptionGuidInvalid &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t,
              11211,
            ),
          !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
            UiManager_1.UiManager.IsViewShow("PlotView") &&
            PlotController_1.PlotController.EndInteraction(!1, !0))
        : ((i = this.Hte?.Entity?.GetComponent(127)) && i.CloseAllCollisions(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnInteractDropItemSuccess,
          ));
  }
  HandleInteractClientAction() {
    this.frr?.Valid &&
      (this.frr.SetInteractionState(!1, "执行纯客户端行为"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
  FinishInteractClientAction() {
    this.frr?.Valid &&
      (this.frr.SetInteractionState(!0, "完成纯客户端行为"),
      InputDistributeController_1.InputDistributeController.RefreshInputTag());
  }
  Hrr(t) {
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
    if (this.prr && 0 < this.prr?.length) {
      let t = "";
      for (const e of this.prr) {
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
        var i = this.Nrr(e);
        if (((t += "满足开启条件: " + i), !i))
          for (const r of e.Condition.Conditions)
            t = (t += "\n") + "Condition: " + JSON.stringify(r);
        1 === e.OptionType &&
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
//# sourceMappingURL=PawnInteractController.js.map
