"use strict";
var CharacterAnimationSyncComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, a) {
      var o,
        n = arguments.length,
        r =
          n < 3
            ? i
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(i, e))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, e, a);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (o = t[s]) &&
            (r = (n < 3 ? o(r) : 3 < n ? o(i, e, r) : o(i, e)) || r);
      return 3 < n && r && Object.defineProperty(i, e, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAnimationSyncComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
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
        (this.Q3r = new Array()),
        (this.X3r = (t) => {
          this.$3r();
        }),
        (this.vTa = 0),
        (this.MTa = 5),
        (this.Y3r = (t, i) => {
          var e;
          ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            this.Hte.IsMoveAutonomousProxy &&
            (((e = Protocol_1.Aki.Protocol.W3n.create()).Zjn = t),
            (e.eWn = i),
            CombatMessage_1.CombatNet.Call(6450, this.Entity, e));
        });
    }
    static get Dependencies() {
      return [3, 162, 0];
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
          this.X3r,
        ),
        (this.Hte = this.Entity.CheckGetComponent(3)),
        (this.oRe = this.Entity.CheckGetComponent(162)),
        (this.Lie = this.Entity.GetComponent(188)),
        this.J3r(),
        this.Lie)
      )
        for (const i of animationTagList) {
          var t = this.Lie.ListenForTagAddOrRemove(i, this.Y3r);
          this.Q3r.push(t);
        }
      return !0;
    }
    OnClear() {
      for (const t of this.Q3r) t.EndTask();
      return !0;
    }
    J3r() {
      if (
        this.oRe.MainAnimInstance &&
        UE.KismetSystemLibrary.IsValid(this.oRe.MainAnimInstance)
      ) {
        var t = this.Entity.GetComponent(0).ComponentDataMap.get("nys"),
          i = t?.nys.lIs,
          e = t?.nys.$jn;
        if (this.Hte.IsMoveAutonomousProxy)
          this.oRe.MainAnimInstance.SetStateMachineNetMode(!1),
            this.AnimationStateInitPush();
        else {
          this.oRe.MainAnimInstance.SetStateMachineNetMode(!0),
            i && 0 < i.length
              ? ((a = (0, puerts_1.$unref)(animationStateListRef)),
                WorldGlobal_1.WorldGlobal.ToUeInt32Array(i, a),
                this.oRe.MainAnimInstance.SetStateOrdersReceivePending(a),
                CombatLog_1.CombatLog.Info(
                  "Animation",
                  this.Entity,
                  "动画状态机初始化成功",
                  ["v", CharacterAnimationSyncComponent_1.OrderToString(i)],
                ))
              : CombatLog_1.CombatLog.Info(
                  "Animation",
                  this.Entity,
                  "动画状态机初始化失败",
                ),
            e &&
              0 < e.length &&
              ((a = (0, puerts_1.$unref)(specialStateListRef)),
              WorldGlobal_1.WorldGlobal.ToUeInt32Array(e, a),
              this.oRe.SpecialAnimInstance?.SetStateOrdersReceivePending(a));
          var a,
            i = t?.nys?.uIs;
          if (i && 0 < i.length) {
            for (const o of i) this.Lie.AddTag(o);
            CombatLog_1.CombatLog.Info(
              "Animation",
              this.Entity,
              "AnimationTags",
              ["tags", i.join(",")],
            );
          }
        }
        e = t?.nys?._Is;
        if (e && 0 < e.length)
          for (const n of e)
            this.oRe.HideBone(
              FNameUtil_1.FNameUtil.GetDynamicFName(n.Jjn),
              !n.zjn,
              !1,
            );
      }
    }
    $3r() {
      var t, i, e, a;
      this.oRe.MainAnimInstance &&
        UE.KismetSystemLibrary.IsValid(this.oRe.MainAnimInstance) &&
        (ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? this.Hte.IsMoveAutonomousProxy &&
            (this.oRe.MainAnimInstance.GetStateOrdersSendPending(
              animationStateListRef,
            ),
            (t = (0, puerts_1.$unref)(animationStateListRef)),
            this.oRe.SpecialAnimInstance?.GetStateOrdersSendPending(
              specialStateListRef,
            ),
            (i = (0, puerts_1.$unref)(specialStateListRef)),
            0 < t.Num() || (this.oRe.SpecialAnimInstance && 0 < i.Num())) &&
            ((e = []),
            (a = []),
            WorldGlobal_1.WorldGlobal.ToTsArray(t, e),
            this.oRe.SpecialAnimInstance &&
              WorldGlobal_1.WorldGlobal.ToTsArray(i, a),
            e.length > CharacterAnimationSyncComponent_1.z3r ||
            a.length > CharacterAnimationSyncComponent_1.z3r
              ? (CombatLog_1.CombatLog.Error(
                  "Animation",
                  this.Entity,
                  "状态机增量变化数组超长",
                  ["v", CharacterAnimationSyncComponent_1.OrderToString(e)],
                  ["length", e.length],
                ),
                this.AnimationStateInitPush())
              : this.AnimationStateChangedPush(this.Entity, e, a))
          : Time_1.Time.NowSeconds > this.vTa + this.MTa &&
            (this.oRe.MainAnimInstance.ClearStateOrdersSendPending(),
            this.oRe.SpecialAnimInstance?.ClearStateOrdersSendPending(),
            (this.vTa = Time_1.Time.NowSeconds)));
    }
    ClearOrders() {
      this.oRe.MainAnimInstance.ClearStateOrdersReceivePending(),
        this.oRe.MainAnimInstance.ClearStateOrdersSendPending();
    }
    AnimationGameplayTagHandle(t) {
      !this.Hte.IsMoveAutonomousProxy &&
        this.Lie &&
        (t.eWn ? this.Lie.AddTag(t.Zjn) : this.Lie.RemoveTag(t.Zjn));
    }
    static AnimationGameplayTagNotify(t, i) {
      t?.GetComponent(42)?.AnimationGameplayTagHandle(i);
    }
    AnimationStateChangedPush(t, i, e) {
      var a;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (((a = Protocol_1.Aki.Protocol.w3n.create()).Xjn = i),
        (a.$jn = e),
        (a.Xjn.length > MAX_ANIM_STATE_CHANGE_COUNT ||
          a.$jn.length > MAX_ANIM_STATE_CHANGE_COUNT) &&
          CombatLog_1.CombatLog.Error(
            "Animation",
            t,
            "状态机增量变化数组超长",
            ["States", CharacterAnimationSyncComponent_1.OrderToString(a.Xjn)],
            [
              "SpecialStates",
              CharacterAnimationSyncComponent_1.OrderToString(a.$jn),
            ],
          ),
        CombatMessage_1.CombatNet.Call(15998, t, a, () => {}));
    }
    AnimationStateInitPush() {
      var t, i, e, a;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (this.oRe.MainAnimInstance.GetOriginStates(animationStateListRef),
        (a = (0, puerts_1.$unref)(animationStateListRef)),
        this.oRe.SpecialAnimInstance?.GetOriginStates(specialStateListRef),
        (t = (0, puerts_1.$unref)(specialStateListRef)),
        a || t) &&
        ((i = []),
        (e = []),
        WorldGlobal_1.WorldGlobal.ToTsArray(a, i),
        WorldGlobal_1.WorldGlobal.ToTsArray(t, e),
        ((a = Protocol_1.Aki.Protocol.b3n.create()).Xjn = i),
        (a.$jn = e),
        (a.Xjn.length > MAX_ANIM_STATE_CHANGE_COUNT ||
          a.$jn.length > MAX_ANIM_STATE_CHANGE_COUNT) &&
          CombatLog_1.CombatLog.Error(
            "Animation",
            this.Entity,
            "状态机增量变化数组超长",
            ["States", CharacterAnimationSyncComponent_1.OrderToString(a.Xjn)],
            [
              "SpecialStates",
              CharacterAnimationSyncComponent_1.OrderToString(a.$jn),
            ],
          ),
        CombatLog_1.CombatLog.Info(
          "Animation",
          this.Entity,
          "动画状态机初始化请求",
          ["v", CharacterAnimationSyncComponent_1.OrderToString(i)],
        ),
        CombatMessage_1.CombatNet.Call(23406, this.Entity, a, () => {}));
    }
    static AnimationStateChangedNotify(t, i) {
      var e = t?.GetComponent(1);
      t &&
        e &&
        !e.IsMoveAutonomousProxy &&
        ((e = t.GetComponent(162)),
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.Xjn, animationStates),
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.$jn, specialAnimationStates),
        e.MainAnimInstance.SetStateOrdersReceivePending(animationStates),
        e.SpecialAnimInstance?.SetStateOrdersReceivePending(
          specialAnimationStates,
        ));
    }
    static AnimationStateInitNotify(t, i) {
      CombatLog_1.CombatLog.Info("Animation", t, "动画状态机初始化通知", [
        "v",
        this.OrderToString(i.Xjn),
      ]);
      var t = t.GetComponent(162),
        e = UE.NewArray(UE.BuiltinInt);
      WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.Xjn, e),
        t.MainAnimInstance.SetStateOrdersReceivePending(e),
        t.SpecialAnimInstance &&
          ((e = UE.NewArray(UE.BuiltinInt)),
          WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.$jn, e),
          t.SpecialAnimInstance.SetStateOrdersReceivePending(e));
    }
    static OrderToString(t) {
      var i = new StringBuilder_1.StringBuilder();
      let e = -1;
      for (; e + 5 <= t.length; ) {
        var a = t[++e],
          o = t[++e],
          n = e + o;
        for (i.Append("[" + a); e + 3 <= n; ) {
          var r = t[++e],
            s = (++e, t[++e]);
          i.Append("=>" + r), (e += s);
        }
        i.Append("]");
      }
      return i.ToString();
    }
  });
(CharacterAnimationSyncComponent.z3r = 600),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("kFn")],
    CharacterAnimationSyncComponent,
    "AnimationGameplayTagNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("RFn")],
    CharacterAnimationSyncComponent,
    "AnimationStateChangedNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("xFn")],
    CharacterAnimationSyncComponent,
    "AnimationStateInitNotify",
    null,
  ),
  (CharacterAnimationSyncComponent = CharacterAnimationSyncComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(42)],
      CharacterAnimationSyncComponent,
    )),
  (exports.CharacterAnimationSyncComponent = CharacterAnimationSyncComponent);
//# sourceMappingURL=CharacterAnimationSyncComponent.js.map
