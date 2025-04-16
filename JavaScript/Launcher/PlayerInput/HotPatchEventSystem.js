"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatchEventSystem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  InputDevice_1 = require("../InputDevice/InputDevice"),
  LauncherResourceLib_1 = require("../Util/LauncherResourceLib"),
  HotPatchInputManager_1 = require("./HotPatchInputManager"),
  GAMEPAD_ID = 999;
class HotPatchEventSystem {
  static rqa() {
    this.Ryr = this.Lyr.GetComponentByClass(
      UE.LGUI_StandaloneInputModule.StaticClass(),
    );
    var t = (0, puerts_1.toManualReleaseDelegate)(HotPatchEventSystem.oqa);
    this.lBo = this.Ryr.RegisterInputChangeEvent(t);
  }
  static nqa() {
    this.Ryr.UnregisterInputChangeEvent(this.lBo),
      (0, puerts_1.releaseManualReleaseDelegate)(HotPatchEventSystem.oqa),
      (this.lBo = void 0);
  }
  static sqa() {
    InputDevice_1.InputDevice.IsInTouch()
      ? (this.Dyr = this.Uyr)
      : ((this.Dyr = this.Ryr), this.aqa()),
      this.Dyr.Activate(!1);
  }
  static aqa() {
    var t = new UE.Vector2D(0, 0),
      e = this.RSr;
    let i = void 0,
      s = void 0,
      o = void 0;
    (o = UE.KuroStaticLibrary.IsEditor(e)
      ? ((i = new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorNor")),
        (s = new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorHi")),
        new UE.FName("Aki/UI/Module/Cursor/SourceResource/CursorPre"))
      : ((i = new UE.FName("Aki/Cursor/CursorNor")),
        (s = new UE.FName("Aki/Cursor/CursorHi")),
        new UE.FName("Aki/Cursor/CursorPre"))),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(e, 1, i, t),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(e, 16, s, t),
      UE.WidgetBlueprintLibrary.SetHardwareCursor(e, 15, o, t);
  }
  static cUa() {
    HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
      "UI左键点击",
      this.nUa,
    ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterOnTouchAction(
        this.aUa,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterOnTouchMovedAction(
        this.hUa,
      );
  }
  static mUa() {
    HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
      "UI左键点击",
      this.nUa,
    ),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterOnTouchAction(),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterOnTouchMovedAction();
  }
  static async InitRuntimeEventSystemActor(i) {
    this.RSr = i;
    const s = new UE.Transform();
    await new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        "/Game/Aki/UI/Module/HotFix/HotFixLGUIEventSystemActor.HotFixLGUIEventSystemActor_C",
        UE.Class,
        (t) => {
          t = UE.GameplayStatics.BeginSpawningActorFromClass(i, t, s);
          UE.GameplayStatics.FinishSpawningActor(t, s),
            t.AddComponentByClass(
              UE.LGUI_StandaloneInputModule.StaticClass(),
              !1,
              s,
              !1,
            ),
            t.AddComponentByClass(
              UE.LGUI_TouchInputModule.StaticClass(),
              !1,
              s,
              !1,
            ),
            (this.Lyr = t),
            e();
        },
      );
    }),
      this.rqa(),
      (this.Uyr = this.Lyr.GetComponentByClass(
        UE.LGUI_TouchInputModule.StaticClass(),
      )),
      (this.hqa = this.Lyr.EventSystem.defaultInputType),
      this.sqa(),
      this.cUa(),
      InputDevice_1.InputDevice.RegisterInputChangeDelegate(
        HotPatchEventSystem.lqa,
      );
  }
  static SimulationPointerDownUp(t, e) {
    return (
      this.Dyr === this.Ryr &&
      this.Ryr.SimulationPointerDownUp(GAMEPAD_ID, t, e)
    );
  }
  static SwitchToNavigationInputType() {
    this.Dyr &&
      1 !== this.hqa &&
      ((this.hqa = 1), this.Dyr.SwitchToNavigationInputType());
  }
  static Destroy() {
    InputDevice_1.InputDevice.UnRegisterInputChangeDelegate(
      HotPatchEventSystem.lqa,
    ),
      this.nqa(),
      this.mUa(),
      this.Lyr &&
        (this.Lyr.PreDestroy(),
        UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.Lyr, !0),
        UE.KismetSystemLibrary.CollectGarbage(),
        (this.Lyr = void 0)),
      (this.Dyr = void 0),
      (this.Uyr = void 0),
      (this.RSr = void 0);
  }
}
(exports.HotPatchEventSystem = HotPatchEventSystem),
  ((_a = HotPatchEventSystem).Lyr = void 0),
  (HotPatchEventSystem.RSr = void 0),
  (HotPatchEventSystem.Dyr = void 0),
  (HotPatchEventSystem.Ryr = void 0),
  (HotPatchEventSystem.Uyr = void 0),
  (HotPatchEventSystem.lBo = void 0),
  (HotPatchEventSystem.hqa = 2),
  (HotPatchEventSystem.nUa = (t) => {
    _a.Ryr.InputTrigger(t, 0);
  }),
  (HotPatchEventSystem.aUa = (t, e, i) => {
    _a.Uyr.InputTouchTrigger(t, e, i);
  }),
  (HotPatchEventSystem.hUa = (t, e) => {
    _a.Uyr.InputTouchMoved(t, e);
  }),
  (HotPatchEventSystem.lqa = () => {
    InputDevice_1.InputDevice.IsInTouch()
      ? (_a.Dyr = _a.Uyr)
      : (_a.Dyr = _a.Ryr),
      _a.Dyr.Activate();
  }),
  (HotPatchEventSystem.oqa = (t) => {
    0 === t &&
      ((_a.hqa = 0),
      InputDevice_1.InputDevice.SwitchInputControllerTypeByMouseMove());
  });
//# sourceMappingURL=HotPatchEventSystem.js.map
