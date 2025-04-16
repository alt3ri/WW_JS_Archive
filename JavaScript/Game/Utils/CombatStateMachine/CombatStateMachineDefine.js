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
        (this.TargetType = 0),
          (this.MoveState = 0),
          (this.EndDistance = 0),
          (this.TurnSpeed = 0),
          (this.WalkOff = !1);
      }
    };
    s.TaskPatrol = class l {
      constructor() {
        (this.MoveState = 0), (this.OpenDebugMode = !1);
      }
    };
    s.TaskBeHitMontage = class u {
      constructor() {
        (this.DefaultMontageName = ""),
          (this.MontageMap = []),
          (this.BlendInTime = 0);
      }
    };
    s.TaskGroupPatrol = class n {};
    s.Action = class v {
      constructor() {
        (this.Type = 0), (this.Name = void 0);
      }
    };
    s.ActionAddBuff = class d {
      constructor() {
        this.BuffId = 0;
      }
    };
    s.ActionRemoveBuff = class e {
      constructor() {
        this.BuffId = 0;
      }
    };
    s.ActionCastSkill = class p {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.ActionCancelSkill = class x {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.ActionResetStatus = class m {};
    s.ActionEnterFight = class F {};
    s.ActionCastSkillByName = class _ {
      constructor() {
        this.SkillName = "";
      }
    };
    s.ActionCancelSkillByName = class b {
      constructor() {
        this.SkillName = "";
      }
    };
    s.ActionInstChangeStateTag = class f {
      constructor() {
        this.TagId = 0;
      }
    };
    s.ActionResetPart = class j {
      constructor() {
        (this.PartName = ""), (this.ResetActivate = !1), (this.ResetLife = !1);
      }
    };
    s.ActionActivatePart = class M {
      constructor() {
        (this.PartName = ""), (this.Activate = !1);
      }
    };
    s.ActionActivateSkillGroup = class O {
      constructor() {
        (this.ConfigId = 0), (this.Activate = !1);
      }
    };
    s.ActionDispatchEvent = class g {
      constructor() {
        this.Event = "";
      }
    };
    s.ActionCue = class k {
      constructor() {
        this.CueIds = void 0;
      }
    };
    s.ActionStopMontage = class q {
      constructor() {
        this.BlendOutTime = 0;
      }
    };
    s.ActionExitHit = class w {};
    s.State = class y {
      constructor() {
        (this.Type = 0), (this.Name = void 0);
      }
    };
    s.BindBuff = class z {
      constructor() {
        this.BuffId = 0;
      }
    };
    s.BindSkill = class A {
      constructor() {
        this.SkillId = 0;
      }
    };
    s.BindTag = class B {
      constructor() {
        this.TagId = 0;
      }
    };
    s.BindSkillByName = class C {
      constructor() {
        this.SkillName = "";
      }
    };
    s.BindSkillCounter = class D {
      constructor() {
        (this.SkillIds = void 0),
          (this.BlackboardKey = ""),
          (this.AddValueMin = 0),
          (this.AddValueMax = 0),
          (this.Reset = !1);
      }
    };
    s.BindDelaySuicide = class E {
      constructor() {
        (this.SuicideDelay = 0), (this.DestroyDelay = 0);
      }
    };
    s.BindActivateSkillGroup = class G {
      constructor() {
        this.ConfigId = 0;
      }
    };
    s.BindAiHateConfig = class H {
      constructor() {
        this.ConfigId = 0;
      }
    };
    s.BindAiSenseEnable = class I {
      constructor() {
        this.ConfigId = 0;
      }
    };
    s.BindCue = class J {
      constructor() {
        (this.CueIds = void 0), (this.HideOnLoading = !1);
      }
    };
    s.BindDisableActor = class K {};
    s.BindLeaveFight = class L {
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
    s.BindMontage = class N {
      constructor() {
        (this.MontageName = ""), (this.HideOnLoading = !1);
      }
    };
    s.BindBoneVisible = class P {
      constructor() {
        (this.BoneName = ""), (this.Visible = !1);
      }
    };
    s.BindMeshVisible = class Q {
      constructor() {
        (this.Tag = ""), (this.Visible = !1), (this.PropagateToChildren = !1);
      }
    };
    s.BindBoneCollision = class R {
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
    s.BindPartPanelVisible = class S {
      constructor() {
        (this.PartName = ""), (this.Visible = !1);
      }
    };
    s.BindDeathMontage = class T {
      constructor() {
        (this.DeathType = 0), (this.MontageName = "");
      }
    };
    s.BindPalsy = class U {
      constructor() {
        (this.CounterAttackEffect = ""), (this.CounterAttackCamera = "");
      }
    };
    s.BindCollisionChannel = class V {
      constructor() {
        this.IgnoreChannels = void 0;
      }
    };
    s.BindDisableCollision = class W {};
    s.Condition = class X {
      constructor() {
        (this.Type = 0),
          (this.Reverse = !1),
          (this.Index = 0),
          (this.Name = void 0);
      }
    };
    s.CondAnd = class Y {
      constructor() {
        this.Conditions = void 0;
      }
    };
    s.CondOr = class Z {
      constructor() {
        this.Conditions = void 0;
      }
    };
    s.CondTrue = class $ {};
    s.CondHpLessThan = class ss {
      constructor() {
        this.HpRatio = 0;
      }
    };
    s.CondSkillEnd = class ts {};
    s.CondTag = class cs {
      constructor() {
        (this.TagId = 0), (this.TagName = "");
      }
    };
    s.CondBBValueCompare = class is {
      constructor() {
        (this.Key1 = 0), (this.Key2 = 0), (this.Compare = 0);
      }
    };
    s.CondAttrCompare = class os {
      constructor() {
        (this.Attr1 = 0), (this.Attr2 = 0), (this.Compare = 0);
      }
    };
    s.CondAttribute = class hs {
      constructor() {
        (this.AttributeId = 0), (this.Min = 0), (this.Max = 0);
      }
    };
    s.CondAttributeRate = class rs {
      constructor() {
        (this.AttributeId = 0),
          (this.Denominator = 0),
          (this.Min = 0),
          (this.Max = 0);
      }
    };
    s.CondCheckState = class as {
      constructor() {
        this.TargetState = 0;
      }
    };
    s.CondHate = class ls {};
    s.CondTimer = class us {
      constructor() {
        (this.MinTime = 0), (this.MaxTime = 0);
      }
    };
    s.CondWaitClient = class ns {};
    s.CondCheckStateByName = class vs {
      constructor() {
        this.TargetStateName = "";
      }
    };
    s.CondInstStateChange = class ds {
      constructor() {
        this.TagId = 0;
      }
    };
    s.CondBuffStack = class es {
      constructor() {
        (this.BuffId = 0), (this.MinStack = 0), (this.MaxStack = 0);
      }
    };
    s.CondPartLife = class ps {
      constructor() {
        (this.PartName = ""),
          (this.CheckRate = !1),
          (this.Min = 0),
          (this.Max = 0);
      }
    };
    s.CondCheckPartActivated = class xs {
      constructor() {
        this.PartName = "";
      }
    };
    s.CondListenEvent = class ms {
      constructor() {
        this.Event = "";
      }
    };
    s.CondCheckPositionState = class Fs {
      constructor() {
        this.PositionState = 0;
      }
    };
    s.CondTaskFinish = class _s {};
    s.CondMontageTimeRemaining = class bs {
      constructor() {
        this.Time = 0;
      }
    };
    s.CondListenBeHit = class fs {
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
    s.CondHasMoveInput = class js {};
    s.CondCheckGroupPatrol = class Ms {};
    s.CondMontageTimeElapsing = class Os {
      constructor() {
        this.Time = 0;
      }
    };
    s.CondCheckLastState = class gs {
      constructor() {
        this.TargetStateName = "";
      }
    };
    s.CondCheckDissolveCombine = class ks {};
    s.Transition = class qs {
      constructor() {
        (this.From = 0),
          (this.To = 0),
          (this.TransitionPredictionType = void 0),
          (this.Weight = 0),
          (this.Conditions = void 0);
      }
    };
    s.Node = class ws {
      constructor() {
        (this.Uuid = 0),
          (this.ReferenceUuid = void 0),
          (this.OverrideCommonUuid = void 0),
          (this.IsAnimStateMachine = !1),
          (this.IsConduitNode = !1),
          (this.IsAnyState = !1),
          (this.Name = ""),
          (this.TakeControlType = 0),
          (this.TransitionRule = 0);
      }
    };
    s.StateMachineGroup = class ys {
      constructor() {
        (this.Version = void 0),
          (this.StateMachines = void 0),
          (this.Nodes = void 0);
      }
    };
  })((Fsm = exports.Fsm || (exports.Fsm = {})));
//# sourceMappingURL=CombatStateMachineDefine.js.map
