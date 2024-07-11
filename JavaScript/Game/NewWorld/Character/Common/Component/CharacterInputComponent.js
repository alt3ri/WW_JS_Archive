"use strict";
var CharacterInputComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, e) {
      var h,
        n = arguments.length,
        r =
          n < 3
            ? i
            : null === e
              ? (e = Object.getOwnPropertyDescriptor(i, s))
              : e;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, s, e);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (r = (n < 3 ? h(r) : 3 < n ? h(i, s, r) : h(i, s)) || r);
      return 3 < n && r && Object.defineProperty(i, s, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterInputComponent = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  CameraUtility_1 = require("../../../../Camera/CameraUtility"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  InputController_1 = require("../../../../Input/InputController"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  InputFilter_1 = require("../../../../Input/InputFilter"),
  InputFilterManager_1 = require("../../../../Input/InputFilterManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  RoleGaitStatic_1 = require("../../Role/Component/Define/RoleGaitStatic"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  ZERO_TIME = 0,
  NULL_CONFIG_TIME = -1,
  INVALID_PRIORITY = -1,
  INVALID_PRIORITY_INDEX = -1,
  INVALID_INPUT_TIME = -1,
  MOVE_VECTOR_CACHE_TIME = 100;
class InputEvent {
  constructor(t, i, s) {
    (this.Action = void 0),
      (this.State = void 0),
      (this.Time = 0),
      (this.Action = t),
      (this.State = i),
      (this.Time = s);
  }
}
class InputCommand {
  constructor(t, i, s, e) {
    (this.Action = void 0),
      (this.State = void 0),
      (this.Command = void 0),
      (this.Index = 0),
      (this.Action = t),
      (this.State = i),
      (this.Command = s),
      (this.Index = e);
  }
}
class InputCache {
  constructor(t, i, s, e) {
    (this.Action = void 0),
      (this.State = void 0),
      (this.EventTime = 0),
      (this.Time = 0),
      (this.Action = t),
      (this.State = i),
      (this.EventTime = s),
      (this.Time = e);
  }
}
class AutomaticFlightData {
  constructor(t) {
    (this.MinFlySpeed = void 0),
      (this.NormalFlySpeed = void 0),
      (this.MaxFlySpeed = void 0),
      (this.SpeedTransitionCurve = void 0),
      (this.ForwardAxisResponseValue = void 0),
      (this.BackwardAxisResponseValue = void 0),
      (this.ForwardSkill = void 0),
      (this.BackwardSkill = void 0),
      (this.CurrentSkill = void 0),
      (this.FlySpeed = void 0),
      (this.LastFlySpeed = void 0),
      (this.TargetFlySpeed = void 0),
      (this.LastState = 0),
      (this.CurrentState = 0),
      (this.MinFlySpeed = t.低飞行速度),
      (this.NormalFlySpeed = t.标准飞行速度),
      (this.MaxFlySpeed = t.高飞行速度),
      (this.SpeedTransitionCurve = t.速度过渡曲线),
      (this.ForwardAxisResponseValue = t.前向轴输入响应比例),
      (this.BackwardAxisResponseValue =
        0 < t.后向轴输入响应比例
          ? -t.后向轴输入响应比例
          : t.后向轴输入响应比例),
      (this.ForwardSkill = t.前向轴输入响应技能),
      (this.BackwardSkill = t.后向轴输入响应技能);
  }
}
let CharacterInputComponent =
  (CharacterInputComponent_1 = class CharacterInputComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.cz = Vector_1.Vector.Create()),
        (this.cie = Rotator_1.Rotator.Create()),
        (this.e7o = Quat_1.Quat.Create()),
        (this.k6r = Quat_1.Quat.Create()),
        (this.Hte = void 0),
        (this.pZo = void 0),
        (this.Lie = void 0),
        (this.mBe = void 0),
        (this.tRr = void 0),
        (this.Gce = void 0),
        (this.rJo = void 0),
        (this.F6r = void 0),
        (this.V6r = void 0),
        (this.BpInputComp = void 0),
        (this.H6r = new Array()),
        (this.j6r = new Array()),
        (this.QMe = new Map()),
        (this.XMe = void 0),
        (this.W6r = Vector_1.Vector.Create()),
        (this.K6r = Vector_1.Vector.Create()),
        (this.Q6r = Vector_1.Vector.Create()),
        (this.X6r = INVALID_INPUT_TIME),
        (this.$6r = new Array()),
        (this.Rne = void 0),
        (this.Y6r = !1),
        (this.J6r = void 0),
        (this.z6r = 0),
        (this.Z6r = 0),
        (this.e8r = 0),
        (this.t8r = 0),
        (this.PPr = (t, i) => {
          this.SetCharacterController(i),
            InputController_1.InputController.AddInputHandler(this);
        }),
        (this.xPr = (t, i) => {
          (this.H6r.length = 0),
            (this.j6r.length = 0),
            this.QMe.clear(),
            this.SetCharacterController(void 0),
            InputController_1.InputController.RemoveInputHandler(this);
        }),
        (this.DVr = () => {
          this.i8r();
        }),
        (this.o8r = (t) => {
          this.r8r();
        }),
        (this.n8r = this.s8r.bind(this)),
        (this.jIa = !1),
        (this.fZt = (t) => {
          this.QMe.clear();
        }),
        (this.a8r = []),
        (this.h8r = Quat_1.Quat.Create()),
        (this.l8r = void 0),
        (this._8r = void 0),
        (this.u8r = void 0),
        (this.c8r = void 0),
        (this.m8r = void 0),
        (this.d8r = void 0),
        (this.C8r = void 0),
        (this.g8r = void 0),
        (this.f8r = void 0),
        (this.p8r = void 0),
        (this.v8r = void 0),
        (this.M8r = void 0),
        (this.E8r = void 0),
        (this.S8r = void 0),
        (this.y8r = new Map()),
        (this.I8r = new Map());
    }
    static get Dependencies() {
      return [3];
    }
    GetPriority() {
      return 0;
    }
    GetInputFilter() {
      return this.XMe;
    }
    HandlePressEvent(t, i) {
      ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)
        ? this.H6r.push(new InputEvent(t, 1, i))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "该战斗输入被禁用，不执行按下操作", [
            "action",
            t,
          ]);
    }
    HandleReleaseEvent(t, i) {
      ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)
        ? (this.H6r.push(new InputEvent(t, 2, i)),
          CharacterInputComponent_1.T8r.set(t, !1))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "该战斗输入被禁用，不执行放开操作", [
            "action",
            t,
          ]);
    }
    HandleHoldEvent(t, i) {
      this.H6r.push(new InputEvent(t, 3, i));
    }
    HandleInputAxis(t, i) {
      let s = i;
      if (Info_1.Info.IsInKeyBoard())
        switch (t) {
          case InputEnums_1.EInputAxis.LookUp:
          case InputEnums_1.EInputAxis.Turn:
          case InputEnums_1.EInputAxis.Zoom:
            s /= Time_1.Time.DeltaTimeSeconds;
        }
      this.QMe.set(t, s);
    }
    ClearInputAxis(t) {
      Info_1.Info.AxisInputOptimize && (t || this.QMe.clear(), (this.jIa = t));
    }
    PreProcessInput(t, i) {
      Info_1.Info.AxisInputOptimize
        ? this.jIa && ((this.jIa = !1), this.QMe.clear())
        : this.QMe.clear();
    }
    PostProcessInput(e, t) {
      this.L8r(), this.D8r();
      const h = new Array();
      if (
        (this.H6r.forEach((t, i) => {
          var s = this.R8r(e, t);
          s &&
            0 !== s.CommandType &&
            h.push(new InputCommand(t.Action, t.State, s, i));
        }),
        0 < this.a8r.length)
      ) {
        let t = this.H6r.length;
        for (const n of this.a8r) {
          var i = this.R8r(e, n);
          i && h.push(new InputCommand(n.Action, n.State, i, t)), t++;
        }
        this.a8r.length = 0;
      }
      var s = this.U8r(h);
      this.A8r(s),
        (this.H6r.length = 0),
        3 === s?.State && CharacterInputComponent_1.T8r.set(s.Action, !0),
        void 0 !== s &&
          (ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Input", 6, "ReceiveInput", [
              "BestInputCommand",
              JSON.stringify(s),
            ]),
          this.P8r(s, "PostProcessInput"));
    }
    TestActionInput(t, i, s) {
      t = new InputEvent(t, i, s);
      this.a8r.push(t);
    }
    R8r(t, i) {
      let s = void 0;
      switch (i.State) {
        case 1:
          if (0 < this.$6r.length)
            for (const h of this.$6r)
              if (
                h.ForbidExecuteCommand &&
                h.Action === i.Action &&
                h.State === i.State
              )
                return;
          this.x8r(i.Action, i.Time), (s = this.w8r(i.Action, i.Time));
          break;
        case 2:
          if (0 < this.$6r.length) {
            for (const n of this.$6r)
              if (
                n.ReleaseHoldCache &&
                n.Action === i.Action &&
                3 === n.State
              ) {
                for (let t = this.j6r.length - 1; 0 <= t; t--) {
                  var e = this.j6r[t];
                  e.Action === i.Action &&
                    3 === e.State &&
                    this.j6r.splice(t, 1);
                }
                break;
              }
            for (const r of this.$6r)
              if (
                r.ForbidExecuteCommand &&
                r.Action === i.Action &&
                r.State === i.State
              )
                return;
          }
          this.B8r(i.Action, i.Time), (s = this.b8r(i.Action, i.Time));
          break;
        case 3:
          if (!this.q8r(i.Action, i.Time, t))
            return void (i.Action = InputEnums_1.EInputAction.None);
          if (0 < this.$6r.length)
            for (const a of this.$6r)
              if (
                a.ForbidExecuteCommand &&
                a.Action === i.Action &&
                a.State === i.State
              )
                return;
          s = this.G8r(i.Action, i.Time);
      }
      return s;
    }
    A8r(t) {
      const h = this.N8r();
      const n = void 0 !== t ? t.Index : -1;
      this.H6r.forEach((i, t) => {
        if (t !== n && i.Action !== InputEnums_1.EInputAction.None) {
          for (let t = this.j6r.length - 1; 0 <= t; t--) {
            var s = this.j6r[t];
            s.Action === i.Action &&
              s.State === i.State &&
              this.j6r.slice(t, 1);
          }
          if (0 < this.$6r.length)
            for (const e of this.$6r)
              e.Action === i.Action &&
                e.State === i.State &&
                this.j6r.push(new InputCache(i.Action, i.State, i.Time, h));
          else
            this.O8r(i.Action, i.State) !== ZERO_TIME &&
              this.j6r.push(new InputCache(i.Action, i.State, i.Time, h));
        }
      });
    }
    SetMoveVectorCache(t, i) {
      this.K6r.DeepCopy(t),
        this.K6r.Normalize(),
        this.Q6r.DeepCopy(i),
        this.Q6r.Normalize();
    }
    ResetMoveVectorCache() {
      this.K6r.Reset(), this.Q6r.Reset();
    }
    SetCharacterController(t) {
      this.V6r = t;
    }
    get CharacterController() {
      return this.V6r;
    }
    get Character() {
      return this.F6r;
    }
    SetCharacter(t) {
      this.F6r = t;
    }
    GetMoveVectorCache() {
      return this.W6r;
    }
    GetMoveDirectionCache() {
      return this.K6r;
    }
    GetWorldMoveDirectionCache() {
      var t, i;
      return (
        this.Hte.IsAutonomousProxy &&
          (this.cie.FromUeRotator(
            Global_1.Global.CharacterCameraManager.GetCameraRotation(),
          ),
          GravityUtils_1.GravityUtils.GetQuatFromRotatorAndGravity(
            this.Hte,
            this.cie,
            this.h8r,
          ),
          this.rJo?.DirectionState ===
            CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection &&
            (t =
              ModelManager_1.ModelManager.CameraModel?.FightCamera
                ?.LogicComponent) &&
            (i = t.TargetEntity) &&
            this.GetNewQuatInLockMode(i, t.TargetSocketName, this.h8r),
          this.h8r.RotateVector(this.K6r, this.Q6r)),
        this.Q6r
      );
    }
    GetMoveVector(t) {
      this.Y6r
        ? t.Reset()
        : ((t.X =
            this.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0),
          (t.Y = this.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0),
          (t.Z = 0));
    }
    GetMoveDirection(t) {
      this.GetMoveVector(t), t.Normalize();
    }
    GetCameraInput() {
      return [
        this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0,
        this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp) ?? 0,
      ];
    }
    GetZoomInput() {
      return this.QueryInputAxis(InputEnums_1.EInputAxis.Zoom) ?? 0;
    }
    QueryInputAxis(t) {
      return this.QMe.get(t);
    }
    ClearMoveVectorCache() {
      this.W6r.Reset(),
        this.K6r.Reset(),
        this.Q6r.Reset(),
        (this.X6r = INVALID_INPUT_TIME);
    }
    AnimBreakPoint() {
      this.k8r() && this.r8r();
    }
    ClearInputCache(i, s) {
      if (0 === i) this.r8r();
      else
        for (let t = this.j6r.length - 1; 0 <= t; t--) {
          var e = this.j6r[t];
          e.Action !== i ||
            (0 !== e.State && e.State !== s) ||
            this.j6r.splice(t, 1);
        }
    }
    LimitInputCache(i) {
      this.$6r.push(i);
      for (let t = this.j6r.length - 1; 0 <= t; t--) {
        var s = this.j6r[t];
        s.Action !== i.Action ||
          (0 !== s.State && s.State !== i.State) ||
          this.j6r.splice(t, 1);
      }
    }
    CancelLimitInputCache(i) {
      for (let t = 0; t < this.$6r.length; t++)
        this.$6r[t] === i && this.$6r.splice(t, 1);
      this.AnimBreakPoint();
    }
    OnInitData() {
      return (
        (this.XMe = new InputFilter_1.InputFilter(
          InputFilterManager_1.InputFilterManager.CharacterActions,
          void 0,
          InputFilterManager_1.InputFilterManager.CharacterAxes,
          void 0,
        )),
        this.W6r.Reset(),
        this.K6r.Reset(),
        this.Q6r.Reset(),
        (this.Z6r = CommonParamById_1.configCommonParamById.GetIntConfig(
          "MovementDirectionDistanceMin",
        )),
        (this.e8r = CommonParamById_1.configCommonParamById.GetIntConfig(
          "MovementDirectionDistanceMax",
        )),
        (this.t8r = CommonParamById_1.configCommonParamById.GetIntConfig(
          "MovementDirectionAngleThreshold",
        )),
        !0
      );
    }
    OnStart() {
      this.Hte = this.Entity.GetComponent(3);
      const i = this.Hte.Actor;
      return (
        this.SetCharacter(i),
        this.V6r && InputController_1.InputController.AddInputHandler(this),
        (this.pZo = this.Entity.GetComponent(17)),
        (this.Lie = this.Entity.GetComponent(188)),
        (this.mBe = this.Entity.GetComponent(160)),
        (this.tRr = this.Entity.GetComponent(33)),
        (this.Gce = this.Entity.GetComponent(163)),
        (this.rJo = this.Entity.GetComponent(160)),
        i.InputComponentClass
          ? ResourceSystem_1.ResourceSystem.LoadAsync(
              i.InputComponentClass.AssetPathName?.toString(),
              UE.Class,
              (t) => {
                (this.BpInputComp = i.AddComponentByClass(
                  t,
                  !1,
                  MathUtils_1.MathUtils.DefaultTransform,
                  !1,
                )),
                  (this.BpInputComp.OwnerActor = i);
              },
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Input",
              6,
              "1060541 InputComponent init NoClass.",
              ["Role", i.GetName()],
            ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.n8r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharPossessed,
          this.PPr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUnpossessed,
          this.xPr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.DVr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDrownInjure,
          this.o8r,
        ),
        Info_1.Info.AxisInputOptimize &&
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnShowMouseCursor,
            this.fZt,
          ),
        this.F8r(),
        !0
      );
    }
    OnEnd() {
      return (
        InputController_1.InputController.RemoveInputHandler(this),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.n8r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharPossessed,
          this.PPr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUnpossessed,
          this.xPr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.DVr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDrownInjure,
          this.o8r,
        ),
        Info_1.Info.AxisInputOptimize &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnShowMouseCursor,
            this.fZt,
          ),
        (this.X6r = INVALID_INPUT_TIME),
        (this.H6r.length = 0),
        (this.j6r.length = 0),
        this.QMe.clear(),
        this.V8r(),
        !0
      );
    }
    OnTick(t) {
      this.Y6r ? this.H8r(t) : this.i8r();
    }
    F8r() {
      (this.l8r = this.j8r(-469423249, InputEnums_1.EInputAction.跳跃)),
        (this._8r = this.j8r(766688429, InputEnums_1.EInputAction.攀爬)),
        (this.u8r = this.j8r(-542518289, InputEnums_1.EInputAction.攻击)),
        (this.c8r = this.j8r(581080458, InputEnums_1.EInputAction.闪避)),
        (this.m8r = this.j8r(-541178966, InputEnums_1.EInputAction.技能1)),
        (this.d8r = this.j8r(-1802431900, InputEnums_1.EInputAction.幻象1)),
        (this.C8r = this.j8r(-732810197, InputEnums_1.EInputAction.大招)),
        (this.g8r = this.j8r(-1752099043, InputEnums_1.EInputAction.幻象2)),
        (this.f8r = this.j8r(-1216591977, InputEnums_1.EInputAction.切换角色1)),
        (this.p8r = this.j8r(-1199814358, InputEnums_1.EInputAction.切换角色2)),
        (this.v8r = this.j8r(-1183036739, InputEnums_1.EInputAction.切换角色3)),
        (this.M8r = this.j8r(-2140742267, InputEnums_1.EInputAction.锁定目标)),
        (this.E8r = this.j8r(-1013832153, InputEnums_1.EInputAction.瞄准)),
        (this.S8r = this.W8r(1616400338, [
          InputEnums_1.EInputAxis.MoveForward,
          InputEnums_1.EInputAxis.MoveRight,
        ]));
    }
    j8r(t, s) {
      return this.Lie.ListenForTagAddOrRemove(t, (t, i) => {
        i ? this.XMe.BlockActions.add(s) : this.XMe.BlockActions.delete(s);
      });
    }
    W8r(t, e) {
      return this.Lie.ListenForTagAddOrRemove(t, (t, i) => {
        for (const s of e)
          i ? this.XMe.BlockAxes.add(s) : this.XMe.BlockAxes.delete(s);
      });
    }
    V8r() {
      this.l8r.EndTask(),
        this._8r.EndTask(),
        this.u8r.EndTask(),
        this.c8r.EndTask(),
        this.m8r.EndTask(),
        this.d8r.EndTask(),
        this.C8r.EndTask(),
        this.g8r.EndTask(),
        this.f8r.EndTask(),
        this.p8r.EndTask(),
        this.v8r.EndTask(),
        this.M8r.EndTask(),
        this.E8r.EndTask(),
        this.S8r.EndTask();
    }
    K8r() {
      return (
        this.Gce?.CharacterMovement?.CustomMovementMode ===
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE &&
        (this.Entity.GetComponent(30)?.LockRotator ?? !1)
      );
    }
    i8r() {
      let t = Vector_1.Vector.ZeroVectorProxy;
      if (this.Lie?.Valid && this.mBe.Valid)
        if (this.Lie.HasTag(1996624497))
          (t = this.GetWorldMoveDirectionCache()),
            this.Hte.SetInputDirect(t, !0),
            this.K8r()
              ? this.Hte.SetInputFacing(this.Hte.ActorForwardProxy)
              : this.Q8r();
        else
          switch (
            ((t =
              this.rJo?.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Climb ||
              this.rJo?.MoveState ===
                CharacterUnifiedStateTypes_1.ECharMoveState.Soar
                ? this.GetMoveDirectionCache()
                : this.GetWorldMoveDirectionCache()),
            this.Hte.SetInputDirect(t, !0),
            this.mBe.PositionState)
          ) {
            case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
              this.X8r();
              break;
            case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
            case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
              this.Q8r();
          }
      else
        (t = this.GetWorldMoveDirectionCache()),
          this.Hte.SetInputDirect(t, !0),
          this.Q8r();
    }
    H8r(t) {
      var i;
      this.Lie?.Valid &&
        this.pZo?.Valid &&
        (this.Lie.HasTag(1616400338) ||
          (this.mBe.PositionState !==
          CharacterUnifiedStateTypes_1.ECharPositionState.Air
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("Input", 30, "错误的位置状态")
            : void 0 === this.J6r
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error("Input", 30, "自动飞行模式配置无效")
              : (this.J6r &&
                  ((i = this.QueryInputAxis(
                    InputEnums_1.EInputAxis.MoveForward,
                  )) > this.J6r.ForwardAxisResponseValue
                    ? ((this.J6r.CurrentState = 2),
                      (this.J6r.LastFlySpeed = this.J6r.TargetFlySpeed),
                      (this.J6r.TargetFlySpeed = this.J6r.MaxFlySpeed),
                      this.Gce.SetMaxSpeed(this.J6r.MaxFlySpeed),
                      0 < this.J6r.ForwardSkill &&
                        this.tRr.BeginSkill(this.J6r.ForwardSkill, {
                          Target: this.Entity,
                          Context: "EAutomaticFlightState.Max",
                        }) &&
                        (this.J6r.CurrentSkill = this.J6r.ForwardSkill))
                    : i < this.J6r.BackwardAxisResponseValue
                      ? ((this.J6r.CurrentState = 1),
                        (this.J6r.LastFlySpeed = this.J6r.TargetFlySpeed),
                        (this.J6r.TargetFlySpeed = this.J6r.MinFlySpeed),
                        this.Gce.SetMaxSpeed(this.J6r.MinFlySpeed),
                        0 < this.J6r.BackwardSkill &&
                          this.tRr.BeginSkill(this.J6r.BackwardSkill, {
                            Target: this.Entity,
                            Context: "EAutomaticFlightState.Min",
                          }) &&
                          (this.J6r.CurrentSkill = this.J6r.BackwardSkill))
                      : ((this.J6r.CurrentState = 0),
                        (this.J6r.LastFlySpeed = this.J6r.TargetFlySpeed),
                        (this.J6r.TargetFlySpeed = this.J6r.NormalFlySpeed),
                        this.Gce.SetMaxSpeed(this.J6r.NormalFlySpeed),
                        void 0 !== this.J6r.CurrentSkill &&
                          (this.tRr.EndSkill(
                            this.J6r.CurrentSkill,
                            "EAutomaticFlightState.Normal",
                          ),
                          (this.J6r.CurrentSkill = void 0)))),
                this.J6r.LastState !== this.J6r.CurrentState && (this.z6r = 0),
                (this.J6r.LastState = this.J6r.CurrentState),
                (this.z6r += t * MathUtils_1.MathUtils.MillisecondToSecond),
                (i = this.J6r.SpeedTransitionCurve.GetVectorValue(this.z6r).X),
                (this.J6r.FlySpeed = MathUtils_1.MathUtils.Lerp(
                  this.J6r.LastFlySpeed,
                  this.J6r.TargetFlySpeed,
                  i,
                )),
                this.Hte.ActorForwardProxy.Multiply(this.J6r.FlySpeed, this.cz),
                this.Gce.SetForceSpeed(this.cz))));
    }
    $8r() {
      this.Hte.SetInputFacing(
        this.Hte.Actor.Controller.GetActorForwardVector(),
        !0,
      );
    }
    X8r() {
      var t;
      this.Hte.UseControllerRotation
        ? this.$8r()
        : this.mBe.DirectionState ===
              CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection &&
            ((t =
              CameraController_1.CameraController.FightCamera.GetComponent(5)),
            this.mBe.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) &&
            t?.TargetEntity &&
            t?.IsTargetLocationValid &&
            !this.Lie.HasTag(131819029)
          ? (t.TargetLocation.Subtraction(this.Hte.ActorLocationProxy, this.cz),
            this.Hte.SetInputFacing(this.cz, !0))
          : this.Q8r(!1);
    }
    Q8r(t = !0) {
      GravityUtils_1.GravityUtils.GetPlanarSizeSquared2D(
        this.Hte,
        this.Hte.InputDirectProxy,
      ) > MathUtils_1.MathUtils.SmallNumber
        ? this.Hte.SetInputFacing(this.Hte.InputDirectProxy)
        : t && this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
    }
    q8r(t, i, s) {
      var [e, h] = this.GetHoldConfig(t);
      return (
        h !== NULL_CONFIG_TIME &&
        !(
          i < h ||
          (!e &&
            ((CharacterInputComponent_1.T8r.has(t) &&
              CharacterInputComponent_1.T8r.get(t)) ||
              !(h < i - s)))
        )
      );
    }
    L8r() {
      this.GetMoveVector(this.W6r),
        this.Y8r(this.W6r)
          ? Time_1.Time.Now - this.X6r > MOVE_VECTOR_CACHE_TIME &&
            (this.K6r.DeepCopy(this.W6r),
            this.K6r.Normalize(),
            (this.X6r = INVALID_INPUT_TIME))
          : (this.K6r.DeepCopy(this.W6r),
            this.K6r.Normalize(),
            (this.X6r = Time_1.Time.Now));
    }
    GetNewQuatInLockMode(t, i, s) {
      CameraUtility_1.CameraUtility.GetSocketLocation(void 0, i, this.cz, t),
        this.cz.SubtractionEqual(this.Hte.ActorLocationProxy);
      var i = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2D(
        this.Hte,
        this.cz,
      );
      i < this.Z6r * this.Z6r ||
        (s.Inverse(this.e7o),
        this.e7o.RotateVector(this.cz, this.cz),
        (t = this.cz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg),
        Math.abs(t) > this.t8r) ||
        ((i = MathUtils_1.MathUtils.RangeClamp(
          Math.sqrt(i),
          this.Z6r,
          this.e8r,
          0,
          t,
        )),
        this.cie.Set(0, i, 0),
        this.cie.Quaternion(this.e7o),
        s.Multiply(this.e7o, this.k6r),
        s.DeepCopy(this.k6r));
    }
    Y8r(t) {
      return Info_1.Info.IsInKeyBoard()
        ? t.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)
        : t.SizeSquared() <=
            MathUtils_1.MathUtils.Square(
              RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate(),
            );
    }
    D8r() {
      var i = this.N8r();
      for (let t = this.j6r.length - 1; 0 <= t; t--) {
        var s = this.j6r[t],
          e = this.O8r(s.Action, s.State);
        0 === this.$6r.length && i - s.Time > e && this.j6r.splice(t, 1);
      }
    }
    J8r() {
      var i = new Array();
      i.length = this.j6r.length;
      for (let t = this.j6r.length - 1; 0 <= t; t--) i.push(this.j6r[t]);
      return i;
    }
    r8r() {
      this.j6r.splice(0, this.j6r.length);
    }
    k8r() {
      if (0 === this.j6r.length) return !1;
      var t = this.J8r();
      const h = new Array();
      t.forEach((t, i) => {
        if (0 < this.$6r.length)
          for (const e of this.$6r)
            if (
              e.ForbidExecuteCommand &&
              e.Action === t.Action &&
              e.State === t.State
            )
              return;
        let s = void 0;
        switch (t.State) {
          case 1:
            s = this.w8r(t.Action, t.EventTime);
            break;
          case 2:
            s = this.b8r(t.Action, t.EventTime);
            break;
          case 3:
            s = this.G8r(t.Action, t.EventTime);
        }
        s &&
          0 !== s.CommandType &&
          h.push(new InputCommand(t.Action, t.State, s, i));
      });
      t = this.U8r(h);
      return (
        void 0 !== t &&
        (3 === t?.State && CharacterInputComponent_1.T8r.set(t.Action, !0),
        this.P8r(t, "QueryInputCaches"),
        !0)
      );
    }
    s8r(t) {
      this.F6r &&
        this.F6r.GetEntityIdNoBlueprint() === t &&
        this.k8r() &&
        this.r8r();
    }
    U8r(t) {
      if (0 !== t.length) {
        let s = INVALID_PRIORITY,
          e = INVALID_PRIORITY_INDEX;
        return (
          t.forEach((t, i) => {
            t = this.z8r(t.Command);
            t > s && ((s = t), (e = i));
          }),
          t[e]
        );
      }
    }
    z8r(t) {
      let i = void 0;
      switch (t.CommandType) {
        case 1:
          i = this.Z8r(t.IntValue);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          i = InputController_1.InputController.QueryCommandPriority(
            t.CommandType,
          );
      }
      return (i = void 0 === i ? INVALID_PRIORITY : i);
    }
    Z8r(t) {
      return this.F6r?.CharacterActorComponent?.Entity?.GetComponent(
        33,
      ).GetPriority(t);
    }
    P8r(t, i) {
      var s = t.Command;
      switch (s.CommandType) {
        case 1:
          this.e9r(s.IntValue, i);
          break;
        case 2:
          this.t9r(s);
          break;
        case 3:
          this.i9r(s);
          break;
        case 4:
          this.o9r(s);
          break;
        case 5:
          this.r9r(s);
          break;
        case 6:
          this.n9r(s);
          break;
        case 7:
          this.s9r(s.IntValue);
          break;
        case 8:
          this.a9r(s);
          break;
        case 9:
          this.pZo.SendGameplayEventToActor(s.TagValue);
      }
    }
    t9r(t) {
      var i = this.Entity.GetComponent(163);
      i.Valid && (1 === t.IntValue ? i.JumpPress() : i.JumpRelease());
    }
    i9r(t) {
      this.Entity.GetComponent(31)?.ClimbPress(1 === t.IntValue);
    }
    o9r(t) {
      1 === t.IntValue
        ? this.F6r.CharacterActorComponent.Entity.CheckGetComponent(
            160,
          ).SprintPress()
        : this.F6r.CharacterActorComponent.Entity.CheckGetComponent(
            160,
          ).SprintRelease();
    }
    r9r(t) {
      this.F6r.CharacterActorComponent.Entity.CheckGetComponent(
        160,
      ).SwitchFastSwim(1 === t.IntValue);
    }
    n9r(t) {
      this.F6r.CharacterActorComponent.Entity.CheckGetComponent(
        160,
      ).SwitchFastClimb(1 === t.IntValue);
    }
    a9r(t) {
      this.F6r.CharacterActorComponent.Entity.CheckGetComponent(
        160,
      ).WalkPress();
    }
    s9r(t) {}
    e9r(t, i) {
      this.Entity.GetComponent(33).BeginSkill(t, {
        Context: "CharacterInputComponent.ExecuteSkill." + i,
      });
    }
    N8r() {
      return UE.GameplayStatics.GetTimeSeconds(GlobalData_1.GlobalData.World);
    }
    SetActive(t) {
      t
        ? this.Rne &&
          (super.Enable(
            this.Rne,
            "[CharacterInputComponent.SetActive] this.DisableHandle=true",
          ),
          (this.Rne = void 0))
        : this.Rne ||
          (this.Rne = super.Disable(
            "[CharacterInputComponent.SetActive] this.DisableHandle=false",
          ));
    }
    x8r(t, i) {
      if (this.Hte) {
        if (this.BpInputComp)
          switch (t) {
            case InputEnums_1.EInputAction.跳跃:
              this.BpInputComp.跳跃按下事件(i);
              break;
            case InputEnums_1.EInputAction.攀爬:
              this.BpInputComp.攀爬按下事件(i);
              break;
            case InputEnums_1.EInputAction.走跑切换:
              this.BpInputComp.走跑切换按下事件(i);
              break;
            case InputEnums_1.EInputAction.攻击:
              this.BpInputComp.攻击按下事件(i);
              break;
            case InputEnums_1.EInputAction.闪避:
              this.BpInputComp.闪避按下事件(i);
              break;
            case InputEnums_1.EInputAction.技能1:
              this.BpInputComp.技能1按下事件(i);
              break;
            case InputEnums_1.EInputAction.幻象1:
              this.BpInputComp.幻象1按下事件(i);
              break;
            case InputEnums_1.EInputAction.大招:
              this.BpInputComp.大招按下事件(i);
              break;
            case InputEnums_1.EInputAction.幻象2:
              this.BpInputComp.幻象2按下事件(i);
              break;
            case InputEnums_1.EInputAction.切换角色1:
              this.BpInputComp.切换角色1按下事件(i);
              break;
            case InputEnums_1.EInputAction.切换角色2:
              this.BpInputComp.切换角色2按下事件(i);
              break;
            case InputEnums_1.EInputAction.切换角色3:
              this.BpInputComp.切换角色3按下事件(i);
              break;
            case InputEnums_1.EInputAction.锁定目标:
              this.BpInputComp.锁定目标按下事件(i);
              break;
            case InputEnums_1.EInputAction.瞄准:
              this.BpInputComp.瞄准按下事件(i);
          }
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    B8r(t, i) {
      if (this.Hte) {
        if (this.BpInputComp)
          switch (t) {
            case InputEnums_1.EInputAction.跳跃:
              this.BpInputComp.跳跃抬起事件(i);
              break;
            case InputEnums_1.EInputAction.攀爬:
              this.BpInputComp.攀爬抬起事件(i);
              break;
            case InputEnums_1.EInputAction.走跑切换:
              this.BpInputComp.走跑切换抬起事件(i);
              break;
            case InputEnums_1.EInputAction.攻击:
              this.BpInputComp.攻击抬起事件(i);
              break;
            case InputEnums_1.EInputAction.闪避:
              this.BpInputComp.闪避抬起事件(i);
              break;
            case InputEnums_1.EInputAction.技能1:
              this.BpInputComp.技能1抬起事件(i);
              break;
            case InputEnums_1.EInputAction.幻象1:
              this.BpInputComp.幻象1抬起事件(i);
              break;
            case InputEnums_1.EInputAction.大招:
              this.BpInputComp.大招抬起事件(i);
              break;
            case InputEnums_1.EInputAction.幻象2:
              this.BpInputComp.幻象2抬起事件(i);
              break;
            case InputEnums_1.EInputAction.切换角色1:
              this.BpInputComp.切换角色1抬起事件(i);
              break;
            case InputEnums_1.EInputAction.切换角色2:
              this.BpInputComp.切换角色2抬起事件(i);
              break;
            case InputEnums_1.EInputAction.切换角色3:
              this.BpInputComp.切换角色3抬起事件(i);
              break;
            case InputEnums_1.EInputAction.锁定目标:
              this.BpInputComp.锁定目标抬起事件(i);
              break;
            case InputEnums_1.EInputAction.瞄准:
              this.BpInputComp.瞄准抬起事件(i);
          }
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    w8r(t, i) {
      if (this.Hte) {
        if (this.BpInputComp)
          switch (
            (EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.CharInputPress,
              t,
              i,
            ),
            t)
          ) {
            case InputEnums_1.EInputAction.跳跃:
              return this.BpInputComp.跳跃按下(i);
            case InputEnums_1.EInputAction.攀爬:
              return this.BpInputComp.攀爬按下(i);
            case InputEnums_1.EInputAction.走跑切换:
              return this.BpInputComp.走跑切换按下(i);
            case InputEnums_1.EInputAction.攻击:
              return this.BpInputComp.攻击按下(i);
            case InputEnums_1.EInputAction.闪避:
              return this.BpInputComp.闪避按下(i);
            case InputEnums_1.EInputAction.技能1:
              return this.BpInputComp.技能1按下(i);
            case InputEnums_1.EInputAction.幻象1:
              return this.BpInputComp.幻象1按下(i);
            case InputEnums_1.EInputAction.大招:
              return this.BpInputComp.大招按下(i);
            case InputEnums_1.EInputAction.幻象2:
              return this.BpInputComp.幻象2按下(i);
            case InputEnums_1.EInputAction.切换角色1:
              return this.BpInputComp.切换角色1按下(i);
            case InputEnums_1.EInputAction.切换角色2:
              return this.BpInputComp.切换角色2按下(i);
            case InputEnums_1.EInputAction.切换角色3:
              return this.BpInputComp.切换角色3按下(i);
            case InputEnums_1.EInputAction.瞄准:
              return this.BpInputComp.瞄准按下(i);
            case InputEnums_1.EInputAction.通用交互:
              return this.BpInputComp.通用交互按下(i);
          }
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    b8r(t, i) {
      if (this.Hte) {
        if (this.BpInputComp)
          switch (t) {
            case InputEnums_1.EInputAction.跳跃:
              return this.BpInputComp.跳跃抬起(i);
            case InputEnums_1.EInputAction.攀爬:
              return this.BpInputComp.攀爬抬起(i);
            case InputEnums_1.EInputAction.走跑切换:
              return this.BpInputComp.走跑切换抬起(i);
            case InputEnums_1.EInputAction.攻击:
              return this.BpInputComp.攻击抬起(i);
            case InputEnums_1.EInputAction.闪避:
              return this.BpInputComp.闪避抬起(i);
            case InputEnums_1.EInputAction.技能1:
              return this.BpInputComp.技能1抬起(i);
            case InputEnums_1.EInputAction.幻象1:
              return this.BpInputComp.幻象1抬起(i);
            case InputEnums_1.EInputAction.大招:
              return this.BpInputComp.大招抬起(i);
            case InputEnums_1.EInputAction.幻象2:
              return this.BpInputComp.幻象2抬起(i);
            case InputEnums_1.EInputAction.切换角色1:
              return this.BpInputComp.切换角色1抬起(i);
            case InputEnums_1.EInputAction.切换角色2:
              return this.BpInputComp.切换角色2抬起(i);
            case InputEnums_1.EInputAction.切换角色3:
              return this.BpInputComp.切换角色3抬起(i);
            case InputEnums_1.EInputAction.瞄准:
              return this.BpInputComp.瞄准抬起(i);
          }
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    G8r(t, i) {
      if (this.Hte) {
        if (this.BpInputComp)
          switch (
            (EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.CharInputHold,
              t,
              i,
            ),
            t)
          ) {
            case InputEnums_1.EInputAction.跳跃:
              return this.BpInputComp.跳跃长按(i);
            case InputEnums_1.EInputAction.攀爬:
              return this.BpInputComp.攀爬长按(i);
            case InputEnums_1.EInputAction.走跑切换:
              return this.BpInputComp.走跑切换长按(i);
            case InputEnums_1.EInputAction.攻击:
              return this.BpInputComp.攻击长按(i);
            case InputEnums_1.EInputAction.闪避:
              return this.BpInputComp.闪避长按(i);
            case InputEnums_1.EInputAction.技能1:
              return this.BpInputComp.技能1长按(i);
            case InputEnums_1.EInputAction.幻象1:
              return this.BpInputComp.幻象1长按(i);
            case InputEnums_1.EInputAction.大招:
              return this.BpInputComp.大招长按(i);
            case InputEnums_1.EInputAction.幻象2:
              return this.BpInputComp.幻象2长按(i);
            case InputEnums_1.EInputAction.切换角色1:
              return this.BpInputComp.切换角色1长按(i);
            case InputEnums_1.EInputAction.切换角色2:
              return this.BpInputComp.切换角色2长按(i);
            case InputEnums_1.EInputAction.切换角色3:
              return this.BpInputComp.切换角色3长按(i);
            case InputEnums_1.EInputAction.锁定目标:
              return this.BpInputComp.锁定目标长按(i);
            case InputEnums_1.EInputAction.瞄准:
              return this.BpInputComp.瞄准长按(i);
          }
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    O8r(i, s) {
      if (this.BpInputComp) {
        let t = void 0;
        if (
          (this.y8r.has(i) ||
            ((t = this.BpInputComp.GetUnrealCacheConfig(i)),
            this.y8r.set(i, t)),
          (t = t || this.y8r.get(i)))
        ) {
          switch (s) {
            case 1:
              return t.按下;
            case 3:
              return t.长按;
            case 2:
              return t.抬起;
          }
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 15, "错误的输入状态 ", ["state", s]);
        }
      }
      return ZERO_TIME;
    }
    GetHoldConfig(t) {
      if (!this.BpInputComp) return [!1, NULL_CONFIG_TIME];
      let i = void 0;
      return (
        this.I8r.has(t) ||
          ((i = this.BpInputComp.GetUnrealHoldConfig(t)), this.I8r.set(t, i)),
        (i = i || this.I8r.get(t))
          ? [i.连续触发, i.触发时间]
          : [!1, NULL_CONFIG_TIME]
      );
    }
    TurnOnAutomaticFlightMode(t) {
      (this.Y6r = !0),
        (this.J6r = new AutomaticFlightData(t)),
        this.Gce?.Valid &&
          ((this.J6r.LastFlySpeed = this.J6r.NormalFlySpeed),
          (this.J6r.TargetFlySpeed = this.J6r.NormalFlySpeed),
          this.Gce.SetMaxSpeed(this.J6r.NormalFlySpeed));
    }
    TurnOffAutomaticFlightMode() {
      (this.Y6r = !1),
        (this.J6r = void 0),
        this.Gce?.Valid && this.mBe.ResetCharState();
    }
    IsInAutomaticFlightMode() {
      return this.Y6r;
    }
  });
(CharacterInputComponent.T8r = new Map()),
  (CharacterInputComponent = CharacterInputComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(53)],
      CharacterInputComponent,
    )),
  (exports.CharacterInputComponent = CharacterInputComponent);
//# sourceMappingURL=CharacterInputComponent.js.map
