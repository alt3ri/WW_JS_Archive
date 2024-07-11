"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharRenderShell = void 0);
const cpp_1 = require("cpp"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
class CharRenderShell {
  constructor() {
    this.RenderingComponent = void 0;
  }
  Init(e) {
    this.RenderingComponent = e;
  }
  Tick(r) {
    if (
      this.RenderingComponent &&
      (!TickSystem_1.TickSystem.IsPaused ||
        5 === this.RenderingComponent.RenderType ||
        0 < this.RenderingComponent.IsUiUpdate)
    ) {
      let e = 0;
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (e = cpp_1.KuroTime.GetMilliseconds64()),
        this.RenderingComponent.Tick(r),
        PerformanceController_1.PerformanceController
          .IsEntityTickPerformanceTest &&
          (r = this.RenderingComponent.GetOwner()) instanceof
            TsBaseCharacter_1.default &&
          PerformanceController_1.PerformanceController.CollectComponentTickPerformanceInfo(
            r.EntityId,
            "CharRenderingComponent",
            !0,
            cpp_1.KuroTime.GetMilliseconds64() - e,
          );
    }
  }
}
exports.CharRenderShell = CharRenderShell;
//# sourceMappingURL=CharRenderShell.js.map
