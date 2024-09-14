"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonUiController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Stats_1 = require("../../../Core/Common/Stats"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class SkillButtonUiController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.kpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowTypeChange,
        this.aEa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMultiSkillIdChanged,
        this.Uyo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMultiSkillEnable,
        this.Ayo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.OJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharSkillCountChanged,
        this.Pyo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharSkillRemainCdChanged,
        this.xyo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAimStateChanged,
        this.Pet,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        this.Pet,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleInputEnableChanged,
        this.Kaa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleInputVisibleChanged,
        this.$aa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        this.HRn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.组合主键,
        this.RZe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.kpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowTypeChange,
        this.aEa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMultiSkillIdChanged,
        this.Uyo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMultiSkillEnable,
        this.Ayo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.OJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharSkillCountChanged,
        this.Pyo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharSkillRemainCdChanged,
        this.xyo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAimStateChanged,
        this.Pet,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        this.Pet,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActionKeyChanged,
        this.Dut,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleInputEnableChanged,
        this.Kaa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleInputVisibleChanged,
        this.$aa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        this.HRn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.组合主键,
        this.RZe,
      );
  }
  static wyo(e, t = 4) {
    var n = 2 === Info_1.Info.OperationType;
    ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonData(
      e,
      n,
      t,
    );
  }
  static GetRoleId(e) {
    var e = e.GetComponent(0);
    return e
      ? ((e = e.GetRoleId()),
        ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e))
      : 0;
  }
}
((exports.SkillButtonUiController = SkillButtonUiController).kQe =
  Stats_1.Stat.Create("[ChangeRole]SkillButtonUiController")),
  (SkillButtonUiController.Uyo = (e, t, n) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.ExecuteMultiSkillIdChanged(
      e,
      t,
      n,
    );
  }),
  (SkillButtonUiController.Ayo = (e, t, n) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.ExecuteMultiSkillEnable(
      e,
      t,
      n,
    );
  }),
  (SkillButtonUiController.xie = (e, t) => {
    SkillButtonUiController.kQe.Start(),
      SkillButtonUiController.wyo(e, 1),
      SkillButtonUiController.kQe.Stop();
  }),
  (SkillButtonUiController.kpe = () => {
    ModelManager_1.ModelManager.SkillButtonUiModel.CreateAllSkillButtonEntityData();
  }),
  (SkillButtonUiController.aEa = () => {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e && SkillButtonUiController.wyo(e);
  }),
  (SkillButtonUiController.zpe = (e, t) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnRemoveEntity(t);
  }),
  (SkillButtonUiController.OJe = () => {
    ModelManager_1.ModelManager.SkillButtonUiModel.RefreshSkillButtonExplorePhantomSkillId(
      7,
    );
  }),
  (SkillButtonUiController.Pyo = (e) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnSkillCdChanged(e);
  }),
  (SkillButtonUiController.xyo = (e) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnSkillCdChanged(e);
  }),
  (SkillButtonUiController.Pet = () => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnAimStateChanged();
  }),
  (SkillButtonUiController.Dut = (e) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnActionKeyChanged(e);
  }),
  (SkillButtonUiController.Kaa = (e, t) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnInputEnableChanged(e, t);
  }),
  (SkillButtonUiController.HRn = (e) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.SkillButtonFormationData?.RefreshOnFollowerAimStateChange(
      e,
    );
  }),
  (SkillButtonUiController.$aa = (e, t) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.OnInputVisibleChanged(e, t);
  }),
  (SkillButtonUiController.mDn = (e) => {
    ModelManager_1.ModelManager.SkillButtonUiModel.CreateSkillButtonFollowerEntityData(
      e,
    );
  }),
  (SkillButtonUiController.dDn = () => {
    ModelManager_1.ModelManager.SkillButtonUiModel.ClearSkillButtonFollowerEntityData();
  }),
  (SkillButtonUiController.FQe = (e) => {
    "MenuView" === e &&
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.AddChangeKeyReason(
        0,
      );
  }),
  (SkillButtonUiController.$Ge = (e) => {
    "MenuView" === e &&
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RemoveChangeKeyReason(
        0,
      );
  }),
  (SkillButtonUiController.RZe = (e, t) => {
    t = 0 === t;
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.SetIsPressCombineButton(
      t,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
        t,
      );
  });
//# sourceMappingURL=SkillButtonUiController.js.map
