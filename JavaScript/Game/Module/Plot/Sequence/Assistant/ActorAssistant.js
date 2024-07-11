"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorAssistant = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const WorldFunctionLibrary_1 = require("../../../../World/Bridge/WorldFunctionLibrary");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const LoginDefine_1 = require("../../../Login/Data/LoginDefine");
const PhantomUtil_1 = require("../../../Phantom/PhantomUtil");
const PlotAudioModel_1 = require("../../PlotAudioModel");
const PlotController_1 = require("../../PlotController");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
const BindingActorAnimBlendOutTime = 0.2;
const MaxPos = -999999;
const HidePos = new UE.Vector(0, 0, MaxPos);
class ActorAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.Xeo = void 0),
      (this.$eo = void 0),
      (this.Yeo = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.Jeo = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.zeo = void 0),
      (this.Zeo = void 0),
      (this.PreLoadMouthAssetName = new Array()),
      (this.CurLoadMouthIndex = 0),
      (this.PreLoadMouthAssetMap = new Map()),
      (this.eto = void 0);
  }
  Load(t) {
    this.tto(),
      this.ito((e) => {
        this.oto(e), this.rto(), this.nto(t);
      });
  }
  PreAllPlay(i) {
    this.sto(() => {
      (this.Model.SequenceData.HidePlayer ||
        this.Model.SequenceData.NeedSwitchMainCharacter) &&
        this.ato(!0);
      let e = this.Model.BlendInCharacter;
      if ((e = void 0 === e ? this.Model.SeqMainCharacter : e)) {
        const t = e;
        t.SkeletalMeshComponent0.SkeletalMesh ===
        Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
          ? (t.BeginSwitchPose(
              Global_1.Global.BaseCharacter,
              t,
              this.Model.SequenceData.AnimationBlendInTime,
              !0,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 39, "BeginSwitchPose 开始", [
                "Actor",
                Global_1.Global.BaseCharacter?.GetName(),
              ]),
            TimerSystem_1.TimerSystem.Next(() => {
              t.EndSwitchPose(t, !0),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 39, "EndSwitchPose 结束", [
                    "Actor",
                    t,
                  ]),
                i(!0);
            }))
          : i(!0);
      } else i(!0);
    });
  }
  PreEachPlay() {
    const i = UE.NewArray(UE.Actor);
    this.Model.BindingActorMap.forEach((e, t) => {
      e.K2_SetActorLocation(HidePos, !1, void 0, !0),
        i.Empty(),
        i.Add(e),
        this.Model.CurLevelSeqActor.SetBindingByTag(t, i, !1, !0);
      t = e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      t &&
        (e = t.GetLinkedAnimGraphInstanceByTag(
          SequenceDefine_1.ABP_Base_Name,
        )) &&
        e.Montage_MuteAllMontage();
    }),
      this.Model.BindingEntityMap.forEach((e, t) => {
        i.Empty();
        e = e.Entity.GetComponent(1).Owner;
        i.Add(e), this.Model.CurLevelSeqActor.SetBindingByTag(t, i, !1, !0);
      });
  }
  EachStop() {
    this.Model.BindingActorMap.forEach((e, t) => {
      e.K2_SetActorLocation(HidePos, !1, void 0, !0);
    });
  }
  async AllStopPromise() {
    (this.Promise = new CustomPromise_1.CustomPromise()),
      ModelManager_1.ModelManager.PlotModel.InSeamlessFormation &&
        (await PlotController_1.PlotController.CheckFormation()),
      this.TeleportToFinal(),
      this.hto(),
      this.Model.BindingEntityMap.clear();
    let e = this.Model.BlendOutCharacter;
    let t;
    return (e = void 0 === e ? this.Model.SeqMainCharacter : e)
      ? ((t = e),
        this.ato(!1),
        t.SkeletalMeshComponent0.SkeletalMesh !==
        Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
          ? (this.lto(), !(this.Promise = void 0))
          : ((this.Model.BeginSwitchFrame = 2),
            t.BeginSwitchPose(
              t,
              Global_1.Global.BaseCharacter,
              this.Model.SequenceData.AnimationBlendInTime,
              !0,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 39, "BeginSwitchPose 开始", [
                "Actor",
                Global_1.Global.BaseCharacter?.GetName(),
              ]),
            await this.Promise.Promise))
      : !(this.Promise = void 0);
  }
  EndSwitchPose() {
    let e = this.Model.BlendOutCharacter;
    (e = void 0 === e ? this.Model.SeqMainCharacter : e)?.EndSwitchPose(
      Global_1.Global.BaseCharacter,
      !0,
    ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "EndSwitchPose结束", [
          "Actor",
          Global_1.Global.BaseCharacter?.GetName(),
        ]),
      this.lto(),
      this.Promise && (this.Promise.SetResult(!0), (this.Promise = void 0));
  }
  TeleportToFinal() {
    let e;
    const t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    t?.Valid &&
      this.Model.SequenceData.SaveFinalTransform &&
      ((e = this.Model.GetLastTransform())
        ? (t.FixBornLocation("Sequence最终位置同步", !0, e.GetLocation(), !1),
          t.SetActorRotation(
            e.GetRotation().Rotator().ToUeRotator(),
            "Sequence最终位置同步",
          ),
          t.ClearInput())
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            27,
            "SequenceData内缺失FinalPos，联系演出进行后处理",
          ));
  }
  End() {
    this.Xeo && this.Xeo.Cancel(),
      this.Yeo !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Yeo),
        (this.Yeo = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.Jeo !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Jeo),
        (this.Jeo = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.$eo && (this.$eo.Remove(), (this.$eo = void 0)),
      this.Promise && this.Promise.SetResult(!1),
      (this.Zeo = void 0),
      this.hto(),
      this.ato(!1),
      this.lto();
  }
  tto() {
    (this.Model.BlendInCharacter = void 0),
      (this.Model.BlendOutCharacter = void 0);
    const t = this.Model.SequenceData.GeneratedData?.BindingBP;
    if (t) {
      const i = this.Model.SequenceData.GeneratedData?.BlendInTag;
      const o = this.Model.SequenceData.GeneratedData?.BlendOutTag;
      const s = this.Model.SequenceData.葫芦状态;
      const r = t.Num();
      for (let e = 0; e < r; e++) {
        var n;
        const h = t.Get(e);
        const l = UE.KuroActorManager.SpawnActor(
          Info_1.Info.World,
          h,
          MathUtils_1.MathUtils.DefaultTransform,
          1,
          void 0,
        );
        ObjectUtils_1.ObjectUtils.IsValid(l)
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 27, "生成Seq绑定蓝图的Actor", [
                "Class",
                l.GetName(),
              ]),
            (n = l) &&
              (this.Model.BindingActorMap.set(n.BindingTag, l),
              l.K2_SetActorLocation(HidePos, !1, void 0, !0),
              s > 0 && n.ChangeHuluState(s),
              i &&
                i.op_Equality(n.BindingTag) &&
                !FNameUtil_1.FNameUtil.IsNothing(i) &&
                (this.Model.BlendInCharacter = n),
              o) &&
              o.op_Equality(n.BindingTag) &&
              !FNameUtil_1.FNameUtil.IsNothing(o) &&
              (this.Model.BlendOutCharacter = n))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "Seq绑定蓝图生成Actor失败", [
              "Class",
              h.GetName(),
            ]);
      }
    }
  }
  lto() {
    this.Model.BindingActorMap &&
      this.Model.BindingActorMap.size !== 0 &&
      (this.Model.BindingActorMap.forEach((e) => {
        e.K2_SetActorLocation(HidePos, !1, void 0, !0),
          e && e.CleanHuluState(),
          UE.KuroActorManager.DestroyActor(e);
      }),
      this.Model.BindingActorMap.clear(),
      (this.Model.SeqMainCharacter = void 0),
      (this.Model.MainSeqCharacterMesh = void 0),
      (this.Model.BlendInCharacter = void 0),
      (this.Model.BlendOutCharacter = void 0));
  }
  ato(e) {
    const t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    e
      ? this.Model.HidePlayer ||
        (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          t,
          !1,
          "剧情播放Sequence隐藏主角",
          !1,
        ),
        ModelManager_1.ModelManager.SceneTeamModel?.GetTeamEntities().forEach(
          (e) => {
            e?.Valid &&
              (e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
                e.Entity,
                Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
              ))?.Valid &&
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                e.Entity,
                !1,
                "剧情播放Sequence隐藏伴生物",
              );
          },
        ),
        (this.Model.HidePlayer = !0))
      : this.Model.HidePlayer &&
        (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          t,
          !0,
          "剧情播放Sequence隐藏主角",
          !1,
        ),
        (this.Model.HidePlayer = !1));
  }
  ito(t) {
    const i = new Map();
    const o = this.Model.SequenceData.绑定角色标签;
    const s = o.Num();
    if (s === 0) t(void 0);
    else {
      const r = new Array();
      const n = new Array();
      for (let e = 0; e < s; e++) {
        const h = o.Get(e);
        if (
          !SequenceDefine_1.HERO_TAG.op_Equality(h) &&
          ((n.length = 0),
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(
            h.toString(),
            n,
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "Sequence绑定找到实体",
              ["Tag", h.toString()],
              ["num", n.length],
            ),
          n.length !== 0)
        ) {
          i.set(h, n);
          for (const a of n) {
            const l = a.Entity.GetComponent(0);
            r.push(l.GetCreatureDataId());
          }
        }
      }
      r.length === 0
        ? t(void 0)
        : (this.Xeo = WaitEntityTask_1.WaitEntityTask.Create(
            r,
            (e) => {
              e ||
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Plot",
                    27,
                    "有需要绑定的实体，但实体创建失败了",
                  )),
                (this.Xeo = void 0),
                t(i);
            },
            !0,
          ));
    }
  }
  oto(t) {
    if (t) {
      let i;
      const o =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy;
      if (o) {
        let e = void 0;
        for (const [s, r] of t)
          if (r && r.length !== 0)
            for (const n of r)
              n?.IsInit &&
                n?.Valid &&
                ((i = n.Entity.GetComponent(1).ActorLocationProxy),
                (i = Vector_1.Vector.DistSquared(i, o)),
                void 0 === e || e > i) &&
                (this.Model.BindingEntityMap.set(s, n), (e = i));
        this.Model.BindingEntityMap.forEach((e, t) => {
          e = e.Entity.GetComponent(0)?.GetCreatureDataId();
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "实体被绑定入Sequence：",
              ["Tag", t.toString()],
              ["PbDataId", e],
            );
        });
      }
    }
  }
  rto() {
    for (var [e, t] of this.Model.BindingEntityMap) {
      const i = new SequenceDefine_1.SequenceEntityInfo();
      var o =
        (this.Model.ControlEntityMap.set(t.Id, i), t.Entity.GetComponent(33));
      var o =
        (o?.Valid && o.StopAllSkills("ActorAssistant.ControlBindingEntity"),
        t.Entity.GetComponent(1));
      var o =
        (o?.Valid &&
          (o.SetCollisionEnable(!1, "Plot Sequence Binding"),
          o.SetSequenceBinding(!0),
          (0, RegisterComponent_1.isComponentInstance)(o, 3)) &&
          o.Actor.CharRenderingComponent?.ResetAllRenderingState(),
        t.Entity.GetComponent(57));
      var e =
        (o?.Valid &&
          ((i.CacheMovementSync = o.GetEnableMovementSync()),
          o.SetEnableMovementSync(!1)),
        e.op_Equality(SequenceDefine_1.BOSS_TAG) &&
          (o = t.Entity.GetComponent(160))?.Valid &&
          (o.StopMontage(), o.StartForceDisableAnimOptimization(3, !1)),
        t.Entity.GetComponent(36));
      var o =
        (e?.Valid &&
          (e.StopMove(!0),
          (i.MoveCompDisableHandle = e.Disable("Plot Sequence Binding")),
          (i.CacheMovementMode = e.CharacterMovement.MovementMode.valueOf()),
          e.CharacterMovement.SetMovementMode(0)),
        t.Entity.GetComponent(98));
      var e =
        (o?.Valid &&
          (i.UeMoveCompDisableHandle = o.Disable("Plot Sequence Binding")),
        t.Entity.GetComponent(157));
      e?.Valid &&
        e.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
          InstigatorId: e.CreatureDataId,
          Reason: "ActorAssistant.ControlBindingEntity",
        }),
        t.Entity.GetComponent(38)?.DisableAi("Plot Sequence Binding");
    }
  }
  hto() {
    if (this.Model.BindingEntityMap && this.Model.BindingEntityMap.size !== 0) {
      for (let [e, t] of this.Model.BindingEntityMap) {
        var i;
        var o;
        var s;
        const r = this.Model.ControlEntityMap.get(t.Id);
        t?.Entity &&
          ((o = t.Entity.GetComponent(1))?.Valid &&
            (o.SetCollisionEnable(!0, "Plot Sequence Binding"),
            o.SetSequenceBinding(!1),
            (0, RegisterComponent_1.isComponentInstance)(o, 3)) &&
            (o.ClearInput(),
            o.Actor.CharRenderingComponent?.ResetAllRenderingState(),
            o.Actor.Mesh.SetBoundsScale(1),
            (i = o.Actor.GetComponentByClass(
              UE.SkeletalMeshComponent.StaticClass(),
            ))) &&
            (i = i.GetLinkedAnimGraphInstanceByTag(
              SequenceDefine_1.ABP_Base_Name,
            )) &&
            i.StopSlotAnimation(
              BindingActorAnimBlendOutTime,
              SequenceDefine_1.ABP_Seq_Slot_Name,
            ),
          e.op_Equality(SequenceDefine_1.BOSS_TAG) &&
            (i = t.Entity.GetComponent(160))?.Valid &&
            (i.CancelForceDisableAnimOptimization(3), i.ConsumeRootMotion()),
          (e = t.Entity.GetComponent(57))?.Valid &&
            r.CacheMovementSync &&
            (e.SetEnableMovementSync(!0), e.CollectSampleAndSend(!0)),
          WorldFunctionLibrary_1.default.GetEntityTypeByEntity(t.Entity.Id) ===
            Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
            ((e = Protocol_1.Aki.Protocol.Zhs.create()),
            ((s = Protocol_1.Aki.Protocol.o2s.create()).rkn =
              MathUtils_1.MathUtils.NumberToLong(
                o.CreatureData.GetCreatureDataId(),
              )),
            (s.$kn = o.ActorLocationProxy),
            (s.D3n = o.ActorRotationProxy),
            (e.m4n = [s]),
            Net_1.Net.Send(24100, e),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "AI",
              43,
              "向服务器同步NPC位置",
              ["实体ID", s.rkn],
              ["X", s.$kn.X],
              ["Y", s.$kn.Y],
              ["Z", s.$kn.Z],
            ),
          (o = t.Entity.GetComponent(36))?.Valid &&
            (o.StopMove(!1),
            o.Enable(
              r.MoveCompDisableHandle,
              "[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true",
            ),
            o.CharacterMovement.SetMovementMode(r.CacheMovementMode)),
          (e = t.Entity.GetComponent(98))?.Valid &&
            e.Enable(
              r.UeMoveCompDisableHandle,
              "[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true",
            ),
          (s = t.Entity.GetComponent(157))?.Valid &&
            s.RemoveBuff(
              CharacterBuffIds_1.buffId.StoryInvincibleCommon,
              -1,
              "ActorAssistant.ReleaseBindingEntity",
            ),
          t.Entity.GetComponent(38)?.EnableAi("Plot Sequence Binding"));
      }
      this.Model.BindingEntityMap.clear();
    }
  }
  nto(t) {
    if (
      ((this.Model.MainSeqCharacterMesh = void 0),
      this.Model.SequenceData.NeedSwitchMainCharacter)
    ) {
      if (!this.Model.SeqMainCharacterModelConfig) {
        var i =
          ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
        let e = SequenceDefine_1.FEMALE_SEQ_MODEL_ID;
        i === LoginDefine_1.ELoginSex.Boy &&
          (e = SequenceDefine_1.MALE_SEQ_MODEL_ID);
        i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
          0,
          e.toString(),
        );
        this.Model.SeqMainCharacterModelConfig = i;
      }
      i = this.Model.SeqMainCharacterModelConfig.网格体?.ToAssetPathName();
      i && i.length && i !== "None"
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-开始"),
          (this.Jeo = ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.SkeletalMesh,
            (e) => {
              (this.Jeo = ResourceSystem_1.ResourceSystem.InvalidId),
                e
                  ? ((this.Model.MainSeqCharacterMesh = e),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-完成"))
                  : Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-失败"),
                t(!0);
            },
          )))
        : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "Seq主角的ModelConfig网格体为空",
            ["ID", this.Model.SeqMainCharacterModelConfig?.ID],
          ),
          t(!0));
    } else t(!0);
  }
  sto(i) {
    let e;
    this.Model.SequenceData.NeedSwitchMainCharacter
      ? (e = this.Model.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName()) &&
        e.length &&
        e !== "None"
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角BP-开始"),
          (this.Yeo = ResourceSystem_1.ResourceSystem.LoadAsync(
            e,
            UE.Class,
            (e) => {
              (this.Yeo = ResourceSystem_1.ResourceSystem.InvalidId),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角BP-完成"),
                (this.Model.SeqMainCharacter = UE.KuroActorManager.SpawnActor(
                  Info_1.Info.World,
                  e,
                  Global_1.Global.BaseCharacter.CharacterActorComponent
                    .ActorTransform,
                  1,
                  void 0,
                ));
              var e = this.Model.SeqMainCharacter.GetComponentByClass(
                UE.SkeletalMeshComponent.StaticClass(),
              );
              var t =
                (e
                  ? (e.SetSkeletalMesh(this.Model.MainSeqCharacterMesh),
                    (this.Model.Type !== 0 && this.Model.Type !== 2) ||
                      ((t = e.GetRelativeTransform()),
                      this.Model.SeqMainCharacter.K2_AddActorWorldTransform(
                        t,
                        !1,
                        void 0,
                        !1,
                      ),
                      e.K2_SetRelativeLocationAndRotation(
                        Vector_1.Vector.ZeroVector,
                        Rotator_1.Rotator.ZeroRotator,
                        !1,
                        void 0,
                        !1,
                      )))
                  : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                      "网格体类型错误",
                    ),
                this.Model.SeqMainCharacter);
              t &&
                (e = this.Model.SequenceData.葫芦状态) > 0 &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 39, "葫芦状态", ["HuluState", e]),
                t.ChangeHuluState(e)),
                this.Model.BindingActorMap.set(
                  SequenceDefine_1.HERO_TAG,
                  this.Model.SeqMainCharacter,
                ),
                i();
            },
          )))
        : ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "Seq主角的ModelConfig蓝图为空",
            ["ID", this.Model.SeqMainCharacterModelConfig?.ID],
          )
      : i();
  }
  TriggerCutChange() {
    this.Model.BindingActorMap.forEach((e, t) => {
      e && e.JumpFrame();
    });
  }
  _to() {
    if (this.CurLoadMouthIndex >= this.PreLoadMouthAssetName.length)
      this.eto.SetResult(!0);
    else {
      const t = this.PreLoadMouthAssetName[this.CurLoadMouthIndex];
      if ((this.CurLoadMouthIndex++, StringUtils_1.StringUtils.IsEmpty(t)))
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 39, "预加载口型资源跳过，textKey 为空"),
          this._to();
      else {
        const e = PlotAudioById_1.configPlotAudioById.GetConfig(t);
        if (e) {
          const i = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName([
            e.IsCheckSex,
            e.FileName,
          ]);
          ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimSequence, (e) => {
            e
              ? (this.PreLoadMouthAssetMap.set(t, e),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 39, "预加载口型资源", [
                    "assetPath",
                    i,
                  ]))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Plot",
                  39,
                  "预加载口型资源错误：有语音没口型",
                  ["textKey", t],
                  ["assetPath", i],
                ),
              this._to();
          });
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 39, "预加载口型资源跳过，没有语音配置", [
              "textKey",
              t,
            ]),
            this._to();
      }
    }
  }
  async BeginLoadMouthAssetPromise() {
    return (
      (this.eto = new CustomPromise_1.CustomPromise()),
      (this.CurLoadMouthIndex = 0),
      this.PreLoadMouthAssetMap.clear(),
      void 0 === this.PreLoadMouthAssetName ||
        this.PreLoadMouthAssetName.length === 0 ||
        (this._to(), this.eto.Promise)
    );
  }
  TryApplyMouthAnim(e, t) {
    this.StopMouthAnim(),
      (this.zeo = void 0),
      (this.Zeo = void 0),
      this.Model.Type === 1 &&
        ((this.zeo = this.PreLoadMouthAssetMap.get(e)),
        this.zeo
          ? (this.FindApplyMouthAnim(t),
            this.Zeo
              ? (this.Zeo.PlaySlotAnimationAsDynamicMontage(
                  this.zeo,
                  SequenceDefine_1.ABP_Mouth_Slot_Name,
                  0,
                  0,
                  1,
                  1,
                  -1,
                  0,
                  !0,
                ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    39,
                    "MouthAnim 播放口型",
                    ["Key", e],
                    ["Asset", this.zeo.GetName()],
                    ["ABP", this.Zeo.GetName()],
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 39, "MouthAnim 没有找到口型ABP", [
                  "whoID",
                  t,
                ]))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 39, "MouthAnim 没有口型资源", [
              "TextKey",
              e,
            ]));
  }
  FindApplyMouthAnim(t) {
    let i = !1;
    if (
      (this.Model.BindingActorMap.forEach((e) => {
        !e?.IsValid() ||
          (e.TalkID !== t && e.TalkID_SP !== t) ||
          ((this.Zeo =
            e.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(
              SequenceDefine_1.ABP_Base_Name,
            )),
          (i = !0));
      }),
      !i && void 0 !== this.Model.TalkNpcList)
    ) {
      const o = this.Model.TalkNpcList.Num();
      for (let e = 0; e < o; e++) {
        const s = this.Model.TalkNpcList.Get(e);
        let r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === t || r.TalkID_SP === t) &&
          ((this.Zeo = r.Skel_Main?.GetAnimInstance()), this.Zeo)
        )
          return;
        r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === t || r.TalkID_SP === t) &&
          ((this.Zeo = r.SkeletalMesh?.GetAnimInstance()), this.Zeo)
        )
          return;
      }
    }
  }
  StopMouthAnim() {
    this.Zeo &&
      (this.Zeo.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name),
      (this.Zeo = void 0));
  }
}
exports.ActorAssistant = ActorAssistant;
// # sourceMappingURL=ActorAssistant.js.map
