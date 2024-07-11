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
      (this.QYt = void 0),
      (this.XYt = void 0),
      (this.LZi = void 0),
      (this.DZi = void 0),
      (this.RZi = void 0),
      (this.UZi = void 0),
      (this.zNe = 0),
      (this.AZi = void 0),
      (this.B7 = void 0),
      (this.lZi = new AudioController_1.PlayResult()),
      (this.PZi = 0),
      (this.xZi = 0),
      (this.W1e = 0),
      (this.wZi = 1),
      (this.BZi = 1),
      (this.Ist = 0),
      (this.bZi = void 0),
      (this.qZi = void 0),
      (this.GZi = void 0),
      (this.NZi = void 0),
      (this.OZi = () => {
        var i;
        4 !== this.PZi &&
          3 !== this.PZi &&
          ((i =
            this.zNe ||
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .EndWaitTimeCenterText),
          this.kZi(i));
      }),
      (this.FZi = () => {
        if (4 === this.PZi || 3 === this.PZi) {
          let i =
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .EndWaitTimeCenterText;
          0 < this.W1e &&
            ((this.QYt.GetSelector().lineByLine = !1),
            this.VZi(!1, this.W1e),
            (i = this.W1e)),
            this.kZi(i);
        }
      }),
      (this.HZi = () => {
        this.B7 = void 0;
      }),
      (this.jZi = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            46,
            "PlotTransitionView:OnUpdatePlotCenterText",
          );
        var i,
          t,
          e = ModelManager_1.ModelManager.PlotModel.CenterText;
        (this.AZi = e).Text &&
          ((i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(
            e.Text,
          )),
          (t = this.GetText(0)).SetText(i),
          t.SetUIActive(!0),
          this.WZi(),
          this.KZi(),
          this.QZi(i.length)),
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
              this.XZi(),
              this.GetTexture(2).SetUIActive(!0),
              (this.B7 = e.Callback),
              e.Config && e.Config.TotalTime
                ? ((this.zNe = e.Config.TotalTime), this.OZi())
                : this.ExecuteCallBack())
            : (this.GetButton(3)
                .GetRootComponent()
                .SetUIActive(e.Config?.IsManualNext ?? !1),
              this.ExecuteCallBack(),
              (this.B7 = e.Callback),
              e.AutoClose &&
                (this.zNe || (this.zNe = e.Config?.TotalTime), this.OZi()),
              this.AZi.AudioId ? this.XZi() : this.pZi(),
              this.MZi()),
          ModelManager_1.ModelManager.PlotModel.CenterText.Clear();
      }),
      (this.$Zi = () => {
        void 0 === this.UZi && this.qZi && ((this.qZi = void 0), this.YZi());
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
      (this.BtnBindInfo = [[3, this.$Zi]]);
  }
  OnStart() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 46, "PlotTransitionView:OnStart"),
      (this.XYt = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.LZi = this.GetTexture(1)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.QYt = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      (this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.FZi)),
      (this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi)),
      this.GetTexture(2).SetUIActive(!1),
      (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
        ? (this.GetItem(5).SetUIActive(!0),
          this.GetButton(3).GetRootComponent())
        : ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
            ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
          ? (this.GetItem(5).SetUIActive(!0),
            this.GetButton(3).GetRootComponent().SetUIActive(!1),
            this.GetText(0))
          : this.GetItem(5)
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
  kZi(i) {
    void 0 !== this.DZi && TimerSystem_1.TimerSystem.Remove(this.DZi),
      (this.DZi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.DZi = void 0),
          this.JZi(),
          this.GetText(0).SetUIActive(!1),
          this.GetTexture(2).SetUIActive(!1),
          this.ExecuteCallBack();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
      this.HZi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotCenterText,
        this.jZi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
      this.HZi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotCenterText,
        this.jZi,
      );
  }
  pZi() {
    if (this.AZi.UniversalTone) {
      var i = this.AZi.UniversalTone.TimberId,
        t = this.AZi.UniversalTone.UniversalToneId;
      if (i && t) {
        var e =
          InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
            i,
            t,
          );
        if (e) return void this.vZi(e);
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
  vZi(i) {
    AudioController_1.AudioController.PostEventByUi(
      i.AkEvent,
      this.lZi,
      PLAY_FLAG,
    );
  }
  MZi() {
    var i,
      t,
      e = this.AZi.TalkAkEvent;
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
    this.XYt.GetPlayTween().UnregisterOnComplete(this.NZi),
      (0, puerts_1.releaseManualReleaseDelegate)(this.FZi),
      (this.GZi = void 0) !== this.DZi &&
        (TimerSystem_1.TimerSystem.Remove(this.DZi), (this.DZi = void 0)),
      void 0 !== this.RZi &&
        (TimerSystem_1.TimerSystem.Remove(this.RZi), (this.RZi = void 0)),
      void 0 !== this.qZi &&
        (TimerSystem_1.TimerSystem.Remove(this.qZi), (this.qZi = void 0)),
      this.ExecuteCallBack(),
      (this.AZi = void 0),
      (this.bZi = void 0);
  }
  VZi(i, t) {
    var e = this.XYt.GetPlayTween();
    (e.from = i ? 1 : 0), (e.to = i ? 0 : 1), (e.duration = t), this.XYt.Play();
  }
  zZi(i) {
    var t = this.XYt.GetPlayTween()?.GetTweener();
    t && (i ? (t.Pause(), this.ZZi(!0)) : (t.Resume(), this.ZZi(!1)));
  }
  eeo(i, t) {
    var e = this.LZi.GetPlayTween();
    (e.from = i ? this.GetTexture(1).GetAlpha() : 0),
      (e.to = i ? 0 : 1),
      (e.duration = t),
      this.LZi.Play();
  }
  XZi() {
    var i = StringUtils_1.StringUtils.IsEmpty(this.AZi.AudioId)
      ? void 0
      : PlotAudioById_1.configPlotAudioById.GetConfig(this.AZi.AudioId);
    i && this.teo(i);
  }
  teo(i) {
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
      this.lZi,
      void 0,
      PLAY_FLAG,
    );
  }
  ZZi(i) {
    if (this.PlayEventResult)
      if (i)
        for (const t of this.lZi.PlayingIds)
          AudioController_1.AudioController.PauseAudioByPlayId(t);
      else
        for (const e of this.lZi.PlayingIds)
          AudioController_1.AudioController.ResumeAudioByPlayId(e);
  }
  JZi() {
    AudioController_1.AudioController.StopEvent(this.lZi);
  }
  WZi() {
    var i = this.AZi,
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
  KZi() {
    var t = this.AZi.Config?.TextStyle?.FontSize;
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
  QZi(i) {
    var t = this.AZi,
      e = t.Config?.TextStyle?.ShowAnim;
    if (e) {
      (this.zNe = void 0), this.QYt.SetSelectorOffset(1);
      var s = t.Config?.IsMulLine ?? !1,
        h = this.QYt.GetSelector();
      if (
        ((h.lineByLine = s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut),
        (h.flipDirection = !h.lineByLine),
        h.SetRange(
          e.Type === IAction_1.ECenterTextShowAnim.FadeOut
            ? FADEOUTRANGE
            : TYPEWRITERRANGE,
        ),
        s && e.Type === IAction_1.ECenterTextShowAnim.TypeWriter)
      ) {
        this.PZi = 3;
        var h =
            0 < e.TextCountPerSecond
              ? e.TextCountPerSecond
              : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                  .TextAnimSpeedSeq,
          r = (this.VZi(!0, i / h), this.ieo());
        (this.Ist = h),
          1 < r &&
            ((this.wZi = 1),
            (this.xZi = this.bZi.Get(this.wZi - 1) / this.Ist),
            (this.BZi = r),
            this.oeo());
      } else if (s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.QYt.SetSelectorOffset(0), (this.PZi = 4);
        (h = e.FadeInTime), (r = this.ieo());
        this.VZi(!1, h * r),
          1 < r &&
            ((this.wZi = 1),
            (this.xZi = h),
            (this.W1e = e.FadeOutTime),
            (this.BZi = r),
            this.oeo());
      } else if (e.Type === IAction_1.ECenterTextShowAnim.TypeWriter) {
        this.PZi = 1;
        (s =
          i /
          (0 < e.TextCountPerSecond
            ? e.TextCountPerSecond
            : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .TextAnimSpeedSeq)),
          (h = (this.VZi(!0, s), t.Config?.TotalTime ?? 0));
        this.zNe = h + s;
      } else if (e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.PZi = 2;
        r = e.FadeInTime;
        const o = e.FadeOutTime;
        this.VZi(!0, r);
        i = t.Config?.TotalTime ?? 0;
        (this.RZi = TimerSystem_1.TimerSystem.Delay(
          () => {
            this.VZi(!1, o), (this.RZi = void 0);
          },
          TimeUtil_1.TimeUtil.SetTimeMillisecond(r + i),
        )),
          (this.zNe = r + i + o);
      } else this.QYt.SetSelectorOffset(0);
    } else this.QYt.SetSelectorOffset(0);
  }
  oeo() {
    this.wZi >= this.BZi ||
      (this.RZi = TimerSystem_1.TimerSystem.Delay(() => {
        this.zZi(!0), (this.RZi = void 0), this.reo();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(this.xZi)));
  }
  reo() {
    this.qZi = TimerSystem_1.TimerSystem.Delay(() => {
      (this.qZi = void 0), this.YZi();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeCenterText));
  }
  YZi() {
    this.zZi(!1),
      (this.wZi = this.wZi + 1),
      3 === this.PZi && (this.xZi = this.bZi.Get(this.wZi - 1) / this.Ist),
      this.oeo();
  }
  ieo() {
    if (!this.bZi) {
      var i = this.GetText(0),
        t = (0, puerts_1.$ref)(void 0);
      i.GetTextLineNumArray(t), (this.bZi = (0, puerts_1.$unref)(t));
      for (let i = 0; i < this.bZi.Num(); i++) {
        var e = this.bZi.Get(i);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "LineNumArray", ["element", e]);
      }
    }
    return this.bZi.Num();
  }
  FadeInScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(!1);
    var e = i?.Ease?.Duration
      ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME)
      : 1;
    i?.ScreenType === IAction_1.EFadeInScreenShowType.White &&
      this.GetTexture(1).SetColor(ColorUtils_1.ColorUtils.ColorWhile),
      this.eeo(!1, e),
      this.ExecuteCallBack(),
      (this.B7 = t),
      void 0 !== this.UZi && TimerSystem_1.TimerSystem.Remove(this.UZi),
      (this.UZi = TimerSystem_1.TimerSystem.Delay(() => {
        this.ExecuteCallBack(), (this.UZi = void 0);
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(e)));
  }
  FadeOutScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(!1);
    i = i?.Ease?.Duration
      ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME)
      : 1;
    this.eeo(!0, i),
      this.ExecuteCallBack(),
      (this.B7 = t),
      void 0 !== this.UZi && TimerSystem_1.TimerSystem.Remove(this.UZi),
      (this.UZi = TimerSystem_1.TimerSystem.Delay(() => {
        this.ExecuteCallBack(), (this.UZi = void 0);
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
  }
}
exports.PlotTransitionView = PlotTransitionView;
//# sourceMappingURL=PlotTransitionView.js.map
