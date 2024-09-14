"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenceReviveView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
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
      (this.L6a = void 0),
      (this.YNi = () => {
        var e;
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              108,
            )).FunctionMap.set(1, this.rsa),
            e.FunctionMap.set(2, this.osa),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ),
            this.GetButton(7).SetSelfInteractive(!1),
            this.Hide());
      }),
      (this.rsa = () => {
        this.GetButton(7).SetSelfInteractive(!0), this.Show();
      }),
      (this.osa = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().then(
          (e) => {
            e && this.CloseMe();
          },
        );
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
    void 0 !== this.OpenParam && (this.L6a = this.OpenParam),
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
    this.L6a
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          TIPS_TEXT_ID_NEW,
          Math.round(this.L6a.RemainTime),
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), TIPS_TEXT_ID),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(8),
        TIPS_UNDER_BUTTON_TEXT_ID,
      );
  }
  OnTick(e) {
    this.L6a &&
      (0 !== this.L6a.RemainTime &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          TIPS_TEXT_ID_NEW,
          Math.round(this.L6a.RemainTime),
        ),
      0 < this.L6a.RemainTime
        ? (this.L6a.RemainTime = this.L6a.RemainTime - 0.001 * e)
        : (this.L6a.RemainTime = 0));
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
