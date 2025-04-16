"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorAssistant = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
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
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  WorldFunctionLibrary_1 = require("../../../../World/Bridge/WorldFunctionLibrary"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
  PlotAudioModel_1 = require("../../PlotAudioModel"),
  PlotController_1 = require("../../PlotController"),
  SequenceDefine_1 = require("../SequenceDefine"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant"),
  BindingActorAnimBlendOutTime = 0.2,
  MaxPos = -999999,
  HidePos = new UE.VectorDouble(0, 0, MaxPos);
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
      (this.Haa = !1),
      (this.gL1 = new Map([
        ["剧情_2_0_黎那汐塔主线_序幕,1,1", ["Shouanren"]],
        ["剧情_2_2_阿维纽林主线,3,11", ["Kanteleila"]],
        ["剧情_2_2_阿维纽林主线,7,16", ["Katixiya"]],
      ]));
  }
  Load(t) {
    this.Jto(),
      this.zto((e) => {
        this.Zto(e), this.tio(t);
      });
  }
  PreAllPlay(i) {
    this.Model.SequenceData.SaveFinalTransform &&
      Global_1.Global.BaseCharacter.KuroSetMovementMode({
        Mode: Global_1.Global.BaseCharacter.CharacterMovement
          .DefaultLandMovementMode,
        Context: "[Plot Sequence: ActorAssistant.PreAllPlay]",
      }),
      this.iio(() => {
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
                Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", [
                  "Actor",
                  Global_1.Global.BaseCharacter?.GetName(),
                ]),
              TimerSystem_1.TimerSystem.Next(() => {
                t.EndSwitchPose(t, !0),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 38, "EndSwitchPose 结束", [
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
    this.Haa || (this.eio(), (this.Haa = !0));
    const i = UE.NewArray(UE.Actor);
    this.Model.BindingActorMap.forEach((e, t) => {
      e.D_K2_SetActorLocation(HidePos, !1, void 0, !0),
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
        e = e.Entity?.GetComponent(1)?.Owner;
        e &&
          (i.Add(e), this.Model.CurLevelSeqActor.SetBindingByTag(t, i, !1, !0));
      });
  }
  EachStop() {
    this.Model.BindingActorMap.forEach((e, t) => {
      e.D_K2_SetActorLocation(HidePos, !1, void 0, !0);
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
    let e = this.Model.BlendOutCharacter;
    var t;
    return (e = void 0 === e ? this.Model.SeqMainCharacter : e)
      ? ((t = e),
        this.jaa(!1),
        t.SkeletalMeshComponent0.SkeletalMesh !==
        Global_1.Global.BaseCharacter.Mesh.SkeletalMesh
          ? (this.nio(), !(this.Promise = void 0))
          : ((this.Model.BeginSwitchFrame = 2),
            t.BeginSwitchPose(
              t,
              Global_1.Global.BaseCharacter,
              this.Model.SequenceData.AnimationBlendOutTime,
              !0,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", [
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
        Log_1.Log.Debug("Plot", 38, "EndSwitchPose结束", [
          "Actor",
          Global_1.Global.BaseCharacter?.GetName(),
        ]),
      this.nio(),
      this.Promise && (this.Promise.SetResult(!0), (this.Promise = void 0));
  }
  TeleportToFinal() {
    var e,
      t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    t?.Valid &&
      this.Model.SequenceData.SaveFinalTransform &&
      ((e = this.Model.GetLastTransform())
        ? (!t.FixBornLocation(
            "Sequence最终位置同步",
            !0,
            e.GetLocation(),
            !0,
          ) &&
            this.Model.SequenceData.bIsForceFinalTrans &&
            t.SetActorLocation(
              e.GetLocation().ToUeVector(),
              "Sequence最终位置同步",
              !1,
            ),
          t.SetActorRotation(
            e.GetRotation().Rotator().ToUeRotator(),
            "Sequence最终位置同步",
          ),
          t.ClearInput(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 26, "SaveFinalPos", ["transform", e]),
          ControllerHolder_1.ControllerHolder.FlowController.RequestPosition(
            e.GetLocation(),
            e.GetRotation().Rotator(),
          ))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            26,
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
      this.jaa(!1),
      this.nio();
  }
  Jto() {
    (this.Model.BlendInCharacter = void 0),
      (this.Model.BlendOutCharacter = void 0);
    var t = this.Model.SequenceData.GeneratedData?.BindingBP;
    if (t) {
      var i = this.Model.SequenceData.GeneratedData?.BlendInTag,
        o = this.Model.SequenceData.GeneratedData?.BlendOutTag,
        s = this.Model.SequenceData.葫芦状态,
        r = t.Num();
      for (let e = 0; e < r; e++) {
        var n,
          l = t.Get(e),
          h = UE.KuroActorManager.D_SpawnActor(
            Info_1.Info.World,
            l,
            MathUtils_1.MathUtils.DefaultTransformDouble,
            1,
            void 0,
          );
        ObjectUtils_1.ObjectUtils.IsValid(h)
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 26, "生成Seq绑定蓝图的Actor", [
                "Class",
                h.GetName(),
              ]),
            (n = h) &&
              (this.Model.BindingActorMap.set(n.BindingTag, h),
              h.D_K2_SetActorLocation(HidePos, !1, void 0, !0),
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
            Log_1.Log.Warn("Plot", 26, "Seq绑定蓝图生成Actor失败", [
              "Class",
              l.GetName(),
            ]);
      }
    }
  }
  nio() {
    this.Model.BindingActorMap &&
      0 !== this.Model.BindingActorMap.size &&
      (this.Model.BindingActorMap.forEach((e) => {
        e.D_K2_SetActorLocation(HidePos, !1, void 0, !0),
          e && e.CleanHuluState(),
          UE.KuroActorManager.DestroyActor(e);
      }),
      this.Model.BindingActorMap.clear(),
      (this.Model.SeqMainCharacter = void 0),
      (this.Model.MainSeqCharacterMesh = void 0),
      (this.Model.BlendInCharacter = void 0),
      (this.Model.BlendOutCharacter = void 0));
  }
  jaa(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    e
      ? this.Model.HidePlayer ||
        (ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          t,
          !1,
          "剧情播放Sequence隐藏主角",
          !1,
        ),
        ControllerHolder_1.ControllerHolder.PlotController.HideSummonedEntity(),
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
  zto(t) {
    const i = new Map();
    var o = this.Model.SequenceData.绑定角色标签,
      s = o.Num();
    if (0 === s) t(void 0);
    else {
      var r = new Array(),
        n = new Array();
      for (let e = 0; e < s; e++) {
        var l = o.Get(e);
        if (
          !SequenceDefine_1.HERO_TAG.op_Equality(l) &&
          ((n.length = 0),
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(
            l.toString(),
            n,
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              26,
              "Sequence绑定找到实体",
              ["Tag", l.toString()],
              ["num", n.length],
            ),
          0 !== n.length)
        ) {
          i.set(l, n);
          for (const a of n) {
            var h = a.Entity.GetComponent(0);
            r.push(h.GetCreatureDataId());
          }
        }
      }
      0 === r.length
        ? t(void 0)
        : (this.jto = WaitEntityTask_1.WaitEntityTask.Create(
            "ActorAssistant.WaitBindingEntities",
            r,
            (e) => {
              e ||
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Plot",
                    26,
                    "有需要绑定的实体，但实体创建失败了",
                  )),
                (this.jto = void 0),
                t(i);
            },
          ));
    }
  }
  Zto(t) {
    if (t) {
      var i,
        o =
          Global_1.Global.BaseCharacter?.CharacterActorComponent
            ?.ActorLocationProxy;
      if (o) {
        let e = void 0;
        for (var [s, r] of t)
          if (r && 0 !== r.length)
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
              26,
              "实体被绑定入Sequence：",
              ["Tag", t.toString()],
              ["PbDataId", e],
            );
        });
      }
    }
  }
  eio() {
    for (var [e, t] of this.Model.BindingEntityMap) {
      var i, o;
      t.Valid &&
        ((i = new SequenceDefine_1.SequenceEntityInfo()),
        this.Model.ControlEntityMap.set(t.Id, i),
        (o = t.Entity.GetComponent(39))?.Valid &&
          o.StopAllSkills("ActorAssistant.ControlBindingEntity"),
        (o = t.Entity.GetComponent(1))?.Valid &&
          (o.SetCollisionEnable(!1, "Plot Sequence Binding"),
          o.SetSequenceBinding(!0),
          (0, RegisterComponent_1.isComponentInstance)(o, 3)) &&
          o.Actor.CharRenderingComponent?.SetDisableFightDither(!0),
        (o = t.Entity.GetComponent(67))?.Valid &&
          ((i.CacheMovementSync = o.GetEnableMovementSync()),
          o.SetEnableMovementSync(!1, "ActorAssistant")),
        e.op_Equality(SequenceDefine_1.BOSS_TAG) &&
          (o = t.Entity.GetComponent(175))?.Valid &&
          (o.MainAnimInstance.Montage_Stop(0),
          o.StartForceDisableAnimOptimization(0, !1)),
        (e = t.Entity.GetComponent(44))?.Valid &&
          (e.StopMove(!0),
          (i.MoveCompDisableHandle = e.Disable("Plot Sequence Binding"))),
        (o = t.Entity.GetComponent(111))?.Valid &&
          (i.UeMoveCompDisableHandle = o.Disable("Plot Sequence Binding")),
        (e = t.Entity.GetComponent(172))?.Valid &&
          e.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
            InstigatorId: e.CreatureDataId,
            Reason: "ActorAssistant.ControlBindingEntity",
          }),
        t.Entity.GetComponent(46)?.DisableAi("Plot Sequence Binding"));
    }
  }
  rio() {
    if (
      ((this.Haa = !1),
      this.Model.BindingEntityMap && 0 !== this.Model.BindingEntityMap.size)
    ) {
      for (var [e, t] of this.Model.BindingEntityMap) {
        var i,
          o,
          s,
          r = this.Model.ControlEntityMap.get(t.Id);
        t?.Valid &&
          ((o = t.Entity.GetComponent(1))?.Valid &&
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
          e.op_Equality(SequenceDefine_1.BOSS_TAG) &&
            (i = t.Entity.GetComponent(175))?.Valid &&
            (i.CancelForceDisableAnimOptimization(0), i.ConsumeRootMotion()),
          e !== SequenceDefine_1.HERO_TAG &&
            (e = t.Entity.GetComponent(67))?.Valid &&
            r.CacheMovementSync &&
            (e.SetEnableMovementSync(!0, "ActorAssistant"),
            e.CollectSampleAndSend(!0)),
          WorldFunctionLibrary_1.default.GetEntityTypeByEntity(t.Entity.Id) ===
            Protocol_1.Aki.Protocol.kks.Proto_Npc &&
            ((e = Protocol_1.Aki.Protocol.ecs.create()),
            ((s = Protocol_1.Aki.Protocol.Zks.create()).F4n =
              MathUtils_1.MathUtils.NumberToLong(
                o.CreatureData.GetCreatureDataId(),
              )),
            (s.P5n = o.ActorLocationProxy),
            (s.g8n = o.ActorRotationProxy),
            (e.iVn = [s]),
            Net_1.Net.Send(17177, e),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "AI",
              42,
              "向服务器同步NPC位置",
              ["实体ID", s.F4n],
              ["X", s.P5n.X],
              ["Y", s.P5n.Y],
              ["Z", s.P5n.Z],
            ),
          (o = t.Entity.GetComponent(44))?.Valid &&
            (o.StopMove(!1),
            o.Enable(
              r.MoveCompDisableHandle,
              "[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true",
            )),
          (e = t.Entity.GetComponent(111))?.Valid &&
            e.Enable(
              r.UeMoveCompDisableHandle,
              "[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true",
            ),
          (s = t.Entity.GetComponent(172))?.Valid &&
            s.RemoveBuff(
              CharacterBuffIds_1.buffId.StoryInvincibleCommon,
              -1,
              "ActorAssistant.ReleaseBindingEntity",
            ),
          t.Entity.GetComponent(46)?.EnableAi("Plot Sequence Binding"));
      }
      this.Model.BindingEntityMap.clear();
    }
  }
  tio(t) {
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
      i && i.length && "None" !== i
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-开始"),
          (this.Qto = ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.SkeletalMesh,
            (e) => {
              (this.Qto = ResourceSystem_1.ResourceSystem.InvalidId),
                e
                  ? ((this.Model.MainSeqCharacterMesh = e),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-完成"))
                  : Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-失败"),
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
  iio(i) {
    var e;
    this.Model.SequenceData.NeedSwitchMainCharacter
      ? (e = this.Model.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName()) &&
        e.length &&
        "None" !== e
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角BP-开始"),
          (this.Kto = ResourceSystem_1.ResourceSystem.LoadAsync(
            e,
            UE.Class,
            (e) => {
              (this.Kto = ResourceSystem_1.ResourceSystem.InvalidId),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角BP-完成"),
                (this.Model.SeqMainCharacter = UE.KuroActorManager.D_SpawnActor(
                  Info_1.Info.World,
                  e,
                  Global_1.Global.BaseCharacter.CharacterActorComponent
                    .ActorTransform,
                  1,
                  void 0,
                ));
              var e = this.Model.SeqMainCharacter.GetComponentByClass(
                  UE.SkeletalMeshComponent.StaticClass(),
                ),
                t =
                  (e
                    ? (e.SetSkeletalMesh(this.Model.MainSeqCharacterMesh),
                      (0 !== this.Model.GetType() &&
                        2 !== this.Model.GetType()) ||
                        ((t = e.D_GetRelativeTransform()),
                        this.Model.SeqMainCharacter.D_K2_AddActorWorldTransform(
                          t,
                          !1,
                          void 0,
                          !1,
                        ),
                        e.D_K2_SetRelativeLocationAndRotation(
                          Vector_1.Vector.ZeroVectorDouble,
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
                0 < (e = this.Model.SequenceData.葫芦状态) &&
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 38, "葫芦状态", ["HuluState", e]),
                t.ChangeHuluState(e)),
                this.Model.SeqMainCharacter.D_K2_SetActorLocation(
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
  sio() {
    if (this.CurLoadMouthIndex >= this.PreLoadMouthAssetName.length)
      this.Yto.SetResult(!0);
    else {
      const t = this.PreLoadMouthAssetName[this.CurLoadMouthIndex];
      if ((this.CurLoadMouthIndex++, StringUtils_1.StringUtils.IsEmpty(t)))
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 38, "预加载口型资源跳过，textKey 为空"),
          this.sio();
      else {
        var e = PlotAudioById_1.configPlotAudioById.GetConfig(t);
        if (e) {
          const i = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(e);
          ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimSequence, (e) => {
            e
              ? (this.PreLoadMouthAssetMap.set(t, e),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 38, "预加载口型资源", [
                    "assetPath",
                    i,
                  ]))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Plot",
                  38,
                  "预加载口型资源错误：有语音没口型",
                  ["textKey", t],
                  ["assetPath", i],
                ),
              this.sio();
          });
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 38, "预加载口型资源跳过，没有语音配置", [
              "textKey",
              t,
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
  TryApplyMouthAnim(e, t) {
    (this.Model.TalkNpcList = this.Model.CurLevelSeqActor?.GetBindingByTag(
      SequenceDefine_1.TALK_NPC_TAG,
      !0,
    )),
      this.StopMouthAnim(),
      (this.Xto = void 0),
      (this.$to = void 0),
      1 === this.Model.GetType() &&
        ((this.Xto = this.PreLoadMouthAssetMap.get(e)),
        this.Xto
          ? (this.FindApplyMouthAnim(t),
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
                    38,
                    "MouthAnim 播放口型",
                    ["Key", e],
                    ["Asset", this.Xto.GetName()],
                    ["ABP", this.$to.GetName()],
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 38, "MouthAnim 没有找到口型ABP", [
                  "whoID",
                  t,
                ]))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 38, "MouthAnim 没有口型资源", [
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
          ((this.$to =
            e.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(
              SequenceDefine_1.ABP_Base_Name,
            )),
          (i = !0));
      }),
      !i && void 0 !== this.Model.TalkNpcList)
    ) {
      var o = this.Model.TalkNpcList.Num();
      for (let e = 0; e < o; e++) {
        var s = this.Model.TalkNpcList.Get(e),
          r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === t || r.TalkID_SP === t) &&
          ((this.$to =
            r.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(
              SequenceDefine_1.ABP_Base_Name,
            )),
          this.$to)
        )
          return;
        r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === t || r.TalkID_SP === t) &&
          ((this.$to = r.Skel_Main?.GetAnimInstance()), this.$to)
        )
          return;
        r = s;
        if (
          r?.IsValid() &&
          (r.TalkID === t || r.TalkID_SP === t) &&
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
      this.jaa(!0);
  }
  PlayerHide() {
    this.Model.BindingActorMap.get(SequenceDefine_1.HERO_TAG) &&
      (this.Model.BindingActorMap.get(
        SequenceDefine_1.HERO_TAG,
      ).D_K2_SetActorLocation(HidePos, !1, void 0, !0),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Plot", 45, "过场seq内不存在男女主，开始尝试隐藏");
  }
  TempHideAllShouanren() {
    if (
      this.gL1.has(
        ControllerHolder_1.ControllerHolder.FlowController.GetFlowName(),
      )
    )
      for (const l of this.gL1.get(
        ControllerHolder_1.ControllerHolder.FlowController.GetFlowName(),
      )) {
        var e = this.Model.CurLevelSeqActor.GetBindingByTag(
            new UE.FName(l),
            !0,
          ),
          t = e.Num(),
          i =
            (1 !== t &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Plot",
                26,
                "[Shouanren] Spawnable数量异常",
                ["seq", this.Model?.GetCurrentSequence().GetName()],
                ["name", l],
                ["num", t],
              ),
            0 < t ? e.Get(0) : void 0),
          t = (0, puerts_1.$ref)(UE.NewArray(UE.BP_BaseRole_Seq_V2_C)),
          o =
            (UE.GameplayStatics.GetAllActorsOfClass(
              GlobalData_1.GlobalData.World,
              UE.BP_BaseRole_Seq_V2_C.StaticClass(),
              t,
            ),
            (0, puerts_1.$unref)(t)),
          s = new RegExp(l, "i"),
          r = o.Num();
        for (let e = 0; e < r; e++) {
          var n = o.Get(e);
          n.IsValid() &&
            !n.bHidden &&
            n !== i &&
            s.test(n.GetClass().GetName()) &&
            (n.SetActorHiddenInGame(!0), Log_1.Log.CheckError()) &&
            Log_1.Log.Error(
              "Plot",
              26,
              "[Shouanren] 存在未知的BP_BaseRole_Seq_V2_C",
              ["name", n.GetName()],
              [
                "outer name",
                n.GetOuter()?.IsValid() ? n.GetOuter().GetName() : "no owner",
              ],
              ["tag", (0, ObjectUtils_1.ueArrayToArray)(n.Tags)],
              ["seq", this.Model.GetCurrentSequence()],
            );
        }
      }
  }
}
exports.ActorAssistant = ActorAssistant;
//# sourceMappingURL=ActorAssistant.js.map
