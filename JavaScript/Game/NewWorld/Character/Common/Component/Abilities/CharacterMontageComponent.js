"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var o,
      h = arguments.length,
      r =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, e, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (o = t[a]) && (r = (h < 3 ? o(r) : 3 < h ? o(i, e, r) : o(i, e)) || r);
    return 3 < h && r && Object.defineProperty(i, e, r), r;
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
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  montagePathMap = new Map([
    [0, "AM_Death"],
    [1, "AM_Death_InWater"],
    [2, "AM_Death_InAir"],
    [3, "AM_Death_Falling"],
  ]);
class MontageTask {
  constructor(t, i, e, s, o, h = !0, r = -1) {
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
      (this.Handle = i),
      (this.PlayCallback = s),
      (this.EndCallback = o),
      (this.TQo = !1),
      (this.BlendInTime = r);
    (i = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
      t.ActorComponent.Actor.GetClass(),
    )),
      (s = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(i)),
      (o = ConfigManager_1.ConfigManager.WorldConfig.GetMontageMap(s)?.get(e));
    o
      ? ((r = o.ToAssetPathName()),
        (this.MontagePathHash = UE.GASBPLibrary.FnvHash(r)),
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimMontage, (t) => {
          !this.LQo && ((this.Montage = t), h || this.TQo) && this.Play();
        }))
      : (this.LQo = !0);
  }
  get Invalid() {
    return this.LQo;
  }
  Play(t = 0) {
    var i;
    this.LQo ||
      (this.PlayCallback?.(),
      this.Montage &&
        !this.lfe &&
        ((i = this.Montage.BlendIn.BlendTime),
        0 <= this.BlendInTime &&
          (this.Montage.BlendIn.BlendTime = this.BlendInTime),
        (this.IQo = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
          this.MontageComponent.AnimationComponent.MainAnimInstance,
          this.Montage,
          1,
          t,
          FNameUtil_1.FNameUtil.NONE,
        )),
        0 <= this.BlendInTime && (this.Montage.BlendIn.BlendTime = i),
        this.IQo.EndCallback.Add((t) => {
          this.EndCallback?.(t),
            this.MontageComponent.EndMontageTask(this.Handle);
        }),
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
      (this.DOr = new Array()),
      (this.ROr = 0),
      (this.MontageTaskMessageId = void 0),
      (this.UOr = new Map()),
      (this.AOr = 0),
      (this.POr = new Map());
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    return (
      (this.ActorComponent = this.Entity.CheckGetComponent(3)),
      (this.AnimationComponent = this.Entity.CheckGetComponent(162)),
      (this.UnifiedStateComponent = this.Entity.CheckGetComponent(91)),
      this.Jzo(),
      !0
    );
  }
  OnEnd() {
    this.F$.clear(), this.LOr.clear();
    for (const i of this.DOr) i.EndTask();
    this.DOr.length = 0;
    for (var [, t] of this.UOr) t.EndTask();
    return this.UOr.clear(), !0;
  }
  Jzo() {
    var t = this.ActorComponent.CreatureData.GetEntityType();
    if (
      t !== Protocol_1.Aki.Protocol.wks.Proto_Npc &&
      t !== Protocol_1.Aki.Protocol.wks.Proto_Vision
    ) {
      var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          this.ActorComponent.Actor.GetClass(),
        ),
        i = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
      for (const [s, o] of montagePathMap.entries()) {
        var e = ConfigManager_1.ConfigManager.WorldConfig.GetSkillMontage(i, o);
        e &&
          !StringUtils_1.StringUtils.IsNothing(e.ToAssetPathName()) &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            e.ToAssetPathName(),
            UE.AnimMontage,
            (t) => {
              this.F$.set(s, t);
            },
          );
      }
    }
  }
  PlayMontageAsync(t, i, e, s = !0, o = -1) {
    var h = ++this.ROr,
      t = new MontageTask(
        this,
        h,
        t,
        () => {
          this.UnifiedStateComponent?.ExitHitState("播放蒙太奇"), i?.();
        },
        e,
        s,
        o,
      );
    if (!t.Invalid) return this.UOr.set(h, t), h;
  }
  PlayMontageTaskAndRequest(t, i, e, s) {
    var o = Protocol_1.Aki.Protocol.y4n.create();
    (o.Q4n = e),
      (o.g7s = this.GetMontagePathHash(t)),
      (this.MontageTaskMessageId = CombatMessage_1.CombatNet.Call(
        11538,
        this.Entity,
        o,
        (t) => {},
        s,
      )),
      this.PlayMontageTask(t, i);
  }
  PlayMontageTask(t, i = 0) {
    t = this.UOr.get(t);
    t && t.Play(i);
  }
  EndMontageTask(t) {
    var i = this.UOr.get(t);
    i &&
      (i.EndTask(), this.UOr.delete(t), (this.MontageTaskMessageId = void 0));
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
  PlayMontageWithCallBack(t, i) {
    var e = this.POr.get(t);
    if (e && 0 < e.size) {
      e = [...e.values()][e.size - 1];
      if (e)
        return void (void 0 === this.PlayMontageAsync(e, void 0, i) && i?.(!0));
    }
    e = this.F$.get(t);
    if (e) {
      const s = UE.AsyncTaskPlayMontageAndWait.ListenForPlayMontage(
        this.AnimationComponent.MainAnimInstance,
        e,
        1,
        0,
        FNameUtil_1.FNameUtil.NONE,
      );
      this.DOr.push(s);
      s.EndCallback.Add((t) => {
        i?.(t), s.EndTask();
        t = this.DOr.findIndex((t) => t === s);
        this.DOr.splice(t, 1);
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
        i?.(!0);
  }
  AddReplacement(t, i) {
    let e = this.POr.get(t);
    return (
      e || this.POr.set(t, (e = new Map())), e.set(++this.AOr, i), this.AOr
    );
  }
  RemoveReplacement(t) {
    for (const i of this.POr.values()) i?.delete(t);
  }
  GetMontagePathHash(t) {
    t = this.UOr.get(t);
    return t ? t.MontagePathHash : 0;
  }
};
(CharacterMontageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(22)],
  CharacterMontageComponent,
)),
  (exports.CharacterMontageComponent = CharacterMontageComponent);
//# sourceMappingURL=CharacterMontageComponent.js.map
