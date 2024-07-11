"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const IconKeyComponent_1 = require("../KeyComponent/IconKeyComponent");
const UiNavigationUtil_1 = require("../UiNavigationUtil");
class HotKeyComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.HotKeyMapIndex = 0),
      (this.CurComponent = void 0),
      (this.IsPress = !1),
      (this.IsAction = !0),
      (this.hbo = void 0),
      (this.lbo = 0),
      (this.HotKeyTextId = void 0),
      (this.w9t = void 0),
      (this._bo = void 0),
      (this.c_t = (t) => {
        const e = this.GetActionName();
        StringUtils_1.StringUtils.IsEmpty(e) || e !== t || this.ubo();
      }),
      (this.cbo = !1),
      (this.mbo = !1),
      (this.HotKeyMapIndex = t),
      (this.hbo =
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(
          this.HotKeyMapIndex,
        ));
  }
  OnBeforeCreateImplement() {
    this.OnInit();
  }
  async OnBeforeStartAsync() {
    (this.mbo = this.w9t === "LongTimeToTrigger"),
      (this.CurComponent = new IconKeyComponent_1.IconKeyComponent()),
      this.CurComponent.SetIsNeedLongPress(this.mbo),
      this.CurComponent.SetKeyName(this.dbo()),
      await this.CurComponent.CreateThenShowByActorAsync(this.RootActor),
      (this._bo = UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
        this.CurComponent.GetRootActor(),
      ));
  }
  dbo() {
    const t = this.GetHotKeyConfig();
    return !t || ModelManager_1.ModelManager.PlatformModel.InputController === 2
      ? ""
      : this.uot(t);
  }
  Cbo() {
    return this.lbo === 0;
  }
  gbo(t) {
    t ? this.OnRefreshMode() : this.IsPress && this.ReleaseWithoutCheck(),
      this.CurComponent.SetActive(t);
  }
  OnRefreshMode() {
    this.fbo(), this.RefreshHotKeyNameText();
  }
  fbo() {
    let t = this.GetHotKeyConfig();
    t &&
      (ModelManager_1.ModelManager.PlatformModel.InputController === 2
        ? this.CurComponent.SetActive(!1)
        : ((t = this.uot(t)),
          this.CurComponent.RefreshKeyIcon(t),
          this.CurComponent.SetActive(!0)));
  }
  ubo() {
    let t = this.GetHotKeyConfig();
    t &&
      ModelManager_1.ModelManager.PlatformModel.InputController !== 2 &&
      ((t = this.uot(t)), this.CurComponent.RefreshKeyIcon(t));
  }
  GetHotKeyConfig() {
    return this.hbo;
  }
  uot(t) {
    const e = t.ActionName;
    var t = t.AxisName;
    return !StringUtils_1.StringUtils.IsEmpty(e) && this.IsAction
      ? InputSettingsManager_1.InputSettingsManager.GetActionBinding(
          e,
        ).GetCurrentPlatformKeyByIndex(0)?.KeyName
      : StringUtils_1.StringUtils.IsEmpty(t)
        ? void 0
        : InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
            t,
          ).GetCurrentPlatformKeyByIndex(0)?.KeyName;
  }
  pbo(t, e) {
    ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigationHotKey",
        11,
        "[LogicMode]模式设置",
        ["配置id", this.HotKeyMapIndex],
        ["Tag", this.GetBindButtonTag()],
        ["模式", HotKeyViewDefine_1.logicModeLogString[t]],
        ["值", e],
      ),
      e ? this.lbo & t && (this.lbo = this.lbo ^ t) : (this.lbo = this.lbo | t);
  }
  RefreshHotKeyNameText() {
    const t = this.HotKeyTextId ?? this.GetHotKeyConfig().TextId;
    this.CurComponent.RefreshNameText(t);
  }
  OnRefreshSelfHotKeyState(t) {
    const e = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(e) ||
      ((t = t.GetActiveListenerByTag(e)), this.SetVisibleMode(2, void 0 !== t));
  }
  OnRefreshHotKeyText(t) {}
  OnRefreshHotKeyTextId(t) {
    let e;
    this.CurComponent.GetIsForceSetText() ||
      ((e = this.GetBindButtonTag()), StringUtils_1.StringUtils.IsEmpty(e)) ||
      ((t = t.GetActiveListenerByTag(e)?.GetTipsTextIdByState()),
      this.SetHotKeyTextId(t),
      this.RefreshHotKeyNameText());
  }
  OnRefreshHotKeyShield(t) {
    t = t.GetFocusListener();
    this.SetVisibleMode(
      8,
      !t?.ShieldHotKeyIndexArray.Contains(this.HotKeyMapIndex),
    );
  }
  vbo(t = !1) {
    let e;
    const i = this.hbo.ApplicableType;
    i === 0
      ? this.SetVisibleMode(64, !0, !0)
      : i === 1
        ? this.SetVisibleMode(
            64,
            ModelManager_1.ModelManager.PlatformModel.IsPc(),
            t,
          )
        : i === 2
          ? this.SetVisibleMode(
              64,
              ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
              t,
            )
          : i === 3
            ? ((e = ModelManager_1.ModelManager.PlatformModel.IsPc()),
              this.RootItem.SetAlpha(e ? 0 : 1),
              this.SetVisibleMode(64, !0, t),
              ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiNavigationHotKey",
                  11,
                  "仅键鼠透明",
                  ["配置id", this.HotKeyMapIndex],
                  ["Tag", this.GetBindButtonTag()],
                ))
            : i === 4
              ? ((e = ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
                this.RootItem.SetAlpha(e ? 0 : 1),
                this.SetVisibleMode(64, !0, t),
                ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "UiNavigationHotKey",
                    11,
                    "仅手柄透明",
                    ["配置id", this.HotKeyMapIndex],
                    ["Tag", this.GetBindButtonTag()],
                  ))
              : i === 5 &&
                ((e = ModelManager_1.ModelManager.PlatformModel.IsPc()),
                (t = ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
                this.RootItem.SetAlpha(e || t ? 0 : 1),
                this.SetVisibleMode(64, !0, !0),
                ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog) &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiNavigationHotKey",
                  11,
                  "键盘和手柄透明",
                  ["配置id", this.HotKeyMapIndex],
                  ["Tag", this.GetBindButtonTag()],
                );
  }
  InitHotKeyLogicMode() {
    const t = ModelManager_1.ModelManager.PlatformModel.InputController;
    this.SetVisibleMode(16, t !== 2),
      this.SetVisibleMode(2, !1, !0),
      this.vbo();
  }
  RegisterMe() {
    this.AddEventListener(), this.ubo();
  }
  UnRegisterMe() {
    this.RemoveEventListener(),
      this.OnUnRegisterMe(),
      this.Mbo(this.GetAxisName());
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActionKeyChanged,
      this.c_t,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActionKeyChanged,
      this.c_t,
    );
  }
  SetVisibleMode(t, e, i = !1) {
    const s = this.lbo;
    this.pbo(t, e),
      (this.lbo === s && !i) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiNavigationHotKey",
            11,
            "[LogicMode]当前设置可见性模式",
            ["配置id", this.HotKeyMapIndex],
            ["this.LogicMode", MathUtils_1.MathUtils.DecimalToBinary(this.lbo)],
            ["lastLogicMode", MathUtils_1.MathUtils.DecimalToBinary(s)],
            ["Tag", this.GetBindButtonTag()],
            ["Path", this._bo],
          ),
        this.gbo(this.Cbo()));
  }
  SetHotKeyDescTextForce(t) {
    this.CurComponent.SetNameTextForce(!0), this.CurComponent.SetNameText(t);
  }
  ResetHotKeyDescTextForce() {
    this.CurComponent.SetNameTextForce(!1);
  }
  SetHotKeyTextId(t) {
    StringUtils_1.StringUtils.IsEmpty(t)
      ? (this.HotKeyTextId = void 0)
      : (this.HotKeyTextId = t);
  }
  IsHotKeyActive() {
    return this.lbo === 0;
  }
  IsAllowTickContinue() {
    return this.lbo === 0 || this.cbo;
  }
  RefreshMode() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiNavigationHotKey", 11, "切换了控制器,强制刷新表现"),
      this.vbo(!0);
  }
  Press() {
    this.Cbo() && ((this.IsPress = !0), this.OnPress(this.GetHotKeyConfig()));
  }
  Release() {
    this.Cbo() && this.IsPress && this.ReleaseWithoutCheck();
  }
  ReleaseWithoutCheck() {
    this.IsPress = !1;
    const t = this.GetHotKeyConfig();
    this.OnRelease(t);
  }
  InputAxis(t, e) {
    this.Cbo() ? (this.Sbo(t), this.OnInputAxis(t, e)) : this.Mbo(t);
  }
  Sbo(t) {
    this.cbo || ((this.cbo = !0), this.OnStartInputAxis(t));
  }
  Mbo(t) {
    this.cbo && ((this.cbo = !1), this.OnFinishInputAxis(t));
  }
  GetBindButtonTag() {
    return this.hbo?.BindButtonTag;
  }
  GetActionName() {
    return this.hbo?.ActionName;
  }
  GetAxisName() {
    return this.hbo?.AxisName;
  }
  IsAxisAllDirection() {
    return this.hbo?.AxisDirection === 0;
  }
  IsAxisPositive() {
    return this.hbo?.AxisDirection !== 1;
  }
  IsAxisReverse() {
    return this.hbo?.AxisDirection !== 2;
  }
  SetHotKeyFunctionType(t) {
    this.w9t = t;
  }
  GetHotKeyFunctionType() {
    return this.w9t;
  }
  RefreshSelfHotKeyState(t) {
    this.OnRefreshHotKeyShield(t), this.OnRefreshSelfHotKeyState(t), this.vbo();
  }
  RefreshSelfHotKeyText(t) {
    this.OnRefreshHotKeyText(t), this.OnRefreshHotKeyTextId(t);
  }
  SetHotKeyType(t) {
    this.CurComponent.SetHotKeyType(t);
  }
  Clear() {
    this.OnClear();
  }
  OnInit() {}
  OnUnRegisterMe() {}
  OnClear() {}
  OnPress(t) {}
  OnRelease(t) {}
  OnInputAxis(t, e) {}
  OnStartInputAxis(t) {}
  OnFinishInputAxis(t) {}
  ResetPressState() {
    !this.mbo && this.IsPress && (this.IsPress = !1);
  }
}
exports.HotKeyComponent = HotKeyComponent;
// # sourceMappingURL=HotKeyComponent.js.map
