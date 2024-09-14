"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CursorController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class CursorController extends UiControllerBase_1.UiControllerBase {
  static Init() {
    return super.Init(), !0;
  }
  static Rkt(o) {
    var r = Global_1.Global.CharacterController;
    r && (r.CurrentMouseCursor = o ? 16 : 1);
  }
  static InitMouseByMousePos() {
    var o,
      r = UE.KuroStaticLibrary.GetSlateApplicationCursorPos();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiCommon",
        28,
        "InitMouseByMousePos",
        ["viewPortMousePosition.X", r.X],
        ["viewPortMousePosition.Y", r.Y],
      ),
      (0 < r.X || 0 < r.Y) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCommon", 28, "Mouse在屏幕内"),
        (o = UE.KuroStaticLibrary.GetGameViewPort()),
        UE.KuroStaticLibrary.DoGameViewPortMouseEnter(o, r.X, r.Y));
  }
  static SetWindowCursorStyle() {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("UiCommon", 28, "SetWindowCursorStyle"),
      Info_1.Info.IsInKeyBoard())
    ) {
      let o = "";
      o = Info_1.Info.IsPlayInEditor
        ? "Aki/UI/Module/Cursor/SourceResource"
        : "Aki/Cursor";
      var r = FNameUtil_1.FNameUtil.GetDynamicFName(o + "/CursorNor"),
        e = FNameUtil_1.FNameUtil.GetDynamicFName(o + "/CursorHi"),
        t = FNameUtil_1.FNameUtil.GetDynamicFName(o + "/CursorPre"),
        l = new UE.Vector2D(0, 0),
        s = GlobalData_1.GlobalData.World.GetWorld(),
        r =
          (UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 1, r, l),
          UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 16, e, l),
          UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 15, t, l),
          `${UE.BlueprintPathsLibrary.ProjectContentDir()}/${o}/CursorNor.png`);
      ControllerHolder_1.ControllerHolder.KuroSdkController.SetCursor(r);
    }
  }
}
(exports.CursorController = CursorController).CursorEnterExit = (o) => {
  CursorController.Rkt(o);
};
//# sourceMappingURL=CursorController.js.map
