"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, l) {
    var r,
      i = arguments.length,
      s =
        i < 3
          ? o
          : null === l
            ? (l = Object.getOwnPropertyDescriptor(o, t))
            : l;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, o, t, l);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (r = e[a]) && (s = (i < 3 ? r(s) : 3 < i ? r(o, t, s) : r(o, t)) || s);
    return 3 < i && s && Object.defineProperty(o, t, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillMessageController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
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
    return !0;
  }
  static OnClear() {
    return SkillMessageController.UIt.clear(), !0;
  }
  static PreUseSkillNotify(e, o) {
    e = e?.GetComponent(48);
    return !(e && !e.PreSwitchRemoteFightState(o.dVn.mVn));
  }
  static UseSkillNotify(e, o, t) {
    var l;
    e && o && o.dVn && o.dVn.r5n
      ? o.dVn.s5n &&
        ((t = MathUtils_1.MathUtils.LongToBigInt(t.$8n)),
        (e = e.GetComponent(34)),
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
          15,
          "[CreatureController.UseSkillNotify] 服务器返回参数有误。",
        );
  }
  static SkillNotify(e, o, t) {
    var l,
      r = e?.GetComponent(34);
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
          15,
          "[CreatureController.SkillNotify] 不存在skillComponent。",
        );
  }
  static EndSkillNotify(e, o, t) {
    o.dVn && o.dVn.s5n
      ? ((t = MathUtils_1.MathUtils.LongToBigInt(t.X8n)),
        SkillMessageController.UIt.delete(t),
        e?.GetComponent(34)?.SimulateEndSkill(o.dVn.r5n))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EndSkillNotify] 服务器返回参数有误。",
        );
  }
  static UseSkillRequest(o, e, t) {
    const l = o.GetComponent(34);
    var r = e.SkillId,
      i = e.SkillInfo.AutonomouslyBySimulate,
      s = e.SkillInfo.MoveControllerTime,
      a = e.SkillInfo.InterruptLevel,
      _ = e.PreContextId,
      n = e.CombatMessageId,
      C = Protocol_1.Aki.Protocol.b3n.create(),
      r =
        ((C.dVn = Protocol_1.Aki.Protocol.W3s.create()),
        (C.dVn.r5n = r),
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t));
    (C.dVn.CVn = MathUtils_1.MathUtils.NumberToLong(r)),
      (C.dVn.J8n = Time_1.Time.NowSeconds),
      (C.dVn.gVn = i),
      (C.dVn.n5n = 1e3 * s),
      (C.dVn.EVn = a);
    const c = e.FightStateHandle;
    return (
      c && (C.dVn.mVn = l.FightStateComp?.GetFightState() ?? 0),
      CombatMessage_1.CombatNet.Call(
        16263,
        o,
        C,
        (e) => {
          o.IsEnd ||
            (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
              ? c && l.FightStateComp?.ConfirmState(c)
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
        n,
      ),
      !0
    );
  }
  static EndSkillRequest(e, o) {
    var t;
    return e
      ? (((t = Protocol_1.Aki.Protocol.q3n.create()).dVn =
          Protocol_1.Aki.Protocol.W3s.create()),
        (t.dVn.r5n = o),
        (t.dVn.J8n = Time_1.Time.NowSeconds),
        CombatMessage_1.CombatNet.Call(16901, e, t, () => {}),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MultiplayerCombat",
            15,
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
    i = 1,
    s = "",
    a = 0,
    _ = void 0,
    n = void 0,
  ) {
    const C = Number(t);
    (t = Protocol_1.Aki.Protocol.W3s.create()),
      (t.r5n = C),
      (t.CVn = l),
      (t.J8n = Time_1.Time.NowSeconds),
      (l = Protocol_1.Aki.Protocol.T4s.create()),
      (l.fVn = e),
      (l.lVn = r),
      (l.vVn = i),
      (l.MVn = s),
      (l.SVn = a),
      (e = Protocol_1.Aki.Protocol.w3n.create());
    (e.dVn = t),
      (e.pVn = l),
      CombatMessage_1.CombatNet.Call(
        16699,
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
                  ["技能Id", C],
                  ["ErrorCode", e?.Q4n],
                );
            }
        },
        _,
        n,
      );
  }
  static AnimNotifyRequest(e, o, t, l, r = void 0, i = void 0) {
    CombatLog_1.CombatLog.Info(
      "Skill",
      e,
      "播放蒙太奇AN",
      ["技能Id", o],
      ["MontageIndex", t],
      ["animNotifyIndex", l],
    );
    var s = Protocol_1.Aki.Protocol.c4n.create();
    (s.yVn = l),
      (s.lVn = t),
      (s.r5n = o),
      CombatMessage_1.CombatNet.Call(
        16341,
        e,
        Protocol_1.Aki.Protocol.c4n.create(s),
        void 0,
        r,
        i,
      );
  }
  static PassiveSkillAddRequest(e, o, t = void 0) {
    CombatLog_1.CombatLog.Info("Skill", e, "添加被动Request", [
      "被动技能Id",
      o,
    ]);
    var l = Protocol_1.Aki.Protocol.g4n.create(),
      o =
        ((l.IVn = MathUtils_1.MathUtils.BigIntToLong(o)),
        (l.TVn = e.GetComponent(0).GetCreatureDataId()),
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId());
    return (
      CombatMessage_1.CombatNet.Call(
        24321,
        e,
        Protocol_1.Aki.Protocol.g4n.create(l),
        void 0,
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
    var r = Protocol_1.Aki.Protocol.U4n.create();
    (r.IVn = MathUtils_1.MathUtils.BigIntToLong(o)),
      (r.TVn = e.GetComponent(0).GetCreatureDataId()),
      CombatMessage_1.CombatNet.Call(
        29986,
        e,
        Protocol_1.Aki.Protocol.U4n.create(r),
        void 0,
        t,
        l,
      );
  }
}
(SkillMessageController.CloseMonsterServerLogic = !1),
  (SkillMessageController.UIt = new Set()),
  __decorate(
    [CombatMessage_1.CombatNet.PreHandle("DFn")],
    SkillMessageController,
    "PreUseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("DFn")],
    SkillMessageController,
    "UseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("LFn")],
    SkillMessageController,
    "SkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("AFn")],
    SkillMessageController,
    "EndSkillNotify",
    null,
  ),
  (exports.SkillMessageController = SkillMessageController);
//# sourceMappingURL=SkillMessageController.js.map
