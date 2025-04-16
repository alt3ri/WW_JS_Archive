"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AceAntiCheatController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
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
  InputController_1 = require("../../Input/InputController"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  POSTICKTIME = 1e3,
  POSTICKCOUNT = 120,
  MINSPEEDINIT = 999999;
class AceAntiCheatController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(27352, AceAntiCheatController.PTa), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(27352), !0;
  }
  static OnTick(t) {
    var e;
    if (
      (this.wTa &&
        0 <
          (e =
            Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorVelocityProxy.Size() ??
            0) &&
        ((this.BTa = (this.bTa * this.BTa + e) / (this.bTa + 1)),
        (this.bTa += 1),
        e < this.qTa && (this.qTa = e),
        e > this.nun) &&
        (this.nun = e),
      this.GTa && this.OTa && ((this.kTa += t), this.kTa > POSTICKTIME))
    ) {
      this.kTa -= POSTICKTIME;
      for (const r of this.OTa.keys()) {
        var o,
          i =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              r,
            )?.Entity?.GetComponent(1)?.ActorLocationProxy;
        i &&
          ((o = this.OTa.get(r).rS_).push(i), o.length > POSTICKCOUNT) &&
          (this.GTa = !1);
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
      Log_1.Log.Error("Net", 35, "StartSecFbRound playerId Error");
  }
  static NTa(t) {
    var e, o;
    0 < this.FTa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "StartSecFbRound repeat", ["logId", t])
      : ((this.FTa = t),
        (this.VTa = Time_1.Time.WorldTime),
        ((e = Protocol_1.Aki.Protocol.zd_.create()).HTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.jTa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (o = this.YNr())
          ? ((e.WTa = o[0] ? this.QTa(o[0]) : void 0),
            (e.KTa = o[1] ? this.QTa(o[1]) : void 0),
            (e.$Ta = o[2] ? this.QTa(o[2]) : void 0),
            (e.XTa = o[3] ? this.QTa(o[3]) : void 0),
            this.YTa(!0),
            Net_1.Net.Call(20419, e, () => {}))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Net", 35, "StartSecFbRound roleList Error", [
              "logId",
              t,
            ]));
  }
  static QTa(t) {
    var e = Protocol_1.Aki.Protocol.ZL_.create(),
      o = ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t.RoleId),
      i = o?.GetLevelData();
    (e.txs = i?.GetBreachLevel() ?? 0),
      (e.F6n = i?.GetLevel() ?? 0),
      (e.U8n = i?.GetExp() ?? 0),
      (e.Q6n = t.RoleId);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      t.CreatureDataId,
    )?.Entity?.GetComponent(171);
    if (r) {
      var a = [];
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var l = Protocol_1.Aki.Protocol.Xks.create();
        (l.s5n = t), (l.e5n = r.GetCurrentValue(t)), a.push(l);
      }
      e.JTa = a;
    }
    var s = o?.GetSkillData(),
      i = s?.GetSkillList();
    if (s && i) {
      var n = [];
      for (const h of i) {
        var _ = Protocol_1.Aki.Protocol.zTa.create();
        (_.r5n = h.Id), (_.F6n = s.GetSkillLevel(h.Id)), n.push(_);
      }
      e.zTa = n;
    }
    return e;
  }
  static YTa(t) {
    (this.wTa = t),
      (this.bTa = 0),
      (this.BTa = 0),
      (this.nun = 0),
      (this.qTa = MINSPEEDINIT);
  }
  static ZTa(t) {
    var e;
    this.FTa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          35,
          "EndSecFbRound logId Error",
          ["logId", t],
          ["SecFbRoundLogId", this.FTa],
        )
      : (((e = Protocol_1.Aki.Protocol.tm_.create()).HTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.eLa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.tLa = Time_1.Time.WorldTime - this.VTa),
        (e.iLa = this.nun),
        (e.rLa = this.qTa === MINSPEEDINIT ? 0 : this.qTa),
        (e.oLa = this.BTa),
        this.YTa(!1),
        Net_1.Net.Call(29862, e, () => {}),
        (this.FTa = -1n));
  }
  static nLa(t) {
    0 < this.sLa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "StartSecRoleFightFlowBigWorld repeat", [
          "logId",
          t,
        ])
      : (this.aLa(), (this.sLa = t));
  }
  static hLa(t) {
    this.sLa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          35,
          "EndSecRoleFightFlowBigWorld logId Error",
          ["logId", t],
          ["SecRoleFightFlowBigWorldLogId", this.sLa],
        )
      : (this.lLa(
          t,
          Protocol_1.Aki.Protocol.JL_
            .Proto_LogType_SecRoleFightFlow_BigWorldEnd,
        ),
        (this.sLa = -1n));
  }
  static aLa() {
    var t = this.YNr();
    if (t) {
      for (const i of (this._La = t)) {
        this.OTa || (this.OTa = new Map()),
          this.OTa.get(i.CreatureDataId) ||
            (((e = Protocol_1.Aki.Protocol.ew_.create()).uLa = i.RoleId),
            this.OTa.set(i.CreatureDataId, e));
        var e = this.QTa(i),
          o =
            ((this.OTa.get(i.CreatureDataId).cLa = e),
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              i.CreatureDataId,
            )),
          o = o?.Entity;
        o
          ? (o.GetComponent(170)?.AddGeneralListener(this.qbr),
            EventSystem_1.EventSystem.HasWithTarget(
              o,
              EventDefine_1.EEventName.CharDamage,
              this.Uie,
            ) ||
              EventSystem_1.EventSystem.AddWithTarget(
                o,
                EventDefine_1.EEventName.CharDamage,
                this.Uie,
              ),
            (this.GTa = !0),
            this.jhh(o.Id))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Net",
              35,
              "StartColletRoleFightFlow roleEntity Error",
            );
      }
      this.mLa = Time_1.Time.WorldTime;
      t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
        Global_1.Global.BaseCharacter?.EntityId ?? 0,
      );
      (this.dLa = t?.Entity?.GetComponent(0).GetCreatureDataId()),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie,
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 35, "StartColletRoleFightFlow roleList Error");
  }
  static lLa(t, e) {
    if (this._La && this.OTa) {
      var o,
        i = Protocol_1.Aki.Protocol.rm_.create(),
        r =
          ((i.HTa = MathUtils_1.MathUtils.BigIntToLong(t)),
          (i.D6n = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
          []),
        t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
          Global_1.Global.BaseCharacter?.EntityId ?? 0,
        )
          ?.Entity?.GetComponent(0)
          .GetCreatureDataId();
      t &&
        this.OTa.get(t) &&
        ((o = MathUtils_1.MathUtils.LongToNumber(this.OTa.get(t).CLa)),
        (this.OTa.get(t).CLa = Time_1.Time.WorldTime - this.mLa + o));
      for (const l of this.OTa.values()) r.push(l);
      (i.gLa = r), (i.fLa = e), Net_1.Net.Call(23472, i, () => {});
      for (const s of this._La) {
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          s.CreatureDataId,
        )?.Entity;
        a
          ? (a.GetComponent(170)?.RemoveGeneralListener(this.qbr),
            EventSystem_1.EventSystem.RemoveWithTarget(
              a,
              EventDefine_1.EEventName.CharDamage,
              this.Uie,
            ),
            (this.GTa = !1))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Net",
              35,
              "StartColletRoleFightFlow roleEntity Error",
            );
      }
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
        this.Whh(),
        (this.OTa = void 0),
        (this._La = void 0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Net", 35, "SendRoleFightFlowRequest List Error");
  }
  static pLa(t) {
    0 < this.vLa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "StartSecRoleFightFlowInst repeat", [
          "logId",
          t,
        ])
      : (this.aLa(), (this.vLa = t));
  }
  static MLa(t) {
    this.vLa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          35,
          "EndSecRoleFightFlowInst logId Error",
          ["logId", t],
          ["SecRoleFightFlowInstLogId", this.vLa],
        )
      : (this.lLa(
          t,
          Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_InstEnd,
        ),
        (this.vLa = -1n));
  }
  static SLa(t, e) {
    0 < this.ELa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "StartSecFbRound repeat", ["logId", t])
      : ((this.ELa = t),
        this.YTa(!0),
        (this.yLa = TimerSystem_1.TimerSystem.Delay(() => {
          (this.yLa = void 0), this.ILa(this.ELa);
        }, e)));
  }
  static ILa(t) {
    var e;
    this.ELa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          35,
          "EndSecWorldInfoFlow logId Error",
          ["logId", t],
          ["SecWorldInfoFlowLogId", this.ELa],
        )
      : (this.yLa &&
          (TimerSystem_1.TimerSystem.Remove(this.yLa), (this.yLa = void 0)),
        ((e = Protocol_1.Aki.Protocol.nm_.create()).HTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.D6n = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.iLa = this.nun),
        (e.rLa = this.qTa === MINSPEEDINIT ? 0 : this.qTa),
        (e.oLa = this.BTa),
        this.YTa(!1),
        Net_1.Net.Call(23430, e, () => {}),
        (this.ELa = -1n));
  }
  static TLa(t) {
    var e, o;
    0 < this.LLa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "StartSecFbRound repeat", ["logId", t])
      : ((this.LLa = t),
        (this.VTa = Time_1.Time.WorldTime),
        ((e = Protocol_1.Aki.Protocol.am_.create()).HTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.jTa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (o = this.YNr())
          ? ((e.WTa = o[0] ? this.QTa(o[0]) : void 0),
            (e.KTa = o[1] ? this.QTa(o[1]) : void 0),
            (e.$Ta = o[2] ? this.QTa(o[2]) : void 0),
            (e.XTa = o[3] ? this.QTa(o[3]) : void 0),
            this.YTa(!0),
            Net_1.Net.Call(25884, e, () => {}))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Net", 35, "StartSecWorldFlow roleList Error", [
              "logId",
              t,
            ]));
  }
  static DLa(t) {
    var e;
    this.LLa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Net",
          35,
          "EndSecWorldFlow logId Error",
          ["logId", t],
          ["SecWorldFlowLogId", this.LLa],
        )
      : ((this.LLa = -1n),
        ((e = Protocol_1.Aki.Protocol.lm_.create()).HTa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.eLa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.tLa = Time_1.Time.WorldTime - this.VTa),
        (e.iLa = this.nun),
        (e.rLa = this.qTa === MINSPEEDINIT ? 0 : this.qTa),
        (e.oLa = this.BTa),
        this.YTa(!1),
        Net_1.Net.Call(22014, e, () => {}));
  }
  static jhh(t) {
    var e = InputController_1.InputController.CreateInputLayer(99);
    e &&
      (InputController_1.InputController.AddInputLayer(t, e),
      this.whh || (this.whh = []),
      this.whh.push(e));
  }
  static Whh() {
    if (this.whh) {
      for (const t of this.whh)
        t.Clear(), InputController_1.InputController.RemoveInputLayer(t);
      this.whh = void 0;
    }
  }
  static HandlePress(t, e) {
    this.LZo(t, e);
  }
}
(exports.AceAntiCheatController = AceAntiCheatController),
  ((_a = AceAntiCheatController).FTa = -1n),
  (AceAntiCheatController.sLa = -1n),
  (AceAntiCheatController.vLa = -1n),
  (AceAntiCheatController.ELa = -1n),
  (AceAntiCheatController.LLa = -1n),
  (AceAntiCheatController.whh = void 0),
  (AceAntiCheatController.PTa = (t) => {
    var e = MathUtils_1.MathUtils.LongToBigInt(t.HTa);
    switch (t.fLa) {
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecGetReportData2Flow:
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecFBRoundStartFlow:
        _a.NTa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecFBRoundEndFlow:
        _a.ZTa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_
        .Proto_LogType_SecRoleFightFlow_BigWorldStart:
        _a.nLa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_
        .Proto_LogType_SecRoleFightFlow_BigWorldEnd:
        _a.hLa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_InstStart:
        _a.pLa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecRoleFightFlow_InstEnd:
        _a.MLa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldInfoFlow_Start:
        _a.SLa(e, MathUtils_1.MathUtils.LongToNumber(t.Hy_));
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldInfoFlow_End:
        _a.ILa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldStartFlow:
        _a.TLa(e);
        break;
      case Protocol_1.Aki.Protocol.JL_.Proto_LogType_SecWorldSEndFlow:
        _a.DLa(e);
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Net", 35, "UnknownAntiCheatingLogType", [
            "Type",
            t.fLa,
          ]);
    }
  }),
  (AceAntiCheatController.VTa = 0),
  (AceAntiCheatController.BTa = 0),
  (AceAntiCheatController.qTa = 0),
  (AceAntiCheatController.nun = 0),
  (AceAntiCheatController.bTa = 0),
  (AceAntiCheatController.wTa = !1),
  (AceAntiCheatController.GTa = !1),
  (AceAntiCheatController.kTa = 0),
  (AceAntiCheatController._La = void 0),
  (AceAntiCheatController.OTa = void 0),
  (AceAntiCheatController.mLa = 0),
  (AceAntiCheatController.dLa = void 0),
  (AceAntiCheatController.qbr = (t, e, o) => {
    if (_a.OTa)
      for (const r of _a.OTa.keys()) {
        const o =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(r)
            ?.Entity?.GetComponent(170)
            ?.GetCurrentValue(t) ?? 0;
        var i = _a.OTa.get(r).cLa.JTa[t - 1];
        i && i.s5n === t && i.e5n < o && (i.e5n = o);
      }
    else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "SetNewAttrMaxValue FightRoleInfoMap nil");
  }),
  (AceAntiCheatController.Uie = (t, e, o, i) => {
    if (_a.OTa) {
      i = i.Damage;
      if (0 !== i) {
        var r = -i;
        for (const l of _a.OTa.keys()) {
          var a = t.GetComponent(0).GetCreatureDataId();
          l === a &&
            (((a = _a.OTa.get(l)).ALa =
              r + MathUtils_1.MathUtils.LongToNumber(a.ALa)),
            (a.RLa += 1),
            (a.ULa += o.IsImmune ? 1 : 0),
            o.IsCritical
              ? ((a.xLa += 1),
                r > a.PLa && (a.PLa = r),
                r < a.wLa && (a.wLa = r))
              : (r > a.BLa && (a.BLa = r), r < a.bLa && (a.bLa = r)));
        }
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Net", 35, "OnDamage FightRoleInfoMap nil");
  }),
  (AceAntiCheatController.LZo = (t, e) => {
    if (_a.dLa && _a.OTa) {
      var o = _a.OTa.get(_a.dLa);
      if (o)
        switch (t) {
          case InputEnums_1.EInputAction.攻击:
            o.qLa += 1;
            break;
          case InputEnums_1.EInputAction.闪避:
            o.GLa += 1;
            break;
          case InputEnums_1.EInputAction.跳跃:
            o.OLa += 1;
            break;
          case InputEnums_1.EInputAction.大招:
            o.kLa += 1;
            break;
          case InputEnums_1.EInputAction.幻象2:
            o.NLa += 1;
            break;
          case InputEnums_1.EInputAction.技能1:
            o.FLa += 1;
        }
    }
  }),
  (AceAntiCheatController.xie = (t, e) => {
    var o;
    e &&
      _a.OTa &&
      ((e = e.Entity?.GetComponent(0).GetCreatureDataId()) &&
        _a.OTa.get(e) &&
        ((o = MathUtils_1.MathUtils.LongToNumber(_a.OTa.get(e).CLa)),
        (_a.OTa.get(e).CLa = Time_1.Time.WorldTime - _a.mLa + o)),
      (_a.mLa = Time_1.Time.WorldTime),
      (_a.dLa = t.Entity?.GetComponent(0).GetCreatureDataId()));
  }),
  (AceAntiCheatController.yLa = void 0);
//# sourceMappingURL=AceAntiCheatController.js.map
