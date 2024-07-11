"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsAiController_1 = require("../../Controller/TsAiController");
class TsServiceAnimalPerception extends UE.BTService_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.SenseRadius = void 0),
      (this.IsInitTsVariables = !1),
      (this.VectorCache = void 0),
      (this.MinRangeSquared = -0),
      (this.MaxRangeSquared = -0),
      (this.IsEnter = !1),
      (this.IsSetNearerPlayerId = !1);
  }
  InitTsVariables() {
    let e, r;
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((e = this.SenseRadius.LowerBound.Value),
      (r = this.SenseRadius.UpperBound.Value),
      (this.MinRangeSquared = e * e),
      (this.MaxRangeSquared = r * r),
      (this.VectorCache = Vector_1.Vector.Create()),
      (this.IsEnter = !1),
      (this.IsSetNearerPlayerId = !1),
      (this.IsInitTsVariables = !0));
  }
  ReceiveActivationAI(e, r) {
    e instanceof TsAiController_1.default && this.InitTsVariables();
  }
  ReceiveTickAI(e, r, t) {
    e instanceof TsAiController_1.default &&
      (e = e.AiController) &&
      ((e = e.CharActorComp), this.HandlePerception(e));
  }
  HandlePerception(r) {
    const t = r.Entity;
    let i = void 0;
    let o = MathUtils_1.MathUtils.MaxFloat;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var l = this.GetMinPlayerDistSquared(r.ActorLocationProxy);
      (i = l.PlayerEntity), (o = l.MinDistSquared);
    } else {
      l = Global_1.Global.BaseCharacter;
      if (!l?.IsValid())
        return void (
          this.IsSetNearerPlayerId &&
          ((this.IsSetNearerPlayerId = !1),
          BlackboardController_1.BlackboardController.RemoveValueByEntity(
            t.Id,
            "NearerPlayerId",
          ))
        );
      (i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(l.EntityId)),
        l.CharacterActorComponent.ActorLocationProxy.Subtraction(
          r.ActorLocationProxy,
          this.VectorCache,
        ),
        (o = this.VectorCache.SizeSquared());
    }
    if (i?.Valid) {
      (l = i.Id), (r = o);
      let e = 0;
      r > this.MaxRangeSquared
        ? ((e = 0), this.IsEnter && (this.IsEnter = !1))
        : r > this.MinRangeSquared
          ? (e = this.IsEnter ? l : 0)
          : ((e = l), this.IsEnter || (this.IsEnter = !0)),
        e === 0
          ? this.IsSetNearerPlayerId &&
            ((this.IsSetNearerPlayerId = !1),
            BlackboardController_1.BlackboardController.RemoveValueByEntity(
              t.Id,
              "NearerPlayerId",
            ))
          : PerformanceController_1.PerformanceController
              .IsEntityPerformanceTest ||
            (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
              t.Id,
              "NearerPlayerId",
              e,
            ),
            (this.IsSetNearerPlayerId = !0));
    } else
      this.IsSetNearerPlayerId &&
        ((this.IsSetNearerPlayerId = !1),
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
          t.Id,
          "NearerPlayerId",
        ));
  }
  GetMinPlayerDistSquared(e) {
    const r = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap;
    const t = ModelManager_1.ModelManager.SceneTeamModel;
    let i = void 0;
    let o = MathUtils_1.MathUtils.MaxFloat;
    for (const s of r) {
      var l;
      const a = t.GetTeamItem(s[0], {
        ParamType: 2,
        IsControl: !0,
      })?.EntityHandle;
      a &&
        (a.Entity.GetComponent(3).ActorLocationProxy.Subtraction(
          e,
          this.VectorCache,
        ),
        (l = this.VectorCache.SizeSquared()) < o) &&
        ((o = l), (i = a));
    }
    return { PlayerEntity: i, MinDistSquared: o };
  }
}
exports.default = TsServiceAnimalPerception;
// # sourceMappingURL=TsServiceAnimalPerception.js.map
