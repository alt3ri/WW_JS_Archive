"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleInteractTmpValue = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const WorldModel_1 = require("../../../World/Model/WorldModel");
const CHECK_DRAW_PERIODIC = 0.45;
const CHECK_DRAW_THREADHOLD = 25e6;
class SimpleInteractTmpValue {}
exports.SimpleInteractTmpValue = SimpleInteractTmpValue;
class TsSimpleInteractBase extends UE.KuroEffectActor {
  constructor() {
    super(...arguments),
      (this.TypeId = 0),
      (this.Text = void 0),
      (this.CheckDrawTime = -0),
      (this.LastCheckDrawResult = !1),
      (this.IsLegal = !1),
      (this.SelfTransform = void 0),
      (this.SelfLocation = void 0),
      (this.TmpResult = void 0),
      (this.ActorLocation = void 0),
      (this.SelfToActor = void 0),
      (this.MoveOffset = void 0),
      (this.TmpVector1 = void 0),
      (this.TmpVector2 = void 0),
      (this.TmpVector3 = void 0),
      (this.TmpVector4 = void 0),
      (this.LineTrace = void 0);
  }
  ReceiveBeginPlay() {
    this.OnBeginPlay();
  }
  OnBeginPlay() {
    WorldModel_1.WorldModel.AddTsSimpleInteractItem(this),
      (this.SelfTransform = Transform_1.Transform.Create()),
      (this.SelfLocation = Vector_1.Vector.Create()),
      (this.TmpResult = new UE.SSimpleInteractResult()),
      (this.ActorLocation = Vector_1.Vector.Create()),
      (this.SelfToActor = Vector_1.Vector.Create()),
      (this.MoveOffset = Vector_1.Vector.Create()),
      (this.TmpVector1 = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpVector3 = Vector_1.Vector.Create()),
      (this.TmpVector4 = Vector_1.Vector.Create()),
      this.Text.SetHiddenInGame(!0),
      this.Text.SetComponentTickEnabled(!1),
      this.InitTraceInfo(),
      this.UpdateData();
  }
  UpdateData() {
    this.SelfTransform.FromUeTransform(this.GetTransform()),
      this.SelfLocation.DeepCopy(this.SelfTransform.GetLocation());
  }
  InitTraceInfo() {
    (this.LineTrace = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.LineTrace.bIsSingle = !0),
      (this.LineTrace.bIgnoreSelf = !0),
      this.LineTrace.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
      );
  }
  ReceiveEndPlay() {
    WorldModel_1.WorldModel.RemoveTsSimpleInteractItem(this);
  }
  EditorInit() {
    super.EditorInit(), (this.bEditorTickBySelected = !1);
  }
  EditorTick(t) {
    this.CheckDraw(t) && this.OnDraw();
  }
  GetBestTransform(t, i, e, s) {
    return this.OnGetBestTransform(t, i, e, s);
  }
  OnGetBestTransform(t, i, e, s) {
    return (this.TmpResult.Success = !1), this.TmpResult;
  }
  CheckDraw(t) {
    let i;
    return (
      this.CheckDrawTime || (this.CheckDrawTime = 0),
      (this.CheckDrawTime -= t),
      this.CheckDrawTime < 0 &&
        ((this.CheckDrawTime = CHECK_DRAW_PERIODIC),
        (t = (0, puerts_1.$ref)(void 0)),
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelEditorCameraLocationAndForward(
          this,
          t,
          void 0,
        ),
        (i = this.K2_GetActorLocation()),
        ((t = (0, puerts_1.$unref)(t)).X -= i.X),
        (t.Y -= i.Y),
        (t.Z -= i.Z),
        (this.LastCheckDrawResult = t.SizeSquared() < CHECK_DRAW_THREADHOLD),
        (this.IsLegal = this.CheckLegal()),
        this.SetText(t)),
      this.LastCheckDrawResult
    );
  }
  CheckLegal() {
    return !1;
  }
  Draw() {
    this.OnDraw();
  }
  OnDraw() {}
  SetText(t) {}
}
exports.default = TsSimpleInteractBase;
// # sourceMappingURL=TsSimpleInteractBase.js.map
