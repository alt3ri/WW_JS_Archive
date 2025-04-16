"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenceReviveView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TIPS_TEXT_ID = "TowerDefence_dead1",
  TIPS_TEXT_ID_NEW = "ReviveCountdownTime",
  TIPS_UNDER_BUTTON_TEXT_ID = "TowerDefence_dead2",
  BUTTON_TEXT_ID = "TowerDefence_end";
class TowerDefenceReviveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.pIl = void 0),
      (this.YNi = () => {
        var e;
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              108,
            )).FunctionMap.set(1, this.rsa),
            e.FunctionMap.set(2, this.osa),
            e.SetCloseFunction(this.PNo),
            (e.FinishOpenFunction = this.jSl),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ));
      }),
      (this.rsa = () => {}),
      (this.osa = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }),
      (this.jSl = (e, i) => {
        UiManager_1.UiManager.IsViewOpen("TowerDefenceReviveView") && e
          ? (this.pIl = i)
          : ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(
              i,
            );
      }),
      (this.PNo = () => {
        UiManager_1.UiManager.IsViewOpen("TowerDefenceReviveView") &&
          (this.pIl = void 0);
      }),
      (this.o1a = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[7, this.YNi]]);
  }
  async OnBeforeStartAsync() {
    await new TowerDefenceReviveItem().CreateThenShowByActorAsync(
      this.GetButton(7).RootUIComp.GetOwner(),
    );
  }
  OnBeforeShow() {
    this.GetButton(1).RootUIComp.SetUIActive(!1),
      this.GetButton(2).RootUIComp.SetUIActive(!1),
      this.GetButton(7).RootUIComp.SetUIActive(!0),
      this.GetButton(9).RootUIComp.SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1);
  }
  OnStart() {
    this.B2t(),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(8),
        TIPS_UNDER_BUTTON_TEXT_ID,
      );
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.TowerDefenseModel.SelfReviveTargetTimestampForUi =
      void 0) !== this.pIl &&
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(
        this.pIl,
      ),
      (this.pIl = void 0);
  }
  OnTick(e) {
    this.B2t();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify,
      this.o1a,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify,
      this.o1a,
    );
  }
  B2t() {
    var e,
      i =
        ModelManager_1.ModelManager.TowerDefenseModel
          .SelfReviveTargetTimestampForUi;
    void 0 === i
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), TIPS_TEXT_ID)
      : i < (e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp())
        ? this.GetText(0)?.SetUIActive(!1)
        : (this.GetText(0)?.SetUIActive(!0),
          (i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
            0.5 + TimeUtil_1.TimeUtil.Millisecond * (i - e),
          )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(0),
            TIPS_TEXT_ID_NEW,
            i.CountDownText,
          ));
  }
}
exports.TowerDefenceReviveView = TowerDefenceReviveView;
class TowerDefenceReviveItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), BUTTON_TEXT_ID);
  }
}
//# sourceMappingURL=TowerDefenceReviveView.js.map
