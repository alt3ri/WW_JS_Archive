"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ParallaxBehaviorNode = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TickBehaviorNode_1 = require("./TickBehaviorNode"),
  EMISSION_PARAM_NAME = "E_Action_EmissionColor";
class ParallaxBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.eXt = void 0),
      (this.tXt = void 0),
      (this.iXt = Vector2D_1.Vector2D.Create()),
      (this.oXt = Vector2D_1.Vector2D.Create()),
      (this.Lo = void 0),
      (this.$Bn = -0),
      (this.rXt = !1),
      (this.nXt = void 0);
  }
  OnCreate(t) {
    var i;
    return (
      !!super.OnCreate(t) &&
      "ParallaxAlign" === (i = t.Condition).Type &&
      ((this.Lo = i), !!this.Lo) &&
      ((this.eXt = Vector_1.Vector.Create(
        this.Lo.SourcePos.X,
        this.Lo.SourcePos.Y,
        this.Lo.SourcePos.Z,
      )),
      (this.tXt = Vector_1.Vector.Create(
        this.Lo.TargetPos.X,
        this.Lo.TargetPos.Y,
        this.Lo.TargetPos.Z,
      )),
      super.OnCreate(t))
    );
  }
  OnStart(t) {
    var i;
    (this.rXt = !1),
      this.Lo.BallEntity &&
        (i = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(
          this.Lo.BallEntity,
        )) &&
        (this.nXt = EntitySystem_1.EntitySystem.GetComponent(i, 182)),
      super.OnStart(t);
  }
  OnEnd(t) {
    (this.rXt = !0), super.OnEnd(t);
  }
  OnTick(t) {
    var i, s, e, h, r, o, a;
    this.rXt ||
      ((i = (0, puerts_1.$ref)(void 0)),
      !UE.GameplayStatics.ProjectWorldToScreen(
        Global_1.Global.CharacterController,
        this.eXt.ToUeVector(),
        i,
        !1,
      ) ||
      (this.iXt.FromUeVector2D((0, puerts_1.$unref)(i)),
      !UE.GameplayStatics.ProjectWorldToScreen(
        Global_1.Global.CharacterController,
        this.tXt.ToUeVector(),
        i,
        !1,
      )) ||
      (this.oXt.FromUeVector2D((0, puerts_1.$unref)(i)),
      !this.nXt &&
        this.Lo.BallEntity &&
        (i = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(
          this.Lo.BallEntity,
        )) &&
        (this.nXt = EntitySystem_1.EntitySystem.GetComponent(i, 182)),
      (i = Global_1.Global.CharacterController),
      (s = (0, puerts_1.$ref)(void 0)),
      (e = (0, puerts_1.$ref)(void 0)),
      i.GetViewportSize(s, e),
      (i = Math.max(
        Math.abs(this.iXt.X - this.oXt.X) / (0, puerts_1.$unref)(s),
        Math.abs(this.iXt.Y - this.oXt.Y) / (0, puerts_1.$unref)(e),
      )),
      this.nXt &&
        ((s = MathCommon_1.MathCommon.Clamp(
          (i - this.Lo.ErrorRange) /
            (this.Lo.BrightnessAdjustRange - this.Lo.ErrorRange),
          0,
          1,
        )),
        (e = this.Lo.DefaultBrightness || 0),
        this.Lo.FinalColor
          ? ((a =
              MathCommon_1.MathCommon.Lerp(
                e * this.Lo.FinalColor.R,
                this.Lo.FinalColor.R,
                1 - s,
              ) / 255),
            (h =
              MathCommon_1.MathCommon.Lerp(
                e * this.Lo.FinalColor.G,
                this.Lo.FinalColor.G,
                1 - s,
              ) / 255),
            (r =
              MathCommon_1.MathCommon.Lerp(
                e * this.Lo.FinalColor.B,
                this.Lo.FinalColor.B,
                1 - s,
              ) / 255),
            (o = MathCommon_1.MathCommon.Lerp(
              e * this.Lo.FinalColor.A,
              this.Lo.FinalColor.A,
              1 - s,
            )),
            this.nXt.UpdateInteractionMaterialColorParam(
              EMISSION_PARAM_NAME,
              a,
              h,
              r,
              o,
            ))
          : ((a = MathCommon_1.MathCommon.Lerp(e, 1, 1 - s)),
            this.nXt.UpdateInteractionMaterialColorParam(
              EMISSION_PARAM_NAME,
              a,
              a,
              a,
            ))),
      i > this.Lo.ErrorRange)
        ? (this.$Bn = 0)
        : ((this.$Bn += t),
          (!this.Lo.FixationTime ||
            this.$Bn >=
              this.Lo.FixationTime * CommonDefine_1.MILLIONSECOND_PER_SECOND) &&
            (this.SubmitNode(), (this.rXt = !0))));
  }
}
exports.ParallaxBehaviorNode = ParallaxBehaviorNode;
//# sourceMappingURL=ParallaxBehaviorNode.js.map
