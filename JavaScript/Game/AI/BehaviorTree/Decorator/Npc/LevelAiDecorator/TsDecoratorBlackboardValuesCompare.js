"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../../../GlobalData");
const BlackboardController_1 = require("../../../../../World/Controller/BlackboardController");
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
        const o = this.StringMap.GetKey(t);
        const i = this.StringMap.Get(o);
        this.TsStringMap.set(o, i);
      }
      for (let t = 0, r = this.FloatMap.Num(); t < r; t++) {
        const e = this.FloatMap.GetKey(t);
        const s = this.FloatMap.Get(e);
        this.TsFloatMap.set(e, s);
      }
      for (let t = 0, r = this.IntMap.Num(); t < r; t++) {
        const a = this.IntMap.GetKey(t);
        const h = this.IntMap.Get(a);
        this.TsIntMap.set(a, h);
      }
      for (let t = 0, r = this.BooleanMap.Num(); t < r; t++) {
        const l = this.BooleanMap.GetKey(t);
        const n = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, n);
      }
      for (let t = 0, r = this.VectorMap.Num(); t < r; t++) {
        const u = this.VectorMap.GetKey(t);
        var c = this.VectorMap.Get(u);
        var c = Vector_1.Vector.Create(c);
        this.TsVectorMap.set(u, c);
      }
    }
  }
  ExecuteStringMapCompare() {
    for (const [t, r] of this.TsStringMap)
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
    for (const [t, r] of this.TsFloatMap)
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
    for (const [t, r] of this.TsIntMap)
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
    for (const [t, r] of this.TsBooleanMap)
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
    for (let [t, r] of this.TsVectorMap) {
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
    const o = t.AiController;
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
// # sourceMappingURL=TsDecoratorBlackboardValuesCompare.js.map
