"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadTopPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  iconTypeSprite = {
    [0]: "T_IconPcBtn_Xbox17_UI",
    1: "T_IconPcBtn_Xbox17_UI",
    3: "T_IconPcBtn_PsCai_UI",
    4: "T_IconPcBtn_PsCai_UI",
    2: "T_IconPcBtn_Xbox17_UI",
    5: "T_IconPcBtn_Xbox17_UI",
    6: "T_IconPcBtn_Xbox17_UI",
  };
class GamepadTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.kgl = void 0),
      (this.C$l = void 0),
      (this.g$l = (e) => {
        e &&
          (this.C$l?.PlayLevelSequenceByName("BtnShow"),
          this.GetItem(1).SetUIActive(!0));
      }),
      (this.$Wl = () => {
        var e =
          this.GetItem(3).bIsUIActive ||
          this.GetItem(4).bIsUIActive ||
          this.GetItem(5).bIsUIActive ||
          this.GetItem(6).bIsUIActive;
        this.GetItem(1).SetUIActive(e);
      }),
      (this.XBo = () => {
        Info_1.Info.IsInGamepad()
          ? (this.SetVisible(5, !0), this.yQl())
          : this.SetVisible(5, !1);
      }),
      (this.RQe = (e, t) => {
        10023 === e &&
          t &&
          RedDotController_1.RedDotController.BindRedDot(
            "AdventureBattleButton",
            this.GetItem(4),
          );
      }),
      (this.stt = () => {
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton()
          : UiManager_1.UiManager.OpenView("FunctionView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.stt]]);
  }
  Initialize(e) {
    super.Initialize(e),
      this.InitChildType(2),
      this.AddEvents(),
      this.BindRedDot(),
      (this.kgl = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.C$l = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetButton(0).RootUIComp,
      ));
  }
  Reset() {
    super.Reset(), this.RemoveEvents(), this.RemoveRedDot();
  }
  BindRedDot() {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
      ? this.GetItem(1).SetUIActive(!1)
      : (RedDotController_1.RedDotController.BindRedDot(
          "BattleViewMenu",
          this.GetItem(2),
          this.g$l,
        ),
        RedDotController_1.RedDotController.BindRedDot(
          "ActivityEntrance",
          this.GetItem(3),
          this.g$l,
        ),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) &&
          RedDotController_1.RedDotController.BindRedDot(
            "AdventureBattleButton",
            this.GetItem(4),
            this.g$l,
          ),
        RedDotController_1.RedDotController.BindRedDot(
          "BattleViewGachaButton",
          this.GetItem(5),
          this.g$l,
        ),
        RedDotController_1.RedDotController.BindRedDot(
          "BattlePass",
          this.GetItem(6),
          this.g$l,
        ));
  }
  RemoveRedDot() {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      (RedDotController_1.RedDotController.UnBindRedDot("BattleViewMenu"),
      RedDotController_1.RedDotController.UnBindRedDot("ActivityEntrance"),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) &&
        RedDotController_1.RedDotController.UnBindRedDot(
          "AdventureBattleButton",
        ),
      RedDotController_1.RedDotController.UnBindRedDot("BattleViewGachaButton"),
      RedDotController_1.RedDotController.UnBindRedDot("BattlePass"));
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      );
  }
  OnShowBattleChildView() {
    this.$Wl(), this.yQl(), this.kgl?.PlayLevelSequenceByName("BtnShow");
  }
  OnHideBattleChildView() {
    this.kgl?.PlayLevelSequenceByName("BtnHide");
  }
  yQl() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      iconTypeSprite[Info_1.Info.InputControllerType],
    );
    this.SetTextureByPath(e, this.GetTexture(7));
  }
}
exports.GamepadTopPanel = GamepadTopPanel;
//# sourceMappingURL=GamepadTopPanel.js.map
