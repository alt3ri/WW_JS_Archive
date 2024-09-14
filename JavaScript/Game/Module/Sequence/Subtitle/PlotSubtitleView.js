"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotSubtitleView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
  PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
  SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PlotAudioModel_1 = require("../../Plot/PlotAudioModel"),
  PlotController_1 = require("../../Plot/PlotController"),
  PlotOptionItem_1 = require("../../Plot/PlotView/PlotOptionItem"),
  PlotSkipComponent_1 = require("../../Plot/PlotView/PlotSkipComponent"),
  PlotTextLogic_1 = require("../../Plot/PlotView/PlotTextLogic"),
  UiAssistant_1 = require("../../Plot/Sequence/Assistant/UiAssistant"),
  SequenceController_1 = require("../../Plot/Sequence/SequenceController"),
  SequenceDefine_1 = require("../../Plot/Sequence/SequenceDefine"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  AUDIO_FADE_TIME = 500,
  TIME_SKIP_SEQ = 100,
  CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next",
  FADE_TIME = 200,
  DEFAULT_PATH =
    "/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI",
  OPTIONHEIGHT_OFFSET = 265,
  PAUSE_REASON = "Subtitle";
class SubtitleInfo {
  constructor() {
    (this.Cvo = new SequenceDefine_1.PlotSubtitleConfig()),
      (this.HasOption = !1),
      (this.ShowAllText = !1),
      (this.ShowOption = !1),
      (this.Skip = !1),
      (this.EnableSkipTime = 0);
  }
  get CurrentConfig() {
    return this.Cvo.Subtitles;
  }
  get CurrentDelayTime() {
    return this.Cvo.AudioDelay;
  }
  get CurrentAudioTransitionDuration() {
    return this.Cvo.AudioTransitionDuration;
  }
  HasSubtitle() {
    return void 0 !== this.Cvo.Subtitles;
  }
  SetCurrentSubtitle(t) {
    this.Cvo.CopyFrom(t), this.Hio();
  }
  Hio() {
    this.HasSubtitle() &&
      ((this.HasOption =
        0 < (this.CurrentConfig.Options?.length ?? 0) ||
        "SystemOption" === this.CurrentConfig.Type),
      (this.ShowAllText = !1),
      (this.ShowOption = !1),
      (this.EnableSkipTime =
        TimeUtil_1.TimeUtil.GetServerTimeStamp() + this.Cvo.GuardTime));
  }
  Clear() {
    this.Cvo.Clear(),
      (this.HasOption = !1),
      (this.ShowAllText = !1),
      (this.ShowOption = !1),
      (this.Skip = !1),
      (this.EnableSkipTime = 0);
  }
}
class SonUiItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.LevelSequencePlayer = void 0);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
  }
  async OpenAsync(t, i, e) {
    if (i) {
      await this.CreateThenShowByResourceIdAsync(i, t, !0),
        (this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", !0),
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", !1);
      t = (0, puerts_1.$ref)(void 0);
      if ("" !== e) {
        this.RootItem?.GetAllAttachUIChildren(t);
        var s = (0, puerts_1.$unref)(t);
        for (let t = 0; t < s.Num(); t++) {
          var h = s.Get(t);
          h.IsA(UE.UISpineRenderable.StaticClass()) &&
            h
              .GetOwner()
              ?.GetComponentByClass(
                UE.SpineSkeletonAnimationComponent.StaticClass(),
              )
              .SetAnimation(0, e, !0);
        }
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Plot", 46, "打开Ui预览图，但Ui预制体名称为空", [
          "uiName",
          i,
        ]);
  }
  PlayUiLevelSequence(t) {
    this.LevelSequencePlayer?.StopCurrentSequence(!1, !0),
      this.LevelSequencePlayer?.PlaySequencePurely(t, !1, !1);
  }
  async CloseAsync() {
    await this.LevelSequencePlayer?.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
    ),
      await this.HideAsync(),
      await this.DestroyAsync();
  }
}
class PlotSubtitleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.gvo = ""),
      (this.OptionKeys = new Array()),
      (this.OsList = new Array()),
      (this.fvo = ""),
      (this.pvo = void 0),
      (this.cZi = void 0),
      (this.mZi = void 0),
      (this.vvo = !1),
      (this.Mvo = new AudioController_1.PlayResult()),
      (this.Evo = new AudioController_1.PlayResult()),
      (this.Svo = 0),
      (this.r1t = 0),
      (this.yvo = void 0),
      (this.Ivo = void 0),
      (this._eo = void 0),
      (this.qZi = void 0),
      (this.HoverIndex = 0),
      (this.ueo = void 0),
      (this.ceo = void 0),
      (this.meo = !1),
      (this.deo = void 0),
      (this.Lrt = !0),
      (this.neo = void 0),
      (this.B8 = "LevelA"),
      (this.CurOption = new Array()),
      (this.Reo = 0),
      (this.Aeo = !1),
      (this.Sbn = !1),
      (this.xeo = !1),
      (this.weo = void 0),
      (this.Tvo = !1),
      (this.veo = void 0),
      (this.Meo = void 0),
      (this.Eeo = void 0),
      (this.Seo = void 0),
      (this.Ieo = void 0),
      (this.Teo = void 0),
      (this.Leo = void 0),
      (this.FWs = void 0),
      (this.nCa = void 0),
      (this.sCa = void 0),
      (this.iSa = void 0),
      (this.YZt = new PlotTextLogic_1.PlotAudioDelegate()),
      (this.Lvo = void 0),
      (this.Nra = 0),
      (this.TRn = () => {
        this.meo || this.ceo.SetActive(!1);
      }),
      (this.beo = () => {
        var t = new PlotOptionItem_1.PlotOptionItem(this);
        return t.BindOnHover(this.qeo), t;
      }),
      (this.qeo = (t) => {
        this.neo?.SetSelectedDisplay(!1), (this.neo = t).SetSelectedDisplay(!0);
      }),
      (this.Dvo = (t) => {
        0 < t.TalkItems.length && "LevelA" === this.B8
          ? this.gto(!0, !1)
          : this.gto(!1, !1),
          this.deo?.AddSummary(t.TalkOutline);
      }),
      (this.Rvo = () => {
        this.Neo();
      }),
      (this.t2e = () => {
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "UI点击跳过(PlotSubtitleView)",
        );
      }),
      (this.Uvo = (t) => {
        this.GetItem(22).SetUIActive(t);
      }),
      (this.OnBtnSubtitleSkipClick = () => {
        !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive ||
          !this.pvo.HasSubtitle() ||
          "CenterText" === this.CurrentSubtitle?.Type ||
          this.pvo.ShowOption ||
          this.pvo.Skip ||
          (this.vvo
            ? (this.Avo(),
              AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT))
            : this.pvo.EnableSkipTime >
                TimeUtil_1.TimeUtil.GetServerTimeStamp() ||
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Plot", 18, "点击字幕", [
                  "offset",
                  this.mZi.GetSelectorOffset(),
                ]),
              this.pvo.ShowAllText || 0 === this.mZi.GetSelectorOffset()
                ? (this.Pvo(),
                  AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT))
                : this.xvo()));
      }),
      (this.OnBtnAutoClick = () => {
        let t = !1;
        var i = !ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
        (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = i),
          (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache = i)
            ? (this.GetItem(14).SetUIActive(!0), (t = !0))
            : this.GetItem(14).SetUIActive(!1),
          t &&
            ModelManager_1.ModelManager.SequenceModel.IsPlaying &&
            ModelManager_1.ModelManager.SequenceModel.IsPaused &&
            ((this.pvo.HasSubtitle() && this.pvo.HasOption) || this.Avo());
      }),
      (this.zeo = () => {
        var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
        (t.IsAutoPlay = !1), (t.IsAutoPlayCache = !1), this.Oeo(), this.fha();
      }),
      (this.uCa = () => {
        this.pha();
      }),
      (this.Zeo = () => {
        this.fha(), (this.Lrt = !1);
        var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
        (t.IsAutoPlay = !1), (t.IsAutoPlayCache = !1), this.Oeo();
      }),
      (this.Geo = () => {
        this.neo?.SetSelectedDisplay(!1);
        var i = this.ceo.GetDisplayGridEndIndex();
        for (let t = 0; t <= i; t++) {
          var e = this.ceo.GetLayoutItemByIndex(t);
          if (e?.GetActive() && !(t < i && e.CheckToggleGray()))
            return (
              (this.neo = e),
              this.neo?.SetSelectedDisplay(!0),
              void UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
                this.neo.GetToggleItem().GetRootComponent(),
                !0,
              )
            );
        }
      }),
      (this.Qzi = (t) => {
        this.RootItem.SetUIActive(!t);
      }),
      (this.lei = (t) => {
        (this.r1t = t),
          (this.Lvo = TimerSystem_1.TimerSystem.Delay(this.wvo, this.r1t));
      }),
      (this.wvo = () => {
        (this.Lvo = void 0),
          this.pvo?.HasSubtitle() &&
            this.vvo &&
            !this.pvo.ShowOption &&
            this.Bvo() &&
            this.Avo();
      }),
      (this.Fbn = 0),
      (this.Vbn = 0),
      (this.Hbn = void 0),
      (this.jbn = void 0),
      (this.Wbn = () => {
        this.Kbn();
        var s = this.GetScrollView(25),
          h = this.GetItem(26);
        if (s) {
          var o = this.GetText(5),
            r = o.GetTextRenderSize().Y,
            s = s.GetRootComponent();
          if (r <= this.Nra)
            s.SetHeight(this.Nra), h?.SetHeight(this.Nra + OPTIONHEIGHT_OFFSET);
          else {
            var n = o.GetRenderLineNum(),
              _ = o.GetFontSpaceFinal().Y;
            if (n <= 6)
              s.SetHeight(r + _), h?.SetHeight(r + _ + OPTIONHEIGHT_OFFSET);
            else {
              let i = 0;
              for (let t = 1; t <= 6; t++) i += o.GetRenderLineHeight(t) + _;
              s.SetHeight(i), h?.SetHeight(i + OPTIONHEIGHT_OFFSET);
              r = this.Qbn();
              let t =
                CommonParamById_1.configCommonParamById.GetIntConfig(
                  "PlotAutoScrollDelayCharNum",
                ) ?? 25;
              (s = o.GetDisplayCharLength()),
                (h = ((t = s <= t ? o.GetRenderLineCharNum(0) : t) / r) * 1e3),
                (s = s - t);
              let e = s;
              1 < n && (e = s - o.GetRenderLineCharNum(0)),
                (this.Fbn = (e / r) * 1e3),
                (this.jbn = TimerSystem_1.TimerSystem.Delay(this.Xbn, h));
            }
          }
        }
      }),
      (this.Xbn = () => {
        this.Vbn = 0;
        this.Hbn = TimerSystem_1.TimerSystem.Forever(() => {
          var t = this.Vbn / this.Fbn;
          this.GetScrollView(25)?.SetScrollProgress(t),
            1 <= t &&
              TimerSystem_1.TimerSystem.Has(this.Hbn) &&
              TimerSystem_1.TimerSystem.Remove(this.Hbn),
            (this.Vbn += 100);
        }, 100);
      }),
      (this.keo = async (t) => {
        this.pvo.HasSubtitle()
          ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "剧情Seq字幕重复触发",
              ["curId", this.pvo.CurrentConfig.Id],
              ["newId", t.Subtitles.Id],
            )
          : (this.bvo(),
            this.pvo.Clear(),
            this.pvo.SetCurrentSubtitle(t),
            await this.Cbn(t?.Subtitles?.BackgroundConfig, () => {
              this.qvo();
            }));
      }),
      (this.Gvo = (t) => {
        var i = this.pvo.Skip;
        this.eMo(), this.kvo(), i ? this.Nvo() : this.vvo && this.Avo();
      }),
      (this.rAt = (t) => {
        !t || this.Lrt || ((this.Lrt = !0), this.pha());
      }),
      (this.eto = (t, i) => {
        0 !== i.TouchType || this.Lrt || ((this.Lrt = !0), this.pha());
      }),
      (this.Ovo = (t, i) => {
        this.pvo.HasSubtitle() &&
          this.CurrentSubtitle.Id === t &&
          (i
            ? this.pvo.HasOption
              ? (this.pvo.Skip = !0)
              : (this.kvo(), this.Nvo())
            : this.pvo.ShowOption
              ? this.Fvo()
              : this.pvo.HasOption
                ? (this.Vvo(), this.Fvo())
                : ((t = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
                  "LevelA" !== this.B8 &&
                  (t - this.Svo < this.r1t || !this.Bvo()) &&
                  this.pvo.EnableSkipTime <= t
                    ? this.Fvo()
                    : (this.bvo(), this.kvo())));
      }),
      (this.Hvo = () => {
        this.pvo.HasSubtitle() &&
          (this.bvo(), this.kvo(), this.jvo(), this.Wvo());
      }),
      (this.Kvo = (t, i, e) => {
        var s;
        t
          ? (t = PlotAudioById_1.configPlotAudioById.GetConfig(i))
            ? ((s =
                ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
                  t.ExternalSourceSetting,
                )),
              (t =
                PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t)),
              AudioController_1.AudioController.PostEventByExternalSourcesByUi(
                s.AudioEventPath,
                t,
                s.ExternalSrcName,
                this.Evo,
                void 0,
                0,
                void 0,
              ))
            : ControllerHolder_1.ControllerHolder.FlowController.LogError(
                "读取语音配置为空",
                ["audioKey", i],
              )
          : this.Wvo();
      }),
      (this.tto = async (t, i, e, s) => {
        this.ito(),
          (this.Aeo = t),
          (this.weo = i),
          t
            ? i
              ? await this.FadeInBgPhoto(e, s)
              : await this.FadeInBgPhotoMiddle(e, s)
            : ((this.weo = !0),
              await this.FadeOutBgPhoto(),
              (this.weo = !1),
              await this.FadeOutBgPhotoMiddle(),
              s && s());
      }),
      (this.sto = (t) => {
        this.Reo < 0 && (this.Reo = 0),
          this.Reo > FADE_TIME && (this.Reo = FADE_TIME),
          this.Aeo
            ? ((this.Reo += t),
              this.weo
                ? 1 < this.ato() && (this.hto(), this.lto())
                : 1 < this._to() && (this.hto(), this.lto()))
            : ((this.Reo -= t),
              this.weo
                ? this.ato() <= 0 && (this.hto(), this.lto())
                : this._to() <= 0 && (this.hto(), this.lto()));
      }),
      (this.lto = () => {
        this.weo
          ? this.Aeo && this.Teo
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BlackScreen", 46, "Plot图片FadeIn结束"),
              this.xeo &&
                (this.veo.SetTexture(this.Meo.GetTexture()),
                this.Meo.SetAlpha(0)),
              this.Teo.SetResult(!0),
              (this.Teo = void 0),
              (this.xeo = !0))
            : !this.Aeo &&
              this.Ieo &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BlackScreen", 46, "Plot图片FadeOut结束"),
              this.Ieo.SetResult(!0),
              (this.Ieo = void 0),
              this.SetTextureByPath(DEFAULT_PATH, this.veo),
              (this.xeo = !1))
          : this.Aeo && this.Teo
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BlackScreen", 46, "Plot Middle图片FadeIn结束"),
              this.xeo,
              this.Teo.SetResult(!0),
              (this.Teo = void 0),
              (this.xeo = !0))
            : !this.Aeo &&
              this.Ieo &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BlackScreen", 46, "Plot Middle图片FadeOut结束"),
              this.Seo?.SetUIActive(!1),
              this.Ieo.SetResult(!0),
              (this.Ieo = void 0),
              this.SetTextureByPath(DEFAULT_PATH, this.Eeo),
              (this.xeo = !1)),
          this.Leo && this.Leo();
      });
  }
  gto(t, i = !0) {
    t !== this.Tvo &&
      ((this.Tvo = t)
        ? (this.GetSprite(9).SetUIActive(!0),
          i &&
            (this.UiViewSequence.StopSequenceByKey("PlotClose"),
            this.PlaySequence("PlotStart")))
        : i
          ? (this.UiViewSequence.StopSequenceByKey("PlotStart"),
            this.PlaySequence("PlotClose"))
          : this.GetSprite(9).SetUIActive(!1));
  }
  get Options() {
    return this.ceo?.GetLayoutItemList();
  }
  get CurrentSubtitle() {
    return this.pvo?.CurrentConfig;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UILayoutBase],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIButtonComponent],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UISprite],
      [20, UE.UITexture],
      [21, UE.UITexture],
      [22, UE.UIItem],
      [23, UE.UITexture],
      [24, UE.UISprite],
      [25, UE.UIScrollViewComponent],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnBtnSubtitleSkipClick],
        [0, this.OnBtnAutoClick],
        [16, this.Zeo],
      ]);
  }
  OnStart() {
    this.GetButton(2).RootUIComp.SetUIActive(!1),
      (this.deo = new PlotSkipComponent_1.PlotSkipComponent(
        this.GetButton(2),
        this.t2e,
        this.zeo,
        void 0,
        this.uCa,
      )),
      this.deo.EnableSkipButton(!1),
      this.GetSprite(19).SetAlpha(0),
      (this.pvo = new SubtitleInfo()),
      (this.ceo = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(7),
        this.beo,
        this.GetItem(6).GetOwner(),
      )),
      this.ceo.SetActive(!1),
      (this.meo = !1),
      (this.cZi = this.GetItem(8)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.mZi = this.GetItem(8)
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(22).SetUIActive(!1),
      (this.Tvo = !1),
      this.GetSprite(9).SetUIActive(!1),
      (this._eo = this.GetItem(17));
    this.GetButton(1)
      .RootUIComp.GetOwner()
      .GetComponentByClass(UE.UIDraggableComponent.StaticClass())
      .SetActive(!1),
      this.Yeo(!1),
      this.Cto(!1),
      this.Neo(),
      (this.vvo = !1),
      this.AddScreenEffectPlotRoot(),
      (this.Lrt = !0),
      this.YZt.Init(this.lei),
      this.UiViewSequence.AddSequenceFinishEvent("ChoiceClose", this.TRn);
    var t = this.GetScrollView(25);
    t?.SetCanScroll(!1),
      t?.SetRayCastTargetForScrollView(!1),
      (this.Nra = t?.GetRootComponent()?.GetHeight() ?? 174),
      (this.Reo = 0),
      (this.veo = this.GetTexture(20)),
      this.veo && this.veo.SetAlpha(0),
      (this.Meo = this.GetTexture(21)),
      this.Meo && this.Meo.SetAlpha(0),
      (this.Eeo = this.GetTexture(23)),
      this.Eeo && this.Eeo.SetAlpha(0),
      (this.Seo = this.GetSprite(24)),
      this.Seo && this.Seo.SetUIActive(!1),
      (this.nCa = this.GetItem(29)),
      this.GetItem(30).SetUIActive(!1);
  }
  ResetSubtitle() {
    this.GetText(4).SetText(""),
      this.GetText(4).SetUIActive(!1),
      this.GetText(15).SetText(""),
      this.GetText(15).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetText(5).SetText(""),
      this.GetText(12).SetText(""),
      this.GetText(5).SetUIActive(!1),
      this.GetText(12).SetUIActive(!1);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !0,
    );
  }
  async OnPlayingStartSequenceAsync() {
    this.OpenParam?.DisableAnim ||
      (await this.PlaySequenceAsync("Start01", !0));
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !1,
    ),
      this.iSa?.Remove(),
      (this.iSa = void 0),
      this.GetItem(30).SetUIActive(!1);
  }
  async OnPlayingCloseSequenceAsync() {
    this.OpenParam?.DisableAnim ||
      (await this.PlaySequenceAsync("Close01", !0));
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
      this.YZt.Clear(),
      this.deo?.OnClear(),
      (this.deo = void 0),
      (this.Ieo = void 0),
      (this.Teo = void 0),
      this.SetTextureByPath(DEFAULT_PATH, this.veo),
      this.SetTextureByPath(DEFAULT_PATH, this.Meo),
      this.SetTextureByPath(DEFAULT_PATH, this.Eeo),
      (this.xeo = !1),
      (this.Reo = 0),
      this.hto(),
      this.RemoveScreenEffectPlotRoot(),
      this.Kbn(),
      this.Qvo(),
      this.jvo(),
      this.Wvo(),
      this.Xvo();
  }
  Yeo(t) {
    (ModelManager_1.ModelManager.PlotModel.CanClick = t),
      this._eo?.SetUIActive(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.NavigationRefreshPlotNextPage,
        t,
      );
  }
  Cto(t) {
    this.GetItem(18).SetUIActive(t);
  }
  Neo() {
    var t = ModelManager_1.ModelManager.PlotModel.PlotConfig,
      i = t.CanPause;
    this.GetExtendToggle(0).RootUIComp.SetUIActive(i),
      this.GetButton(16).RootUIComp.SetUIActive(i),
      this.GetButton(1).RootUIComp.SetUIActive(t.CanInteractive),
      (this.B8 = t.PlotLevel),
      this.Oeo(),
      this.ResetSubtitle();
  }
  Oeo() {
    var t = this.GetExtendToggle(0);
    ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay
      ? (t.SetToggleState(0), this.GetItem(14).SetUIActive(!0))
      : (t.SetToggleState(1), this.GetItem(14).SetUIActive(!1));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotConfigChanged,
      this.Rvo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HidePlotUi,
        this.Qzi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotDoingTextShow,
        this.Uvo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotStartShowTalk,
        this.Dvo,
      ),
      SequenceController_1.SequenceController.Event.Add(
        UiAssistant_1.ESequenceEventName.UpdateSeqSubtitle,
        this.keo,
      ),
      SequenceController_1.SequenceController.Event.Add(
        UiAssistant_1.ESequenceEventName.HandlePlotOptionSelected,
        this.Gvo,
      ),
      SequenceController_1.SequenceController.Event.Add(
        UiAssistant_1.ESequenceEventName.HandleSeqSubtitleEnd,
        this.Ovo,
      ),
      SequenceController_1.SequenceController.Event.Add(
        UiAssistant_1.ESequenceEventName.HandleSubSequenceStop,
        this.Hvo,
      ),
      SequenceController_1.SequenceController.Event.Add(
        UiAssistant_1.ESequenceEventName.HandleIndependentSeqAudio,
        this.Kvo,
      ),
      this.deo.AddEventListener(),
      InputDistributeController_1.InputDistributeController.BindTouch(
        InputMappingsDefine_1.touchIdMappings.Touch1,
        this.eto,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotConfigChanged,
      this.Rvo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HidePlotUi,
        this.Qzi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotDoingTextShow,
        this.Uvo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotStartShowTalk,
        this.Dvo,
      ),
      SequenceController_1.SequenceController.Event.Remove(
        UiAssistant_1.ESequenceEventName.UpdateSeqSubtitle,
        this.keo,
      ),
      SequenceController_1.SequenceController.Event.Remove(
        UiAssistant_1.ESequenceEventName.HandlePlotOptionSelected,
        this.Gvo,
      ),
      SequenceController_1.SequenceController.Event.Remove(
        UiAssistant_1.ESequenceEventName.HandleSeqSubtitleEnd,
        this.Ovo,
      ),
      SequenceController_1.SequenceController.Event.Remove(
        UiAssistant_1.ESequenceEventName.HandleSubSequenceStop,
        this.Hvo,
      ),
      SequenceController_1.SequenceController.Event.Remove(
        UiAssistant_1.ESequenceEventName.HandleIndependentSeqAudio,
        this.Kvo,
      ),
      this.deo.RemoveEventListener(),
      InputDistributeController_1.InputDistributeController.UnBindTouch(
        InputMappingsDefine_1.touchIdMappings.Touch1,
        this.eto,
      );
  }
  xvo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 18, "第一次点击，显示完整字幕"),
      this.Kbn(),
      this.GetScrollView(25)?.SetScrollProgress(1),
      this.cZi.Stop(),
      this.mZi.SetSelectorOffset(0),
      (this.pvo.EnableSkipTime =
        TimeUtil_1.TimeUtil.GetServerTimeStamp() + TIME_SKIP_SEQ),
      (this.pvo.ShowAllText = !0),
      this.pvo.HasOption && this.Vvo();
  }
  Pvo() {
    this.pvo.HasOption
      ? this.pvo.ShowOption || this.Vvo()
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 18, "第二次点击，跳到下一个镜头或字幕"),
        ControllerHolder_1.ControllerHolder.SequenceController.FinishSubtitle(
          this.CurrentSubtitle.Id,
        ));
  }
  fha() {
    this.GetItem(27)?.SetUIActive(!1), this.GetItem(28)?.SetUIActive(!1);
  }
  pha() {
    this.GetItem(27)?.SetUIActive(!0), this.GetItem(28)?.SetUIActive(!0);
  }
  Veo() {
    switch (this.pvo?.CurrentConfig?.Type) {
      case "Option":
        this.ResetSubtitle(),
          this.Yeo(!1),
          this.Cto(!1),
          (this.pvo.ShowAllText = !0);
        break;
      case "CenterText":
        this.$vo();
        break;
      default:
        this.Yvo(),
          this.Jvo(
            this.fvo,
            this.pvo.CurrentDelayTime,
            this.pvo.CurrentAudioTransitionDuration,
          ),
          this.zvo();
    }
  }
  Zvo() {
    this.ResetSubtitle(),
      this.jvo(),
      this.Yeo(!1),
      this.Cto(!1),
      this.Xvo(),
      this.pvo.Clear();
  }
  Vvo() {
    this.pvo?.HasOption &&
      ("SystemOption" === this.CurrentSubtitle.Type
        ? (ControllerHolder_1.ControllerHolder.PlotController.ShowSystemOption(
            this.CurrentSubtitle,
            (t) => {
              SequenceController_1.SequenceController.SelectOption(
                t,
                this.CurrentSubtitle.Id,
              );
            },
          ),
          (this.pvo.ShowOption = !0))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "显示选项", [
              "id",
              this.CurrentSubtitle?.Id,
            ]),
          (ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
          (this.pvo.ShowOption = !0),
          this.SetOptionsShow(!0),
          (this.CurOption = this.jeo(this.CurrentSubtitle.Options)),
          this.ceo.RefreshByData(this.pvo.CurrentConfig.Options, this.Geo)),
      this.zvo());
  }
  jeo(t) {
    var i = new Array();
    for (const e of t)
      ModelManager_1.ModelManager.PlotModel.CheckOptionCondition(
        e,
        this.CurrentSubtitle,
      ) && i.push(e);
    return i;
  }
  eMo() {
    this.ito();
  }
  Jvo(t, i, e) {
    StringUtils_1.StringUtils.IsEmpty(t) ||
      (PlotSubtitleView.tMo.Start(),
      (t = StringUtils_1.StringUtils.IsEmpty(t)
        ? void 0
        : PlotAudioById_1.configPlotAudioById.GetConfig(t)) &&
        ((this.Ivo = t),
        (this.Svo = TimeUtil_1.TimeUtil.GetServerTimeStamp() + i),
        this.iMo()),
      PlotSubtitleView.tMo.Stop());
  }
  zvo() {
    var t;
    this.Xvo(),
      !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive ||
      !this.pvo.HasSubtitle() ||
      this.pvo.ShowOption
        ? (this.Yeo(!1), this.Cto(!1))
        : (t =
              this.pvo.EnableSkipTime -
              TimeUtil_1.TimeUtil.GetServerTimeStamp()) < TimerSystem_1.MIN_TIME
          ? (this.Yeo(!0), this.Cto(!1))
          : (this.Yeo(!1),
            this.Cto(!0),
            (this.qZi = TimerSystem_1.TimerSystem.Delay((t) => {
              this.Yeo(!0), this.Cto(!1), (this.qZi = void 0);
            }, t)));
  }
  Xvo() {
    this.qZi &&
      (TimerSystem_1.TimerSystem.Has(this.qZi) &&
        TimerSystem_1.TimerSystem.Remove(this.qZi),
      (this.qZi = void 0));
  }
  iMo() {
    var t;
    this.Ivo &&
      ((t = this.Svo - TimeUtil_1.TimeUtil.GetServerTimeStamp()) <
      TimerSystem_1.MIN_TIME
        ? this.oMo()
        : (this.yvo = TimerSystem_1.TimerSystem.Delay(() => {
            this.Ivo && this.oMo();
          }, t)));
  }
  oMo() {
    var t =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          this.Ivo.ExternalSourceSetting,
        ),
      i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(this.Ivo);
    this.YZt.Enable(),
      AudioController_1.AudioController.PostEventByExternalSourcesByUi(
        t.AudioEventPath,
        i,
        t.ExternalSrcName,
        this.Mvo,
        void 0,
        PlotTextLogic_1.PLAY_FLAG,
        this.YZt.AudioDelegate,
      );
  }
  jvo() {
    this.Ivo &&
      (SequenceController_1.SequenceController.StopMouthAnim(),
      this.Lvo?.Remove(),
      (this.Lvo = void 0),
      (this.Svo = 0),
      (this.r1t = 0),
      this.YZt.Disable(),
      AudioController_1.AudioController.StopEvent(
        this.Mvo,
        !0,
        AUDIO_FADE_TIME,
      ),
      this.rMo(),
      (this.Ivo = void 0));
  }
  rMo() {
    void 0 !== this.yvo &&
      (TimerSystem_1.TimerSystem.Has(this.yvo) &&
        TimerSystem_1.TimerSystem.Remove(this.yvo),
      (this.yvo = void 0));
  }
  Yvo() {
    var t = this.pvo.CurrentConfig;
    if ("LevelA" === this.B8) {
      let t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.gvo);
      StringUtils_1.StringUtils.IsEmpty(t) &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "字幕为空",
          ["id", this.gvo],
        ),
        (t = this.gvo)),
        (t = this.ParseSubtitle(t)),
        this.GetText(12).SetText(t),
        this.GetText(12).SetUIActive(!0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 39, "A级", ["字幕：", t]);
    } else {
      this.gto(!0);
      var i,
        e = this.GetText(4),
        s = this.GetText(15),
        h = this.GetItem(11),
        h =
          ("InnerVoice" === t.Style?.Type
            ? (e.SetUIActive(!1), s.SetUIActive(!1), h.SetUIActive(!1))
            : ((i = (t = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId))
                ? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, t.Id)
                : void 0),
              (t = t
                ? PublicUtil_1.PublicUtil.GetConfigTextByTable(1, t.Id)
                : void 0),
              h.SetUIActive(!0),
              StringUtils_1.StringUtils.IsEmpty(i)
                ? e.SetUIActive(!1)
                : (e.SetUIActive(!0), e.SetText(i)),
              StringUtils_1.StringUtils.IsEmpty(t)
                ? s.SetUIActive(!1)
                : (s.SetUIActive(!0), s.SetText(t))),
          PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.gvo)),
        h = this.ParseSubtitle(h),
        e =
          (this.GetText(5).SetText(h),
          this.GetText(5).SetUIActive(!0),
          this.GetText(5).GetDisplayCharLength());
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "B级", ["字幕：", h]),
        this.cZi &&
          ((i =
            e /
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .TextAnimSpeedSeq),
          this.mZi.SetSelectorOffset(1),
          (this.cZi.GetPlayTween().duration = i),
          this.cZi.Play()),
        TimerSystem_1.TimerSystem.Next(this.Wbn);
    }
  }
  Qbn() {
    return ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
      .TextAnimSpeedSeq;
  }
  Kbn() {
    TimerSystem_1.TimerSystem.Has(this.Hbn) &&
      TimerSystem_1.TimerSystem.Remove(this.Hbn),
      TimerSystem_1.TimerSystem.Has(this.jbn) &&
        TimerSystem_1.TimerSystem.Remove(this.jbn);
  }
  qvo() {
    this.nMo(),
      this.sMo(),
      this.aMo(),
      this.MZi(this.pvo.CurrentConfig.TalkAkEvent),
      this.Veo();
  }
  kvo() {
    "LevelB" === this.B8 && this.hMo() && this.gto(!1), this.Zvo(), this.eMo();
  }
  hMo() {
    var t =
      ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.GetNextTalkItem();
    return (
      !t || "Option" === t?.Type || this.CurrentSubtitle?.WhoId !== t?.WhoId
    );
  }
  $vo() {
    let t = void 0;
    var i = this.gvo,
      i =
        ("" !== i
          ? ((t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(i)),
            (t = this.ParseSubtitle(t)))
          : ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "该字幕没配置对白",
              ["id", this.pvo.CurrentConfig.Id],
            ),
        ModelManager_1.ModelManager.PlotModel.CenterText);
    (i.Text = t),
      (i.AutoClose = !1),
      (i.TalkAkEvent = this.pvo?.CurrentConfig?.TalkAkEvent),
      (i.UniversalTone = this.pvo?.CurrentConfig?.UniversalTone),
      PlotController_1.PlotController.HandleShowCenterText(!0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-打开黑幕", [
          "subtitleKey",
          this.gvo,
        ]);
  }
  bvo() {
    return !(
      !this.pvo.HasSubtitle() ||
      "CenterText" !== this.pvo.CurrentConfig.Type ||
      (this.Qvo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-关闭黑幕"),
      0)
    );
  }
  Qvo() {
    UiManager_1.UiManager.IsViewOpen("PlotTransitionViewPop") &&
      UiManager_1.UiManager.CloseView("PlotTransitionViewPop");
  }
  Wvo() {
    AudioController_1.AudioController.StopEvent(this.Evo);
  }
  Nvo() {
    (this.pvo.Skip = !0),
      SequenceController_1.SequenceController.JumpToNextSubtitleOrChildSeq();
  }
  Fvo() {
    (this.vvo = !0),
      SequenceController_1.SequenceController.PauseSequence(PAUSE_REASON);
  }
  Avo() {
    SequenceController_1.SequenceController.ResumeSequence(PAUSE_REASON),
      (this.vvo = !1),
      this.kvo();
  }
  MZi(t) {
    var i, e, s;
    t &&
      (t.Type === IAction_1.EPostAkEvent.Global
        ? ((i = t.AkEvent),
          AudioController_1.AudioController.PostEvent(i, void 0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Event",
              27,
              "[PlotSubtitleView][FlowAudio][Global]",
              ["AkEvent", t?.AkEvent],
            ))
        : t.Type === IAction_1.EPostAkEvent.Target &&
          ((i = t.AkEvent),
          (e = t.EntityId),
          (s =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", e])),
          (s = s.Entity.GetComponent(1)?.Owner)?.IsValid()
            ? (AudioController_1.AudioController.PostEvent(i, s),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Event",
                  27,
                  "[PlotSubtitleView][FlowAudio][Entity]",
                  ["EntityID", e],
                  ["AkEvent", t?.AkEvent],
                ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
                "entityId",
                e,
              ])));
  }
  nMo() {
    this.gvo = this.pvo.CurrentConfig.TidTalk;
  }
  sMo() {
    (this.OptionKeys.length = 0),
      (this.OsList.length = 0),
      this.pvo.CurrentConfig.Options?.forEach((t) => {
        this.OptionKeys.push(t.TidTalkOption), this.OsList.push(t.Icon);
      });
  }
  aMo() {
    this.fvo = this.pvo.CurrentConfig?.PlayVoice
      ? this.pvo.CurrentConfig.TidTalk
      : void 0;
  }
  ito() {
    (this.CurOption.length = 0), this.SetOptionsShow(!1);
  }
  SetOptionsShow(t) {
    t !== this.meo &&
      ((this.meo = t)
        ? (this.ceo.SetActive(!0),
          this.UiViewSequence.PlaySequence("ChoiceStart"),
          this.GetItem(30).SetUIActive(!0),
          (this.iSa = TimerSystem_1.TimerSystem.Delay(() => {
            this.GetItem(30).SetUIActive(!1), (this.iSa = void 0);
          }, ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.ProtectOptionTime)))
        : (this.UiViewSequence.PlaySequence("ChoiceClose"),
          this.GetItem(30).SetUIActive(!1),
          this.iSa?.Remove(),
          (this.iSa = void 0)));
  }
  ParseSubtitle(t) {
    return t
      ? ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t)
      : "";
  }
  Bvo() {
    return (
      !(
        !this.pvo.HasSubtitle() || "CenterText" !== this.pvo.CurrentConfig.Type
      ) || ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay
    );
  }
  AddScreenEffectPlotRoot() {
    var t = (0, puerts_1.$ref)(void 0),
      i = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    i?.IsValid() &&
      (i.GetScreenEffectPlotRoot(t),
      (this.ueo = (0, puerts_1.$unref)(t)),
      (i = this.GetItem(13)),
      this.ueo?.IsValid()) &&
      (this.ueo.K2_AttachRootComponentTo(i), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Plot", 39, "PlotSubtitleView::AddScreenEffectPlotRoot");
  }
  RemoveScreenEffectPlotRoot() {
    this.ueo?.IsValid() &&
      (this.ueo.K2_DetachFromActor(), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Plot",
        39,
        "PlotSubtitleView::RemoveScreenEffectPlotRoot",
      ),
      (this.ueo = void 0);
  }
  GetOptionList() {
    return this.ceo.GetLayoutItemList();
  }
  OnTick(t) {
    this.Sbn && this.sto(t);
  }
  SimulateClickSubtitle() {
    Info_1.Info.IsBuildDevelopmentOrDebug && this.OnBtnSubtitleSkipClick();
  }
  SimulateClickOption() {
    var t;
    Info_1.Info.IsBuildDevelopmentOrDebug &&
      this.pvo.ShowOption &&
      ((t =
        ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption()),
      (t = this.GetOptionList()[t])) &&
      t.OptionClick(!0);
  }
  async Cbn(t, i) {
    var e = t;
    if (e) {
      const o = new CustomPromise_1.CustomPromise();
      var s = () => {
        i && i(), o.SetResult();
      };
      switch (((this.FWs = e.Type), e.Type)) {
        case "Clean":
          this.tto(!1, !0, void 0, s);
          break;
        case "Image":
          var h = e;
          this.RemovePhotoAtOnce(), this.tto(!0, !0, h?.ImageAsset, s);
          break;
        case "Icon":
          h = e;
          this.RemovePhotoAtOnce(), this.tto(!0, !1, h?.ImageAsset, s);
          break;
        default:
          s();
      }
      await o.Promise;
    } else
      "Clean" === this.FWs && this.RemovePhotoAtOnce(),
        (this.FWs = void 0),
        i && i();
  }
  fto() {
    this.Sbn = !0;
  }
  hto() {
    this.Sbn = !1;
  }
  ato() {
    var t = MathUtils_1.MathUtils.GetRangePct(0, FADE_TIME, this.Reo);
    if (this.xeo && this.Aeo) this.Meo.SetAlpha(t);
    else {
      if (!this.Aeo && this.veo.GetAlpha() <= 0) return 0;
      this.veo.SetAlpha(t);
    }
    return t;
  }
  _to() {
    var t = MathUtils_1.MathUtils.GetRangePct(0, FADE_TIME, this.Reo);
    return !this.Aeo && this.Eeo.GetAlpha() <= 0
      ? 0
      : (this.Eeo.SetAlpha(t), t);
  }
  async FadeInBgPhoto(t, i) {
    (this.Teo = new CustomPromise_1.CustomPromise()),
      (this.Aeo = !0),
      (this.Reo = 0),
      this.xeo
        ? t
          ? this.SetTextureByPath(t, this.Meo, void 0, () => {
              (this.Leo = i), this.fto();
            })
          : this.SetTextureByPath(DEFAULT_PATH, this.Meo, void 0, () => {
              (this.Leo = i), this.fto();
            })
        : t
          ? this.SetTextureByPath(t, this.veo, void 0, () => {
              (this.Leo = i), this.fto();
            })
          : this.SetTextureByPath(DEFAULT_PATH, this.veo, void 0, () => {
              (this.Leo = i), this.fto();
            }),
      await this.Teo.Promise;
  }
  async FadeOutBgPhoto(t) {
    (this.Reo = FADE_TIME),
      (this.Leo = t),
      (this.Ieo = new CustomPromise_1.CustomPromise()),
      this.fto(),
      await this.Ieo.Promise;
  }
  async FadeInBgPhotoMiddle(t, i) {
    (this.Teo = new CustomPromise_1.CustomPromise()),
      (this.Aeo = !0),
      (this.Reo = 0),
      t
        ? this.SetTextureByPath(t, this.Eeo, void 0, () => {
            this.Seo?.SetUIActive(!0), (this.Leo = i), this.fto();
          })
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("BlackScreen", 46, "PlotView设置图片,但未找到Path"),
          this.SetTextureByPath(DEFAULT_PATH, this.Eeo, void 0, () => {
            (this.Leo = i), this.fto();
          })),
      await this.Teo.Promise;
  }
  async FadeOutBgPhotoMiddle(t) {
    (this.Reo = FADE_TIME),
      (this.Leo = t),
      (this.Ieo = new CustomPromise_1.CustomPromise()),
      this.fto(),
      await this.Ieo.Promise;
  }
  async RemovePhotoAtOnce() {
    this.hto(),
      (this.Reo = 0),
      this.sto(0),
      (this.Leo = void 0),
      await this.Teo?.Promise;
  }
  async OpenBackgroundUi(t, i) {
    var e;
    "" === t
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 46, "Ui预览图:尝试打开预览图但uiName为空")
      : (await (e = new SonUiItem()).OpenAsync(this.nCa, t, i),
        this.sCa && (await this.CloseBackgroundUi()),
        (this.sCa = e));
  }
  async PlayUiLevelSeq(t) {
    this.sCa
      ? void 0 === t
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 46, "Ui预览图:名字为空")
        : await this.sCa.PlayUiLevelSequence(t)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 46, "Ui预览图:不存在的PlotView子类");
  }
  async CloseBackgroundUi() {
    this.sCa
      ? await this.sCa.CloseAsync()
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 46, "Ui预览图:不存在的PlotView子类");
  }
}
(exports.PlotSubtitleView = PlotSubtitleView).tMo = Stats_1.Stat.Create(
  "HandleSubtitleAudio",
);
//# sourceMappingURL=PlotSubtitleView.js.map
