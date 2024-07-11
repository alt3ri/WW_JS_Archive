"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainRoleController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController");
const EditFormationController_1 = require("../EditFormation/EditFormationController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class MainRoleController extends UiControllerBase_1.UiControllerBase {
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "RoleGenderChangeView",
      MainRoleController.V4e,
      "MainRoleController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "RoleGenderChangeView",
      MainRoleController.V4e,
    );
  }
  static IsCanChangeRole(r) {
    const o = ModelManager_1.ModelManager.RoleModel.GetCanChangeRoleIdList();
    const t = o.length;
    for (let e = 0; e < t; e++) if (o[e] === r) return !0;
    return !1;
  }
  static IsMainRole(e) {
    return !!ModelManager_1.ModelManager.RoleModel.IsMainRole(e);
  }
  static SendRoleSexChangeRequest(e) {
    const r = Protocol_1.Aki.Protocol.Ths.create();
    (r.x6n = e),
      Net_1.Net.Call(16423, r, (e) => {
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ((ModelManager_1.ModelManager.WorldLevelModel.Sex = e.x6n),
              this.wlo(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleChangeEnd,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                5627,
              ));
      });
  }
  static SendRoleElementChangeRequest(e) {
    const r = Protocol_1.Aki.Protocol.Rhs.create();
    (r.K8n = e),
      Net_1.Net.Call(27889, r, (e) => {
        e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                15230,
              )
            : (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleChangeEnd,
              ),
              this.wlo()));
      });
  }
  static wlo() {
    EditFormationController_1.EditFormationController.RefreshMainRoleInfo(),
      EditBattleTeamController_1.EditBattleTeamController.RefreshMainRoleInfo();
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29747, (e) => {
      const r = e.QDs;
      var e = e.j5n;
      ModelManager_1.ModelManager.PhantomBattleModel.DeleteBattleData(r),
        ModelManager_1.ModelManager.RoleModel.RoleChange(r, e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Role",
            44,
            "角色转换成功: ",
            ["sourceRoleId", r],
            ["roleInfo!.Proto_RoleId", e.l3n],
          );
    }),
      Net_1.Net.Register(2480, (e) => {
        e &&
          ModelManager_1.ModelManager.RoleModel.UpdateCanChangeRoleIdList(
            e.XDs,
          );
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29747), Net_1.Net.UnRegister(2480);
  }
}
(exports.MainRoleController = MainRoleController).V4e = (e) => {
  const r =
    Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
      185,
    )?.HasTag(1996802261);
  const o =
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
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
// # sourceMappingURL=MainRoleController.js.map
