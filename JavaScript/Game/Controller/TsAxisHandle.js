"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsAxisHandle = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  StatDefine_1 = require("../Common/StatDefine");
class TsAxisHandle extends UE.Object {
  constructor() {
    super(...arguments),
      (this.PlayerController = void 0),
      (this.AxisName = void 0),
      (this.OnInputStat = void 0),
      (this.OnInputAxisCallback = void 0);
  }
  Initialize(i) {
    (this.PlayerController = i), (this.OnInputStat = void 0);
  }
  Reset() {
    (this.PlayerController = void 0),
      (this.AxisName = void 0),
      (this.OnInputAxisCallback = void 0);
  }
  AddAxisBinding(i, s) {
    s
      ? ((this.AxisName = i),
        (this.OnInputAxisCallback = s),
        this.PlayerController.AddAxisBinding(
          FNameUtil_1.FNameUtil.GetDynamicFName(i),
          this,
          new UE.FName(this.OnInputAxis.name),
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Controller", 8, "添加Axis输入绑定时，回调不存在", [
          "axisName",
          i,
        ]);
  }
  OnInputAxis(i) {
    this.OnInputAxisCallback(this.AxisName, i);
  }
}
(exports.TsAxisHandle = TsAxisHandle), (exports.default = TsAxisHandle);
//# sourceMappingURL=TsAxisHandle.js.map
