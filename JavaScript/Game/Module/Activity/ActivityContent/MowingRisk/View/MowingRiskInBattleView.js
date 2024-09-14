"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskInBattleView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  InputDistributeController_1 = require("../../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  BattleVisibleChildView_1 = require("../../../../BattleUi/Views/BattleChildView/BattleVisibleChildView"),
  ActivityMowingRiskController_1 = require("../Controller/ActivityMowingRiskController");
class MowingRiskInBattleView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.ujr = void 0),
      (this.eTt = () => {
        UiManager_1.UiManager.OpenView("MowingBuffView", 1);
      }),
      (this.bMe = (e, t) => {
        ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.CheckInInstanceDungeon() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MowingRisk",
              65,
              "OnInputAction",
              ["actionName", e],
              ["actionType", t],
            ),
          UiManager_1.UiManager.OpenView("MowingBuffView", 1));
      }),
      (this.z6a = (e) => {
        this.RefreshByCustomData(e);
      }),
      (this.tZa = () => {
        this.ujr?.LitePlayAsync("Start");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Initialize(e) {
    super.Initialize(e),
      this.InitChildType(4),
      this.SetVisible(1, !1),
      this.LZs();
  }
  Reset() {
    super.Reset(), this.DZs();
  }
  OnStart() {
    this.GetSprite(2)?.SetUIActive(!0),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem())),
      this.ujr.LiteJumpToEnd("Start");
  }
  OnBeforeDestroy() {
    this.ujr?.LiteExit(), (this.ujr = void 0);
  }
  OnAfterShow() {
    InputDistributeController_1.InputDistributeController.BindActions(
      [InputMappingsDefine_1.actionMappings.环境特性],
      this.bMe,
    );
  }
  OnBeforeHide() {
    InputDistributeController_1.InputDistributeController.UnBindActions(
      [InputMappingsDefine_1.actionMappings.环境特性],
      this.bMe,
    );
  }
  LZs() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MowingRiskInBattleRootUpdate,
      this.z6a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence,
        this.tZa,
      );
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MowingRiskInBattleRootUpdate,
      this.z6a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence,
        this.tZa,
      );
  }
  CustomSetActive(e) {
    this.SetVisible(1, e);
  }
  RefreshByCustomData(e) {
    this.GetText(1)?.SetText(e.LevelText),
      this.GetSprite(2)?.SetFillAmount(e.ProgressPercentage);
  }
}
exports.MowingRiskInBattleView = MowingRiskInBattleView;
//# sourceMappingURL=MowingRiskInBattleView.js.map
