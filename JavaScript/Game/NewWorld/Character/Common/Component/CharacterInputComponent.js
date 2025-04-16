"use strict";
var CharacterInputComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var h,
        n = arguments.length,
        r =
          n < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, e, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (r = (n < 3 ? h(r) : 3 < n ? h(i, e, r) : h(i, e)) || r);
      return 3 < n && r && Object.defineProperty(i, e, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterInputComponent =
    exports.InputCache =
    exports.InputCommand =
    exports.InputEvent =
      void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  CameraUtility_1 = require("../../../../Camera/CameraUtility"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  InputController_1 = require("../../../../Input/InputController"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  InputFilter_1 = require("../../../../Input/InputFilter"),
  InputFilterManager_1 = require("../../../../Input/InputFilterManager"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  RoleGaitStatic_1 = require("../../Role/Component/Define/RoleGaitStatic"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  ZERO_TIME = 0,
  NULL_CONFIG_TIME = -1,
  INVALID_PRIORITY = -1,
  INVALID_PRIORITY_INDEX = -1,
  INVALID_INPUT_TIME = -1,
  MOVE_VECTOR_CACHE_TIME = 100,
  LOW_STRENGTH_EXIT_VALUE = 2200,
  interruptAutoMoving = [0, 1, 2, 3, 4, 5, 7, 8, 9];
class InputEvent {
  constructor(t, i, e) {
    (this.Action = t), (this.State = i), (this.Time = e);
  }
}
exports.InputEvent = InputEvent;
class InputCommand {
  constructor(t, i, e, s) {
    (this.Action = t), (this.State = i), (this.Command = e), (this.Index = s);
  }
}
exports.InputCommand = InputCommand;
class InputCache {
  constructor(t, i, e, s) {
    (this.Action = t), (this.State = i), (this.EventTime = e), (this.Time = s);
  }
}
exports.InputCache = InputCache;
class InputContinuously {
  constructor(t, i) {
    (this.Gtr = !1),
      (this.ZSc = !1),
      (this.Cce = 0),
      (this.eMc = 0),
      (this.InAirTime = 0),
      (this.InDelayExitTime = 0),
      (this.r1t = 0),
      (this.AutoGlideTime = 0),
      (this.DelayExitTime = 0),
      (this.Qd1 = void 0),
      (this.Kd1 = void 0),
      (this.Lie = void 0),
      (this.$zo = void 0),
      (this.Lie = t),
      (this.$zo = i);
  }
  InitConfig() {
    (this.r1t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "ConstantSprintEnterTime",
    )),
      (this.AutoGlideTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ConstantSprintAutoGlideTime",
        )),
      (this.DelayExitTime =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ConstantSprintSpecialStateOffset",
        ));
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "ConstantSprintListeningBuffStopList",
      ),
      i = CommonParamById_1.configCommonParamById.GetStringArrayConfig(
        "ConstantSprintListeningTagStopList",
      );
    if (
      (t && 0 < t.length && ((this.Qd1 = []), this.Qd1.push(...t)),
      i && 0 < i.length)
    ) {
      this.Kd1 = [];
      for (const s of i) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s);
        this.Kd1.push(e);
      }
    }
  }
  GetAutoMovingState() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData
        .AutoMovingSettingEnable && this.CheckTagAndBuff();
    return this.Gtr && !t && this.ResetAutoMovingState("不满足默认奔跑条件"), t;
  }
  CheckTagAndBuff() {
    return !!this.Lie?.HasTag(-69562997) && this.Xd1();
  }
  SetAutoMovingState(t, i = !1) {
    (this.ZSc = i),
      (this.Gtr = t),
      this.tMc(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Input",
          42,
          "切换自动持续奔跑状态",
          ["Entity", this.Lie?.Entity.Id],
          ["Running", t],
        );
  }
  AddTimeAccumulation(t) {
    this.Xd1()
      ? ((this.Cce += t), (this.eMc += t))
      : this.ClearTimeAccumulation();
  }
  ClearTimeAccumulation() {
    (this.Cce = 0), (this.eMc = 0);
  }
  ResetAutoMovingState(t) {
    this.ClearTimeAccumulation(),
      this.SetAutoMovingState(!1),
      t &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Input",
          42,
          "打断自动持续奔跑",
          ["Entity", this.Lie?.Entity.Id],
          ["context", t],
        );
  }
  DeepCopy(t) {
    (this.Cce = t.Cce),
      (this.eMc = t.eMc),
      (this.InAirTime = t.InAirTime),
      this.SetAutoMovingState(t.GetAutoMovingState());
  }
  IsStartEnter() {
    return this.ZSc;
  }
  ClearStartEnter() {
    this.ZSc = !1;
  }
  CheckTimeDuration() {
    return this.eMc > this.r1t;
  }
  GetCurrentTime() {
    return this.Cce;
  }
  GetDuration() {
    return this.r1t;
  }
  Xd1() {
    if (this.Qd1 && 0 < this.Qd1.length)
      for (const t of this.Qd1) if (this.$zo?.HasBuff(t)) return !1;
    if (this.Kd1 && 0 < this.Kd1.length)
      for (const i of this.Kd1) if (this.Lie?.HasTag(i)) return !1;
    return !0;
  }
  tMc(t) {
    t && !this.Lie?.HasTag(-69562997) && this.Lie?.AddTag(-69562997),
      !t && this.Lie?.HasTag(-69562997) && this.Lie?.RemoveTag(-69562997);
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
class CameraDrivenAutoFlightData {
  constructor() {
    (this.AutoFlightEnableTime = 0),
      (this.AutoFlightStartAngleTolerance = 0),
      (this.AutoFlightFinishAngleTolerance = 0),
      (this.AutoFlightInputAngleMin = 0),
      (this.AutoFlightInputAngleMax = 0),
      (this.AutoFlightInputMin = 0),
      (this.AutoFlightInputMax = 0);
  }
}
let CharacterInputComponent =
  (CharacterInputComponent_1 = class CharacterInputComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.cz = Vector_1.Vector.Create()),
        (this.fz = Vector_1.Vector.Create()),
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
        (this.Bhh = void 0),
        (this.H6r = new Array()),
        (this.j6r = new Array()),
        (this.QMe = new Map()),
        (this.XMe = void 0),
        (this.W6r = Vector_1.Vector.Create()),
        (this.K6r = Vector_1.Vector.Create()),
        (this.Q6r = Vector_1.Vector.Create()),
        (this.bVc = !1),
        (this.X6r = INVALID_INPUT_TIME),
        (this.$6r = new Array()),
        (this.z11 = new Map()),
        (this.Rne = void 0),
        (this.Y6r = !1),
        (this.J6r = void 0),
        (this.z6r = 0),
        (this.Ukl = !1),
        (this.Akl = void 0),
        (this.Dkl = !1),
        (this.Rkl = !1),
        (this.Pkl = 0),
        (this.Z6r = 0),
        (this.e8r = 0),
        (this.t8r = 0),
        (this.BJe = (t, i, e) => {
          i = this.tRr?.GetSkillInfo(i);
          i &&
            interruptAutoMoving.includes(i.SkillGenre) &&
            this.InterruptAutoMoving("技能类型属于0/1/2/3/4/5/7/8/9");
        }),
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
          this.i8r(0);
        }),
        (this.o8r = (t) => {
          this.r8r();
        }),
        (this._7_ = (t, i) => {
          var e;
          this.Bhh &&
            (e = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
              this.Entity,
            )) &&
            (0 !== i
              ? ((i = t.GetComponent(276)?.GetMorphData()?.InputComponentClass),
                this.Bhh.Init(e, i?.AssetPathName.toString()))
              : this.Bhh.Init(e));
        }),
        (this.n8r = this.s8r.bind(this)),
        (this.fPa = !1),
        (this.W$a = new Set()),
        (this.ZQa = !1),
        (this.fZt = (t) => {
          this.ZQa !== t && (this.ZQa = t) && this.QMe.clear();
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
        (this.I8r = new Map()),
        (this.iMc = void 0),
        (this.Jze = () => {
          this.InterruptAutoMoving("角色死亡", !0);
        }),
        (this.AMe = (t) => {
          ("LevelA" !== t.PlotLevel &&
            "LevelB" !== t.PlotLevel &&
            "LevelC" !== t.PlotLevel) ||
            this.InterruptAutoMoving("进入剧情", !0);
        }),
        (this.cCc = (t) => {
          t || this.rMc.ResetAutoMovingState("退出自动奔跑模式");
        }),
        (this.Yd1 = (t) => {
          var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(t);
          i && !i.AllowAutoMoving && this.InterruptAutoMoving("打开了UI" + t);
        }),
        (this.zv1 = 0),
        (this.Jv1 = 0);
    }
    static get Dependencies() {
      return [3];
    }
    get IsLocalInput() {
      return this.bVc;
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
          Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行按下操作", [
            "action",
            t,
          ]);
    }
    HandleReleaseEvent(t, i) {
      ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(t)
        ? (this.H6r.push(new InputEvent(t, 2, i)),
          CharacterInputComponent_1.T8r.set(t, !1))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 17, "该战斗输入被禁用，不执行放开操作", [
            "action",
            t,
          ]);
    }
    HandleHoldEvent(t, i) {
      this.H6r.push(new InputEvent(t, 3, i));
    }
    HandleInputAxis(t, i) {
      let e = i;
      if (Info_1.Info.IsInKeyBoard())
        switch (t) {
          case InputEnums_1.EInputAxis.LookUp:
          case InputEnums_1.EInputAxis.Turn:
          case InputEnums_1.EInputAxis.Zoom:
            e /= Time_1.Time.DeltaTimeSeconds;
        }
      this.QMe.set(t, e);
    }
    ClearInputAxis(t, i = !1) {
      Info_1.Info.AxisInputOptimize &&
        (t ||
          (i
            ? (this.QMe.delete(InputEnums_1.EInputAxis.MoveForward),
              this.QMe.delete(InputEnums_1.EInputAxis.MoveRight))
            : this.QMe.clear()),
        (this.fPa = t));
    }
    ClearSingleAxisInput(t, i) {
      Info_1.Info.AxisInputOptimize &&
        (i ? this.W$a.add(t) : this.QMe.has(t) && this.QMe.set(t, 0));
    }
    PreProcessInput(t, i) {
      if (Info_1.Info.AxisInputOptimize) {
        if (
          (this.fPa && ((this.fPa = !1), this.QMe.clear()), 0 < this.W$a.size)
        ) {
          for (const e of this.W$a) this.QMe.has(e) && this.QMe.delete(e);
          this.W$a.clear();
        }
      } else this.QMe.clear();
    }
    PostProcessInput(s, t) {
      this.L8r(), this.D8r(), CharacterInputComponent_1.x0l.Start();
      const h = new Array();
      if (
        (this.H6r.forEach((t, i) => {
          var e = this.R8r(s, t);
          e &&
            0 !== e.CommandType &&
            h.push(new InputCommand(t.Action, t.State, e, i));
        }),
        CharacterInputComponent_1.x0l.Stop(),
        0 < this.a8r.length)
      ) {
        let t = this.H6r.length;
        for (const n of this.a8r) {
          var i = this.R8r(s, n);
          i && h.push(new InputCommand(n.Action, n.State, i, t)), t++;
        }
        this.a8r.length = 0;
      }
      var e = this.U8r(h);
      this.A8r(e),
        (this.H6r.length = 0),
        3 === e?.State && CharacterInputComponent_1.T8r.set(e.Action, !0),
        void 0 !== e &&
          (ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Input", 6, "ReceiveInput", [
              "BestInputCommand",
              JSON.stringify(e),
            ]),
          this.P8r(e, "PostProcessInput"));
    }
    TestActionInput(t, i, e) {
      t = new InputEvent(t, i, e);
      this.a8r.push(t);
    }
    R8r(t, i) {
      let e = void 0;
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
          this.x8r(i.Action, i.Time), (e = this.w8r(i.Action, i.Time));
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
                  var s = this.j6r[t];
                  s.Action === i.Action &&
                    3 === s.State &&
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
          this.B8r(i.Action, i.Time), (e = this.b8r(i.Action, i.Time));
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
          e = this.G8r(i.Action, i.Time);
      }
      return e;
    }
    A8r(t) {
      const s = this.N8r(),
        h = t ? t.Index : -1;
      this.H6r.forEach((t, i) => {
        if (i !== h && t.Action !== InputEnums_1.EInputAction.None)
          if (0 < this.$6r.length)
            for (const e of this.$6r)
              e.Action === t.Action &&
                e.State === t.State &&
                this.j6r.push(new InputCache(t.Action, t.State, t.Time, s));
          else
            this.O8r(t.Action, t.State) !== ZERO_TIME &&
              this.j6r.push(new InputCache(t.Action, t.State, t.Time, s));
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
          (ControllerHolder_1.ControllerHolder.CameraController.GetCameraRotation(
            this.cie,
          ),
          GravityUtils_1.GravityUtils.GetQuatFromRotatorAndGravityForActor(
            this.Hte,
            this.cie,
            this.h8r,
          ),
          this.rJo?.DirectionState ===
            CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection &&
            (i = (t =
              ModelManager_1.ModelManager.CameraModel?.FightCamera
                ?.LogicComponent)?.TargetEntity) &&
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
      let t = this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0,
        i = this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp) ?? 0;
      var e;
      return (
        0 === t &&
          0 === i &&
          Info_1.Info.IsInGamepad() &&
          (e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData)
            ?.ControlCameraByMoveAxis &&
          ((t = e.GetInputAxis(InputEnums_1.EInputAxis.MoveRight)),
          (i = -e.GetInputAxis(InputEnums_1.EInputAxis.MoveForward))),
        [t, i]
      );
    }
    HasCameraInput(t = MathUtils_1.MathUtils.KindaSmallNumber) {
      return (
        !MathUtils_1.MathUtils.IsNearlyZero(
          this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0,
          t,
        ) ||
        !MathUtils_1.MathUtils.IsNearlyZero(
          this.QueryInputAxis(InputEnums_1.EInputAxis.LookUp) ?? 0,
          t,
        )
      );
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
    ClearInputCache(i, e) {
      if (0 === i) this.r8r();
      else
        for (let t = this.j6r.length - 1; 0 <= t; t--) {
          var s = this.j6r[t];
          s.Action !== i ||
            (0 !== s.State && s.State !== e) ||
            this.j6r.splice(t, 1);
        }
    }
    LimitInputCache(i) {
      this.$6r.push(i);
      for (let t = this.j6r.length - 1; 0 <= t; t--) {
        var e = this.j6r[t];
        e.Action !== i.Action ||
          (0 !== e.State && e.State !== i.State) ||
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
      var t = this.Hte.Actor;
      return (
        this.SetCharacter(t),
        this.V6r && InputController_1.InputController.AddInputHandler(this),
        (this.pZo = this.Entity.GetComponent(18)),
        (this.Lie = this.Entity.GetComponent(203)),
        (this.mBe = this.Entity.GetComponent(173)),
        (this.tRr = this.Entity.GetComponent(39)),
        (this.Gce = this.Entity.GetComponent(176)),
        (this.rJo = this.Entity.GetComponent(173)),
        this.bhh(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.n8r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.BJe,
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
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OpenView,
          this.Yd1,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.PlotNetworkStart,
          this.AMe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AutoMovingSettingChanged,
          this.cCc,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
          this.Jze,
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
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnCharacterMorphTypeChanged,
          this._7_,
        ),
        this.F8r(),
        ModelManager_1.ModelManager.InputModel?.InitInputCommandTransformMap(),
        !0
      );
    }
    OnEnd() {
      return (
        this.qhh(),
        InputController_1.InputController.RemoveInputHandler(this),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.n8r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.BJe,
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
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OpenView,
          this.Yd1,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotNetworkStart,
          this.AMe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AutoMovingSettingChanged,
          this.cCc,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
          this.Jze,
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
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnCharacterMorphTypeChanged,
          this._7_,
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
      (this.bVc = !1),
        this.Y6r ? this.H8r(t) : (this.i8r(t), this.Ukl && this.xkl(t));
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
    j8r(t, e) {
      return this.Lie.ListenForTagAddOrRemove(t, (t, i) => {
        i ? this.XMe.BlockActions.add(e) : this.XMe.BlockActions.delete(e);
      });
    }
    W8r(t, s) {
      return this.Lie.ListenForTagAddOrRemove(t, (t, i) => {
        for (const e of s)
          i ? this.XMe.BlockAxes.add(e) : this.XMe.BlockAxes.delete(e);
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
        (this.Entity.GetComponent(33)?.LockRotator ?? !1)
      );
    }
    i8r(t) {
      let i = Vector_1.Vector.ZeroVectorProxy;
      var e;
      if (this.Lie?.Valid && this.mBe.Valid)
        if (this.Lie.HasTag(1996624497))
          (i = this.GetWorldMoveDirectionCache()).IsNearlyZero() &&
            (this.Lie.HasTag(1336868783) || this.rMc.GetAutoMovingState()) &&
            (i = this.Hte.InputDirectProxy).IsNearlyZero() &&
            (i = this.Hte.ActorForwardProxy),
            this.Hte.SetInputDirect(i, !0),
            this.K8r()
              ? this.Hte.SetInputFacing(this.Hte.ActorForwardProxy)
              : this.Q8r();
        else
          switch (
            (this.rJo?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Climb
              ? ((this.bVc = !0),
                (i = this.GetMoveDirectionCache()),
                this.oMc(i, t),
                this.rMc.GetAutoMovingState() &&
                  (i = Vector_1.Vector.ForwardVectorProxy))
              : this.rJo?.MoveState ===
                  CharacterUnifiedStateTypes_1.ECharMoveState.Soar
                ? ((this.bVc = !0),
                  this.cz.DeepCopy(this.GetMoveVectorCache()),
                  0 ===
                    GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
                      GameSettingsDefine_1.EFunction.FlyControlMode,
                    ) && (this.cz.X = -this.cz.X),
                  1 < (e = i.SizeSquared()) &&
                    this.cz.DivisionEqual(Math.sqrt(e)),
                  (i = this.cz),
                  this.InterruptAutoMoving("翱翔状态"))
                : ((i = this.GetWorldMoveDirectionCache()),
                  this.oMc(i, t),
                  (e = this.rMc.GetAutoMovingState()),
                  i.IsNearlyZero() &&
                    (this.Lie.HasTag(1336868783) || e) &&
                    ((i = this.Hte.InputDirectProxy).IsNearlyZero() &&
                      (i = this.Hte.ActorForwardProxy),
                    e) &&
                    (this.zd1(this.fz),
                    this.fz.IsNearlyZero() ||
                      (this.fz.Normalize(), i.DeepCopy(this.fz))),
                  i.IsNearlyZero() ||
                  FormationDataController_1.FormationDataController
                    .GlobalIsInFight ||
                  (!e &&
                    !ModelManager_1.ModelManager.BattleUiModel?.FormationData
                      ?.AutoSprintSettingEnable)
                    ? (this.zv1 = 0)
                    : this.Jd1(e, t)),
            this.Hte.SetInputDirect(i, !this.bVc),
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
        (i = this.GetWorldMoveDirectionCache()),
          this.Hte.SetInputDirect(i, !0),
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
              Log_1.Log.Error("Input", 29, "错误的位置状态")
            : void 0 === this.J6r
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error("Input", 29, "自动飞行模式配置无效")
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
                          Reason: "EAutomaticFlightState.Max",
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
                            Reason: "EAutomaticFlightState.Min",
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
    xkl(t) {
      var i, e;
      (this.Dkl = !1),
        this.Akl &&
          (this.Hte.InputDirectProxy.IsNearlyZero(
            MathUtils_1.MathUtils.KindaSmallNumber,
          )
            ? ((i = this.QueryInputAxis(InputEnums_1.EInputAxis.Turn) ?? 0),
              MathUtils_1.MathUtils.IsNearlyZero(
                i,
                this.Akl.AutoFlightStartAngleTolerance,
              ) ||
                this.Rkl ||
                (this.Rkl = !0),
              this.Rkl &&
                ((i = CameraUtility_1.CameraUtility.GetYawInGravity(
                  this.Hte.ActorRotationProxy,
                )),
                (e = CameraUtility_1.CameraUtility.GetYawInGravity(
                  CameraController_1.CameraController.FightCamera.LogicComponent
                    .DesiredCamera.ArmRotation,
                )),
                (i = MathUtils_1.MathUtils.WrapAngle(i - e)),
                MathUtils_1.MathUtils.IsNearlyZero(
                  i,
                  this.Akl.AutoFlightFinishAngleTolerance,
                )
                  ? ((this.Pkl = 0), (this.Rkl = !1))
                  : ((this.Pkl += t),
                    this.Pkl < this.Akl.AutoFlightEnableTime ||
                      ((this.Dkl = !0),
                      (e = MathUtils_1.MathUtils.RangeClamp(
                        Math.abs(i),
                        this.Akl.AutoFlightInputAngleMin,
                        this.Akl.AutoFlightInputAngleMax,
                        this.Akl.AutoFlightInputMin,
                        this.Akl.AutoFlightInputMax,
                      )),
                      this.Hte.SetInputDirectByNumber(
                        this.Hte.InputDirectProxy.X,
                        e * (0 < i ? -1 : 1),
                        0,
                      )))))
            : ((this.Pkl = 0), (this.Rkl = !1)));
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
      this.bVc
        ? this.Hte.SetInputFacing(this.Hte.ActorForwardProxy, t)
        : GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
              this.Hte,
              this.Hte.InputDirectProxy,
            ) > MathUtils_1.MathUtils.SmallNumber
          ? this.Hte.SetInputFacing(this.Hte.InputDirectProxy, t)
          : t && this.Hte.SetInputFacing(this.Hte.ActorForwardProxy, t);
    }
    q8r(t, i, e) {
      var [s, h] = this.GetHoldConfig(t);
      return (
        h !== NULL_CONFIG_TIME &&
        !(
          i < h ||
          (!s &&
            ((CharacterInputComponent_1.T8r.has(t) &&
              CharacterInputComponent_1.T8r.get(t)) ||
              !(h < i - e)))
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
    GetNewQuatInLockMode(t, i, e) {
      CameraUtility_1.CameraUtility.GetSocketLocation(void 0, i, this.cz, t),
        this.cz.SubtractionEqual(this.Hte.ActorLocationProxy);
      var i = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
        this.Hte,
        this.cz,
      );
      i < this.Z6r * this.Z6r ||
        (e.Inverse(this.e7o),
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
        e.Multiply(this.e7o, this.k6r),
        e.DeepCopy(this.k6r));
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
        var e = this.j6r[t],
          s = this.O8r(e.Action, e.State);
        0 === this.$6r.length && i - e.Time > s && this.j6r.splice(t, 1);
      }
    }
    r8r() {
      this.j6r.length = 0;
    }
    k8r() {
      if (0 === this.j6r.length) return !1;
      const h = new Array();
      this.j6r.forEach((t, i) => {
        if (0 < this.$6r.length)
          for (const s of this.$6r)
            if (
              s.ForbidExecuteCommand &&
              s.Action === t.Action &&
              s.State === t.State
            )
              return;
        let e = void 0;
        switch (t.State) {
          case 1:
            e = this.w8r(t.Action, t.EventTime);
            break;
          case 2:
            e = this.b8r(t.Action, t.EventTime);
            break;
          case 3:
            e = this.G8r(t.Action, t.EventTime);
        }
        e &&
          0 !== e.CommandType &&
          h.push(new InputCommand(t.Action, t.State, e, i));
      });
      var t = this.U8r(h);
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
        let e = INVALID_PRIORITY,
          s = INVALID_PRIORITY_INDEX;
        return (
          t.forEach((t, i) => {
            t = this.z8r(t.Command);
            t > e && ((e = t), (s = i));
          }),
          t[s]
        );
      }
    }
    z8r(t) {
      let i = void 0;
      switch (t.CommandType) {
        case 0:
          break;
        case 1:
          i = this.Z8r(t.IntValue);
          break;
        default:
          i = InputController_1.InputController.QueryCommandPriority(
            t.CommandType,
          );
      }
      return (i = void 0 === i ? INVALID_PRIORITY : i);
    }
    Z8r(t) {
      return this.F6r?.CharacterActorComponent?.Entity?.GetComponent(
        39,
      ).GetPriority(t);
    }
    P8r(t, i) {
      CharacterInputComponent_1.P0l.Start();
      var e = t.Command,
        s = e.CommandType;
      switch (s) {
        case 1:
          this.e9r(e.IntValue, i);
          break;
        case 2:
          this.t9r(e);
          break;
        case 3:
          this.i9r(e), this.z11.set(s, Time_1.Time.WorldTimeSeconds);
          break;
        case 4:
          this.o9r(e);
          break;
        case 5:
          this.r9r(e);
          break;
        case 6:
          this.n9r(e);
          break;
        case 7:
          this.s9r(e.IntValue);
          break;
        case 8:
          this.a9r(e);
          break;
        case 9:
          this.pZo.SendGameplayEventToActor(e.TagValue);
          break;
        case 10:
          this.rja(e);
      }
      CharacterInputComponent_1.P0l.Stop();
    }
    t9r(t) {
      var i = this.Entity.GetComponent(176);
      i.Valid && (1 === t.IntValue ? i.JumpPress() : i.JumpRelease());
    }
    i9r(t) {
      this.Entity.GetComponent(34)?.ClimbPress(1 === t.IntValue);
    }
    o9r(t) {
      1 === t.IntValue
        ? this.Entity.CheckGetComponent(173).SprintPress()
        : this.Entity.CheckGetComponent(173).SprintRelease();
    }
    r9r(t) {
      this.Entity.CheckGetComponent(173).SwitchFastSwim(1 === t.IntValue);
    }
    n9r(t) {
      this.Entity.CheckGetComponent(173).SwitchFastClimb(1 === t.IntValue);
    }
    a9r(t) {
      this.Entity.CheckGetComponent(173).WalkPress();
    }
    rja(t) {
      this.Entity.CheckGetComponent(58)?.SetSoarBoostOn(0 < t.IntValue);
    }
    s9r(t) {}
    e9r(t, i) {
      this.Entity.GetComponent(39).BeginSkill(t, {
        Reason: "CharacterInputComponent.ExecuteSkill." + i,
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
        var e = InputController_1.InputController.GetInputLayers(
          this.Entity.Id,
        );
        if (e) {
          CharacterInputComponent_1.w0l.Start();
          for (const s of e) s.DispatchPressEvent(t, i);
          CharacterInputComponent_1.w0l.Stop();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Input",
              67,
              "[CharacterInputComponent.DispatchPressEvent]输入层级为空",
              ["entityId", this.Entity.Id],
            );
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    B8r(t, i) {
      if (this.Hte) {
        var e = InputController_1.InputController.GetInputLayers(
          this.Entity.Id,
        );
        if (e) {
          CharacterInputComponent_1.B0l.Start();
          for (const s of e) s.DispatchReleaseEvent(t, i);
          CharacterInputComponent_1.B0l.Stop();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Input",
              67,
              "[CharacterInputComponent.DispatchReleaseEvent]输入层级为空",
              ["entityId", this.Entity.Id],
            );
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    w8r(t, i) {
      if (this.Hte) {
        var e = InputController_1.InputController.GetInputLayers(
          this.Entity.Id,
        );
        if (e) {
          CharacterInputComponent_1.b0l.Start();
          for (const h of e) {
            var s = h.HandlePress(t, i);
            if (s && 0 !== s.CommandType)
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[CharacterInputComponent.HandlePress]输入层级处理指令",
                    ["layerType", h.GetLayerType()],
                  ),
                CharacterInputComponent_1.b0l.Stop(),
                s
              );
          }
          CharacterInputComponent_1.b0l.Stop();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Input",
              67,
              "[CharacterInputComponent.HandlePress]输入层级为空",
              ["entityId", this.Entity.Id],
            );
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    b8r(t, i) {
      if (this.Hte) {
        var e = InputController_1.InputController.GetInputLayers(
          this.Entity.Id,
        );
        if (e) {
          CharacterInputComponent_1.q0l.Start();
          for (const h of e) {
            var s = h.HandleRelease(t, i);
            if (s && 0 !== s.CommandType)
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[CharacterInputComponent.HandleRelease]输入层级处理指令",
                    ["layerType", h.GetLayerType()],
                  ),
                CharacterInputComponent_1.q0l.Stop(),
                s
              );
          }
          CharacterInputComponent_1.q0l.Stop();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Input",
              67,
              "[CharacterInputComponent.HandleRelease]输入层级为空",
              ["entityId", this.Entity.Id],
            );
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    G8r(t, i) {
      if (this.Hte) {
        var e = InputController_1.InputController.GetInputLayers(
          this.Entity.Id,
        );
        if (e)
          for (const h of e) {
            var s = h.HandleHold(t, i);
            if (s && 0 !== s.CommandType)
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[CharacterInputComponent.HandleHold]输入层级处理指令",
                    ["layerType", h.GetLayerType()],
                  ),
                s
              );
          }
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Input",
              67,
              "[CharacterInputComponent.HandleHold]输入层级为空",
              ["entityId", this.Entity.Id],
            );
      } else
        Log_1.Log.CheckError() && Log_1.Log.Error("Input", 6, "Entity Is End");
    }
    O8r(i, e) {
      var s = this.GetBpInputComp();
      if (s) {
        let t = void 0;
        if (
          (this.y8r.has(i) ||
            ((t = s.GetUnrealCacheConfig(i)), this.y8r.set(i, t)),
          (t = t || this.y8r.get(i)))
        ) {
          switch (e) {
            case 1:
              return t.按下;
            case 3:
              return t.长按;
            case 2:
              return t.抬起;
          }
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 14, "错误的输入状态 ", ["state", e]);
        }
      }
      return ZERO_TIME;
    }
    GetHoldConfig(t) {
      var i = this.GetBpInputComp();
      if (!i) return [!1, NULL_CONFIG_TIME];
      let e = void 0;
      return (
        this.I8r.has(t) || ((e = i.GetUnrealHoldConfig(t)), this.I8r.set(t, e)),
        (e = e || this.I8r.get(t))
          ? [e.连续触发, e.触发时间]
          : [!1, NULL_CONFIG_TIME]
      );
    }
    TurnOnAutomaticFlightMode(t) {
      this.Hte?.Actor.GetName().includes("Youyidie")
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Test", 6, "TurnOnAutomaticFlightMode", [
            "Actor",
            this.Hte?.Actor.GetName(),
          ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Test", 6, "Error TurnOnAutomaticFlightMode", [
            "Actor",
            this.Hte?.Actor.GetName(),
          ]),
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
    TurnOnCameraDrivenAutoFlightMode(t) {
      t &&
        ((this.Ukl = !0),
        (this.Rkl = !1),
        this.Akl || (this.Akl = new CameraDrivenAutoFlightData()),
        (this.Akl.AutoFlightEnableTime = t.自动驾驶开始时间),
        (this.Akl.AutoFlightStartAngleTolerance = t.自动驾驶启动输入),
        (this.Akl.AutoFlightFinishAngleTolerance = t.自动驾驶完成角度),
        (this.Akl.AutoFlightInputAngleMin = t.自动驾驶归正角度Min),
        (this.Akl.AutoFlightInputAngleMax = t.自动驾驶归正角度Max),
        (this.Akl.AutoFlightInputMin = t.自动驾驶归正角度模拟输入Min),
        (this.Akl.AutoFlightInputMax = t.自动驾驶归正角度模拟输入Max));
    }
    TurnOffCameraDrivenAutoFlightMode() {
      (this.Ukl = !1), (this.Rkl = !1);
    }
    IsInCameraDrivenAutoFlightMode() {
      return this.Ukl && this.Dkl;
    }
    bhh() {
      var t;
      this.Bhh && this.qhh(),
        (this.Bhh = InputController_1.InputController.CreateInputLayer(1)),
        this.Bhh &&
          (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
            this.Entity,
          )) &&
          (this.Bhh.Init(t),
          InputController_1.InputController.AddInputLayer(
            this.Entity.Id,
            this.Bhh,
          ));
    }
    qhh() {
      this.Bhh &&
        (InputController_1.InputController.RemoveInputLayer(this.Bhh),
        this.Bhh.Clear(),
        (this.Bhh = void 0));
    }
    GetBpInputComp() {
      return InputController_1.InputController.GetInputLayer(
        this.Entity.Id,
        1,
      )?.GetBpInputComp();
    }
    SetBpInputComp(t) {
      var i = InputController_1.InputController.GetInputLayer(
        this.Entity.Id,
        1,
      );
      i && i.SetBpInputComp(t);
    }
    GetCommandInterval(t) {
      t = this.z11.get(t) ?? 0;
      return Time_1.Time.WorldTimeSeconds - t;
    }
    set rMc(t) {
      this.iMc = t;
    }
    get rMc() {
      var t, i;
      return (
        this.iMc ||
          ((t = this.Entity.GetComponent(203)),
          (i = this.Entity.GetComponent(207)),
          (this.iMc = new InputContinuously(t, i)),
          this.iMc.InitConfig()),
        this.iMc
      );
    }
    oMc(t, i) {
      if (
        ModelManager_1.ModelManager.BattleUiModel.FormationData
          .AutoMovingSettingEnable
      ) {
        var e = this.rMc.GetAutoMovingState(),
          s = this.rMc.IsStartEnter(),
          t = t.IsNearlyZero();
        if (!e || s || t) {
          if (e) {
            if (this.Tqc(i)) return;
            if (
              this.rJo?.PositionState !==
              CharacterUnifiedStateTypes_1.ECharPositionState.Ground
            )
              return void this.InterruptAutoMoving("处于其他移动状态");
          }
          t &&
            (e
              ? s && this.rMc.ClearStartEnter()
              : this.rMc.ClearTimeAccumulation()),
            e ||
              (t ||
                this.rJo?.MoveState !==
                  CharacterUnifiedStateTypes_1.ECharMoveState.Sprint ||
                this.rMc.AddTimeAccumulation(i),
              this.rMc.CheckTimeDuration() &&
                this.rMc.SetAutoMovingState(!0, !0));
        } else this.InterruptAutoMoving("玩家输入");
      }
    }
    Tqc(t) {
      var i =
        FormationAttributeController_1.FormationAttributeController.GetValue(
          1,
        ) < LOW_STRENGTH_EXIT_VALUE;
      if (
        i &&
        FormationDataController_1.FormationDataController.GlobalIsInFight
      )
        return this.InterruptAutoMoving("进战下体力值太低自动结束"), !0;
      let e = !1;
      return (
        this.rJo?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Air
          ? ((e = !0),
            (this.rMc.InAirTime += t),
            this.rMc.InAirTime > this.rMc.AutoGlideTime &&
              (this.InterruptAutoMoving("空中太久"), this.Gce?.TrySetGlide()))
          : (this.rMc.InAirTime = 0),
        this.rJo?.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Water ||
        this.rJo?.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb
          ? ((e = !0),
            (this.rMc.InDelayExitTime += t),
            this.rMc.InDelayExitTime > this.rMc.DelayExitTime
              ? this.InterruptAutoMoving("处于攀爬/游泳状态太久")
              : !i ||
                (this.rJo?.MoveState !==
                  CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb &&
                  this.rJo?.MoveState !==
                    CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb &&
                  this.rJo?.MoveState !==
                    CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim &&
                  this.rJo?.MoveState !==
                    CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim) ||
                this.InterruptAutoMoving("体力值太低自动结束"))
          : (this.rMc.InDelayExitTime = 0),
        e
      );
    }
    InterruptAutoMoving(t, i = !1) {
      return this.rMc.GetAutoMovingState()
        ? (this.rMc.ResetAutoMovingState(t), !0)
        : (i && this.rMc.ClearTimeAccumulation(), !1);
    }
    SetAutoMovingConfig(t) {
      this.rMc.DeepCopy(t);
    }
    GetAutoMovingConfig() {
      return this.rMc;
    }
    zd1(t) {
      var i =
          Global_1.Global.CharacterCameraManager.GetCameraRotation().VectorDouble(),
        i = (this.cz.DeepCopy(i), this.Gce.GravityDirect);
      Vector_1.Vector.VectorPlaneProject(this.cz, i, t);
    }
    Jd1(t, i) {
      this.Jv1 ||
        (this.Jv1 = CommonParamById_1.configCommonParamById.GetIntConfig(
          "AutoSprintTimerCondition",
        )),
        (this.zv1 += i),
        (!t && this.zv1 < this.Jv1) ||
          ((this.zv1 = 0),
          (this.rJo?.MoveState ===
            CharacterUnifiedStateTypes_1.ECharMoveState.Run ||
            (t &&
              this.rJo?.MoveState ===
                CharacterUnifiedStateTypes_1.ECharMoveState.Walk)) &&
            this.rJo.SprintPress());
    }
  });
(CharacterInputComponent.x0l = Stats_1.Stat.Create(
  "CharacterInputComponent.GetCommand",
)),
  (CharacterInputComponent.P0l = Stats_1.Stat.Create(
    "CharacterInputComponent.ExecuteCommand",
  )),
  (CharacterInputComponent.w0l = Stats_1.Stat.Create(
    "CharacterInputComponent.DispatchPressEvent",
  )),
  (CharacterInputComponent.B0l = Stats_1.Stat.Create(
    "CharacterInputComponent.DispatchReleaseEvent",
  )),
  (CharacterInputComponent.b0l = Stats_1.Stat.Create(
    "CharacterInputComponent.HandlePress",
  )),
  (CharacterInputComponent.q0l = Stats_1.Stat.Create(
    "CharacterInputComponent.HandleRelease",
  )),
  (CharacterInputComponent.T8r = new Map()),
  (CharacterInputComponent = CharacterInputComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(61)],
      CharacterInputComponent,
    )),
  (exports.CharacterInputComponent = CharacterInputComponent);
//# sourceMappingURL=CharacterInputComponent.js.map
