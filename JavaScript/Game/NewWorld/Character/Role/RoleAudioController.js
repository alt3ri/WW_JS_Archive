"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudioController = void 0);
const ue_1 = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  RoleAudioRulesById_1 = require("../../../../Core/Define/ConfigQuery/RoleAudioRulesById"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController"),
  CharacterUnifiedStateTypes_1 = require("../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RoleSceneInteractComponent_1 = require("./Component/RoleSceneInteractComponent"),
  ROLE_CHANGE_FRONT_EVENT = "scene_role_switched_front",
  DEFAULT_INTERVAL_TIME = 1e4,
  ENTER_FIGHT_DISTANCE = 1e3,
  INTERVAL_TIME = 500,
  MIN_INTERVAL_TIME = 50;
class RoleAudioCoolDownTime {
  constructor(e) {
    (this.Type = 0),
      (this.CurrentTeamTime = [0, 0, 0]),
      (this.CurrentRoleTime = [0, 0, 0, 0]),
      (this.TeamIntervalTime = 0),
      (this.RoletervalTime = 0),
      (this.Probabilities = 0);
    var t = e.valueOf(),
      e =
        ((this.Type = e),
        RoleAudioRulesById_1.configRoleAudioRulesById.GetConfig(t));
    (this.TeamIntervalTime = e?.TeamColdTime ?? DEFAULT_INTERVAL_TIME),
      (this.RoletervalTime = e?.CharacterColdTime ?? DEFAULT_INTERVAL_TIME),
      (this.Probabilities = (e?.PostProbability ?? 100) / 100);
  }
  CheckAndUpdateCoolDownTime(e, t = !0, o = !0) {
    var r = Math.random();
    if (r > this.Probabilities && o)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            43,
            "[Game.Role] PostEvent 概率触发为False，取消触发角色语音",
            ["RoleId", e],
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)],
            ["概率", this.Probabilities],
            ["随机数", r],
          ),
        !1
      );
    r = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItems();
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            43,
            "[CheckAndUpdateCoolDownTime] GetTeamItems失败",
          ),
        !1
      );
    let i = 0,
      n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const l of r) {
      if (l.GetConfigId === e) {
        n = l.GetPlayerId();
        break;
      }
      i++;
    }
    var r = Time_1.Time.Now - this.CurrentRoleTime[i],
      s = r >= this.RoletervalTime;
    r < this.RoletervalTime &&
      o &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Audio",
        43,
        "[Game.Role] PostEvent 角色CD中，取消触发角色语音",
        ["RoleId", e],
        ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)],
        [
          "剩余时间/秒",
          (this.RoletervalTime - r) / CommonDefine_1.MILLIONSECOND_PER_SECOND,
        ],
        [
          "CD/秒",
          this.RoletervalTime / CommonDefine_1.MILLIONSECOND_PER_SECOND,
        ],
      );
    let a = 0;
    return ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (a =
        (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(n)
          ?.PlayerNumber ?? 1) - 1) < 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            43,
            "[CheckAndUpdateCoolDownTime] GetCurrentTeamListById失败",
          ),
        !1)
      : ((r = Time_1.Time.Now - this.CurrentTeamTime[a]),
        (s = s && r >= this.TeamIntervalTime),
        r < this.TeamIntervalTime &&
          o &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            43,
            "[Game.Role] PostEvent 队伍CD中，取消触发角色语音",
            ["RoleId", e],
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)],
            [
              "剩余时间/秒",
              (this.TeamIntervalTime - r) /
                CommonDefine_1.MILLIONSECOND_PER_SECOND,
            ],
            [
              "CD/秒",
              this.TeamIntervalTime / CommonDefine_1.MILLIONSECOND_PER_SECOND,
            ],
          ),
        s &&
          t &&
          ((this.CurrentRoleTime[i] = Time_1.Time.Now),
          (this.CurrentTeamTime[a] = Time_1.Time.Now)),
        s);
  }
}
class RoleAudioController extends ControllerBase_1.ControllerBase {
  static rca() {
    for (const e of [
      0, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 2001, 2002, 2004, 2005, 2006,
      2007, 2008,
    ])
      this.oca.set(e, new RoleAudioCoolDownTime(e));
  }
  static OnInit() {
    return (
      this.rca(),
      (this.Sir =
        (CommonParamById_1.configCommonParamById.GetIntConfig(
          "LowEndurancePercent",
        ) ?? 0) / 1e4),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.yzo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenTreasureBox,
        this.yir,
      ),
      FormationAttributeController_1.FormationAttributeController.AddValueListener(
        1,
        this.Pni,
      ),
      !0
    );
  }
  static OnTick() {
    return (
      Global_1.Global.BaseCharacter &&
        this.ActorComponent &&
        ModelManager_1.ModelManager.GameModeModel.WorldDone &&
        !ModelManager_1.ModelManager.GameModeModel.IsTeleport &&
        (this.Mja
          ? (this.Sja(), (this.Pln = Time_1.Time.Now))
          : (this.ActorComponent?.MoveComp?.IsMoving
              ? (this.Phn = MIN_INTERVAL_TIME)
              : (this.Phn = INTERVAL_TIME),
            Time_1.Time.Now - this.Pln < this.Phn ||
              ((this.Pln = Time_1.Time.Now),
              this.SetUpdateAudioDynamicTrace()))),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharUseSkill,
        this.yzo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenTreasureBox,
        this.yir,
      ),
      FormationAttributeController_1.FormationAttributeController.RemoveValueListener(
        1,
        this.Pni,
      ),
      !0
    );
  }
  static SetUpdateAudioDynamicTrace(e = !1) {
    (this.yja = e), this.Mja || ((this.Mja = !0), (this.Eja = !1));
  }
  static Sja() {
    var e = ue_1.KuroAudioStatics.GetAudioEnvironmentSubsystem(
      Info_1.Info.World,
    );
    e
      ? this.Eja
        ? (e?.DynamicReverbApply(),
          (this.Eja = !1),
          (this.Mja = !1),
          this.yja && this.SetUpdateAudioDynamicTrace(!0))
        : (this.ActorComponent &&
            (e?.DynamicReverbTrace(this.ActorComponent.ActorLocation, this.yja),
            (this.yja = !1)),
          (this.Eja = !0))
      : ((this.Eja = !1), (this.Mja = !1));
  }
  static PlayRoleAudio(e, t) {
    var o = e?.GetComponent(3),
      r = e?.GetComponent(174),
      i = r?.GetAkComponent();
    e &&
      o &&
      r &&
      i &&
      r.Config &&
      this.xzs(
        o.CreatureData.GetPbDataId(),
        i,
        t,
        RoleAudioController.GetRoleAudioConfig(r.Config, t),
      );
  }
  static xzs(e, t, o, r) {
    var i;
    this.oca.get(0).CheckAndUpdateCoolDownTime(e, !0, !1) &&
      ((i = this.oca.get(o))
        ? i.CheckAndUpdateCoolDownTime(e) &&
          (AudioSystem_1.AudioSystem.PostEvent(r, t), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            43,
            "[Game.Role] PostEvent 触发角色语音",
            ["RoleId", e],
            ["Event", r],
            ["Owner", t.GetOwner()?.GetName()],
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(o)],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            43,
            "IntervalCoolDownTimeMap没注册音频配置数据",
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(o)],
          ));
  }
  static OnPlayerIsHit(e) {
    TimerSystem_1.TimerSystem.Next(() => {
      this.PlayRoleAudio(e, 2007);
    });
  }
  static OnPlayerEnterFight(e, t) {
    t < ENTER_FIGHT_DISTANCE || this.PlayRoleAudio(e, 2006);
  }
  static OnMoveStateChange(e, t) {
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        this.PlayRoleAudio(t, 1002);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
        this.PlayRoleAudio(t, 2008);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        TimerSystem_1.TimerSystem.Next(() => {
          this.PlayRoleAudio(t, 1001);
        });
    }
  }
  static GetRoleAudioConfig(e, t) {
    switch (t) {
      case 1001:
        return e.FastClimbEvent;
      case 1002:
        return e.EnterGlideEvent;
      case 1003:
        return e.ClimbLeapEvent;
      case 1005:
        return e.UseExploreHookEvent;
      case 1006:
        return e.ScanTreasureBoxEvent;
      case 1007:
        return e.OpenTreasureBoxEvent;
      case 2001:
        return e.VisionMorphEvent;
      case 2002:
        return e.VisionSummonEvent;
      case 2004:
        return e.ExtremeDodgeEvent;
      case 2005:
        return e.ParryEvent;
      case 2006:
        return e.EnterBattleEvent;
      case 2007:
        return e.UnderAttackEvent;
      case 2008:
        return e.KnockUpEvent;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Audio", 43, "[GetRoleAudioConfig] 错误的类型", [
              "type",
              t,
            ]),
          ""
        );
    }
  }
  static GetRoleAudioTypeDesc(e) {
    switch (e) {
      case 0:
        return "全局";
      case 1001:
        return "快速攀爬";
      case 1002:
        return "滑翔";
      case 1003:
        return "跨越";
      case 1004:
        return "体力变化";
      case 1005:
        return "使用钩锁技能";
      case 1006:
        return "扫描到宝箱";
      case 1007:
        return "开宝箱";
      case 2001:
        return "幻象变身";
      case 2002:
        return "幻象召唤";
      case 2004:
        return "闪避";
      case 2005:
        return "弹反";
      case 2006:
        return "进战";
      case 2007:
        return "受击";
      case 2008:
        return "被击飞";
    }
    return "未定义";
  }
}
(exports.RoleAudioController = RoleAudioController),
  ((_a = RoleAudioController).ActorComponent = void 0),
  (RoleAudioController.AudioComponent = void 0),
  (RoleAudioController.Sir = 0),
  (RoleAudioController.oca = new Map()),
  (RoleAudioController.Phn = INTERVAL_TIME),
  (RoleAudioController.Pln = 0),
  (RoleAudioController.Eja = !1),
  (RoleAudioController.Mja = !1),
  (RoleAudioController.yja = !1),
  (RoleAudioController.yzo = (e, t, o) => {
    e = EntitySystem_1.EntitySystem.Get(e);
    e &&
      (RoleSceneInteractComponent_1.fixHookSkillIds.has(t) || 210001 === t) &&
      _a.PlayRoleAudio(e, 1005);
  }),
  (RoleAudioController.xie = (e, t) => {
    (_a.ActorComponent = e.Entity?.CheckGetComponent(3)),
      (_a.AudioComponent = e.Entity?.CheckGetComponent(174)),
      _a.AudioComponent?.Config &&
        AudioSystem_1.AudioSystem.SetState(
          "role_name",
          _a.AudioComponent.Config.Name,
        );
    e = _a.AudioComponent?.GetAkComponent();
    e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          43,
          "[Game.Role] PostEvent 角色进场语音事件",
          ["RoleId", _a.ActorComponent?.CreatureData.GetPbDataId()],
          ["Event", ROLE_CHANGE_FRONT_EVENT],
          ["Owner", e.GetOwner()?.GetName()],
        ),
      AudioSystem_1.AudioSystem.PostEvent(ROLE_CHANGE_FRONT_EVENT, e));
  }),
  (RoleAudioController.yir = () => {
    _a.ActorComponent && _a.PlayRoleAudio(_a.ActorComponent.Entity, 1007);
  }),
  (RoleAudioController.Pni = (e, t, o) => {
    1 !== e ||
      o < t ||
      ModelManager_1.ModelManager.SceneTeamModel?.ChangingRole ||
      t /
        (e =
          FormationAttributeController_1.FormationAttributeController.GetMax(
            1,
          )) >
        _a.Sir ||
      ((t = _a.AudioComponent?.GetAkComponent()),
      (o =
        o / e > _a.Sir
          ? _a.AudioComponent?.Config?.LowStrengthEventList[0]
          : _a.AudioComponent?.Config?.LowStrengthEventList[1]),
      _a.ActorComponent &&
        t &&
        o &&
        _a.xzs(_a.ActorComponent.CreatureData.GetPbDataId(), t, 1004, o));
  });
//# sourceMappingURL=RoleAudioController.js.map
