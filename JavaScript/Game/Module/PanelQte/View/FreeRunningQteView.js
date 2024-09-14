"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FreeRunningQteView = void 0);
const UE = require("ue"),
  AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PanelQteController_1 = require("../PanelQteController"),
  PanelQteView_1 = require("./PanelQteView"),
  STOP_ANIM_TIME = 500;
class FreeRunningQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this.xOi = void 0),
      (this.OOi = void 0),
      (this.DOt = void 0),
      (this.SPe = void 0),
      (this.NTe = 0),
      (this.GHa = !1),
      (this.kHa = ""),
      (this.nKa = !1),
      (this.kOi = () => {
        this.IsQteEnd ||
          (this.OOi?.SetUIActive(!0),
          this.SPe?.PlayLevelSequenceByName("Start"));
      }),
      (this.$xt = (e) => {
        "Start" !== e ||
          this.IsQteEnd ||
          (this.SPe?.PlayLevelSequenceByName("Loop"),
          0 < this.NTe &&
            (this.IsPause
              ? this.FOi("Loop", 0)
              : this.FOi("Loop", 1 / this.NTe)),
          (e = this.OpenParam),
          ModelManager_1.ModelManager.PanelQteModel.ResetLeftTime(e),
          this.IsMobile || (this.GetItem(1)?.SetUIActive(!0), this.Qtt?.Show()),
          (this.IsQteStart = !0));
      }),
      (this.rZa = () => {
        0 === Time_1.Time.TimeDilation ? this.lza() : this.hza();
      }),
      (this.BOi = (e, t) => {
        this.IsQteEnd ||
          (!this.IsQteStart && !this.nKa) ||
          (0 === t && this.bOi());
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.IsMobile
        ? (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIButtonComponent],
            [2, UE.UISprite],
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
            [3, UE.UISprite],
          ]);
  }
  async OnBeforeStartAsync() {
    this.IsMobile ||
      ((e = this.GetItem(2)) &&
        ((this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
        await this.Qtt.CreateByActorAsync(e.GetOwner())));
    var e = this.GetSprite(this.IsMobile ? 2 : 3),
      t = ModelManager_1.ModelManager.PanelQteModel.GetContext();
    e && ((this.DOt = e), await this.NHa(t.Config.Icon), e.SetUIActive(!0)),
      (this.IsQteStart = !1),
      (this.nKa = !1);
  }
  OnStart() {
    this.IsMobile
      ? ((this.OOi = this.GetItem(0)),
        this.GetButton(1).OnPointDownCallBack.Bind(() => {
          this.qOi();
        }))
      : (this.OOi = this.GetItem(0)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi)),
      this.SPe.BindSequenceCloseEvent(this.$xt),
      this.GOi();
  }
  OnAfterPlayStartSequence() {
    this.kOi();
  }
  OnBeforeDestroyImplement() {
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 68, "界面打开时qte已经结束了"),
        UiManager_1.UiManager.CloseView("FreeRunningQteView"));
  }
  OnAfterShow() {
    super.OnAfterShow(), this.hza();
  }
  OnBeforeHide() {
    this.lza(), super.OnBeforeHide();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      this.IsMobile && this.GetButton(1).OnPointDownCallBack.Unbind(),
      this.NOi();
  }
  RefreshVisible() {}
  NOi() {
    this.xOi &&
      (TimerSystem_1.TimerSystem.Remove(this.xOi), (this.xOi = void 0));
  }
  async NHa(e) {
    const t = new CustomPromise_1.CustomPromise(),
      i = e?.ToAssetPathName();
    return (
      i
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.LGUITexturePackerSpriteData,
            (e) => {
              e
                ? (this.DOt?.SetSprite(e, !1), t.SetResult())
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "PanelQte",
                    68,
                    `QTE加载图标失败, iconPath[${i}]`,
                  );
            },
            100,
          )
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("PanelQte", 68, "QTE图标路径不存在"),
          t.SetResult()),
      t.Promise
    );
  }
  GOi() {
    var e = this.OpenParam;
    ModelManager_1.ModelManager.PanelQteModel.IsInQte
      ? e !==
        (e = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("PanelQte", 68, "qte handleId 不匹配"),
          UiManager_1.UiManager.CloseView("FreeRunningQteView"))
        : ((this.NTe = e.Config.Duration),
          (this.nKa = !0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("PanelQte", 68, `触发跑酷Qte:[${e.Config.Action}]`))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 68, "界面打开时qte已经结束了"),
        UiManager_1.UiManager.CloseView("FreeRunningQteView"));
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.rZa,
      ),
      this.FHa();
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.rZa,
      ),
      this.VHa();
  }
  FHa() {
    var e;
    this.GHa ||
      ((this.GHa = !0), this.IsMobile) ||
      ((e = ModelManager_1.ModelManager.PanelQteModel.GetContext()),
      (this.kHa = e.Config.Action),
      this.Qtt?.RefreshAction(this.kHa),
      InputDistributeController_1.InputDistributeController.BindAction(
        this.kHa,
        this.BOi,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("PanelQte", 68, `跑酷QTE绑定Action: [${this.kHa}]`));
  }
  VHa() {
    this.GHa &&
      ((this.GHa = !1),
      this.IsMobile ||
        (InputDistributeController_1.InputDistributeController.UnBindAction(
          this.kHa,
          this.BOi,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 68, `跑酷QTE解绑Action: [${this.kHa}]`),
        (this.kHa = "")));
  }
  qOi() {
    this.IsQteEnd || (!this.IsQteStart && !this.nKa) || this.bOi();
  }
  bOi() {
    var e = this.OpenParam;
    ModelManager_1.ModelManager.PanelQteModel.SetQteResult(e, !0),
      PanelQteController_1.PanelQteController.StopQte(e);
  }
  HandleQteEnd() {
    this.xOi ||
      (AudioSystem_1.AudioSystem.SetState(
        AudioDefine_1.STATEGROUP,
        AudioDefine_1.STATENORMAL,
      ),
      this.IsMobile || this.GetItem(1).SetUIActive(!1),
      this.SPe?.StopCurrentSequence(),
      ModelManager_1.ModelManager.PanelQteModel.IsQteSuccess()
        ? this.SPe?.PlayLevelSequenceByName("Success")
        : this.SPe?.PlayLevelSequenceByName("Fail"),
      (this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.xOi = void 0),
          UiManager_1.UiManager.CloseView("FreeRunningQteView");
      }, STOP_ANIM_TIME)));
  }
  FOi(e, t) {
    this.OOi.GetOwner()
      .GetSequencePlayerByKey(e)
      ?.SequencePlayer?.SetPlayRate(t);
  }
  lza() {
    (this.IsPause = !0), this.xOi && this.xOi.Pause(), this.FOi("Loop", 0);
  }
  hza() {
    this.IsPause &&
      (this.xOi && this.xOi.Resume(),
      this.FOi("Loop", 1 / this.NTe),
      (this.IsPause = !1));
  }
}
exports.FreeRunningQteView = FreeRunningQteView;
//# sourceMappingURL=FreeRunningQteView.js.map
