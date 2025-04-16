"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
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
  Constructor() {
    super.Constructor(),
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
      for (let t = 0, i = this.StringMap.Num(); t < i; t++) {
        var s = this.StringMap.GetKey(t),
          e = this.StringMap.Get(s);
        this.TsStringMap.set(s, e);
      }
      for (let t = 0, i = this.FloatMap.Num(); t < i; t++) {
        var o = this.FloatMap.GetKey(t),
          r = this.FloatMap.Get(o);
        this.TsFloatMap.set(o, r);
      }
      for (let t = 0, i = this.IntMap.Num(); t < i; t++) {
        var h = this.IntMap.GetKey(t),
          a = this.IntMap.Get(h);
        this.TsIntMap.set(h, a);
      }
      for (let t = 0, i = this.BooleanMap.Num(); t < i; t++) {
        var l = this.BooleanMap.GetKey(t),
          d = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, d);
      }
      for (let t = 0, i = this.VectorMap.Num(); t < i; t++) {
        var v = this.VectorMap.GetKey(t),
          n = this.VectorMap.Get(v),
          n = Vector_1.Vector.Create(n);
        this.TsVectorMap.set(v, n);
      }
    }
  }
  ReceiveExecuteAI(t, i) {
    var s = t.AiController;
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
    for (var [i, s] of this.TsStringMap)
      ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(
        t,
        i,
        s,
      );
  }
  ExecuteFloatMap(t) {
    for (var [i, s] of this.TsFloatMap)
      ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(
        t,
        i,
        s,
      );
  }
  ExecuteIntMap(t) {
    for (var [i, s] of this.TsIntMap)
      ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
        t,
        i,
        s,
      );
  }
  ExecuteBooleanMap(t) {
    for (var [i, s] of this.TsBooleanMap)
      ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
        t,
        i,
        s,
      );
  }
  ExecuteVectorMap(t) {
    for (var [i, s] of this.TsVectorMap)
      ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
        t,
        i,
        s.X,
        s.Y,
        s.Z,
      );
  }
}
exports.default = TsTaskBlackBoardSetValues;
//# sourceMappingURL=TsTaskBlackBoardSetValues.js.map
