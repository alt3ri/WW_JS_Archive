"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteMainView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputManager_1 = require("../../../Ui/Input/InputManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain"),
  RouletteInputManager_1 = require("../RouletteInputManager");
class RouletteMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.ffo = 0),
      (this.gfo = 0),
      (this.mpo = !1),
      (this.vfo = void 0),
      (this.dpo = void 0),
      (this.Cpo = void 0),
      (this.gpo = void 0),
      (this.Wfo = () => {
        this.CloseMe();
      }),
      (this.fpo = (t, e) => {
        var i;
        Info_1.Info.IsInGamepad() &&
          1 === e &&
          this.mpo &&
          (([e, i] = this.pfo.GetCurrentIndexAndAngle()),
          this.ppo(),
          this.vpo(),
          this.pfo.Refresh(e, i),
          this.Mpo());
      }),
      (this.Ffa = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "检测到轮盘输入变化,关闭自身", [
            "新输入类型",
            Info_1.Info.InputControllerType,
          ]),
          this.Wfo();
      }),
      (this.Epo = (t) => {
        ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
            .ShortcutKeyTag,
        ) || this.Wfo();
      });
  }
  get pfo() {
    switch (this.ffo) {
      case 0:
        return (
          this.Cpo ||
            ((this.Cpo =
              new RouletteComponentMain_1.RouletteComponentMainExplore()),
            this.Cpo.SetRootActor(this.dpo.GetOwner(), !0)),
          this.Cpo
        );
      case 1:
        return (
          this.gpo ||
            ((this.gpo =
              new RouletteComponentMain_1.RouletteComponentMainFunction()),
            this.gpo.SetRootActor(this.dpo.GetOwner(), !0)),
          this.gpo
        );
    }
  }
  OnRegisterComponent() {
    switch (((this.gfo = Info_1.Info.OperationType), this.gfo)) {
      case 2:
        this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIExtendToggle],
          [3, UE.UIExtendToggle],
          [4, UE.UIItem],
        ];
        break;
      case 1:
        this.ComponentRegisterInfos = [[0, UE.UIItem]];
    }
  }
  OnStart() {
    this.ffo = ModelManager_1.ModelManager.RouletteModel.CurrentRouletteType;
    var t = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(),
      e = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    if (
      ((this.mpo = t && e),
      (this.dpo = this.GetItem(0)),
      Info_1.Info.IsInGamepad()
        ? ((1 === this.ffo && !e && t) || (0 === this.ffo && e && !t)) &&
          this.ppo()
        : 1 === this.ffo && this.ppo(),
      2 === this.gfo)
    ) {
      const i = Info_1.Info.IsInGamepad();
      e = this.mpo;
      this.GetItem(1).SetUIActive(i && e), i && e && this.Mpo();
    }
    this.vpo();
    t = CommonParamById_1.configCommonParamById.GetFloatConfig(
      "Roulette_Main_Gamepad_DeadLimit",
    );
    (this.vfo = new RouletteInputManager_1.rouletteInputManager[
      Info_1.Info.InputControllerMainType
    ](void 0, void 0, this.OpenParam, t)),
      this.vfo.BindEvent(),
      this.vfo.OnInit(),
      (this.vfo.RouletteViewType = 1),
      this.vfo.SetEndInputEvent(this.Wfo),
      this.Spo(),
      this.vfo.ActivateInput(!0);
    const i = Info_1.Info.IsInGamepad();
    InputManager_1.InputManager.SetShowCursor(!i, !1);
  }
  Spo() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
      10,
      [19],
      !1,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        !0,
      );
  }
  OnBeforeDestroy() {
    (this.dpo = void 0),
      this.pfo && (this.pfo.TryEmitCurrentGridSelectOn(), this.pfo.Destroy()),
      (this.Cpo = void 0),
      (this.gpo = void 0),
      this.vfo && (this.vfo.Destroy(), (this.vfo = void 0));
  }
  OnAfterDestroy() {
    this.Ipo();
  }
  Ipo() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
      10,
      [19],
      !0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        !1,
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InputControllerMainTypeChange,
      this.Ffa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Epo,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.UI键盘E手柄RB,
        this.fpo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerMainTypeChange,
      this.Ffa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Epo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.UI键盘E手柄RB,
        this.fpo,
      );
  }
  OnTick(t) {
    var e;
    super.OnTick(t),
      this.IsHideOrHiding ||
        (([t, e] = this.vfo.Tick(t)), this.pfo.Refresh(t, e));
  }
  Mpo() {
    var t = 0 === this.ffo;
    this.GetExtendToggle(2).SetToggleState(t ? 1 : 0),
      this.GetExtendToggle(3).SetToggleState(t ? 0 : 1);
  }
  vpo() {
    this.zfo(),
      this.Zfo(),
      this.epo(),
      this.pfo.SetAllGridToggleSelfInteractive(!1);
  }
  epo() {
    this.pfo.RefreshRouletteType();
  }
  Zfo() {
    this.pfo.RefreshRoulettePlatformType(this.gfo);
  }
  zfo() {
    this.pfo.RefreshRouletteInputType();
  }
  ppo() {
    var t = 0 === this.ffo;
    (this.ffo = t ? 1 : 0),
      (ModelManager_1.ModelManager.RouletteModel.CurrentRouletteType =
        this.ffo);
  }
}
exports.RouletteMainView = RouletteMainView;
//# sourceMappingURL=RouletteMainView.js.map
