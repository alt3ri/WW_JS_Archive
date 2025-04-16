"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MainRoleController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
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
      Net_1.Net.Call(25077, r, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ((ModelManager_1.ModelManager.WorldLevelModel.Sex = e.v7n),
              this.U1o(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleChangeEnd,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                19160,
              ));
      });
  }
  static SendRoleElementChangeRequest(e) {
    var r = Protocol_1.Aki.Protocol.Dus.create();
    (r.wHn = e),
      Net_1.Net.Call(24170, r, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17391,
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
    Net_1.Net.Register(26616, (e) => {
      var r = e.Mxs,
        e = e.J6n;
      ModelManager_1.ModelManager.PhantomBattleModel.DeleteBattleData(r),
        ModelManager_1.ModelManager.RoleModel.RoleChange(r, e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Role",
            43,
            "角色转换成功: ",
            ["sourceRoleId", r],
            ["roleInfo!.Proto_RoleId", e.Q6n],
          );
    }),
      Net_1.Net.Register(25012, (e) => {
        e &&
          (ModelManager_1.ModelManager.RoleModel.UpdateCanChangeRoleIdList(
            e.Sxs,
          ),
          ModelManager_1.ModelManager.MainRoleModel.UpdateCanChangeSexTime(
            Number(MathUtils_1.MathUtils.LongToBigInt(e.Db_)),
          ));
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26616), Net_1.Net.UnRegister(25012);
  }
}
(exports.MainRoleController = MainRoleController).iVe = (e) => {
  var r =
      Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
        203,
      )?.HasTag(1996802261),
    o = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  return r
    ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "CanNotTransferInFight",
        ),
      ),
      !1)
    : o
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "CanNotTransferInInstance",
          ),
        ),
        !1)
      : ((r =
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
            3,
          ).GetDownLoadProgress()[3]),
        (o =
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
            4,
          ).GetDownLoadProgress()[3]),
        0 < r || 0 < o
          ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "DownLoadTips_WaitDownDone",
            ),
            !1)
          : ((r =
              1 ===
              ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
                ? 3
                : 4),
            VideoResUpdate_1.VideoResUpdate.GetVideoResSize(r) ===
              VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(r) ||
              (UiManager_1.UiManager.OpenView("ResDownLoadView"), !1)));
};
//# sourceMappingURL=MainRoleController.js.map
