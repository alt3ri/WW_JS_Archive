"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AceAntiCheatController = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  POSTICKTIME = 1e3,
  POSTICKCOUNT = 120,
  REPORTDATA2TIME = 6e4,
  MINSPEEDINIT = 999999;
class AceAntiCheatController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(20404, AceAntiCheatController.ATa),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(20404),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      !0
    );
  }
  static OnTick(t) {
    var e;
    if (
      (this.RTa &&
        0 <
          (e =
            Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorVelocityProxy.Size() ??
            0) &&
        ((this.UTa = (this.xTa * this.UTa + e) / (this.xTa + 1)),
        (this.xTa += 1),
        e < this.PTa && (this.PTa = e),
        e > this.nun) &&
        (this.nun = e),
      this.wTa && this.BTa && ((this.bTa += t), this.bTa > POSTICKTIME))
    ) {
      this.bTa -= POSTICKTIME;
      for (const r of this.BTa.keys()) {
        var o,
          i =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              r,
            )?.Entity?.GetComponent(1)?.ActorLocationProxy;
        i &&
          ((o = this.BTa.get(r).sih).push(i), o.length > POSTICKCOUNT) &&
          (this.wTa = !1);
      }
    }
  }
  static YNr() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (t)
      return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamPlayerData(t)
        ?.GetGroup(1)
        ?.GetRoleList();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Net", 36, "StartSecFbRound playerId Error");
  }
  static qTa(t) {
    var e, o;
    0 < this.GTa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 36, "StartSecFbRound repeat", ["logId", t])
      : ((this.GTa = t),
        (this.OTa = Time_1.Time.WorldTime),
        ((e = Protocol_1.Aki.Protocol.zZa.create()).kTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.NTa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (o = this.YNr())
          ? ((e.FTa = o[0] ? this.VTa(o[0]) : void 0),
            (e.HTa = o[1] ? this.VTa(o[1]) : void 0),
            (e.jTa = o[2] ? this.VTa(o[2]) : void 0),
            (e.WTa = o[3] ? this.VTa(o[3]) : void 0),
            this.QTa(!0),
            Net_1.Net.Call(26143, e, () => {}))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Net", 36, "StartSecFbRound roleList Error", [
              "logId",
              t,
            ]));
  }
  static VTa(t) {
    var e = Protocol_1.Aki.Protocol.Qrh.create(),
      o = ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t.RoleId),
      i = o?.GetLevelData();
    (e.txs = i?.GetBreachLevel() ?? 0),
      (e.F6n = i?.GetLevel() ?? 0),
      (e.U8n = i?.GetExp() ?? 0),
      (e.Q6n = t.RoleId);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      t.CreatureDataId,
    )?.Entity?.GetComponent(159);
    if (r) {
      var a = [];
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var l = Protocol_1.Aki.Protocol.Xks.create();
        (l.s5n = t), (l.e5n = r.GetCurrentValue(t)), a.push(l);
      }
      e.KTa = a;
    }
    var s = o?.GetSkillData(),
      i = s?.GetSkillList();
    if (s && i) {
      var _ = [];
      for (const h of i) {
        var n = Protocol_1.Aki.Protocol.$Ta.create();
        (n.r5n = h.Id), (n.F6n = s.GetSkillLevel(h.Id)), _.push(n);
      }
      e.$Ta = _;
    }
    return e;
  }
  static QTa(t) {
    (this.RTa = t),
      (this.xTa = 0),
      (this.UTa = 0),
      (this.nun = 0),
      (this.PTa = MINSPEEDINIT);
  }
  static XTa(t) {
    var e;
    this.GTa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          36,
          "EndSecFbRound logId Error",
          ["logId", t],
          ["SecFbRoundLogId", this.GTa],
        )
      : (((e = Protocol_1.Aki.Protocol.teh.create()).kTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.YTa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.JTa = Time_1.Time.WorldTime - this.OTa),
        (e.zTa = this.nun),
        (e.ZTa = this.PTa === MINSPEEDINIT ? 0 : this.PTa),
        (e.eLa = this.UTa),
        this.QTa(!1),
        Net_1.Net.Call(18558, e, () => {}),
        (this.GTa = -1n));
  }
  static tLa(t) {
    0 < this.iLa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 36, "StartSecRoleFightFlowBigWorld repeat", [
          "logId",
          t,
        ])
      : (this.rLa(), (this.iLa = t));
  }
  static oLa(t) {
    this.iLa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          36,
          "EndSecRoleFightFlowBigWorld logId Error",
          ["logId", t],
          ["SecRoleFightFlowBigWorldLogId", this.iLa],
        )
      : (this.nLa(
          t,
          Protocol_1.Aki.Protocol.Wrh
            .Proto_LogType_SecRoleFightFlow_BigWorldEnd,
        ),
        (this.iLa = -1n));
  }
  static rLa() {
    var t = this.YNr();
    if (t) {
      for (const i of (this.sLa = t)) {
        this.BTa || (this.BTa = new Map()),
          this.BTa.get(i.CreatureDataId) ||
            (((e = Protocol_1.Aki.Protocol.Krh.create()).aLa = i.RoleId),
            this.BTa.set(i.CreatureDataId, e));
        var e = this.VTa(i),
          o =
            ((this.BTa.get(i.CreatureDataId).hLa = e),
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              i.CreatureDataId,
            )),
          o = o?.Entity;
        o
          ? (o.GetComponent(158)?.AddGeneralListener(this.qbr),
            EventSystem_1.EventSystem.AddWithTarget(
              o,
              EventDefine_1.EEventName.CharDamage,
              this.Uie,
            ),
            (this.wTa = !0),
            EventSystem_1.EventSystem.AddWithTarget(
              o,
              EventDefine_1.EEventName.CharInputPress,
              this.LZo,
            ))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Net",
              36,
              "StartColletRoleFightFlow roleEntity Error",
            );
      }
      this.lLa = Time_1.Time.WorldTime;
      t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
        Global_1.Global.BaseCharacter?.EntityId ?? 0,
      );
      (this._La = t?.Entity?.GetComponent(0).GetCreatureDataId()),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 36, "StartColletRoleFightFlow roleList Error");
  }
  static nLa(t, e) {
    if (this.sLa && this.BTa) {
      var o,
        i = Protocol_1.Aki.Protocol.reh.create(),
        r =
          ((i.kTa = MathUtils_1.MathUtils.BigIntToLong(t)),
          (i.D6n = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
          []),
        t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
          Global_1.Global.BaseCharacter?.EntityId ?? 0,
        )
          ?.Entity?.GetComponent(0)
          .GetCreatureDataId();
      t &&
        this.BTa.get(t) &&
        ((o = MathUtils_1.MathUtils.LongToNumber(this.BTa.get(t).uLa)),
        (this.BTa.get(t).uLa = Time_1.Time.WorldTime - this.lLa + o));
      for (const l of this.BTa.values()) r.push(l);
      (i.cLa = r), (i.mLa = e), Net_1.Net.Call(28338, i, () => {});
      for (const s of this.sLa) {
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          s.CreatureDataId,
        )?.Entity;
        a
          ? (a.GetComponent(158)?.RemoveGeneralListener(this.qbr),
            EventSystem_1.EventSystem.RemoveWithTarget(
              a,
              EventDefine_1.EEventName.CharDamage,
              this.Uie,
            ),
            EventSystem_1.EventSystem.RemoveWithTarget(
              a,
              EventDefine_1.EEventName.CharInputPress,
              this.LZo,
            ),
            (this.wTa = !1))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Net",
              36,
              "StartColletRoleFightFlow roleEntity Error",
            );
      }
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
        (this.BTa = void 0),
        (this.sLa = void 0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 36, "SendRoleFightFlowRequest List Error");
  }
  static dLa(t) {
    0 < this.CLa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 36, "StartSecRoleFightFlowInst repeat", [
          "logId",
          t,
        ])
      : (this.rLa(), (this.CLa = t));
  }
  static gLa(t) {
    this.CLa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          36,
          "EndSecRoleFightFlowInst logId Error",
          ["logId", t],
          ["SecRoleFightFlowInstLogId", this.CLa],
        )
      : (this.nLa(
          t,
          Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecRoleFightFlow_InstEnd,
        ),
        (this.CLa = -1n));
  }
  static fLa(t, e) {
    0 < this.pLa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 36, "StartSecFbRound repeat", ["logId", t])
      : ((this.pLa = t),
        this.QTa(!0),
        (this.vLa = TimerSystem_1.TimerSystem.Delay(() => {
          (this.vLa = void 0), this.MLa(this.pLa);
        }, e)));
  }
  static MLa(t) {
    var e;
    this.pLa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          36,
          "EndSecWorldInfoFlow logId Error",
          ["logId", t],
          ["SecWorldInfoFlowLogId", this.pLa],
        )
      : (this.vLa &&
          (TimerSystem_1.TimerSystem.Remove(this.vLa), (this.vLa = void 0)),
        ((e = Protocol_1.Aki.Protocol.neh.create()).kTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.D6n = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.zTa = this.nun),
        (e.ZTa = this.PTa === MINSPEEDINIT ? 0 : this.PTa),
        (e.eLa = this.UTa),
        this.QTa(!1),
        Net_1.Net.Call(16235, e, () => {}),
        (this.pLa = -1n));
  }
  static SLa(t) {
    var e, o;
    0 < this.ELa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 36, "StartSecFbRound repeat", ["logId", t])
      : ((this.ELa = t),
        (this.OTa = Time_1.Time.WorldTime),
        ((e = Protocol_1.Aki.Protocol.aeh.create()).kTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.NTa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (o = this.YNr())
          ? ((e.FTa = o[0] ? this.VTa(o[0]) : void 0),
            (e.HTa = o[1] ? this.VTa(o[1]) : void 0),
            (e.jTa = o[2] ? this.VTa(o[2]) : void 0),
            (e.WTa = o[3] ? this.VTa(o[3]) : void 0),
            this.QTa(!0),
            Net_1.Net.Call(23385, e, () => {}))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Net", 36, "StartSecWorldFlow roleList Error", [
              "logId",
              t,
            ]));
  }
  static yLa(t) {
    var e;
    this.ELa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          36,
          "EndSecWorldFlow logId Error",
          ["logId", t],
          ["SecWorldFlowLogId", this.ELa],
        )
      : ((this.ELa = -1n),
        ((e = Protocol_1.Aki.Protocol.leh.create()).kTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.YTa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.JTa = Time_1.Time.WorldTime - this.OTa),
        (e.zTa = this.nun),
        (e.ZTa = this.PTa === MINSPEEDINIT ? 0 : this.PTa),
        (e.eLa = this.UTa),
        this.QTa(!1),
        Net_1.Net.Call(20704, e, () => {}));
  }
}
(exports.AceAntiCheatController = AceAntiCheatController),
  ((_a = AceAntiCheatController).GTa = -1n),
  (AceAntiCheatController.iLa = -1n),
  (AceAntiCheatController.CLa = -1n),
  (AceAntiCheatController.pLa = -1n),
  (AceAntiCheatController.ELa = -1n),
  (AceAntiCheatController.ATa = (t) => {
    var e = MathUtils_1.MathUtils.LongToBigInt(t.kTa);
    switch (t.mLa) {
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecGetReportData2Flow:
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecFBRoundStartFlow:
        _a.qTa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecFBRoundEndFlow:
        _a.XTa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh
        .Proto_LogType_SecRoleFightFlow_BigWorldStart:
        _a.tLa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh
        .Proto_LogType_SecRoleFightFlow_BigWorldEnd:
        _a.oLa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecRoleFightFlow_InstStart:
        _a.dLa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecRoleFightFlow_InstEnd:
        _a.gLa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecWorldInfoFlow_Start:
        _a.fLa(e, MathUtils_1.MathUtils.LongToNumber(t.Qth));
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecWorldInfoFlow_End:
        _a.MLa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecWorldStartFlow:
        _a.SLa(e);
        break;
      case Protocol_1.Aki.Protocol.Wrh.Proto_LogType_SecWorldSEndFlow:
        _a.yLa(e);
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 36, "UnknownAntiCheatingLogType", [
            "Type",
            t.mLa,
          ]);
    }
  }),
  (AceAntiCheatController.OTa = 0),
  (AceAntiCheatController.UTa = 0),
  (AceAntiCheatController.PTa = 0),
  (AceAntiCheatController.nun = 0),
  (AceAntiCheatController.xTa = 0),
  (AceAntiCheatController.RTa = !1),
  (AceAntiCheatController.wTa = !1),
  (AceAntiCheatController.bTa = 0),
  (AceAntiCheatController.sLa = void 0),
  (AceAntiCheatController.BTa = void 0),
  (AceAntiCheatController.lLa = 0),
  (AceAntiCheatController._La = void 0),
  (AceAntiCheatController.qbr = (t, e, o) => {
    if (_a.BTa)
      for (const r of _a.BTa.keys()) {
        const o =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(r)
            ?.Entity?.GetComponent(158)
            ?.GetCurrentValue(t) ?? 0;
        var i = _a.BTa.get(r).hLa.KTa[t - 1];
        i && i.s5n === t && i.e5n < o && (i.e5n = o);
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 36, "SetNewAttrMaxValue FightRoleInfoMap nil");
  }),
  (AceAntiCheatController.Uie = (t, e, o, i, r) => {
    if (_a.BTa) {
      var a = -o;
      for (const s of _a.BTa.keys()) {
        var l = t.GetComponent(0).GetCreatureDataId();
        s === l &&
          (((l = _a.BTa.get(s)).ILa =
            a + MathUtils_1.MathUtils.LongToNumber(l.ILa)),
          (l.TLa += 1),
          (l.LLa += r.IsImmune ? 1 : 0),
          r.IsCritical
            ? ((l.DLa += 1), a > l.ALa && (l.ALa = a), a < l.RLa && (l.RLa = a))
            : (a > l.ULa && (l.ULa = a), a < l.xLa && (l.xLa = a)));
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 36, "OnDamage FightRoleInfoMap nil");
  }),
  (AceAntiCheatController.LZo = (t, e) => {
    if (_a._La && _a.BTa) {
      var o = _a.BTa.get(_a._La);
      if (o)
        switch (t) {
          case InputEnums_1.EInputAction.攻击:
            o.PLa += 1;
            break;
          case InputEnums_1.EInputAction.闪避:
            o.wLa += 1;
            break;
          case InputEnums_1.EInputAction.跳跃:
            o.BLa += 1;
            break;
          case InputEnums_1.EInputAction.大招:
            o.bLa += 1;
            break;
          case InputEnums_1.EInputAction.幻象2:
            o.qLa += 1;
            break;
          case InputEnums_1.EInputAction.技能1:
            o.GLa += 1;
        }
    }
  }),
  (AceAntiCheatController.xie = (t, e) => {
    var o;
    e &&
      _a.BTa &&
      ((e = e.Entity?.GetComponent(0).GetCreatureDataId()) &&
        _a.BTa.get(e) &&
        ((o = MathUtils_1.MathUtils.LongToNumber(_a.BTa.get(e).uLa)),
        (_a.BTa.get(e).uLa = Time_1.Time.WorldTime - _a.lLa + o)),
      (_a.lLa = Time_1.Time.WorldTime),
      (_a._La = t.Entity?.GetComponent(0).GetCreatureDataId()));
  }),
  (AceAntiCheatController.vLa = void 0),
  (AceAntiCheatController.OLa = void 0),
  (AceAntiCheatController.ReportDataRequest = () => {
    var t, e;
    Net_1.Net.IsServerConnected() &&
      ((t = Protocol_1.Aki.Protocol.ZZa.create()),
      0 < (e = ue_1.TpSafeProxy.GetAntiData2()).byteLength &&
        (t.kLa = new Uint8Array(e)),
      Net_1.Net.Call(24479, t, () => {}));
  }),
  (AceAntiCheatController.nye = () => {
    _a.OLa ||
      (_a.OLa = TimerSystem_1.TimerSystem.Forever(
        _a.ReportDataRequest,
        REPORTDATA2TIME,
      ));
  });
//# sourceMappingURL=AceAntiCheatController.js.map
