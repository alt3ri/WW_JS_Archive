"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestPlotTalkAudioUtil = exports.HandBookQuestPlotList =
    void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  Log_1 = require("../../../Core/Common/Log"),
  ExternalSourceSettingById_1 = require("../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  PlotAudioModel_1 = require("../Plot/PlotAudioModel"),
  PlotTextLogic_1 = require("../Plot/PlotView/PlotTextLogic"),
  HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestPlotList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Fxn = void 0),
      (this.Vxn = void 0),
      (this.KBn = void 0),
      (this.eVs = void 0),
      (this.Hxn = void 0),
      (this.QBn = void 0),
      (this.OptionData = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.WZt();
  }
  async WZt() {
    (this.Fxn = new HandBookQuestPlotTalkItem()),
      (this.Vxn = new HandBookQuestPlotOption()),
      (this.KBn = new HandBookQuestPlotNode()),
      (this.eVs = new HandBookQuestPlotOptionTalker()),
      this.AddChild(this.Fxn),
      this.AddChild(this.Vxn);
    var t = this.GetItem(0),
      i = (t.SetUIActive(!1), this.GetItem(1)),
      s = (i.SetUIActive(!1), this.GetItem(2)),
      e = (s.SetUIActive(!1), this.GetItem(3));
    e.SetUIActive(!1),
      await Promise.all([
        this.Fxn.CreateByActorAsync(t.GetOwner()),
        this.Vxn.CreateByActorAsync(i.GetOwner()),
        this.KBn.CreateByActorAsync(s.GetOwner()),
        this.eVs.CreateByActorAsync(e.GetOwner()),
      ]),
      this.Vxn.BindClickToggleBack(this.Hxn);
  }
  GetUsingItem(t) {
    return (
      t.TalkOption
        ? this.GetItem(1)
        : t.OptionTalker
          ? this.GetItem(3)
          : t.NodeText
            ? this.GetItem(2)
            : this.GetItem(0)
    ).GetOwner();
  }
  Update(t, i) {
    var s, e;
    (this.OptionData = t),
      this.Fxn?.SetUiActive(!1),
      this.Vxn?.SetUiActive(!1),
      this.KBn?.SetUiActive(!1),
      this.eVs?.SetUiActive(!1),
      t.NodeText
        ? (this.KBn?.SetUiActive(!0), this.KBn?.RefreshByNodeText(t.NodeText))
        : t.TalkOption
          ? (this.Vxn?.SetUiActive(!0),
            this.Vxn.RefreshByOption(
              t.TalkOption,
              t.PlotId,
              t.TalkItemId,
              t.OptionIndex ?? 0,
              t.IsChoseOption ?? !1,
            ))
          : t.OptionTalker
            ? (this.eVs?.SetUiActive(!0),
              (s = ModelManager_1.ModelManager.FunctionModel?.GetPlayerName()),
              (e =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "ColonTag",
                ) ?? ""),
              this.eVs?.RefreshByText("" !== s ? s + e + " " : ""))
            : (this.Fxn?.SetUiActive(!0),
              this.Fxn.Refresh(t.TalkOwnerName, t.TalkText, t.PlotAudio)),
      this.QBn && this.QBn(t.BelongToNode);
  }
  ClearItem() {
    this.Destroy();
  }
  BindClickOptionToggleBack(t) {
    this.Hxn = t;
  }
  BindOnRefreshNode(t) {
    this.QBn = t;
  }
  GetOptionToggle() {
    return this.Vxn?.Toggle;
  }
}
exports.HandBookQuestPlotList = HandBookQuestPlotList;
class HandBookQuestPlotTalkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.jxn = !1),
      (this.Wxn = void 0),
      (this.Kxn = () => {
        this.Wxn &&
          (this.jxn
            ? HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio()
            : HandBookQuestPlotTalkAudioUtil.PlayAudio(this.Wxn, this.Qxn),
          (this.jxn = !this.jxn));
      }),
      (this.Qxn = (t) => {
        (t && t === this.Wxn?.Id) ||
          (this.GetExtendToggle(3)?.SetToggleState(0), (this.jxn = !1));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.Kxn]]);
  }
  Refresh(t, i, s) {
    (this.Wxn = s), this.GetText(0)?.SetText(t ?? "");
    s = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i);
    this.GetText(1)?.SetText(s ?? "");
    const e = !!this.Wxn;
    this.GetItem(2)?.SetUIActive(e);
    t = this.GetExtendToggle(3);
    t?.CanExecuteChange.Bind(() => e),
      (this.jxn =
        e && HandBookQuestPlotTalkAudioUtil.IsPlayingAudio(this.Wxn?.Id)),
      this.jxn && HandBookQuestPlotTalkAudioUtil.ResetPlayEndCallBack(this.Qxn),
      t?.SetToggleStateForce(this.jxn ? 1 : 0);
  }
}
class HandBookQuestPlotOption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Toggle = void 0),
      (this.Ezi = -1),
      (this.$xn = -1),
      (this.Yxn = 0),
      (this.Jxn = void 0),
      (this.N8e = (t) => {
        this.Jxn &&
          1 === t &&
          this.Jxn(this.$xn, this.Ezi, this.Yxn, this.Toggle);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(1)),
      this.Toggle?.OnStateChange.Add(this.N8e);
  }
  RefreshByOption(t, i, s, e, o) {
    (this.$xn = i), (this.Ezi = s), (this.Yxn = e);
    (i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalkOption)),
      (s = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i));
    this.GetText(0)?.SetText(s),
      this.SetToggleState(o ? 1 : 0),
      this.SelectShow(o);
  }
  SetToggleState(t) {
    this.Toggle?.SetToggleStateForce(t, !1, !1);
  }
  SelectShow(t) {
    t
      ? (this.GetText(0)?.SetColor(HandBookDefine_1.selectColor),
        this.GetItem(2)?.SetAlpha(1),
        this.GetItem(3)?.SetAlpha(1))
      : (this.GetText(0)?.SetColor(HandBookDefine_1.noSelectColor),
        this.GetItem(2)?.SetAlpha(0),
        this.GetItem(3)?.SetAlpha(0));
  }
  BindClickToggleBack(t) {
    this.Jxn = t;
  }
}
class HandBookQuestPlotNode extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshByNodeText(t) {
    t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
      .replace("{q_count}", "0")
      .replace("{q_countMax}", "-");
    this.GetText(0)?.SetText(t);
  }
}
class HandBookQuestPlotOptionTalker extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshByText(t) {
    this.GetText(0)?.SetText(t);
  }
}
const BREAK_TIME = 1e3,
  MAX_LOAD_AUDIO_TIME = 3e3;
class HandBookQuestPlotTalkAudioUtil {
  static PlayAudio(i, s) {
    this.YZt.Init((t) => {
      this.aZi(),
        this.zxn && this.Zxn(!0, i.Id),
        (this.UPn = s),
        (this.XBn = i.Id),
        (this.zxn = TimerSystem_1.TimerSystem.Delay(() => {
          this.Zxn();
        }, t));
    }),
      this.YZt.Enable();
    var t =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          i.ExternalSourceSetting,
        ),
      e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i);
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(
      t.AudioEventPath,
      e,
      t.ExternalSrcName,
      this.lZi,
      void 0,
      PlotTextLogic_1.PLAY_FLAG,
      this.YZt.AudioDelegate,
    ),
      (this._Zi = TimerSystem_1.TimerSystem.Delay(() => {
        Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 5, "加载剧情音频超时"),
          this.ClearCurPlayAudio();
      }, MAX_LOAD_AUDIO_TIME));
  }
  static ClearCurPlayAudio() {
    (this.XBn = ""),
      this.YZt.Disable(),
      AudioController_1.AudioController.StopEvent(this.lZi, !0, BREAK_TIME),
      this.aZi(),
      this.Zxn(!1);
  }
  static aZi() {
    TimerSystem_1.TimerSystem.Has(this._Zi) &&
      TimerSystem_1.TimerSystem.Remove(this._Zi),
      (this._Zi = void 0);
  }
  static Zxn(t = !0, i) {
    this.UPn && t && (this.UPn(i), (this.UPn = void 0)),
      TimerSystem_1.TimerSystem.Has(this.zxn) &&
        TimerSystem_1.TimerSystem.Remove(this.zxn),
      (this.XBn = ""),
      (this.zxn = void 0);
  }
  static IsPlayingAudio(t) {
    return this.XBn === t;
  }
  static ResetPlayEndCallBack(t) {
    this.UPn = t;
  }
}
((exports.HandBookQuestPlotTalkAudioUtil = HandBookQuestPlotTalkAudioUtil).lZi =
  new AudioController_1.PlayResult()),
  (HandBookQuestPlotTalkAudioUtil.YZt =
    new PlotTextLogic_1.PlotAudioDelegate()),
  (HandBookQuestPlotTalkAudioUtil._Zi = void 0),
  (HandBookQuestPlotTalkAudioUtil.zxn = void 0),
  (HandBookQuestPlotTalkAudioUtil.XBn = ""),
  (HandBookQuestPlotTalkAudioUtil.UPn = void 0);
//# sourceMappingURL=HandBookQuestPlotList.js.map
