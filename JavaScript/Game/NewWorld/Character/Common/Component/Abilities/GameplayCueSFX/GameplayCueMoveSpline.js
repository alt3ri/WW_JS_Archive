"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueMoveSpline = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem"),
  Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  GameplayCueEffect_1 = require("./GameplayCueEffect"),
  WIDTH = 70,
  LENGTH = 100,
  TANGENT = 130,
  SPLINE_MOVE_SPEED = 520,
  SPLINE_ROTATION_SPEED = 20;
class GameplayCueMoveSpline extends GameplayCueEffect_1.GameplayCueEffect {
  constructor() {
    super(...arguments),
      (this.m$o = void 0),
      (this.d$o = (0, puerts_1.$ref)(0)),
      (this.C$o = (0, puerts_1.$ref)(0)),
      (this.g$o = (0, puerts_1.$ref)(!1));
  }
  OnTick(e) {
    var t;
    EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle) &&
      (t = EffectSystem_1.EffectSystem.GetSureEffectActor(
        this.EffectViewHandle,
      )) &&
      UE.MoveSplineAI_C.元素球跟随(
        e,
        t,
        this.ActorInternal,
        this.m$o,
        (0, puerts_1.$unref)(this.d$o),
        SPLINE_MOVE_SPEED,
        SPLINE_ROTATION_SPEED,
        (0, puerts_1.$unref)(this.C$o),
        (0, puerts_1.$unref)(this.g$o),
        void 0,
        this.d$o,
        this.C$o,
        this.g$o,
      );
  }
  OnDestroy() {
    ActorSystem_1.ActorSystem.Put(this.m$o.GetOwner()), super.OnDestroy();
  }
  AttachEffect() {
    var t = [
        new UE.Vector(-WIDTH, 0, 0),
        new UE.Vector(0, LENGTH, 0),
        new UE.Vector(WIDTH, 0, 0),
        new UE.Vector(0, -LENGTH, 0),
      ],
      r = [
        new UE.Vector(0, TANGENT, 0),
        new UE.Vector(TANGENT, 0, 0),
        new UE.Vector(0, -TANGENT, 0),
        new UE.Vector(-TANGENT, 0, 0),
      ],
      s =
        ((this.m$o = this.f$o()),
        this.m$o.SetClosedLoop(!0),
        this.m$o.ClearSplinePoints(),
        UE.NewArray(UE.SplinePoint));
    for (let e = 0; e < t.length; e++) {
      var E = new UE.SplinePoint(
        e,
        t[e],
        r[e],
        r[e],
        Rotator_1.Rotator.ZeroRotator,
        Vector_1.Vector.OneVector,
        4,
      );
      s.Add(E);
    }
    this.m$o.AddPoints(s);
  }
  f$o() {
    var e = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        this.ActorInternal.GetTransform(),
      ),
      e =
        (GlobalData_1.GlobalData.IsPlayInEditor &&
          e.SetActorLabel(
            this.ActorInternal.GetActorLabel() +
              ":" +
              GameplayCueMoveSpline.name,
          ),
        e.AddComponentByClass(
          UE.KuroMoveSplineComponent.StaticClass(),
          !1,
          this.ActorInternal.GetTransform(),
          !1,
        ));
    return e;
  }
}
exports.GameplayCueMoveSpline = GameplayCueMoveSpline;
//# sourceMappingURL=GameplayCueMoveSpline.js.map
