"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicSupportController = void 0);
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
  BulletLogicController_1 = require("./BulletLogicController"),
  PROFILE_KEY = "BulletLogicSupportController_GetHitPointTransform",
  DRAW_TIME = 5;
class BulletLogicSupportController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.uoe = void 0), (this.Q7o = void 0), (this.X7o = void 0);
  }
  OnInit() {
    this.koe(),
      this.Bullet.GetBulletInfo().BulletDataMain.Execution.SupportCamp.push(
        this.LogicController.Camp,
      );
  }
  koe() {
    (this.Q7o = new UE.Transform()),
      (this.X7o = Vector_1.Vector.Create(0, 0, 0)),
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.uoe.bIsSingle = !0),
      (this.uoe.bIgnoreSelf = !0),
      this.uoe.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Bullet),
      (this.uoe.DrawTime = DRAW_TIME),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.uoe,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.uoe,
        ColorUtils_1.ColorUtils.LinearRed,
      );
  }
  BulletLogicAction(t) {
    var e = t.GetBulletInfo();
    e.AttackerCamp !== this.LogicController.Camp ||
      e.HasTag(this.LogicController.Tag) ||
      (e.AddTag(this.LogicController.Tag),
      ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(
        this.LogicController.Effect,
      ) &&
        ((t = this.$7o(t)),
        BulletStaticFunction_1.BulletStaticFunction.PlayBulletEffect(
          GlobalData_1.GlobalData.World,
          this.LogicController.Effect.ToAssetPathName(),
          t,
          this.Bullet.GetBulletInfo(),
          "[BulletLogicSupportController.BulletLogicAction] " + e.BulletRowName,
        )));
  }
  $7o(t) {
    var e = this.Bullet.GetComponent(155),
      i = t.GetComponent(155).Owner,
      t = UE.KismetMathLibrary.TransformLocation(
        i.GetTransform(),
        t.Data.Base.CenterOffset.ToUeVector(),
      ),
      o = UE.KismetMathLibrary.TransformLocation(
        e.ActorTransform,
        this.Bullet.Data.Base.CenterOffset.ToUeVector(),
      );
    this.uoe || this.koe(),
      (this.uoe.WorldContextObject = i),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, o);
    let r = this.Q7o;
    (t = TraceElementCommon_1.TraceElementCommon.LineTrace(
      this.uoe,
      PROFILE_KEY,
    )),
      (o = this.uoe.HitResult);
    return (
      t && o.bBlockingHit
        ? (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            o,
            0,
            this.X7o,
          ),
          r.SetRotation(e.ActorRotation.Quaternion()),
          r.SetTranslation(this.X7o.ToUeVector()),
          r.SetScale3D(Vector_1.Vector.OneVector))
        : (r = i.GetTransform()),
      (this.uoe.WorldContextObject = void 0),
      r
    );
  }
}
exports.BulletLogicSupportController = BulletLogicSupportController;
//# sourceMappingURL=BulletLogicSupportController.js.map
