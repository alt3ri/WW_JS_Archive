"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractQteView = void 0);
const UE = require("ue"),
  AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PanelQteController_1 = require("../PanelQteController"),
  PanelQteView_1 = require("./PanelQteView"),
  STOP_ANIM_TIME = 500;
class InteractQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this.xOi = void 0),
      (this.OOi = void 0),
      (this.SPe = void 0),
      (this.NTe = 0),
      (this.kOi = () => {
        this.IsQteEnd ||
          (this.OOi?.SetUIActive(!0),
          this.SPe?.PlayLevelSequenceByName("Start"));
      }),
      (this.$xt = (e) => {
        "Start" !== e ||
          this.IsQteEnd ||
          (this.SPe?.PlayLevelSequenceByName("Loop"),
          0 < this.NTe && this.FOi("Loop", 1 / this.NTe),
          (e = this.OpenParam),
          ModelManager_1.ModelManager.PanelQteModel.ResetLeftTime(e),
          this.IsMobile || (this.GetItem(1)?.SetUIActive(!0), this.Qtt?.Show()),
          (this.IsQteStart = !0));
      }),
      (this.BOi = (e, t) => {
        !this.IsQteEnd && this.IsQteStart && 0 === t && this.bOi();
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.IsMobile
        ? (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIButtonComponent],
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
          ]);
  }
  async OnBeforeStartAsync() {
    var e;
    this.IsMobile ||
      ((e = this.GetItem(2)) &&
        ((this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
        await this.Qtt.CreateByActorAsync(e.GetOwner()),
        this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.QTE交互))),
      (this.IsQteStart = !1);
  }
  OnStart() {
    this.IsMobile
      ? ((this.OOi = this.GetItem(0)),
        this.GetButton(1).OnPointDownCallBack.Bind(() => {
          this.qOi();
        }))
      : ((this.OOi = this.GetItem(0)), this.GetItem(1).SetUIActive(!1)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi)),
      this.SPe.BindSequenceCloseEvent(this.$xt),
      this.GOi(),
      this.OOi?.SetUIActive(!1),
      this.UiViewSequence.AddSequenceFinishEvent("Start", this.kOi);
  }
  OnBeforeDestroyImplement() {
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        UiManager_1.UiManager.CloseView("InteractQteView"));
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
  GOi() {
    var e = this.OpenParam;
    ModelManager_1.ModelManager.PanelQteModel.IsInQte
      ? e !==
        (e = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("PanelQte", 18, "qte handleId 不匹配"),
          UiManager_1.UiManager.CloseView("InteractQteView"))
        : ((this.NTe = e.Config.Duration),
          (this.IsQteStart = !1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("PanelQte", 18, "触发交互Qte"))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        UiManager_1.UiManager.CloseView("InteractQteView"));
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.BindAction(
          InputMappingsDefine_1.actionMappings.QTE交互,
          this.BOi,
        );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.QTE交互,
          this.BOi,
        );
  }
  qOi() {
    !this.IsQteEnd && this.IsQteStart && this.bOi();
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
        (this.xOi = void 0), UiManager_1.UiManager.CloseView("InteractQteView");
      }, STOP_ANIM_TIME)));
  }
  FOi(e, t) {
    this.OOi.GetOwner()
      .GetSequencePlayerByKey(e)
      ?.SequencePlayer?.SetPlayRate(t);
  }
}
exports.InteractQteView = InteractQteView;
//# sourceMappingURL=InteractQteView.js.map
