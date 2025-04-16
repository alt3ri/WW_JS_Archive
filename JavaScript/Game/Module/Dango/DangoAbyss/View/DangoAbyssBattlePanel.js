"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssBattlePanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView"),
  DangoAbyssBattleTreasureItem_1 = require("./DangoAbyssBattleTreasureItem");
class DangoAbyssBattlePanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.RewardTimeMap = new Map()),
      (this.FullTime = 0),
      (this.q2c = void 0),
      (this.GOe = void 0),
      (this.YP = () => {
        UiManager_1.UiManager.OpenView("DangoAbyssInfoView");
      }),
      (this.YN_ = (e, t) => {
        1 === t && this.YP();
      }),
      (this.DVc = () => {
        this.Qbe(), this.N2c(), this.Yp1();
      }),
      (this.G2c = () => {
        this.F2c();
      }),
      (this.Vtl = () => {
        this.sSt(), this.N2c();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UISliderComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [6, UE.UIText],
      [5, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  async OnBeforeStartAsync() {
    (this.FullTime =
      ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTotalScore()),
      (this.RewardTimeMap =
        ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTreasureMap()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShareReviveTimesChange,
        this.G2c,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssRoomInfoUpdate,
        this.DVc,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.地图,
        this.YN_,
      ),
      (this.q2c =
        new DangoAbyssBattleTreasureItem_1.DangoAbyssBattleTreasureRoot()),
      await this.q2c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      this.q2c.InitItem(this.GetItem(3), this.GetItem(4)),
      await this.q2c.Init(this.RewardTimeMap, this.FullTime),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.Vtl, 1e3));
  }
  Yp1() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    this.GetText(8)?.SetText(
      StringUtils_1.StringUtils.Format("{0}%", (100 * e).toFixed(0)),
    );
  }
  N2c() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    this.V2c(e), this.j2c(e);
  }
  j2c(e) {
    var t = new UiAsyncTask_1.UiAsyncTask(
      "DangoAbyss.UpdateRoomData",
      async () => {
        (this.FullTime =
          ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTotalScore()),
          (this.RewardTimeMap =
            ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTreasureMap()),
          await this.q2c.Init(this.RewardTimeMap, this.FullTime),
          this.q2c?.RefreshRewardItem(100 * e);
      },
    );
    this.RunAsyncTask(t);
  }
  OnBeforeShow() {
    this.N2c(), this.F2c(), this.Qbe(), this.Yp1();
  }
  F2c() {
    var e =
      ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceReviveTipTips();
    this.GetText(5)?.SetText(e);
  }
  Qbe() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceFloorText();
    this.GetText(6)?.SetText("" + e);
  }
  V2c(e) {
    this.GetSlider(2)?.SetValue(e);
  }
  sSt() {
    var e =
      ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceRemainTimeText();
    this.GetText(1)?.SetText(e);
  }
  OnBeforeDestroy() {
    this.GOe &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0)),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShareReviveTimesChange,
        this.G2c,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssRoomInfoUpdate,
        this.DVc,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.地图,
        this.YN_,
      );
  }
}
exports.DangoAbyssBattlePanel = DangoAbyssBattlePanel;
//# sourceMappingURL=DangoAbyssBattlePanel.js.map
