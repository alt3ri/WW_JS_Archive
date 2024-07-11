"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainRoleController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
  EditFormationController_1 = require("../EditFormation/EditFormationController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class MainRoleController extends UiControllerBase_1.UiControllerBase {
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "RoleGenderChangeView",
      MainRoleController.iVe,
      "MainRoleController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "RoleGenderChangeView",
      MainRoleController.iVe,
    );
  }
  static IsCanChangeRole(r) {
    var o = ModelManager_1.ModelManager.RoleModel.GetCanChangeRoleIdList(),
      t = o.length;
    for (let e = 0; e < t; e++) if (o[e] === r) return !0;
    return !1;
  }
  static IsMainRole(e) {
    return !!ModelManager_1.ModelManager.RoleModel.IsMainRole(e);
  }
  static SendRoleSexChangeRequest(e) {
    var r = Protocol_1.Aki.Protocol.pus.create();
    (r._7n = e),
      Net_1.Net.Call(14311, r, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((ModelManager_1.ModelManager.WorldLevelModel.Sex = e._7n),
              this.U1o(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleChangeEnd,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                13763,
              ));
      });
  }
  static SendRoleElementChangeRequest(e) {
    var r = Protocol_1.Aki.Protocol.Sus.create();
    (r.THn = e),
      Net_1.Net.Call(19457, r, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                11383,
              )
            : (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleChangeEnd,
              ),
              this.U1o()));
      });
  }
  static U1o() {
    EditFormationController_1.EditFormationController.RefreshMainRoleInfo(),
      EditBattleTeamController_1.EditBattleTeamController.RefreshMainRoleInfo();
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28710, (e) => {
      var r = e.dxs,
        e = e.V6n;
      ModelManager_1.ModelManager.PhantomBattleModel.DeleteBattleData(r),
        ModelManager_1.ModelManager.RoleModel.RoleChange(r, e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Role",
            44,
            "角色转换成功: ",
            ["sourceRoleId", r],
            ["roleInfo!.Proto_RoleId", e.O6n],
          );
    }),
      Net_1.Net.Register(10788, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateCanChangeRoleIdList(
            e.mxs,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28710), Net_1.Net.UnRegister(10788);
  }
}
(exports.MainRoleController = MainRoleController).iVe = (e) => {
  var r =
      Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
        188,
      )?.HasTag(1996802261),
    o = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  return r
    ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "CanNotTransferInFight",
        ),
      ),
      !1)
    : !o ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "CanNotTransferInInstance",
          ),
        ),
        !1);
};
//# sourceMappingURL=MainRoleController.js.map
