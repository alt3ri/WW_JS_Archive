"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BulletUtil_1 = require("../../NewWorld/Bullet/BulletUtil"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  TIME_STOP_DISTANCE = 2e4;
class TimeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      !0
    );
  }
  static OnTick(e) {}
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      void 0 !== this.FBe &&
        (TimerSystem_1.TimerSystem.Remove(this.FBe), (this.FBe = void 0)),
      this.Qhh.clear(),
      !0
    );
  }
  static AddLock(e, t) {
    e &&
      (this.Qhh.has(e)
        ? CombatLog_1.CombatLog.Error(
            "Skill",
            e?.Entity,
            "同一实体重复添加时停，将不被处理",
          )
        : this.Qhh.set(e, { StopMove: t })),
      e.Entity?.GetComponent(120)?.AddDelayLock("ANS AbsoluteTimeStop Role"),
      this.Khh();
  }
  static RemoveLock(e) {
    e && this.Qhh.delete(e),
      e.Entity?.GetComponent(120)?.RemoveDelayLock("ANS AbsoluteTimeStop Role"),
      this.Khh();
  }
  static Khh() {
    ModelManager_1.ModelManager.GameModeModel?.IsMulti && this.Qhh.clear();
    var e = new Array();
    for (const r of this.Qhh.keys()) (r && r?.Valid) || e.push(r);
    for (const o of e) this.Qhh.delete(o);
    var t = 0 < this.Qhh.size;
    (this.$hh === t && !t) ||
      ((this.$hh = t), this.$hh ? this.Xhh() : this.Yhh());
  }
  static Xhh() {
    let e = !0;
    for (const r of this.Qhh.values())
      if (!r.StopMove) {
        e = !1;
        break;
      }
    var t = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
      TIME_STOP_DISTANCE,
      62,
      t,
      !0,
      !0,
    );
    for (const o of t)
      if (o.IsInit)
        if (this.Qhh.has(o)) this.zhh(o);
        else {
          {
            let e = o,
              t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
                e.Entity?.GetComponent(0)?.GetSummonerId() ?? -1,
              ),
              r = !1;
            for (; t && t !== e; ) {
              if (this.Qhh.has(t)) {
                r = !0;
                break;
              }
              (e = t),
                (t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
                  t.Entity?.GetComponent(0)?.GetSummonerId() ?? -1,
                ));
            }
            if (r) {
              this.zhh(o);
              continue;
            }
          }
          this.Jhh(o, e);
        }
  }
  static Yhh() {
    for (const e of [...this.Zll]) e.Valid && this.zhh(e);
  }
  static Jhh(e, t) {
    this.Zll.add(e);
    e.Entity?.GetComponent(120)?.AddPauseLock("ANS AbsoluteTimeStop monster");
    var r = e.Entity?.GetComponent(44);
    t
      ? r?.AddPauseLock("ANS AbsoluteTimeStop monster")
      : r?.RemovePauseLock("ANS AbsoluteTimeStop monster"),
      BulletUtil_1.BulletUtil.FrozenCharacterBullet(e.Id);
  }
  static zhh(e) {
    this.Zll.delete(e),
      e.Entity?.GetComponent(120)?.RemovePauseLock(
        "ANS AbsoluteTimeStop monster",
      ),
      e.Entity?.GetComponent(44)?.RemovePauseLock(
        "ANS AbsoluteTimeStop monster",
      ),
      BulletUtil_1.BulletUtil.UnFrozenCharacterBullet(e.Id);
  }
}
(exports.TimeController = TimeController),
  ((_a = TimeController).vP_ = 0),
  (TimeController.VBe = 0),
  (TimeController.FBe = void 0),
  (TimeController.nye = () => {
    _a.FBe ||
      (_a.FBe = TimerSystem_1.TimerSystem.Forever(_a.TimeCheckRequest, 3e3));
  }),
  (TimeController.TimeCheck = (e, t, r, o, i) => {
    var s = _a.vP_,
      l = _a.VBe;
    (_a.vP_ = i - Time_1.Time.FlowTime),
      (_a.VBe = Number(r) - Time_1.Time.WorldTime),
      Time_1.Time.SyncTime(t, o, _a.vP_, _a.VBe),
      (3e3 < _a.VBe - l || 3e3 < _a.vP_ - s) &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          35,
          "对时通知",
          ["clientTime", e],
          ["serverTime", t],
          ["serverStopTime", r],
          ["PredictedServerCombatTimeOffset", _a.vP_],
          ["PredictedServerStopTimeOffset", _a.VBe],
        );
  }),
  (TimeController.TimeCheckNotify = (e) => {
    var t = MathUtils_1.MathUtils.LongToNumber(e.D6n),
      r = MathUtils_1.MathUtils.LongToNumber(e.pGs),
      o = MathUtils_1.MathUtils.LongToNumber(e.SGs),
      i = MathUtils_1.MathUtils.LongToNumber(e.QL_),
      e = MathUtils_1.MathUtils.LongToNumber(e.MGs);
    _a.TimeCheck(t, r, o, i, e);
  }),
  (TimeController.TimeCheckRequest = () => {
    var e;
    Net_1.Net.IsServerConnected() &&
      (((e = Protocol_1.Aki.Protocol.WCs.create()).D6n = Time_1.Time.WorldTime),
      Info_1.Info.IsBuildDevelopmentOrDebug
        ? (e.A6n =
            Time_1.Time.TimeDilation *
            UE.GameplayStatics.GetGlobalTimeDilation(
              GlobalData_1.GlobalData.World,
            ))
        : (e.A6n = Time_1.Time.TimeDilation),
      (e.U6n = Time_1.Time.FlowTimeDilation),
      Net_1.Net.Call(23152, e, (e) => {
        var t, r, o, i;
        e &&
          ((t = MathUtils_1.MathUtils.LongToNumber(e.D6n)),
          (r = MathUtils_1.MathUtils.LongToNumber(e.pGs)),
          (o = MathUtils_1.MathUtils.LongToNumber(e.SGs)),
          (i = MathUtils_1.MathUtils.LongToNumber(e.QL_)),
          (e = MathUtils_1.MathUtils.LongToNumber(e.MGs)),
          _a.TimeCheck(t, r, o, i, e));
      }));
  }),
  (TimeController.Qhh = new Map()),
  (TimeController.Zll = new Set()),
  (TimeController.$hh = !1),
  (TimeController.TimeStopBuffEntitySet = new Set());
//# sourceMappingURL=TimeController.js.map
