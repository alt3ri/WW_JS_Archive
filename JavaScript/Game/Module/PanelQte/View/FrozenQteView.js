"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FrozenQteView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const PanelQteController_1 = require("../PanelQteController");
const PanelQteView_1 = require("./PanelQteView");
const QteAnimItem_1 = require("./QteAnimItem");
const QteTipItem_1 = require("./QteTipItem");
const STOP_ANIM_TIME = 100;
const LOOP_ANIM_TIME = 230;
class FrozenQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments),
      (this.ANi = 0),
      (this.$Qt = 0),
      (this.$G = [!1, !1]),
      (this.PNi = []),
      (this.xNi = void 0),
      (this.wNi = void 0),
      (this.BNi = (t, e) => {
        this.IsQteEnd ||
          (e > 0
            ? (this.PNi[0].PressAnim(), this.bNi(1))
            : e < 0 && (this.PNi[0].PressAnim(), this.bNi(0)));
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
    let t, e;
    super.OnStart(),
      this.IsMobile
        ? ((e = this.GetButton(0)),
          (t = this.GetButton(1)),
          e.OnPointDownCallBack.Bind(() => {
            this.qNi(0);
          }),
          t.OnPointDownCallBack.Bind(() => {
            this.qNi(1);
          }),
          (e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2)),
          e.StartAnim(),
          (t = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(3)),
          t.StartAnim(LOOP_ANIM_TIME),
          this.PNi.push(e, t))
        : ((e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2)),
          e.StartAnim(0),
          this.PNi.push(e),
          this.OnPlatformChangedInner()),
      (this.wNi = new QteTipItem_1.QteTipItem()),
      this.wNi.Init(this.RootItem),
      this.wNi.Refresh("Text_FrozenQteTip_Text"),
      this.GNi();
  }
  OnBeforeShow() {
    super.OnBeforeShow(),
      ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
        this.CloseMe());
  }
  OnBeforeDestroy() {
    let t, e;
    super.OnBeforeDestroy(),
      this.IsMobile &&
        ((t = this.GetButton(0)),
        (e = this.GetButton(1)),
        t.OnPointDownCallBack.Unbind(),
        e.OnPointDownCallBack.Unbind());
    for (const i of this.PNi) i.Clear();
    this.NNi(), this.wNi.Destroy(), (this.wNi = void 0);
  }
  NNi() {
    this.xNi &&
      (TimerSystem_1.TimerSystem.Remove(this.xNi), (this.xNi = void 0));
  }
  GNi() {
    this.ANi = 0;
    let t;
    let e;
    let i = this.OpenParam;
    ModelManager_1.ModelManager.PanelQteModel.IsInQte
      ? i !==
        (i = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("PanelQte", 18, "qte handleId 不匹配"),
          this.CloseMe())
        : ((t = i.Config.MaxSuccessCount),
          (e = i.Config.MinSuccessCount),
          (this.$Qt = Math.floor(
            MathUtils_1.MathUtils.GetRandomFloatNumber(e, t + 1),
          )),
          this.InitCameraShake(i.Config),
          this.InitBuff(i.Config),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("PanelQte", 18, "触发冰冻Qte", [
              "需按次数",
              this.$Qt,
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
          this.BNi,
        );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      this.IsMobile ||
        InputDistributeController_1.InputDistributeController.UnBindAxis(
          InputMappingsDefine_1.axisMappings.UiMoveRight,
          this.BNi,
        );
  }
  OnPlatformChangedInner() {
    const t = ModelManager_1.ModelManager.PlatformModel.IsGamepad();
    const e = this.GetItem(0);
    const i = this.GetItem(1);
    e.SetUIActive(!t), i.SetUIActive(t);
  }
  qNi(t) {
    this.IsQteEnd || (this.PNi[t].PressAnim(), this.bNi(t));
  }
  bNi(t) {
    (this.$G[t] = !0),
      this.$G[0] &&
        this.$G[1] &&
        ((this.$G[0] = !1),
        (this.$G[1] = !1),
        this.ANi++,
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 18, "冰冻Qte中", ["已按次数", this.ANi]),
        this.ANi === this.$Qt) &&
        ((t = this.OpenParam),
        ModelManager_1.ModelManager.PanelQteModel.SetQteResult(t, !0),
        PanelQteController_1.PanelQteController.StopQte(t)),
      this.PlayCameraShake(),
      this.AddBuff();
  }
  HandleQteEnd() {
    if (!this.xNi) {
      for (const t of this.PNi) t.StopAnim();
      this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.xNi = void 0), this.CloseMe();
      }, STOP_ANIM_TIME);
    }
  }
}
exports.FrozenQteView = FrozenQteView;
// # sourceMappingURL=FrozenQteView.js.map
