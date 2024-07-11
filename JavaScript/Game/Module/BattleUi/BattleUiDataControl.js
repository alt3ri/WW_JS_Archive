"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiDataControl = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
class BattleUiDataControl extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.UKe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.AKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.fIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.PKe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenView,
      this.UKe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.AKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.fIe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.PKe,
      );
    const e =
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
    InputDistributeController_1.InputDistributeController.UnBindActions(
      e,
      this.bMe,
    );
  }
}
((exports.BattleUiDataControl = BattleUiDataControl).UKe = (e) => {
  e === "GuideFocusView" &&
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(
      !0,
    );
}),
  (BattleUiDataControl.$Ge = (e) => {
    e === "GuideFocusView" &&
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.UpdateGuidingState(
        !1,
      );
  }),
  (BattleUiDataControl.AKe = (t, n) => {
    if (t && t.Type === 6 && n.Wfs) {
      let e = void 0;
      switch (t.BtType) {
        case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
          e = ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(
            t.TreeConfigId,
            t.NodeId,
          );
          break;
        case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
        case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
          e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(
            t.TreeConfigId,
            t.NodeId,
          );
      }
      let o;
      e &&
        e.Type === "ChildQuest" &&
        (o = e.Condition).Type === "MonsterCreator" &&
        o.ShowMonsterMergedHpBar &&
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.UpdateProgress(
          t.TreeIncId,
          t.NodeId,
          n.Wfs,
          o.TidMonsterGroupName,
        );
    }
  }),
  (BattleUiDataControl.fIe = (e, t, n) => {
    e instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext &&
      ((n !== Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed &&
        n !== Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess &&
        n !== Protocol_1.Aki.Protocol.N2s.Proto_Destroy) ||
        ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveNode(
          e.TreeIncId,
          e.NodeId,
        ));
  }),
  (BattleUiDataControl.PKe = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.RemoveTree(e);
  }),
  (BattleUiDataControl.bMe = (e, t) => {
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(
      e,
      t === 0,
    );
  });
// # sourceMappingURL=BattleUiDataControl.js.map
