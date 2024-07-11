"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcMultiplyLogic = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MapUtils_1 = require("../../../../../Core/Utils/MapUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SimpleNpcFlowConditionChecker_1 = require("./SimpleNpcFlowConditionChecker"),
  DEFAULT_WAIT_TIME = 3,
  DEFAULT_LOOP_TIME = 10;
class SimpleNpcMultiplyLogic {
  constructor(t) {
    (this.air = void 0),
      (this.Sir = []),
      (this.Eir = []),
      (this.NUe = ++SimpleNpcMultiplyLogic.Me),
      (this.yir = void 0),
      (this.Iir = []),
      (this.Tir = 0),
      (this.Lir = 0),
      (this.Rir = !0),
      (this.IsPause = !0),
      (this.air = t),
      (this.Eir = new Array());
  }
  StartFlow() {
    (this.IsPause = !1), this.Uir(), this.Pir();
  }
  Pir() {
    let e = void (this.Eir.length = 0);
    var t,
      s = this.air.FlowList;
    for (let t = 0, i = s.Num(); t < i; t++) {
      var r = s.Get(t);
      if (this.Sir[t])
        if (9 === r.CheckType) {
          if (
            SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.CheckFirstEnter(
              this.NUe,
            )
          ) {
            this.Eir.push(r),
              (e = r),
              SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.SetFirstEnter(
                this.NUe,
              );
            break;
          }
        } else
          SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.CheckCondition(
            r,
          ) && this.Eir.push(r);
    }
    e
      ? this.xir(e)
      : (t = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.Eir)) &&
        this.xir(t);
  }
  Uir() {
    (!this.Sir || this.Sir.length < this.air.FlowList.Num()) &&
      this.FilterFlowWorldState(
        ModelManager_1.ModelManager.WorldModel.WorldStateMap,
      );
  }
  FilterFlowWorldState(i) {
    var e = this.air.FlowList.Num();
    for (this.Sir || (this.Sir = new Array()); this.Sir.length < e; )
      this.Sir.push(!0);
    var s = new Map();
    for (let t = 0; t < e; t++) {
      var r = this.air.FlowList.Get(t);
      1 === r.WorldState.WorldStateMap.Num() &&
        void 0 !== (r = r.WorldState.WorldStateMap.GetKey(0)) &&
        (s.get(r) || s.set(r, new Array()), s.get(r).push(t));
    }
    var h = new Array();
    for (let t = 0; t < e; t++) h.push(this.wir(t, i));
    var o = new Map();
    for (const _ of s) {
      var t = _[0],
        l = (o.set(t, -1), o.get(t));
      for (const c of _[1]) 0 <= h[c] && (l < 0 || l > h[c]) && o.set(t, h[c]);
    }
    for (let t = 0; t < e; t++) {
      var a,
        n = this.air.FlowList.Get(t);
      0 === n.WorldState.WorldStateMap.Num()
        ? (this.Sir[t] = !0)
        : 1 === n.WorldState.WorldStateMap.Num()
          ? ((n = n.WorldState.WorldStateMap.GetKey(0)),
            (n = o.get(n)),
            (a = h[t]),
            (this.Sir[t] = void 0 !== n && 0 <= n && a === n))
          : (this.Sir[t] = 0 === h[t]);
    }
  }
  wir(t, s) {
    var i = this.air.FlowList.Get(t);
    if (0 === i.WorldState.WorldStateMap.Num()) return 0;
    if (1 === i.WorldState.WorldStateMap.Num()) {
      const t = i.WorldState.WorldStateMap.GetKey(0);
      var e = this.GetWorldStateEnum(t);
      return void 0 === e
        ? -1
        : void 0 === (e = s.get(e))
          ? -1
          : e - i.WorldState.WorldStateMap.Get(t);
    }
    const r = i.WorldState.MeetAllConditions;
    let h = !!r;
    return (
      MapUtils_1.MapUtils.ForEach(i.WorldState.WorldStateMap, (t, i) => {
        t = this.GetWorldStateEnum(t);
        let e = void 0;
        void 0 !== t && (e = s.get(t)),
          (h = void 0 !== e ? (r ? h && e >= i : h || e >= i) : !r && h);
      }),
      h ? 0 : -1
    );
  }
  xir(t) {
    this.yir = t;
    t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
      t.FlowListName,
      Number(t.FlowSubTitle),
      this.air.GetOwner().ActorLabel,
    );
    t ? ((this.Iir = t.TalkItems), this.Bir(0)) : this.bir();
  }
  Bir(i) {
    this.Tir = i;
    var e = this.Iir;
    if (e.length > i) {
      var e = e[i],
        s = this.air.NpcList;
      if (s.Num() < 2) {
        let t = !1;
        var r = this.air.GetOwner();
        (t = r instanceof UE.TsSimpleNpc_C ? this.qir(r, e) : t)
          ? ((this.Rir = !1), (this.Lir = this.Gir(e)))
          : this.Bir(i + 1);
      } else {
        let t = -1;
        -1 ===
        (t =
          0 === this.yir.Pawn
            ? SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.GetFlowActorIndex(
                e.WhoId,
              )
            : this.yir.Pawn - 1)
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                30,
                "请选择指定的演出目标ID",
                ["Id", e.WhoId],
                ["Name", this.air.GetOwner().GetName()],
              ),
            this.Bir(i + 1))
          : s.Num() <= t
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Level",
                  30,
                  "找不到演出目标",
                  ["Index", t],
                  ["Name", this.air.GetOwner().GetName()],
                ),
              this.Bir(i + 1))
            : ((r = s.Get(t)),
              this.qir(r, e)
                ? ((this.Rir = !1), (this.Lir = this.Gir(e)))
                : this.Bir(i + 1));
      }
    } else this.bir();
  }
  qir(t, i) {
    let e = !1;
    var s,
      r = this.Nir(i.TidTalk);
    return (
      r && ((e = !0), (s = this.Gir(i, 0.05)), t.ShowDialog(r, s)),
      (e = i.Montage && t.TryPlayMontage(i.Montage.ActionMontage.Path) ? !0 : e)
    );
  }
  Nir(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t))
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  Gir(t, i = 0) {
    let e = t.WaitTime;
    return (e && 0 !== e) || (e = DEFAULT_WAIT_TIME), (e += i);
  }
  bir() {
    this.Rir = !0;
    let t = DEFAULT_LOOP_TIME;
    this.yir && (t = this.yir.LoopTime), (this.Lir = t);
  }
  Tick(t) {
    0 < this.Lir &&
      ((this.Lir -= t), this.Lir <= 0) &&
      (this.Rir ? this.IsPause || this.Pir() : this.Bir(this.Tir + 1));
  }
  StopFlow() {
    (this.Rir = !0), (this.Lir = 0);
    var e = this.air?.NpcList;
    if (e && 2 < e?.Num())
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t);
        s.HideDialog(), s.StopMontage();
      }
    else {
      var t = this.air.GetOwner();
      t instanceof UE.TsSimpleNpc_C && (t.HideDialog(), t.StopMontage());
    }
  }
  get IsPlaying() {
    return !this.Rir;
  }
  GetWorldStateEnum(t) {
    switch (t) {
      case 0:
        return "DefaultState";
      case 2:
      case 1:
        return "NpcWorldState";
      default:
        return;
    }
  }
}
(exports.SimpleNpcMultiplyLogic = SimpleNpcMultiplyLogic).Me = 0;
//# sourceMappingURL=SimpleNpcMultiplyLogic.js.map
