"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemControl = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
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
    Net_1.Net.Register(19639, BuffItemControl.B0t),
      Net_1.Net.Register(17326, BuffItemControl.b0t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19639), Net_1.Net.UnRegister(17326);
  }
  static RequestUseBuffItem(e, g, r) {
    var t = new Protocol_1.Aki.Protocol.yzn();
    (t.L8n = e),
      (t.D8n = g),
      (t.Q6n = r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BuffItem", 37, "[Inventory]客户端请求使用Buff道具", [
          "massage",
          t,
        ]);
    Net_1.Net.Call(16850, t, (r) => {
      if (r.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        var t = r._Ls;
        if (t) {
          var o = t.L8n,
            i = MathUtils_1.MathUtils.LongToNumber(t.lLs),
            t = TimeUtil_1.TimeUtil.GetServerTime();
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BuffItem",
              37,
              "[Inventory]服务端返回Buff道具数据",
              ["endTimeStamp", i],
              ["nowTimeStamp", t],
              ["remainingTime", i - t],
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
            n =
              ((e = e.replace("{0}", t)),
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                e,
              ),
              ModelManager_1.ModelManager.BuffItemModel),
            t = ConfigManager_1.ConfigManager.BuffItemConfig,
            a = (n.SetCurrentUseBuffItemId(o), t.GetBuffItemConfig(o));
          if (a) {
            var f = a.PublicCdGroup;
            if (f) {
              var _ = t.GetBuffItemConfigByPublicCdGroup(f),
                l = t.GetBuffItemCdGroup(f);
              for (const s of _)
                n.SetBuffItemCdTimeStamp(s.Id, i, l.CoolDownTime);
            } else n.SetBuffItemCdTimeStamp(o, i, a.Cd);
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnUseBuffItem,
              o,
              i,
              g,
            );
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "BuffItem",
                37,
                "[Inventory]服务端返回Buff道具数据时，s.属性奖励表中找不到对应Buff道具",
                ["massage", r],
              );
        }
      }
    });
  }
  static W4l(e) {
    var r = e.L8n;
    if (0 !== r) {
      var t = MathUtils_1.MathUtils.LongToNumber(e.lLs),
        o = ConfigManager_1.ConfigManager.BuffItemConfig,
        i = ModelManager_1.ModelManager.BuffItemModel,
        n = o.GetBuffItemConfig(r);
      if (n) {
        var a = n.PublicCdGroup;
        if (a) {
          var f = o.GetBuffItemConfigByPublicCdGroup(a),
            _ = o.GetBuffItemCdGroup(a);
          for (const l of f) i.SetBuffItemCdTimeStamp(l.Id, t, _.CoolDownTime);
        } else i.SetBuffItemCdTimeStamp(r, t, n.Cd);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "BuffItem",
            37,
            "[Inventory]服务端通知Buff道具进入CD时，s.属性奖励表中找不到对应Buff道具",
            ["ItemId", e.L8n],
          );
    }
  }
  static Q4l(e, r = !1) {
    var t = e.L8n,
      e = e.WI_,
      o = ModelManager_1.ModelManager.BuffItemModel.IsEquippedBuffItem(t);
    r &&
      ((r = !o && e) || (o && !e)) &&
      UiManager_1.UiManager.IsViewOpen("InventoryView") &&
      0 <
        (o =
          ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffEquipItemByItemId(
            t,
          )).length &&
      ((r = r ? o[0].EquipTips : o[0].UnEquipTips),
      StringUtils_1.StringUtils.IsEmpty(r) ||
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(r)),
      ModelManager_1.ModelManager.BuffItemModel.SetBuffEquipItem(t, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEquipBuffItemUpdate,
        t,
        e,
      );
  }
  static InitializeAllUseBuffItemRoleFromPlayerFormationInstance(i) {
    var n = ModelManager_1.ModelManager.BuffItemModel,
      e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
    for (let o = 0; o < e.length; o++) {
      var a = e[o];
      if (!(a.GetConfigId > TRIAL_ROLE_ID)) {
        var f = o + 1,
          _ = a.GetConfigId,
          l = ModelManager_1.ModelManager.RoleModel.GetRoleName(_),
          a = a.EntityHandle,
          s = a?.Entity?.GetComponent(171);
        let e = 0,
          r = 0,
          t = 0;
        s &&
          ((e = s.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
          )),
          (r = s.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n)),
          (t = s.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Life,
          ))),
          n.NewUseBuffItemRoleData(l, f, _, e, t, r, i, a.Entity);
      }
    }
  }
  static TryUseResurrectionItem(e) {
    var r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "use_buff_item_id_list",
      ),
      t = ModelManager_1.ModelManager.InventoryModel,
      o = ModelManager_1.ModelManager.BuffItemModel,
      i = ConfigManager_1.ConfigManager.BuffItemConfig;
    let n = !0,
      a = !0,
      f = MathUtils_1.MathUtils.MaxFloat;
    for (const s of r)
      if (!(t.GetItemCountByConfigId(s) <= 0) && i.IsResurrectionItem(s)) {
        n = !1;
        var _,
          l = o.GetBuffItemRemainCdTime(s);
        if (!(0 < l))
          return (
            (a = !1),
            (_ = new ReviveItemView_1.ReviveItemData(e, r, s)),
            UiManager_1.UiManager.IsViewShow("UseReviveItemView") ||
              UiManager_1.UiManager.OpenView("UseReviveItemView", _),
            !0
          );
        l < f && (f = l);
      }
    return (
      n
        ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "NotResurrectionItem",
          )
        : a &&
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "AllResurrectionItemInCd",
            f.toFixed(0),
          ),
      !1
    );
  }
}
(exports.BuffItemControl = BuffItemControl),
  ((_a = BuffItemControl).B0t = (e) => {
    var r = e.uLs;
    if (r) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BuffItem", 37, "[Inventory]服务端通知Buff道具数据");
      for (const t of r) _a.W4l(t);
    }
    r = e.QI_;
    if (r) for (const o of r) _a.Q4l(o);
  }),
  (BuffItemControl.b0t = (e) => {
    e.cLs &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "BuffItem",
          37,
          "[Inventory]服务端通知Buff道具进入CD",
          ["ItemId", e.cLs.L8n],
          ["Cd", e.cLs.lLs],
        ),
      _a.W4l(e.cLs));
    e = e.QI_;
    if (e) for (const r of e) _a.Q4l(r, !0);
  });
//# sourceMappingURL=BuffItemControl.js.map
