"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameAudioModel = exports.CHECK_TIME_OUT_COOLDOWN_RECORD = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  GongduolaPassengerVoiceConfigByRoleIdAndTriggerType_1 = require("../../../Core/Define/ConfigQuery/GongduolaPassengerVoiceConfigByRoleIdAndTriggerType"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  VehicleModel_1 = require("../../NewWorld/Vehicle/Model/VehicleModel"),
  FlowController_1 = require("../Plot/Flow/FlowController");
exports.CHECK_TIME_OUT_COOLDOWN_RECORD = 1e4;
class EntityCooldownProbability {
  constructor() {
    (this.EntityId = 0),
      (this.TagComp = void 0),
      (this.AudioEventCooldownTimeMap = void 0);
  }
  Init(o) {
    (this.EntityId = o),
      (this.AudioEventCooldownTimeMap = new Map()),
      (this.TagComp = EntitySystem_1.EntitySystem.GetComponent(o, 203));
  }
  Clear() {
    (this.TagComp = void 0),
      this.AudioEventCooldownTimeMap?.clear(),
      (this.AudioEventCooldownTimeMap = void 0);
  }
  CheckTimeOutCooldownRecords() {
    this.AudioEventCooldownTimeMap ||
      (this.AudioEventCooldownTimeMap = new Map());
    var o = [];
    for (const i of this.AudioEventCooldownTimeMap)
      Time_1.Time.Now - i[1].Time <
      Math.max(i[1].Cooldown, exports.CHECK_TIME_OUT_COOLDOWN_RECORD)
        ? this.TagComp ||
          (this.TagComp = EntitySystem_1.EntitySystem.GetComponent(
            this.EntityId,
            203,
          ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Audio",
              42,
              "[EntityCooldownProbability] 记录的AudioEvent冷却时间一定时间未使用过，删除该条记录",
              ["EntityId", this.EntityId],
              ["AudioEvent", i[0]],
              ["IntervalTime", Time_1.Time.Now - i[1].Time],
            ),
          o.push(i[0]));
    for (const e of o) this.AudioEventCooldownTimeMap.delete(e);
    return 0 === this.AudioEventCooldownTimeMap.size;
  }
  CheckPlayAudio(i, e) {
    if (e.TagProbability && this.TagComp && 0 < e.TagProbability.Num())
      for (let o = 0; o < e.TagProbability.Num(); o++) {
        var t,
          r = e.TagProbability.Get(o);
        if (this.TagComp.HasTag(r.GameplayTag.TagId))
          return (
            (t = this.h_l(i, r.Probability, r.CooldownTime)) &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[EntityCooldownProbability] 通过了配置的概率和CD检查，正常播放AudioEvent",
                ["EntityId", this.EntityId],
                ["AudioEvent", i],
                ["Tag", r.GameplayTag.TagName],
                ["Probability", r.Probability],
                ["CooldownTime", r.CooldownTime],
              ),
            t
          );
      }
    var o = this.h_l(i, e.DefaultProbability, e.DefaultCooldownTime);
    return (
      o &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EntityCooldownProbability] 通过了默认概率和CD检查，正常播放AudioEvent",
          ["EntityId", this.EntityId],
          ["AudioEvent", i],
          ["Probability", e.DefaultProbability],
          ["CooldownTime", e.DefaultCooldownTime],
        ),
      o
    );
  }
  h_l(o, i, e) {
    if (this.__l(i)) {
      this.AudioEventCooldownTimeMap ||
        (this.AudioEventCooldownTimeMap = new Map());
      var t = this.AudioEventCooldownTimeMap.has(o)
        ? Time_1.Time.Now - this.AudioEventCooldownTimeMap.get(o).Time
        : -1;
      if (t < 0 || e < t)
        return (
          0 !== e &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[EntityCooldownProbability] 通过概率和CD检查，更新Map",
                ["EntityId", this.EntityId],
                ["AudioEvent", o],
                ["距离上一次播放", t],
              ),
            this.AudioEventCooldownTimeMap.set(o, {
              Time: Time_1.Time.Now,
              Cooldown: e,
            })),
          !0
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EntityCooldownProbability] 播放Audio不满足CD检查",
          ["EntityId", this.EntityId],
          ["AudioEvent", o],
          ["CooldownTime", e],
          ["距离上一次播放", t],
        );
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EntityCooldownProbability] 播放Audio不满足概率检查",
          ["EntityId", this.EntityId],
          ["AudioEvent", o],
          ["Probability", i],
        );
    return !1;
  }
  __l(o) {
    return 1 === o || 0 === o ? 1 === o : Math.random() < o;
  }
}
class GameAudioModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.o6l = 0),
      (this.n6l = 0),
      (this.u_l = new Map()),
      (this.Xbl = 0),
      (this.Ybl = 0),
      (this.G2l = 0),
      (this.jbl = 0),
      (this.Wbl = 0),
      (this.Qbl = !1),
      (this.s6l = 0),
      (this.a6l = 0),
      (this.h6l = 0),
      (this.l6l = 0),
      (this._6l = void 0),
      (this.Cjo = (o) => {
        o.FlowIncId === this._6l?.PlotHandle?.Handle &&
          ((this._6l.PlotHandle = void 0), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[Vehicle.Audio] 贡多拉与角色共乘剧情播放结束",
          );
      }),
      (this.c6l = !1),
      (this.y5_ = 0),
      (this.S5_ = 0),
      (this.M5_ = 0),
      (this.E5_ = 0),
      (this.iQ_ = !1),
      (this.I5_ = void 0),
      (this.T5_ = !1);
  }
  OnInit() {
    return (
      (this.o6l =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "GondolaRideSharingAudioCoolDown",
        ) ?? 0),
      (this.n6l =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "GondolaRideSharingPlotCoolDown",
        ) ?? 0),
      !0
    );
  }
  CheckTimeOutCooldownRecords() {
    var o = [];
    for (const i of this.u_l)
      i[1].CheckTimeOutCooldownRecords() && (i[1].Clear(), o.push(i[0]));
    for (const e of o)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[EntityCooldownProbability] 记录的实体上所有AudioEvent都一定时间未使用过，删除该条记录",
          ["EntityId", e],
        ),
        this.u_l.delete(e);
  }
  CheckAudioProbabilityInfo(o, i, e) {
    if (
      !e ||
      (0 === e.DefaultCooldownTime &&
        1 === e.DefaultProbability &&
        (!e.TagProbability || 0 === e.TagProbability.Num()))
    )
      return !0;
    if (
      0 === e.DefaultProbability &&
      (!e.TagProbability || 0 === e.TagProbability.Num())
    )
      return !1;
    if (!this.u_l.has(o)) {
      const r = new EntityCooldownProbability();
      r.Init(o);
      var t = r.CheckPlayAudio(i, e);
      return t && this.u_l.set(o, r), t;
    }
    const r = this.u_l.get(o);
    return r.CheckPlayAudio(i, e);
  }
  AddAllGondolaMusic(o) {
    (this.Xbl =
      ModelManager_1.ModelManager.GameAudioModel.AddGondolaKeepDriveMusic()),
      (this.Ybl =
        ModelManager_1.ModelManager.GameAudioModel.AddGondolaStopDriveMusic()),
      (this.G2l =
        ModelManager_1.ModelManager.GameAudioModel.AddGondolaSlowToFastSound(
          o,
        ));
  }
  StopAllGondolaMusic() {
    this.w2l(),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.Xbl),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.Ybl),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.G2l);
  }
  AddGondolaKeepDriveMusic() {
    const o = CommonParamById_1.configCommonParamById.GetStringConfig(
      "GondolaKeepDriveAudio",
    );
    var i = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaKeepDriveSpeed",
      ),
      e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaKeepDriveDuration",
      ),
      i = new VehicleModel_1.KeepDrivingDurationAtSpeed(
        [i, MathUtils_1.MathUtils.MaxFloat],
        e,
        () => !this.Qbl,
        () => {
          this.Qbl ||
            ((this.Qbl = !0),
            0 !== this.Wbl &&
              (AudioSystem_1.AudioSystem.ExecuteAction(this.Wbl, 0),
              (this.Wbl = 0)),
            (this.jbl = AudioSystem_1.AudioSystem.PostEvent(o)),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Vehicle.Audio] PostEvent 播放船歌",
                ["Name", o],
              ));
        },
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  AddGondolaStopDriveMusic() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaStopDriveSpeed",
      ),
      i = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaStopDriveDuration",
      ),
      o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
        [0, o],
        i,
        () => this.Qbl,
        () => {
          this.Qbl && this.w2l();
        },
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  w2l() {
    this.Qbl = !1;
    var o = CommonParamById_1.configCommonParamById.GetStringConfig(
      "GondolaStopDriveAudio",
    );
    0 !== this.jbl &&
      (AudioSystem_1.AudioSystem.ExecuteAction(this.jbl, 0, {
        TransitionDuration: 3500,
      }),
      (this.jbl = 0)),
      (this.Wbl = AudioSystem_1.AudioSystem.PostEvent(o)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 停止船歌", [
          "Name",
          o,
        ]);
  }
  AddGondolaSlowToFastSound(i) {
    const e = CommonParamById_1.configCommonParamById.GetStringConfig(
      "GondolaSlowToFastSoundEvent",
    );
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaSoundSpeedDivide",
      ),
      t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaSlowToFastSoundCoolDown",
      ),
      o = new VehicleModel_1.PlayDrivingSoundOnReachSpeed(
        [o, MathUtils_1.MathUtils.MaxFloat],
        t,
        void 0,
        () => {
          var o = i?.GetComponent(1);
          o
            ? (AudioSystem_1.AudioSystem.PostEvent(e, o.Owner),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  42,
                  "[Vehicle.Audio] PostEvent 从慢速到快速播放音效",
                  ["Name", e],
                  ["Owner", o.Owner?.GetName()],
                ))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Vehicle.Audio] 贡多拉从慢速到快速播放音效失败,没有Actor",
                ["Entity", i?.Id],
              );
        },
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  GondolaGetOnAudioEvent(o) {
    var i = CommonParamById_1.configCommonParamById.GetStringConfig(
        "GondolaGetOnAudioEvent",
      ),
      e = o?.GetComponent(1);
    e
      ? (AudioSystem_1.AudioSystem.PostEvent(i, e.Owner),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[Vehicle.Audio] PostEvent 贡多拉上下船播放音效",
            ["Name", i],
            ["Owner", e.Owner?.GetName()],
          ))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[Vehicle.Audio] 贡多拉从慢速到快速播放音效失败,没有Actor",
          ["Entity", o?.Id],
        );
  }
  RegisterDriveAudioEvent(o, i) {
    (this._6l = {
      RoleId: o,
      RoleCreatureId: i,
      PassengerId: 0,
      PassengerActor: void 0,
    }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Cjo,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[Vehicle.Audio] 触发与角色共乘",
          ["roleId", this._6l.RoleId],
          ["roleCreatureId", this._6l.RoleCreatureId],
        ),
      (this.s6l =
        ModelManager_1.ModelManager.GameAudioModel.AddRideSharingKeepMoveAudio()),
      (this.a6l =
        ModelManager_1.ModelManager.GameAudioModel.AddRideSharingKeepIdleAudio()),
      (this.h6l =
        ModelManager_1.ModelManager.GameAudioModel.AddRideSharingMovingInfo()),
      (this.l6l =
        ModelManager_1.ModelManager.GameAudioModel.AddRideSharingStopMovingAudio());
  }
  RemoveDriveAudioEvent() {
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.s6l),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.a6l),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.h6l),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.l6l),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Cjo,
      ),
      this.u6l(MathUtils_1.MathUtils.MaxFloat, this._6l),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[Vehicle.Audio] 退出与角色共乘",
          ["roleId", this._6l?.RoleId],
          ["roleCreatureId", this._6l?.RoleCreatureId],
        ),
      (this._6l = void 0);
  }
  PlayRideSharingPlotAudio(o) {
    return (
      !!(
        (ModelManager_1.ModelManager.VehicleModel?.RideSharingInfo &&
          this._6l?.PassengerActor?.Owner) ||
        (this.d6l(), this._6l?.PassengerActor)
      ) && this.PlayConfigPlotAudio(o, this._6l)
    );
  }
  d6l() {
    var o, i;
    this._6l &&
      ((i = (o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
        this._6l.RoleCreatureId,
      ))?.Entity?.GetComponent(1)),
      o?.Entity && i
        ? ((this._6l.PassengerActor = i), (this._6l.PassengerId = o.Entity.Id))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              42,
              "[Vehicle.Audio] 贡多拉与角色共乘语音事件播放,没有乘客实体",
              ["roleId", this._6l.RoleId],
              ["roleCreatureId", this._6l.RoleCreatureId],
            ),
          (this._6l = void 0)));
  }
  CheckRideSharingState() {
    return (
      !!ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing &&
      !(
        !ModelManager_1.ModelManager.VehicleModel.RideSharingInfo ||
        !this._6l ||
        (!this._6l.PassengerActor && (this.d6l(), !this._6l?.PassengerActor))
      )
    );
  }
  AddRideSharingKeepMoveAudio() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaRoleAudioKeepMove",
      ),
      o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
        [1, MathUtils_1.MathUtils.MaxFloat],
        o,
        () => this.CheckRideSharingState(),
        () => {
          this.PlayRideSharingPlotAudio(
            IAction_1.EGondolaVoiceTriggeredType.KeepMoving,
          );
        },
        Math.max(o, this.n6l),
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  AddRideSharingKeepIdleAudio() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaRoleAudioIdle",
      ),
      o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
        [0, 1],
        o,
        () => this.CheckRideSharingState(),
        () => {
          this.PlayRideSharingPlotAudio(
            IAction_1.EGondolaVoiceTriggeredType.StayIdle,
          );
        },
        Math.max(o, this.n6l),
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  AddRideSharingMovingInfo() {
    const o = CommonParamById_1.configCommonParamById.GetIntConfig(
      "GondolaRoleAudioStopMove",
    );
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed(
      [1, MathUtils_1.MathUtils.MaxFloat],
      o,
      () => !this.c6l,
      () => {
        this.c6l ||
          ((this.c6l = !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 达成持续移动N秒", [
              "Time",
              o,
            ]));
      },
    );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  AddRideSharingStopMovingAudio() {
    var o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
      [0, 0],
      0,
      () => this.c6l,
      () => {
        this.c6l &&
          ((this.c6l = !1),
          this.PlayRideSharingPlotAudio(
            IAction_1.EGondolaVoiceTriggeredType.StopMoving,
          ));
      },
    );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  RegisterFishingAudioEvent() {
    (this.I5_ = {
      RoleId: IAction_1.ESpecificVehicleRoleType.FishingBoat,
      PassengerId: Global_1.Global.BaseCharacter?.EntityId ?? 0,
      PassengerActor: Global_1.Global.BaseCharacter?.CharacterActorComponent,
    }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发捕鱼语音事件添加"),
      (this.iQ_ = this.rQ_()),
      (this.y5_ =
        ModelManager_1.ModelManager.GameAudioModel.AddFishingKeepMoveAudio()),
      (this.S5_ =
        ModelManager_1.ModelManager.GameAudioModel.AddFishingKeepIdleAudio()),
      (this.M5_ =
        ModelManager_1.ModelManager.GameAudioModel.AddFishingMovingInfo()),
      (this.E5_ =
        ModelManager_1.ModelManager.GameAudioModel.AddFishingStopMovingAudio());
  }
  RemoveFishingAudioEvent() {
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.y5_),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.S5_),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.M5_),
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.E5_),
      this.u6l(MathUtils_1.MathUtils.MaxFloat, this.I5_),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 退出捕鱼，移除语音事件"),
      (this.I5_ = void 0);
  }
  PlayFishingAudio(o) {
    return (
      !!(
        this.I5_ &&
        Global_1.Global.BaseCharacter?.CharacterActorComponent &&
        this.iQ_
      ) && this.PlayConfigPlotAudio(o, this.I5_)
    );
  }
  AddFishingKeepMoveAudio() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaFishingAudioKeepMove",
      ),
      o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
        [1, MathUtils_1.MathUtils.MaxFloat],
        o,
        () => this.iQ_,
        () => {
          this.PlayFishingAudio(
            IAction_1.EGondolaVoiceTriggeredType.KeepMoving,
          );
        },
        Math.max(o, this.n6l),
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  AddFishingKeepIdleAudio() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
        "GondolaFishingAudioIdle",
      ),
      o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
        [0, 1],
        o,
        () => this.iQ_,
        () => {
          this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.StayIdle);
        },
        Math.max(o, this.n6l),
      );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  AddFishingMovingInfo() {
    const o = CommonParamById_1.configCommonParamById.GetIntConfig(
      "GondolaFishingAudioStopMove",
    );
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed(
      [1, MathUtils_1.MathUtils.MaxFloat],
      o,
      () => !this.T5_ && this.iQ_,
      () => {
        this.T5_ ||
          ((this.T5_ = !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 达成持续移动N秒", [
              "Time",
              o,
            ]));
      },
    );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  AddFishingStopMovingAudio() {
    var o = new VehicleModel_1.KeepDrivingDurationAtSpeed(
      [0, 0],
      0,
      () => this.T5_ && this.iQ_,
      () => {
        this.T5_ &&
          ((this.T5_ = !1),
          this.PlayFishingAudio(
            IAction_1.EGondolaVoiceTriggeredType.StopMoving,
          ));
      },
    );
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(o) ?? 0;
  }
  rQ_() {
    var o = CommonParamById_1.configCommonParamById.GetIntConfig(
      "FishingVoiceCondition",
    );
    return ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
      o.toString(),
      void 0,
      !1,
    );
  }
  PlayConfigPlotAudio(o, i) {
    var e, t, r;
    return (
      !!i.PassengerActor?.Owner &&
      !(
        !(e = this.m6l(i.RoleId, o)) ||
        ((t = e.PlotFlow && 3 === e.PlotFlow.length),
        0 === (r = this.C6l(t, e)).length
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Audio",
                42,
                "[Vehicle.Audio] 贡多拉角色语音播放失败，没有对应Event配置",
                ["roleId", i.RoleId],
                ["type", this.g6l(o)],
                ["PlotFlow", e.PlotFlow],
                ["Voice", e.Voice],
              ),
            1)
          : this.u6l(e.Priority, i)
            ? this.CheckAudioProbabilityInfo(i.PassengerId, r, {
                DefaultCooldownTime: t ? this.o6l : this.n6l,
                DefaultProbability: 1,
              })
              ? (t ? this.f6l(e, i) : this.p6l(e, i),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    42,
                    "[Vehicle.Audio] 贡多拉与角色语音播放",
                    ["Event", r],
                    ["roleId", i.RoleId],
                    ["type", this.g6l(o)],
                  ),
                0)
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    42,
                    "[Vehicle.Audio] 贡多拉角色语音播放CD中",
                  ),
                1)
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  42,
                  "[Vehicle.Audio] 触发贡多拉角色语音失败，当前正在播放的共乘语音优先级大于或等于触发语音",
                  ["roleId", i.RoleId],
                  ["type", this.g6l(o)],
                ),
              1))
      )
    );
  }
  u6l(o, i) {
    let e = !0;
    return (
      i?.AudioHandle &&
        (i.AudioHandle.Priority < o
          ? (AudioSystem_1.AudioSystem.ExecuteAction(i.AudioHandle.Handle, 0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Vehicle.Audio] 打断当前正在播放优先级更低的语音",
              ),
            (i.AudioHandle = void 0))
          : (e = !1)),
      i?.PlotHandle &&
        (i.PlotHandle.Priority < o
          ? (FlowController_1.FlowController.FinishFlow(
              "退出贡多拉停止角色贡多拉剧情",
              i.PlotHandle.Handle,
              !1,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Vehicle.Audio] 打断当前正在播放优先级更低的剧情",
              ),
            (i.PlotHandle = void 0))
          : (e = !1)),
      !!e
    );
  }
  m6l(o, i) {
    var e =
      GongduolaPassengerVoiceConfigByRoleIdAndTriggerType_1.configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.GetConfigList(
        o,
        i,
      );
    if (e && 0 !== e.length) return e[0];
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Vehicle.Audio] 贡多拉与角色共乘语音播放失败，没有对应配置",
        ["roleId", o],
        ["type", this.g6l(i)],
      );
  }
  C6l(o, i) {
    let e = "";
    if (o) for (const t of i.PlotFlow) e += t;
    else i.Voice && 0 < i.Voice.length && (e = i.Voice);
    return e;
  }
  f6l(o, i) {
    (i.PlotHandle = { Priority: o.Priority, Handle: 0 }),
      (i.PlotHandle.Handle = FlowController_1.FlowController.StartFlow(
        o.PlotFlow[0],
        parseInt(o.PlotFlow[1]),
        parseInt(o.PlotFlow[2]),
      ));
  }
  p6l(e, t) {
    (t.AudioHandle = { Priority: e.Priority, Handle: 0 }),
      (t.AudioHandle.Handle = AudioSystem_1.AudioSystem.PostEvent(
        e.Voice,
        t.PassengerActor.Owner,
        {
          CallbackMask: 1,
          CallbackHandler: (o, i) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 语音播放完成回调", [
                "Event",
                e.Voice,
              ]),
              t && (t.AudioHandle = void 0);
          },
        },
      ));
  }
  g6l(o) {
    switch (o) {
      case IAction_1.EGondolaVoiceTriggeredType.FindTreasure:
        return "找到海上宝箱";
      case IAction_1.EGondolaVoiceTriggeredType.InviteRole:
        return "邀请角色上船";
      case IAction_1.EGondolaVoiceTriggeredType.KeepMoving:
        return "保持移动N秒";
      case IAction_1.EGondolaVoiceTriggeredType.OpenCompass:
        return "打开指南针";
      case IAction_1.EGondolaVoiceTriggeredType.StayIdle:
        return "保持静止N秒";
      case IAction_1.EGondolaVoiceTriggeredType.StopMoving:
        return "移动N秒后停止移动";
      case IAction_1.EGondolaVoiceTriggeredType.NearFishingPoint:
        return "靠近捕鱼点";
      default:
        return "到特定区域/未知";
    }
  }
}
exports.GameAudioModel = GameAudioModel;
//# sourceMappingURL=GameAudioModel.js.map
