"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
  IconKeyComponent_1 = require("../KeyComponent/IconKeyComponent"),
  UiNavigationUtil_1 = require("../UiNavigationUtil");
class HotKeyComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.HotKeyMapIndex = 0),
      (this.CurComponent = void 0),
      (this.IsPress = !1),
      (this.IsAction = !0),
      (this.nqo = void 0),
      (this.sqo = 0),
      (this.HotKeyTextId = void 0),
      (this.w7t = void 0),
      (this.aqo = void 0),
      (this.Dut = (t) => {
        var i = this.GetActionName();
        StringUtils_1.StringUtils.IsEmpty(i) || i !== t || this.hqo();
      }),
      (this.lqo = !1),
      (this._qo = !1),
      (this.HotKeyMapIndex = t),
      (this.nqo =
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(
          this.HotKeyMapIndex,
        ));
  }
  OnBeforeCreateImplement() {
    this.OnInit();
  }
  async OnBeforeStartAsync() {
    (this._qo = "LongTimeToTrigger" === this.w7t),
      (this.CurComponent = new IconKeyComponent_1.IconKeyComponent()),
      this.CurComponent.SetIsNeedLongPress(this._qo),
      this.CurComponent.SetKeyName(this.uqo()),
      await this.CurComponent.CreateThenShowByActorAsync(this.RootActor),
      (this.aqo = UiNavigationUtil_1.UiNavigationUtil.GetFullPathOfActor(
        this.CurComponent.GetRootActor(),
      ));
  }
  uqo() {
    var t = this.GetHotKeyConfig();
    return !t || Info_1.Info.IsInTouch() ? "" : this.Trt(t);
  }
  cqo() {
    return 0 === this.sqo;
  }
  mqo(t) {
    t ? this.OnRefreshMode() : this.IsPress && this.ReleaseWithoutCheck(),
      this.CurComponent.SetActive(t);
  }
  OnRefreshMode() {
    this.dqo(), this.RefreshHotKeyNameText();
  }
  dqo() {
    var t = this.GetHotKeyConfig();
    t &&
      (Info_1.Info.IsInTouch()
        ? this.CurComponent.SetActive(!1)
        : ((t = this.Trt(t)),
          this.CurComponent.RefreshKeyIcon(t),
          this.CurComponent.SetActive(!0)));
  }
  hqo() {
    var t = this.GetHotKeyConfig();
    t &&
      !Info_1.Info.IsInTouch() &&
      ((t = this.Trt(t)), this.CurComponent.RefreshKeyIcon(t));
  }
  GetHotKeyConfig() {
    return this.nqo;
  }
  Trt(t) {
    var i = t.ActionName,
      t = t.AxisName;
    return !StringUtils_1.StringUtils.IsEmpty(i) && this.IsAction
      ? InputSettingsManager_1.InputSettingsManager.GetActionBinding(
          i,
        ).GetCurrentPlatformKeyByIndex(0)?.KeyName
      : StringUtils_1.StringUtils.IsEmpty(t)
        ? void 0
        : InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
            t,
          ).GetCurrentPlatformKeyByIndex(0)?.KeyName;
  }
  Cqo(t, i) {
    ModelManager_1.ModelManager.UiNavigationModel.IsOpenLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiNavigationHotKey",
        11,
        "[LogicMode]模式设置",
        ["配置id", this.HotKeyMapIndex],
        ["Tag", this.GetBindButtonTag()],
        ["模式", HotKeyViewDefine_1.logicModeLogString[t]],
        ["值", i],
      ),
      i ? this.sqo & t && (this.sqo = this.sqo ^ t) : (this.sqo = this.sqo | t);
  }
  RefreshHotKeyNameText() {
    var t = this.HotKeyTextId ?? this.GetHotKeyConfig().TextId;
    this.CurComponent.RefreshNameText(t);
  }
  OnRefreshSelfHotKeyState(t) {
    var i = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(i) ||
      ((t = t.GetActiveListenerByTag(i)), this.SetVisibleMode(2, void 0 !== t));
  }
  OnRefreshHotKeyText(t) {}
  OnRefreshHotKeyTextId(t) {
    var i;
    this.CurComponent.GetIsForceSetText() ||
      ((i = this.GetBindButtonTag()), StringUtils_1.StringUtils.IsEmpty(i)) ||
      ((t = t.GetActiveListenerByTag(i)?.GetTipsTextIdByState()),
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
  gqo(t = !1) {
    var i,
      e = this.nqo.ApplicableType;
    0 === e
      ? this.SetVisibleMode(64, !0, !0)
      : 1 === e
        ? this.SetVisibleMode(64, Info_1.Info.IsInKeyBoard(), t)
        : 2 === e
          ? this.SetVisibleMode(64, Info_1.Info.IsInGamepad(), t)
          : 3 === e
            ? ((i = Info_1.Info.IsInKeyBoard()),
              this.RootItem.SetAlpha(i ? 0 : 1),
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
            : 4 === e
              ? ((i = Info_1.Info.IsInGamepad()),
                this.RootItem.SetAlpha(i ? 0 : 1),
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
              : 5 === e &&
                ((i = Info_1.Info.IsInKeyBoard()),
                (t = Info_1.Info.IsInGamepad()),
                this.RootItem.SetAlpha(i || t ? 0 : 1),
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
    this.SetVisibleMode(16, !Info_1.Info.IsInTouch()),
      this.SetVisibleMode(2, !1, !0),
      this.gqo();
  }
  RegisterMe() {
    this.dde(), this.hqo();
  }
  UnRegisterMe() {
    this.Cde(), this.OnUnRegisterMe(), this.fqo(this.GetAxisName());
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActionKeyChanged,
      this.Dut,
    ),
      this.OnAddEventListener();
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActionKeyChanged,
      this.Dut,
    ),
      this.OnRemoveEventListener();
  }
  SetVisibleMode(t, i, e = !1) {
    var s = this.sqo;
    this.Cqo(t, i),
      (this.sqo === s && !e) ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiNavigationHotKey",
            11,
            "[LogicMode]当前设置可见性模式",
            ["配置id", this.HotKeyMapIndex],
            ["this.LogicMode", MathUtils_1.MathUtils.DecimalToBinary(this.sqo)],
            ["lastLogicMode", MathUtils_1.MathUtils.DecimalToBinary(s)],
            ["Tag", this.GetBindButtonTag()],
            ["Path", this.aqo],
          ),
        this.mqo(this.cqo()));
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
    return 0 === this.sqo;
  }
  IsAllowTickContinue() {
    return 0 === this.sqo || this.lqo;
  }
  RefreshMode() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiNavigationHotKey", 11, "切换了控制器,强制刷新表现"),
      this.gqo(!0);
  }
  Press() {
    this.cqo() && ((this.IsPress = !0), this.OnPress(this.GetHotKeyConfig()));
  }
  Release() {
    this.cqo() && this.IsPress && this.ReleaseWithoutCheck();
  }
  ReleaseWithoutCheck() {
    this.IsPress = !1;
    var t = this.GetHotKeyConfig();
    this.OnRelease(t);
  }
  InputAxis(t, i) {
    this.cqo() ? (this.pqo(t), this.OnInputAxis(t, i)) : this.fqo(t);
  }
  pqo(t) {
    this.lqo || ((this.lqo = !0), this.OnStartInputAxis(t));
  }
  fqo(t) {
    this.lqo && ((this.lqo = !1), this.OnFinishInputAxis(t));
  }
  GetBindButtonTag() {
    return this.nqo?.BindButtonTag;
  }
  GetActionName() {
    return this.nqo?.ActionName;
  }
  GetAxisName() {
    return this.nqo?.AxisName;
  }
  IsAxisAllDirection() {
    return 0 === this.nqo?.AxisDirection;
  }
  IsAxisPositive() {
    return 1 !== this.nqo?.AxisDirection;
  }
  IsAxisReverse() {
    return 2 !== this.nqo?.AxisDirection;
  }
  SetHotKeyFunctionType(t) {
    this.w7t = t;
  }
  GetHotKeyFunctionType() {
    return this.w7t;
  }
  IsOccupancyFightInput() {
    return this.OnIsOccupancyFightInput();
  }
  RefreshSelfHotKeyState(t) {
    this.OnRefreshHotKeyShield(t), this.OnRefreshSelfHotKeyState(t), this.gqo();
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
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnUnRegisterMe() {}
  OnClear() {}
  OnIsOccupancyFightInput() {
    return !0;
  }
  OnPress(t) {}
  OnRelease(t) {}
  OnInputAxis(t, i) {}
  OnStartInputAxis(t) {}
  OnFinishInputAxis(t) {}
  ResetPressState() {
    !this._qo && this.IsPress && (this.IsPress = !1);
  }
}
exports.HotKeyComponent = HotKeyComponent;
//# sourceMappingURL=HotKeyComponent.js.map
