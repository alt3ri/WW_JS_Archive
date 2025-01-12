"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogController = void 0);
const Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
  LogReportController_1 = require("../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
  CharacterGasDebugComponent_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent"),
  LOG_SWITCH = !1,
  FRAMING_LOG_NUM = 20;
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
    return Net_1.Net.Register(27260, this.SLn), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(27260), !0;
  }
  static qfr(o) {
    LogController.Gfr === TickSystem_1.TickSystem.InvalidId &&
      (LogController.Gfr = TickSystem_1.TickSystem.Add(
        LogController.Nfr,
        "LogReportFraming",
        2,
      ).Id),
      this.Ofr.push(o);
  }
  static LogBattleStartPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-开始战斗日志", ["内容", o]),
      e ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogBattleEndPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-战斗结算日志", ["内容", o]),
      e ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogSingleCharacterStatusPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-单个角色日志", ["内容", o]),
      e ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogSingleMonsterStatusPush(o, e = !1) {
    LOG_SWITCH &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 29, "日志上报-单个怪物日志", ["内容", o]),
      e ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogCharacterDeathPush(o, e, t = !1) {
    var r,
      l = new LogReportDefine_1.DeathRecord();
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
            ? this.qfr(l)
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
      t ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogMonsterSkillReportPush(o, e, t = !1) {
    (o.s_reports = Json_1.Json.Stringify(e)),
      LOG_SWITCH &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 29, "日志上报-怪物技能日志", [
          "内容",
          o.s_reports,
        ]),
      t ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogDoubleBallReport(o, e, t = !1) {
    (o.s_reports = Json_1.Json.Stringify(Array.from(e.values()))),
      LOG_SWITCH &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 29, "日志上报-协奏作用日志", ["内容", o]),
      t ? this.qfr(o) : LogReportController_1.LogReportController.LogReport(o);
  }
  static LogTriggerBuffDamagePush(o) {
    var e = new LogReportDefine_1.TriggerBuffDamageRecord();
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
    var o = new DebugInfo(
      Protocol_1.Aki.Protocol.XFs[
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
        .GetComponent(183)
        .GetAllBuffs()
        .map((o) => String(o.Id)),
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
          var e,
            t,
            r,
            l = o.Entity?.GetComponent(3),
            a = o.Entity?.GetComponent(192);
          l &&
            a &&
            ((e = o.Entity?.GetComponent(0)),
            (t = o.Entity?.GetComponent(188)),
            (r = o.Entity?.GetComponent(91)),
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
    var o = new Protocol_1.Aki.Protocol.Debug.bZn();
    (o.AKn = LogController.OutputDebugInfo()),
      Net_1.Net.Call(23450, o, (o) => {
        o &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Log", 38, "[Debug]服务器端战斗状态信息打印");
      });
  }
}
((exports.LogController = LogController).Gfr =
  TickSystem_1.TickSystem.InvalidId),
  (LogController.Ofr = new Array()),
  (LogController.kfr = FRAMING_LOG_NUM),
  (LogController.Ffr = void 0),
  (LogController.Nfr = () => {
    var o = LogController.kfr;
    let e = 0,
      t = LogController.Ofr.shift();
    for (; e < o && t; )
      LogReportController_1.LogReportController.LogReport(t),
        (e += 1),
        (t = LogController.Ofr.shift());
    0 === LogController.Ofr.length &&
      (TickSystem_1.TickSystem.Remove(LogController.Gfr),
      (LogController.Gfr = TickSystem_1.TickSystem.InvalidId));
  }),
  (LogController.SLn = (o) => {
    LogController.RequestOutputDebugInfo();
  });
//# sourceMappingURL=LogController.js.map
