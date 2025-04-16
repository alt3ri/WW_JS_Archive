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
  static async ZRa() {
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
      this.eUa(),
      this.tUa(),
      this._qa();
  }
  static uqa(t, i) {
    var e = UE.InputSettings.GetInputSettings(),
      t = new UE.FName(t),
      i = new UE.FName(i),
      i = new UE.Key(i),
      t = new UE.InputActionKeyMapping(t, !1, !1, !1, !1, i);
    e.AddActionMapping(t), this.SEe.push(t);
  }
  static cqa(t, i) {
    var e = UE.InputSettings.GetInputSettings(),
      t = new UE.FName(t),
      a = new UE.FName(i[0]),
      a = new UE.Key(a),
      t = new UE.InputAxisKeyMapping(t, i[1], a);
    e.AddAxisMapping(t), this.yEe.push(t);
  }
  static rUa() {
    for (const t of HotPatchInputDefine_1.pcInputMap) this.uqa(t[0], t[1]);
    for (const i of HotPatchInputDefine_1.gamepadActionInputMap)
      this.uqa(i[0], i[1]);
    for (const e of HotPatchInputDefine_1.gamepadAxisInputMap)
      this.cqa(e[0], e[1]);
  }
  static oUa() {
    var t = UE.InputSettings.GetInputSettings();
    for (const i of this.SEe) t?.RemoveActionMapping(i);
    for (const e of this.yEe) t?.RemoveAxisMapping(e);
  }
  static mqa(t) {
    var i = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    i.OnPressActionCallback.Add(this.dqa),
      i.AddPressBinding(t, this.R$e),
      i.AddReleaseBinding(t, this.R$e),
      this.Cqa.set(t, i);
  }
  static gqa(t) {
    var i = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    i.OnAxisCallback.Add(this.fqa),
      i.AddAxisBinding(t, this.R$e),
      this.pqa.set(t, i);
  }
  static eUa() {
    for (const t of HotPatchInputDefine_1.pcInputMap) this.mqa(t[0]);
    for (const i of HotPatchInputDefine_1.gamepadActionInputMap) this.mqa(i[0]);
    for (const e of HotPatchInputDefine_1.gamepadAxisInputMap) this.gqa(e[0]);
  }
  static tUa() {
    var t = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    t.OnTouchActionCallback.Add(this.aUa),
      t.OnTouchMovedActionCallback.Add(this.hUa),
      t.AddTouchPressBinding(this.R$e),
      t.AddTouchReleaseBinding(this.R$e),
      t.AddTouchMoveBinding(this.R$e),
      (this.vqa = t);
  }
  static _qa() {
    var t = UE.NewObject(UE.TsHotFixActionHandle_C.StaticClass(), this.RSr);
    t.OnAnyKeyPressCallback.Add(this.Mqa),
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
      (this.Sqa = t);
  }
  static async WaitAnyKeyPress() {
    return new Promise((t) => {
      this.H3a = () => {
        (this.H3a = void 0), t();
      };
    });
  }
  static async Init(t) {
    (this.RSr = t),
      (this.R$e = UE.GameplayStatics.GetPlayerController(t, 0)),
      this.rUa(),
      await Promise.all([this.Eqa(), this.ZRa(), this.yqa()]),
      InputDevice_1.InputDevice.RegisterInputChangeDelegate(
        HotPatchInputManager.lqa,
      );
  }
  static RegisterInputAction(t, i) {
    let e = this.lUa.get(t);
    (e = e || new Set()).add(i), this.lUa.set(t, e);
  }
  static UnRegisterInputAction(t, i) {
    var e = this.lUa.get(t);
    e.delete(i) && 0 === e.size && this.lUa.delete(t);
  }
  static RegisterInputAxis(t, i) {
    let e = this.Iqa.get(t);
    (e = e || new Set()).add(i), this.Iqa.set(t, e);
  }
  static UnRegisterInputAxis(t, i) {
    var e = this.Iqa.get(t);
    e.delete(i) && 0 === e.size && this.Iqa.delete(t);
  }
  static RegisterOnTouchAction(t) {
    this._Ua = t;
  }
  static UnRegisterOnTouchAction() {
    this._Ua = void 0;
  }
  static RegisterOnTouchMovedAction(t) {
    this.uUa = t;
  }
  static UnRegisterOnTouchMovedAction() {
    this.uUa = void 0;
  }
  static Destroy() {
    InputDevice_1.InputDevice.UnRegisterInputChangeDelegate(
      HotPatchInputManager.lqa,
    ),
      this.oUa(),
      this.Tqa(),
      this.Lqa();
    for (const t of this.Cqa.values())
      t.ClearActionBinding(this.R$e), t.OnPressActionCallback.Clear();
    this.Cqa.clear();
    for (const i of this.pqa.values())
      i.ClearAxisBinding(this.R$e), i.OnAxisCallback.Clear();
    this.pqa.clear(),
      this.vqa &&
        (this.vqa.OnTouchActionCallback.Clear(),
        this.vqa.OnTouchMovedActionCallback.Clear(),
        (this.vqa = void 0)),
      this.Sqa && (this.Sqa.ClearKeyBinding(this.R$e), (this.Sqa = void 0)),
      (this.RSr = void 0),
      (this.R$e = void 0);
  }
  static async Eqa() {
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
  static Tqa() {
    this.XY.clear();
  }
  static InsertPanelConfig(t) {
    this.Dqa?.HideTexture(),
      this.Dqa?.UnRegisterActionAndAxis(),
      this.Aqa.push(t),
      (this.Dqa = t).RefreshTexture(),
      t.RegisterActionAndAxis();
  }
  static RemovePanelConfig(t) {
    t.HideTexture(), t.UnRegisterActionAndAxis();
    t = this.Aqa.indexOf(t);
    const i = this.Aqa.length;
    if ((this.Aqa.splice(t, 1), t === i - 1)) {
      const i = this.Aqa.length;
      (this.Dqa = this.Aqa[i - 1]),
        this.Dqa?.RefreshTexture(),
        this.Dqa?.RegisterActionAndAxis();
    }
  }
  static async yqa() {
    var t = [];
    if (Platform_1.Platform.IsPs5Platform())
      for (const i of HotPatchInputDefine_1.gamepadKeyPathMap)
        t.push(this.Rqa(i[0], i[1].Ps));
    else
      for (const e of HotPatchInputDefine_1.gamepadKeyPathMap)
        e[1].XBox && t.push(this.Uqa(e[0], e[1].XBox)),
          t.push(this.Rqa(e[0], e[1].Ps));
    await Promise.all(t);
  }
  static async Uqa(a, t) {
    return new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        t,
        UE.Texture,
        (t, i) => {
          e(t), t && this.xqa.set(a, t);
        },
      );
    });
  }
  static async Rqa(a, t) {
    return new Promise((e) => {
      LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
        t,
        UE.Texture,
        (t, i) => {
          e(t), t && this.Pqa.set(a, t);
        },
      );
    });
  }
  static Lqa() {
    this.xqa.clear(), this.Pqa.clear();
  }
  static GetTextureByActionName(t) {
    t = HotPatchInputDefine_1.gamepadActionInputMap.get(t);
    if (t)
      return (
        InputDevice_1.InputDevice.IsPsGamepad() ? this.Pqa : this.xqa
      ).get(t);
  }
}
(exports.HotPatchInputManager = HotPatchInputManager),
  ((_a = HotPatchInputManager).RSr = void 0),
  (HotPatchInputManager.R$e = void 0),
  (HotPatchInputManager.lUa = new Map()),
  (HotPatchInputManager.Iqa = new Map()),
  (HotPatchInputManager.Cqa = new Map()),
  (HotPatchInputManager.pqa = new Map()),
  (HotPatchInputManager.vqa = void 0),
  (HotPatchInputManager.Sqa = void 0),
  (HotPatchInputManager._Ua = void 0),
  (HotPatchInputManager.uUa = void 0),
  (HotPatchInputManager.SEe = []),
  (HotPatchInputManager.yEe = []),
  (HotPatchInputManager.H3a = void 0),
  (HotPatchInputManager.dqa = (t, i) => {
    var e = _a.lUa.get(i);
    if (e) for (const a of e) a(t, i);
  }),
  (HotPatchInputManager.fqa = (t, i) => {
    var e = _a.Iqa.get(i);
    if (e) for (const a of e) a(t, i);
  }),
  (HotPatchInputManager.aUa = (t, i, e) => {
    _a._Ua?.(t, i, e);
  }),
  (HotPatchInputManager.hUa = (t, i) => {
    _a.uUa?.(t, i);
  }),
  (HotPatchInputManager.lqa = () => {
    _a.Dqa.RefreshTexture(),
      (_a.R$e.bShowMouseCursor = InputDevice_1.InputDevice.IsInKeyBoard());
  }),
  (HotPatchInputManager.Mqa = (t) => {
    if (
      Platform_1.Platform.IsMobilePlatform() &&
      t.KeyName.toString().includes("Android")
    )
      return;
    UE.KismetInputLibrary.Key_IsGamepadKey(t) &&
      HotPatchEventSystem_1.HotPatchEventSystem.SwitchToNavigationInputType(),
      InputDevice_1.InputDevice.SwitchInputControllerTypeByKey(t),
      _a.H3a?.();
  }),
  (HotPatchInputManager.Aqa = []),
  (HotPatchInputManager.Dqa = void 0),
  (HotPatchInputManager.XY = new Map()),
  (HotPatchInputManager.xqa = new Map()),
  (HotPatchInputManager.Pqa = new Map());
//# sourceMappingURL=HotPatchInputManager.js.map
