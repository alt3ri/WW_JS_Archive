"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatchInputManager = void 0);
const UE = require("ue"),
  InputDevice_1 = require("../InputDevice/InputDevice"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherResourceLib_1 = require("../Util/LauncherResourceLib"),
  HotPatchEventSystem_1 = require("./HotPatchEventSystem"),
  HotPatchInputDefine_1 = require("./HotPatchInputDefine");
class HotPatchInputManager {
  static async XRa() {
    await new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        "/Game/Aki/HotPatch/TsHotFixActionHandle.TsHotFixActionHandle_C",
        UE.BlueprintGeneratedClass,
        (t, i) => {
          t
            ? this.XY.set(i, t)
            : LauncherLog_1.LauncherLog.Error(
                "预加载HotPatchInputManager类型失败",
              ),
            e();
        },
      );
    }),
      this.YRa(),
      this.zRa(),
      this.$ba();
  }
  static Xba(t, i) {
    var e = UE.InputSettings.GetInputSettings(),
      t = new UE.FName(t),
      i = new UE.FName(i),
      i = new UE.Key(i),
      t = new UE.InputActionKeyMapping(t, !1, !1, !1, !1, i);
    e.AddActionMapping(t), this.SEe.push(t);
  }
  static Yba(t, i) {
    var e = UE.InputSettings.GetInputSettings(),
      t = new UE.FName(t),
      a = new UE.FName(i[0]),
      a = new UE.Key(a),
      t = new UE.InputAxisKeyMapping(t, i[1], a);
    e.AddAxisMapping(t), this.yEe.push(t);
  }
  static ZRa() {
    for (const t of HotPatchInputDefine_1.pcInputMap) this.Xba(t[0], t[1]);
    for (const i of HotPatchInputDefine_1.gamepadActionInputMap)
      this.Xba(i[0], i[1]);
    for (const e of HotPatchInputDefine_1.gamepadAxisInputMap)
      this.Yba(e[0], e[1]);
  }
  static eUa() {
    var t = UE.InputSettings.GetInputSettings();
    for (const i of this.SEe) t?.RemoveActionMapping(i);
    for (const e of this.yEe) t?.RemoveAxisMapping(e);
  }
  static zba(t) {
    var i = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    i.OnPressActionCallback.Add(this.Jba),
      i.AddPressBinding(t, this.R$e),
      i.AddReleaseBinding(t, this.R$e),
      this.Zba.set(t, i);
  }
  static eqa(t) {
    var i = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    i.OnAxisCallback.Add(this.tqa),
      i.AddAxisBinding(t, this.R$e),
      this.iqa.set(t, i);
  }
  static YRa() {
    for (const t of HotPatchInputDefine_1.pcInputMap) this.zba(t[0]);
    for (const i of HotPatchInputDefine_1.gamepadActionInputMap) this.zba(i[0]);
    for (const e of HotPatchInputDefine_1.gamepadAxisInputMap) this.eqa(e[0]);
  }
  static zRa() {
    var t = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    t.OnTouchActionCallback.Add(this.rUa),
      t.OnTouchMovedActionCallback.Add(this.oUa),
      t.AddTouchPressBinding(this.R$e),
      t.AddTouchReleaseBinding(this.R$e),
      t.AddTouchMoveBinding(this.R$e),
      (this.rqa = t);
  }
  static $ba() {
    var t = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    t.OnAnyKeyPressCallback.Add(this.oqa),
      t.AddAnyKeyPress(
        this.R$e,
        new UE.InputChord(
          new UE.Key(new UE.FName(HotPatchInputDefine_1.ANY_KEY)),
          !1,
          !1,
          !1,
          !1,
        ),
      ),
      (this.nqa = t);
  }
  static async WaitAnyKeyPress() {
    return new Promise((t) => {
      this.NNa = () => {
        (this.NNa = void 0), t();
      };
    });
  }
  static async Init(t) {
    (this.RSr = t),
      (this.R$e = UE.GameplayStatics.GetPlayerController(t, 0)),
      this.ZRa(),
      await Promise.all([this.sqa(), this.XRa(), this.aqa()]),
      InputDevice_1.InputDevice.RegisterInputChangeDelegate(
        HotPatchInputManager.Kba,
      );
  }
  static RegisterInputAction(t, i) {
    let e = this.nUa.get(t);
    (e = e || new Set()).add(i), this.nUa.set(t, e);
  }
  static UnRegisterInputAction(t, i) {
    var e = this.nUa.get(t);
    e.delete(i) && 0 === e.size && this.nUa.delete(t);
  }
  static RegisterInputAxis(t, i) {
    let e = this.hqa.get(t);
    (e = e || new Set()).add(i), this.hqa.set(t, e);
  }
  static UnRegisterInputAxis(t, i) {
    var e = this.hqa.get(t);
    e.delete(i) && 0 === e.size && this.hqa.delete(t);
  }
  static RegisterOnTouchAction(t) {
    this.sUa = t;
  }
  static UnRegisterOnTouchAction() {
    this.sUa = void 0;
  }
  static RegisterOnTouchMovedAction(t) {
    this.aUa = t;
  }
  static UnRegisterOnTouchMovedAction() {
    this.aUa = void 0;
  }
  static Destroy() {
    InputDevice_1.InputDevice.UnRegisterInputChangeDelegate(
      HotPatchInputManager.Kba,
    ),
      this.eUa(),
      this.lqa(),
      this._qa();
    for (const t of this.Zba.values())
      t.ClearActionBinding(this.R$e), t.OnPressActionCallback.Clear();
    this.Zba.clear();
    for (const i of this.iqa.values())
      i.ClearAxisBinding(this.R$e), i.OnAxisCallback.Clear();
    this.iqa.clear(),
      this.rqa &&
        (this.rqa.OnTouchActionCallback.Clear(),
        this.rqa.OnTouchMovedActionCallback.Clear(),
        (this.rqa = void 0)),
      this.nqa && (this.nqa.ClearKeyBinding(this.R$e), (this.nqa = void 0)),
      (this.RSr = void 0),
      (this.R$e = void 0);
  }
  static async sqa() {
    await new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        "/Game/Aki/TypeScript/Launcher/PlayerInput/TsHotPatchPanelConfig.TsHotPatchPanelConfig_C",
        UE.BlueprintGeneratedClass,
        (t, i) => {
          t
            ? this.XY.set(i, t)
            : LauncherLog_1.LauncherLog.Error(
                "预加载HotPatchInputManager类型失败",
              ),
            e();
        },
      );
    });
  }
  static lqa() {
    this.XY.clear();
  }
  static InsertPanelConfig(t) {
    this.uqa?.HideTexture(),
      this.uqa?.UnRegisterActionAndAxis(),
      this.cqa.push(t),
      (this.uqa = t).RefreshTexture(),
      t.RegisterActionAndAxis();
  }
  static RemovePanelConfig(t) {
    t.HideTexture(), t.UnRegisterActionAndAxis();
    t = this.cqa.indexOf(t);
    const i = this.cqa.length;
    if ((this.cqa.splice(t, 1), t === i - 1)) {
      const i = this.cqa.length;
      (this.uqa = this.cqa[i - 1]),
        this.uqa?.RefreshTexture(),
        this.uqa?.RegisterActionAndAxis();
    }
  }
  static async aqa() {
    var t = [];
    if (Platform_1.Platform.IsPs5Platform())
      for (const i of HotPatchInputDefine_1.gamepadKeyPathMap)
        t.push(this.mqa(i[0], i[1].Ps));
    else
      for (const e of HotPatchInputDefine_1.gamepadKeyPathMap)
        e[1].XBox && t.push(this.dqa(e[0], e[1].XBox)),
          t.push(this.mqa(e[0], e[1].Ps));
    await Promise.all(t);
  }
  static async dqa(a, t) {
    return new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        t,
        UE.Texture,
        (t, i) => {
          e(t), t && this.Cqa.set(a, t);
        },
      );
    });
  }
  static async mqa(a, t) {
    return new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        t,
        UE.Texture,
        (t, i) => {
          e(t), t && this.gqa.set(a, t);
        },
      );
    });
  }
  static _qa() {
    this.Cqa.clear(), this.gqa.clear();
  }
  static GetTextureByActionName(t) {
    t = HotPatchInputDefine_1.gamepadActionInputMap.get(t);
    if (t)
      return (
        InputDevice_1.InputDevice.IsPsGamepad() ? this.gqa : this.Cqa
      ).get(t);
  }
}
(exports.HotPatchInputManager = HotPatchInputManager),
  ((_a = HotPatchInputManager).RSr = void 0),
  (HotPatchInputManager.R$e = void 0),
  (HotPatchInputManager.nUa = new Map()),
  (HotPatchInputManager.hqa = new Map()),
  (HotPatchInputManager.Zba = new Map()),
  (HotPatchInputManager.iqa = new Map()),
  (HotPatchInputManager.rqa = void 0),
  (HotPatchInputManager.nqa = void 0),
  (HotPatchInputManager.sUa = void 0),
  (HotPatchInputManager.aUa = void 0),
  (HotPatchInputManager.SEe = []),
  (HotPatchInputManager.yEe = []),
  (HotPatchInputManager.NNa = void 0),
  (HotPatchInputManager.Jba = (t, i) => {
    var e = _a.nUa.get(i);
    if (e) for (const a of e) a(t, i);
  }),
  (HotPatchInputManager.tqa = (t, i) => {
    var e = _a.hqa.get(i);
    if (e) for (const a of e) a(t, i);
  }),
  (HotPatchInputManager.rUa = (t, i, e) => {
    _a.sUa?.(t, i, e);
  }),
  (HotPatchInputManager.oUa = (t, i) => {
    _a.aUa?.(t, i);
  }),
  (HotPatchInputManager.Kba = () => {
    _a.uqa.RefreshTexture(),
      (_a.R$e.bShowMouseCursor = InputDevice_1.InputDevice.IsInKeyBoard());
  }),
  (HotPatchInputManager.oqa = (t) => {
    UE.KismetInputLibrary.Key_IsGamepadKey(t) &&
      HotPatchEventSystem_1.HotPatchEventSystem.SwitchToNavigationInputType(),
      InputDevice_1.InputDevice.SwitchInputControllerTypeByKey(t),
      _a.NNa?.();
  }),
  (HotPatchInputManager.cqa = []),
  (HotPatchInputManager.uqa = void 0),
  (HotPatchInputManager.XY = new Map()),
  (HotPatchInputManager.Cqa = new Map()),
  (HotPatchInputManager.gqa = new Map());
//# sourceMappingURL=HotPatchInputManager.js.map
