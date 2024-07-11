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
    e = e?.GetComponent(47);
    return !(e && !e.PreSwitchRemoteFightState(o.nVn.oVn));
  }
  static UseSkillNotify(e, o, t) {
    var l;
    e && o && o.nVn && o.nVn.X4n
      ? o.nVn.J4n &&
        ((t = MathUtils_1.MathUtils.LongToBigInt(t.k8n)),
        (e = e.GetComponent(33)),
        (l = MathUtils_1.MathUtils.LongToNumber(o.nVn.sVn)),
        e?.SimulatedBeginSkill(o.nVn.X4n, l, o.nVn.aVn, 0.001 * o.nVn.Y4n)) &&
        SkillMessageController.UIt.add(t)
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
      ? ((t = MathUtils_1.MathUtils.LongToBigInt(t.N8n)),
        SkillMessageController.UIt.has(t)
          ? o.lVn.hVn === SKILL_PLAY_MONTAGE &&
            l.SimulatePlayMontage(
              o.nVn?.X4n ?? 0,
              o.lVn.eVn,
              o.lVn._Vn,
              o.lVn.uVn,
              o.lVn.cVn,
            )
          : CombatLog_1.CombatLog.Info(
              "Skill",
              e,
              "技能释放未被确认，拒绝其后续行为",
              ["技能Id", o.nVn.X4n],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MultiplayerCombat",
          15,
          "[CreatureController.SkillNotify] 不存在skillComponent。",
        );
  }
  static EndSkillNotify(e, o, t) {
    o.nVn && o.nVn.J4n
      ? ((t = MathUtils_1.MathUtils.LongToBigInt(t.N8n)),
        SkillMessageController.UIt.delete(t),
        e?.GetComponent(33)?.SimulateEndSkill(o.nVn.X4n))
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
      s = e.SkillInfo.MoveControllerTime,
      a = e.SkillInfo.InterruptLevel,
      _ = e.PreContextId,
      n = e.CombatMessageId,
      C = Protocol_1.Aki.Protocol.L3n.create(),
      r =
        ((C.nVn = Protocol_1.Aki.Protocol.k3s.create()),
        (C.nVn.X4n = r),
        ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t));
    (C.nVn.sVn = MathUtils_1.MathUtils.NumberToLong(r)),
      (C.nVn.V8n = Time_1.Time.NowSeconds),
      (C.nVn.aVn = i),
      (C.nVn.Y4n = 1e3 * s),
      (C.nVn.mVn = a);
    const c = e.FightStateHandle;
    return (
      c && (C.nVn.oVn = l.FightStateComp?.GetFightState() ?? 0),
      CombatMessage_1.CombatNet.Call(
        27988,
        o,
        C,
        (e) => {
          o.IsEnd ||
            (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
              ? c && l.FightStateComp?.ConfirmState(c)
              : (CombatLog_1.CombatLog.Info(
                  "Skill",
                  o,
                  "技能释放服务器拒绝，技能终止",
                  ["技能Id", e.nVn?.X4n],
                ),
                l.EndSkill(
                  e.nVn.X4n,
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
      ? (((t = Protocol_1.Aki.Protocol.D3n.create()).nVn =
          Protocol_1.Aki.Protocol.k3s.create()),
        (t.nVn.X4n = o),
        (t.nVn.V8n = Time_1.Time.NowSeconds),
        CombatMessage_1.CombatNet.Call(9879, e, t, () => {}),
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
    (t = Protocol_1.Aki.Protocol.k3s.create()),
      (t.X4n = C),
      (t.sVn = l),
      (t.V8n = Time_1.Time.NowSeconds),
      (l = Protocol_1.Aki.Protocol.v4s.create()),
      (l.hVn = e),
      (l.eVn = r),
      (l._Vn = i),
      (l.uVn = s),
      (l.cVn = a),
      (e = Protocol_1.Aki.Protocol.T3n.create());
    (e.nVn = t),
      (e.lVn = l),
      CombatMessage_1.CombatNet.Call(
        10990,
        o,
        e,
        (e) => {
          if (!o.IsEnd)
            switch (e.O4n) {
              case Protocol_1.Aki.Protocol.O4n.NRs:
              case Protocol_1.Aki.Protocol.O4n
                .Proto_ErrCombatSkillGAHandleGetEntityFailed:
                break;
              default:
                CombatLog_1.CombatLog.Error(
                  "Skill",
                  o,
                  "播放蒙太奇请求失败",
                  ["技能Id", C],
                  ["ErrorCode", e?.O4n],
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
    var s = Protocol_1.Aki.Protocol.r4n.create();
    (s.dVn = l),
      (s.eVn = t),
      (s.X4n = o),
      CombatMessage_1.CombatNet.Call(
        19910,
        e,
        Protocol_1.Aki.Protocol.r4n.create(s),
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
    var l = Protocol_1.Aki.Protocol.a4n.create(),
      o =
        ((l.CVn = MathUtils_1.MathUtils.BigIntToLong(o)),
        (l.gVn = e.GetComponent(0).GetCreatureDataId()),
        ModelManager_1.ModelManager.CombatMessageModel.GenMessageId());
    return (
      CombatMessage_1.CombatNet.Call(
        21141,
        e,
        Protocol_1.Aki.Protocol.a4n.create(l),
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
    var r = Protocol_1.Aki.Protocol.M4n.create();
    (r.CVn = MathUtils_1.MathUtils.BigIntToLong(o)),
      (r.gVn = e.GetComponent(0).GetCreatureDataId()),
      CombatMessage_1.CombatNet.Call(
        8676,
        e,
        Protocol_1.Aki.Protocol.M4n.create(r),
        void 0,
        t,
        l,
      );
  }
}
(SkillMessageController.UIt = new Set()),
  __decorate(
    [CombatMessage_1.CombatNet.PreHandle("pFn")],
    SkillMessageController,
    "PreUseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("pFn")],
    SkillMessageController,
    "UseSkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("fFn")],
    SkillMessageController,
    "SkillNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("vFn")],
    SkillMessageController,
    "EndSkillNotify",
    null,
  ),
  (exports.SkillMessageController = SkillMessageController);
//# sourceMappingURL=SkillMessageController.js.map
