"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteMainView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain"),
  RouletteInputManager_1 = require("../RouletteInputManager");
class RouletteMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.ffo = 0),
      (this.RO = 1),
      (this.mpo = !1),
      (this.vfo = void 0),
      (this.dpo = void 0),
      (this.Cpo = void 0),
      (this.gpo = void 0),
      (this.Wfo = (t = !0) => {
        t && this.pfo.TryEmitCurrentGridSelectOn(), this.CloseMe();
      }),
      (this.fpo = () => {
        var t, e;
        Info_1.Info.IsInGamepad() &&
          this.mpo &&
          (([t, e] = this.pfo.GetCurrentIndexAndAngle()),
          this.ppo(),
          this.vpo(),
          ModelManager_1.ModelManager.RouletteModel.SaveRouletteActionOpenConfig(
            this.RO,
            this.ffo,
          ),
          this.pfo.Refresh(t, e),
          this.Mpo());
      }),
      (this._Ea = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "检测到轮盘输入变化,关闭自身", [
            "新输入类型",
            Info_1.Info.InputControllerType,
          ]),
          this.Wfo(!1);
      }),
      (this.Epo = (t) => {
        ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
            .ShortcutKeyTag,
        ) || this.Wfo(!1);
      }),
      (this.vQa = (t, e) => {
        1 === e && this.Wfo();
      }),
      (this.MQa = () => {
        ControllerHolder_1.ControllerHolder.RouletteController.OpenAssemblyView(
          this.ffo,
        ),
          this.Wfo(!1);
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
    switch (Info_1.Info.OperationType) {
      case 2:
        (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIExtendToggle],
          [3, UE.UIExtendToggle],
          [4, UE.UIText],
        ]),
          (this.BtnBindInfo = [
            [2, this.fpo],
            [3, this.fpo],
          ]);
        break;
      case 1:
        this.ComponentRegisterInfos = [[0, UE.UIItem]];
    }
  }
  OnStart() {
    this.OpenParam ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Phantom", 38, "[Roulette] 轮盘打开时未获取到参数"));
    var t = this.OpenParam ?? [],
      t =
        ((this.RO = 0 < t.length ? Number(t[0]) : 1),
        1 < t.length ? Number(t[1]) : void 0),
      e =
        ((this.ffo =
          ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(
            this.RO,
          )),
        ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen()),
      i = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen(),
      i =
        ((this.mpo = Info_1.Info.IsInGamepad() && e && i),
        (this.dpo = this.GetItem(0)),
        ((1 !== this.ffo || i) && (0 !== this.ffo || e)) || this.ppo(),
        2 === Info_1.Info.OperationType &&
          (this.GetItem(1).SetUIActive(this.mpo),
          this.mpo && this.Mpo(),
          this.SQa()),
        this.vpo(),
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "Roulette_Main_Gamepad_DeadLimit",
        ));
    (this.vfo = new RouletteInputManager_1.rouletteInputManager[
      Info_1.Info.InputControllerMainType
    ](void 0, void 0, t, i)),
      this.vfo.BindEvent(),
      this.vfo.OnInit(),
      (this.vfo.RouletteViewType = 1),
      this.vfo.SetEndInputEvent(this.Wfo),
      this.Spo(),
      this.vfo.ActivateInput(!0);
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
      this.pfo && this.pfo.Destroy(),
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
      this._Ea,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Epo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenRouletteSetView,
        this.MQa,
      );
    var t =
        ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[
          this.RO
        ],
      t = ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(t);
    InputDistributeController_1.InputDistributeController.BindAction(
      t,
      this.vQa,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerMainTypeChange,
      this._Ea,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Epo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenRouletteSetView,
        this.MQa,
      );
    var t =
        ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[
          this.RO
        ],
      t = ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(t);
    InputDistributeController_1.InputDistributeController.UnBindAction(
      t,
      this.vQa,
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
    this.GetExtendToggle(2).SetToggleState(t ? 1 : 0, !1),
      this.GetExtendToggle(3).SetToggleState(t ? 0 : 1, !1);
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
    this.pfo.RefreshRoulettePlatformType();
  }
  zfo() {
    this.pfo.RefreshRouletteInputType();
  }
  ppo() {
    var t = 0 === this.ffo;
    this.ffo = t ? 1 : 0;
  }
  SQa() {
    var t =
        ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[
          this.RO
        ],
      e = this.GetText(4);
    e.SetUIActive(Info_1.Info.IsInGamepad()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        e,
        "Text_ToolsClosePC_Text",
        ModelManager_1.ModelManager.RouletteModel.GetRouletteKeyRichText(t),
      );
  }
}
exports.RouletteMainView = RouletteMainView;
//# sourceMappingURL=RouletteMainView.js.map
