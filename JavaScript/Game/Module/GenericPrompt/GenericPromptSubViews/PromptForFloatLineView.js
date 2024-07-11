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
      (this.QYt = void 0),
      (this.XYt = void 0),
      (this.SPe = void 0),
      (this.ParamHub = void 0),
      (this.r1t = 0),
      (this.e8 = 0),
      (this.$Yt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.QYt = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      (this.XYt = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      this.QYt?.SetSelectorOffset(1);
  }
  OnBeforeShow() {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig,
      t = this.ParamHub.TypeId,
      i = i.GetPromptTypeMainTextColor(t);
    i && this.YYt(i),
      this.QYt?.SetSelectorOffset(1),
      this.XYt &&
        ((i =
          0.5 *
          (t
            ? ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(t)
            : ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
                t,
              )
          ).Duration),
        (t =
          this.XYt.GetPlayTween().duration > i
            ? i
            : this.XYt.GetPlayTween().duration),
        (this.XYt.GetPlayTween().duration = t),
        this.XYt?.Play());
  }
  async OnShowAsyncImplementImplement() {
    var i = new CustomPromise_1.CustomPromise();
    await this.SPe?.PlaySequenceAsync("Start", i);
  }
  async OnBeforeHideAsync() {
    this.r1t = 0;
    var i = new CustomPromise_1.CustomPromise();
    await this.SPe?.PlaySequenceAsync("Close", i);
  }
  OnAfterHide() {
    this.$Yt?.(this);
  }
  YYt(i) {
    var t = this.GetText(0)
      .GetOwner()
      .GetComponentByClass(UE.UIEffectOutline.StaticClass());
    t ? t.SetOutlineColor(i) : this.GetText(0).SetColor(i);
  }
  JYt(i, ...t) {
    var e = this.GetText(0);
    this.ParamHub.PromptId,
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextKey, ...t);
  }
  zYt() {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig,
      t = this.ParamHub,
      e = t.MainTextParams ?? [];
    let s = t.MainTextObj;
    (s = t.PromptId
      ? s ?? i.GetPromptMainTextObj(t.PromptId)
      : s ?? i.GetPromptTypeMainTextObj(t.TypeId)),
      e?.length || this.JYt(s),
      s || t.PromptId || !e?.length
        ? this.JYt(s, ...e)
        : StringUtils_1.StringUtils.IsEmpty(e[0]) ||
          this.GetText(0).SetText(e[0]);
  }
  SetPromptHub(i) {
    this.ParamHub = i;
    i = ConfigManager_1.ConfigManager.GenericPromptConfig;
    (this.e8 = 0),
      (this.r1t = TimeUtil_1.TimeUtil.SetTimeMillisecond(
        i.GetPromptTypeInfo(this.ParamHub.TypeId).Duration,
      )),
      this.ZYt();
  }
  ZYt() {
    this.zYt(), this.RootItem.SetAsLastHierarchy();
  }
  SetHideCallback(i) {
    this.$Yt = i;
  }
  ShowView() {
    if (this.IsShowOrShowing)
      return void 0 !== this.SPe?.GetCurrentSequence()
        ? void this.SPe.ReplaySequenceByKey("Start")
        : void this.SPe.PlaySequencePurely("Start");
    this.SetActive(!0);
  }
  Tick(i) {
    this.r1t <= 0 || ((this.e8 += i), this.e8 > this.r1t && this.SetActive(!1));
  }
}
exports.PromptForFloatLineView = PromptForFloatLineView;
//# sourceMappingURL=PromptForFloatLineView.js.map
