"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
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
  Constructor() {
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
        var i = this.StringMap.GetKey(t),
          o = this.StringMap.Get(i);
        this.TsStringMap.set(i, o);
      }
      for (let t = 0, r = this.FloatMap.Num(); t < r; t++) {
        var e = this.FloatMap.GetKey(t),
          s = this.FloatMap.Get(e);
        this.TsFloatMap.set(e, s);
      }
      for (let t = 0, r = this.IntMap.Num(); t < r; t++) {
        var h = this.IntMap.GetKey(t),
          a = this.IntMap.Get(h);
        this.TsIntMap.set(h, a);
      }
      for (let t = 0, r = this.BooleanMap.Num(); t < r; t++) {
        var l = this.BooleanMap.GetKey(t),
          n = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, n);
      }
      for (let t = 0, r = this.VectorMap.Num(); t < r; t++) {
        var v = this.VectorMap.GetKey(t),
          d = this.VectorMap.Get(v),
          d = Vector_1.Vector.Create(d);
        this.TsVectorMap.set(v, d);
      }
    }
  }
  ExecuteStringMapCompare() {
    for (var [t, r] of this.TsStringMap)
      if (
        ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(
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
        ControllerHolder_1.ControllerHolder.BlackboardController.GetFloatValueByEntity(
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
        ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
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
        ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(
          this.EntityId,
          t,
        ) !== r
      )
        return !1;
    return !0;
  }
  ExecuteVectorMapCompare() {
    for (var [t, r] of this.TsVectorMap) {
      t =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
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
    var i = t.AiController;
    return i
      ? (this.InitTsVariables(),
        (this.EntityId = i.CharActorComp.Entity.Id),
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
