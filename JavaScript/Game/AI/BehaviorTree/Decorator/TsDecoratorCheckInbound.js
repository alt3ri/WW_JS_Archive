"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../GlobalData");
const TsAiController_1 = require("../../Controller/TsAiController");
const PROFILE_KEY = "TsDecoratorCheckInbound";
const MIN_CEHCK_TIME_INTERVAL = 200;
class TsDecoratorCheckInbound extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.SocketHeight = void 0),
      (this.IsInitTsVariables = !1),
      (this.SocketHeightInternal = void 0),
      (this.TsTraceElement = void 0),
      (this.LastCheckResult = !1),
      (this.LastCheckTimeStamp = -0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.LastCheckResult = !0),
      (this.LastCheckTimeStamp = 0),
      this.InitData());
  }
  PerformConditionCheckAI(e, t) {
    if (!(e instanceof TsAiController_1.default))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        !1
      );
    if (
      (this.InitTsVariables(),
      this.InitTraceElement(),
      Time_1.Time.WorldTime < this.LastCheckTimeStamp + MIN_CEHCK_TIME_INTERVAL)
    )
      return this.LastCheckResult;
    this.LastCheckTimeStamp = Time_1.Time.WorldTime;
    let r;
    let i;
    const o = e.AiController.CharActorComp.SkeletalMesh;
    const s = Vector_1.Vector.Create();
    let n = !0;
    for ([r, i] of this.SocketHeightInternal)
      s.FromUeVector(
        o.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(r)),
      ),
        (n = n && this.CheckInbound(s, i));
    return (this.LastCheckResult = n);
  }
  InitTraceElement() {
    this.TsTraceElement ||
      ((this.TsTraceElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.TsTraceElement.bIsSingle = !0),
      (this.TsTraceElement.bIgnoreSelf = !0),
      this.TsTraceElement.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
      )),
      (this.TsTraceElement.WorldContextObject = this.GetWorld());
  }
  InitData() {
    if (!this.SocketHeightInternal) {
      this.SocketHeightInternal = new Map();
      const t = this.SocketHeight.Num();
      if (t > 0)
        for (let e = 0; e < t; e++) {
          const r = this.SocketHeight.GetKey(e);
          const i = this.SocketHeight.Get(r);
          this.SocketHeightInternal.set(r, i);
        }
    }
  }
  CheckInbound(e, t) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(
      this.TsTraceElement,
      e,
    );
    const r = Vector_1.Vector.Create();
    var t =
      (Vector_1.Vector.DownVectorProxy.Multiply(t, r),
      r.AdditionEqual(e),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.TsTraceElement,
        r,
      ),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        this.TsTraceElement,
        PROFILE_KEY,
      ));
    return !(!t || !this.TsTraceElement.HitResult.bBlockingHit);
  }
}
exports.default = TsDecoratorCheckInbound;
// # sourceMappingURL=TsDecoratorCheckInbound.js.map
