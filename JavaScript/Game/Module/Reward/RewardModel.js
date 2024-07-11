"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardModel = void 0);
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../GlobalData"),
  CHECK_GROUND_PROFILE_KEY = "RewardModel_CheckGroundHit",
  CHECK_WATER_PROFILE_KEY = "RewardModel_CheckWaterHit";
class RewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.vao = void 0), (this.Mao = void 0);
  }
  koe() {
    (this.vao = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.vao.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.vao.bIsSingle = !0),
      (this.vao.bIgnoreSelf = !0),
      this.vao.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
      ),
      (this.Mao = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.Mao.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Mao.bIsSingle = !0),
      (this.Mao.bIgnoreSelf = !0),
      this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  CheckGroundHit(e, t, i) {
    this.vao || this.koe(),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, e),
      this.vao.SetEndLocation(e.X, e.Y, e.Z + i),
      (this.vao.Radius = t);
    let r = !1;
    e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
      this.vao,
      CHECK_GROUND_PROFILE_KEY,
    );
    return (r = e && this.vao.HitResult.bBlockingHit ? !0 : r);
  }
  CheckWaterHit(e, t, i, r) {
    this.Mao || this.koe(),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, e),
      this.Mao.SetEndLocation(t.X, t.Y, t.Z - i);
    let s = !1;
    e = TraceElementCommon_1.TraceElementCommon.LineTrace(
      this.Mao,
      CHECK_WATER_PROFILE_KEY,
    );
    return (s = e && this.Mao.HitResult.bBlockingHit ? !0 : s);
  }
}
exports.RewardModel = RewardModel;
//# sourceMappingURL=RewardModel.js.map
