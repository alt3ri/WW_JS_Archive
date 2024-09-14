"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReachAreaBehaviorNode = void 0);
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  TickBehaviorNode_1 = require("./TickBehaviorNode");
class ReachAreaBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.l$t = void 0),
      (this._$t = -0),
      (this.E0 = 0),
      (this.u$t = !1),
      (this.c$t = Vector_1.Vector.Create()),
      (this.m$t = "Box"),
      (this.a$t = []),
      (this.EffectPathKey = void 0),
      (this.ConditionGrop = void 0),
      (this.wY = 0),
      (this.d$t = void 0),
      (this.C$t = void 0),
      (this.g$t = Vector_1.Vector.Create()),
      (this.f$t = void 0),
      (this.p$t = 0),
      (this.v$t = 0),
      (this.gXa = !1),
      (this.OnAfterSubmit = (e) => {
        this.u$t = !1;
      });
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.ReachArea) return !1;
    (this.IntervalTime = 500),
      (this.E0 = e.EntityId),
      (this.a$t = e.MatchRoleOption),
      (this.ConditionGrop = e.PreConditions),
      (this.EffectPathKey = e.EffectPath);
    var t =
      void 0 !== e.RangeEntityId
        ? ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
            e.RangeEntityId,
          )
        : void 0;
    if (
      ((this.gXa = void 0 !== e.RangeEntities && 0 < e.RangeEntities?.length),
      t)
    ) {
      this._$t = e.Range;
      var i = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "RangeComponent",
        ),
        r = ((this.m$t = i.Shape.Type), t.Transform.Pos);
      switch (i.Shape.Type) {
        case "Sphere":
          var s = i.Shape.Center;
          (this.l$t = Vector_1.Vector.Create(
            r.X + (s?.X ?? 0),
            r.Y + (s?.Y ?? 0),
            r.Z + (s?.Z ?? 0),
          )),
            (this._$t = i.Shape.Radius);
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
          (this.l$t = a),
            (this.d$t = Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0)),
            (this.C$t = h);
          break;
        case "Cylinder":
          s = i.Shape.Center;
          (this.f$t = Vector_1.Vector.Create(
            r.X ?? 0 + (s?.X ?? 0),
            r.Y + (s?.Y ?? 0),
            r.Z + (s?.Z ?? 0),
          )),
            (this.p$t = i.Shape.Radius),
            (this.v$t = i.Shape.Height);
      }
    } else
      (this.l$t = Vector_1.Vector.Create(e.Pos.X, e.Pos.Y, e.Pos.Z)),
        (this._$t = e.Range),
        (this.m$t = "Sphere");
    return !0;
  }
  OnDestroy() {
    super.OnDestroy();
  }
  OnTick() {
    this.wY++,
      ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
        this.u$t ||
        (!this.Blackboard.IsTracking && this.wY % 2 != 0) ||
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() ||
        this.gXa ||
        (this.M$t() && this.SubmitNode());
  }
  M$t() {
    if (this.a$t && 0 < this.a$t.length) {
      if (
        !SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.a$t)
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
      this.c$t.DeepCopy(e.Entity.GetComponent(1).ActorLocationProxy);
    } else {
      e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      if (!e) return !1;
      this.c$t.DeepCopy(e);
    }
    if (!this.c$t) return !1;
    let t = !1;
    switch (this.m$t) {
      case "Sphere":
        this.l$t &&
          (t = Vector_1.Vector.Distance(this.c$t, this.l$t) < this._$t);
        break;
      case "Box":
        this.C$t?.InverseTransformPosition(this.c$t, this.g$t),
          (t =
            this.g$t.X > -this.d$t.X &&
            this.g$t.X < this.d$t.X &&
            this.g$t.Y > -this.d$t.Y &&
            this.g$t.Y < this.d$t.Y &&
            this.g$t.Z > -this.d$t.Z &&
            this.g$t.Z < this.d$t.Z);
        break;
      case "Cylinder":
        var i;
        !this.f$t ||
          Vector_1.Vector.Dist2D(this.c$t, this.f$t) > this.p$t ||
          ((i = this.c$t.Z - this.f$t.Z),
          (t = i <= this.v$t / 2 && i >= -this.v$t / 2));
    }
    return t;
  }
  OnBeforeSubmit() {
    this.u$t = !0;
  }
  GetTargetPosition() {
    return this.l$t;
  }
}
exports.ReachAreaBehaviorNode = ReachAreaBehaviorNode;
//# sourceMappingURL=ReachAreaBehaviorNode.js.map
