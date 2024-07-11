"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemControl = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ReviveItemView_1 = require("../DeadRevive/views/ReviveItemView");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const TRIAL_ROLE_ID = 1e4;
class BuffItemControl extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnClear() {
    return !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20093, BuffItemControl.Egt),
      Net_1.Net.Register(22628, BuffItemControl.ygt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20093), Net_1.Net.UnRegister(22628);
  }
  static RequestUseBuffItem(e, g, r) {
    const t = new Protocol_1.Aki.Protocol.EQn();
    (t.G3n = e),
      (t.O3n = g),
      (t.l3n = r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BuffItem", 8, "[Inventory]客户端请求使用Buff道具", [
          "massage",
          t,
        ]);
    Net_1.Net.Call(17917, t, (r) => {
      if (r.lkn === Protocol_1.Aki.Protocol.lkn.Sys) {
        var t = r.OSs;
        if (t) {
          const o = t.G3n;
          const a = MathUtils_1.MathUtils.LongToNumber(t.GSs);
          var t = TimeUtil_1.TimeUtil.GetServerTime();
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
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o).Name;
          var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
          const i =
            ((e = e.replace("{0}", t)),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e),
            ModelManager_1.ModelManager.BuffItemModel);
          var t = ConfigManager_1.ConfigManager.BuffItemConfig;
          const n = (i.SetCurrentUseBuffItemId(o), t.GetBuffItemConfig(o));
          if (n) {
            const f = n.PublicCdGroup;
            if (f) {
              const s = t.GetBuffItemConfigByPublicCdGroup(f);
              const l = t.GetBuffItemCdGroup(f);
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
    const i = ModelManager_1.ModelManager.BuffItemModel;
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
    for (let o = 0; o < e.length; o++) {
      var n = e[o];
      if (!(n.GetConfigId > TRIAL_ROLE_ID)) {
        const f = o + 1;
        const s = n.GetConfigId;
        const l = ModelManager_1.ModelManager.RoleModel.GetRoleName(s);
        var n = n.EntityHandle;
        const _ = n?.Entity?.GetComponent(156);
        let e = 0;
        let r = 0;
        let t = 0;
        _ &&
          ((e = _.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
          )),
          (r = _.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn)),
          (t = _.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Life,
          ))),
          i.NewUseBuffItemRoleData(l, f, s, e, t, r, a, n.Entity);
      }
    }
  }
  static TryUseResurrectionItem(e) {
    const r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "use_buff_item_id_list",
    );
    const t = ModelManager_1.ModelManager.InventoryModel;
    const o = ModelManager_1.ModelManager.BuffItemModel;
    const a = ConfigManager_1.ConfigManager.BuffItemConfig;
    let i = !0;
    let n = !0;
    let f = MathUtils_1.MathUtils.MaxFloat;
    for (const _ of r)
      if (!(t.GetItemCountByConfigId(_) <= 0) && a.IsResurrectionItem(_)) {
        i = !1;
        var s;
        const l = o.GetBuffItemRemainCdTime(_);
        if (!(l > 0))
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
((exports.BuffItemControl = BuffItemControl).Egt = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info("BuffItem", 8, "[Inventory]服务端通知Buff道具数据", [
      "massage",
      e,
    ]);
  const r = e.kSs;
  if (r) {
    const t = ModelManager_1.ModelManager.BuffItemModel;
    const o = ConfigManager_1.ConfigManager.BuffItemConfig;
    for (const _ of r) {
      const a = _.G3n;
      const i = MathUtils_1.MathUtils.LongToNumber(_.GSs);
      const n = o.GetBuffItemConfig(a);
      if (n) {
        const f = n.PublicCdGroup;
        if (f) {
          const s = o.GetBuffItemConfigByPublicCdGroup(f);
          const l = o.GetBuffItemCdGroup(f);
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
  (BuffItemControl.ygt = (e) => {
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BuffItem", 8, "[Inventory]服务端通知Buff道具进入CD", [
          "massage",
          e,
        ]),
      e.NSs)
    ) {
      const r = e.NSs.G3n;
      const t = MathUtils_1.MathUtils.LongToNumber(e.NSs.GSs);
      const o = ConfigManager_1.ConfigManager.BuffItemConfig;
      const a = ModelManager_1.ModelManager.BuffItemModel;
      const i = o.GetBuffItemConfig(r);
      if (i) {
        const n = i.PublicCdGroup;
        if (n) {
          const f = o.GetBuffItemConfigByPublicCdGroup(n);
          const s = o.GetBuffItemCdGroup(n);
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
// # sourceMappingURL=BuffItemControl.js.map
