"use strict";
var CharacterAnimationSyncComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, a, i) {
      var o,
        n = arguments.length,
        r =
          n < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, a))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, a, i);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (o = t[s]) &&
            (r = (n < 3 ? o(r) : 3 < n ? o(e, a, r) : o(e, a)) || r);
      return 3 < n && r && Object.defineProperty(e, a, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAnimationSyncComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
  CombatDebugController_1 = require("../../../../Utils/CombatDebugController"),
  WorldGlobal_1 = require("../../../../World/WorldGlobal"),
  animationStateListRef = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt)),
  specialStateListRef = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt)),
  animationStates = UE.NewArray(UE.BuiltinInt),
  specialAnimationStates = UE.NewArray(UE.BuiltinInt),
  animationTagList = [
    792724096, -100527303, -1664105924, -1388636447, -513324610, 1818764431,
    -726891989, -182271791, -1761987351, 967041502, 1491611589, 20810141,
    1173061094,
  ],
  MAX_ANIM_STATE_CHANGE_COUNT = 600;
let CharacterAnimationSyncComponent =
  (CharacterAnimationSyncComponent_1 = class CharacterAnimationSyncComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.oRe = void 0),
        (this.Lie = void 0),
        (this.d4r = new Array()),
        (this.C4r = (t) => {
          this.g4r();
        }),
        (this.f4r = (t, e) => {
          var a;
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            this.Hte.IsMoveAutonomousProxy &&
            (((a = Protocol_1.Aki.Protocol.gNn.create()).E9n = t),
            (a.y9n = e),
            CombatMessage_1.CombatNet.Call(17952, this.Entity, a));
        });
    }
    static get Dependencies() {
      return [3, 160, 0];
    }
    OnEnd() {
      return (
        CombatMessageController_1.CombatMessageController.UnregisterAfterTick(
          this,
        ),
        !0
      );
    }
    OnActivate() {
      if (
        (CombatMessageController_1.CombatMessageController.RegisterAfterTick(
          this,
          this.C4r,
        ),
        (this.Hte = this.Entity.CheckGetComponent(3)),
        (this.oRe = this.Entity.CheckGetComponent(160)),
        (this.Lie = this.Entity.GetComponent(185)),
        this.p4r(),
        this.Lie)
      )
        for (const e of animationTagList) {
          var t = this.Lie.ListenForTagAddOrRemove(e, this.f4r);
          this.d4r.push(t);
        }
      return !0;
    }
    OnClear() {
      for (const t of this.d4r) t.EndTask();
      return !0;
    }
    p4r() {
      if (
        this.oRe.MainAnimInstance &&
        UE.KismetSystemLibrary.IsValid(this.oRe.MainAnimInstance)
      ) {
        var t = this.Entity.GetComponent(0).ComponentDataMap.get("Vvs"),
          e = t?.Vvs.Kps,
          a = t?.Vvs.p9n;
        if (this.Hte.IsMoveAutonomousProxy)
          this.oRe.MainAnimInstance.SetStateMachineNetMode(!1),
            this.AnimationStateInitPush();
        else {
          this.oRe.MainAnimInstance.SetStateMachineNetMode(!0),
            e && 0 < e.length
              ? ((i = (0, puerts_1.$unref)(animationStateListRef)),
                WorldGlobal_1.WorldGlobal.ToUeInt32Array(e, i),
                this.oRe.MainAnimInstance.SetStateOrdersReceivePending(i),
                CombatDebugController_1.CombatDebugController.CombatInfo(
                  "Animation",
                  this.Entity,
                  "动画状态机初始化成功",
                  ["v", CharacterAnimationSyncComponent_1.OrderToString(e)],
                ))
              : CombatDebugController_1.CombatDebugController.CombatInfo(
                  "Animation",
                  this.Entity,
                  "动画状态机初始化失败",
                ),
            a &&
              0 < a.length &&
              ((i = (0, puerts_1.$unref)(specialStateListRef)),
              WorldGlobal_1.WorldGlobal.ToUeInt32Array(a, i),
              this.oRe.SpecialAnimInstance?.SetStateOrdersReceivePending(i));
          var i,
            e = t?.Vvs?.Xps;
          if (e && 0 < e.length) {
            for (const o of e) this.Lie.AddTag(o);
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "Animation",
              this.Entity,
              "AnimationTags",
              ["tags", e.join(",")],
            );
          }
        }
        a = t?.Vvs?.Qps;
        if (a && 0 < a.length)
          for (const n of a)
            this.oRe.HideBone(
              FNameUtil_1.FNameUtil.GetDynamicFName(n.M9n),
              !n.S9n,
              !1,
            );
      }
    }
    g4r() {
      var t, e, a, i;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        this.Hte.IsMoveAutonomousProxy &&
        this.oRe.MainAnimInstance &&
        UE.KismetSystemLibrary.IsValid(this.oRe.MainAnimInstance) &&
        (this.oRe.MainAnimInstance.GetStateOrdersSendPending(
          animationStateListRef,
        ),
        (t = (0, puerts_1.$unref)(animationStateListRef)),
        this.oRe.SpecialAnimInstance?.GetStateOrdersSendPending(
          specialStateListRef,
        ),
        (e = (0, puerts_1.$unref)(specialStateListRef)),
        0 < t.Num() || (this.oRe.SpecialAnimInstance && 0 < e.Num())) &&
        ((a = []),
        (i = []),
        WorldGlobal_1.WorldGlobal.ToTsArray(t, a),
        this.oRe.SpecialAnimInstance &&
          WorldGlobal_1.WorldGlobal.ToTsArray(e, i),
        a.length > CharacterAnimationSyncComponent_1.v4r ||
        i.length > CharacterAnimationSyncComponent_1.v4r
          ? (CombatDebugController_1.CombatDebugController.CombatError(
              "Animation",
              this.Entity,
              "状态机增量变化数组超长",
              ["v", CharacterAnimationSyncComponent_1.OrderToString(a)],
              ["length", a.length],
            ),
            this.AnimationStateInitPush())
          : this.AnimationStateChangedPush(this.Entity, a, i));
    }
    ClearOrders() {
      this.oRe.MainAnimInstance.ClearStateOrdersReceivePending(),
        this.oRe.MainAnimInstance.ClearStateOrdersSendPending();
    }
    AnimationGameplayTagHandle(t) {
      !this.Hte.IsMoveAutonomousProxy &&
        this.Lie &&
        (t.y9n ? this.Lie.AddTag(t.E9n) : this.Lie.RemoveTag(t.E9n));
    }
    static AnimationGameplayTagNotify(t, e) {
      t?.GetComponent(41)?.AnimationGameplayTagHandle(e);
    }
    AnimationStateChangedPush(t, e, a) {
      var i;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (((i = Protocol_1.Aki.Protocol.nNn.create()).f9n = e),
        (i.p9n = a),
        (i.f9n.length > MAX_ANIM_STATE_CHANGE_COUNT ||
          i.p9n.length > MAX_ANIM_STATE_CHANGE_COUNT) &&
          CombatDebugController_1.CombatDebugController.CombatError(
            "Animation",
            t,
            "状态机增量变化数组超长",
            ["States", CharacterAnimationSyncComponent_1.OrderToString(i.f9n)],
            [
              "SpecialStates",
              CharacterAnimationSyncComponent_1.OrderToString(i.p9n),
            ],
          ),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Animation",
          this.Entity,
          "动画状态机修改请求",
          ["v", CharacterAnimationSyncComponent_1.OrderToString(e)],
          ["length", e.length],
        ),
        CombatMessage_1.CombatNet.Call(18967, t, i, () => {}));
    }
    AnimationStateInitPush() {
      var t, e, a, i;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (this.oRe.MainAnimInstance.GetOriginStates(animationStateListRef),
        (i = (0, puerts_1.$unref)(animationStateListRef)),
        this.oRe.SpecialAnimInstance?.GetOriginStates(specialStateListRef),
        (t = (0, puerts_1.$unref)(specialStateListRef)),
        i || t) &&
        ((e = []),
        (a = []),
        WorldGlobal_1.WorldGlobal.ToTsArray(i, e),
        WorldGlobal_1.WorldGlobal.ToTsArray(t, a),
        ((i = Protocol_1.Aki.Protocol.sNn.create()).f9n = e),
        (i.p9n = a),
        (i.f9n.length > MAX_ANIM_STATE_CHANGE_COUNT ||
          i.p9n.length > MAX_ANIM_STATE_CHANGE_COUNT) &&
          CombatDebugController_1.CombatDebugController.CombatError(
            "Animation",
            this.Entity,
            "状态机增量变化数组超长",
            ["States", CharacterAnimationSyncComponent_1.OrderToString(i.f9n)],
            [
              "SpecialStates",
              CharacterAnimationSyncComponent_1.OrderToString(i.p9n),
            ],
          ),
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Animation",
          this.Entity,
          "动画状态机初始化请求",
          ["v", CharacterAnimationSyncComponent_1.OrderToString(e)],
        ),
        CombatMessage_1.CombatNet.Call(26094, this.Entity, i, () => {}));
    }
    static AnimationStateChangedNotify(t, e) {
      var a = t?.GetComponent(1);
      t &&
        a &&
        !a.IsMoveAutonomousProxy &&
        ((a = t.GetComponent(160)),
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(e.f9n, animationStates),
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(e.p9n, specialAnimationStates),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "Animation",
          t,
          "动画状态机修改通知",
          ["v", this.OrderToString(e.f9n)],
        ),
        a.MainAnimInstance.SetStateOrdersReceivePending(animationStates),
        a.SpecialAnimInstance?.SetStateOrdersReceivePending(
          specialAnimationStates,
        ));
    }
    static AnimationStateInitNotify(t, e) {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Animation",
        t,
        "动画状态机初始化通知",
        ["v", this.OrderToString(e.f9n)],
      );
      var t = t.GetComponent(160),
        a = UE.NewArray(UE.BuiltinInt);
      WorldGlobal_1.WorldGlobal.ToUeInt32Array(e.f9n, a),
        t.MainAnimInstance.SetStateOrdersReceivePending(a),
        t.SpecialAnimInstance &&
          ((a = UE.NewArray(UE.BuiltinInt)),
          WorldGlobal_1.WorldGlobal.ToUeInt32Array(e.p9n, a),
          t.SpecialAnimInstance.SetStateOrdersReceivePending(a));
    }
    static OrderToString(t) {
      var e = new StringBuilder_1.StringBuilder();
      let a = -1;
      for (; a + 5 <= t.length; ) {
        var i = t[++a],
          o = t[++a],
          n = a + o;
        for (e.Append("[" + i); a + 3 <= n; ) {
          var r = t[++a],
            s = (++a, t[++a]);
          e.Append("=>" + r), (a += s);
        }
        e.Append("]");
      }
      return e.ToString();
    }
  });
(CharacterAnimationSyncComponent.v4r = 600),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("u2n")],
    CharacterAnimationSyncComponent,
    "AnimationGameplayTagNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("t2n")],
    CharacterAnimationSyncComponent,
    "AnimationStateChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("i2n")],
    CharacterAnimationSyncComponent,
    "AnimationStateInitNotify",
    null,
  ),
  (CharacterAnimationSyncComponent = CharacterAnimationSyncComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(41)],
      CharacterAnimationSyncComponent,
    )),
  (exports.CharacterAnimationSyncComponent = CharacterAnimationSyncComponent);
//# sourceMappingURL=CharacterAnimationSyncComponent.js.map
