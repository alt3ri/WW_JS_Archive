"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskFollowTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Source = void 0),
      (this.Angle = 0),
      (this.Length = 0),
      (this.Speed = 0),
      (this.StandSpeed = 0),
      (this.Radius = 0),
      (this.NavigationRadius = 0),
      (this.NavigationPath = void 0),
      (this.MaxNavigationMillisecond = 0),
      (this.NavigationEndTime = -0),
      (this.FoundPath = !1),
      (this.CurrentNavigationIndex = 0),
      (this.FollowPointName = "FollowPoint"),
      (this.IsShowCube = !1),
      (this.Tags = void 0),
      (this.WaitTimeName = "WaitTimeName"),
      (this.WaitTime = 0),
      (this.BeginTimeName = "BeginTimeName"),
      (this.BeginTime = 0),
      (this.IsHasName = "IsHasName"),
      (this.IsHas = !1),
      (this.IsInTag = !1),
      (this.IsInitTsVariables = !1),
      (this.TsAngle = 0),
      (this.TsLength = 0),
      (this.TsSpeed = 0),
      (this.TsStandSpeed = 0),
      (this.TsRadius = 0),
      (this.TsNavigationRadius = 0),
      (this.TsMaxNavigationMillisecond = -0),
      (this.TsFollowPointName = ""),
      (this.TsIsShowCube = !1),
      (this.TsTags = void 0),
      (this.TsWaitTime = 0),
      (this.TsBeginTimeName = ""),
      (this.TsIsHasName = ""),
      (this.TsIsInTag = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.Source = void 0),
      (this.NavigationPath = void 0),
      (this.NavigationEndTime = -0),
      (this.FoundPath = !1),
      (this.CurrentNavigationIndex = 0),
      (this.BeginTime = 0),
      (this.IsHas = !1),
      (this.IsInitTsVariables = !1),
      (this.TsAngle = 0),
      (this.TsLength = 0),
      (this.TsSpeed = 0),
      (this.TsStandSpeed = 0),
      (this.TsRadius = 0),
      (this.TsNavigationRadius = 0),
      (this.TsMaxNavigationMillisecond = -0),
      (this.TsFollowPointName = ""),
      (this.TsIsShowCube = !1),
      (this.TsTags = void 0),
      (this.TsWaitTime = 0),
      (this.TsBeginTimeName = ""),
      (this.TsIsHasName = ""),
      (this.TsIsInTag = !1);
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsAngle = this.Angle),
        (this.TsLength = this.Length),
        (this.TsSpeed = this.Speed),
        (this.TsStandSpeed = this.StandSpeed),
        (this.TsRadius = this.Radius),
        (this.TsNavigationRadius = this.NavigationRadius),
        (this.TsMaxNavigationMillisecond = this.MaxNavigationMillisecond),
        (this.TsFollowPointName = this.FollowPointName),
        (this.TsIsShowCube = this.IsShowCube),
        (this.TsTags = new Array());
      for (let t = 0, i = this.Tags.Num(); t < i; t++)
        this.TsTags.push(this.Tags.Get(t));
      (this.TsWaitTime = this.WaitTime),
        (this.TsBeginTimeName = this.BeginTimeName),
        (this.TsIsHasName = this.IsHasName),
        (this.TsIsInTag = this.IsInTag);
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables(), this.GetPath(t, i);
  }
  ReceiveTickAI(t, i, s) {
    var e = t.AiController;
    e
      ? (this.DelayDie(t),
        (e = e.CharActorComp).Entity.CheckGetComponent(203).HasTag(-1371021686)
          ? (e.SetInputDirect(Vector_1.Vector.ZeroVector), this.OnClear())
          : (this.GetPath(t, i),
            this.FoundPath &&
              (Time_1.Time.WorldTime > this.NavigationEndTime
                ? this.Finish(!1)
                : ((t = Vector_1.Vector.Create(
                    this.NavigationPath[this.CurrentNavigationIndex],
                  )).Subtraction(e.ActorLocationProxy, t),
                  (t.Z = 0),
                  (i = t.Size()) <
                    (e.Owner.GetMovementComponent()?.Velocity.Size() ?? 0) /
                      ((this.TsSpeed ?? 1) * MathUtils_1.MathUtils.DegToRad) +
                      NAVIGATION_COMPLETE_DISTANCE &&
                  (this.CurrentNavigationIndex++,
                  this.CurrentNavigationIndex === this.NavigationPath.length)
                    ? this.Finish(!0)
                    : (t.DivisionEqual(i),
                      e.SetInputDirect(t, !0),
                      AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                        e,
                        t,
                        this.TsSpeed,
                      ))))))
      : this.FinishExecute(!1);
  }
  GetPath(t, i) {
    var s = t.AiController;
    if (s) {
      var e = s.CharActorComp,
        h = e.Entity.CheckGetComponent(0),
        h = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          h.GetSummonerId(),
        );
      if (0 !== h) {
        this.Source =
          ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
            h,
          );
        var h = Vector_1.Vector.Create(),
          r =
            (this.Source.ActorForwardProxy.RotateAngleAxis(
              this.TsAngle,
              Vector_1.Vector.UpVectorProxy,
              h,
            ),
            h.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
            h.Multiply(this.TsLength, h),
            h.Addition(this.Source.ActorLocationProxy, h),
            this.TsIsShowCube &&
              this.DrawCube(new UE.TransformDouble(h.ToUeVector()), 5, 156),
            Vector_1.Vector.DistSquared(h, e.ActorLocationProxy));
        if (
          (this.TsIsShowCube &&
            this.DrawCube(new UE.TransformDouble(e.ActorLocation), 5, 0),
          r > this.TsNavigationRadius * this.TsNavigationRadius ||
            e.Entity.CheckGetComponent(203).HasTag(498191540))
        ) {
          if (
            (this.NavigationPath || (this.NavigationPath = new Array()),
            (this.NavigationPath.length = 0),
            r <= this.TsRadius * this.TsRadius)
          )
            return (
              ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
                s.CharAiDesignComp.Entity.Id,
                "FollowIsCanInput",
                !0,
              ),
              e.Entity.CheckGetComponent(173).SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
              ),
              void this.OnClear()
            );
          (this.FoundPath =
            AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
              t,
              e.ActorLocation,
              h.ToUeVector(),
              this.NavigationPath,
            )),
            0 < this.NavigationPath.length &&
              ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
                s.CharAiDesignComp.Entity.Id,
                this.TsFollowPointName,
                this.NavigationPath[this.NavigationPath.length - 1].X,
                this.NavigationPath[this.NavigationPath.length - 1].Y,
                this.NavigationPath[this.NavigationPath.length - 1].Z,
              ),
            (this.CurrentNavigationIndex = 1),
            (this.NavigationEndTime =
              Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond),
            e.Entity.CheckGetComponent(173).SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
            ),
            ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
              s.CharAiDesignComp.Entity.Id,
              "FollowIsCanInput",
              !1,
            );
        }
        r <= this.TsRadius * this.TsRadius &&
          e.Entity.CheckGetComponent(203).HasTag(248240472) &&
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
            e,
            this.Source.ActorForwardProxy,
            this.TsStandSpeed,
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            22,
            "没有召唤Source对象 或者没有setRole",
            ["Type", t.GetClass().GetName()],
          ),
          this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  DelayDie(t) {
    if (!(t instanceof TsAiController_1.default))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 22, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    var i = t.AiController.CharActorComp;
    if (!i) return !1;
    var s,
      i = i.Entity.CheckGetComponent(0),
      i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        i.GetSummonerId(),
      );
    if (
      ((this.IsHas =
        !!ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(
          t.AiController.CharAiDesignComp.Entity.Id,
          this.TsIsHasName,
        )),
      !this.Source &&
        i &&
        (this.Source =
          ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
            i,
          )),
      !this.Source)
    )
      return !1;
    let e = !1;
    for (const r of this.TsTags) {
      var h = this.Source.Entity.CheckGetComponent(203).HasTag(r?.TagId);
      ((this.TsIsInTag && h) || (!this.TsIsInTag && !h)) &&
        (this.IsHas ||
          (ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
            t.AiController.CharAiDesignComp.Entity.Id,
            this.TsBeginTimeName,
            Time_1.Time.WorldTime,
          ),
          ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
            t.AiController.CharAiDesignComp.Entity.Id,
            this.TsIsHasName,
            !0,
          ),
          (this.IsHas = !0)),
        (e = !0));
    }
    return e
      ? ((s =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
            t.AiController.CharAiDesignComp.Entity.Id,
            this.TsBeginTimeName,
          )),
        (s = Time_1.Time.WorldTime - (s || 0)) >= this.TsWaitTime &&
          (0 !== i &&
            ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
              i,
            ) &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnClearFollowData,
              t.AiController.CharAiDesignComp.Entity.Id,
            ),
          !0))
      : (ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
          t.AiController.CharAiDesignComp.Entity.Id,
          this.TsIsHasName,
          !1,
        ),
        !1);
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      (this.NavigationPath = void 0),
      (this.Source = void 0),
      (this.FoundPath = !1);
  }
  DrawCube(t, i, s) {
    var e, h, r;
    t &&
      ((s = new UE.LinearColor(s, s, s, s)),
      (r = t.GetLocation()),
      (e = new UE.Vector(10, 10, 10)),
      (e = new UE.VectorDouble(0.5 * e.X, 0.5 * e.Y, 0.5 * e.Z)),
      (h = t.Rotator()),
      UE.KismetSystemLibrary.D_DrawDebugBox(
        GlobalData_1.GlobalData.World,
        r,
        e,
        s,
        h,
        i,
        30,
      ),
      (r = UE.KismetMathLibrary.D_TransformLocation(
        t,
        new UE.VectorDouble(0.5, 0.5, 0.5),
      )),
      (e = UE.KismetMathLibrary.D_TransformLocation(
        t,
        new UE.VectorDouble(-0.5, -0.5, -0.5),
      )),
      UE.KismetSystemLibrary.D_DrawDebugLine(
        GlobalData_1.GlobalData.World,
        r,
        e,
        s,
        i,
        15,
      ),
      (h = UE.KismetMathLibrary.D_TransformLocation(
        t,
        new UE.VectorDouble(0.5, -0.5, 0.5),
      )),
      (r = UE.KismetMathLibrary.D_TransformLocation(
        t,
        new UE.VectorDouble(-0.5, 0.5, 0.5),
      )),
      UE.KismetSystemLibrary.D_DrawDebugLine(
        GlobalData_1.GlobalData.World,
        h,
        r,
        s,
        i,
        15,
      ));
  }
}
exports.default = TsTaskFollowTarget;
//# sourceMappingURL=TsTaskFollowTarget.js.map
