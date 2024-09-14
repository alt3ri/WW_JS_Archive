"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemControl = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ReviveItemView_1 = require("../DeadRevive/views/ReviveItemView"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TRIAL_ROLE_ID = 1e4;
class BuffItemControl extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19358, BuffItemControl.B0t),
      Net_1.Net.Register(23554, BuffItemControl.b0t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19358), Net_1.Net.UnRegister(23554);
  }
  static RequestUseBuffItem(e, g, r) {
    var t = new Protocol_1.Aki.Protocol.yzn();
    (t.L8n = e),
      (t.D8n = g),
      (t.Q6n = r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BuffItem", 8, "[Inventory]客户端请求使用Buff道具", [
          "massage",
          t,
        ]);
    Net_1.Net.Call(20487, t, (r) => {
      if (r.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        var t = r._Ls;
        if (t) {
          var o = t.L8n,
            a = MathUtils_1.MathUtils.LongToNumber(t.lLs),
            t = TimeUtil_1.TimeUtil.GetServerTime();
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BuffItem",
              8,
              "[Inventory]服务端返回Buff道具数据",
              ["endTimeStamp", a],
              ["nowTimeStamp", t],
              ["remainingTime", a - t],
              ["massage", r],
            );
          let e =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "UseBuffItemText",
            );
          var t =
              ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
                o,
              ).Name,
            t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t),
            i =
              ((e = e.replace("{0}", t)),
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                e,
              ),
              ModelManager_1.ModelManager.BuffItemModel),
            t = ConfigManager_1.ConfigManager.BuffItemConfig,
            n = (i.SetCurrentUseBuffItemId(o), t.GetBuffItemConfig(o));
          if (n) {
            var f = n.PublicCdGroup;
            if (f) {
              var s = t.GetBuffItemConfigByPublicCdGroup(f),
                l = t.GetBuffItemCdGroup(f);
              for (const _ of s)
                i.SetBuffItemCdTimeStamp(_.Id, a, l.CoolDownTime);
            } else i.SetBuffItemCdTimeStamp(o, a, n.Cd);
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnUseBuffItem,
              o,
              a,
              g,
            );
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "BuffItem",
                8,
                "[Inventory]服务端返回Buff道具数据时，s.属性奖励表中找不到对应Buff道具",
                ["massage", r],
              );
        }
      }
    });
  }
  static InitializeAllUseBuffItemRoleFromPlayerFormationInstance(a) {
    var i = ModelManager_1.ModelManager.BuffItemModel,
      e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
    for (let o = 0; o < e.length; o++) {
      var n = e[o];
      if (!(n.GetConfigId > TRIAL_ROLE_ID)) {
        var f = o + 1,
          s = n.GetConfigId,
          l = ModelManager_1.ModelManager.RoleModel.GetRoleName(s),
          n = n.EntityHandle,
          _ = n?.Entity?.GetComponent(159);
        let e = 0,
          r = 0,
          t = 0;
        _ &&
          ((e = _.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
          )),
          (r = _.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n)),
          (t = _.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Life,
          ))),
          i.NewUseBuffItemRoleData(l, f, s, e, t, r, a, n.Entity);
      }
    }
  }
  static TryUseResurrectionItem(e) {
    var r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "use_buff_item_id_list",
      ),
      t = ModelManager_1.ModelManager.InventoryModel,
      o = ModelManager_1.ModelManager.BuffItemModel,
      a = ConfigManager_1.ConfigManager.BuffItemConfig;
    let i = !0,
      n = !0,
      f = MathUtils_1.MathUtils.MaxFloat;
    for (const _ of r)
      if (!(t.GetItemCountByConfigId(_) <= 0) && a.IsResurrectionItem(_)) {
        i = !1;
        var s,
          l = o.GetBuffItemRemainCdTime(_);
        if (!(0 < l))
          return (
            (n = !1),
            (s = new ReviveItemView_1.ReviveItemData(e, r, _)),
            UiManager_1.UiManager.IsViewShow("UseReviveItemView") ||
              UiManager_1.UiManager.OpenView("UseReviveItemView", s),
            !0
          );
        l < f && (f = l);
      }
    return (
      i
        ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "NotResurrectionItem",
          )
        : n &&
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "AllResurrectionItemInCd",
            f.toFixed(0),
          ),
      !1
    );
  }
}
((exports.BuffItemControl = BuffItemControl).B0t = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info("BuffItem", 8, "[Inventory]服务端通知Buff道具数据", [
      "massage",
      e,
    ]);
  var r = e.uLs;
  if (r) {
    var t = ModelManager_1.ModelManager.BuffItemModel,
      o = ConfigManager_1.ConfigManager.BuffItemConfig;
    for (const _ of r) {
      var a = _.L8n,
        i = MathUtils_1.MathUtils.LongToNumber(_.lLs),
        n = o.GetBuffItemConfig(a);
      if (n) {
        var f = n.PublicCdGroup;
        if (f) {
          var s = o.GetBuffItemConfigByPublicCdGroup(f),
            l = o.GetBuffItemCdGroup(f);
          for (const g of s) t.SetBuffItemCdTimeStamp(g.Id, i, l.CoolDownTime);
        } else t.SetBuffItemCdTimeStamp(a, i, n.Cd);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "BuffItem",
            8,
            "[Inventory]服务端通知Buff道具数据时，s.属性奖励表中找不到对应Buff道具",
            ["massage", e],
          );
    }
  }
}),
  (BuffItemControl.b0t = (e) => {
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BuffItem", 8, "[Inventory]服务端通知Buff道具进入CD", [
          "massage",
          e,
        ]),
      e.cLs)
    ) {
      var r = e.cLs.L8n,
        t = MathUtils_1.MathUtils.LongToNumber(e.cLs.lLs),
        o = ConfigManager_1.ConfigManager.BuffItemConfig,
        a = ModelManager_1.ModelManager.BuffItemModel,
        i = o.GetBuffItemConfig(r);
      if (i) {
        var n = i.PublicCdGroup;
        if (n) {
          var f = o.GetBuffItemConfigByPublicCdGroup(n),
            s = o.GetBuffItemCdGroup(n);
          for (const l of f) a.SetBuffItemCdTimeStamp(l.Id, t, s.CoolDownTime);
        } else a.SetBuffItemCdTimeStamp(r, t, i.Cd);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "BuffItem",
            8,
            "[Inventory]服务端通知Buff道具进入CD时，s.属性奖励表中找不到对应Buff道具",
            ["massage", e],
          );
    }
  });
//# sourceMappingURL=BuffItemControl.js.map
