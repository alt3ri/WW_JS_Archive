"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessViewController = void 0);
const Stack_1 = require("../../../../../../../Core/Container/Stack"),
  MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ConfirmBoxController_1 = require("../../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../../../../Help/HelpController"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  MoonChasingController_1 = require("../MoonChasingController");
class ViewStateData {
  constructor(i, t, e) {
    (this.ViewState = i),
      (this.ExitFunc = t),
      (this.EnterFunc = e),
      (this.Params = []);
  }
}
class ViewStateManager {
  constructor() {
    (this.zOe = new Stack_1.Stack()),
      (this.ZOe = 0),
      (this.kh = new Map()),
      (this.ZOe = 0),
      this.zOe.Push(this.ZOe);
  }
  RegisterViewState(i, t, e) {
    t = new ViewStateData(i, t, e);
    this.kh.set(i, t);
  }
  SwitchToState(i, ...t) {
    this.zOe.Push(i);
    var e = this.kh.get(this.ZOe),
      e = (e && e.ExitFunc?.(), (this.ZOe = i), this.kh.get(this.ZOe));
    e && (e.EnterFunc?.(...t), (e.Params = t));
  }
  BackToState(i) {
    if (this.ZOe !== i) {
      for (; this.zOe.Peek() !== i; ) {
        const i = this.zOe.Pop(),
          t = this.kh.get(i);
        t && t.ExitFunc?.();
      }
      this.ZOe = i;
      const t = this.kh.get(this.ZOe);
      t && t.EnterFunc?.(...t.Params);
    }
  }
  BackToLastState() {
    var i = this.zOe.Pop(),
      i = this.kh.get(i),
      i =
        (i && i.ExitFunc?.(),
        (this.ZOe = this.zOe.Peek()),
        this.kh.get(this.ZOe));
    i && i.EnterFunc?.(...i.Params);
  }
  get CurrentState() {
    return this.ZOe;
  }
}
const MAINVIEW_HELPID = 103,
  DELEGATE_HELPID = 104;
class BusinessViewController {
  constructor() {
    (this.Yzt = void 0),
      (this.jio = void 0),
      (this.tke = new ViewStateManager()),
      (this.SkipToBuild = () => {
        var i = UiManager_1.UiManager.GetViewByName(
          "MoonChasingMainView",
        )?.OpenParam;
        (i.SkipTarget = 2),
          (i.BuildingBackToBusiness = !0),
          UiManager_1.UiManager.NormalResetToView("MoonChasingMainView");
      }),
      (this.SkipToHelper = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHelperView();
      }),
      (this.JumpByConfigCondition = (i) => {
        i = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(i);
        1 === i.JumpType
          ? this.Fpa(i.JumpParam)
          : 2 === i.JumpType
            ? this.Vpa(i.JumpParam)
            : 3 === i.JumpType
              ? this.Hpa(i.JumpParam)
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                  "Moonfiesta_EntrustLock",
                );
      }),
      (this.BackToLastState = () => {
        0 === this.tke.CurrentState
          ? this.Yzt.CloseMe()
          : this.tke.BackToLastState();
      }),
      (this.OpenHelpView = () => {
        1 === this.tke.CurrentState
          ? HelpController_1.HelpController.OpenHelpById(DELEGATE_HELPID)
          : HelpController_1.HelpController.OpenHelpById(MAINVIEW_HELPID);
      });
  }
  lke() {
    this.tke.RegisterViewState(0, void 0, this.Yzt.SkipToMainView),
      this.tke.RegisterViewState(1, void 0, this.Yzt.SkipToDelegationDetails);
  }
  RegisterView(i) {
    (this.Yzt = i), (this.jio = i.OpenParam), this.lke();
  }
  async BeforeShowAsync() {
    var i = 0 === this.tke.CurrentState;
    await this.Yzt.BeforeShowAsync(i);
  }
  Show() {
    0 !== this.jio.SkipTarget
      ? this.tke.SwitchToState(this.jio.SkipTarget)
      : this.Yzt.Refresh();
    var i = 0 === this.tke.CurrentState;
    this.Yzt.SwitchShowViewSequence(i);
  }
  SwitchToState(i, ...t) {
    this.tke.SwitchToState(i, ...t);
  }
  BackToState(i) {
    this.tke.BackToState(i);
  }
  Fpa(i) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(199),
      e = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(i),
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e.TaskId),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TidName);
    t.SetTextArgs(e),
      t.FunctionMap.set(2, () => {
        MoonChasingController_1.MoonChasingController.OpenTaskView(1, i);
      }),
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  Vpa(i) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(199),
      e = ConfigManager_1.ConfigManager.TaskConfig.GetBranchLineTaskById(i),
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e.TaskId),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TidName);
    t.SetTextArgs(e),
      t.FunctionMap.set(2, () => {
        MoonChasingController_1.MoonChasingController.OpenTaskView(2, i);
      }),
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  Hpa(i) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(196),
      e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
    t.SetTextArgs(e),
      t.FunctionMap.set(2, () => {
        MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(
          i,
        );
      }),
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  JumpEnergyNotEnough() {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(201);
    i.FunctionMap.set(2, () => {
      MoonChasingController_1.MoonChasingController.OpenTaskView(2);
    }),
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
  }
  JumpMoneyNotEnough() {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(202);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
  }
}
exports.BusinessViewController = BusinessViewController;
//# sourceMappingURL=BusinessViewController.js.map
