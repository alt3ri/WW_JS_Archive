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
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TickBehaviorNode_1 = require("./TickBehaviorNode"),
  EMISSION_PARAM_NAME = "E_Action_EmissionColor";
class ParallaxBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.e$t = void 0),
      (this.t$t = void 0),
      (this.i$t = Vector2D_1.Vector2D.Create()),
      (this.o$t = Vector2D_1.Vector2D.Create()),
      (this.Lo = void 0),
      (this.DGn = -0),
      (this.r$t = !1),
      (this.n$t = void 0);
  }
  OnCreate(t) {
    var i;
    return (
      !!super.OnCreate(t) &&
      (i = t.Condition).Type === IQuest_1.EChildQuest.ParallaxAlign &&
      ((this.Lo = i), !!this.Lo) &&
      ((this.e$t = Vector_1.Vector.Create(
        this.Lo.SourcePos.X,
        this.Lo.SourcePos.Y,
        this.Lo.SourcePos.Z,
      )),
      (this.t$t = Vector_1.Vector.Create(
        this.Lo.TargetPos.X,
        this.Lo.TargetPos.Y,
        this.Lo.TargetPos.Z,
      )),
      super.OnCreate(t))
    );
  }
  OnStart(t) {
    var i;
    (this.r$t = !1),
      this.Lo.BallEntity &&
        (i = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(
          this.Lo.BallEntity,
        )) &&
        (this.n$t = EntitySystem_1.EntitySystem.GetComponent(i, 187)),
      super.OnStart(t);
  }
  OnEnd(t) {
    (this.r$t = !0), super.OnEnd(t);
  }
  OnTick(t) {
    var i, e, s, h, r, o, a;
    this.r$t ||
      ((i = (0, puerts_1.$ref)(void 0)),
      !UE.GameplayStatics.ProjectWorldToScreen(
        Global_1.Global.CharacterController,
        this.e$t.ToUeVector(),
        i,
        !1,
      ) ||
      (this.i$t.FromUeVector2D((0, puerts_1.$unref)(i)),
      !UE.GameplayStatics.ProjectWorldToScreen(
        Global_1.Global.CharacterController,
        this.t$t.ToUeVector(),
        i,
        !1,
      )) ||
      (this.o$t.FromUeVector2D((0, puerts_1.$unref)(i)),
      !this.n$t &&
        this.Lo.BallEntity &&
        (i = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(
          this.Lo.BallEntity,
        )) &&
        (this.n$t = EntitySystem_1.EntitySystem.GetComponent(i, 187)),
      (i = Global_1.Global.CharacterController),
      (e = (0, puerts_1.$ref)(void 0)),
      (s = (0, puerts_1.$ref)(void 0)),
      i.GetViewportSize(e, s),
      (i = Math.max(
        Math.abs(this.i$t.X - this.o$t.X) / (0, puerts_1.$unref)(e),
        Math.abs(this.i$t.Y - this.o$t.Y) / (0, puerts_1.$unref)(s),
      )),
      this.n$t &&
        ((e = MathCommon_1.MathCommon.Clamp(
          (i - this.Lo.ErrorRange) /
            (this.Lo.BrightnessAdjustRange - this.Lo.ErrorRange),
          0,
          1,
        )),
        (s = this.Lo.DefaultBrightness || 0),
        this.Lo.FinalColor
          ? ((a =
              MathCommon_1.MathCommon.Lerp(
                s * this.Lo.FinalColor.R,
                this.Lo.FinalColor.R,
                1 - e,
              ) / 255),
            (h =
              MathCommon_1.MathCommon.Lerp(
                s * this.Lo.FinalColor.G,
                this.Lo.FinalColor.G,
                1 - e,
              ) / 255),
            (r =
              MathCommon_1.MathCommon.Lerp(
                s * this.Lo.FinalColor.B,
                this.Lo.FinalColor.B,
                1 - e,
              ) / 255),
            (o = MathCommon_1.MathCommon.Lerp(
              s * this.Lo.FinalColor.A,
              this.Lo.FinalColor.A,
              1 - e,
            )),
            this.n$t.UpdateInteractionMaterialColorParam(
              EMISSION_PARAM_NAME,
              a,
              h,
              r,
              o,
            ))
          : ((a = MathCommon_1.MathCommon.Lerp(s, 1, 1 - e)),
            this.n$t.UpdateInteractionMaterialColorParam(
              EMISSION_PARAM_NAME,
              a,
              a,
              a,
            ))),
      i > this.Lo.ErrorRange)
        ? (this.DGn = 0)
        : ((this.DGn += t),
          (!this.Lo.FixationTime ||
            this.DGn >=
              this.Lo.FixationTime * CommonDefine_1.MILLIONSECOND_PER_SECOND) &&
            (this.SubmitNode(), (this.r$t = !0))));
  }
}
exports.ParallaxBehaviorNode = ParallaxBehaviorNode;
//# sourceMappingURL=ParallaxBehaviorNode.js.map
