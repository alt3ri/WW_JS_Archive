"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassTaskLoopItem = exports.BattlePassTaskData = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattlePassController_1 = require("../BattlePassController"),
  BattlePassDefine_1 = require("../BattlePassDefine");
class BattlePassTaskData {
  constructor() {
    (this.RewardItemList = []),
      (this.TaskId = 0),
      (this.TaskState = 1),
      (this.UpdateType = 0),
      (this.CurrentProgress = 0),
      (this.TargetProgress = 0),
      (this.Exp = 0),
      (this.SkipId = void 0);
  }
}
exports.BattlePassTaskData = BattlePassTaskData;
class BattlePassTaskLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.U2i = void 0),
      (this.p4e = void 0),
      (this.BOe = 0),
      (this.eZs = void 0),
      (this.$kt = () => {
        var t = this.eZs?.TaskState;
        3 === t
          ? BattlePassController_1.BattlePassController.TryRequestTaskList([
              this.BOe,
            ])
          : 1 === t &&
            void 0 !== (t = this.eZs?.SkipId) &&
            (SkipTaskManager_1.SkipTaskManager.RunByConfigId(t),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnBattlePassSkip,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.$kt]]);
  }
  OnStart() {
    (this.U2i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.U2i.Initialize(this.GetItem(5).GetOwner());
  }
  Refresh(t, e, s) {
    this.Wf1(t);
  }
  async Wf1(t) {
    (this.eZs = t), this.U2i.Refresh(t.RewardItemList[0]);
    var [e, s] = this.JVc(t),
      s =
        (void 0 === this.p4e &&
          ((this.p4e = new BattlePassTaskLoopItemButton()),
          await this.p4e.CreateByActorAsync(this.GetButton(4).GetOwner())),
        this.p4e.RefreshTextByTextId(s),
        this.GetButton(4).RootUIComp.SetUIActive(e),
        this.GetText(3).SetUIActive(1 === t.TaskState && void 0 === t.SkipId),
        this.GetSprite(2).SetUIActive(2 === t.TaskState),
        (this.BOe = t.TaskId),
        ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(
          this.BOe,
        )),
      e = s.TaskName;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e),
      this.GetText(1).SetText(
        t.CurrentProgress.toString() + "/" + t.TargetProgress.toString(),
      );
  }
  JVc(t) {
    switch (t.TaskState) {
      case 1:
        return [
          void 0 !== t.SkipId,
          void 0 === t.SkipId
            ? void 0
            : BattlePassDefine_1.BATTLE_PASS_BUTTON_JUMP_TEXT_ID,
        ];
      case 2:
        return [!1, void 0];
      case 3:
        return [!0, BattlePassDefine_1.BATTLE_PASS_BUTTON_RECEIVE_TEXT_ID];
      default:
        return [!1, void 0];
    }
  }
}
exports.BattlePassTaskLoopItem = BattlePassTaskLoopItem;
class BattlePassTaskLoopItemButton extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  RefreshTextByTextId(t) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), t);
  }
}
//# sourceMappingURL=BattlePassTaskLoopItem.js.map
