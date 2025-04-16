"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitPositionUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../Ui/UiLayer");
class HudUnitPositionUtil {
  constructor() {
    this.S$e = (0, puerts_1.$ref)(void 0);
  }
  ProjectWorldToScreen(e, o) {
    return (
      !!UE.GameplayStatics.D_ProjectWorldToScreen(
        Global_1.Global.CharacterController,
        e,
        this.S$e,
      ) &&
      ((e = (0, puerts_1.$unref)(this.S$e)),
      o.Set(e.X, e.Y),
      (e = ModelManager_1.ModelManager.BattleUiModel),
      o
        .MultiplyEqual(e.ScreenPositionScale)
        .AdditionEqual(e.ScreenPositionOffset),
      (o.Y = -o.Y),
      !0)
    );
  }
  LogViewPortInfo() {
    var e = UiLayer_1.UiLayer.UiRootItem,
      e =
        (e &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "HudUnit",
            17,
            "UiRootItem大小",
            ["W", e.GetWidth()],
            ["H", e.GetHeight()],
          ),
        ModelManager_1.ModelManager.BattleUiModel);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("HudUnit", 17, "缓存的ViewPortSize", [
        "",
        e.ViewportSize,
      ]),
      e.UpdateViewPortSize(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("HudUnit", 17, "更新后的ViewPortSize", [
          "",
          e.ViewportSize,
        ]);
  }
}
exports.HudUnitPositionUtil = HudUnitPositionUtil;
//# sourceMappingURL=HudUnitPositionUtil.js.map
