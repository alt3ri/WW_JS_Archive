"use strict";
var _a,
  __decorate =
    (this && this.__decorate) ||
    function (e, o, t, l) {
      var r,
        a = arguments.length,
        s =
          a < 3
            ? o
            : null === l
              ? (l = Object.getOwnPropertyDescriptor(o, t))
              : l;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, o, t, l);
      else
        for (var i = e.length - 1; 0 <= i; i--)
          (r = e[i]) &&
            (s = (a < 3 ? r(s) : 3 < a ? r(o, t, s) : r(o, t)) || s);
      return 3 < a && s && Object.defineProperty(o, t, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillMessageController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  CombatMessage_1 = require("./CombatMessage"),
  SKILL_PLAY_MONTAGE = 1;
class SkillMessageController extends ControllerBase_1.ControllerBase {
  static AddSkillMessageId(e) {
    this.UIt.add(e);
  }
  static OnInit() {
    return Net_1.Net.Register(25343, SkillMessageController.$mc), !0;
  }
  static OnClear() {
    return Net_1.Net.UnRegister(25343), SkillMessageController.UIt.clear(), !0;
  }
  static PreUseSkillNotify(e, o) {
    e = e?.GetComponent(54);
    return !(e && !e.PreSwitchRemoteFightState(o.dVn.mVn));
  }
  static UseSkillNotify(e, o, t) {
    var l;
    e && o && o.dVn && o.dVn.r5n
      ? o.dVn.s5n &&
        ((t = MathUtils_1.MathUtils.LongToBigInt(t.$8n)),
        (e = e.GetComponent(38)),
        (l = MathUtils_1.MathUtils.LongToNumber(o.dVn.CVn)),
        e?.SimulatedBeginSkill(
          o.dVn.r5n,
          l,
          o.dVn.gVn,
          0.001 * o.dVn.n5n,
          t,
        )) &&
        SkillMessageController.UIt.add(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          14,
          "[CreatureController.UseSkillNotify] 服务器返回参数有误。",
        );
  }
  static SkillNotify(e, o, t) {
    var l,
      r = e?.GetComponent(38);
    r
      ? ((l = MathUtils_1.MathUtils.LongToBigInt(t.X8n)),
        SkillMessageController.UIt.has(l)
          ? o.pVn.fVn === SKILL_PLAY_MONTAGE &&
            ((l = MathUtils_1.MathUtils.LongToBigInt(t.$8n)),
            r.SimulatePlayMontage(
              o.dVn?.r5n ?? 0,
              o.pVn.lVn,
              o.pVn.vVn,
              o.pVn.MVn,
              o.pVn.SVn,
              l,
            ))
          : CombatLog_1.CombatLog.Info(
              "Skill",
              e,
              "技能释放未被确认，拒绝其后续行为",
              ["技能Id", o.dVn.r5n],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          14,
          "[CreatureController.SkillNotify] 不存在skillComponent。",
        );
  }
  static EndSkillNotify(e, o, t) {
    o.dVn && o.dVn.s5n
      ? ((t = MathUtils_1.MathUtils.LongToBigInt(t.X8n)),
        SkillMessageController.UIt.delete(t),
        e?.GetComponent(38)?.SimulateEndSkill(o.dVn.r5n))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EndSkillNotify] 服务器返回参数有误。",
        );
  }
  static UseSkillRequest(o, e, t) {
    const l = o.GetComponent(38);
    var r = e.SkillId,
      a = e.SkillInfo.AutonomouslyBySimulate,
      s = e.SkillInfo.MoveControllerTime,
      i = e.InterruptLevel,
      _ = e.PreContextId,
      c = e.LFc,
      n = Protocol_1.Aki.Protocol.b3n.create(),
      r =
        ((n.dVn = Protocol_1.Aki.Protocol.W3s.create()),
        (n.dVn.r5n = r),
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t));
    (n.dVn.CVn = MathUtils_1.MathUtils.NumberToLong(r)),
      (n.dVn.J8n = Time_1.Time.NowSeconds),
      (n.dVn.gVn = a),
      (n.dVn.n5n = 1e3 * s),
      (n.dVn.EVn = i),
      (n.Na1 = e.BattleFlags.map((e) =>
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
      ));
    const C = e.FightStateHandle;
    return (
      C && (n.dVn.mVn = l.FightStateComp?.GetFightState() ?? 0),
      CombatMessage_1.CombatNet.Call(
        28899,
        o,
        n,
        (e) => {
          o.IsEnd ||
            (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
              ? C && l.FightStateComp?.ConfirmState(C)
              : (CombatLog_1.CombatLog.Info(
                  "Skill",
                  o,
                  "技能释放服务器拒绝，技能终止",
                  ["技能Id", e.dVn?.r5n],
                ),
                l.EndSkill(
                  e.dVn.r5n,
                  "SkillMessageController.UseSkillRequest",
                )));
        },
        _,
        c,
      ),
      !0
    );
  }
  static EndSkillRequest(e, o, t) {
    var l;
    return e
      ? (((l = Protocol_1.Aki.Protocol.ne_.create()).dVn =
          Protocol_1.Aki.Protocol.W3s.create()),
        (l.dVn.r5n = o),
        (l.dVn.J8n = Time_1.Time.NowSeconds),
        (l.x9n = t.Reason),
        (l.WSl = Protocol_1.Aki.Protocol.WSl.create()),
        (l.WSl.F4n = t.EntityId),
        (l.WSl.r5n = t.SkillId),
        (l.WSl.Mjn = t.BulletId),
        CombatMessage_1.CombatNet.Send(20678, e, l),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            14,
            "[CreatureController.EndSkillRequest] entityId无效。",
            ["EntityId", void 0],
          ),
        !1);
  }
  static MontageRequest(
    o,
    e,
    t,
    l,
    r,
    a = 1,
    s = "",
    i = 0,
    _ = void 0,
    c = void 0,
  ) {
    const n = Number(t);
    (t = Protocol_1.Aki.Protocol.W3s.create()),
      (t.r5n = n),
      (t.CVn = l),
      (t.J8n = Time_1.Time.NowSeconds),
      (l = Protocol_1.Aki.Protocol.T4s.create()),
      (l.fVn = e),
      (l.lVn = r),
      (l.vVn = a),
      (l.MVn = s),
      (l.SVn = i),
      (e = Protocol_1.Aki.Protocol.w3n.create());
    (e.dVn = t),
      (e.pVn = l),
      CombatMessage_1.CombatNet.Call(
        28487,
        o,
        e,
        (e) => {
          if (!o.IsEnd)
            switch (e.Q4n) {
              case Protocol_1.Aki.Protocol.Q4n.KRs:
              case Protocol_1.Aki.Protocol.Q4n
                .Proto_ErrCombatSkillGAHandleGetEntityFailed:
                break;
              default:
                CombatLog_1.CombatLog.Error(
                  "Skill",
                  o,
                  "播放蒙太奇请求失败",
                  ["技能Id", n],
                  ["ErrorCode", e?.Q4n],
                );
            }
        },
        _,
        c,
      );
  }
  static AnimNotifyRequest(e, o, t, l, r = void 0, a = void 0) {
    CombatLog_1.CombatLog.Info(
      "Skill",
      e,
      "播放蒙太奇AN",
      ["技能Id", o],
      ["MontageIndex", t],
      ["animNotifyIndex", l],
      ["preCombatMessageId", r],
      ["combatMessageId", a],
    );
    var s = Protocol_1.Aki.Protocol.Pe_.create();
    (s.yVn = l),
      (s.lVn = t),
      (s.r5n = o),
      CombatMessage_1.CombatNet.Send(
        24772,
        e,
        Protocol_1.Aki.Protocol.Pe_.create(s),
        r,
        a,
      );
  }
  static PassiveSkillAddRequest(e, o, t = void 0) {
    CombatLog_1.CombatLog.Info("Skill", e, "添加被动Request", [
      "被动技能Id",
      o,
    ]);
    var l = Protocol_1.Aki.Protocol.Be_.create(),
      o =
        ((l.IVn = MathUtils_1.MathUtils.NumberToLong(o)),
        (l.TVn = e.GetComponent(0).GetCreatureDataId()),
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId());
    return (
      CombatMessage_1.CombatNet.Send(
        28995,
        e,
        Protocol_1.Aki.Protocol.Be_.create(l),
        t,
        o,
      ),
      o
    );
  }
  static PassiveSkillRemoveRequest(e, o, t = void 0, l = void 0) {
    CombatLog_1.CombatLog.Info("Skill", e, "移除被动Request", [
      "被动技能Id",
      o,
    ]);
    var r = Protocol_1.Aki.Protocol.je_.create();
    (r.IVn = MathUtils_1.MathUtils.NumberToLong(o)),
      (r.TVn = e.GetComponent(0).GetCreatureDataId()),
      CombatMessage_1.CombatNet.Send(
        29573,
        e,
        Protocol_1.Aki.Protocol.je_.create(r),
        t,
        l,
      );
  }
  static Wmc(e, o) {}
}
((_a = SkillMessageController).CloseMonsterServerLogic = !1),
  (SkillMessageController.UIt = new Set()),
  (SkillMessageController.$mc = (e) => {
    switch (e.Q4n) {
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrConfSkillNotExist:
        _a.Wmc("技能配置未找到", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillCD:
        _a.Wmc("技能CD中", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrContextCheckFail:
        _a.Wmc("技能上下文校验报错", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayMontageButNoSkill:
        _a.Wmc("蒙太奇对应的技能未释放成功", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrMontageConfigNotFound:
        _a.Wmc("蒙太奇配置未找到", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrANConfigNotFound:
        _a.Wmc("AN配置未找到", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBulletConfigNotFound:
        _a.Wmc("子弹配置未找到", e.GNs);
        break;
      case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNoBuffConf:
        _a.Wmc("BUFF配置未找到", e.GNs);
        break;
      default:
        _a.Wmc("未支持的ErrorCode", e.GNs);
    }
  }),
  __decorate(
    [CombatMessage_1.CombatNet.Preprocess("DFn")],
    SkillMessageController,
    "PreUseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("DFn", !0)],
    SkillMessageController,
    "UseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("LFn", !0)],
    SkillMessageController,
    "SkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("AFn", !0)],
    SkillMessageController,
    "EndSkillNotify",
    null,
  ),
  (exports.SkillMessageController = SkillMessageController);
//# sourceMappingURL=SkillMessageController.js.map
