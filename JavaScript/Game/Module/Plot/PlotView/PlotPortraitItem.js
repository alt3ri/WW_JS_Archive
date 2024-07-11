"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotPortraitItem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  MonsterDisplayById_1 = require("../../../../Core/Define/ConfigQuery/MonsterDisplayById"),
  SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PlotController_1 = require("../PlotController"),
  VELOCITY_FOLLOW = 0.01,
  ARM_LENGTH_MIN = 100,
  ARM_LENGTH_MAX = 350,
  HORI_DEC_RATIO = 4,
  HORI_INC_RATIO = 0.3,
  SCALE_RATIO = 0.002,
  VO_RTPC_VALUE_MIN = -48,
  VO_RTPC_VALUE_MAX = 0,
  AUDIO_GROUP_NAME = "phone_call";
class PlotPortraitItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wJi = void 0),
      (this.Xje = 0),
      (this.BJi = void 0),
      (this.bJi = void 0),
      (this.qJi = 0),
      (this.zzt = 0),
      (this.GJi = void 0),
      (this.NJi = void 0),
      (this.OJi = !1),
      (this.EPe = void 0),
      (this.kJi = new AudioController_1.PlayResult()),
      (this.wk = void 0),
      (this.he = void 0),
      (this.FJi = void 0),
      (this.VJi = new Map([
        [0, "call_01"],
        [1, "call_02"],
        [2, "call_03"],
        [3, "call_04"],
      ])),
      (this.HJi = new Map([
        [0, "Start01"],
        [1, "Start01"],
        [2, "Start02"],
        [3, "Start03"],
      ])),
      (this.OnTick = (t) => {
        this.jJi() &&
          ((this.zzt += t),
          this.zzt < this.qJi ||
            ((this.zzt = 0), this.WJi(), this.KJi(t), this.QJi(), this.XJi()));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UINiagara],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UITexture],
      [12, UE.UINiagara],
      [13, UE.UIText],
      [14, UE.UIText],
      [15, UE.UINiagara],
    ];
  }
  async OpenAsync(t, i) {
    (this.wJi = i),
      await this.CreateThenShowByResourceIdAsync(
        "UiItem_PlotCall_Prefab",
        t,
        !0,
      );
  }
  async CloseAsync() {
    await this.HideAsync(), await this.DestroyAsync();
  }
  async SwitchAsync(t) {}
  async OnCreateAsync() {
    const i = new CustomPromise_1.CustomPromise();
    if (0 === this.wJi.Type) {
      const s = this.wJi,
        r = SpeakerById_1.configSpeakerById.GetConfig(s.WhoId);
      StringUtils_1.StringUtils.IsEmpty(r?.HeadIconAsset)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "对话人不存在或头像未配置", [
            "id",
            s.WhoId,
          ])
        : ((this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(0, r.Id)),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            r.HeadIconAsset,
            UE.Texture,
            (t) => {
              ObjectUtils_1.ObjectUtils.IsValid(t) ||
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Plot",
                    27,
                    "对话人头像资源为空",
                    ["id", s.WhoId],
                    ["path", r.HeadIconAsset],
                  )),
                (this.wk = t),
                i.SetResult();
            },
          ),
          await i.Promise);
    } else if (5 === this.wJi.Type) {
      const h = this.wJi,
        o = MonsterDisplayById_1.configMonsterDisplayById.GetConfig(
          h.MonsterDisplayId,
        );
      StringUtils_1.StringUtils.IsEmpty(o?.MonsterPileIconAsset)
        ? ((this.FJi = PublicUtil_1.PublicUtil.GetConfigIdByTable(3, o.Id)),
          (this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(2, o.Id)),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            o.MonsterPileIconAsset,
            UE.Texture,
            (t) => {
              ObjectUtils_1.ObjectUtils.IsValid(t) ||
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Plot",
                    19,
                    "怪物半身像资源为空",
                    ["id", h.MonsterDisplayId],
                    ["path", o.MonsterPileIconAsset],
                  )),
                (this.wk = t),
                i.SetResult();
            },
          ),
          await i.Promise)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "怪物显示不存在或未配置", [
            "id",
            [h.MonsterDisplayId],
          ]);
    } else {
      var t, e;
      1 === this.wJi.Type &&
        ((t = this.wJi),
        (e = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId))
          ? (this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(0, e.Id))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 27, "对话人不存在", ["id", t.WhoId]));
    }
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    switch (
      (this.$Ji(),
      (this.Xje = PlotController_1.PlotController.AddTick(this.OnTick)),
      this.wJi.Type)
    ) {
      case 0:
        this.YJi();
        break;
      case 1:
        this.JJi();
        break;
      case 2:
        this.zJi();
        break;
      case 3:
        this.ZJi();
        break;
      case 5:
        this.ezi();
    }
  }
  async OnShowAsyncImplementImplement() {
    this.OJi = !0;
    var t = new CustomPromise_1.CustomPromise(),
      i =
        (0 !== this.kJi.PlayingIds.length &&
          AudioController_1.AudioController.StopEvent(this.kJi, !0),
        AudioController_1.AudioController.SetSwitch(
          AUDIO_GROUP_NAME,
          this.VJi.get(this.wJi.Type),
          this.RootActor,
        ),
        AudioController_1.AudioController.PostEventByUi(
          ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .CallShowAudioEvent,
          this.kJi,
        ),
        this.HJi.get(this.wJi.Type));
    i && (await this.EPe.PlaySequenceAsync(i, t));
  }
  async OnHideAsyncImplementImplement() {
    AudioController_1.AudioController.PostEventByUi(
      ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CallHideAudioEvent,
      this.kJi,
    );
    var t = new CustomPromise_1.CustomPromise();
    await this.EPe.PlaySequenceAsync("Close", t), (this.OJi = !1);
  }
  OnAfterHide() {
    PlotController_1.PlotController.RemoveTick(this.Xje);
  }
  OnBeforeDestroy() {
    this.EPe.Clear(),
      (this.EPe = void 0),
      (this.wk = void 0),
      (this.he = void 0),
      (this.FJi = void 0),
      (this.zzt = 0),
      (this.Xje = 0);
  }
  YJi() {
    this.GetItem(10).SetUIActive(!0),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(4).SetUIActive(!0),
      this.GetItem(2).SetUIActive(!0),
      this.GetText(0).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
    var t = this.GetTexture(1),
      i = this.GetUiNiagara(8);
    t.SetTexture(this.wk),
      i.SetNiagaraEmitterCustomTexture("head_portrait_01", "Mask", this.wk),
      i.SetNiagaraEmitterCustomTexture("head_portrait_02", "Mask", this.wk),
      i.SetNiagaraEmitterCustomTexture("head_portrait_03", "Mask", this.wk),
      i.SetNiagaraVarFloat("Size X", t.Width),
      i.SetNiagaraVarFloat("Size Y", t.Height);
  }
  JJi() {
    this.GetItem(10).SetUIActive(!0),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(5).SetUIActive(!0),
      this.GetText(0).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
  }
  zJi() {
    this.GetItem(10).SetUIActive(!0),
      this.GetItem(6).SetUIActive(!0),
      this.GetItem(2).SetUIActive(!0);
  }
  ZJi() {
    this.GetItem(10).SetUIActive(!0),
      this.GetItem(7).SetUIActive(!0),
      this.GetItem(2).SetUIActive(!0);
  }
  ezi() {
    this.GetItem(9).SetUIActive(!0), this.GetTexture(11).SetTexture(this.wk);
    var t = this.GetUiNiagara(12);
    t.SetNiagaraEmitterCustomTexture("Frame001", "BaseTexture", this.wk),
      t.SetNiagaraEmitterCustomTexture(
        "Frame001",
        "BackgroundTexture",
        this.wk,
      ),
      this.GetText(13).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING),
      this.GetText(14).ShowTextNew(this.FJi ?? StringUtils_1.EMPTY_STRING);
  }
  $Ji() {
    this.GetItem(2).SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(7).SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(10).SetUIActive(!1);
  }
  WJi() {
    var t = Global_1.Global.BaseCharacter.K2_GetActorLocation(),
      i = (0, puerts_1.$ref)(void 0),
      i =
        (UE.GameplayStatics.ProjectWorldToScreen(
          Global_1.Global.CharacterController,
          t,
          i,
          !0,
        ),
        (0, puerts_1.$unref)(i)),
      e = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler(),
      e =
        ((this.BJi = e.ConvertPositionFromViewportToLGUICanvas(i)),
        (this.BJi.Y = UiLayer_1.UiLayer.UiRootItem.Height / 2),
        ModelManager_1.ModelManager.CameraModel.CameraLocation);
    e &&
      ((i =
        Math.pow(e.X - t.X, 2) +
        Math.pow(e.Y - t.Y, 2) +
        Math.pow(e.Z - t.Z, 2)),
      (i = Math.sqrt(i)) < ARM_LENGTH_MIN
        ? (this.BJi.X -= (ARM_LENGTH_MIN - i) * HORI_DEC_RATIO)
        : i > ARM_LENGTH_MAX &&
          ((this.BJi.X += (i - ARM_LENGTH_MAX) * HORI_INC_RATIO),
          (e = MathUtils_1.MathUtils.Clamp(
            1 - (i - ARM_LENGTH_MAX) * SCALE_RATIO,
            0.5,
            1,
          )),
          this.bJi ? this.bJi.Set(e, e, e) : (this.bJi = new UE.Vector(e))));
  }
  KJi(t) {
    var i = this.RootItem.GetAnchorOffset(),
      t = MathUtils_1.MathUtils.Clamp(t * VELOCITY_FOLLOW, 0, 1),
      e = MathUtils_1.MathUtils.Lerp(i.X, this.BJi.X, t),
      i = MathUtils_1.MathUtils.Lerp(i.Y, this.BJi.Y, t);
    this.RootItem.SetAnchorOffsetX(e), this.RootItem.SetAnchorOffsetY(i);
  }
  QJi() {
    this.bJi && this.RootItem.SetUIItemScale(this.bJi);
  }
  XJi() {}
  jJi() {
    return (
      this.OJi && this.GetActive() && void 0 !== Global_1.Global.BaseCharacter
    );
  }
}
exports.PlotPortraitItem = PlotPortraitItem;
//# sourceMappingURL=PlotPortraitItem.js.map
