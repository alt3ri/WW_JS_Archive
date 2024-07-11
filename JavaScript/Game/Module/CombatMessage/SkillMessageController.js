"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, l) {
    var r,
      i = arguments.length,
      a =
        i < 3
          ? o
          : null === l
            ? (l = Object.getOwnPropertyDescriptor(o, t))
            : l;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, o, t, l);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (r = e[s]) && (a = (i < 3 ? r(a) : 3 < i ? r(o, t, a) : r(o, t)) || a);
    return 3 < i && a && Object.defineProperty(o, t, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillMessageController = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatDebugController_1 = require("../../Utils/CombatDebugController"),
  CombatMessage_1 = require("./CombatMessage"),
  SKILL_PLAY_MONTAGE = 1;
class SkillMessageController extends ControllerBase_1.ControllerBase {
  static AddSkillMessageId(e) {
    this.pyt.add(e);
  }
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return SkillMessageController.pyt.clear(), !0;
  }
  static PreUseSkillNotify(e, o) {
    e = e?.GetComponent(46);
    return !(e && !e.PreSwitchRemoteFightState(o.T4n.I4n));
  }
  static UseSkillNotify(e, o, t) {
    var l;
    e && o && o.T4n && o.T4n.vkn
      ? o.T4n.Ekn &&
        ((t = MathUtils_1.MathUtils.LongToBigInt(t.s4n)),
        (e = e.GetComponent(33)),
        (l = MathUtils_1.MathUtils.LongToNumber(o.T4n.L4n)),
        e?.SimulatedBeginSkill(o.T4n.vkn, l, o.T4n.D4n, 0.001 * o.T4n.Skn)) &&
        SkillMessageController.pyt.add(t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          15,
          "[CreatureController.UseSkillNotify] 服务器返回参数有误。",
        );
  }
  static SkillNotify(e, o, t) {
    var l = e?.GetComponent(33);
    l
      ? ((t = MathUtils_1.MathUtils.LongToBigInt(t.n4n)),
        SkillMessageController.pyt.has(t)
          ? o.U4n.A4n === SKILL_PLAY_MONTAGE &&
            (CombatDebugController_1.CombatDebugController.CombatDebug(
              "Skill",
              e,
              "播放蒙太奇通知",
              ["技能Id", o.T4n.vkn],
              ["MontageIndex", o.U4n.M4n],
            ),
            l.SimulatePlayMontage(
              o.T4n?.vkn ?? 0,
              o.U4n.M4n,
              o.U4n.R4n,
              o.U4n.x4n,
              o.U4n.P4n,
            ))
          : CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              e,
              "技能释放未被确认，拒绝其后续行为",
              ["技能Id", o.T4n.vkn],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          15,
          "[CreatureController.SkillNotify] 不存在skillComponent。",
        );
  }
  static EndSkillNotify(e, o, t) {
    o.T4n && o.T4n.Ekn
      ? ((t = MathUtils_1.MathUtils.LongToBigInt(t.n4n)),
        SkillMessageController.pyt.delete(t),
        e?.GetComponent(33)?.SimulateEndSkill(o.T4n.vkn))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[CreatureController.EndSkillNotify] 服务器返回参数有误。",
        );
  }
  static UseSkillRequest(o, e, t) {
    const l = o.GetComponent(33);
    var r = e.SkillId,
      i = e.SkillInfo.AutonomouslyBySimulate,
      a = e.SkillInfo.MoveControllerTime,
      s = e.SkillInfo.InterruptLevel,
      _ = e.PreContextId,
      n = e.CombatMessageId,
      C = Protocol_1.Aki.Protocol.J2n.create(),
      r =
        ((C.T4n = Protocol_1.Aki.Protocol.Jqs.create()),
        (C.T4n.vkn = r),
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t));
    (C.T4n.L4n = MathUtils_1.MathUtils.NumberToLong(r)),
      (C.T4n.h4n = Time_1.Time.NowSeconds),
      (C.T4n.D4n = i),
      (C.T4n.Skn = 1e3 * a),
      (C.T4n.B4n = s),
      (C.T4n.DMs = !!e.AbilityClass?.IsChildOf(
        ue_1.Ga_Passive_C.StaticClass(),
      ));
    const u = e.FightStateHandle;
    return (
      u && (C.T4n.I4n = l.FightStateComp?.GetFightState() ?? 0),
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "FightState",
        o,
        "UseSkillRequest " + C.T4n.I4n,
      ),
      CombatMessage_1.CombatNet.Call(
        17034,
        o,
        C,
        (e) => {
          o.IsEnd ||
            (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
              ? u && l.FightStateComp?.ConfirmState(u)
              : (CombatDebugController_1.CombatDebugController.CombatInfo(
                  "Skill",
                  o,
                  "技能释放服务器拒绝，技能终止",
                  ["技能Id", e.T4n?.vkn],
                ),
                l.EndSkill(
                  e.T4n.vkn,
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
      ? (((t = Protocol_1.Aki.Protocol.z2n.create()).T4n =
          Protocol_1.Aki.Protocol.Jqs.create()),
        (t.T4n.vkn = o),
        (t.T4n.h4n = Time_1.Time.NowSeconds),
        CombatMessage_1.CombatNet.Call(18786, e, t, () => {}),
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
    a = "",
    s = 0,
    _ = void 0,
    n = void 0,
  ) {
    const C = Number(t);
    CombatDebugController_1.CombatDebugController.CombatDebug(
      "Skill",
      o,
      "播放蒙太奇请求",
      ["技能Id", C],
      ["MontageIndex", r],
      ["speedRatio", i],
    );
    (t = Protocol_1.Aki.Protocol.Jqs.create()),
      (t.vkn = C),
      (t.L4n = l),
      (t.h4n = Time_1.Time.NowSeconds),
      (l = Protocol_1.Aki.Protocol.AOs.create()),
      (l.A4n = e),
      (l.M4n = r),
      (l.R4n = i),
      (l.x4n = a),
      (l.P4n = s),
      (e = Protocol_1.Aki.Protocol.Y2n.create());
    (e.T4n = t),
      (e.U4n = l),
      CombatMessage_1.CombatNet.Call(
        25230,
        o,
        e,
        (e) => {
          if (!o.IsEnd)
            switch (e.lkn) {
              case Protocol_1.Aki.Protocol.lkn.Sys:
              case Protocol_1.Aki.Protocol.lkn
                .Proto_ErrCombatSkillGAHandleGetEntityFailed:
                break;
              default:
                CombatDebugController_1.CombatDebugController.CombatError(
                  "Skill",
                  o,
                  "播放蒙太奇请求失败",
                  ["技能Id", C],
                  ["ErrorCode", e?.lkn],
                );
            }
        },
        _,
        n,
      );
  }
  static AnimNotifyRequest(e, o, t, l, r = void 0, i = void 0) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Skill",
      e,
      "播放蒙太奇AN",
      ["技能Id", o],
      ["MontageIndex", t],
      ["animNotifyIndex", l],
    );
    var a = Protocol_1.Aki.Protocol.ANn.create();
    (a.w4n = l),
      (a.M4n = t),
      (a.vkn = o),
      CombatMessage_1.CombatNet.Call(
        2838,
        e,
        Protocol_1.Aki.Protocol.ANn.create(a),
        void 0,
        r,
        i,
      );
  }
  static PassiveSkillAddRequest(e, o, t = void 0) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Skill",
      e,
      "添加被动Request",
      ["被动技能Id", o],
    );
    var l = Protocol_1.Aki.Protocol.PNn.create(),
      o =
        ((l.b4n = MathUtils_1.MathUtils.BigIntToLong(o)),
        (l.q4n = e.GetComponent(0).GetCreatureDataId()),
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId());
    return (
      CombatMessage_1.CombatNet.Call(
        17373,
        e,
        Protocol_1.Aki.Protocol.PNn.create(l),
        void 0,
        t,
        o,
      ),
      o
    );
  }
  static PassiveSkillRemoveRequest(e, o, t = void 0, l = void 0) {
    CombatDebugController_1.CombatDebugController.CombatInfo(
      "Skill",
      e,
      "移除被动Request",
      ["被动技能Id", o],
    );
    var r = Protocol_1.Aki.Protocol.WNn.create();
    (r.b4n = MathUtils_1.MathUtils.BigIntToLong(o)),
      (r.q4n = e.GetComponent(0).GetCreatureDataId()),
      CombatMessage_1.CombatNet.Call(
        24482,
        e,
        Protocol_1.Aki.Protocol.WNn.create(r),
        void 0,
        t,
        l,
      );
  }
}
(SkillMessageController.pyt = new Set()),
  __decorate(
    [CombatMessage_1.CombatNet.PreHandle("HOn")],
    SkillMessageController,
    "PreUseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("HOn")],
    SkillMessageController,
    "UseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("VOn")],
    SkillMessageController,
    "SkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("jOn")],
    SkillMessageController,
    "EndSkillNotify",
    null,
  ),
  (exports.SkillMessageController = SkillMessageController);
//# sourceMappingURL=SkillMessageController.js.map
