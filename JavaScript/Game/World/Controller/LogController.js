"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogController = void 0);
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationDataController_1 = require("../../Module/Abilities/FormationDataController");
const LogReportController_1 = require("../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const CharacterGasDebugComponent_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent");
const LOG_SWITCH = !1;
const FRAMING_LOG_NUM = 20;
class DebugInfo extends Json_1.JsonObjBase {
  constructor(o, e, t, r, l, a, g, n, _, s, L) {
    super(),
      (this.场景模式 = o),
      (this.是否场景主 = e),
      (this.场景号 = t),
      (this.时间流速 = r),
      (this.玩家Id = l),
      (this.玩家位置 = a),
      (this.是否联机 = g),
      (this.编队玩家 = n),
      (this.队伍buff = _),
      (this.队伍属性 = s),
      (this.编队角色 = L);
  }
}
class LogController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(27316, this.oTn), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(27316), !0;
  }
  static O0r(o) {
    LogController.k0r === TickSystem_1.TickSystem.InvalidId &&
      (LogController.k0r = TickSystem_1.TickSystem.Add(
        LogController.F0r,
        "LogReportFraming",
        2,
      ).Id),
      this.V0r.push(o);
  }
  static LogBattleStartPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-开始战斗日志", ["内容", o]),
      e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogBattleEndPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-战斗结算日志", ["内容", o]),
      e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogSingleCharacterStatusPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-单个角色日志", ["内容", o]),
      e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogSingleMonsterStatusPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-单个怪物日志", ["内容", o]),
      e ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogCharacterDeathPush(o, e, t = !1) {
    let r;
    const l = new LogReportDefine_1.DeathRecord();
    (l.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (l.i_area_level = ModelManager_1.ModelManager.AreaModel.AreaInfo.Level),
      Global_1.Global.BaseCharacter
        ? ((r = Global_1.Global.BaseCharacter.K2_GetActorLocation()),
          (l.f_x = r.X),
          (l.f_y = r.Y),
          (l.f_z = r.Z),
          (l.i_death_reason = e),
          (l.i_death_role_id = o),
          LOG_SWITCH &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 29, "日志上报-单机大世界死亡", [
              "内容",
              l,
            ]),
          t
            ? this.O0r(l)
            : LogReportController_1.LogReportController.LogReport(l))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            4,
            "日志上报-单机大世界死亡，当前不存在Global.BaseCharacter",
            ["roleId", o],
          );
  }
  static LogRoleSkillReportPush(o, e, t = !1) {
    (o.s_reports = Json_1.Json.Stringify(e)),
      LOG_SWITCH &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 29, "日志上报-角色技能日志", [
          "内容",
          o.s_reports,
        ]),
      t ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogMonsterSkillReportPush(o, e, t = !1) {
    (o.s_reports = Json_1.Json.Stringify(e)),
      LOG_SWITCH &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 29, "日志上报-怪物技能日志", [
          "内容",
          o.s_reports,
        ]),
      t ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogDoubleBallReport(o, e, t = !1) {
    (o.s_reports = Json_1.Json.Stringify(Array.from(e.values()))),
      LOG_SWITCH &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 29, "日志上报-协奏作用日志", ["内容", o]),
      t ? this.O0r(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogTriggerBuffDamagePush(o) {
    const e = new LogReportDefine_1.TriggerBuffDamageRecord();
    (e.i_area_id = o.AreaId.toString()),
      (e.s_buff_id = o.BuffId.toString()),
      (e.f_time = o.TimeStamp.toFixed(2)),
      (e.f_player_pos_x = o.Location.X.toFixed(2)),
      (e.f_player_pos_y = o.Location.Y.toFixed(2)),
      (e.f_player_pos_z = o.Location.Z.toFixed(2)),
      (e.i_damage = o.Damage.toString()),
      LOG_SWITCH &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 36, "日志上报-地形机关buff伤害日志", [
          "内容",
          e,
        ]),
      LogReportController_1.LogReportController.LogReport(e);
  }
  static LogElevatorUsedPush(o) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 36, "日志上报-电梯使用日志", ["内容", o]),
      LogReportController_1.LogReportController.LogReport(o);
  }
  static LogInstFightStartPush(o) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-副本开始日志", ["内容", o]),
      LogReportController_1.LogReportController.LogReport(o);
  }
  static LogInstFightEndPush(o) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-副本结束日志", ["内容", o]),
      LogReportController_1.LogReportController.LogReport(o);
  }
  static OutputDebugInfo() {
    const o = new DebugInfo(
      Protocol_1.Aki.Protocol.sOs[
        ModelManager_1.ModelManager.GameModeModel.InstanceType
      ],
      ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId,
      Time_1.Time.TimeDilation,
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      [
        Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.X.toFixed(
          2,
        ),
        Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Y.toFixed(
          2,
        ),
        Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Z.toFixed(
          2,
        ),
      ],
      ModelManager_1.ModelManager.GameModeModel.IsMulti,
      ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer(),
      FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )
        .GetComponent(180)
        .GetAllBuffs()
        .map((o) => o.Id),
      CharacterGasDebugComponent_1.CharacterGasDebugComponent.GetFormationAttributeDebugStrings()
        .replace(/\n/g, ",")
        .replace(/\s/g, ""),
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems().map((o) => ({
        EntityHandleId: o.EntityHandle?.Id,
        ConfigId: o.GetConfigId,
        IsMyRole: o.IsMyRole(),
        IsControl: o.IsControl(),
        IsDead: o.IsDead(),
      })),
    );
    let g = Json_1.Json.Stringify(o);
    return (
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(
        (o) => {
          let e;
          let t;
          let r;
          const l = o.Entity?.GetComponent(3);
          const a = o.Entity?.GetComponent(187);
          l &&
            a &&
            ((e = o.Entity?.GetComponent(0)),
            (t = o.Entity?.GetComponent(185)),
            (r = o.Entity?.GetComponent(89)),
            (g +=
              `
***********
实体信息: EntityHandleId: ${o.Id}, CreatureDataId: ${e?.GetCreatureDataId()}, PbDataId: ${e?.GetPbDataId()}, Type: ${e?.GetEntityType()}, 位置: ${[l?.ActorLocationProxy.X.toFixed(2), l?.ActorLocationProxy.Y.toFixed(2), l?.ActorLocationProxy.Z.toFixed(2)]}, IsInFighting: ${r?.IsInFighting}
Buff信息: ${a?.GetAllBuffs().map((o) => o.Id)}
Tag信息: ` +
              t?.TagContainer.GetExactTagsDebugString()
                .replace(/\n/g, ",")
                .replace(/\s/g, "")));
        },
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          29,
          `本地打印关键信息快照:
` + g,
        ),
      g
    );
  }

  static RequestOutputDebugInfo() {
    const o = new Protocol_1.Aki.Protocol.Debug.NXn();
    (o.X7n = LogController.OutputDebugInfo()),
      Net_1.Net.Call(20558, o, (o) => {
        o &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Log", 38, "[Debug]服务器端战斗状态信息打印");
      });
  }
}
((exports.LogController = LogController).k0r =
  TickSystem_1.TickSystem.InvalidId),
  (LogController.V0r = new Array()),
  (LogController.H0r = FRAMING_LOG_NUM),
  (LogController.j0r = void 0),
  (LogController.F0r = () => {
    const o = LogController.H0r;
    let e = 0;
    let t = LogController.V0r.shift();
    for (; e < o && t; )
      LogReportController_1.LogReportController.LogReport(t),
        (e += 1),
        (t = LogController.V0r.shift());
    LogController.V0r.length === 0 &&
      (TickSystem_1.TickSystem.Remove(LogController.k0r),
      (LogController.k0r = TickSystem_1.TickSystem.InvalidId));
  }),
  (LogController.oTn = (o) => {
    LogController.RequestOutputDebugInfo();
  });
// # sourceMappingURL=LogController.js.map
