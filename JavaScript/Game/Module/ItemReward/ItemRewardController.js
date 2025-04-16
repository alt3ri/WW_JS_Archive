"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemRewardController = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  PropRewardConfById_1 = require("../../../Core/Define/ConfigQuery/PropRewardConfById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  FriendController_1 = require("../Friend/FriendController"),
  GachaController_1 = require("../Gacha/GachaController"),
  ItemExchangeController_1 = require("../ItemExchange/ItemExchangeController"),
  RoleLevelUpSuccessController_1 = require("../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  ItemRewardDefine_1 = require("./ItemRewardDefine"),
  RewardItemData_1 = require("./RewardData/RewardItemData"),
  FLY_STRENGTH_MAX_ATTRIBUTE_INDEX = 138;
class ItemRewardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      (this.qKl =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "FlyStrengthItemId",
        )),
      !0
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26290, this.mMa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26290);
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
  static OpenCompositeRewardView(e, r = !0, t, o) {
    e =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshCompositeRewardDataFromConfig(
        e,
        r,
        t,
        o,
      );
    e && this.Open(e);
  }
  static OpenExploreRewardView(
    e,
    r = !0,
    t,
    o,
    a,
    n,
    i,
    l,
    d,
    _,
    s,
    g,
    C,
    m,
    w,
    M,
    I,
  ) {
    e =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(
        e,
        r,
        t,
        o,
        a,
        n,
        i,
        l,
        d,
        _,
        g,
        C,
        m,
        w,
        M,
        I,
      );
    return !!e && (this.Open(e, s), !0);
  }
  static OpenExploreRewardViewNew(e) {
    var r =
      ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfigNew(
        e,
      );
    return !!r && (this.Open(r, e.FinishCallback), !0);
  }
  static OpenBattlePassExtraRewardView(e) {
    e =
      ControllerHolder_1.ControllerHolder.BattlePassController.BuildExtraRewardData(
        e,
      );
    return this.Open(e, e.GetRewardInfo().FinishCallback), !0;
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
      o,
      a = [],
      n = ModelManager_1.ModelManager.FriendModel,
      i = ModelManager_1.ModelManager.OnlineModel;
    for (const l of i.GetTeamList())
      l.IsSelf ||
        ((o = l.PlayerId),
        (r = (e = i.GetCurrentTeamListById(o))
          ? ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
              l.HeadId,
              !1,
            ).GetRoleHeadIconCircle()
          : ""),
        (t = e ? ItemRewardController.$zs(e.PlayerNumber) : ""),
        (o = {
          PlayerId: o,
          PlayerLevel: l.Level,
          IsMyFriend: n.IsMyFriend(o),
          PlayerName: e?.PlayerName ?? "",
          PlayerDesc: e?.Signature ?? "",
          PlayerIconPath: r,
          PlayerIndexPath: t,
          OnClickCallback: (e) => {
            FriendController_1.FriendController.RequestFriendApplyAddSend(
              e,
              Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam,
            );
          },
        }),
        a.push(o));
    return a;
  }
  static $zs(e) {
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
        Log_1.Log.Debug("Test", 37, "[ItemReward]播放结算音频", [
          "audioId",
          e,
        ]));
  }
  static OpenSoarStrengthUpView(r) {
    var t =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "FlyStrengthItemId",
        ),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (t && t.Parameters) {
      let e = 0;
      for (var [, o] of t.Parameters) {
        e = o;
        break;
      }
      if (0 !== e) {
        var t = PropRewardConfById_1.configPropRewardConfById.GetConfig(e);
        if (t) {
          let e = 0;
          for (const a of t.Props)
            if (10 === a.Id) {
              e = a.Value;
              break;
            }
          0 !== e &&
            ((e *= r),
            (t =
              ControllerHolder_1.ControllerHolder.FormationAttributeController.GetBaseMax(
                10,
              )),
            (r = {
              Name: (r =
                ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                  FLY_STRENGTH_MAX_ATTRIBUTE_INDEX,
                )).Name,
              IconPath: r.Icon,
              ShowArrow: !0,
              PreText: Math.floor((t - e) / 100).toString(),
              CurText: Math.floor(t / 100).toString(),
            }),
            (t = {
              Title: "Flying_EnergyUp",
              StrengthUpgradeData: {
                AttributeId: 10,
                SingleStrengthValue:
                  CommonParamById_1.configCommonParamById.GetIntConfig(
                    "FlySingleStrengthValue",
                  ),
                MaxSingleStrengthItemCount:
                  CommonParamById_1.configCommonParamById.GetIntConfig(
                    "FlyMaxSingleStrengthItemCount",
                  ),
                MaxStrength: t,
              },
              AttributeInfo: [r],
            }),
            RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
              t,
            ));
        }
      }
    }
  }
}
(exports.ItemRewardController = ItemRewardController),
  ((_a = ItemRewardController).RewardViewReasonArray = void 0),
  (ItemRewardController.qKl = 0),
  (ItemRewardController.b0i = (r) => {
    var t = r.gws,
      o = Object.keys(t);
    if (t && o) {
      var a = [],
        n = [];
      let e = 0;
      for (const M of o) {
        var i = t[M]?.O9n;
        if (i && 0 !== i.length) {
          var l = Number(M);
          for (const I of i) {
            var d =
                ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
                  I.L8n,
                ),
              _ = new RewardItemData_1.RewardItemData(I.L8n, I.m9n, I.b9n, l);
            I.L8n === _a.qKl && (e += I.m9n), (11 === d ? n : a).push(_);
          }
        }
      }
      var o = ModelManager_1.ModelManager.ItemRewardModel,
        s = r.x9n;
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Test", 37, "[ItemRewardController]当掉落协议通知时", [
            "reasonId",
            s,
          ]),
        o.CurrentReasonId !== s && o.ClearCurrentRewardData(),
        (o.CurrentReasonId = s) !== ItemRewardDefine_1.TRACK_MOON_PHASE_REWARD)
      )
        if (s === ItemRewardDefine_1.EXPLORE_LEVEL_RESON)
          ItemRewardController.OpenExploreLevelRewardView(a);
        else if (s === ItemRewardDefine_1.ROGUE_INST_FIRST_REWARD)
          (ModelManager_1.ModelManager.RoguelikeModel.ShowRewardList = a),
            KuroSdkReport_1.KuroSdkReport.OnRougeFinish();
        else if (s === ItemRewardDefine_1.BLACK_STONE_RESON) {
          o = [];
          o.push({
            ButtonTextId: "ConfirmBox_45_ButtonText_1",
            DescriptionTextId: void 0,
            DescriptionArgs: void 0,
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !1,
            OnClickedCallback: (e) => {
              UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
                UiManager_1.UiManager.CloseView("ExploreRewardView");
            },
          });
          let e =
            1 < r.B9n
              ? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip(
                  [3],
                  !1,
                )
              : void 0;
          var g,
            C,
            r =
              ModelManager_1.ModelManager.ActivityRegressModel
                .LastUnGetRewardLevelPlayId;
          0 !== r &&
            (([r, m, g, w, C] =
              ModelManager_1.ModelManager.ActivityRegressModel.GetLevelPlayDoubleDropTuple(
                r,
              )),
            r &&
              ((r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(C)),
              (C = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
                w,
                m,
                g,
              )),
              (e = "" + r + C)),
            (ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = 0)),
            void ItemRewardController.OpenExploreRewardView(
              ItemRewardDefine_1.BLACK_STONE_CONFIG,
              !0,
              a,
              void 0,
              void 0,
              o,
              void 0,
              void 0,
              void 0,
              e,
              void 0,
              void 0,
              void 0,
              void 0,
              !0,
            );
        } else {
          var m,
            w = _a.GetRewardViewReasonArray().includes(s)
              ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
                  s,
                )
              : void 0;
          if (s !== ItemRewardDefine_1.QUEST_SPECIAL_REWARD || !w)
            return w
              ? 0 < n.length
                ? void ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(
                    n,
                    a,
                  )
                : ((m = w.RewardViewId),
                  0 < e
                    ? void ItemRewardController.OpenCommonRewardView(
                        m,
                        a,
                        () => {
                          _a.OpenSoarStrengthUpView(e);
                        },
                      )
                    : void ItemRewardController.OpenCommonRewardView(m, a))
              : void ItemRewardController.AddItemList(a);
          ItemRewardController.OpenQuestRewardView(w.RewardViewId, a);
        }
    }
  }),
  (ItemRewardController.mMa = (e) => {
    _a.OnItemObtainNotify(e);
  }),
  (ItemRewardController.OnItemObtainNotify = (r, t) => {
    var o = r.Rb_;
    if (!(o.length <= 0)) {
      var a = [],
        n = [];
      const d = [];
      let e = 0;
      for (const _ of o) {
        var i =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
            _.wb_.s5n,
          );
        1 === i
          ? d.push(_)
          : 11 === i
            ? ((i = new RewardItemData_1.RewardItemData(
                _.wb_.s5n,
                _.wb_.m9n,
                _.wb_.b9n,
              )),
              n.push(i))
            : ((i = new RewardItemData_1.RewardItemData(
                _.wb_.s5n,
                _.wb_.m9n,
                _.wb_.b9n,
              )),
              _.wb_.s5n === _a.qKl && (e += _.wb_.m9n),
              a.push(i));
      }
      var o = ModelManager_1.ModelManager.ItemRewardModel,
        l = r.x9n,
        o =
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              37,
              "[ItemRewardController]当服务端通知奖励获得时",
              ["reasonId", l],
            ),
          o.CurrentReasonId !== l && o.ClearCurrentRewardData(),
          (o.CurrentReasonId = l),
          _a.GetRewardViewReasonArray().includes(l)
            ? ConfigManager_1.ConfigManager.ItemRewardConfig.GetRewardViewFromSourceConfig(
                l,
              )
            : void 0);
      if (o) {
        (l = o.RewardViewId), (o = o.RewardSourceId);
        if (
          o !== ItemRewardDefine_1.ITEM_EXCHANGE_RESON ||
          ItemExchangeController_1.ItemExchangeController.NeedPop
        )
          if (o === ItemRewardDefine_1.QUEST_SPECIAL_REWARD)
            ItemRewardController.OpenQuestRewardView(l, a, t);
          else if (o === ItemRewardDefine_1.FISHING_ITEM_AUTO_CONVERT)
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_AutoMaterial",
            );
          else if (0 < e)
            ItemRewardController.OpenCommonRewardView(l, a, () => {
              _a.OpenSoarStrengthUpView(e);
            });
          else if (
            o === ItemRewardDefine_1.BATTLE_PASS_REWARD_REASON &&
            ControllerHolder_1.ControllerHolder.BattlePassController.IsNeedExtraRewardView()
          )
            ItemRewardController.OpenBattlePassExtraRewardView(a);
          else if (0 === d.length && 0 === n.length)
            ItemRewardController.OpenCommonRewardView(l, a, t);
          else if (0 === a.length && 0 < d.length)
            for (const s of d)
              GachaController_1.GachaController.CommonShowRoleResult(s, !0, !1);
          else
            0 < n.length
              ? ControllerHolder_1.ControllerHolder.SkinController.OpenObtainSkinView(
                  n,
                  a,
                )
              : ItemRewardController.OpenCommonRewardView(l, a, () => {
                  for (const e of d)
                    GachaController_1.GachaController.CommonShowRoleResult(
                      e,
                      !0,
                      !1,
                    );
                  t?.();
                });
      } else
        ItemRewardController.AddItemList(a),
          void 0 !== t &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Test", 8, "OnItemObtainNotify err", ["notify", r]);
    }
  });
//# sourceMappingURL=ItemRewardController.js.map
