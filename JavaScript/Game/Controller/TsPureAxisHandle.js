"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPureAxisHandle = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  StatDefine_1 = require("../Common/StatDefine"),
  InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
class TsPureAxisHandle {
  constructor() {
    (this.R$e = void 0),
      (this.sEe = void 0),
      (this.Fya = void 0),
      (this.Vya = void 0),
      (this.ABo = (i) => {
        this.Vya(this.sEe, i, !1);
      }),
      (this.dIa = (i) => {
        this.Vya(this.sEe, i, !0);
      });
  }
  Initialize(i) {
    (this.R$e = i), (this.Fya = void 0);
  }
  Reset() {
    (this.R$e = void 0), (this.sEe = void 0), (this.Vya = void 0);
  }
  AddAxisBinding(i, e) {
    e
      ? ((this.sEe = i),
        (this.Vya = e),
        TsPureAxisHandle.CIa.includes(i)
          ? cpp_1.FKuroInputInterface.RegisterAxisBinding(
              FNameUtil_1.FNameUtil.GetDynamicFName(i),
              this.R$e,
              this,
              this.ABo,
            )
          : cpp_1.FKuroInputInterface.RegisterAxisBinding(
              FNameUtil_1.FNameUtil.GetDynamicFName(i),
              this.R$e,
              this,
              this.dIa,
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Controller", 8, "添加Axis输入绑定时，回调不存在", [
          "axisName",
          i,
        ]);
  }
}
(exports.TsPureAxisHandle = TsPureAxisHandle).CIa = [
  InputMappingsDefine_1.axisMappings.LookUp,
  InputMappingsDefine_1.axisMappings.LookUpRate,
  InputMappingsDefine_1.axisMappings.MoveForward,
  InputMappingsDefine_1.axisMappings.MoveRight,
  InputMappingsDefine_1.axisMappings.Turn,
  InputMappingsDefine_1.axisMappings.Zoom,
  InputMappingsDefine_1.axisMappings.MouseMove,
  InputMappingsDefine_1.axisMappings.WheelAxis,
];
//# sourceMappingURL=TsPureAxisHandle.js.map
