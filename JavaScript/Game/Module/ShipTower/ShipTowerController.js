"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class ShipTowerController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29156, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "My_", [
          "割草爬塔活动副本积分结算推送",
          e,
        ]),
        ModelManager_1.ModelManager.ShipTowerModel.UpdateResultNotify(e);
    }),
      Net_1.Net.Register(20901, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "Ey_", ["割草爬塔关卡信息更新", e]),
          ModelManager_1.ModelManager.ShipTowerModel.UpdateLevelPlayNotify(e);
      }),
      Net_1.Net.Register(21750, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "iT1", [
            "割草爬塔局内周期更新推送",
            e,
          ]),
          ModelManager_1.ModelManager.ShipTowerModel.UpdateSeasonNotify(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29156),
      Net_1.Net.UnRegister(20901),
      Net_1.Net.UnRegister(21750);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.Jn_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddCommonItemList,
        this.PG_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.m7_,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.Jn_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddCommonItemList,
        this.PG_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.m7_,
      );
  }
  static RequestChallenge(e, o = !1, r = !1) {
    var t = e.TeamDataList[0],
      a = e.TeamDataList[1],
      n = new Protocol_1.Aki.Protocol.Yn_(),
      e =
        ((n.ELl = e.Id),
        (n.TLl = e.GetAllTeamBuffIdList()),
        (n.LLl = a.GetRoleIdListEdit()),
        (n.xQ_ = r),
        (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Yn_ =
          n),
        (o ? a : t).GetRoleIdListEdit()),
      r = (o ? a : t).InstId;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(
      r,
      e,
      0,
      0,
    );
  }
  static async SlashAndTowerInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Cy_.create(),
      e =
        (Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "Cy_"),
        await Net_1.Net.CallAsync(18945, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "gy_", ["", e]),
      ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerInfoResponse(e);
  }
  static async SlashAndTowerScoreRewardRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.py_(),
      e =
        ((r.s5n = e),
        (r.cOl = o),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "py_", ["", r]),
        await Net_1.Net.CallAsync(19731, r));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "vy_", ["", e]),
      ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerScoreRewardResponse(
        e,
      );
  }
  static async EndLessHistoryRequest() {
    var e = Protocol_1.Aki.Protocol.yy_.create(),
      e =
        (Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "yy_"),
        await Net_1.Net.CallAsync(23309, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "Sy_", ["", e]),
      ModelManager_1.ModelManager.ShipTowerModel.EndLessHistoryResponse(e);
  }
  static async SlashAndTowerSaveRecordRequest(e) {
    var o = new Protocol_1.Aki.Protocol.Iy_(),
      o =
        ((o.s5n = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "Iy_", ["", o]),
        await Net_1.Net.CallAsync(22910, o));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "Ty_", ["", o]),
      ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerSaveRecordResponse(
        e,
        o,
      );
  }
  static async SlashAndTowerResetRequest(e) {
    var o = new Protocol_1.Aki.Protocol.by_(),
      o =
        ((o.s5n = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "by_", ["", o]),
        await Net_1.Net.CallAsync(18337, o));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "Ly_", ["", o]),
      ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerResetResponse(
        e,
        o,
      );
  }
  static async SlashAndTowerRecommendRequest(e) {
    var o = new Protocol_1.Aki.Protocol.wy_(),
      o =
        ((o.s5n = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, "wy_", ["", o]),
        await Net_1.Net.CallAsync(26158, o));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "Ry_", ["", o]),
      ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerRecommendResponse(
        e,
        o,
      );
  }
  static async SlashAndTowerReviewRequest() {
    var e = Protocol_1.Aki.Protocol.lG_.create(),
      e =
        (Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "lG_"),
        await Net_1.Net.CallAsync(28422, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("ShipTower", 69, "_G_", ["", e]),
      ModelManager_1.ModelManager.ShipTowerModel.SlashAndTowerReviewResponse(e);
  }
}
((exports.ShipTowerController = ShipTowerController).Jn_ = () => {
  ModelManager_1.ModelManager.ShipTowerModel.InitData(),
    ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto();
}),
  (ShipTowerController.PG_ = (e) => {
    e.forEach((e) => {
      var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.s5n);
      60005 === e?.ItemType &&
        (e =
          ConfigManager_1.ConfigManager.ShipTowerConfig.GetBuffCfgByItemIdList(
            e.Id,
          )?.filter(
            (e) =>
              !ModelManager_1.ModelManager.ShipTowerModel.IsOldSeason(e.Season),
          )[0]) &&
        ModelManager_1.ModelManager.ShipTowerModel.AddShowBuffId(
          e.Id,
          1 === e.Tips,
        );
    }),
      UiManager_1.UiManager.IsViewOpen("ShipTowerView") &&
        ModelManager_1.ModelManager.ShipTowerModel.CheckShowGetBuff();
  }),
  (ShipTowerController.m7_ = (e, o) => {
    o &&
      10081 === e &&
      ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto();
  });
//# sourceMappingURL=ShipTowerController.js.map
