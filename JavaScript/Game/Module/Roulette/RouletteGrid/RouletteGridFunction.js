"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridFunction = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RouletteController_1 = require("../RouletteController"),
  RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridFunction extends RouletteGridBase_1.RouletteGridBase {
  Init() {
    let e = !1;
    var t;
    this.IsDataValid() &&
      ((t = ModelManager_1.ModelManager.RouletteModel.UnlockFunctionDataMap.get(
        this.Data.Id,
      )) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            38,
            "[FuncMenuWheel]功能轮盘功能格子对应FuncId不存在或未解锁",
            ["FuncId", this.Data.Id],
          )),
      (this.Data.Name = t.FuncName),
      t.FuncMenuIconPath.includes("Atlas")
        ? ((this.IsIconTexture = !1), this.LoadSpriteIcon(t.FuncMenuIconPath))
        : ((this.IsIconTexture = !0), this.LoadTextureIcon(t.FuncMenuIconPath)),
      this.Data.ShowRedDot) &&
      void 0 !== t.UnlockCondition &&
      (t = ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(
        t.UnlockCondition,
      )) &&
      ((e = !0), this.BindRedDot(t)),
      e || this.SetRedDotVisible(!1),
      1 === this.Data.State && this.IsForbiddenState() && (this.Data.State = 0);
  }
  IsForbiddenState() {
    return !1;
  }
  OnSelect(e) {
    e &&
      this.IsDataValid() &&
      RouletteController_1.RouletteController.FunctionOpenRequest(this.Data.Id);
  }
}
exports.RouletteGridFunction = RouletteGridFunction;
//# sourceMappingURL=RouletteGridFunction.js.map
