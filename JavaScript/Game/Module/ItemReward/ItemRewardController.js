"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemRewardController = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
  Log_1 = require("../../../Core/Common/Log"),
  Net_1 = require("../../../Core/Net/Net"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  GachaController_1 = require("../Gacha/GachaController"),
  ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController"),
  ItemRewardDefine_1 = require("./ItemRewardDefine"),
  RewardItemData_1 = require("./RewardData/RewardItemData");
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(5944, this.Bgi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(5944);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemRewardNotify,
      this.bgi,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemRewardNotify,
      this.bgi,
    );
  }
  static GetRewardViewReasonArray() {
    if (!this.RewardViewReasonArray) {
      this.RewardViewReasonArray = [];
      for (const e of ConfigManager_1.ConfigManager.ItemRewardConfig?.GetAllRewardViewFromSourceConfig())
        this.RewardViewReasonArray.push(e.RewardSourceId);
    }
    return this.RewardViewReasonArray;
  }
  static OpenCommonRewardView(e, r, t) {
    e =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(
        e,
        "CommonRewardView",
        r,
        t,
      );
    e && this.Open(e);
  }
  static OpenQuestRewardView(e, r, t) {
    e =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(
        e,
        "QuestRewardView",
        r,
        t,
      );
    e && this.Open(e);
  }
  static OpenExploreLevelRewardView(e) {
    var r =
      ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData();
    r &&
      ((r = r.GetExploreLevel()),
      (r =
        ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreLevelRewardData(
          "ExploreLevelRewardView",
          r,
          r + 1,
          e,
        )),
      this.Open(r));
  }
  static OpenCompositeRewardView(e, r = !0, t, a) {
    e =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshCompositeRewardDataFromConfig(
        e,
        r,
        t,
        a,
      );
    e && this.Open(e);
  }
  static OpenExploreRewardView(e, r = !0, t, a, o, i, n, l, d, s, _) {
    e =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(
        e,
        r,
        t,
        a,
        o,
        i,
        n,
        l,
        d,
        s,
      );
    return !!e && (this.Open(e, _), !0);
  }
  static Open(e, t) {
    var r;
    UiManager_1.UiManager.IsViewOpen("DrawMainView") ||
      ((r = e.GetRewardInfo()),
      UiManager_1.UiManager.IsViewOpen(r.ViewName)
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshRewardView,
            e,
          )
        : ((r = r.ViewName),
          UiManager_1.UiManager.OpenView(r, e, (e, r) => {
            t?.(e),
              e && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(r);
          })));
  }
  static Close(e) {
    e
      ? ((e = e.GetRewardInfo().ViewName),
        UiManager_1.UiManager.IsViewShow(e) &&
          UiManager_1.UiManager.CloseView(e))
      : (UiManager_1.UiManager.IsViewShow("CommonRewardView") &&
          UiManager_1.UiManager.CloseView("CommonRewardView"),
        UiManager_1.UiManager.IsViewShow("CompositeRewardView") &&
          UiManager_1.UiManager.CloseView("CompositeRewardView"),
        UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
          UiManager_1.UiManager.CloseView("ExploreRewardView"));
  }
  static SetItemList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetItemList(e);
  }
  static AddItemList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.AddItemList(e);
  }
  static SetProgressQueue(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetProgressQueue(e);
  }
  static SetExploreBarDataList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreBarDataList(e);
  }
  static SetExploreRecordInfo(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreRecordInfo(e);
  }
  static SetButtonList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetButtonList(e);
  }
  static PlayAudio(e, r) {
    var t;
    StringUtils_1.StringUtils.IsEmpty(e) ||
      ((t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e)) &&
        (AudioController_1.AudioController.PostEventByUi(t.Path, r),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Test", 8, "[ItemReward]播放结算音频", ["audioId", e]));
  }
}
(exports.ItemRewardController = ItemRewardController),
  ((_a = ItemRewardController).RewardViewReasonArray = void 0),
  (ItemRewardController.bgi = (e) => {
    var r = e.Y5n;
    if (!(r.length <= 0)) {
      var t = [];
      for (const i of r) {
        var a = new RewardItemData_1.RewardItemData(i.G3n, i.I5n, i.Q5n);
        t.push(a);
      }
      var r = ModelManager_1.ModelManager.ItemRewardModel,
        o = e.V5n;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[ItemRewardController]当掉落协议通知时", [
          "reasonId",
          o,
        ]),
        r.CurrentReasonId !== o && r.ClearCurrentRewardData(),
        (r.CurrentReasonId = o) === ItemRewardDefine_1.EXPLORE_LEVEL_RESON
          ? ItemRewardController.OpenExploreLevelRewardView(t)
          : o === ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD
            ? (ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = t)
            : o === ItemRewardDefine_1.BLACK_STONE_RESON
              ? ((r = []).push({
                  ButtonTextId: "ConfirmBox_45_ButtonText_1",
                  DescriptionTextId: void 0,
                  DescriptionArgs: void 0,
                  IsTimeDownCloseView: !1,
                  IsClickedCloseView: !1,
                  OnClickedCallback: (e) => {
                    UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
                      UiManager_1.UiManager.CloseView("ExploreRewardView");
                  },
                }),
                (e =
                  1 < e.W5n
                    ? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip(
                        [3],
                        !1,
                      )
                    : void 0),
                ItemRewardController.OpenExploreRewardView(
                  ItemRewardDefine_1.BLACK_STONE_CONFIG,
                  !0,
                  t,
                  void 0,
                  void 0,
                  r,
                  void 0,
                  void 0,
                  void 0,
                  e,
                ))
              : ((r = _a.GetRewardViewReasonArray().includes(o)
                  ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
                      o,
                    )
                  : void 0),
                o === ItemRewardDefine_1.QUEST_SPECIAL_REWARD && r
                  ? ItemRewardController.OpenQuestRewardView(r.RewardViewId, t)
                  : r
                    ? ((e = r.RewardViewId),
                      ItemRewardController.OpenCommonRewardView(e, t))
                    : ItemRewardController.AddItemList(t));
    }
  }),
  (ItemRewardController.Bgi = (e) => {
    var r = e._gs;
    if (!(r.length <= 0)) {
      var t = [];
      const o = [];
      for (const i of r)
        if (
          1 !==
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
            i.Ekn,
          )
        ) {
          var a = new RewardItemData_1.RewardItemData(i.Ekn, i.I5n, i.Q5n);
          t.push(a);
        } else for (let e = 0; e < i.I5n; e++) o.push(i.Ekn);
      (r = ModelManager_1.ModelManager.ItemRewardModel),
        (e = e.V5n),
        (r =
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              8,
              "[ItemRewardController]当服务端通知奖励获得时",
              ["reasonId", e],
            ),
          r.CurrentReasonId !== e && r.ClearCurrentRewardData(),
          (r.CurrentReasonId = e),
          _a.GetRewardViewReasonArray().includes(e)
            ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
                e,
              )
            : void 0));
      if (r) {
        (e = r.RewardViewId), (r = r.RewardSourceId);
        if (
          r !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON ||
          ItemExchangeController_1.ItemExchangeController.NeedPop
        )
          if (r === ItemRewardDefine_1.QUEST_SPECIAL_REWARD)
            ItemRewardController.OpenQuestRewardView(e, t);
          else if (0 === o.length)
            ItemRewardController.OpenCommonRewardView(e, t);
          else if (0 === t.length)
            for (const n of o)
              GachaController_1.GachaController.CommonShowRoleResult(n, !0, !1);
          else
            ItemRewardController.OpenCommonRewardView(e, t, () => {
              for (const e of o)
                GachaController_1.GachaController.CommonShowRoleResult(
                  e,
                  !0,
                  !1,
                );
            });
      } else ItemRewardController.AddItemList(t);
    }
  });
//# sourceMappingURL=ItemRewardController.js.map
