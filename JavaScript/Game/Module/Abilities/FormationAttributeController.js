"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationAttributeController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
class FormationAttributeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.ConfigList =
        FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      (this.zVs = this.zVs - 1e3 * Math.random()),
      (this.ZVs = this.ZVs - 1e3 * Math.random()),
      !(this.e9s = !1)
    );
  }
  static OnTick(t) {
    if (this.ConfigList)
      for (const e of this.ConfigList.values()) this.OBe(e.Id);
  }
  static OnClear() {
    return (
      this.kBe(),
      void 0 !== this.FBe && TimerSystem_1.TimerSystem.Remove(this.FBe),
      !(this.FBe = void 0)
    );
  }
  static GetPredictedServerStopTime() {
    return Time_1.Time.WorldTime + this.VBe + Net_1.Net.RttMs / 2;
  }
  static GetPredictedServerTime() {
    return Time_1.Time.Now + this.HBe + Net_1.Net.RttMs / 2;
  }
  static t9s(t) {
    const e = Time_1.Time.ServerTimeStamp;
    const r = e - t;
    !this.e9s &&
      ((r > 0 && r > this.ZVs) || (r < 0 && Math.abs(r) > this.zVs)) &&
      (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TimeValidError),
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "TimeUtil",
          38,
          "校准时间存在过大误差,退出登录重连",
          ["clientTime", e],
          ["ServerTime", t],
        ),
      (this.e9s = !0));
  }
  static OnFormationAttrChanged(t) {
    let e;
    let r;
    const i = this.Model?.GetData(t);
    i &&
      ((e = Protocol_1.Aki.Protocol.zns.create()),
      (r = Protocol_1.Aki.Protocol.NOs.create()),
      (e.qFn = [r]),
      (e.GFn = i.Timestamp),
      (r.OFn = t),
      (r.NFn = i.Value),
      (r.kFn = i.Max),
      (r.FFn = i.BaseMax),
      (r.VFn = i.Speed),
      Net_1.Net.Call(16761, e, () => {}),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Battle",
        20,
        "发送队伍属性变化push",
        ["clientTime", i.Timestamp],
        ["data", JSON.stringify(r)],
      );
  }
  static SetValue(t, e) {
    let r;
    this.WBe(t) &&
      ((r = this.GetValue(t)),
      this.Model.SetValue(t, e),
      this.OBe(t),
      this.GetValue(t) !== r) &&
      this.OnFormationAttrChanged(t);
  }
  static AddValue(t, e) {
    this.WBe(t) && this.SetValue(t, this.Model.GetValue(t) + e);
  }
  static GetValue(t) {
    const e = this.KBe.get(t);
    return void 0 !== e ? e : this.Model.GetValue(t);
  }
  static GetMax(t) {
    return this.Model.GetMax(t);
  }
  static GetBaseMax(t) {
    return this.Model.GetBaseMax(t);
  }
  static GetSpeed(t) {
    return this.Model.GetSpeed(t);
  }
  static GetRatio(t) {
    return (
      (this.GetValue(t) / this.GetMax(t)) *
      CharacterAttributeTypes_1.PER_TEN_THOUSAND
    );
  }
  static AddModifier(t, e, r, i) {
    let o = this.Modifiers.get(e);
    o || this.Modifiers.set(e, (o = new Map())),
      o.set(t, { Type: r, Value: i }),
      this.RefreshSpeed(e);
  }
  static RemoveModifier(t, e) {
    const r = this.Modifiers.get(e);
    r &&
      (r.delete(t),
      r.size === 0 && this.Modifiers.delete(e),
      this.RefreshSpeed(e));
  }
  static AddBoundsLocker(t, e, r) {
    return this.Model?.AddBoundsLocker(t, e, r) ?? -1;
  }
  static RemoveBoundsLocker(t, e) {
    return this.Model?.RemoveBoundsLocker(t, e) ?? !1;
  }
  static AddPauseLock(t) {
    this.PauseLocks.add(t), this.RefreshAllSpeed();
  }
  static RemovePauseLock(t) {
    this.PauseLocks.delete(t), this.RefreshAllSpeed();
  }
  static IsPaused() {
    return this.PauseLocks.size > 0;
  }
  static WBe(t) {
    return t === 1;
  }
  static QBe(r) {
    let t = this.XBe.get(r);
    return (
      t ||
        ((t = () => {
          const t =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(
              185,
            );
          const e = this.Model.GetConfig(r);
          e &&
            t &&
            (t.HasAnyTag(e.ForbidIncreaseTags)
              ? this.AddModifier("TagForbidIncrease", r, 1, -1 / 0)
              : this.RemoveModifier("TagForbidIncrease", r),
            t.HasAnyTag(e.ForbidDecreaseTags)
              ? this.AddModifier("TagForbidDecrease", r, 2, -1 / 0)
              : this.RemoveModifier("TagForbidDecrease", r));
        }),
        this.XBe.set(r, t)),
      t
    );
  }
  static get Model() {
    return ModelManager_1.ModelManager.FormationAttributeModel;
  }
  static OnSetMax(t, e, r) {
    if (e !== r) {
      const i = this.$Be.get(t);
      if (i) for (const o of i.values()) o(t, e, r);
    }
  }
  static RefreshAllSpeed() {
    if (this.ConfigList)
      for (const t of this.ConfigList.values()) this.RefreshSpeed(t.Id);
  }
  static RefreshSpeed(t) {
    let r = this.Modifiers.get(t);
    let i = this.Model.GetBaseRate(t);
    let o = i;
    const e = this.Model.GetSpeed(t);
    if (FormationAttributeController.IsPaused()) o = 0;
    else if (r) {
      let t = 0;
      let e = 0;
      for (const a of r.values())
        switch (a.Type) {
          case 0:
            i = a.Value;
            break;
          case 1:
            t += a.Value;
            break;
          case 2:
            e += a.Value;
        }
      r = Math.max(
        1 + (i > 0 ? t : e) * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        0,
      );
      o = i * r;
    }
    o !== e && (this.Model.SetSpeed(t, o), this.OnFormationAttrChanged(t));
  }
  static OBe(e) {
    const r = this.Model.GetValue(e);
    let i = this.KBe.get(e);
    if ((void 0 === i && this.KBe.set(e, (i = r)), r !== i)) {
      this.KBe.set(e, r);
      let t = this.YBe.get(e);
      if (t)
        for (const n of t.values())
          try {
            n(e, r, i);
          } catch (t) {
            const o = [
              ["attrId", e],
              ["newValue", r],
              ["oldValue", i],
            ];
            t instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "Event",
                  20,
                  "队伍属性回调异常",
                  t,
                  ...o,
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Event", 20, "队伍属性回调异常", ...o);
          }
      t = this.JBe.get(e);
      if (t) {
        const a = this.GetRatio(e);
        for (const l of t) {
          let s = a >= l.Min && a <= l.Max;
          if (s !== l.InInterval) {
            l.InInterval = s;
            try {
              l.Func(e, s, a);
            } catch (t) {
              s = [
                ["attrId", e],
                ["inInterval", s],
                ["ratio", a],
              ];
              t instanceof Error
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.ErrorWithStack(
                    "Event",
                    20,
                    "队伍属性回调异常",
                    t,
                    ...s,
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Event", 20, "队伍属性回调异常", ...s);
            }
          }
        }
      }
    }
  }
  static kBe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      this.YBe.clear(),
      this.JBe.clear(),
      this.$Be.clear();
  }
  static AddValueListener(t, e, r) {
    let i = this.YBe.get(t);
    i || this.YBe.set(t, (i = new Set())), i.add(e);
  }
  static RemoveValueListener(t, e) {
    const r = this.YBe.get(t);
    r && (r.delete(e), r.size === 0) && this.YBe.delete(t);
  }
  static AddThresholdListener(e, r, i, o, t) {
    if (i < o)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Formation",
          20,
          "尝试添加的阈值监听器上限小于下限",
          ["attrId", e],
          ["区间上限", i],
          ["区间下限", o],
        );
    else {
      let t = this.JBe.get(e);
      t || this.JBe.set(e, (t = [])),
        t.some((t) => t.Func === r) ||
          ((e = this.GetRatio(e)),
          t.push({ Func: r, Max: i, Min: o, InInterval: o <= e && e <= i }));
    }
  }
  static RemoveThresholdListener(t, e) {
    let r;
    var t = this.JBe.get(t);
    t &&
      void 0 !== (r = t.findIndex((t) => t.Func === e)) &&
      r >= 0 &&
      t.splice(r, 1);
  }
  static AddMaxListener(t, e, r) {
    let i = this.$Be.get(t);
    i || this.$Be.set(t, (i = new Set())), i.add(e);
  }
  static RemoveMaxListener(t, e) {
    this.$Be.get(t)?.delete(e);
  }
}
(exports.FormationAttributeController = FormationAttributeController),
  ((_a = FormationAttributeController).ConfigList = void 0),
  (FormationAttributeController.e9s = !1),
  (FormationAttributeController.zVs = 432e5),
  (FormationAttributeController.ZVs = 6e4),
  (FormationAttributeController.HBe = 0),
  (FormationAttributeController.VBe = 0),
  (FormationAttributeController.FBe = void 0),
  (FormationAttributeController.FormationAttrNotify = (t) => {
    const r = MathUtils_1.MathUtils.LongToNumber(t.GFn ?? 0);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        20,
        "收到队伍属性变化通知",
        ["serverTime", r],
        ["notify", JSON.stringify(t.qFn)],
      );
    for (const n of t.qFn) {
      const i = n.OFn ?? 0;
      const o = _a.Model.GetMax(n.OFn ?? 0);
      const a = n.kFn ?? 0;
      const s = n.FFn ?? 0;
      let t = n.NFn ?? 0;
      let e = n.VFn ?? 0;
      _a.WBe(i) && ((t = _a.GetValue(i) ?? 0), (e = _a.GetSpeed(i) ?? 0)),
        _a.Model.SetData(i, a, s, t, e, r),
        _a.OnSetMax(i, a, o);
    }
  }),
  (FormationAttributeController.TimeCheck = (t, e, r) => {
    (_a.HBe = e - Time_1.Time.Now),
      (_a.VBe = Number(r) - Time_1.Time.WorldTime),
      Time_1.Time.SetServerTimeOffset(Number(_a.HBe)),
      Time_1.Time.SetTimeCheckServerStopTimeStamp(Number(_a.VBe)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          36,
          "对时通知",
          ["clientTime", t],
          ["serverTime", e],
          ["serverStopTime", r],
          ["PredictedServerTimeOffset", _a.HBe],
          ["PredictedServerStopTimeOffset", _a.VBe],
        );
  }),
  (FormationAttributeController.TimeCheckNotify = (t) => {
    const e = MathUtils_1.MathUtils.LongToNumber(t.HFn);
    const r = MathUtils_1.MathUtils.LongToNumber(t.Kxs);
    var t = MathUtils_1.MathUtils.LongToNumber(t.Qxs);
    _a.TimeCheck(e, r, t);
  }),
  (FormationAttributeController.TimeCheckRequest = () => {
    let t;
    Net_1.Net.IsServerConnected() &&
      (((t = Protocol_1.Aki.Protocol.Hus.create()).HFn = Time_1.Time.WorldTime),
      (t.jFn = Time_1.Time.TimeDilation),
      (t.WFn = ModelManager_1.ModelManager.GeneralLogicTreeModel?.TimeStop
        ? 0
        : 1),
      Net_1.Net.Call(21928, t, (t) => {
        let e, r;
        t &&
          ((e = MathUtils_1.MathUtils.LongToNumber(t.HFn)),
          (r = MathUtils_1.MathUtils.LongToNumber(t.Kxs)),
          (t = MathUtils_1.MathUtils.LongToNumber(t.Qxs)),
          _a.TimeCheck(e, r, t),
          _a.t9s(r));
      }));
  }),
  (FormationAttributeController.Modifiers = new Map()),
  (FormationAttributeController.PauseLocks = new Set()),
  (FormationAttributeController.XBe = new Map()),
  (FormationAttributeController.xie = (t, e) => {
    if (_a.ConfigList)
      for (const a of _a.ConfigList.values()) {
        const r = a.Id;
        const i = t.Entity.CheckGetComponent(185);
        const o = _a.Model.GetConfig(r);
        for (const s of o?.ForbidIncreaseTags)
          i?.AddTagAddOrRemoveListener(s, _a.QBe(r));
        for (const n of o?.ForbidDecreaseTags)
          i?.AddTagAddOrRemoveListener(n, _a.QBe(r));
        _a.QBe(r)();
      }
  }),
  (FormationAttributeController.nye = () => {
    _a.FBe ||
      (_a.FBe = TimerSystem_1.TimerSystem.Forever(_a.TimeCheckRequest, 3e3));
  }),
  (FormationAttributeController.KBe = new Map()),
  (FormationAttributeController.YBe = new Map()),
  (FormationAttributeController.JBe = new Map()),
  (FormationAttributeController.$Be = new Map());
// # sourceMappingURL=FormationAttributeController.js.map
