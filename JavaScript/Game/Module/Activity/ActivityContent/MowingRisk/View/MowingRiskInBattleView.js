"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskInBattleView = void 0);
const UE = require("ue"),
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
      (this.YN_ = (e, t) => {
        1 === t &&
          ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.CheckInInstanceDungeon() &&
          UiManager_1.UiManager.OpenView("MowingBuffView", 1);
      }),
      (this.b9a = (e) => {
        this.RefreshByCustomData(e);
      }),
      (this.wnh = () => {
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
  LZs() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MowingRiskInBattleRootUpdate,
      this.b9a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence,
        this.wnh,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.割草BUFF信息,
        this.YN_,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.割草BUFF信息PC触摸板,
        this.YN_,
      );
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MowingRiskInBattleRootUpdate,
      this.b9a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence,
        this.wnh,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.割草BUFF信息,
        this.YN_,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.割草BUFF信息PC触摸板,
        this.YN_,
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
