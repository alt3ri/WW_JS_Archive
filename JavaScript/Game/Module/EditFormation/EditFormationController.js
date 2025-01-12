"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  PhantomUtil_1 = require("../Phantom/PhantomUtil"),
  RoleController_1 = require("../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class EditFormationController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Q5e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Q5e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(1524, EditFormationController.i5t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(1524);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "EditFormationView",
      EditFormationController.CanOpenView,
      EditFormationController.name,
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "EditFormationView",
      EditFormationController.CanOpenView,
    );
  }
  static RefreshMainRoleInfo() {
    ModelManager_1.ModelManager.EditFormationModel.ChangeEditedMainRole();
  }
  static GetFormationDataRequest() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Formation", 49, "请求所有编队数据");
    var o = new Protocol_1.Aki.Protocol.kis();
    Net_1.Net.Call(8450, o, (o) => {});
  }
  static async EditFormationRequest(o) {
    var r,
      t,
      e = new Array(),
      n = ModelManager_1.ModelManager.EditFormationModel;
    for ([r, t] of n.GetAllEditingFormation()) {
      var i = r === o;
      if (!(i && t.length <= 0)) {
        if (r === n.GetCurrentFormationId) {
          var a = n.GetFormationData(r)?.GetRoleIdList;
          if (a && a.length === t.length) {
            let r = !0;
            for (let o = 0; o < a.length; o++)
              if (a[o] !== t[o]) {
                r = !1;
                break;
              }
            if (r) {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Formation", 49, "更新单机编队，新旧编队相同");
              continue;
            }
          }
        }
        let o = 0 < t.length ? t[0] : 0;
        if (i) {
          var l = n.GetCurrentFormationData,
            _ = l.GetCurrentRolePosition;
          if (
            ((o = l.GetCurrentRoleConfigId),
            t.includes(o) || (o = _ <= t.length ? t[_ - 1] : t[0]),
            n.IsRoleDead(o))
          )
            for (const m of t)
              if (m !== o && !n.IsRoleDead(m)) {
                o = m;
                break;
              }
        }
        l = new Protocol_1.Aki.Protocol.d5s();
        (l.AVn = r), (l.UVn = i), (l.s5n = t), (l.RVn = o), e.push(l);
      }
    }
    var g = new Protocol_1.Aki.Protocol.xis();
    (g.xVn = e),
      ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Formation", 49, "更新单机编队", ["formations", e]),
      await Net_1.Net.CallAsync(29036, g);
  }
  static async UpdateFormationRequest(o, r, t, e) {
    var n = new Protocol_1.Aki.Protocol.d5s(),
      o =
        ((n.AVn = o),
        (n.UVn = r),
        (n.s5n = t),
        (n.RVn = e),
        new Protocol_1.Aki.Protocol.xis()),
      r =
        ((o.xVn = [n]),
        ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 49, "更新单机编队", ["formation", n]),
        await Net_1.Net.CallAsync(29036, o));
    return void 0 !== r;
  }
  static async UpdateFightRoleRequest() {
    var r = ModelManager_1.ModelManager.EditFormationModel,
      t = r.GetEditingRoleIdList(-1);
    if (!(t.length <= 0)) {
      var e = r.GetCurrentFormationData.GetCurrentRolePosition;
      let o = r.GetEditingRoleId(-1, e);
      if (!o || r.IsRoleDead(o))
        for (const n of t)
          if (n !== o && !r.IsRoleDead(n)) {
            o = n;
            break;
          }
      o
        ? (((e = new Protocol_1.Aki.Protocol.qis()).PVn = o),
          (e.s5n = t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Formation", 49, "更新联机编队", ["massage", e]),
          ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
          await Net_1.Net.CallAsync(1457, e))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Formation", 49, "更新联机编队，找不到当前角色");
    }
  }
}
(exports.EditFormationController = EditFormationController),
  ((_a = EditFormationController).o5t = "EditBattleTeamForbitState"),
  (EditFormationController.r5t = void 0),
  (EditFormationController.CanOpenView = (o) => {
    if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10007))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Formation", 5, "打开编队按钮时，未满足开启条件"),
        !1
      );
    var r = ModelManager_1.ModelManager.SceneTeamModel;
    if (r.IsPhantomTeam)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Formation",
            32,
            "打开编队按钮时，当前编队为声骸编队，无法打开",
          ),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterFormationTip",
        ),
        !1
      );
    r = r.GetCurrentEntity;
    if (!r?.Valid)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Formation", 5, "打开编队按钮时，当前实体不存在"),
        !1
      );
    var t = r.Entity.GetComponent(188);
    if (!t?.Valid)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Formation",
            5,
            "打开编队按钮时，当前实体的 TagComponent 不存在",
          ),
        !1
      );
    var e = r.Entity.GetComponent(159);
    if (!e?.Valid)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Formation",
            5,
            "打开编队按钮时，当前实体的 CharacterBuffComponent 不存在",
          ),
        !1
      );
    if (RoleController_1.RoleController.IsInRoleTrial())
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 5, "打开编队按钮时，有试用角色无法打开"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          EditFormationController.o5t,
        ),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleTeamLimit",
        ),
        !1
      );
    if (t.HasTag(855966206))
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色正在水中"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          EditFormationController.o5t,
        ),
        !1
      );
    if (t.HasTag(191377386))
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Formation",
            5,
            "打开编队按钮时，当前角色正在播放溺水",
          ),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          EditFormationController.o5t,
        ),
        !1
      );
    if (t.HasTag(40422668))
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色处于空中"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          EditFormationController.o5t,
        ),
        !1
      );
    if (t.HasTag(1996802261))
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色在战斗中"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ForbiddenActionInFight",
        ),
        !1
      );
    if (t.HasTag(-1697149502))
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 7, "打开编队按钮时，当前角色不能切人"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          EditFormationController.o5t,
        ),
        !1
      );
    if (t.HasTag(-2100129479)) {
      var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        r.Entity,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantVision,
      );
      if (t && t.Entity.GetComponent(188)?.HasTag(40422668))
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              5,
              "打开编队按钮时，当前角色为声骸变身状态且处于空中",
            ),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            EditFormationController.o5t,
          ),
          !1
        );
    }
    return 0 < e.GetBuffTotalStackById(BigInt("90003001"))
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Formation", 36, "打开编队按钮时，当前角色在电梯中"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          EditFormationController.o5t,
        ),
        !1)
      : !(
          (t = r.Entity.GetComponent(70)) &&
          0 < t.WalkOnWaterStage &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              37,
              "打开编队按钮时，当前角色在水面上行走",
            ),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            EditFormationController.o5t,
          ),
          1)
        );
  }),
  (EditFormationController.Q5e = () => {
    EditFormationController.GetFormationDataRequest();
  }),
  (EditFormationController.xie = () => {
    var o =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem
        ?.GetConfigId;
    o &&
      ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.SetCurrentRole(
        o,
      );
  }),
  (EditFormationController.$Ge = (o) => {
    "EditFormationView" === o &&
      EditFormationController.r5t &&
      ((o = EditFormationController.r5t.lUs),
      ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(o),
      (EditFormationController.r5t = void 0));
  }),
  (EditFormationController.i5t = (o) => {
    var r = o.lUs;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Formation", 49, "更新背包编队", ["formations", r]),
      ModelManager_1.ModelManager.OnlineModel.RefreshWorldTeamRoleInfo(r),
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      UiManager_1.UiManager.IsViewOpen("EditFormationView")
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              49,
              "更新背包编队时联机打开界面中，进行缓存",
            ),
          (_a.r5t = o))
        : ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(
            r,
          );
  });
//# sourceMappingURL=EditFormationController.js.map
