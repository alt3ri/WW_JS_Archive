"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.YouHuQteView = void 0);
const UE = require("ue"),
  AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PanelQteController_1 = require("../PanelQteController"),
  PanelQteView_1 = require("./PanelQteView"),
  STOP_ANIM_TIME = 333,
  actionNames = [
    InputMappingsDefine_1.actionMappings.QTE数字1,
    InputMappingsDefine_1.actionMappings.QTE数字2,
    InputMappingsDefine_1.actionMappings.QTE数字3,
    InputMappingsDefine_1.actionMappings.QTE数字4,
  ];
class YouHuQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments),
      (this.dJs = []),
      (this.Pvi = void 0),
      (this.Zdn = void 0),
      (this.OOi = void 0),
      (this.SPe = void 0),
      (this.$wa = []),
      (this.RBa = []),
      (this.UBa = []),
      (this.xOi = void 0),
      (this.gJs = 0),
      (this.$xt = (e) => {
        "Start02" !== e ||
          this.IsQteEnd ||
          ((e = this.OpenParam),
          ModelManager_1.ModelManager.PanelQteModel.ResetLeftTime(e),
          (this.IsQteStart = !0));
      }),
      (this.BOi = (e, t) => {
        !this.IsQteEnd &&
          this.IsQteStart &&
          0 === t &&
          -1 !== (t = actionNames.indexOf(e)) &&
          this.bOi(t);
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.IsMobile
        ? (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
            [3, UE.UIItem],
            [4, UE.UIItem],
            [5, UE.UITexture],
            [6, UE.UINiagara],
            [7, UE.UIButtonComponent],
            [8, UE.UIButtonComponent],
            [9, UE.UIButtonComponent],
            [10, UE.UIButtonComponent],
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
            [3, UE.UIItem],
            [4, UE.UIItem],
            [5, UE.UITexture],
            [6, UE.UINiagara],
            [7, UE.UIItem],
            [8, UE.UIItem],
            [9, UE.UIItem],
            [10, UE.UIItem],
            [11, UE.UIItem],
            [12, UE.UIItem],
            [13, UE.UIItem],
            [14, UE.UIItem],
            [15, UE.UIItem],
            [16, UE.UIItem],
            [17, UE.UIItem],
            [18, UE.UIItem],
          ]);
  }
  async OnBeforeStartAsync() {
    if (!this.IsMobile) {
      for (let e = 11; e <= 14; e++) this.RBa.push(this.GetItem(e));
      for (let e = 15; e <= 18; e++) this.UBa.push(this.GetItem(e));
      var t = [];
      for (let e = 7; e <= 10; e++) {
        var i,
          s = this.GetItem(e);
        s &&
          ((i = new InputMultiKeyItem_1.InputMultiKeyItem()),
          this.dJs.push(i),
          t.push(i.CreateByActorAsync(s.GetOwner())));
      }
      await Promise.all(t);
      for (let e = 0; e < this.dJs.length; e++) {
        var r = { ActionOrAxisName: actionNames[e] };
        this.dJs[e].RefreshByActionOrAxis(r), this.dJs[e].SetActive(!0);
      }
    }
    this.IsQteStart = !1;
  }
  OnStart() {
    super.OnStart(),
      this.IsMobile
        ? ((this.Pvi = this.GetTexture(5)),
          (this.Zdn = this.GetUiNiagara(6)),
          (this.OOi = this.GetItem(0)),
          (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi)),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1)),
          ),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2)),
          ),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3)),
          ),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4)),
          ),
          this.GetButton(7).OnPointDownCallBack.Bind(() => {
            this.bOi(0);
          }),
          this.GetButton(8).OnPointDownCallBack.Bind(() => {
            this.bOi(1);
          }),
          this.GetButton(9).OnPointDownCallBack.Bind(() => {
            this.bOi(2);
          }),
          this.GetButton(10).OnPointDownCallBack.Bind(() => {
            this.bOi(3);
          }))
        : ((this.Pvi = this.GetTexture(5)),
          (this.Zdn = this.GetUiNiagara(6)),
          (this.OOi = this.GetItem(0)),
          (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi)),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1)),
          ),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2)),
          ),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3)),
          ),
          this.$wa.push(
            new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4)),
          ),
          this.xBa()),
      this.SPe.BindSequenceCloseEvent(this.$xt),
      this.GOi();
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        UiManager_1.UiManager.CloseView("YouHuQteView"));
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      this.IsMobile &&
        (this.GetButton(7).OnPointDownCallBack.Unbind(),
        this.GetButton(8).OnPointDownCallBack.Unbind(),
        this.GetButton(9).OnPointDownCallBack.Unbind(),
        this.GetButton(10).OnPointDownCallBack.Unbind()),
      this.SPe?.Clear(),
      (this.SPe = void 0);
    for (const e of this.$wa) e.Clear();
    (this.$wa.length = 0), this.NOi();
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
          UiManager_1.UiManager.CloseView("YouHuQteView"))
        : ((this.gJs =
            e.Config.Duration * TimeUtil_1.TimeUtil.InverseMillisecond),
          this.SPe?.PlayLevelSequenceByName("Start02"),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("PanelQte", 18, "触发釉瑚Qte"))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        UiManager_1.UiManager.CloseView("YouHuQteView"));
  }
  OnTick(e) {
    super.OnTick(e),
      this.IsPause ||
        this.IsQteEnd ||
        ((e = Math.max(
          ModelManager_1.ModelManager.PanelQteModel.GetLeftTimeNoScale() /
            this.gJs,
          0,
        )),
        this.Pvi?.SetFillAmount(e),
        this.Zdn?.SetNiagaraVarFloat("Dissolve", e));
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.BindActions(
          actionNames,
          this.BOi,
        );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.UnBindActions(
          actionNames,
          this.BOi,
        );
  }
  bOi(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("PanelQte", 18, "按下Qte", ["编号", e + 1]),
      this.$wa[e].PlayLevelSequenceByName("ButtonPre");
    var t = this.OpenParam,
      i = ModelManager_1.ModelManager.PanelQteModel.GetContext();
    t === i.QteHandleId && (i.BuffIndex = e),
      ModelManager_1.ModelManager.PanelQteModel.SetQteResult(t, !0),
      PanelQteController_1.PanelQteController.StopQte(t);
  }
  InputControllerChangeInner() {
    this.xBa();
  }
  xBa() {
    var e = Info_1.Info.IsInGamepad();
    for (const i of this.UBa) i.SetUIActive(e);
    var t = Info_1.Info.IsInKeyBoard();
    for (const s of this.RBa) s.SetUIActive(t);
  }
  HandleQteEnd() {
    this.xOi ||
      (AudioSystem_1.AudioSystem.SetState(
        AudioDefine_1.STATEGROUP,
        AudioDefine_1.STATENORMAL,
      ),
      this.SPe?.PlayLevelSequenceByName("Close"),
      (this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.xOi = void 0), UiManager_1.UiManager.CloseView("YouHuQteView");
      }, STOP_ANIM_TIME)));
  }
}
exports.YouHuQteView = YouHuQteView;
//# sourceMappingURL=YouHuQteView.js.map
