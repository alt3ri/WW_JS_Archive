"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemRewardController = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
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
  FriendController_1 = require("../Friend/FriendController"),
  GachaController_1 = require("../Gacha/GachaController"),
  ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController"),
  ItemRewardDefine_1 = require("./ItemRewardDefine"),
  RewardItemData_1 = require("./RewardData/RewardItemData");
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25285, this.tfa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25285);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemRewardNotify,
      this.b0i,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemRewardNotify,
      this.b0i,
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
  static OpenExploreRewardView(e, r = !0, t, a, o, i, n, l, d, s, _, w, g) {
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
        w,
        g,
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
  static SetExploreFriendDataList(e) {
    ModelManager_1.ModelManager.ItemRewardModel.SetExploreFriendDataList(e);
  }
  static BuildExploreFriendDataList() {
    var e,
      r,
      t,
      a,
      o = [],
      i = ModelManager_1.ModelManager.FriendModel,
      n = ModelManager_1.ModelManager.OnlineModel;
    for (const l of n.GetTeamList())
      l.IsSelf ||
        ((a = l.PlayerId),
        (r = (e = n.GetCurrentTeamListById(a))
          ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.HeadId)
              .RoleHeadIconCircle
          : ""),
        (t = e ? ItemRewardController.zYs(e.PlayerNumber) : ""),
        (a = {
          PlayerId: a,
          PlayerLevel: l.Level,
          IsMyFriend: i.IsMyFriend(a),
          PlayerName: e?.PlayerName ?? "",
          PlayerDesc: e?.Signature ?? "",
          PlayerIconPath: r,
          PlayerIndexPath: t,
          OnClickCallback: (e) => {
            FriendController_1.FriendController.RequestFriendApplyAddSend(
              e,
              Protocol_1.Aki.Protocol.S5s.Proto_RecentlyTeam,
            );
          },
        }),
        o.push(a));
    return o;
  }
  static zYs(e) {
    e = `FormationOnline${e}PIcon`;
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
  }
  static BuildExploreFriendIdList() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.OnlineModel.GetTeamList())
      r.IsSelf || e.push(r.PlayerId);
    return e;
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
  (ItemRewardController.b0i = (e) => {
    var r = e.U9n;
    if (!(r.length <= 0)) {
      var t = [];
      for (const i of r) {
        var a = new RewardItemData_1.RewardItemData(i.f8n, i.o9n, i.L9n);
        t.push(a);
      }
      var r = ModelManager_1.ModelManager.ItemRewardModel,
        o = e.E9n;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 8, "[ItemRewardController]当掉落协议通知时", [
          "reasonId",
          o,
        ]),
        r.CurrentReasonId !== o && r.ClearCurrentRewardData(),
        (r.CurrentReasonId = o) !==
          ItemRewardDefine_1.TRACK_MOON_PHASE_REWARD &&
          (o === ItemRewardDefine_1.EXPLORE_LEVEL_RESON
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
                    1 < e.I9n
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
                    ? ItemRewardController.OpenQuestRewardView(
                        r.RewardViewId,
                        t,
                      )
                    : r
                      ? ((e = r.RewardViewId),
                        ItemRewardController.OpenCommonRewardView(e, t))
                      : ItemRewardController.AddItemList(t)));
    }
  }),
  (ItemRewardController.tfa = (e) => {
    _a.OnItemObtainNotify(e);
  }),
  (ItemRewardController.OnItemObtainNotify = (e, r) => {
    var t = e.RMs;
    if (!(t.length <= 0)) {
      var a = [];
      const n = [];
      for (const l of t)
        if (
          1 !==
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
            l.J4n,
          )
        ) {
          var o = new RewardItemData_1.RewardItemData(l.J4n, l.o9n, l.L9n);
          a.push(o);
        } else for (let e = 0; e < l.o9n; e++) n.push(l.J4n);
      var t = ModelManager_1.ModelManager.ItemRewardModel,
        i = e.E9n,
        t =
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              8,
              "[ItemRewardController]当服务端通知奖励获得时",
              ["reasonId", i],
            ),
          t.CurrentReasonId !== i && t.ClearCurrentRewardData(),
          (t.CurrentReasonId = i),
          _a.GetRewardViewReasonArray().includes(i)
            ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
                i,
              )
            : void 0);
      if (t) {
        (i = t.RewardViewId), (t = t.RewardSourceId);
        if (
          t !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON ||
          ItemExchangeController_1.ItemExchangeController.NeedPop
        )
          if (t === ItemRewardDefine_1.QUEST_SPECIAL_REWARD)
            ItemRewardController.OpenQuestRewardView(i, a, r);
          else if (0 === n.length)
            ItemRewardController.OpenCommonRewardView(i, a, r);
          else if (0 === a.length)
            for (const d of n)
              GachaController_1.GachaController.CommonShowRoleResult(d, !0, !1);
          else
            ItemRewardController.OpenCommonRewardView(i, a, () => {
              for (const e of n)
                GachaController_1.GachaController.CommonShowRoleResult(
                  e,
                  !0,
                  !1,
                );
              r?.();
            });
      } else
        ItemRewardController.AddItemList(a),
          void 0 !== r &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Test", 9, "OnItemObtainNotify err", ["notify", e]);
    }
  });
//# sourceMappingURL=ItemRewardController.js.map
