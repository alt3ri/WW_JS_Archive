"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskBlackBoardSetValues extends TsTaskAbortImmediatelyBase_1.default {
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
      (this.TsVectorMap = void 0);
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsStringMap = new Map()),
        (this.TsFloatMap = new Map()),
        (this.TsIntMap = new Map()),
        (this.TsBooleanMap = new Map()),
        (this.TsVectorMap = new Map());
      for (let t = 0, o = this.StringMap.Num(); t < o; t++) {
        const s = this.StringMap.GetKey(t);
        const e = this.StringMap.Get(s);
        this.TsStringMap.set(s, e);
      }
      for (let t = 0, o = this.FloatMap.Num(); t < o; t++) {
        const r = this.FloatMap.GetKey(t);
        const i = this.FloatMap.Get(r);
        this.TsFloatMap.set(r, i);
      }
      for (let t = 0, o = this.IntMap.Num(); t < o; t++) {
        const a = this.IntMap.GetKey(t);
        const h = this.IntMap.Get(a);
        this.TsIntMap.set(a, h);
      }
      for (let t = 0, o = this.BooleanMap.Num(); t < o; t++) {
        const l = this.BooleanMap.GetKey(t);
        const c = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, c);
      }
      for (let t = 0, o = this.VectorMap.Num(); t < o; t++) {
        const d = this.VectorMap.GetKey(t);
        var v = this.VectorMap.Get(d);
        var v = Vector_1.Vector.Create(v);
        this.TsVectorMap.set(d, v);
      }
    }
  }
  ReceiveExecuteAI(t, o) {
    let s = t.AiController;
    s
      ? (this.InitTsVariables(),
        (s = s.CharActorComp.Entity.Id),
        this.ExecuteStringMap(s),
        this.ExecuteFloatMap(s),
        this.ExecuteIntMap(s),
        this.ExecuteBooleanMap(s),
        this.ExecuteVectorMap(s),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ExecuteStringMap(t) {
    for (const [o, s] of this.TsStringMap)
      BlackboardController_1.BlackboardController.SetStringValueByEntity(
        t,
        o,
        s,
      );
  }
  ExecuteFloatMap(t) {
    for (const [o, s] of this.TsFloatMap)
      BlackboardController_1.BlackboardController.SetFloatValueByEntity(
        t,
        o,
        s,
      );
  }
  ExecuteIntMap(t) {
    for (const [o, s] of this.TsIntMap)
      BlackboardController_1.BlackboardController.SetIntValueByEntity(t, o, s);
  }
  ExecuteBooleanMap(t) {
    for (const [o, s] of this.TsBooleanMap)
      BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
        t,
        o,
        s,
      );
  }
  ExecuteVectorMap(t) {
    for (const [o, s] of this.TsVectorMap)
      BlackboardController_1.BlackboardController.SetVectorValueByEntity(
        t,
        o,
        s.X,
        s.Y,
        s.Z,
      );
  }
}
exports.default = TsTaskBlackBoardSetValues;
// # sourceMappingURL=TsTaskBlackBoardSetValues.js.map
