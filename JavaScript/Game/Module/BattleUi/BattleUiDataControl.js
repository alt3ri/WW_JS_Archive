"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiDataControl = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
class BattleUiDataControl extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.VQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.fIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.HQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenView,
      this.FQe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.VQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.fIe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.HQe,
      );
    var e =
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
    InputDistributeController_1.InputDistributeController.UnBindActions(
      e,
      this.bMe,
    );
  }
}
((exports.BattleUiDataControl = BattleUiDataControl).FQe = (e) => {
  "GuideFocusView" === e &&
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(
      !0,
    );
}),
  (BattleUiDataControl.$Ge = (e) => {
    "GuideFocusView" === e &&
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(
        !1,
      );
  }),
  (BattleUiDataControl.VQe = (t, n) => {
    if (t && 6 === t.Type && n.gEs) {
      let e = void 0;
      switch (t.BtType) {
        case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
          e = ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(
            t.TreeConfigId,
            t.NodeId,
          );
          break;
        case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
          e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(
            t.TreeConfigId,
            t.NodeId,
          );
      }
      var o;
      e &&
        "ChildQuest" === e.Type &&
        (o = e.Condition).Type === IQuest_1.EChildQuest.MonsterCreator &&
        o.ShowMonsterMergedHpBar &&
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.UpdateProgress(
          t.TreeIncId,
          t.NodeId,
          n.gEs,
          o.TidMonsterGroupName,
        );
    }
  }),
  (BattleUiDataControl.fIe = (e, t, n) => {
    e instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
      ((n !== Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed &&
        n !== Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess &&
        n !== Protocol_1.Aki.Protocol.BNs.Proto_Destroy) ||
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveNode(
          e.TreeIncId,
          e.NodeId,
        ));
  }),
  (BattleUiDataControl.HQe = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveTree(e);
  }),
  (BattleUiDataControl.bMe = (e, t) => {
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(
      e,
      0 === t,
    );
  });
//# sourceMappingURL=BattleUiDataControl.js.map
