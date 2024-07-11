"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : 3 < h ? o(e, i, r) : o(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMontageComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  montagePathMap = new Map([
    [0, "AM_Death"],
    [1, "AM_Death_InWater"],
    [2, "AM_Death_InAir"],
    [3, "AM_Death_Falling"],
  ]);
class MontageTask {
  constructor(t, e, i, s, o, h = !0, r = -1) {
    (this.MontageComponent = void 0),
      (this.Handle = 0),
      (this.Montage = void 0),
      (this.PlayCallback = void 0),
      (this.EndCallback = void 0),
      (this.BlendInTime = 0),
      (this.MontagePathHash = 0),
      (this.DKo = void 0),
      (this.RKo = !1),
      (this.lfe = !1),
      (this.UKo = !1),
      (this.MontageComponent = t),
      (this.Handle = e),
      (this.PlayCallback = s),
      (this.EndCallback = o),
      (this.RKo = !1),
      (this.BlendInTime = r);
    (e = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
      t.ActorComponent.Actor.GetClass(),
    )),
      (s = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(e)),
      (o = ConfigManager_1.ConfigManager.WorldConfig.GetMontageMap(s)?.get(i));
    o
      ? ((r = o.ToAssetPathName()),
        (this.MontagePathHash = UE.GASBPLibrary.FnvHash(r)),
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimMontage, (t) => {
          !this.UKo && ((this.Montage = t), h || this.RKo) && this.Play();
        }))
      : (this.UKo = !0);
  }
  get Invalid() {
    return this.UKo;
  }
  Play(t = 0) {
    var e;
    this.UKo ||
      (this.Montage &&
        !this.lfe &&
        (this.PlayCallback?.(),
        (e = this.Montage.BlendIn.BlendTime),
        0 <= this.BlendInTime &&
          (this.Montage.BlendIn.BlendTime = this.BlendInTime),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Animation",
          this.MontageComponent.Entity,
          "播放Montage",
          ["Montage", this.Montage?.GetName()],
          ["BlendInTime", this.BlendInTime],
        ),
        (this.DKo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
          this.MontageComponent.AnimationComponent.MainAnimInstance,
          this.Montage,
          1,
          t,
          FNameUtil_1.FNameUtil.NONE,
        )),
        0 <= this.BlendInTime && (this.Montage.BlendIn.BlendTime = e),
        this.DKo.EndCallback.Add((t) => {
          this.EndCallback?.(t),
            this.MontageComponent.EndMontageTask(this.Handle);
        }),
        (this.lfe = !0)),
      (this.RKo = !0));
  }
  EndTask() {
    this.DKo?.EndTask(),
      this.DKo?.EndCallback.Clear(),
      (this.DKo = void 0),
      (this.MontageComponent = void 0),
      (this.PlayCallback = void 0),
      (this.EndCallback = void 0),
      (this.UKo = !0);
  }
}
let CharacterMontageComponent = class CharacterMontageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.UnifiedStateComponent = void 0),
      (this.AnimationComponent = void 0),
      (this.F$ = new Map()),
      (this.YOr = new Map()),
      (this.JOr = new Array()),
      (this.zOr = 0),
      (this.MontageTaskMessageId = void 0),
      (this.ZOr = new Map()),
      (this.ekr = 0),
      (this.tkr = new Map());
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    return (
      (this.ActorComponent = this.Entity.CheckGetComponent(3)),
      (this.AnimationComponent = this.Entity.CheckGetComponent(160)),
      (this.UnifiedStateComponent = this.Entity.CheckGetComponent(89)),
      this.ezo(),
      !0
    );
  }
  OnEnd() {
    this.F$.clear(), this.YOr.clear();
    for (const e of this.JOr) e.EndTask();
    this.JOr.length = 0;
    for (var [, t] of this.ZOr) t.EndTask();
    return this.ZOr.clear(), !0;
  }
  ezo() {
    var t = this.ActorComponent.CreatureData.GetEntityType();
    if (
      t !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
      t !== Protocol_1.Aki.Protocol.HBs.Proto_Vision
    ) {
      var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          this.ActorComponent.Actor.GetClass(),
        ),
        e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
      for (const [s, o] of montagePathMap.entries()) {
        var i = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(e, o);
        i &&
          !StringUtils_1.StringUtils.IsNothing(i.ToAssetPathName()) &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            i.ToAssetPathName(),
            UE.AnimMontage,
            (t) => {
              this.F$.set(s, t);
            },
          );
      }
    }
  }
  PlayMontageAsync(t, e, i, s = !0, o = -1) {
    var h = ++this.zOr,
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
    if (!t.Invalid) return this.ZOr.set(h, t), h;
  }
  PlayMontageTaskAndRequest(t, e, i, s) {
    var o = Protocol_1.Aki.Protocol.$Nn.create();
    (o.pkn = i),
      (o.p4s = this.GetMontagePathHash(t)),
      (this.MontageTaskMessageId = CombatMessage_1.CombatNet.Call(
        13545,
        this.Entity,
        o,
        (t) => {},
        s,
      )),
      this.PlayMontageTask(t, e);
  }
  PlayMontageTask(t, e = 0) {
    t = this.ZOr.get(t);
    t && t.Play(e);
  }
  EndMontageTask(t) {
    var e = this.ZOr.get(t);
    e &&
      (e.EndTask(), this.ZOr.delete(t), (this.MontageTaskMessageId = void 0));
  }
  GetMontageTimeRemaining(t) {
    t = this.ZOr.get(t);
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
    var i = this.tkr.get(t);
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
      this.JOr.push(s);
      s.EndCallback.Add((t) => {
        e?.(t), s.EndTask();
        t = this.JOr.findIndex((t) => t === s);
        this.JOr.splice(t, 1);
      });
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Battle",
          20,
          "事件未找到对应路径蒙太奇或Entity已结束运行状态，执行结束回调",
          ["montagePath", montagePathMap.get(t)],
          ["Actor", this.ActorComponent.Actor.GetName()],
        ),
        e?.(!0);
  }
  AddReplacement(t, e) {
    let i = this.tkr.get(t);
    return (
      i || this.tkr.set(t, (i = new Map())), i.set(++this.ekr, e), this.ekr
    );
  }
  RemoveReplacement(t) {
    for (const e of this.tkr.values()) e?.delete(t);
  }
  GetMontagePathHash(t) {
    t = this.ZOr.get(t);
    return t ? t.MontagePathHash : 0;
  }
};
(CharacterMontageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(22)],
  CharacterMontageComponent,
)),
  (exports.CharacterMontageComponent = CharacterMontageComponent);
//# sourceMappingURL=CharacterMontageComponent.js.map
