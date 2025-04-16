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
      (this.fDa = void 0),
      (this.pDa = void 0),
      (this.ABo = (i) => {
        this.fDa.Start(), this.pDa(this.sEe, i, !1), this.fDa.Stop();
      }),
      (this.BDa = (i) => {
        this.fDa.Start(), this.pDa(this.sEe, i, !0), this.fDa.Stop();
      });
  }
  Initialize(i) {
    (this.R$e = i),
      (this.fDa = Stats_1.Stat.Create(
        "TsPureAxisHandle.OnInputAxis",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      ));
  }
  Reset() {
    (this.R$e = void 0), (this.sEe = void 0), (this.pDa = void 0);
  }
  AddAxisBinding(i, t) {
    t
      ? ((this.sEe = i),
        (this.pDa = t),
        TsPureAxisHandle.bDa.includes(i)
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
              this.BDa,
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Controller", 10, "添加Axis输入绑定时，回调不存在", [
          "axisName",
          i,
        ]);
  }
}
(exports.TsPureAxisHandle = TsPureAxisHandle).bDa = [
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
