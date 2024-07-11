"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NEAR_ZERO = 1e-6;
const NAVIGATION_COMPLETE_DISTANCE = 50;
const EDGE_Z = 100;
class TsTaskFlee extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.TargetKey = ""),
      (this.OverrideTurnSpeed = !1),
      (this.TurnSpeed = 0),
      (this.ForceNavigation = !1),
      (this.LeapMode = !1),
      (this.LeapDistance = 0),
      (this.IsInitTsVariables = !1),
      (this.TsTargetKey = ""),
      (this.TsOverrideTurnSpeed = !1),
      (this.TsTurnSpeed = 0),
      (this.TsForceNavigation = !1),
      (this.TsLeapMode = !1),
      (this.TsLeapDistance = 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.NavigationEndTime = -0),
      (this.IsFlying = !1),
      (this.MoveComp = void 0),
      (this.CompleteDistance = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsTargetKey = this.TargetKey),
      (this.TsOverrideTurnSpeed = this.OverrideTurnSpeed),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsForceNavigation = this.ForceNavigation),
      (this.TsLeapMode = this.LeapMode),
      (this.TsLeapDistance = this.LeapDistance));
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    const s = e.AiController;
    if (s)
      if (s.AiFlee) {
        let i = void 0;
        if (this.TsTargetKey) {
          var r =
            BlackboardController_1.BlackboardController.GetEntityIdByEntity(
              s.CharActorComp.Entity.Id,
              this.TsTargetKey,
            );
          if (r) {
            const n = EntitySystem_1.EntitySystem.Get(r);
            n && (i = n.GetComponent(3));
          }
        } else {
          r = s.AiHateList.GetCurrentTarget();
          i = r?.Entity?.GetComponent(3);
        }
        if (i) {
          r = s.CharActorComp;
          if (r) {
            const n = r.Entity;
            if (n)
              if (((this.MoveComp = n.GetComponent(161)), this.MoveComp)) {
                this.MoveComp.CharacterMovement.MovementMode === 5 &&
                  (this.IsFlying = !0);
                var r = r.ActorLocationProxy;
                let h = Vector_1.Vector.Create();
                let o =
                  (r.Subtraction(i.ActorLocationProxy, h),
                  (h.Z = 0),
                  h.Normalize(NEAR_ZERO),
                  new UE.Vector(-h.Y, h.X, 0));
                var a =
                  MathUtils_1.MathUtils.GetRandomRange(
                    s.AiFlee.FleeAngle.Min,
                    s.AiFlee.FleeAngle.Max,
                  ) * MathUtils_1.MathUtils.DegToRad;
                let l = Math.cos(a);
                var a = Math.sin(a);
                const _ = MathUtils_1.MathUtils.GetRandomRange(
                  s.AiFlee.FleeDistance.Min,
                  s.AiFlee.FleeDistance.Max,
                );
                let t = 0;
                this.IsFlying && (t = s.AiFlee.FleeHeight);
                h = new UE.Vector(
                  r.X + (h.X * l + o.X * a) * _,
                  r.Y + (h.Y * l + o.Y * a) * _,
                  r.Z + t,
                );
                this.NavigationPath || (this.NavigationPath = new Array()),
                  this.IsFlying
                    ? ((l = Vector_1.Vector.Create(r)),
                      (this.FoundPath = !0),
                      this.NavigationPath.splice(0, this.NavigationPath.length),
                      this.NavigationPath.push(l),
                      this.NavigationPath.push(Vector_1.Vector.Create(h)))
                    : (this.FoundPath =
                        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                          e,
                          r.ToUeVector(),
                          h,
                          this.NavigationPath,
                        )),
                  this.TsForceNavigation ||
                    this.FoundPath ||
                    ((o = Vector_1.Vector.Create(r)),
                    (this.FoundPath = !0),
                    this.NavigationPath.splice(0, this.NavigationPath.length),
                    this.NavigationPath.push(o),
                    this.NavigationPath.push(Vector_1.Vector.Create(h))),
                  this.FoundPath ||
                    ((a = (0, puerts_1.$ref)(void 0)),
                    UE.NavigationSystemV1.K2_ProjectPointToNavigation(
                      GlobalData_1.GlobalData.World,
                      h,
                      a,
                      void 0,
                      void 0,
                      new UE.Vector(_, _, EDGE_Z),
                    ) &&
                      (this.FoundPath =
                        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
                          e,
                          r.ToUeVector(),
                          (0, puerts_1.$unref)(a),
                          this.NavigationPath,
                        ))),
                  this.FoundPath
                    ? ((this.CurrentNavigationIndex = 1),
                      (this.NavigationEndTime =
                        Time_1.Time.WorldTime + s.AiFlee.TimeMilliseconds),
                      (l = s.CharAiDesignComp.Entity.GetComponent(89))?.Valid &&
                        l.SetMoveState(
                          CharacterUnifiedStateTypes_1.ECharMoveState.Run,
                        ))
                    : this.Finish(!0);
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "BehaviorTree",
                    30,
                    "CharacterMoveComponent Invalid",
                    ["Type", e.GetClass().GetName()],
                  );
            else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("BehaviorTree", 30, "Entity Invalid", [
                  "Type",
                  e.GetClass().GetName(),
                ]);
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "BehaviorTree",
                30,
                "CharacterActorComponent Invalid",
                ["Type", e.GetClass().GetName()],
              );
        } else (this.FoundPath = !1), this.Finish(!0);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "没有配置逃跑", [
            "AiBaseId",
            s.AiBase.Id,
          ]);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]);
  }
  ReceiveTickAI(t, i, e) {
    let s;
    let r;
    let h;
    var t = t.AiController;
    t
      ? Time_1.Time.WorldTime > this.NavigationEndTime ||
        ((s = t.CharActorComp),
        this.MoveComp.CharacterMovement.MovementMode === 5
          ? (this.IsFlying = !0)
          : (this.IsFlying = !1),
        (r = Vector_1.Vector.Create(
          this.NavigationPath[this.CurrentNavigationIndex],
        )).Subtraction(s.ActorLocationProxy, r),
        this.IsFlying || (r.Z = 0),
        (h = r.Size()),
        (this.CompleteDistance = this.TsLeapMode
          ? this.TsLeapDistance
          : NAVIGATION_COMPLETE_DISTANCE),
        h < this.CompleteDistance &&
          (this.CurrentNavigationIndex++,
          this.CurrentNavigationIndex === this.NavigationPath.length))
        ? this.Finish(!0)
        : ((r.Z /= h),
          (r.X /= h),
          (r.Y /= h),
          s.SetInputDirect(r),
          this.TsOverrideTurnSpeed
            ? AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                s,
                r,
                this.TsTurnSpeed,
              )
            : AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                s,
                r,
                t.AiWanderInfos?.AiWander
                  ? t.AiWanderInfos.AiWander.TurnSpeed
                  : 360,
              ))
      : this.FinishExecute(!1);
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      (this.MoveComp = void 0),
      (this.NavigationPath = void 0),
      (this.FoundPath = !1);
  }
}
exports.default = TsTaskFlee;
// # sourceMappingURL=TsTaskFlee.js.map
