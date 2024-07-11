"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorAssistant = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  Global_1 = require("../../../../Global"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  WorldFunctionLibrary_1 = require("../../../../World/Bridge/WorldFunctionLibrary"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
  PhantomUtil_1 = require("../../../Phantom/PhantomUtil"),
  PlotAudioModel_1 = require("../../PlotAudioModel"),
  PlotController_1 = require("../../PlotController"),
  SequenceDefine_1 = require("../SequenceDefine"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant"),
  BindingActorAnimBlendOutTime = 0.2,
  MaxPos = -999999,
  HidePos = new UE.Vector(0, 0, MaxPos);
class ActorAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.jto = void 0),
      (this.Wto = void 0),
      (this.Kto = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.Qto = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.Xto = void 0),
      (this.$to = void 0),
      (this.PreLoadMouthAssetName = new Array()),
      (this.CurLoadMouthIndex = 0),
      (this.PreLoadMouthAssetMap = new Map()),
      (this.Yto = void 0),
      (this.hna = !1);
  }
  Load(e) {
    this.Jto(),
      this.zto((t) => {
        this.Zto(t), this.tio(e);
      });
  }
  PreAllPlay(i) {
    this.iio(() => {
      let t = this.Model.BlendInCharacter;
      if ((t = void 0 === t ? this.Model.SeqMainCharacter : t)) {
        const e = t;
        e.SkeletalMeshComponent0.SkeletalMesh ===
        Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
          ? (e.BeginSwitchPose(
              Global_1.Global.BaseCharacter,
              e,
              this.Model.SequenceData.AnimationBlendInTime,
              !0,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 39, "BeginSwitchPose 开始", [
                "Actor",
                Global_1.Global.BaseCharacter?.GetName(),
              ]),
            TimerSystem_1.TimerSystem.Next(() => {
              e.EndSwitchPose(e, !0),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 39, "EndSwitchPose 结束", [
                    "Actor",
                    e,
                  ]),
                i(!0);
            }))
          : i(!0);
      } else i(!0);
    });
  }
  PreEachPlay() {
    this.hna || (this.eio(), (this.hna = !0));
    const i = UE.NewArray(UE.Actor);
    this.Model.BindingActorMap.forEach((t, e) => {
      t.K2_SetActorLocation(HidePos, !1, void 0, !0),
        i.Empty(),
        i.Add(t),
        this.Model.CurLevelSeqActor.SetBindingByTag(e, i, !1, !0);
      e = t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      e &&
        (t = e.GetLinkedAnimGraphInstanceByTag(
          SequenceDefine_1.ABP_Base_Name,
        )) &&
        t.Montage_MuteAllMontage();
    }),
      this.Model.BindingEntityMap.forEach((t, e) => {
        i.Empty();
        t = t.Entity.GetComponent(1).Owner;
        i.Add(t), this.Model.CurLevelSeqActor.SetBindingByTag(e, i, !1, !0);
      });
  }
  EachStop() {
    this.Model.BindingActorMap.forEach((t, e) => {
      t.K2_SetActorLocation(HidePos, !1, void 0, !0);
    });
  }
  async AllStopPromise() {
    (this.Promise = new CustomPromise_1.CustomPromise()),
      ModelManager_1.ModelManager.PlotModel.InSeamlessFormation &&
        (await PlotController_1.PlotController.CheckFormation()),
      this.TeleportToFinal(),
      this.rio(),
      this.Model.BindingEntityMap.clear(),
      this.PreLoadMouthAssetMap.clear();
    let t = this.Model.BlendOutCharacter;
    var e;
    return (t = void 0 === t ? this.Model.SeqMainCharacter : t)
      ? ((e = t),
        this.lna(!1),
        e.SkeletalMeshComponent0.SkeletalMesh !==
        Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
          ? (this.nio(), !(this.Promise = void 0))
          : ((this.Model.BeginSwitchFrame = 2),
            e.BeginSwitchPose(
              e,
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
    let t = this.Model.BlendOutCharacter;
    (t = void 0 === t ? this.Model.SeqMainCharacter : t)?.EndSwitchPose(
      Global_1.Global.BaseCharacter,
      !0,
    ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "EndSwitchPose结束", [
          "Actor",
          Global_1.Global.BaseCharacter?.GetName(),
        ]),
      this.nio(),
      this.Promise && (this.Promise.SetResult(!0), (this.Promise = void 0));
  }
  TeleportToFinal() {
    var t,
      e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    e?.Valid &&
      this.Model.SequenceData.SaveFinalTransform &&
      ((t = this.Model.GetLastTransform())
        ? (e.FixBornLocation("Sequence最终位置同步", !0, t.GetLocation(), !1),
          e.SetActorRotation(
            t.GetRotation().Rotator().ToUeRotator(),
            "Sequence最终位置同步",
          ),
          e.ClearInput())
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            27,
            "SequenceData内缺失FinalPos，联系演出进行后处理",
          ));
  }
  End() {
    this.jto && this.jto.Cancel(),
      this.Kto !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Kto),
        (this.Kto = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.Qto !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Qto),
        (this.Qto = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.Wto && (this.Wto.Remove(), (this.Wto = void 0)),
      this.Promise && this.Promise.SetResult(!1),
      (this.$to = void 0),
      this.rio(),
      this.lna(!1),
      this.nio();
  }
  Jto() {
    (this.Model.BlendInCharacter = void 0),
      (this.Model.BlendOutCharacter = void 0);
    var e = this.Model.SequenceData.GeneratedData?.BindingBP;
    if (e) {
      var i = this.Model.SequenceData.GeneratedData?.BlendInTag,
        o = this.Model.SequenceData.GeneratedData?.BlendOutTag,
        s = this.Model.SequenceData.葫芦状态,
        r = e.Num();
      for (let t = 0; t < r; t++) {
        var n,
          h = e.Get(t),
          l = UE.KuroActorManager.SpawnActor(
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
              0 < s && n.ChangeHuluState(s),
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
  nio() {
    this.Model.BindingActorMap &&
      0 !== this.Model.BindingActorMap.size &&
      (this.Model.BindingActorMap.forEach((t) => {
        t.K2_SetActorLocation(HidePos, !1, void 0, !0),
          t && t.CleanHuluState(),
          UE.KuroActorManager.DestroyActor(t);
      }),
      this.Model.BindingActorMap.clear(),
      (this.Model.SeqMainCharacter = void 0),
      (this.Model.MainSeqCharacterMesh = void 0),
      (this.Model.BlendInCharacter = void 0),
      (this.Model.BlendOutCharacter = void 0));
  }
  lna(t) {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    t
      ? this.Model.HidePlayer ||
        (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          e,
          !1,
          "剧情播放Sequence隐藏主角",
          !1,
        ),
        ModelManager_1.ModelManager.SceneTeamModel?.GetTeamEntities().forEach(
          (t) => {
            t?.Valid &&
              (t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
                t.Entity,
                Protocol_1.Aki.Protocol.Summon.L3s
                  .Proto_ESummonTypeConcomitantCustom,
              ))?.Valid &&
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                t.Entity,
                !1,
                "剧情播放Sequence隐藏伴生物",
              );
          },
        ),
        (this.Model.HidePlayer = !0))
      : this.Model.HidePlayer &&
        (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          e,
          !0,
          "剧情播放Sequence隐藏主角",
          !1,
        ),
        (this.Model.HidePlayer = !1));
  }
  zto(e) {
    const i = new Map();
    var o = this.Model.SequenceData.绑定角色标签,
      s = o.Num();
    if (0 === s) e(void 0);
    else {
      var r = new Array(),
        n = new Array();
      for (let t = 0; t < s; t++) {
        var h = o.Get(t);
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
          0 !== n.length)
        ) {
          i.set(h, n);
          for (const a of n) {
            var l = a.Entity.GetComponent(0);
            r.push(l.GetCreatureDataId());
          }
        }
      }
      0 === r.length
        ? e(void 0)
        : (this.jto = WaitEntityTask_1.WaitEntityTask.Create(
            r,
            (t) => {
              t ||
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Plot",
                    27,
                    "有需要绑定的实体，但实体创建失败了",
                  )),
                (this.jto = void 0),
                e(i);
            },
            !0,
          ));
    }
  }
  Zto(e) {
    if (e) {
      var i,
        o =
          Global_1.Global.BaseCharacter?.CharacterActorComponent
            ?.ActorLocationProxy;
      if (o) {
        let t = void 0;
        for (var [s, r] of e)
          if (r && 0 !== r.length)
            for (const n of r)
              n?.IsInit &&
                n?.Valid &&
                ((i = n.Entity.GetComponent(1).ActorLocationProxy),
                (i = Vector_1.Vector.DistSquared(i, o)),
                void 0 === t || t > i) &&
                (this.Model.BindingEntityMap.set(s, n), (t = i));
        this.Model.BindingEntityMap.forEach((t, e) => {
          t = t.Entity.GetComponent(0)?.GetCreatureDataId();
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "实体被绑定入Sequence：",
              ["Tag", e.toString()],
              ["PbDataId", t],
            );
        });
      }
    }
  }
  eio() {
    for (var [t, e] of this.Model.BindingEntityMap) {
      var i = new SequenceDefine_1.SequenceEntityInfo(),
        o =
          (this.Model.ControlEntityMap.set(e.Id, i), e.Entity.GetComponent(33)),
        o =
          (o?.Valid && o.StopAllSkills("ActorAssistant.ControlBindingEntity"),
          e.Entity.GetComponent(1)),
        o =
          (o?.Valid &&
            (o.SetCollisionEnable(!1, "Plot Sequence Binding"),
            o.SetSequenceBinding(!0),
            (0, RegisterComponent_1.isComponentInstance)(o, 3)) &&
            o.Actor.CharRenderingComponent?.SetDisableFightDither(!0),
          e.Entity.GetComponent(59)),
        t =
          (o?.Valid &&
            ((i.CacheMovementSync = o.GetEnableMovementSync()),
            o.SetEnableMovementSync(!1, "ActorAssistant")),
          t.op_Equality(SequenceDefine_1.BOSS_TAG) &&
            (o = e.Entity.GetComponent(162))?.Valid &&
            (o.StopMontage(), o.StartForceDisableAnimOptimization(0, !1)),
          e.Entity.GetComponent(37)),
        o =
          (t?.Valid &&
            (t.StopMove(!0),
            (i.MoveCompDisableHandle = t.Disable("Plot Sequence Binding"))),
          e.Entity.GetComponent(100)),
        t =
          (o?.Valid &&
            (i.UeMoveCompDisableHandle = o.Disable("Plot Sequence Binding")),
          e.Entity.GetComponent(159));
      t?.Valid &&
        t.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
          InstigatorId: t.CreatureDataId,
          Reason: "ActorAssistant.ControlBindingEntity",
        }),
        e.Entity.GetComponent(39)?.DisableAi("Plot Sequence Binding");
    }
  }
  rio() {
    if (
      ((this.hna = !1),
      this.Model.BindingEntityMap && 0 !== this.Model.BindingEntityMap.size)
    ) {
      for (var [t, e] of this.Model.BindingEntityMap) {
        var i,
          o,
          s,
          r = this.Model.ControlEntityMap.get(e.Id);
        e?.Entity &&
          ((o = e.Entity.GetComponent(1))?.Valid &&
            (o.SetCollisionEnable(!0, "Plot Sequence Binding"),
            o.SetSequenceBinding(!1),
            (0, RegisterComponent_1.isComponentInstance)(o, 3)) &&
            (o.ClearInput(),
            o.Actor.CharRenderingComponent?.SetDisableFightDither(!1),
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
          t.op_Equality(SequenceDefine_1.BOSS_TAG) &&
            (i = e.Entity.GetComponent(162))?.Valid &&
            (i.CancelForceDisableAnimOptimization(0), i.ConsumeRootMotion()),
          (t = e.Entity.GetComponent(59))?.Valid &&
            r.CacheMovementSync &&
            (t.SetEnableMovementSync(!0, "ActorAssistant"),
            t.CollectSampleAndSend(!0)),
          WorldFunctionLibrary_1.default.GetEntityTypeByEntity(e.Entity.Id) ===
            Protocol_1.Aki.Protocol.wks.Proto_Npc &&
            ((t = Protocol_1.Aki.Protocol.Kus.create()),
            ((s = Protocol_1.Aki.Protocol.Wks.create()).P4n =
              MathUtils_1.MathUtils.NumberToLong(
                o.CreatureData.GetCreatureDataId(),
              )),
            (s.y5n = o.ActorLocationProxy),
            (s.a8n = o.ActorRotationProxy),
            (t.Q8n = [s]),
            Net_1.Net.Send(29559, t),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "AI",
              43,
              "向服务器同步NPC位置",
              ["实体ID", s.P4n],
              ["X", s.y5n.X],
              ["Y", s.y5n.Y],
              ["Z", s.y5n.Z],
            ),
          (o = e.Entity.GetComponent(37))?.Valid &&
            (o.StopMove(!1),
            o.Enable(
              r.MoveCompDisableHandle,
              "[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true",
            )),
          (t = e.Entity.GetComponent(100))?.Valid &&
            t.Enable(
              r.UeMoveCompDisableHandle,
              "[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true",
            ),
          (s = e.Entity.GetComponent(159))?.Valid &&
            s.RemoveBuff(
              CharacterBuffIds_1.buffId.StoryInvincibleCommon,
              -1,
              "ActorAssistant.ReleaseBindingEntity",
            ),
          e.Entity.GetComponent(39)?.EnableAi("Plot Sequence Binding"));
      }
      this.Model.BindingEntityMap.clear();
    }
  }
  tio(e) {
    if (
      ((this.Model.MainSeqCharacterMesh = void 0),
      this.Model.SequenceData.NeedSwitchMainCharacter)
    ) {
      if (!this.Model.SeqMainCharacterModelConfig) {
        var i =
          ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9);
        let t = SequenceDefine_1.FEMALE_SEQ_MODEL_ID;
        i === LoginDefine_1.ELoginSex.Boy &&
          (t = SequenceDefine_1.MALE_SEQ_MODEL_ID);
        i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
          0,
          t.toString(),
        );
        this.Model.SeqMainCharacterModelConfig = i;
      }
      i = this.Model.SeqMainCharacterModelConfig.网格体?.ToAssetPathName();
      i && i.length && "None" !== i
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-开始"),
          (this.Qto = ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.SkeletalMesh,
            (t) => {
              (this.Qto = ResourceSystem_1.ResourceSystem.InvalidId),
                t
                  ? ((this.Model.MainSeqCharacterMesh = t),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-完成"))
                  : Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角-失败"),
                e(!0);
            },
          )))
        : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "Seq主角的ModelConfig网格体为空",
            ["ID", this.Model.SeqMainCharacterModelConfig?.ID],
          ),
          e(!0));
    } else e(!0);
  }
  iio(i) {
    var t;
    this.Model.SequenceData.NeedSwitchMainCharacter
      ? (t = this.Model.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName()) &&
        t.length &&
        "None" !== t
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角BP-开始"),
          (this.Kto = ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.Class,
            (t) => {
              (this.Kto = ResourceSystem_1.ResourceSystem.InvalidId),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 18, "剧情加载等待-Seq主角BP-完成"),
                (this.Model.SeqMainCharacter = UE.KuroActorManager.SpawnActor(
                  Info_1.Info.World,
                  t,
                  Global_1.Global.BaseCharacter.CharacterActorComponent
                    .ActorTransform,
                  1,
                  void 0,
                ));
              var t = this.Model.SeqMainCharacter.GetComponentByClass(
                  UE.SkeletalMeshComponent.StaticClass(),
                ),
                e =
                  (t
                    ? (t.SetSkeletalMesh(this.Model.MainSeqCharacterMesh),
                      (0 !== this.Model.GetType() &&
                        2 !== this.Model.GetType()) ||
                        ((e = t.GetRelativeTransform()),
                        this.Model.SeqMainCharacter.K2_AddActorWorldTransform(
                          e,
                          !1,
                          void 0,
                          !1,
                        ),
                        t.K2_SetRelativeLocationAndRotation(
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
              e &&
                0 < (t = this.Model.SequenceData.葫芦状态) &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 39, "葫芦状态", ["HuluState", t]),
                e.ChangeHuluState(t)),
                this.Model.SeqMainCharacter.K2_SetActorLocation(
                  HidePos,
                  !1,
                  void 0,
                  !0,
                ),
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
    this.Model.BindingActorMap.forEach((t, e) => {
      t && t.JumpFrame();
    });
  }
  sio() {
    if (this.CurLoadMouthIndex >= this.PreLoadMouthAssetName.length)
      this.Yto.SetResult(!0);
    else {
      const e = this.PreLoadMouthAssetName[this.CurLoadMouthIndex];
      if ((this.CurLoadMouthIndex++, StringUtils_1.StringUtils.IsEmpty(e)))
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 39, "预加载口型资源跳过，textKey 为空"),
          this.sio();
      else {
        var t = PlotAudioById_1.configPlotAudioById.GetConfig(e);
        if (t) {
          const i = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName([
            t.IsCheckSex,
            t.FileName,
          ]);
          ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimSequence, (t) => {
            t
              ? (this.PreLoadMouthAssetMap.set(e, t),
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
                  ["textKey", e],
                  ["assetPath", i],
                ),
              this.sio();
          });
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 39, "预加载口型资源跳过，没有语音配置", [
              "textKey",
              e,
            ]),
            this.sio();
      }
    }
  }
  async BeginLoadMouthAssetPromise() {
    return (
      (this.Yto = new CustomPromise_1.CustomPromise()),
      (this.CurLoadMouthIndex = 0),
      this.PreLoadMouthAssetMap.clear(),
      void 0 === this.PreLoadMouthAssetName ||
        0 === this.PreLoadMouthAssetName.length ||
        (this.sio(), this.Yto.Promise)
    );
  }
  TryApplyMouthAnim(t, e) {
    this.StopMouthAnim(),
      (this.Xto = void 0),
      (this.$to = void 0),
      1 === this.Model.GetType() &&
        ((this.Xto = this.PreLoadMouthAssetMap.get(t)),
        this.Xto
          ? (this.FindApplyMouthAnim(e),
            this.$to
              ? (this.$to.PlaySlotAnimationAsDynamicMontage(
                  this.Xto,
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
                    ["Key", t],
                    ["Asset", this.Xto.GetName()],
                    ["ABP", this.$to.GetName()],
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 39, "MouthAnim 没有找到口型ABP", [
                  "whoID",
                  e,
                ]))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 39, "MouthAnim 没有口型资源", [
              "TextKey",
              t,
            ]));
  }
  FindApplyMouthAnim(e) {
    let i = !1;
    if (
      (this.Model.BindingActorMap.forEach((t) => {
        !t?.IsValid() ||
          (t.TalkID !== e && t.TalkID_SP !== e) ||
          ((this.$to =
            t.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(
              SequenceDefine_1.ABP_Base_Name,
            )),
          (i = !0));
      }),
      !i && void 0 !== this.Model.TalkNpcList)
    ) {
      var o = this.Model.TalkNpcList.Num();
      for (let t = 0; t < o; t++) {
        var s = this.Model.TalkNpcList.Get(t),
          r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === e || r.TalkID_SP === e) &&
          ((this.$to = r.Skel_Main?.GetAnimInstance()), this.$to)
        )
          return;
        r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === e || r.TalkID_SP === e) &&
          ((this.$to = r.SkeletalMesh?.GetAnimInstance()), this.$to)
        )
          return;
      }
    }
  }
  StopMouthAnim() {
    this.$to &&
      (this.$to.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name),
      (this.$to = void 0));
  }
  CheckHideBattleCharacter() {
    (this.Model.SequenceData.HidePlayer ||
      this.Model.SequenceData.NeedSwitchMainCharacter) &&
      this.lna(!0);
  }
}
exports.ActorAssistant = ActorAssistant;
//# sourceMappingURL=ActorAssistant.js.map
