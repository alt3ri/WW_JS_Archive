"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitPositionUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class HudUnitPositionUtil {
  constructor() {
    this.S$e = (0, puerts_1.$ref)(void 0);
  }
  ProjectWorldToScreen(e, r) {
    return (
      !!UE.GameplayStatics.ProjectWorldToScreen(
        Global_1.Global.CharacterController,
        e,
        this.S$e,
      ) &&
      ((e = (0, puerts_1.$unref)(this.S$e)),
      r.Set(e.X, e.Y),
      (e = ModelManager_1.ModelManager.BattleUiModel),
      Info_1.Info.IsPcPlatform() && e.UpdateViewPortSize(),
      r
        .MultiplyEqual(e.ScreenPositionScale)
        .AdditionEqual(e.ScreenPositionOffset),
      (r.Y = -r.Y),
      !0)
    );
  }
}
exports.HudUnitPositionUtil = HudUnitPositionUtil;
//# sourceMappingURL=HudUnitPositionUtil.js.map
