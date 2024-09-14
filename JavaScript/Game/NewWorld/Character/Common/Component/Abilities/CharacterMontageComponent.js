"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      a =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (a = (h < 3 ? o(a) : 3 < h ? o(e, i, a) : o(e, i)) || a);
    return 3 < h && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMontageComponent = exports.montagePathMap = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../../../Utils/CombatLog");
exports.montagePathMap = new Map([
  [0, "AM_Death"],
  [1, "AM_Death_InWater"],
  [2, "AM_Death_InAir"],
  [3, "AM_Death_Falling"],
]);
class MontageTask {
  constructor(t, e, i, s, o, h = !0, a = -1) {
    (this.MontageComponent = void 0),
      (this.Handle = 0),
      (this.Montage = void 0),
      (this.PlayCallback = void 0),
      (this.EndCallback = void 0),
      (this.BlendInTime = 0),
      (this.MontagePathHash = 0),
      (this.IQo = void 0),
      (this.TQo = !1),
      (this.lfe = !1),
      (this.LQo = !1),
      (this.MontageComponent = t),
      (this.Handle = e),
      (this.PlayCallback = s),
      (this.EndCallback = o),
      (this.TQo = !1),
      (this.BlendInTime = a);
    e = t.GetMontageByName(i);
    e && (s = t.GetMontagePathByName(i))
      ? ((this.MontagePathHash = UE.GASBPLibrary.FnvHash(s)),
        !this.LQo && ((this.Montage = e), h || this.TQo) && this.Play())
      : (this.LQo = !0);
  }
  get Invalid() {
    return this.LQo;
  }
  Play(t = 0) {
    var e;
    this.LQo ||
      (this.PlayCallback?.(),
      this.Montage &&
        !this.lfe &&
        ((e = this.Montage.BlendIn.BlendTime),
        0 <= this.BlendInTime &&
          (this.Montage.BlendIn.BlendTime = this.BlendInTime),
        (this.IQo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
          this.MontageComponent.AnimationComponent.MainAnimInstance,
          this.Montage,
          1,
          t,
          FNameUtil_1.FNameUtil.NONE,
        )),
        0 <= this.BlendInTime && (this.Montage.BlendIn.BlendTime = e),
        this.IQo.EndCallback.Add((t) => {
          this.EndCallback?.(t),
            this.MontageComponent.EndMontageTask(this.Handle);
        }),
        this.MontageComponent.PushMontageInfo(
          {
            MontageName: [],
            MontageTaskMessageId: this.MontageComponent.MontageTaskMessageId,
          },
          this.Montage,
        ),
        (this.lfe = !0)),
      (this.TQo = !0));
  }
  EndTask() {
    this.IQo?.EndTask(),
      this.IQo?.EndCallback.Clear(),
      (this.IQo = void 0),
      (this.MontageComponent = void 0),
      (this.PlayCallback = void 0),
      (this.EndCallback = void 0),
      (this.LQo = !0);
  }
}
let CharacterMontageComponent = class CharacterMontageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.UnifiedStateComponent = void 0),
      (this.AnimationComponent = void 0),
      (this.F$ = new Map()),
      (this.LOr = new Map()),
      (this.fFa = new Map()),
      (this.DOr = new Array()),
      (this.ROr = 0),
      (this.MontageTaskMessageId = void 0),
      (this.UOr = new Map()),
      (this.AOr = 0),
      (this.POr = new Map()),
      (this.a2a = new Queue_1.Queue());
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    return (
      (this.ActorComponent = this.Entity.CheckGetComponent(3)),
      (this.AnimationComponent = this.Entity.CheckGetComponent(163)),
      (this.UnifiedStateComponent = this.Entity.CheckGetComponent(92)),
      this.Jzo(),
      !0
    );
  }
  OnEnd() {
    this.F$.clear(), this.LOr.clear(), this.fFa.clear();
    for (const e of this.DOr) e.EndTask();
    this.DOr.length = 0;
    for (var [, t] of this.UOr) t.EndTask();
    return this.UOr.clear(), !0;
  }
  Jzo() {
    for (var [t, e] of exports.montagePathMap.entries()) {
      e = this.LOr.get(e);
      e && this.F$.set(t, e);
    }
  }
  PlayMontageAsync(t, e, i, s = !0, o = -1) {
    var h = ++this.ROr,
      t = new MontageTask(
        this,
        h,
        t,
        () => {
          this.UnifiedStateComponent?.ExitHitState("播放蒙太奇"), e?.();
        },
        i,
        s,
        o,
      );
    if (!t.Invalid) return this.UOr.set(h, t), h;
  }
  PlayMontageTaskAndRequest(t, e, i, s) {
    var o = Protocol_1.Aki.Protocol.P4n.create();
    (o.i5n = i),
      (o.V7s = this.GetMontagePathHash(t)),
      (o.vVn = 1),
      (o.MVn = ""),
      (o.SVn = e),
      (this.MontageTaskMessageId = CombatMessage_1.CombatNet.Call(
        23966,
        this.Entity,
        o,
        (t) => {},
        s,
      )),
      this.PlayMontageTask(t, e);
  }
  PlayMontageTask(t, e = 0) {
    t = this.UOr.get(t);
    t && t.Play(e);
  }
  EndMontageTask(t) {
    var e = this.UOr.get(t);
    e && (e.EndTask(), this.UOr.delete(t));
  }
  GetMontageTimeRemaining(t) {
    t = this.UOr.get(t);
    return t?.Montage
      ? t.Montage.SequenceLength -
          t.MontageComponent.AnimationComponent.MainAnimInstance.Montage_GetPosition(
            t.Montage,
          )
      : -1;
  }
  HasMontage(t) {
    return this.F$.has(t);
  }
  PlayMontageWithCallBack(t, e) {
    var i = this.POr.get(t);
    if (i && 0 < i.size) {
      i = [...i.values()][i.size - 1];
      if (i)
        return void (void 0 === this.PlayMontageAsync(i, void 0, e) && e?.(!0));
    }
    i = this.F$.get(t);
    if (i) {
      const s = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
        this.AnimationComponent.MainAnimInstance,
        i,
        1,
        0,
        FNameUtil_1.FNameUtil.NONE,
      );
      this.DOr.push(s);
      s.EndCallback.Add((t) => {
        e?.(t), s.EndTask();
        t = this.DOr.findIndex((t) => t === s);
        this.DOr.splice(t, 1);
      });
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          20,
          "事件未找到对应路径蒙太奇或Entity已结束运行状态，执行结束回调",
          ["montagePath", exports.montagePathMap.get(t)],
          ["Actor", this.ActorComponent.Actor.GetName()],
        ),
        e?.(!0);
  }
  AddReplacement(t, e) {
    let i = this.POr.get(t);
    return (
      i || this.POr.set(t, (i = new Map())), i.set(++this.AOr, e), this.AOr
    );
  }
  RemoveReplacement(t) {
    for (const e of this.POr.values()) e?.delete(t);
  }
  GetMontagePathHash(t) {
    t = this.UOr.get(t);
    return t ? t.MontagePathHash : 0;
  }
  PushMontageInfo(e, t) {
    2 === this.a2a.Size && this.a2a.Pop(), e.MontageName.push(t.GetName());
    var i = t.SlotAnimTracks;
    for (let t = 0; t < i.Num(); t++) {
      var s = i.Get(t).AnimTrack.AnimSegments;
      for (let t = 0; t < s.Num(); t++) {
        var o = s.Get(t);
        e.MontageName.push(o.AnimReference?.GetName() ?? "");
      }
    }
    this.a2a.Push(e);
  }
  GetMontageInfo(e) {
    var i = this.a2a.Size;
    for (let t = 0; t < i; t++) {
      var s = this.a2a.Get(t);
      if (s.MontageName.includes(e)) return s;
    }
  }
  AddMontage(t, e, i) {
    e
      ? (UE.KuroStaticLibrary.SetMontageANIndex(e),
        this.LOr.set(t, e),
        this.fFa.set(t, i))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "添加的动画不存在", ["Name", t]);
  }
  GetMontageByName(t) {
    if (t) return this.LOr.get(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 4, "传入的Name为空", ["Name", t]);
  }
  GetMontagePathByName(t) {
    if (t) return this.fFa.get(t);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Battle", 4, "传入的Name为空", ["Name", t]);
  }
};
(CharacterMontageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(22)],
  CharacterMontageComponent,
)),
  (exports.CharacterMontageComponent = CharacterMontageComponent);
//# sourceMappingURL=CharacterMontageComponent.js.map
