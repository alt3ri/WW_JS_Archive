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
    var r = Protocol_1.Aki.Protocol.Lus.create();
    (r.v7n = e),
      Net_1.Net.Call(15983, r, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ((ModelManager_1.ModelManager.WorldLevelModel.Sex = e.v7n),
              this.U1o(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleChangeEnd,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17264,
              ));
      });
  }
  static SendRoleElementChangeRequest(e) {
    var r = Protocol_1.Aki.Protocol.Dus.create();
    (r.wHn = e),
      Net_1.Net.Call(24357, r, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24482,
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
    Net_1.Net.Register(15327, (e) => {
      var r = e.Mxs,
        e = e.J6n;
      ModelManager_1.ModelManager.PhantomBattleModel.DeleteBattleData(r),
        ModelManager_1.ModelManager.RoleModel.RoleChange(r, e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Role",
            44,
            "角色转换成功: ",
            ["sourceRoleId", r],
            ["roleInfo!.Proto_RoleId", e.Q6n],
          );
    }),
      Net_1.Net.Register(24633, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateCanChangeRoleIdList(
            e.Sxs,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15327), Net_1.Net.UnRegister(24633);
  }
}
(exports.MainRoleController = MainRoleController).iVe = (e) => {
  var r =
      Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
        190,
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
