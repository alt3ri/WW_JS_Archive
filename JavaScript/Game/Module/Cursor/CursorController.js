"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CursorController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class CursorController extends UiControllerBase_1.UiControllerBase {
  static Init() {
    return super.Init(), !0;
  }
  static DOt(o) {
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
      ModelManager_1.ModelManager.PlatformModel.IsPc())
    ) {
      let o = void 0,
        r = void 0,
        e = void 0;
      e = Info_1.Info.IsPlayInEditor
        ? ((o = FNameUtil_1.FNameUtil.GetDynamicFName(
            "Aki/UI/Module/Cursor/SourceResource/CursorNor",
          )),
          (r = FNameUtil_1.FNameUtil.GetDynamicFName(
            "Aki/UI/Module/Cursor/SourceResource/CursorHi",
          )),
          FNameUtil_1.FNameUtil.GetDynamicFName(
            "Aki/UI/Module/Cursor/SourceResource/CursorPre",
          ))
        : ((o = FNameUtil_1.FNameUtil.GetDynamicFName("Aki/Cursor/CursorNor")),
          (r = FNameUtil_1.FNameUtil.GetDynamicFName("Aki/Cursor/CursorHi")),
          FNameUtil_1.FNameUtil.GetDynamicFName("Aki/Cursor/CursorPre"));
      var i = new UE.Vector2D(0, 0),
        s = GlobalData_1.GlobalData.World.GetWorld();
      UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 1, o, i),
        UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 16, r, i),
        UE.WidgetBlueprintLibrary.SetHardwareCursor(s, 15, e, i);
    }
  }
}
(exports.CursorController = CursorController).CursorEnterExit = (o) => {
  CursorController.DOt(o);
};
//# sourceMappingURL=CursorController.js.map
