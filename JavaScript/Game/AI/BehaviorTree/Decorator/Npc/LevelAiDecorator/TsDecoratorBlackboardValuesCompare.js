"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../../GlobalData"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
class TsDecoratorBlackboardValuesCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.StringMap = void 0),
      (this.FloatMap = void 0),
      (this.IntMap = void 0),
      (this.BooleanMap = void 0),
      (this.VectorMap = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsStringMap = void 0),
      (this.TsFloatMap = void 0),
      (this.TsIntMap = void 0),
      (this.TsBooleanMap = void 0),
      (this.TsVectorMap = void 0),
      (this.EntityId = void 0),
      (this.TmpVector = void 0);
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsStringMap = new Map()),
        (this.TsFloatMap = new Map()),
        (this.TsIntMap = new Map()),
        (this.TsBooleanMap = new Map()),
        (this.TsVectorMap = new Map()),
        (this.TmpVector = Vector_1.Vector.Create());
      for (let t = 0, r = this.StringMap.Num(); t < r; t++) {
        var o = this.StringMap.GetKey(t),
          i = this.StringMap.Get(o);
        this.TsStringMap.set(o, i);
      }
      for (let t = 0, r = this.FloatMap.Num(); t < r; t++) {
        var e = this.FloatMap.GetKey(t),
          s = this.FloatMap.Get(e);
        this.TsFloatMap.set(e, s);
      }
      for (let t = 0, r = this.IntMap.Num(); t < r; t++) {
        var a = this.IntMap.GetKey(t),
          h = this.IntMap.Get(a);
        this.TsIntMap.set(a, h);
      }
      for (let t = 0, r = this.BooleanMap.Num(); t < r; t++) {
        var l = this.BooleanMap.GetKey(t),
          n = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, n);
      }
      for (let t = 0, r = this.VectorMap.Num(); t < r; t++) {
        var u = this.VectorMap.GetKey(t),
          c = this.VectorMap.Get(u),
          c = Vector_1.Vector.Create(c);
        this.TsVectorMap.set(u, c);
      }
    }
  }
  ExecuteStringMapCompare() {
    for (var [t, r] of this.TsStringMap)
      if (
        BlackboardController_1.BlackboardController.GetStringValueByEntity(
          this.EntityId,
          t,
        ) !== r
      )
        return !1;
    return !0;
  }
  ExecuteFloatMapCompare() {
    for (var [t, r] of this.TsFloatMap)
      if (
        BlackboardController_1.BlackboardController.GetFloatValueByEntity(
          this.EntityId,
          t,
        ) !== r
      )
        return !1;
    return !0;
  }
  ExecuteIntMapCompare() {
    for (var [t, r] of this.TsIntMap)
      if (
        BlackboardController_1.BlackboardController.GetIntValueByEntity(
          this.EntityId,
          t,
        ) !== r
      )
        return !1;
    return !0;
  }
  ExecuteBooleanMapCompare() {
    for (var [t, r] of this.TsBooleanMap)
      if (
        BlackboardController_1.BlackboardController.GetBooleanValueByEntity(
          this.EntityId,
          t,
        ) !== r
      )
        return !1;
    return !0;
  }
  ExecuteVectorMapCompare() {
    for (var [t, r] of this.TsVectorMap) {
      t = BlackboardController_1.BlackboardController.GetVectorValueByEntity(
        this.EntityId,
        t,
      );
      if (!t) return !1;
      if ((this.TmpVector.FromUeVector(t), !this.TmpVector.Equals(r)))
        return !1;
    }
    return !0;
  }
  PerformConditionCheckAI(t, r) {
    var o = t.AiController;
    return o
      ? (this.InitTsVariables(),
        (this.EntityId = o.CharActorComp.Entity.Id),
        this.ExecuteIntMapCompare() &&
          this.ExecuteStringMapCompare() &&
          this.ExecuteBooleanMapCompare() &&
          this.ExecuteFloatMapCompare() &&
          this.ExecuteVectorMapCompare())
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1);
  }
}
exports.default = TsDecoratorBlackboardValuesCompare;
//# sourceMappingURL=TsDecoratorBlackboardValuesCompare.js.map
