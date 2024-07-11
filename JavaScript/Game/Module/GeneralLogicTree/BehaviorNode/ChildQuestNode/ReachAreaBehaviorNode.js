"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReachAreaBehaviorNode = void 0);
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  TickBehaviorNode_1 = require("./TickBehaviorNode");
class ReachAreaBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.lXt = void 0),
      (this._Xt = -0),
      (this.E0 = 0),
      (this.uXt = !1),
      (this.cXt = Vector_1.Vector.Create()),
      (this.mXt = "Box"),
      (this.aXt = []),
      (this.EffectPathKey = void 0),
      (this.ConditionGrop = void 0),
      (this.wY = 0),
      (this.dXt = void 0),
      (this.CXt = void 0),
      (this.gXt = Vector_1.Vector.Create()),
      (this.fXt = void 0),
      (this.pXt = 0),
      (this.vXt = 0),
      (this.OnAfterSubmit = (e) => {
        this.uXt = !1;
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if ("ReachArea" !== e.Type) return !1;
    (this.IntervalTime = 500),
      (this.E0 = e.EntityId),
      (this.aXt = e.MatchRoleOption),
      (this.ConditionGrop = e.PreConditions),
      (this.EffectPathKey = e.EffectPath);
    var t =
      void 0 !== e.RangeEntityId
        ? ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
            e.RangeEntityId,
          )
        : void 0;
    if (t) {
      this._Xt = e.Range;
      var i = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "RangeComponent",
        ),
        r = ((this.mXt = i.Shape.Type), t.Transform.Pos);
      switch (i.Shape.Type) {
        case "Sphere":
          var s = i.Shape.Center;
          (this.lXt = Vector_1.Vector.Create(
            r.X + (s?.X ?? 0),
            r.Y + (s?.Y ?? 0),
            r.Z + (s?.Z ?? 0),
          )),
            (this._Xt = i.Shape.Radius);
          break;
        case "Box":
          var s = t.Transform.Rot,
            h = i.Shape.Center,
            o = i.Shape.Size,
            a = i.Shape.Rotator,
            s = Rotator_1.Rotator.Create(
              s?.Y ?? 0 + (a?.Y ?? 0),
              s?.Z ?? 0 + (a?.Z ?? 0),
              s?.X ?? 0 + (a?.X ?? 0),
            ).Quaternion(),
            a = Vector_1.Vector.Create(
              r.X + (h?.X ?? 0),
              r.Y + (h?.Y ?? 0),
              r.Z + (h?.Z ?? 0),
            ),
            h = Transform_1.Transform.Create(s, a, Vector_1.Vector.OneVector);
          (this.lXt = a),
            (this.dXt = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0)),
            (this.CXt = h);
          break;
        case "Cylinder":
          s = i.Shape.Center;
          (this.fXt = Vector_1.Vector.Create(
            r.X ?? 0 + (s?.X ?? 0),
            r.Y + (s?.Y ?? 0),
            r.Z + (s?.Z ?? 0),
          )),
            (this.pXt = i.Shape.Radius),
            (this.vXt = i.Shape.Height);
      }
    } else
      (this.lXt = Vector_1.Vector.Create(e.Pos.X, e.Pos.Y, e.Pos.Z)),
        (this._Xt = e.Range),
        (this.mXt = "Sphere");
    return !0;
  }
  OnDestroy() {
    super.OnDestroy();
  }
  OnTick() {
    this.wY++,
      ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
        this.uXt ||
        (!this.Blackboard.IsTracking && this.wY % 2 != 0) ||
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
        (this.MXt() && this.SubmitNode());
  }
  MXt() {
    if (this.aXt && 0 < this.aXt.length) {
      if (
        !SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.aXt)
      )
        return !1;
    } else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
      return !1;
    if (
      this.ConditionGrop &&
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
        this.ConditionGrop,
        void 0,
      )
    )
      return !1;
    if (this.E0) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.E0,
      );
      if (!e) return !1;
      this.cXt.DeepCopy(e.Entity.GetComponent(1).ActorLocationProxy);
    } else {
      e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (!e) return !1;
      this.cXt.DeepCopy(e);
    }
    if (!this.cXt) return !1;
    let t = !1;
    switch (this.mXt) {
      case "Sphere":
        this.lXt &&
          (t = Vector_1.Vector.Distance(this.cXt, this.lXt) < this._Xt);
        break;
      case "Box":
        this.CXt?.InverseTransformPosition(this.cXt, this.gXt),
          (t =
            this.gXt.X > -this.dXt.X &&
            this.gXt.X < this.dXt.X &&
            this.gXt.Y > -this.dXt.Y &&
            this.gXt.Y < this.dXt.Y &&
            this.gXt.Z > -this.dXt.Z &&
            this.gXt.Z < this.dXt.Z);
        break;
      case "Cylinder":
        var i;
        !this.fXt ||
          Vector_1.Vector.Dist2D(this.cXt, this.fXt) > this.pXt ||
          ((i = this.cXt.Z - this.fXt.Z),
          (t = i <= this.vXt / 2 && i >= -this.vXt / 2));
    }
    return t;
  }
  OnBeforeSubmit() {
    this.uXt = !0;
  }
  GetTargetPosition() {
    return this.lXt;
  }
}
exports.ReachAreaBehaviorNode = ReachAreaBehaviorNode;
//# sourceMappingURL=ReachAreaBehaviorNode.js.map
