"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PromptForFloatLineView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PromptForFloatLineView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Q$t = void 0),
      (this.X$t = void 0),
      (this.EPe = void 0),
      (this.ParamHub = void 0),
      (this.Wht = 0),
      (this.e8 = 0),
      (this.$$t = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.Q$t = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      (this.X$t = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      this.Q$t?.SetSelectorOffset(1);
  }
  OnBeforeShow() {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig,
      t = this.ParamHub.TypeId,
      i = i.GetPromptTypeMainTextColor(t);
    i && this.Y$t(i),
      this.Q$t?.SetSelectorOffset(1),
      this.X$t &&
        ((i =
          0.5 *
          (t
            ? ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(t)
            : ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
                t,
              )
          ).Duration),
        (t =
          this.X$t.GetPlayTween().duration > i
            ? i
            : this.X$t.GetPlayTween().duration),
        (this.X$t.GetPlayTween().duration = t),
        this.X$t?.Play());
  }
  async OnShowAsyncImplementImplement() {
    var i = new CustomPromise_1.CustomPromise();
    await this.EPe?.PlaySequenceAsync("Start", i);
  }
  async OnBeforeHideAsync() {
    this.Wht = 0;
    var i = new CustomPromise_1.CustomPromise();
    await this.EPe?.PlaySequenceAsync("Close", i);
  }
  OnAfterHide() {
    this.$$t?.(this);
  }
  Y$t(i) {
    var t = this.GetText(0)
      .GetOwner()
      .GetComponentByClass(UE.UIEffectOutline.StaticClass());
    t ? t.SetOutlineColor(i) : this.GetText(0).SetColor(i);
  }
  J$t(i, ...t) {
    var e = this.GetText(0);
    this.ParamHub.PromptId,
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextKey, ...t);
  }
  z$t() {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig,
      t = this.ParamHub,
      e = t.MainTextParams ?? [];
    let s = t.MainTextObj;
    (s = t.PromptId
      ? s ?? i.GetPromptMainTextObj(t.PromptId)
      : s ?? i.GetPromptTypeMainTextObj(t.TypeId)),
      e?.length || this.J$t(s),
      s || t.PromptId || !e?.length
        ? this.J$t(s, ...e)
        : StringUtils_1.StringUtils.IsEmpty(e[0]) ||
          this.GetText(0).SetText(e[0]);
  }
  SetPromptHub(i) {
    this.ParamHub = i;
    i = ConfigManager_1.ConfigManager.GenericPromptConfig;
    (this.e8 = 0),
      (this.Wht = TimeUtil_1.TimeUtil.SetTimeMillisecond(
        i.GetPromptTypeInfo(this.ParamHub.TypeId).Duration,
      )),
      this.Z$t();
  }
  Z$t() {
    this.z$t(), this.RootItem.SetAsLastHierarchy();
  }
  SetHideCallback(i) {
    this.$$t = i;
  }
  ShowView() {
    if (this.IsShowOrShowing)
      return void 0 !== this.EPe?.GetCurrentSequence()
        ? void this.EPe.ReplaySequenceByKey("Start")
        : void this.EPe.PlaySequencePurely("Start");
    this.SetActive(!0);
  }
  Tick(i) {
    this.Wht <= 0 || ((this.e8 += i), this.e8 > this.Wht && this.SetActive(!1));
  }
}
exports.PromptForFloatLineView = PromptForFloatLineView;
//# sourceMappingURL=PromptForFloatLineView.js.map
