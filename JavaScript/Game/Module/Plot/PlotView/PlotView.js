"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  InputController_1 = require("../../../Input/InputController"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  PlotController_1 = require("../PlotController"),
  PlotOptionItem_1 = require("./PlotOptionItem"),
  PlotSkipComponent_1 = require("./PlotSkipComponent"),
  PlotTextLogic_1 = require("./PlotTextLogic"),
  FADE_TIME = 1e3,
  ROTATE_RATE_X = 0.06,
  ROTATE_RATE_Y = 0.03,
  ZOOM_RATE = 1.2,
  DEFAULT_PATH =
    "/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI",
  CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next";
class PlotView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.neo = void 0),
      (this.CurOption = new Array()),
      (this.seo = void 0),
      (this.qZi = void 0),
      (this.InteractController = void 0),
      (this.aeo = void 0),
      (this.heo = 0),
      (this.leo = !1),
      (this._eo = void 0),
      (this.ueo = void 0),
      (this.ceo = void 0),
      (this.meo = !1),
      (this.deo = void 0),
      (this.geo = void 0),
      (this.Mbn = !1),
      (this.Sbn = !1),
      (this.veo = void 0),
      (this.Meo = void 0),
      (this.Eeo = void 0),
      (this.Seo = void 0),
      (this.yeo = void 0),
      (this.Ieo = void 0),
      (this.Teo = void 0),
      (this.Leo = void 0),
      (this.Deo = void 0),
      (this.Reo = 0),
      (this.Ueo = 0),
      (this.Aeo = !1),
      (this.Peo = !1),
      (this.Lrt = !0),
      (this.xeo = !1),
      (this.weo = void 0),
      (this.Beo = !1),
      (this.x8i = void 0),
      (this.iSa = void 0),
      (this.fya = void 0),
      (this.TRn = () => {
        this.meo || this.ceo?.SetActive(!1);
      }),
      (this.Dvo = (t) => {
        this.deo?.AddSummary(t.TalkOutline);
      }),
      (this.p3a = (t) => {
        InputController_1.InputController.InputAxis(
          InputEnums_1.EInputAxis.LookUp,
          t,
        );
      }),
      (this.f3a = (t) => {
        InputController_1.InputController.InputAxis(
          InputEnums_1.EInputAxis.Turn,
          t,
        );
      }),
      (this.v3a = (t) => {
        0 !== t &&
          ((t = t * ZOOM_RATE),
          InputController_1.InputController.InputAxis(
            InputEnums_1.EInputAxis.Zoom,
            -t,
          ));
      }),
      (this.beo = () => {
        var t = new PlotOptionItem_1.PlotOptionItem(this);
        return t.BindOnHover(this.qeo), t;
      }),
      (this.qeo = (t) => {
        this.neo?.SetSelectedDisplay(!1), (this.neo = t).SetSelectedDisplay(!0);
      }),
      (this.w8i = (t) => {
        ModelManager_1.ModelManager.PlotModel.CanControlView &&
          (this.x8i = t.GetLocalPointInPlane());
      }),
      (this.N8i = (t) => {
        ModelManager_1.ModelManager.PlotModel.CanControlView &&
          ((t = t.scrollAxisValue * ZOOM_RATE),
          InputController_1.InputController.InputAxis(
            InputEnums_1.EInputAxis.Zoom,
            t,
          ));
      }),
      (this.B8i = (t) => {
        var i;
        ModelManager_1.ModelManager.PlotModel.CanControlView &&
          (1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount()
            ? (this.x8i = void 0)
            : ((i = this.x8i),
              (this.x8i = t.GetLocalPointInPlane()),
              i &&
                ((t = (this.x8i.Y - i.Y) * ROTATE_RATE_Y),
                (i = (this.x8i.X - i.X) * ROTATE_RATE_X),
                InputController_1.InputController.InputAxis(
                  InputEnums_1.EInputAxis.Turn,
                  i,
                ),
                InputController_1.InputController.InputAxis(
                  InputEnums_1.EInputAxis.LookUp,
                  -t,
                ))));
      }),
      (this.b8i = (t) => {
        ModelManager_1.ModelManager.PlotModel.CanControlView &&
          (this.x8i = void 0);
      }),
      (this.Geo = () => {
        this.neo?.SetSelectedDisplay(!1);
        var i = this.ceo.GetDisplayGridEndIndex();
        for (let t = 0; t <= i; t++) {
          var s = this.ceo.GetLayoutItemByIndex(t);
          if (s?.GetActive() && !(t < i && s.CheckToggleGray()))
            return (
              (this.neo = s),
              this.neo?.SetSelectedDisplay(!0),
              void UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
                this.neo.GetToggleItem().GetRootComponent(),
                !0,
              )
            );
        }
      }),
      (this.t2e = () => {
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "UI点击跳过(PlotView)",
        );
      }),
      (this.Neo = () => {
        this.deo.EnableSkipButton(!1);
        var t = ModelManager_1.ModelManager.PlotModel.PlotConfig.CanPause;
        this.GetExtendToggle(0).RootUIComp.SetUIActive(t),
          this.GetButton(16).RootUIComp.SetUIActive(t),
          this.GetButton(1).RootUIComp.SetUIActive(!0),
          this.Oeo(),
          (this.Beo = !0),
          this.GetSprite(9).SetUIActive(this.Beo);
      }),
      (this.keo = (t) => {
        this.Feo(), (this.leo = !1), this.fya?.Remove(), (this.fya = void 0);
        var i =
          (t.CaptionParams?.StartTime ?? 0) *
          CommonDefine_1.MILLIONSECOND_PER_SECOND;
        let s = !1;
        "SystemOption" === t.Type && (s = t.OptionConfig.KeepPreTalkItem ?? !1),
          "LevelC" ===
            ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
          i > TimerSystem_1.MIN_TIME
            ? (s || this.gto(!1),
              this.ito(),
              (this.fya = TimerSystem_1.TimerSystem.Delay(() => {
                (this.fya = void 0),
                  this.geo.UpdatePlotSubtitle(t),
                  "Option" === t.Type || "SystemOption" === t.Type
                    ? this.Jeo()
                    : this.Veo(t);
              }, i)))
            : (this.geo.UpdatePlotSubtitle(t),
              "Option" === t.Type || "SystemOption" === t.Type
                ? (s || this.gto(!1), this.ito(), this.Jeo())
                : this.Veo(t));
      }),
      (this.Heo = () => {
        this.HasOptions &&
          ((ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
          this.SetOptionsShow(!0),
          (this.CurOption = this.jeo(this.geo.CurrentContent.Options)),
          this.ceo.RefreshByData(this.CurOption, this.Geo));
      }),
      (this.Weo = (t, i) => {
        this.geo.HandlePortraitVisible(this.RootItem, t, i);
      }),
      (this.Keo = (t) => {
        (this.geo.IsInteraction = !0),
          (this.InteractController = t),
          (this.aeo = PlotController_1.PlotController.GetTalkItemsOfFlow(
            this.InteractController.PreTalkConfigs,
          )),
          (this.heo = -1),
          this.aeo
            ? ((ModelManager_1.ModelManager.PlotModel.FlowListName =
                this.InteractController.PreTalkConfigs.FlowListName),
              this.Qeo())
            : this.Xeo();
      }),
      (this.CZi = () => {
        this.geo.IsInteraction
          ? this.$eo()
          : this.leo &&
            (this.HasOptions
              ? (this.Yeo(!1), this.Jeo())
              : ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay &&
                this.$eo());
      }),
      (this.OnBtnSubtitleSkipClick = () => {
        if (this.geo.IsInteraction) {
          if (!this.aeo || this.heo >= this.aeo.length) return;
        } else if (
          !ControllerHolder_1.ControllerHolder.FlowController.IsInShowTalk()
        )
          return;
        this.leo
          ? void 0 !== this.geo.SubtitleAnimationTimer
            ? this.geo.ForceSkipPlotContentAnim()
            : (this.Yeo(!1),
              this.Jeo(),
              AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT))
          : void 0 !== this.qZi &&
            void 0 === this.geo.SubtitleAnimationTimer &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "当前字幕已显示完全，但等待时间未结束，无法点到下一句",
              ["TalkId", this.geo.CurrentContent.Id],
              ["WaitTime", this.geo.CurrentContent.WaitTime],
              ["AnimationTime", this.geo.GetPlotContentAnimDuration()],
            );
      }),
      (this.OnBtnAutoClick = () => {
        var t = !ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
        (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = t),
          (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache = t)
            ? (this.geo.IsTextAnimPlaying ||
                this.HasOptions ||
                this.OnBtnSubtitleSkipClick(),
              this.GetItem(14).SetUIActive(!0))
            : (this.Feo(), this.GetItem(14).SetUIActive(!1));
      }),
      (this.zeo = () => {
        (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = !1),
          (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache =
            !1),
          this.Feo(),
          this.Oeo(),
          this.fha();
      }),
      (this.uCa = () => {
        this.pha();
      }),
      (this.Zeo = () => {
        this.fha(), (this.Lrt = !1);
        var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
        (t.IsAutoPlay = !1), (t.IsAutoPlayCache = !1), this.Feo(), this.Oeo();
      }),
      (this.Qzi = (t) => {
        this.RootItem.SetUIActive(!t);
      }),
      (this.rAt = (t) => {
        !t || this.Lrt || ((this.Lrt = !0), this.pha());
      }),
      (this.eto = (t, i) => {
        0 !== i.TouchType || this.Lrt || ((this.Lrt = !0), this.pha());
      }),
      (this.tto = async (t, i, s, e) => {
        this.ito(),
          (this.Aeo = t),
          (this.weo = i),
          t
            ? i
              ? await this.FadeInBgPhoto(s, e)
              : await this.FadeInBgPhotoMiddle(s, e)
            : ((this.weo = !0),
              await this.FadeOutBgPhoto(),
              (this.weo = !1),
              await this.FadeOutBgPhotoMiddle(),
              e && e());
      }),
      (this.oto = async (t, i) => {
        (this.Peo = t)
          ? await this.FadeInBgBlackScreen(i)
          : await this.FadeOutBgBlackScreen(i);
      }),
      (this.rto = () => {
        this.nto(), this.geo.ClearPlotContent();
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
      }),
      (this.uto = (t) => {
        this.Ueo < 0 && (this.Ueo = 0),
          this.Ueo > FADE_TIME && (this.Ueo = FADE_TIME),
          this.Peo
            ? ((this.Ueo += t), 1 < this.cto() && (this.mto(), this.dto()))
            : ((this.Ueo -= t), this.cto() < 0 && (this.mto(), this.dto()));
      }),
      (this.dto = () => {
        this.Peo && this.Teo
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 46, "Plot黑幕FadeIn结束"),
            this.Teo.SetResult(!0),
            (this.Teo = void 0))
          : !this.Peo &&
            this.Ieo &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 46, "Plot黑幕FadeOut结束"),
            this.Ieo.SetResult(!0),
            (this.Ieo = void 0)),
          this.Deo && this.Deo();
      });
  }
  get Options() {
    return this.ceo?.GetLayoutItemList();
  }
  get CurrentSubtitle() {
    return this.geo.CurrentContent;
  }
  get HasOptions() {
    return (
      !(!this.CurrentSubtitle || !this.CurrentSubtitle.Options) &&
      0 !== this.CurrentSubtitle.Options.length
    );
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
    var t = this.GetScrollView(25);
    t?.SetCanScroll(!1),
      t?.SetRayCastTargetForScrollView(!1),
      (this.geo = new PlotTextLogic_1.PlotTextCommonLogic(
        this.GetItem(3),
        this.GetText(4),
        this.GetText(15),
        this.GetText(5),
        this.GetItem(11),
        t,
        this.GetItem(26),
      )),
      this.geo.SetPlotContentAnimFinishCallback(this.CZi),
      (this.ceo = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(7),
        this.beo,
        this.GetItem(6).GetOwner(),
      )),
      this.GetButton(2).RootUIComp.SetUIActive(!1),
      (this.deo = new PlotSkipComponent_1.PlotSkipComponent(
        this.GetButton(2),
        this.t2e,
        this.zeo,
        void 0,
        this.uCa,
      )),
      this.deo.EnableSkipButton(!1),
      (this._eo = this.GetItem(17)),
      this.Yeo(!1),
      this.Cto(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetLayoutBase(7).RootUIComp.SetAlpha(1),
      this.ceo.SetActive(!1),
      (this.meo = !1),
      this.Neo(),
      this.AddScreenEffectPlotRoot(),
      (this.Reo = 0),
      (this.Ueo = 0),
      (this.veo = this.GetTexture(20)),
      this.veo && this.veo.SetAlpha(0),
      (this.Meo = this.GetTexture(21)),
      this.Meo && this.Meo.SetAlpha(0),
      (this.Eeo = this.GetTexture(23)),
      this.Eeo && this.Eeo.SetAlpha(0),
      (this.Seo = this.GetSprite(24)),
      this.Seo && this.Seo.SetUIActive(!1),
      (this.yeo = this.GetSprite(19)),
      this.yeo && this.yeo.SetAlpha(0),
      (this.Lrt = !0),
      this.UiViewSequence.AddSequenceFinishEvent("ChoiceClose", this.TRn),
      this.GetItem(30).SetUIActive(!1);
  }
  gto(t) {
    t !== this.Beo &&
      ((this.Beo = t), this.PlaySequence(t ? "PlotStart" : "PlotClose"));
  }
  async OnPlayingStartSequenceAsync() {
    this.OpenParam?.DisableAnim ||
      (await this.PlaySequenceAsync("Start01", !0));
  }
  async OnPlayingCloseSequenceAsync() {
    await this.geo.DestroyPortraitItem(),
      this.OpenParam?.DisableAnim ||
        (await this.PlaySequenceAsync("Close01", !0));
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !0,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !1,
    ),
      (ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
      this.SetTextureByPath(DEFAULT_PATH, this.veo),
      this.SetTextureByPath(DEFAULT_PATH, this.Meo),
      this.SetTextureByPath(DEFAULT_PATH, this.Eeo),
      (this.xeo = !1),
      (this.Reo = 0),
      (this.Ueo = 0),
      this.hto(),
      this.mto(),
      this.geo.ClearPlotContent(),
      this.nto(),
      this.ceo.SetActive(!1),
      this.iSa?.Remove(),
      (this.iSa = void 0),
      this.fya?.Remove(),
      (this.fya = void 0),
      this.GetItem(30).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.geo.Clear(),
      this.RemoveScreenEffectPlotRoot(),
      (this.InteractController = void 0),
      (this.Ieo = void 0),
      (this.Teo = void 0),
      (this.ceo = void 0),
      this.deo?.OnClear(),
      (this.deo = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotConfigChanged,
      this.Neo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotSubtitle,
        this.keo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowPlotSubtitleOptions,
        this.Heo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePortraitVisible,
        this.Weo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearPlotSubtitle,
        this.rto,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerPlotInteraction,
        this.Keo,
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
        EventDefine_1.EEventName.PlotViewBgFadePhoto,
        this.tto,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
        this.oto,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotStartShowTalk,
        this.Dvo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerPlotForward,
        this.p3a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerPlotRight,
        this.f3a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerPlotZoom,
        this.v3a,
      ),
      InputDistributeController_1.InputDistributeController.BindTouch(
        InputMappingsDefine_1.touchIdMappings.Touch1,
        this.eto,
      ),
      this.deo.AddEventListener();
    var t = this.GetButton(1)
      .RootUIComp.GetOwner()
      .GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    t &&
      (t.OnPointerBeginDragCallBack.Bind(this.w8i),
      t.OnPointerDragCallBack.Bind(this.B8i),
      t.OnPointerEndDragCallBack.Bind(this.b8i),
      t.OnPointerScrollCallBack.Bind(this.N8i));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotConfigChanged,
      this.Neo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotSubtitle,
        this.keo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowPlotSubtitleOptions,
        this.Heo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePortraitVisible,
        this.Weo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearPlotSubtitle,
        this.rto,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerPlotInteraction,
        this.Keo,
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
        EventDefine_1.EEventName.PlotViewBgFadePhoto,
        this.tto,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
        this.oto,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotStartShowTalk,
        this.Dvo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerPlotForward,
        this.p3a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerPlotRight,
        this.f3a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerPlotZoom,
        this.v3a,
      ),
      this.deo.RemoveEventListener(),
      InputDistributeController_1.InputDistributeController.UnBindTouch(
        InputMappingsDefine_1.touchIdMappings.Touch1,
        this.eto,
      );
    var t = this.GetButton(1)
      .RootUIComp.GetOwner()
      .GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    t &&
      (t.OnPointerDragCallBack.Unbind(),
      t.OnPointerEndDragCallBack.Unbind(),
      t.OnPointerUpCallBack.Unbind(),
      t.OnPointerScrollCallBack.Unbind());
  }
  OnTick(t) {
    this.Sbn && this.sto(t), this.Mbn && this.uto(t);
  }
  SimulateClickSubtitle() {
    Info_1.Info.IsBuildDevelopmentOrDebug && this.OnBtnSubtitleSkipClick();
  }
  SimulateClickOption() {
    if (Info_1.Info.IsBuildDevelopmentOrDebug)
      for (let t = this.Options.length - 1; 0 <= t; --t) {
        var i = this.Options[t];
        i.CheckToggleGray() || i.OptionClick(!0);
      }
  }
  fha() {
    this.GetItem(27)?.SetUIActive(!1), this.GetItem(28)?.SetUIActive(!1);
  }
  pha() {
    this.GetItem(27)?.SetUIActive(!0), this.GetItem(28)?.SetUIActive(!0);
  }
  Oeo() {
    var t = this.GetExtendToggle(0);
    ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay
      ? (t.SetToggleState(0), this.GetItem(14).SetUIActive(!0))
      : (t.SetToggleState(1), this.GetItem(14).SetUIActive(!1));
  }
  jeo(t) {
    var i = new Array();
    for (const s of t)
      ModelManager_1.ModelManager.PlotModel.CheckOptionCondition(
        s,
        this.CurrentSubtitle,
      ) && i.push(s);
    return i;
  }
  Veo(i) {
    if (
      (this.ito(),
      this.gto(!0),
      this.geo.IsInteraction ||
        !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive)
    )
      this.leo = !0;
    else {
      let t = i.WaitTime;
      void 0 === t &&
        ((t =
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.JumpWaitTime),
        (i.WaitTime = t)),
        t < ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime &&
          ((t =
            ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime),
          (i.WaitTime = t)),
        (t = TimeUtil_1.TimeUtil.SetTimeMillisecond(t)) < TimerSystem_1.MIN_TIME
          ? (this.Yeo(!0), this.Cto(!1), (this.leo = !0))
          : (this.Yeo(!1),
            this.Cto(!0),
            (this.qZi = TimerSystem_1.TimerSystem.Delay((t) => {
              if (
                (this.Cto(!1),
                (this.qZi = void 0),
                (this.leo = !0),
                !this.geo.IsTextAnimPlaying)
              ) {
                if (this.HasOptions) return void this.Jeo();
                ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay &&
                  this.$eo();
              }
              this.Yeo(!0);
            }, t)));
    }
  }
  $eo() {
    this.Feo();
    let t = 1;
    this.geo.IsInteraction
      ? (t =
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .EndWaitTimeInteraction)
      : "LevelC" ===
          ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
        (t =
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .EndWaitTimeLevelC),
      t < ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime &&
        (t = ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime),
      (t *= CommonDefine_1.MILLIONSECOND_PER_SECOND),
      (this.seo = TimerSystem_1.TimerSystem.Delay(
        () => {
          this.Yeo(!1), this.Jeo();
        },
        this.geo.PlayDelayTime <= t ? t : this.geo.PlayDelayTime,
      ));
  }
  Jeo() {
    (this.leo = !1),
      this.Feo(),
      this.geo.IsInteraction
        ? this.Qeo()
        : ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(
            this.geo.CurrentContent,
          );
  }
  Xeo() {
    var t;
    this.InteractController &&
      ((ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
      this.SetOptionsShow(!0),
      (t = this.InteractController.ShowOptions),
      this.ceo.RefreshByData(t, this.Geo));
  }
  Qeo() {
    var t;
    this.heo++,
      this.heo < this.aeo.length
        ? ((t = this.aeo[this.heo]), this.geo.PlaySubtitle(t), this.Veo(t))
        : this.heo === this.aeo.length && this.Xeo();
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
  Feo() {
    TimerSystem_1.TimerSystem.Has(this.seo) &&
      TimerSystem_1.TimerSystem.Remove(this.seo),
      (this.seo = void 0);
  }
  RemoveWaitSkipTimer() {
    TimerSystem_1.TimerSystem.Has(this.qZi) &&
      TimerSystem_1.TimerSystem.Remove(this.qZi),
      (this.qZi = void 0);
  }
  nto() {
    this.RemoveWaitSkipTimer(),
      this.Feo(),
      this.ito(),
      this.GetItem(3).SetUIActive(!1),
      this.GetText(4).SetUIActive(!1),
      this.GetText(15).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1);
  }
  ito() {
    (this.CurOption.length = 0), this.SetOptionsShow(!1), (this.neo = void 0);
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
  AddScreenEffectPlotRoot() {
    var t = (0, puerts_1.$ref)(void 0),
      i = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    i?.IsValid() &&
      (i.GetScreenEffectPlotRoot(t),
      (this.ueo = (0, puerts_1.$unref)(t)),
      (i = this.GetItem(13)),
      this.ueo?.IsValid()) &&
      (this.ueo.K2_AttachRootComponentTo(i), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Plot", 46, "PlotView::AddScreenEffectPlotRoot");
  }
  RemoveScreenEffectPlotRoot() {
    this.ueo?.IsValid() &&
      (this.ueo.K2_DetachFromActor(), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Plot", 46, "PlotView::RemoveScreenEffectPlotRoot"),
      (this.ueo = void 0);
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
  pto() {
    this.Mbn = !0;
  }
  mto() {
    this.Mbn = !1;
  }
  cto() {
    var t = MathUtils_1.MathUtils.GetRangePct(0, FADE_TIME, this.Ueo);
    return this.yeo.SetAlpha(t), t;
  }
  async FadeInBgBlackScreen(t) {
    (this.Teo = new CustomPromise_1.CustomPromise()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 46, "FadeInBgBlackScreen黑幕进入"),
      (this.Deo = t),
      this.pto(),
      await this.Teo.Promise;
  }
  async FadeOutBgBlackScreen(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("BlackScreen", 46, "FadeInBgBlackScreen黑幕退出"),
      (this.Deo = t),
      (this.Ieo = new CustomPromise_1.CustomPromise()),
      this.pto(),
      await this.Ieo.Promise;
  }
}
exports.PlotView = PlotView;
//# sourceMappingURL=PlotView.js.map
