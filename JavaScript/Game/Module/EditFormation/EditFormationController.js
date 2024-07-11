"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const RoleController_1 = require("../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class EditFormationController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.w4e,
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
      this.w4e,
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
    Net_1.Net.Register(12661, EditFormationController.t4t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(12661);
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
    const o = new Protocol_1.Aki.Protocol.jzn();
    Net_1.Net.Call(13807, o, (o) => {});
  }
  static async EditFormationRequest(o) {
    let t;
    let r;
    const e = new Array();
    const n = ModelManager_1.ModelManager.EditFormationModel;
    for ([t, r] of n.GetAllEditingFormation()) {
      const i = t === o;
      if (!(i && r.length <= 0)) {
        if (t === n.GetCurrentFormationId) {
          const a = n.GetFormationData(t)?.GetRoleIdList;
          if (a && a.length === r.length) {
            let t = !0;
            for (let o = 0; o < a.length; o++)
              if (a[o] !== r[o]) {
                t = !1;
                break;
              }
            if (t) {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Formation", 49, "更新单机编队，新旧编队相同");
              continue;
            }
          }
        }
        let o = r.length > 0 ? r[0] : 0;
        if (i) {
          var l = n.GetCurrentFormationData;
          const _ = l.GetCurrentRolePosition;
          if (
            ((o = l.GetCurrentRoleConfigId),
            r.includes(o) || (o = _ <= r.length ? r[_ - 1] : r[0]),
            n.IsRoleDead(o))
          )
            for (const m of r)
              if (m !== o && !n.IsRoleDead(m)) {
                o = m;
                break;
              }
        }
        l = new Protocol_1.Aki.Protocol.Iks();
        (l.$4n = t), (l.X4n = i), (l.xkn = r), (l.Y4n = o), e.push(l);
      }
    }
    const g = new Protocol_1.Aki.Protocol.kzn();
    (g.J4n = e),
      ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Formation", 49, "更新单机编队", ["formations", e]),
      await Net_1.Net.CallAsync(13164, g);
  }
  static async UpdateFormationRequest(o, t, r, e) {
    const n = new Protocol_1.Aki.Protocol.Iks();
    var o =
      ((n.$4n = o),
      (n.X4n = t),
      (n.xkn = r),
      (n.Y4n = e),
      new Protocol_1.Aki.Protocol.kzn());
    var t =
      ((o.J4n = [n]),
      ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Formation", 49, "更新单机编队", ["formation", n]),
      await Net_1.Net.CallAsync(13164, o));
    return void 0 !== t;
  }
  static async UpdateFightRoleRequest() {
    const t = ModelManager_1.ModelManager.EditFormationModel;
    const r = t.GetEditingRoleIdList(-1);
    if (!(r.length <= 0)) {
      let e = t.GetCurrentFormationData.GetCurrentRolePosition;
      let o = t.GetEditingRoleId(-1, e);
      if (!o || t.IsRoleDead(o))
        for (const n of r)
          if (n !== o && !t.IsRoleDead(n)) {
            o = n;
            break;
          }
      o
        ? (((e = new Protocol_1.Aki.Protocol.Vzn()).z4n = o),
          (e.xkn = r),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Formation", 49, "更新联机编队", ["massage", e]),
          ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform(),
          await Net_1.Net.CallAsync(28496, e))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Formation", 49, "更新联机编队，找不到当前角色");
    }
  }
}
(exports.EditFormationController = EditFormationController),
  ((_a = EditFormationController).i4t = "EditBattleTeamForbitState"),
  (EditFormationController.o4t = void 0),
  (EditFormationController.CanOpenView = (o) => {
    let t, r, e;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10007)
      ? (t = ModelManager_1.ModelManager.SceneTeamModel).IsPhantomTeam
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Formation",
              32,
              "打开编队按钮时，当前编队为声骸编队，无法打开",
            ),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "PhantomFormationEnterFormationTip",
          ),
          !1)
        : (t = t.GetCurrentEntity)?.Valid
          ? (e = t.Entity.GetComponent(185))?.Valid
            ? (r = t.Entity.GetComponent(157))?.Valid
              ? RoleController_1.RoleController.IsInRoleTrial()
                ? (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Formation",
                      5,
                      "打开编队按钮时，有试用角色无法打开",
                    ),
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    EditFormationController.i4t,
                  ),
                  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "TrialRoleTeamLimit",
                  ),
                  !1)
                : e.HasTag(855966206)
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Formation",
                        5,
                        "打开编队按钮时，当前角色正在水中",
                      ),
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      EditFormationController.i4t,
                    ),
                    !1)
                  : e.HasTag(191377386)
                    ? (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "Formation",
                          5,
                          "打开编队按钮时，当前角色正在播放溺水",
                        ),
                      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        EditFormationController.i4t,
                      ),
                      !1)
                    : e.HasTag(40422668)
                      ? (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "Formation",
                            5,
                            "打开编队按钮时，当前角色处于空中",
                          ),
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                          EditFormationController.i4t,
                        ),
                        !1)
                      : e.HasTag(1996802261)
                        ? (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Formation",
                              5,
                              "打开编队按钮时，当前角色在战斗中",
                            ),
                          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                            "ForbiddenActionInFight",
                          ),
                          !1)
                        : e.HasTag(-1697149502)
                          ? (Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "Formation",
                                7,
                                "打开编队按钮时，当前角色不能切人",
                              ),
                            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                              EditFormationController.i4t,
                            ),
                            !1)
                          : r.GetBuffTotalStackById(BigInt("90003001")) > 0
                            ? (Log_1.Log.CheckInfo() &&
                                Log_1.Log.Info(
                                  "Formation",
                                  36,
                                  "打开编队按钮时，当前角色在电梯中",
                                ),
                              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                                EditFormationController.i4t,
                              ),
                              !1)
                            : !(
                                (e = t.Entity.GetComponent(68)) &&
                                e.WalkOnWaterStage > 0 &&
                                (Log_1.Log.CheckInfo() &&
                                  Log_1.Log.Info(
                                    "Formation",
                                    37,
                                    "打开编队按钮时，当前角色在水面上行走",
                                  ),
                                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                                  EditFormationController.i4t,
                                ),
                                1)
                              )
              : (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Formation",
                    5,
                    "打开编队按钮时，当前实体的 CharacterBuffComponent 不存在",
                  ),
                !1)
            : (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Formation",
                  5,
                  "打开编队按钮时，当前实体的 TagComponent 不存在",
                ),
              !1)
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Formation", 5, "打开编队按钮时，当前实体不存在"),
            !1)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Formation", 5, "打开编队按钮时，未满足开启条件"),
        !1);
  }),
  (EditFormationController.w4e = () => {
    EditFormationController.GetFormationDataRequest();
  }),
  (EditFormationController.xie = () => {
    const o =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem
        ?.GetConfigId;
    o &&
      ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.SetCurrentRole(
        o,
      );
  }),
  (EditFormationController.$Ge = (o) => {
    o === "EditFormationView" &&
      EditFormationController.o4t &&
      ((o = EditFormationController.o4t.HLs),
      ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(o),
      (EditFormationController.o4t = void 0));
  }),
  (EditFormationController.t4t = (o) => {
    const t = o.HLs;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Formation", 49, "更新背包编队", ["formations", t]),
      ModelManager_1.ModelManager.OnlineModel.RefreshWorldTeamRoleInfo(t),
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      UiManager_1.UiManager.IsViewOpen("EditFormationView")
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              49,
              "更新背包编队时联机打开界面中，进行缓存",
            ),
          (_a.o4t = o))
        : ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(
            t,
          );
  });
// # sourceMappingURL=EditFormationController.js.map
