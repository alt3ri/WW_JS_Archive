"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const SELF_MASK = 1;
const ALLY_MASK = 2;
const ENEMY_MASK = 4;
const NEUTRAL_MASK = 8;
class TsTaskCheckTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.CheckSight = !1),
      (this.CheckDistance = 0),
      (this.CheckAngle = 0),
      (this.CheckHeight = 0),
      (this.NeedCheckAutonomous = !1),
      (this.CheckCampRelevance = 0),
      (this.CheckCamp = 0),
      (this.CheckTags = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsCheckSight = !1),
      (this.TsNeedCheckAutonomous = !1),
      (this.TsCheckCampRelevance = 0),
      (this.TsCheckCamp = 0),
      (this.DistanceRange = void 0),
      (this.AngleRange = void 0),
      (this.HeightRange = void 0),
      (this.CheckTagsCopy = void 0),
      (this.NeedOneTag = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCheckSight = this.CheckSight),
      (this.TsNeedCheckAutonomous = this.NeedCheckAutonomous),
      (this.TsCheckCampRelevance = this.CheckCampRelevance),
      (this.TsCheckCamp = this.CheckCamp));
  }
  static SwapAndClearTmpTargets() {
    const s = TsTaskCheckTarget.TmpTargets;
    (TsTaskCheckTarget.TmpTargets = TsTaskCheckTarget.TmpTargets2),
      (TsTaskCheckTarget.TmpTargets2 = s),
      TsTaskCheckTarget.TmpTargets.clear();
  }
  ReceiveExecuteAI(s, t) {
    this.InitTsVariables(),
      this.DistanceRange ||
        ((this.DistanceRange = [
          -MathUtils_1.MathUtils.LargeNumber,
          this.CheckDistance,
        ]),
        (this.AngleRange = [-this.CheckAngle, this.CheckAngle]),
        (this.HeightRange = [-this.CheckHeight, this.CheckHeight]));
  }
  ReceiveTickAI(s, t, e) {
    let a = s.AiController;
    if (a) {
      const r = a.CharActorComp;
      if (
        (BlackboardController_1.BlackboardController.RemoveValueByEntity(
          r.Entity.Id,
          "TargetArray",
        ),
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
          r.Entity.Id,
          "Target",
        ),
        TsTaskCheckTarget.TmpTargets
          ? (TsTaskCheckTarget.TmpTargets.clear(),
            TsTaskCheckTarget.TmpTargets2.clear())
          : ((TsTaskCheckTarget.TmpTargets = new Set()),
            (TsTaskCheckTarget.TmpTargets2 = new Set())),
        this.RelevanceAndCamp(a, r),
        TsTaskCheckTarget.TmpTargets.size === 0)
      )
        this.FinishExecute(!1);
      else if ((this.Tags(), TsTaskCheckTarget.TmpTargets.size === 0))
        this.FinishExecute(!1);
      else {
        if (this.TsCheckSight) {
          TsTaskCheckTarget.SwapAndClearTmpTargets();
          for (const i of TsTaskCheckTarget.TmpTargets2)
            MathUtils_1.MathUtils.LocationInRangeArray(
              r.FloorLocation,
              r.ActorRotationProxy,
              i.FloorLocation,
              r.ScaledRadius + i.ScaledRadius,
              this.DistanceRange,
              this.AngleRange,
              this.HeightRange,
            ) && TsTaskCheckTarget.TmpTargets.add(i);
        }
        const h = new Array();
        for (const T of TsTaskCheckTarget.TmpTargets)
          (!this.TsNeedCheckAutonomous ||
            T.Entity.GetComponent(3)?.IsAutonomousProxy) &&
            h.push(T.Entity.Id);
        h.length === 0
          ? this.FinishExecute(!1)
          : (BlackboardController_1.BlackboardController.SetIntValuesByEntity(
              r.Entity.Id,
              "TargetArray",
              h,
            ),
            (a = Math.floor(
              MathUtils_1.MathUtils.GetRandomRange(0, h.length - 1),
            )),
            BlackboardController_1.BlackboardController.SetEntityIdByEntity(
              r.Entity.Id,
              "Target",
              h[a],
            ),
            this.FinishExecute(!0));
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          s.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  RelevanceAndCamp(s, t) {
    if (
      ((this.TsCheckCampRelevance & SELF_MASK) > 0 &&
        TsTaskCheckTarget.TmpTargets.add(t),
      (this.TsCheckCampRelevance & ALLY_MASK) > 0)
    ) {
      let e;
      const a = s.CharAiDesignComp.Entity.Id;
      for (const i of s.AiPerception.Allies)
        i !== a &&
          (e =
            CharacterController_1.CharacterController.GetCharacterActorComponentById(
              i,
            )) &&
          TsTaskCheckTarget.TmpTargets.add(e);
    }
    if ((this.TsCheckCampRelevance & ENEMY_MASK) > 0)
      for (const T of s.AiPerception.AllEnemies) {
        const r =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            T,
          );
        r && TsTaskCheckTarget.TmpTargets.add(r);
      }
    if ((this.TsCheckCampRelevance & NEUTRAL_MASK) > 0)
      for (const o of s.AiPerception.Neutrals) {
        const h =
          CharacterController_1.CharacterController.GetCharacterActorComponentById(
            o,
          );
        h && TsTaskCheckTarget.TmpTargets.add(h);
      }
    if (this.TsCheckCamp !== 13) {
      TsTaskCheckTarget.SwapAndClearTmpTargets();
      for (const k of TsTaskCheckTarget.TmpTargets2)
        k.Actor.Camp === this.TsCheckCamp &&
          TsTaskCheckTarget.TmpTargets.add(k);
    }
  }
  Tags() {
    if (!this.CheckTagsCopy) {
      (this.NeedOneTag = !1), (this.CheckTagsCopy = new Array());
      for (let s = this.CheckTags.Num() - 1; s >= 0; --s) {
        const t = this.CheckTags.GetKey(s);
        const e = this.CheckTags.Get(t);
        this.CheckTagsCopy.push([t, e]), e && (this.NeedOneTag = !0);
      }
    }
    if (this.CheckTagsCopy.length) {
      TsTaskCheckTarget.SwapAndClearTmpTargets();
      for (const i of TsTaskCheckTarget.TmpTargets2) {
        const a = i.Entity.GetComponent(185);
        if (a?.Valid) {
          let s = !0;
          for (const [r, h] of this.CheckTagsCopy)
            if (a.HasTag(r?.TagId) !== h) {
              s = !1;
              break;
            }
          s && TsTaskCheckTarget.TmpTargets.add(i);
        } else this.NeedOneTag || TsTaskCheckTarget.TmpTargets.add(i);
      }
    }
  }
}
exports.default = TsTaskCheckTarget;
// # sourceMappingURL=TsTaskCheckTarget.js.map
