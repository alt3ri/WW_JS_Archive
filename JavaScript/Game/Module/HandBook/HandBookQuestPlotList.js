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
      (this.jxn = void 0),
      (this.Wxn = void 0),
      (this.GBn = void 0),
      (this.lXn = void 0),
      (this.Kxn = void 0),
      (this.OBn = void 0),
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
    (this.jxn = new HandBookQuestPlotTalkItem()),
      (this.Wxn = new HandBookQuestPlotOption()),
      (this.GBn = new HandBookQuestPlotNode()),
      (this.lXn = new HandBookQuestPlotOptionTalker()),
      this.AddChild(this.jxn),
      this.AddChild(this.Wxn);
    var t = this.GetItem(0),
      i = (t.SetUIActive(!1), this.GetItem(1)),
      s = (i.SetUIActive(!1), this.GetItem(2)),
      e = (s.SetUIActive(!1), this.GetItem(3));
    e.SetUIActive(!1),
      await Promise.all([
        this.jxn.CreateByActorAsync(t.GetOwner()),
        this.Wxn.CreateByActorAsync(i.GetOwner()),
        this.GBn.CreateByActorAsync(s.GetOwner()),
        this.lXn.CreateByActorAsync(e.GetOwner()),
      ]),
      this.Wxn.BindClickToggleBack(this.Kxn);
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
      this.jxn?.SetUiActive(!1),
      this.Wxn?.SetUiActive(!1),
      this.GBn?.SetUiActive(!1),
      this.lXn?.SetUiActive(!1),
      t.NodeText
        ? (this.GBn?.SetUiActive(!0), this.GBn?.RefreshByNodeText(t.NodeText))
        : t.TalkOption
          ? (this.Wxn?.SetUiActive(!0),
            this.Wxn.RefreshByOption(
              t.TalkOption,
              t.PlotId,
              t.TalkItemId,
              t.OptionIndex ?? 0,
              t.IsChoseOption ?? !1,
            ))
          : t.OptionTalker
            ? (this.lXn?.SetUiActive(!0),
              (s = ModelManager_1.ModelManager.FunctionModel?.GetPlayerName()),
              (e =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "ColonTag",
                ) ?? ""),
              this.lXn?.RefreshByText("" !== s ? s + e + " " : ""))
            : (this.jxn?.SetUiActive(!0),
              this.jxn.Refresh(t.TalkOwnerName, t.TalkText, t.PlotAudio)),
      this.OBn && this.OBn(t.BelongToNode);
  }
  ClearItem() {
    this.Destroy();
  }
  BindClickOptionToggleBack(t) {
    this.Kxn = t;
  }
  BindOnRefreshNode(t) {
    this.OBn = t;
  }
  GetOptionToggle() {
    return this.Wxn?.Toggle;
  }
}
exports.HandBookQuestPlotList = HandBookQuestPlotList;
class HandBookQuestPlotTalkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Qxn = !1),
      (this.Xxn = void 0),
      (this.$xn = () => {
        this.Xxn &&
          (this.Qxn
            ? HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio()
            : HandBookQuestPlotTalkAudioUtil.PlayAudio(this.Xxn, this.Yxn),
          (this.Qxn = !this.Qxn));
      }),
      (this.Yxn = () => {
        this.GetExtendToggle(3)?.SetToggleState(0), (this.Qxn = !1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.$xn]]);
  }
  Refresh(t, i, s) {
    (this.Xxn = s), this.GetText(0)?.SetText(t ?? "");
    s = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i);
    this.GetText(1)?.SetText(s ?? "");
    const e = !!this.Xxn;
    this.GetItem(2)?.SetUIActive(e);
    t = this.GetExtendToggle(3);
    t?.CanExecuteChange.Bind(() => e),
      (this.Qxn =
        e && HandBookQuestPlotTalkAudioUtil.IsPlayingAudio(this.Xxn?.Id)),
      this.Qxn && HandBookQuestPlotTalkAudioUtil.ResetPlayEndCallBack(this.Yxn),
      t?.SetToggleState(this.Qxn ? 1 : 0);
  }
}
class HandBookQuestPlotOption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Toggle = void 0),
      (this.Ezi = -1),
      (this.zxn = -1),
      (this.Zxn = 0),
      (this.DPn = void 0),
      (this.N8e = (t) => {
        this.DPn &&
          1 === t &&
          this.DPn(this.zxn, this.Ezi, this.Zxn, this.Toggle);
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
    (this.zxn = i), (this.Ezi = s), (this.Zxn = e);
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
    this.DPn = t;
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
  static PlayAudio(t, i) {
    this.YZt.Init((t) => {
      this.aZi(),
        this.UPn && this.APn(),
        (this.RPn = i),
        (this.UPn = TimerSystem_1.TimerSystem.Delay(() => {
          this.APn();
        }, t));
    }),
      this.YZt.Enable();
    var s =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          t.ExternalSourceSetting,
        ),
      e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
        t.IsCheckSex,
        t.FileName,
      ]);
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(
      s.AudioEventPath,
      e,
      s.ExternalSrcName,
      this.lZi,
      void 0,
      PlotTextLogic_1.PLAY_FLAG,
      this.YZt.AudioDelegate,
    ),
      (this.NBn = t.Id),
      (this._Zi = TimerSystem_1.TimerSystem.Delay(() => {
        Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 5, "加载剧情音频超时"),
          this.ClearCurPlayAudio();
      }, MAX_LOAD_AUDIO_TIME));
  }
  static ClearCurPlayAudio() {
    (this.NBn = ""),
      this.YZt.Disable(),
      AudioController_1.AudioController.StopEvent(this.lZi, !0, BREAK_TIME),
      this.aZi(),
      this.APn(!1);
  }
  static aZi() {
    TimerSystem_1.TimerSystem.Has(this._Zi) &&
      TimerSystem_1.TimerSystem.Remove(this._Zi),
      (this._Zi = void 0);
  }
  static APn(t = !0) {
    this.RPn && t && (this.RPn(), (this.RPn = void 0)),
      TimerSystem_1.TimerSystem.Has(this.UPn) &&
        TimerSystem_1.TimerSystem.Remove(this.UPn),
      (this.NBn = ""),
      (this.UPn = void 0);
  }
  static IsPlayingAudio(t) {
    return this.NBn === t;
  }
  static ResetPlayEndCallBack(t) {
    this.RPn = t;
  }
}
((exports.HandBookQuestPlotTalkAudioUtil = HandBookQuestPlotTalkAudioUtil).lZi =
  new AudioController_1.PlayResult()),
  (HandBookQuestPlotTalkAudioUtil.YZt =
    new PlotTextLogic_1.PlotAudioDelegate()),
  (HandBookQuestPlotTalkAudioUtil._Zi = void 0),
  (HandBookQuestPlotTalkAudioUtil.UPn = void 0),
  (HandBookQuestPlotTalkAudioUtil.NBn = ""),
  (HandBookQuestPlotTalkAudioUtil.RPn = void 0);
//# sourceMappingURL=HandBookQuestPlotList.js.map
