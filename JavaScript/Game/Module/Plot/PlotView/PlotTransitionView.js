"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTransitionView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
  InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId"),
  PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  PlotAudioModel_1 = require("../PlotAudioModel"),
  TYPEWRITERRANGE = 0.01,
  FADEOUTRANGE = 9999,
  FADEMAXTIME = 30,
  PLAY_FLAG = 8;
class PlotTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Q$t = void 0),
      (this.X$t = void 0),
      (this.Uzi = void 0),
      (this.Azi = void 0),
      (this.Pzi = void 0),
      (this.xzi = void 0),
      (this.zNe = 0),
      (this.wzi = void 0),
      (this.B7 = void 0),
      (this.czi = new AudioController_1.PlayResult()),
      (this.Bzi = 0),
      (this.bzi = 0),
      (this.W1e = 0),
      (this.qzi = 1),
      (this.Gzi = 1),
      (this.unt = 0),
      (this.Nzi = void 0),
      (this.Ozi = void 0),
      (this.kzi = void 0),
      (this.Fzi = void 0),
      (this.Vzi = () => {
        var i;
        4 !== this.Bzi &&
          3 !== this.Bzi &&
          ((i =
            this.zNe ||
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .EndWaitTimeCenterText),
          this.Hzi(i));
      }),
      (this.jzi = () => {
        if (4 === this.Bzi || 3 === this.Bzi) {
          let i =
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .EndWaitTimeCenterText;
          0 < this.W1e &&
            ((this.Q$t.GetSelector().lineByLine = !1),
            this.Wzi(!1, this.W1e),
            (i = this.W1e)),
            this.Hzi(i);
        }
      }),
      (this.Kzi = () => {
        this.B7 = void 0;
      }),
      (this.Qzi = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            46,
            "PlotTransitionView:OnUpdatePlotCenterText",
          );
        var i,
          t,
          e = ModelManager_1.ModelManager.PlotModel.CenterText;
        (this.wzi = e).Text &&
          ((i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(
            e.Text,
          )),
          (t = this.GetText(0)).SetText(i),
          t.SetUIActive(!0),
          this.Xzi(),
          this.$zi(),
          this.Yzi(i.length)),
          e.Config?.BgImageId &&
            ((t =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                e.Config.BgImageId,
              )),
            ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, (i) => {
              i?.IsValid() &&
                (this.GetTexture(2).SetTexture(i),
                this.GetTexture(2).SetUIActive(!0));
            })),
          ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
            ? ((this.zNe = 999),
              this.Jzi(),
              this.GetTexture(2).SetUIActive(!0),
              (this.B7 = e.Callback),
              this.ExecuteCallBack())
            : (this.GetButton(3)
                .GetRootComponent()
                .SetUIActive(e.Config?.IsManualNext ?? !1),
              this.ExecuteCallBack(),
              (this.B7 = e.Callback),
              e.AutoClose &&
                (this.zNe || (this.zNe = e.Config?.TotalTime), this.Vzi()),
              this.wzi.AudioId ? this.Jzi() : this.Szi(),
              this.yzi()),
          ModelManager_1.ModelManager.PlotModel.CenterText.Clear();
      }),
      (this.zzi = () => {
        void 0 === this.xzi && this.Ozi && ((this.Ozi = void 0), this.Zzi());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.zzi]]);
  }
  OnStart() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 46, "PlotTransitionView:OnStart"),
      (this.X$t = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.Uzi = this.GetTexture(1)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.Q$t = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      (this.kzi = (0, puerts_1.toManualReleaseDelegate)(this.jzi)),
      (this.Fzi = this.X$t.GetPlayTween().RegisterOnComplete(this.kzi)),
      this.GetTexture(2).SetUIActive(!1),
      (ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
      ModelManager_1.ModelManager.GameModeModel.UseShowCenterText ||
      ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              46,
              "PlotTransitionView:FadeLoading子界面开启",
            ),
          this.GetItem(5).SetUIActive(!0),
          this.GetButton(3).GetRootComponent())
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 46, "PlotTransitionView:字幕子界面开启"),
          this.GetItem(5))
      ).SetUIActive(!1);
  }
  async OnPlayingStartSequenceAsync() {
    "FadeLoadingView" === this.Info?.Name &&
      (await this.PlaySequenceAsync("Start01"));
  }
  async OnPlayingCloseSequenceAsync() {
    "FadeLoadingView" === this.Info?.Name &&
      (await this.PlaySequenceAsync("Close01"));
  }
  ExecuteCallBack() {
    var i;
    this.B7 && ((i = this.B7), (this.B7 = void 0), i());
  }
  Hzi(i) {
    void 0 !== this.Azi && TimerSystem_1.TimerSystem.Remove(this.Azi),
      (this.Azi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.Azi = void 0),
          this.eZi(),
          this.GetText(0).SetUIActive(!1),
          this.GetTexture(2).SetUIActive(!1),
          this.ExecuteCallBack();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
      this.Kzi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotCenterText,
        this.Qzi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
      this.Kzi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotCenterText,
        this.Qzi,
      );
  }
  Szi() {
    if (this.wzi.UniversalTone) {
      var i = this.wzi.UniversalTone.TimberId,
        t = this.wzi.UniversalTone.UniversalToneId;
      if (i && t) {
        var e =
          InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
            i,
            t,
          );
        if (e) return void this.Ezi(e);
      }
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          27,
          "通用语气配置无法获取，策划检查配置",
          ["timberId", i],
          ["universalToneId", t],
        );
    }
  }
  Ezi(i) {
    AudioController_1.AudioController.PostEventByUi(
      i.AkEvent,
      this.czi,
      PLAY_FLAG,
    );
  }
  yzi() {
    var i,
      t,
      e = this.wzi.TalkAkEvent;
    e &&
      (i = (0, AudioSystem_1.parseAudioEventPath)(e.AkEvent)) &&
      (e.Type === IAction_1.EPostAkEvent.Global
        ? AudioSystem_1.AudioSystem.PostEvent(i)
        : e.Type === IAction_1.EPostAkEvent.Target &&
          ((e = e.EntityId),
          (t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", e])),
          (t = t.Entity.GetComponent(1)?.Owner)?.IsValid()
            ? AudioSystem_1.AudioSystem.PostEvent(i, t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
                "entityId",
                e,
              ])));
  }
  OnBeforeDestroy() {
    this.X$t.GetPlayTween().UnregisterOnComplete(this.Fzi),
      (0, puerts_1.releaseManualReleaseDelegate)(this.jzi),
      (this.kzi = void 0) !== this.Azi &&
        (TimerSystem_1.TimerSystem.Remove(this.Azi), (this.Azi = void 0)),
      void 0 !== this.Pzi &&
        (TimerSystem_1.TimerSystem.Remove(this.Pzi), (this.Pzi = void 0)),
      void 0 !== this.Ozi &&
        (TimerSystem_1.TimerSystem.Remove(this.Ozi), (this.Ozi = void 0)),
      this.ExecuteCallBack(),
      (this.wzi = void 0),
      (this.Nzi = void 0);
  }
  Wzi(i, t) {
    var e = this.X$t.GetPlayTween();
    (e.from = i ? 1 : 0), (e.to = i ? 0 : 1), (e.duration = t), this.X$t.Play();
  }
  tZi(i) {
    var t = this.X$t.GetPlayTween()?.GetTweener();
    t && (i ? (t.Pause(), this.iZi(!0)) : (t.Resume(), this.iZi(!1)));
  }
  oZi(i, t) {
    var e = this.Uzi.GetPlayTween();
    (e.from = i ? this.GetTexture(1).GetAlpha() : 0),
      (e.to = i ? 0 : 1),
      (e.duration = t),
      this.Uzi.Play();
  }
  Jzi() {
    var i = StringUtils_1.StringUtils.IsEmpty(this.wzi.AudioId)
      ? void 0
      : PlotAudioById_1.configPlotAudioById.GetConfig(this.wzi.AudioId);
    i && this.rZi(i);
  }
  rZi(i) {
    var t =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          i.ExternalSourceSetting,
        ),
      i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
        i.IsCheckSex,
        i.FileName,
      ]);
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(
      t.AudioEventPath,
      i,
      t.ExternalSrcName,
      this.czi,
      void 0,
      PLAY_FLAG,
    );
  }
  iZi(i) {
    if (this.PlayEventResult)
      if (i)
        for (const t of this.czi.PlayingIds)
          AudioController_1.AudioController.PauseAudioByPlayId(t);
      else
        for (const e of this.czi.PlayingIds)
          AudioController_1.AudioController.ResumeAudioByPlayId(e);
  }
  eZi() {
    AudioController_1.AudioController.StopEvent(this.czi);
  }
  Xzi() {
    var i = this.wzi,
      t = this.GetText(0),
      e = i.Config?.TextStyle?.TextAlign,
      e =
        (e === IAction_1.ETextAlign.Bottom
          ? (t.SetAnchorVAlign(3),
            t.SetPivot(Vector2D_1.Vector2D.Create(0.5, -1).ToUeVector2D()))
          : e === IAction_1.ETextAlign.Top
            ? (t.SetAnchorVAlign(1),
              t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 2).ToUeVector2D()))
            : (t.SetAnchorVAlign(2),
              t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 0.5).ToUeVector2D())),
        i.Config?.TextStyle?.TextHorizontal);
    e === IAction_1.ETextHorizontal.Left
      ? t.SetParagraphHorizontalAlignment(0)
      : e === IAction_1.ETextHorizontal.Right
        ? t.SetParagraphHorizontalAlignment(2)
        : t.SetParagraphHorizontalAlignment(1),
      t.SetAnchorOffsetX(0),
      t.SetAnchorOffsetY(0);
  }
  $zi() {
    var t = this.wzi.Config?.TextStyle?.FontSize;
    if (t) {
      var e = this.GetText(0);
      let i = -1;
      t === IAction_1.EFontSize.Big
        ? (i =
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .CenterTextFontSizeBig)
        : t === IAction_1.EFontSize.Middle
          ? (i =
              ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .CenterTextFontSizeMiddle)
          : t === IAction_1.EFontSize.Small &&
            (i =
              ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .CenterTextFontSizeSmall),
        0 < i && e.SetFontSize(i);
    }
  }
  Yzi(i) {
    var t = this.wzi,
      e = t.Config?.TextStyle?.ShowAnim;
    if (e) {
      (this.zNe = void 0), this.Q$t.SetSelectorOffset(1);
      var s = t.Config?.IsMulLine ?? !1,
        o = this.Q$t.GetSelector();
      if (
        ((o.lineByLine = s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut),
        (o.flipDirection = !o.lineByLine),
        o.SetRange(
          e.Type === IAction_1.ECenterTextShowAnim.FadeOut
            ? FADEOUTRANGE
            : TYPEWRITERRANGE,
        ),
        s && e.Type === IAction_1.ECenterTextShowAnim.TypeWriter)
      ) {
        this.Bzi = 3;
        var o =
            0 < e.TextCountPerSecond
              ? e.TextCountPerSecond
              : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                  .TextAnimSpeedSeq,
          r = (this.Wzi(!0, i / o), this.nZi());
        (this.unt = o),
          1 < r &&
            ((this.qzi = 1),
            (this.bzi = this.Nzi.Get(this.qzi - 1) / this.unt),
            (this.Gzi = r),
            this.sZi());
      } else if (s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.Q$t.SetSelectorOffset(0), (this.Bzi = 4);
        (o = e.FadeInTime), (r = this.nZi());
        this.Wzi(!1, o * r),
          1 < r &&
            ((this.qzi = 1),
            (this.bzi = o),
            (this.W1e = e.FadeOutTime),
            (this.Gzi = r),
            this.sZi());
      } else if (e.Type === IAction_1.ECenterTextShowAnim.TypeWriter) {
        this.Bzi = 1;
        (s =
          i /
          (0 < e.TextCountPerSecond
            ? e.TextCountPerSecond
            : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .TextAnimSpeedSeq)),
          (o = (this.Wzi(!0, s), t.Config?.TotalTime ?? 0));
        this.zNe = o + s;
      } else if (e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.Bzi = 2;
        r = e.FadeInTime;
        const h = e.FadeOutTime;
        this.Wzi(!0, r);
        i = t.Config?.TotalTime ?? 0;
        (this.Pzi = TimerSystem_1.TimerSystem.Delay(
          () => {
            this.Wzi(!1, h), (this.Pzi = void 0);
          },
          TimeUtil_1.TimeUtil.SetTimeMillisecond(r + i),
        )),
          (this.zNe = r + i + h);
      } else this.Q$t.SetSelectorOffset(0);
    } else this.Q$t.SetSelectorOffset(0);
  }
  sZi() {
    this.qzi >= this.Gzi ||
      (this.Pzi = TimerSystem_1.TimerSystem.Delay(() => {
        this.tZi(!0), (this.Pzi = void 0), this.aZi();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(this.bzi)));
  }
  aZi() {
    this.Ozi = TimerSystem_1.TimerSystem.Delay(() => {
      (this.Ozi = void 0), this.Zzi();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeCenterText));
  }
  Zzi() {
    this.tZi(!1),
      (this.qzi = this.qzi + 1),
      3 === this.Bzi && (this.bzi = this.Nzi.Get(this.qzi - 1) / this.unt),
      this.sZi();
  }
  nZi() {
    if (!this.Nzi) {
      var i = this.GetText(0),
        t = (0, puerts_1.$ref)(void 0);
      i.GetTextLineNumArray(t), (this.Nzi = (0, puerts_1.$unref)(t));
      for (let i = 0; i < this.Nzi.Num(); i++) {
        var e = this.Nzi.Get(i);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "LineNumArray", ["element", e]);
      }
    }
    return this.Nzi.Num();
  }
  FadeInScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(!1);
    var e = i?.Ease?.Duration
      ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME)
      : 1;
    i?.ScreenType === IAction_1.EFadeInScreenShowType.White &&
      this.GetTexture(1).SetColor(ColorUtils_1.ColorUtils.ColorWhile),
      this.oZi(!1, e),
      this.ExecuteCallBack(),
      (this.B7 = t),
      void 0 !== this.xzi && TimerSystem_1.TimerSystem.Remove(this.xzi),
      (this.xzi = TimerSystem_1.TimerSystem.Delay(() => {
        this.ExecuteCallBack(), (this.xzi = void 0);
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(e)));
  }
  FadeOutScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(!1);
    i = i?.Ease?.Duration
      ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME)
      : 1;
    this.oZi(!0, i),
      this.ExecuteCallBack(),
      (this.B7 = t),
      void 0 !== this.xzi && TimerSystem_1.TimerSystem.Remove(this.xzi),
      (this.xzi = TimerSystem_1.TimerSystem.Delay(() => {
        this.ExecuteCallBack(), (this.xzi = void 0);
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
  }
}
exports.PlotTransitionView = PlotTransitionView;
//# sourceMappingURL=PlotTransitionView.js.map
