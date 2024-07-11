"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsAiController_1 = require("../../Controller/TsAiController");
const MAX_ERROR = 10;
class TsDecoratorBlackboardDistanceCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.CompareType = 0),
      (this.OtherLocationKey = ""),
      (this.CompareValue = 0),
      (this.LocationCache = void 0),
      (this.OtherLocationCache = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsCompareType = 0),
      (this.TsOtherLocationKey = ""),
      (this.TsCompareValue = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsCompareType = this.CompareType),
      (this.TsOtherLocationKey = this.OtherLocationKey),
      (this.TsCompareValue = this.CompareValue));
  }
  PerformConditionCheckAI(r, t) {
    if (!(r instanceof TsAiController_1.default))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1
      );
    let e = r.GetEntity();
    if (!e) return !1;
    this.InitTsVariables();
    const o = r.AiController.CharActorComp;
    if (
      (this.LocationCache || (this.LocationCache = Vector_1.Vector.Create()),
      this.LocationCache.DeepCopy(o.ActorLocationProxy),
      this.OtherLocationCache ||
        (this.OtherLocationCache = Vector_1.Vector.Create()),
      this.TsOtherLocationKey)
    ) {
      e = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
        e.Id,
        this.TsOtherLocationKey,
      );
      if (!e)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 30, "不存在BlackboardKey", [
              "Key",
              this.TsOtherLocationKey,
            ]),
          !1
        );
      this.OtherLocationCache.DeepCopy(e);
    } else {
      e = o.CreatureData.GetInitLocation();
      if (!e) return !1;
      this.OtherLocationCache.DeepCopy(e);
    }
    if (!this.LocationCache || !this.OtherLocationCache) return !1;
    const i = Vector_1.Vector.DistSquared(
      this.LocationCache,
      this.OtherLocationCache,
    );
    const s = this.TsCompareValue * this.TsCompareValue;
    switch (this.TsCompareType) {
      case 0:
        return Math.abs(i - s) <= MAX_ERROR;
      case 1:
        return Math.abs(i - s) > MAX_ERROR;
      case 2:
        return i < s;
      case 3:
        return i <= s;
      case 4:
        return s < i;
      case 5:
        return s <= i;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 30, "不支持的比较类型", [
              "Type",
              r.GetClass().GetName(),
            ]),
          !1
        );
    }
  }
}
exports.default = TsDecoratorBlackboardDistanceCompare;
// # sourceMappingURL=TsDecoratorBlackboardDistanceCompare.js.map
