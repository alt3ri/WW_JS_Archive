"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteMainView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
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
      (this.Wfo = (e = !0) => {
        e && this.pfo.TryEmitCurrentGridSelectOn(), this.CloseMe();
      }),
      (this.fpo = () => {
        var e, t;
        Info_1.Info.IsInGamepad() &&
          this.mpo &&
          (([e, t] = this.pfo.GetCurrentIndexAndAngle()),
          this.ppo(),
          this.vpo(),
          ModelManager_1.ModelManager.RouletteModel.SaveRouletteActionOpenConfig(
            this.RO,
            this.ffo,
          ),
          this.pfo.Refresh(e, t),
          this.Mpo());
      }),
      (this.cEa = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 37, "检测到轮盘输入变化,关闭自身", [
            "新输入类型",
            Info_1.Info.InputControllerType,
          ]),
          this.Wfo(!1);
      }),
      (this.Epo = (e) => {
        ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(
          InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
            .ShortcutKeyTag,
        ) || this.Wfo(!1);
      }),
      (this.jXa = (e, t) => {
        1 === t && this.Wfo();
      }),
      (this.WXa = () => {
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
          [5, UE.UIItem],
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
        Log_1.Log.Error("Phantom", 37, "[Roulette] 轮盘打开时未获取到参数"));
    var e = this.OpenParam ?? [],
      e =
        ((this.RO = 0 < e.length ? Number(e[0]) : 1),
        1 < e.length ? Number(e[1]) : void 0),
      t =
        ((this.ffo =
          ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(
            this.RO,
          )),
        this.pB_(),
        ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen()),
      i = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen(),
      t =
        ((this.mpo = Info_1.Info.IsInGamepad() && t && i),
        (this.dpo = this.GetItem(0)),
        ((1 !== this.ffo || i) && (0 !== this.ffo || t)) || this.ppo(),
        2 === Info_1.Info.OperationType &&
          ((t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10026)),
          this.GetItem(1).SetUIActive(Info_1.Info.IsInGamepad() && t && i),
          this.Mpo(),
          this.QXa()),
        this.vpo(),
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "Roulette_Main_Gamepad_DeadLimit",
        )),
      i = Info_1.Info.IsInKeyBoard()
        ? Vector2D_1.Vector2D.Create(this.GetRootItem().GetPositionInScreen(!0))
        : void 0;
    (this.vfo = new RouletteInputManager_1.rouletteInputManager[
      Info_1.Info.InputControllerMainType
    ](i, void 0, e, t)),
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
      this.cEa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Epo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenRouletteSetView,
        this.WXa,
      );
    var e =
        ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[
          this.RO
        ],
      e = ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(e);
    InputDistributeController_1.InputDistributeController.BindAction(
      e,
      this.jXa,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerMainTypeChange,
      this.cEa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputDistributeTagChanged,
        this.Epo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenRouletteSetView,
        this.WXa,
      );
    var e =
        ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[
          this.RO
        ],
      e = ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(e);
    InputDistributeController_1.InputDistributeController.UnBindAction(
      e,
      this.jXa,
    );
  }
  OnTick(e) {
    var t;
    super.OnTick(e),
      this.IsHideOrHiding ||
        (([e, t] = this.vfo.Tick(e)), this.pfo.Refresh(e, t));
  }
  Mpo() {
    var e = 0 === this.ffo,
      t = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(),
      i = this.GetExtendToggle(2);
    t ? i.SetToggleState(e ? 1 : 0, !1) : i.SetToggleState(2, !1),
      this.GetExtendToggle(3).SetToggleState(e ? 0 : 1, !1);
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
    var e = 0 === this.ffo;
    (this.ffo = e ? 1 : 0), this.pB_();
  }
  pB_() {
    if (2 === Info_1.Info.OperationType) {
      let e = !0;
      ((0 === this.ffo &&
        ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteReplace()) ||
        (1 === this.ffo &&
          ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteReplace())) &&
        (e = !1),
        this.GetItem(5).SetUIActive(e);
    }
  }
  QXa() {
    var e =
        ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[
          this.RO
        ],
      t = this.GetText(4);
    t.SetUIActive(Info_1.Info.IsInGamepad()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        t,
        "Text_ToolsClosePC_Text",
        ModelManager_1.ModelManager.RouletteModel.GetRouletteKeyRichText(e),
      );
  }
}
exports.RouletteMainView = RouletteMainView;
//# sourceMappingURL=RouletteMainView.js.map
