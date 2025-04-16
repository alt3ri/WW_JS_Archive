"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridFunction = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  RouletteController_1 = require("../RouletteController"),
  RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridFunction extends RouletteGridBase_1.RouletteGridBase {
  async Init() {
    let e = !1;
    if (this.IsDataValid()) {
      var t =
        ModelManager_1.ModelManager.RouletteModel.UnlockFunctionDataMap.get(
          this.Data.Id,
        );
      if (!t) return void (this.Data.Id = 0);
      (this.Data.Name = t.FuncName),
        t.FuncMenuIconPath.includes("Atlas")
          ? ((this.IsIconTexture = !1),
            await this.LoadSpriteIcon(t.FuncMenuIconPath))
          : ((this.IsIconTexture = !0),
            await this.LoadTextureIcon(t.FuncMenuIconPath)),
        this.Data.ShowRedDot &&
          void 0 !== t.UnlockCondition &&
          (t =
            ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(
              t.UnlockCondition,
            )) &&
          ((e = !0), this.BindRedDot(t));
    }
    e || this.SetRedDotVisible(!1);
  }
  OnSelect(e) {
    e &&
      this.IsDataValid() &&
      RouletteController_1.RouletteController.FunctionOpenRequest(this.Data.Id);
  }
}
exports.RouletteGridFunction = RouletteGridFunction;
//# sourceMappingURL=RouletteGridFunction.js.map
