"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FrozenQteView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  PanelQteController_1 = require("../PanelQteController"),
  PanelQteView_1 = require("./PanelQteView"),
  QteAnimItem_1 = require("./QteAnimItem"),
  QteTipItem_1 = require("./QteTipItem"),
  STOP_ANIM_TIME = 100,
  LOOP_ANIM_TIME = 230;
class FrozenQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments),
      (this.AOi = 0),
      (this.$Xt = 0),
      (this.$G = [!1, !1]),
      (this.POi = []),
      (this.xOi = void 0),
      (this.wOi = void 0),
      (this.BOi = (t, e) => {
        this.IsQteEnd ||
          (0 < e
            ? (this.POi[0].PressAnim(), this.bOi(1))
            : e < 0 && (this.POi[0].PressAnim(), this.bOi(0)));
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.IsMobile
        ? (this.ComponentRegisterInfos = [
            [0, UE.UIButtonComponent],
            [1, UE.UIButtonComponent],
            [2, UE.UIItem],
            [3, UE.UIItem],
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
          ]);
  }
  OnStart() {
    var t, e;
    super.OnStart(),
      this.IsMobile
        ? ((e = this.GetButton(0)),
          (t = this.GetButton(1)),
          e.OnPointDownCallBack.Bind(() => {
            this.qOi(0);
          }),
          t.OnPointDownCallBack.Bind(() => {
            this.qOi(1);
          }),
          (e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2)),
          e.StartAnim(),
          (t = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(3)),
          t.StartAnim(LOOP_ANIM_TIME),
          this.POi.push(e, t))
        : ((e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2)),
          e.StartAnim(0),
          this.POi.push(e),
          this.InputControllerChangeInner()),
      (this.wOi = new QteTipItem_1.QteTipItem()),
      this.wOi.Init(this.RootItem),
      this.wOi.Refresh("Text_FrozenQteTip_Text"),
      this.GOi();
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        this.CloseMe());
  }
  OnBeforeDestroy() {
    var t, e;
    super.OnBeforeDestroy(),
      this.IsMobile &&
        ((t = this.GetButton(0)),
        (e = this.GetButton(1)),
        t.OnPointDownCallBack.Unbind(),
        e.OnPointDownCallBack.Unbind());
    for (const i of this.POi) i.Clear();
    this.NOi(), this.wOi.Destroy(), (this.wOi = void 0);
  }
  NOi() {
    this.xOi &&
      (TimerSystem_1.TimerSystem.Remove(this.xOi), (this.xOi = void 0));
  }
  GOi() {
    this.AOi = 0;
    var t,
      e,
      i = this.OpenParam;
    ModelManager_1.ModelManager.PanelQteModel.IsInQte
      ? i !==
        (i = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("PanelQte", 18, "qte handleId 不匹配"),
          this.CloseMe())
        : ((t = i.Config.MaxSuccessCount),
          (e = i.Config.MinSuccessCount),
          (this.$Xt = Math.floor(
            MathUtils_1.MathUtils.GetRandomFloatNumber(e, t + 1),
          )),
          this.InitCameraShake(i.Config),
          this.InitBuff(i.Config),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("PanelQte", 18, "触发冰冻Qte", [
              "需按次数",
              this.$Xt,
            ]))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        this.CloseMe());
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.BindAxis(
          InputMappingsDefine_1.axisMappings.UiMoveRight,
          this.BOi,
        );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.UnBindAxis(
          InputMappingsDefine_1.axisMappings.UiMoveRight,
          this.BOi,
        );
  }
  InputControllerChangeInner() {
    var t = Info_1.Info.IsInGamepad(),
      e = this.GetItem(0),
      i = this.GetItem(1);
    e.SetUIActive(!t), i.SetUIActive(t);
  }
  qOi(t) {
    this.IsQteEnd || (this.POi[t].PressAnim(), this.bOi(t));
  }
  bOi(t) {
    (this.$G[t] = !0),
      this.$G[0] &&
        this.$G[1] &&
        ((this.$G[0] = !1),
        (this.$G[1] = !1),
        this.AOi++,
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 18, "冰冻Qte中", ["已按次数", this.AOi]),
        this.AOi === this.$Xt) &&
        ((t = this.OpenParam),
        ModelManager_1.ModelManager.PanelQteModel.SetQteResult(t, !0),
        PanelQteController_1.PanelQteController.StopQte(t)),
      this.PlayCameraShake(),
      this.AddBuff();
  }
  HandleQteEnd() {
    if (!this.xOi) {
      for (const t of this.POi) t.StopAnim();
      this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.xOi = void 0), this.CloseMe();
      }, STOP_ANIM_TIME);
    }
  }
}
exports.FrozenQteView = FrozenQteView;
//# sourceMappingURL=FrozenQteView.js.map
