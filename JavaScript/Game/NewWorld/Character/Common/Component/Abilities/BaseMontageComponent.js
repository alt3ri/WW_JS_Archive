"use strict";
var BaseMontageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, s);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (o = t[h]) &&
            (a = (n < 3 ? o(a) : 3 < n ? o(e, i, a) : o(e, i)) || a);
      return 3 < n && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMontageComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../../../../Utils/CombatLog");
class MontageTask {
  constructor(t, e, i, s) {
    (this.MontageComponent = t),
      (this.Handle = e),
      (this.PlayCallback = i),
      (this.EndCallback = s),
      (this.Montage = void 0),
      (this.BlendInTime = 0),
      (this.MontagePathHash = 0),
      (this.MontageName = ""),
      (this.MontageNeedPush2Server = !1),
      (this.IQo = void 0),
      (this.TQo = !1),
      (this.lfe = !1),
      (this.LQo = !1),
      (this.TQo = !1);
  }
  get Invalid() {
    return this.LQo;
  }
  InitWithPath(t, e = -1) {
    (this.BlendInTime = e), (this.MontageName = t);
    var i = this.MontageComponent?.GetMontageByName(t),
      s = this.MontageComponent?.GetMontagePathByName(t);
    this.MontageComponent && i && s ? this.CSr(i, t, s, e) : (this.LQo = !0);
  }
  InitWithMontage(t, e = -1) {
    this.BlendInTime = e;
    var i = t?.GetName(),
      s = this.MontageComponent?.GetMontagePathByName(i);
    this.MontageComponent && s && i ? this.CSr(t, i, s, e) : (this.LQo = !0);
  }
  CSr(t, e, i, s) {
    t
      ? ((this.BlendInTime = s),
        (this.MontageName = t.GetName()),
        (this.MontagePathHash = UE.GASBPLibrary.FnvHash(i)),
        (this.MontageNeedPush2Server =
          this.MontageComponent?.IsMontageNeedPush2Server(e) ?? !1),
        this.LQo || ((this.Montage = t), this.TQo && this.Play()))
      : (this.LQo = !0);
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
          this.MontageComponent.GetMainAnimInstance(),
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
            MontageNames: [],
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
let BaseMontageComponent =
  (BaseMontageComponent_1 = class BaseMontageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.LOr = new Map()),
        (this.B4a = new Map()),
        (this.P2l = new Map()),
        (this.DOr = new Array()),
        (this.ROr = 0),
        (this.MontageTaskMessageId = void 0),
        (this.UOr = new Map()),
        (this.G2a = new Queue_1.Queue());
    }
    OnStart() {
      var t;
      return (
        BaseMontageComponent_1.x2l ||
          ((t = UE.NewSet(UE.BuiltinString)).Add("TsAnimNotifyAddBuff_C"),
          t.Add("TsAnimNotifySkillBehavior_C"),
          t.Add("TsAnimNotifyReSkillEvent_C"),
          t.Add("TsAnimNotifyChangeRoleQte_C"),
          t.Add("TsAnimNotifyPanelQte_C"),
          t.Add("TsAnimNotifyJoinTeamQte_C"),
          t.Add("TsAnimNotifyDetach_C"),
          t.Add("TsAnimNotifyStateAddBuff_C"),
          t.Add("TsAnimNotifyStateCounterAttack_C"),
          t.Add("TsAnimNotifyStateVisionCounterAttack_C"),
          t.Add("TsAnimNotifyStateBulletDuration_C"),
          t.Add("TsAnimNotifyStateCaughtBinding_C"),
          t.Add("TsAnimNotifyStateCaughtTrigger_C"),
          t.Add("TsAnimNotifyStateMontageSpeedChange_C"),
          t.Add("TsAnimNotifyStateAttach_C"),
          (BaseMontageComponent_1.x2l = t)),
        !0
      );
    }
    OnEnd() {
      this.LOr.clear(), this.B4a.clear(), this.P2l.clear();
      for (const e of this.DOr) e.EndTask();
      this.DOr.length = 0;
      for (var [, t] of this.UOr) t.EndTask();
      return this.UOr.clear(), !0;
    }
    GetMainAnimInstance() {}
    CreateTaskWithName(t, e, i, s = -1) {
      var o = ++this.ROr,
        e = new MontageTask(this, o, e, i);
      if ((e.InitWithPath(t, s), !e.Invalid)) return this.UOr.set(o, e), o;
    }
    CreateTaskWithMontage(t, e, i, s = -1) {
      var o = ++this.ROr,
        e = new MontageTask(this, o, e, i);
      if ((e.InitWithMontage(t, s), !e.Invalid)) return this.UOr.set(o, e), o;
    }
    PlayMontageTaskWhenReady(t, e, i) {
      var s,
        o = this.UOr.get(t);
      o
        ? (o.MontageNeedPush2Server &&
            (i
              ? (((s = Protocol_1.Aki.Protocol.Su_.create()).i5n =
                  o.MontageName),
                (s.V7s = o.MontagePathHash),
                (s.vVn = 1),
                (s.MVn = ""),
                (s.SVn = e),
                (this.MontageTaskMessageId = CombatMessage_1.CombatNet.Send(
                  28640,
                  this.Entity,
                  s,
                  i,
                )))
              : CombatLog_1.CombatLog.Error(
                  "Animation",
                  this.Entity,
                  "请求播Montage时找不到对应contextId",
                  ["handle", t],
                )),
          o.Play(e))
        : CombatLog_1.CombatLog.Error(
            "Animation",
            this.Entity,
            "请求播Montage失败，找不到对应task",
            ["handle", t],
          );
    }
    EndMontageTask(t) {
      var e = this.UOr.get(t);
      e && (e.EndTask(), this.UOr.delete(t));
    }
    GetMontageTimeRemaining(t) {
      t = this.UOr.get(t);
      return t?.Montage
        ? t.Montage.SequenceLength -
            t.MontageComponent.GetMainAnimInstance().Montage_GetPosition(
              t.Montage,
            )
        : -1;
    }
    GetMontageTimeElapsing(t) {
      t = this.UOr.get(t);
      return t?.Montage
        ? t.MontageComponent.GetMainAnimInstance().Montage_GetPosition(
            t.Montage,
          )
        : -1;
    }
    PushMontageInfo(e, t) {
      4 === this.G2a.Size && this.G2a.Pop(), e.MontageNames.push(t.GetName());
      var i = t.SlotAnimTracks;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t).AnimTrack.AnimSegments;
        for (let t = 0; t < s.Num(); t++) {
          var o = s.Get(t);
          e.MontageNames.push(o.AnimReference?.GetName() ?? "");
        }
      }
      this.G2a.Push(e);
    }
    GetMontageInfo(e) {
      for (let t = this.G2a.Size - 1; 0 <= t; t--) {
        var i = this.G2a.Get(t);
        if (i.MontageNames.includes(e)) return i;
      }
    }
    AddMontage(t, e, i) {
      e
        ? (UE.KuroStaticLibrary.SetMontageANIndex(e),
          this.LOr.set(t, e),
          this.B4a.set(t, i))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "添加的动画不存在", ["Name", t]);
    }
    GetMontageByName(t) {
      if (t) return this.LOr.get(t);
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "传入的Name为空", ["Name", t]);
    }
    GetMontagePathByName(t) {
      if (t) return this.B4a.get(t);
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "传入的Name为空", ["Name", t]);
    }
    IsMontageNeedPush2Server(t) {
      var e,
        i = this.GetMontageByName(t);
      return i
        ? void 0 === (e = this.P2l.get(t))
          ? ((i = UE.KuroStaticLibrary.IsMontageContainGivenAnimNotify(
              i,
              BaseMontageComponent_1.x2l,
            )),
            this.P2l.set(t, i),
            i)
          : e
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 35, "montage找不到", ["Name", t]),
          !1);
    }
  });
(BaseMontageComponent.x2l = void 0),
  (BaseMontageComponent = BaseMontageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(24)],
      BaseMontageComponent,
    )),
  (exports.BaseMontageComponent = BaseMontageComponent);
//# sourceMappingURL=BaseMontageComponent.js.map
