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
  CharacterController_1 = require("../../../NewWorld/Character/CharacterController"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
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
  ReceiveTickAI(t, i, e) {
    var s = t.AiController;
    s
      ? (this.DelayDie(t),
        (s = s.CharActorComp).Entity.CheckGetComponent(188).HasTag(-1371021686)
          ? (s.SetInputDirect(Vector_1.Vector.ZeroVector), this.OnClear())
          : (this.GetPath(t, i),
            this.FoundPath &&
              (Time_1.Time.WorldTime > this.NavigationEndTime
                ? this.Finish(!1)
                : ((t = Vector_1.Vector.Create(
                    this.NavigationPath[this.CurrentNavigationIndex],
                  )).Subtraction(s.ActorLocationProxy, t),
                  (t.Z = 0),
                  (i = t.Size()) <
                    (s.Owner.GetMovementComponent()?.Velocity.Size() ?? 0) /
                      ((this.TsSpeed ?? 1) * MathUtils_1.MathUtils.DegToRad) +
                      NAVIGATION_COMPLETE_DISTANCE &&
                  (this.CurrentNavigationIndex++,
                  this.CurrentNavigationIndex === this.NavigationPath.length)
                    ? this.Finish(!0)
                    : (t.DivisionEqual(i),
                      s.SetInputDirect(t, !0),
                      AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                        s,
                        t,
                        this.TsSpeed,
                      ))))))
      : this.FinishExecute(!1);
  }
  GetPath(t, i) {
    var e = t.AiController;
    if (e) {
      var s = e.CharActorComp,
        r = s.Entity.CheckGetComponent(48);
      if (0 !== r.RoleId) {
        this.Source =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            r.RoleId,
          );
        var r = Vector_1.Vector.Create(),
          h =
            (this.Source.ActorForwardProxy.RotateAngleAxis(
              this.TsAngle,
              Vector_1.Vector.UpVectorProxy,
              r,
            ),
            r.Normalize(MathUtils_1.MathUtils.KindaSmallNumber),
            r.Multiply(this.TsLength, r),
            r.Addition(this.Source.ActorLocationProxy, r),
            this.TsIsShowCube &&
              this.DrawCube(new UE.Transform(r.ToUeVector()), 5, 156),
            Vector_1.Vector.DistSquared(r, s.ActorLocationProxy));
        if (
          (this.TsIsShowCube &&
            this.DrawCube(new UE.Transform(s.ActorLocation), 5, 0),
          h > this.TsNavigationRadius * this.TsNavigationRadius ||
            s.Entity.CheckGetComponent(188).HasTag(498191540))
        ) {
          if (
            (this.NavigationPath || (this.NavigationPath = new Array()),
            (this.NavigationPath.length = 0),
            h <= this.TsRadius * this.TsRadius)
          )
            return (
              BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
                e.CharAiDesignComp.Entity.Id,
                "FollowIsCanInput",
                !0,
              ),
              s.Entity.CheckGetComponent(160).SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
              ),
              void this.OnClear()
            );
          (this.FoundPath =
            AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
              t,
              s.ActorLocation,
              r.ToUeVector(),
              this.NavigationPath,
            )),
            0 < this.NavigationPath.length &&
              BlackboardController_1.BlackboardController.SetVectorValueByEntity(
                e.CharAiDesignComp.Entity.Id,
                this.TsFollowPointName,
                this.NavigationPath[this.NavigationPath.length - 1].X,
                this.NavigationPath[this.NavigationPath.length - 1].Y,
                this.NavigationPath[this.NavigationPath.length - 1].Z,
              ),
            (this.CurrentNavigationIndex = 1),
            (this.NavigationEndTime =
              Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond),
            s.Entity.CheckGetComponent(160).SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
            ),
            BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
              e.CharAiDesignComp.Entity.Id,
              "FollowIsCanInput",
              !1,
            );
        }
        h <= this.TsRadius * this.TsRadius &&
          s.Entity.CheckGetComponent(188).HasTag(248240472) &&
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
            s,
            this.Source.ActorForwardProxy,
            this.TsStandSpeed,
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            23,
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
          Log_1.Log.Error("BehaviorTree", 23, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    var i = t.AiController.CharActorComp;
    if (!i) return !1;
    var e,
      i = i.Entity.CheckGetComponent(48);
    if (
      ((this.IsHas =
        !!BlackboardController_1.BlackboardController.GetBooleanValueByEntity(
          t.AiController.CharAiDesignComp.Entity.Id,
          this.TsIsHasName,
        )),
      !this.Source &&
        i.RoleId &&
        (this.Source =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            i.RoleId,
          )),
      !this.Source)
    )
      return !1;
    let s = !1;
    for (const h of this.TsTags) {
      var r = this.Source.Entity.CheckGetComponent(188).HasTag(h?.TagId);
      ((this.TsIsInTag && r) || (!this.TsIsInTag && !r)) &&
        (this.IsHas ||
          (BlackboardController_1.BlackboardController.SetIntValueByEntity(
            t.AiController.CharAiDesignComp.Entity.Id,
            this.TsBeginTimeName,
            Time_1.Time.WorldTime,
          ),
          BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
            t.AiController.CharAiDesignComp.Entity.Id,
            this.TsIsHasName,
            !0,
          ),
          (this.IsHas = !0)),
        (s = !0));
    }
    return s
      ? ((e = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          t.AiController.CharAiDesignComp.Entity.Id,
          this.TsBeginTimeName,
        )),
        (e = Time_1.Time.WorldTime - (e || 0)) >= this.TsWaitTime &&
          (0 !== i.RoleId &&
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              i.RoleId,
            ) &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnClearFollowData,
              t.AiController.CharAiDesignComp.Entity.Id,
            ),
          !0))
      : (BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
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
  DrawCube(t, i, e) {
    var s, r, h;
    t &&
      ((e = new UE.LinearColor(e, e, e, e)),
      (h = t.GetLocation()),
      (s = new UE.Vector(10, 10, 10)),
      (s = new UE.Vector(0.5 * s.X, 0.5 * s.Y, 0.5 * s.Z)),
      (r = t.Rotator()),
      UE.KismetSystemLibrary.DrawDebugBox(
        GlobalData_1.GlobalData.World,
        h,
        s,
        e,
        r,
        i,
        30,
      ),
      (h = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(0.5, 0.5, 0.5),
      )),
      (s = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(-0.5, -0.5, -0.5),
      )),
      UE.KismetSystemLibrary.DrawDebugLine(
        GlobalData_1.GlobalData.World,
        h,
        s,
        e,
        i,
        15,
      ),
      (r = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(0.5, -0.5, 0.5),
      )),
      (h = UE.KismetMathLibrary.TransformLocation(
        t,
        new UE.Vector(-0.5, 0.5, 0.5),
      )),
      UE.KismetSystemLibrary.DrawDebugLine(
        GlobalData_1.GlobalData.World,
        r,
        h,
        e,
        i,
        15,
      ));
  }
}
exports.default = TsTaskFollowTarget;
//# sourceMappingURL=TsTaskFollowTarget.js.map
