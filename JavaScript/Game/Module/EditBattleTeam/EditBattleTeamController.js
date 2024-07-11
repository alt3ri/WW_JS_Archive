"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditBattleTeamController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  EditBattleTeamModel_1 = require("./EditBattleTeamModel");
class EditBattleTeamController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      ModelManager_1.ModelManager.EditBattleTeamModel.CreateAllRoleSlotData(),
      !0
    );
  }
  static OnClear() {
    return (
      ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData(), !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PrewarFormationChanged,
      this.Q3t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PrewarReadyChanged,
        this.X3t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DissolvePrewar,
        this.$3t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUp,
        this.TQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PrewarFormationChanged,
      this.Q3t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PrewarReadyChanged,
        this.X3t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DissolvePrewar,
        this.$3t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUp,
        this.TQe,
      );
  }
  static PlayerOpenEditBattleTeamView(e, t = !1, a = !0) {
    t || (ModelManager_1.ModelManager.EditBattleTeamModel.NeedEntrance = a),
      this.OpenEditBattleTeamView(e, t);
  }
  static OpenEditBattleTeamView(e, t = 0) {
    var a = ModelManager_1.ModelManager.EditBattleTeamModel;
    InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)
      ? (a.SetInstanceDungeonId(e),
        ModelManager_1.ModelManager.EditBattleTeamModel
          .IsMultiInstanceDungeon &&
        ModelManager_1.ModelManager.InstanceDungeonModel.MatchingPlayerCount() <=
          0
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                5,
                "打开战前编队时，数据已经被清理，操作中止",
              ),
            a.SetInstanceDungeonId(void 0))
          : UiManager_1.UiManager.OpenView("EditBattleTeamView"))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Formation",
          8,
          "[EditBattleTeam]找不到副本数据，不能打开战前编队",
        );
  }
  static CloseEditBattleTeamView() {
    ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData(),
      UiManager_1.UiManager.CloseView("EditBattleTeamView");
  }
  static ExitEditBattleTeam(e = !0) {
    var t = ModelManager_1.ModelManager.EditBattleTeamModel;
    t.IsMultiInstanceDungeon &&
      e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Formation",
          8,
          "[EditBattleTeam]离开{DungeonId} 副本的战前编队",
          ["{DungeonId}", t.GetInstanceDungeonId],
        ),
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveMatchTeamRequest()),
      t.SetInstanceDungeonId(void 0),
      t.SetLeaderPlayerId(void 0),
      UiManager_1.UiManager.IsViewShow("ChatView")
        ? UiManager_1.UiManager.CloseView("ChatView", () => {
            this.CloseEditBattleTeamView();
          })
        : UiManager_1.UiManager.IsViewShow("TeamRoleSelectView")
          ? UiManager_1.UiManager.CloseView("TeamRoleSelectView", () => {
              this.CloseEditBattleTeamView();
            })
          : this.CloseEditBattleTeamView();
  }
  static SetEditBattleTeamByRoleId(a) {
    ModelManager_1.ModelManager.EditBattleTeamModel.ResetAllRoleSlotData();
    var n = ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
    for (let t = 0; t < a.length; t++) {
      var o = a[t],
        r = n[t],
        i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o),
        l = i.GetLevelData();
      let e = r.GetRoleData;
      ((e =
        e ||
        ModelManager_1.ModelManager.EditBattleTeamModel.CreateRoleDataFromRoleInstance(
          i,
        )).ConfigId = o),
        (e.Level = l.GetLevel()),
        r.SetRoleData(e);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      "用RoleId设置编队时",
    );
  }
  static RefreshMainRoleInfo() {
    ModelManager_1.ModelManager.EditBattleTeamModel.ChangeMainRoleData();
  }
}
((exports.EditBattleTeamController = EditBattleTeamController).Model =
  EditBattleTeamModel_1.EditBattleTeamModel),
  (EditBattleTeamController.Q3t = () => {
    ModelManager_1.ModelManager.EditBattleTeamModel.RefreshAllMultiRoleData();
  }),
  (EditBattleTeamController.X3t = (e, t) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Formation",
        8,
        "[EditBattleTeam]玩家{PlayerId} 返回准备游戏,是否准备:{IsReady}",
        ["{PlayerId}", e],
        ["{IsReady}", t],
      ),
      ModelManager_1.ModelManager.EditBattleTeamModel.SetPlayerReady(e, t);
  }),
  (EditBattleTeamController.$3t = () => {
    EditBattleTeamController.CloseEditBattleTeamView();
  }),
  (EditBattleTeamController.TQe = (e, t, a) => {
    for (const o of ModelManager_1.ModelManager.EditBattleTeamModel
      .GetAllRoleSlotData) {
      var n = o.GetRoleData;
      n && n.ConfigId === e && (n.Level = a);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      "角色升级时",
    );
  });
//# sourceMappingURL=EditBattleTeamController.js.map
