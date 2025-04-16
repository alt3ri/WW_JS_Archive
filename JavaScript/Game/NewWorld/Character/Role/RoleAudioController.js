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
  fixHookSkillIds = new Set([100020, 100021, 100022, 100024, 210130]),
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
    var o = e.valueOf(),
      e =
        ((this.Type = e),
        RoleAudioRulesById_1.configRoleAudioRulesById.GetConfig(o));
    (this.TeamIntervalTime = e?.TeamColdTime ?? DEFAULT_INTERVAL_TIME),
      (this.RoletervalTime = e?.CharacterColdTime ?? DEFAULT_INTERVAL_TIME),
      (this.Probabilities = (e?.PostProbability ?? 100) / 100);
  }
  CheckProbabilitiesCoolDown(e, o = !0, t = !0) {
    var i = Math.random();
    return i > this.Probabilities && t
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[Game.Role] PostEvent 概率触发为False，取消触发角色语音",
            ["RoleId", e],
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)],
            ["概率", this.Probabilities],
            ["随机数", i],
          ),
        !1)
      : this.CheckCoolDownTime(e, o, t);
  }
  CheckCoolDownTime(e, o = !0, t = !0) {
    var i = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItems();
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            42,
            "[CheckAndUpdateCoolDownTime] GetTeamItems失败",
          ),
        !1
      );
    let r = 0,
      n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const l of i) {
      if (l.GetConfigId === e) {
        n = l.GetPlayerId();
        break;
      }
      r++;
    }
    var i = Time_1.Time.Now - this.CurrentRoleTime[r],
      s = i >= this.RoletervalTime;
    i < this.RoletervalTime &&
      t &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Game.Role] PostEvent 角色CD中，取消触发角色语音",
        ["RoleId", e],
        ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)],
        [
          "剩余时间/秒",
          (this.RoletervalTime - i) / CommonDefine_1.MILLIONSECOND_PER_SECOND,
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
            42,
            "[CheckAndUpdateCoolDownTime] GetCurrentTeamListById失败",
          ),
        !1)
      : ((i = Time_1.Time.Now - this.CurrentTeamTime[a]),
        (s = s && i >= this.TeamIntervalTime),
        i < this.TeamIntervalTime &&
          t &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[Game.Role] PostEvent 队伍CD中，取消触发角色语音",
            ["RoleId", e],
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(this.Type)],
            [
              "剩余时间/秒",
              (this.TeamIntervalTime - i) /
                CommonDefine_1.MILLIONSECOND_PER_SECOND,
            ],
            [
              "CD/秒",
              this.TeamIntervalTime / CommonDefine_1.MILLIONSECOND_PER_SECOND,
            ],
          ),
        s &&
          o &&
          ((this.CurrentRoleTime[r] = Time_1.Time.Now),
          (this.CurrentTeamTime[a] = Time_1.Time.Now)),
        s);
  }
}
class RoleAudioController extends ControllerBase_1.ControllerBase {
  static sca() {
    for (const e of [
      0, 1001, 1002, 1003, 1004, 10041, 10042, 1005, 1006, 1007, 2001, 2002,
      2004, 2005, 2006, 2007, 2008,
    ])
      this.aca.set(e, new RoleAudioCoolDownTime(e));
  }
  static OnInit() {
    return (
      this.sca(),
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
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.dLe,
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
      this.BKa
        ? (this.bKa(), (this.Pln = Time_1.Time.Now))
        : Global_1.Global.BaseCharacter &&
          this.ActorComponent &&
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
          !ModelManager_1.ModelManager.GameModeModel.IsTeleport &&
          (this.ActorComponent?.MoveComp?.IsMoving
            ? (this.Phn = MIN_INTERVAL_TIME)
            : (this.Phn = INTERVAL_TIME),
          Time_1.Time.Now - this.Pln < this.Phn ||
            ((this.Pln = Time_1.Time.Now), this.SetUpdateAudioDynamicTrace())),
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
    (this.qKa = e), this.BKa || ((this.BKa = !0), (this.OKa = !1));
  }
  static bKa() {
    var e = ue_1.KuroAudioStatics.GetAudioEnvironmentSubsystem(
      Info_1.Info.World,
    );
    e
      ? this.OKa
        ? (e?.DynamicReverbApply(),
          (this.OKa = !1),
          (this.BKa = !1),
          this.qKa && this.SetUpdateAudioDynamicTrace(!0))
        : this.ActorComponent
          ? (e?.D_DynamicReverbTrace(
              this.ActorComponent.ActorLocation,
              this.qKa,
            ),
            (this.qKa = !1),
            (this.OKa = !0))
          : (this.BKa = !1)
      : ((this.OKa = !1), (this.BKa = !1));
  }
  static PlayRoleAudio(e, o) {
    var t = e?.GetComponent(3),
      i = e?.GetComponent(187),
      r = i?.GetAkComponent();
    e &&
      t &&
      i &&
      r &&
      i.Config &&
      this.xzs(
        t.CreatureData.GetPbDataId(),
        r,
        o,
        RoleAudioController.GetRoleAudioConfig(i.Config, o),
      );
  }
  static xzs(e, o, t, i) {
    var r;
    this.aca.get(0).CheckProbabilitiesCoolDown(e, !0, !1) &&
      (this.ActorComponent?.Entity.GetComponent(44)?.IsInRoll()
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[Game.Role] PostEvent 特殊移动模式下不触发角色语音",
            ["RoleId", e],
            ["Event", i],
            ["Owner", o.GetOwner()?.GetName()],
            ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(t)],
          )
        : (r = this.aca.get(t))
          ? !i || i.length < 1
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Audio",
                42,
                "event为空 在尝试播放角色未配置的语音",
                ["RoleId", e],
                ["Event", i],
                ["Owner", o.GetOwner()?.GetName()],
                ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(t)],
              )
            : r.CheckProbabilitiesCoolDown(e) &&
              (AudioSystem_1.AudioSystem.PostEvent(i, o),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Game.Role] PostEvent 触发角色语音",
                ["RoleId", e],
                ["Event", i],
                ["Owner", o.GetOwner()?.GetName()],
                ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(t)],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              42,
              "IntervalCoolDownTimeMap没注册音频配置数据",
              ["AudioType", RoleAudioController.GetRoleAudioTypeDesc(t)],
            ));
  }
  static OnPlayerIsHit(e) {
    TimerSystem_1.TimerSystem.Next(() => {
      this.PlayRoleAudio(e, 2007);
    });
  }
  static OnPlayerEnterFight(e, o) {
    o < ENTER_FIGHT_DISTANCE || e.Id !== Global_1.Global.BaseCharacter?.EntityId
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[Game.Role] 触发进战语音距离不满足或非前台角色",
          ["Dist", o],
          ["Id", e.Id],
          ["Global", Global_1.Global.BaseCharacter?.EntityId],
        )
      : this.PlayRoleAudio(e, 2006);
  }
  static OnMoveStateChange(e, o) {
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        this.PlayRoleAudio(o, 1002);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
        this.PlayRoleAudio(o, 2008);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        TimerSystem_1.TimerSystem.Next(() => {
          this.PlayRoleAudio(o, 1001);
        });
    }
  }
  static OnPlayerDies(e) {
    var o = e?.GetComponent(3),
      t = e?.GetComponent(187),
      i = t?.GetAkComponent();
    e &&
      o &&
      t &&
      i &&
      t.Config &&
      e.Id === Global_1.Global.BaseCharacter?.EntityId &&
      (AudioSystem_1.AudioSystem.PostEvent(t.Config.DeathEvent, i),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Game.Role] PostEvent 触发角色语音",
        ["RoleId", o.CreatureData.GetPbDataId()],
        ["Event", t.Config.DeathEvent],
        ["Owner", i.GetOwner()?.GetName()],
      );
  }
  static GetRoleAudioConfig(e, o) {
    switch (o) {
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
            Log_1.Log.Error("Audio", 42, "[GetRoleAudioConfig] 错误的类型", [
              "type",
              o,
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
      case 10041:
      case 10042:
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
  (RoleAudioController.aca = new Map()),
  (RoleAudioController.Phn = INTERVAL_TIME),
  (RoleAudioController.Pln = 0),
  (RoleAudioController.OKa = !1),
  (RoleAudioController.BKa = !1),
  (RoleAudioController.qKa = !1),
  (RoleAudioController.yzo = (e, o, t) => {
    e = EntitySystem_1.EntitySystem.Get(e);
    e && (fixHookSkillIds.has(o) || 210001 === o) && _a.PlayRoleAudio(e, 1005);
  }),
  (RoleAudioController.Crl = []),
  (RoleAudioController.grl = []),
  (RoleAudioController.dLe = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Game.Role] 随队伍预加载角色Foley和脚步声音效",
      ),
      (_a.grl.length = 0),
      _a.grl.push(..._a.Crl),
      (_a.Crl.length = 0);
    for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      var e = o.Entity?.CheckGetComponent(187);
      e?.Config &&
        (_a.Crl.includes(e.Config.FootstepEvent) ||
          _a.Crl.push(e.Config.FootstepEvent),
        _a.Crl.includes(e.Config.FoleyEvent) ||
          _a.Crl.push(e.Config.FoleyEvent));
    }
    for (const t of _a.grl)
      _a.Crl.includes(t) || AudioSystem_1.AudioSystem.ReleaseAudioEvent(t);
    for (const i of _a.Crl)
      _a.grl.includes(i) || AudioSystem_1.AudioSystem.PreloadAudioEvent(i);
  }),
  (RoleAudioController.xie = (e, o) => {
    (_a.ActorComponent = e.Entity?.CheckGetComponent(3)),
      (_a.AudioComponent = e.Entity?.CheckGetComponent(187)),
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
          42,
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
  (RoleAudioController.Pni = (o, t, i) => {
    if (
      !(
        1 !== o ||
        i < t ||
        ModelManager_1.ModelManager.SceneTeamModel?.ChangingRole
      )
    ) {
      o = FormationAttributeController_1.FormationAttributeController.GetMax(1);
      if (!(t / o > _a.Sir)) {
        var t = _a.AudioComponent?.GetAkComponent(),
          r = _a.AudioComponent?.Config?.LowStrengthEvent;
        if (_a.ActorComponent && t && r) {
          var n = _a.aca.get(10041),
            s = _a.aca.get(10042);
          if (n && s) {
            var a = _a.ActorComponent.CreatureData.GetPbDataId();
            if (n.CheckCoolDownTime(a, !1) && s.CheckCoolDownTime(a, !1)) {
              let e = !1;
              (e = (i / o > _a.Sir ? n : s).CheckProbabilitiesCoolDown(
                a,
                !0,
              )) &&
                _a.xzs(
                  _a.ActorComponent.CreatureData.GetPbDataId(),
                  t,
                  1004,
                  r,
                );
            }
          }
        }
      }
    }
  });
//# sourceMappingURL=RoleAudioController.js.map
