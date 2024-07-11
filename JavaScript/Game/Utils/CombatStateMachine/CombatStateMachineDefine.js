"use strict";
var Fsm;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Fsm = void 0),
  (function (s) {
    s.Task = class t {
      constructor() {
        (this.Type = 0), (this.CanBeInterrupt = !1), (this.Name = void 0);
      }
    };
    s.TaskSkill = class c {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.TaskSkillByName = class i {
      constructor() {
        this.SkillName = "";
      }
    };
    s.TaskRandomMontage = class o {
      constructor() {
        (this.MontageNames = void 0),
          (this.HideOnLoading = !1),
          (this.BlendInTime = 0);
      }
    };
    s.TaskLeaveFight = class h {
      constructor() {
        (this.BlinkTime = 0),
          (this.MaxStopTime = 0),
          (this.UsePatrolPointPriority = !1);
      }
    };
    s.TaskMontage = class r {
      constructor() {
        (this.MontageName = ""),
          (this.HideOnLoading = !1),
          (this.BlendInTime = 0);
      }
    };
    s.TaskMoveToTarget = class a {
      constructor() {
        (this.MoveState = 0),
          (this.NavigationOn = !1),
          (this.EndDistance = 0),
          (this.TurnSpeed = 0),
          (this.FixPeriod = 0),
          (this.WalkOff = !1);
      }
    };
    s.TaskPatrol = class l {
      constructor() {
        (this.MoveState = 0), (this.OpenDebugMode = !1);
      }
    };
    s.Action = class u {
      constructor() {
        (this.Type = 0), (this.Name = void 0);
      }
    };
    s.ActionAddBuff = class n {
      constructor() {
        this.BuffId = 0;
      }
    };
    s.ActionRemoveBuff = class v {
      constructor() {
        this.BuffId = 0;
      }
    };
    s.ActionCastSkill = class d {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.ActionCancelSkill = class e {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.ActionResetStatus = class p {};
    s.ActionEnterFight = class x {};
    s.ActionCastSkillByName = class m {
      constructor() {
        this.SkillName = "";
      }
    };
    s.ActionCancelSkillByName = class F {
      constructor() {
        this.SkillName = "";
      }
    };
    s.ActionInstChangeStateTag = class _ {
      constructor() {
        this.TagId = 0;
      }
    };
    s.ActionResetPart = class b {
      constructor() {
        (this.PartName = ""), (this.ResetActivate = !1), (this.ResetLife = !1);
      }
    };
    s.ActionActivatePart = class f {
      constructor() {
        (this.PartName = ""), (this.Activate = !1);
      }
    };
    s.ActionActivateSkillGroup = class j {
      constructor() {
        (this.ConfigId = 0), (this.Activate = !1);
      }
    };
    s.ActionDispatchEvent = class M {
      constructor() {
        this.Event = "";
      }
    };
    s.ActionCue = class O {
      constructor() {
        this.CueIds = void 0;
      }
    };
    s.ActionStopMontage = class g {};
    s.State = class k {
      constructor() {
        (this.Type = 0), (this.Name = void 0);
      }
    };
    s.BindBuff = class q {
      constructor() {
        this.BuffId = 0;
      }
    };
    s.BindSkill = class w {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.BindTag = class y {
      constructor() {
        this.TagId = 0;
      }
    };
    s.BindSkillByName = class z {
      constructor() {
        this.SkillName = "";
      }
    };
    s.BindSkillCounter = class A {
      constructor() {
        (this.SkillIds = void 0),
          (this.BlackboardKey = ""),
          (this.AddValueMin = 0),
          (this.AddValueMax = 0),
          (this.Reset = !1);
      }
    };
    s.BindActivateSkillGroup = class B {
      constructor() {
        this.ConfigId = 0;
      }
    };
    s.BindAiHateConfig = class C {
      constructor() {
        this.ConfigId = 0;
      }
    };
    s.BindAiSenseEnable = class D {
      constructor() {
        this.ConfigId = 0;
      }
    };
    s.BindCue = class E {
      constructor() {
        (this.CueIds = void 0), (this.HideOnLoading = !1);
      }
    };
    s.BindDisableActor = class G {};
    s.BindLeaveFight = class H {
      constructor() {
        (this.RandomRadius = 0),
          (this.MinWanderDistance = 0),
          (this.MaxNavigationMillisecond = 0),
          (this.MoveStateForWanderOrReset = !1),
          (this.MaxStopTime = 0),
          (this.BlinkTime = 0),
          (this.UsePatrolPointPriority = !1);
      }
    };
    s.BindMontage = class I {
      constructor() {
        (this.MontageName = ""), (this.HideOnLoading = !1);
      }
    };
    s.BindBoneVisible = class J {
      constructor() {
        (this.BoneName = ""), (this.Visible = !1);
      }
    };
    s.BindMeshVisible = class K {
      constructor() {
        (this.Tag = ""), (this.Visible = !1), (this.PropagateToChildren = !1);
      }
    };
    s.BindBoneCollision = class L {
      constructor() {
        (this.BoneName = ""),
          (this.IsBlockPawn = !1),
          (this.IsBulletDetect = !1),
          (this.IsBlockCamera = !1),
          (this.IsBlockPawnOnExit = !1),
          (this.IsBulletDetectOnExit = !1),
          (this.IsBlockCameraOnExit = !1);
      }
    };
    s.BindPartPanelVisible = class N {
      constructor() {
        (this.PartName = ""), (this.Visible = !1);
      }
    };
    s.BindDeathMontage = class P {
      constructor() {
        (this.DeathType = 0), (this.MontageName = "");
      }
    };
    s.BindPalsy = class Q {
      constructor() {
        (this.CounterAttackEffect = ""), (this.CounterAttackCamera = "");
      }
    };
    s.BindCollisionChannel = class R {
      constructor() {
        this.IgnoreChannels = void 0;
      }
    };
    s.BindDisableCollision = class S {};
    s.Condition = class T {
      constructor() {
        (this.Type = 0),
          (this.Reverse = !1),
          (this.Index = 0),
          (this.Name = void 0);
      }
    };
    s.CondAnd = class U {
      constructor() {
        this.Conditions = void 0;
      }
    };
    s.CondOr = class V {
      constructor() {
        this.Conditions = void 0;
      }
    };
    s.CondTrue = class W {};
    s.CondHpLessThan = class X {
      constructor() {
        this.HpRatio = 0;
      }
    };
    s.CondSkillEnd = class Y {};
    s.CondTag = class Z {
      constructor() {
        (this.TagId = 0), (this.TagName = "");
      }
    };
    s.CondBBValueCompare = class $ {
      constructor() {
        (this.Key1 = 0), (this.Key2 = 0), (this.Compare = 0);
      }
    };
    s.CondAttrCompare = class ss {
      constructor() {
        (this.Attr1 = 0), (this.Attr2 = 0), (this.Compare = 0);
      }
    };
    s.CondAttribute = class ts {
      constructor() {
        (this.AttributeId = 0), (this.Min = 0), (this.Max = 0);
      }
    };
    s.CondAttributeRate = class cs {
      constructor() {
        (this.AttributeId = 0),
          (this.Denominator = 0),
          (this.Min = 0),
          (this.Max = 0);
      }
    };
    s.CondCheckState = class is {
      constructor() {
        this.TargetState = 0;
      }
    };
    s.CondHate = class os {};
    s.CondListenLeaveFight = class hs {};
    s.CondTimer = class rs {
      constructor() {
        (this.MinTime = 0), (this.MaxTime = 0);
      }
    };
    s.CondWaitClient = class as {};
    s.CondCheckStateByName = class ls {
      constructor() {
        this.TargetStateName = "";
      }
    };
    s.CondInstStateChange = class us {
      constructor() {
        this.TagId = 0;
      }
    };
    s.CondBuffStack = class ns {
      constructor() {
        (this.BuffId = 0), (this.MinStack = 0), (this.MaxStack = 0);
      }
    };
    s.CondPartLife = class vs {
      constructor() {
        (this.PartName = ""),
          (this.CheckRate = !1),
          (this.Min = 0),
          (this.Max = 0);
      }
    };
    s.CondCheckPartActivated = class ds {
      constructor() {
        this.PartName = "";
      }
    };
    s.CondListenEvent = class es {
      constructor() {
        this.Event = "";
      }
    };
    s.CondTaskFinish = class ps {};
    s.CondMontageTimeRemaining = class xs {
      constructor() {
        this.Time = 0;
      }
    };
    s.CondListenBeHit = class ms {
      constructor() {
        (this.NoHitAnimation = !1),
          (this.SoftKnock = !1),
          (this.HeavyKnock = !1),
          (this.KnockUp = !1),
          (this.KnockDown = !1),
          (this.Parry = !1),
          (this.VisionCounterAttackId = 0);
      }
    };
    s.Transition = class Fs {
      constructor() {
        (this.From = 0),
          (this.To = 0),
          (this.TransitionPredictionType = void 0),
          (this.Weight = 0),
          (this.Conditions = void 0);
      }
    };
    s.Node = class _s {
      constructor() {
        (this.Uuid = 0),
          (this.ReferenceUuid = void 0),
          (this.OverrideCommonUuid = void 0),
          (this.Name = ""),
          (this.TakeControlType = 0),
          (this.TransitionRule = 0);
      }
    };
    s.StateMachineGroup = class bs {
      constructor() {
        (this.Version = void 0),
          (this.StateMachines = void 0),
          (this.Nodes = void 0);
      }
    };
  })((Fsm = exports.Fsm || (exports.Fsm = {})));
//# sourceMappingURL=CombatStateMachineDefine.js.map
