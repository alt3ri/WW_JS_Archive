"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionPreheatModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityVersionPreheatController_1 = require("../Controller/ActivityVersionPreheatController"),
  VersionPreheatDefine_1 = require("../VersionPreheatDefine"),
  VersionPreheatActivityContext_1 = require("./VersionPreheatActivityContext"),
  VersionPreheatConfigContext_1 = require("./VersionPreheatConfigContext"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class VersionPreheatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentUsingVersionPreheatId = void 0),
      (this.I_l = void 0),
      (this.FCl = void 0),
      (this.VCl = void 0),
      (this.HCl = void 0),
      (this.T_l = void 0),
      (this.UVa = void 0);
  }
  OnInit() {
    return (
      (this.T_l =
        new VersionPreheatActivityContext_1.VersionPreheatActivityContext()),
      (this.UVa =
        new VersionPreheatConfigContext_1.VersionPreheatConfigContext()),
      !0
    );
  }
  OnClear() {
    return this.T_l.Dispose(), !0;
  }
  get ActivityData() {
    return this.T_l;
  }
  get IsBonusAvailable() {
    if (0 === this.T_l.QuestCache.size) return !1;
    for (var [, t] of this.T_l.QuestCache)
      if (3 !== this.GetQuestStateById(t.Id)) return !1;
    return !0;
  }
  get HasNewQuest() {
    if (this.IsBonusAvailable && !this.IsBonusClicked()) return !0;
    for (const e of this.UVa.AllQuestCfg) {
      var t = this.T_l.QuestCache.get(e.Id);
      if (
        void 0 !== t &&
        0 !== this.GetQuestStateById(e.Id) &&
        !this.IsQuestClickedById(e.Id)
      )
        return !0;
    }
    return !1;
  }
  SyncPreheatSignSurveyInfo(t, e) {
    this.T_l.SyncPreheatSignSurveyInfo(t, e);
  }
  SyncPreheatRewardedState(t) {
    this.T_l.SyncPreheatRewardedState(t);
  }
  GetQuestIdById(t) {
    return this.UVa.GetQuestIdById(t);
  }
  GetQuestStateById(t) {
    t = this.T_l.QuestCache.get(t);
    return void 0 === t ? 0 : this.R_l(t);
  }
  BuildQuestDataList() {
    var t,
      e,
      i = [];
    for ([t, e] of this.T_l.QuestCache) {
      var r = {
        Id: t,
        State: this.R_l(e),
        NumberTextId: "Preheating_Serial_Number",
        NumberTextArg: t.toString().padStart(2, "0"),
        TitleTextId: this.UVa.GetQuestTitleTextIdById(t),
        UnlockTimestamp: e.UnlockTimestamp,
      };
      i.push(r);
    }
    return i;
  }
  BuildActivityInfoData() {
    var t = this.T_l.LocalConfig;
    return {
      TitleData: {
        TitleTextId: t?.Title ?? "",
        SubTitleTextId: t?.DescTheme ?? "",
      },
      DescriptionData: { ContentTextId: this.T_l.LocalConfig?.Desc ?? "" },
      RewardData: {
        TitleId: "CollectActivity_reward",
        RewardList: this.T_l.GetPreviewReward(),
      },
      BottomData: { Test: !0 },
    };
  }
  BuildBonusQuestData() {
    return {
      NumberTextId: "Preheating_Serial_Number",
      NumberTextArg: "7",
      ContentTextId: this.UVa.BonusQuestContentTextId,
    };
  }
  BuildQuestDetailDataById(t) {
    var e = this.GetQuestStateById(t),
      i = 2 <= e ? this.U_l(t) : void 0,
      r = 3 === e ? this.D_l(t, e) : void 0,
      e = 0 < e && e <= 2 ? this.A_l(t, e) : void 0;
    return {
      PersistentData: this.x_l(t),
      VoteData: i,
      ChatData: r,
      RewardData: e,
    };
  }
  BuildBonusDetailData() {
    return {
      PersistentData: {
        Index: VersionPreheatDefine_1.BONUS_ITEM_INDEX,
        QuestPhotoPath: this.UVa.BonusPhotoPath,
        QuestTitleTextId: this.UVa.BonusQuestTitleTextId,
        QuestContentTextId: this.UVa.BonusQuestContentTextId,
        QuestCrestIndex: this.UVa.BonusCrestIndex,
        QuestSharePhotoPath: this.UVa.BonusSharePhotoPath,
        CanShare: !1,
      },
      ChatData: this.P_l(),
      BonusTextId: this.UVa.BonusTextId,
    };
  }
  BuildVoteDataById(t) {
    return {
      TitleTextId: this.UVa.GetVoteTitleTextIdById(t),
      ContentTextId: this.UVa.GetVoteContentTextIdById(t),
      CrestIndex: this.UVa.GetQuestCrestIndexById(t),
      LeftToggleData: {
        Id: t,
        ContentTextId: this.UVa.GetVoteLeftTipsTextIdById(t),
        ClickFunc:
          ActivityVersionPreheatController_1.ActivityVersionPreheatController
            .Instance.HandleVoteClickAsync,
        ClickPassData: !0,
      },
      RightToggleData: {
        Id: t,
        ContentTextId: this.UVa.GetVoteRightTipsTextIdById(t),
        ClickFunc:
          ActivityVersionPreheatController_1.ActivityVersionPreheatController
            .Instance.HandleVoteClickAsync,
        ClickPassData: !1,
      },
      ItemListData: this.UVa.GetQuestRewardItemListById(t),
      IsLeftChosen: this.T_l.IsLeftChosen(t),
    };
  }
  R_l(t) {
    if (TimeUtil_1.TimeUtil.GetServerTimeStamp() < t.UnlockTimestamp) return 0;
    var e = this.UVa.GetPreIdById(t.Id);
    if (
      0 < e &&
      (void 0 === this.T_l.QuestCache.get(e) ||
        !ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.IsQuestFinishedById(
          e,
        ))
    )
      return 0;
    return ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.IsQuestFinishedById(
      t.Id,
    )
      ? 3
      : t.Rewarded
        ? 2
        : 1;
  }
  IsQuestClickedById(t) {
    return (
      void 0 === this.I_l &&
        (this.I_l = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .VersionPreheatToQuestClicked,
        )),
      this.I_l?.get(t) ?? !1
    );
  }
  SetQuestClickedById(t) {
    void 0 === this.I_l && (this.I_l = new Map()),
      this.I_l.set(t, !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .VersionPreheatToQuestClicked,
        this.I_l,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.T_l.Id,
      );
  }
  IsQuestPlayedById(t) {
    return (
      void 0 === this.VCl &&
        (this.VCl = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .VersionPreheatToQuestPlayed,
        )),
      this.VCl?.get(t) ?? !1
    );
  }
  SetQuestPlayedById(t) {
    void 0 === this.VCl && (this.VCl = new Map()),
      this.VCl.set(t, !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatToQuestPlayed,
        this.VCl,
      );
  }
  IsBonusClicked() {
    return (
      void 0 === this.FCl &&
        (this.FCl = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .VersionPreheatBonusClicked,
        )),
      this.FCl ?? !1
    );
  }
  SetBonusClicked() {
    void 0 === this.FCl && (this.FCl = !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusClicked,
        this.FCl,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.T_l.Id,
      );
  }
  IsBonusPlayed() {
    return (
      void 0 === this.HCl &&
        (this.HCl = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusPlayed,
        )),
      this.HCl ?? !1
    );
  }
  SetBonusPlayed() {
    void 0 === this.HCl && (this.HCl = !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.VersionPreheatBonusPlayed,
        this.HCl,
      );
  }
  x_l(t) {
    var e = this.UVa,
      i = this.T_l.IsRewardedById(t);
    return {
      Index: t - 1,
      QuestPhotoPath: e.GetQuestPhotoPathById(t),
      QuestTitleTextId: e.GetQuestTitleTextIdById(t),
      QuestContentTextId: i
        ? e.GetQuestAfterThemeTextIdById(t)
        : e.GetQuestBeforeThemeTextIdById(t),
      QuestCrestIndex: e.GetQuestCrestIndexById(t),
      QuestSharePhotoPath: e.GetQuestSharePhotoPathById(t),
      CanShare: 3 === this.GetQuestStateById(t),
    };
  }
  U_l(t) {
    var e = this.T_l.GetVoteLeftCountById(t),
      i = this.T_l.GetVoteRightCountById(t);
    let r = 0,
      a = 0;
    a = e === i ? (r = 0.5) : ((r = e / (e + i)), i / (e + i));
    (e = Math.round(100 * r)), (i = 100 - e);
    return {
      LeftNormalized: r,
      RightNormalized: a,
      LeftPercentageText: e.toString() + "%",
      RightPercentageText: i.toString() + "%",
      LeftThemeTextId: this.UVa.GetVoteLeftThemeTextIdById(t),
      RightThemeTextId: this.UVa.GetVoteRightThemeTextIdById(t),
      IsLeftChosen: this.T_l.IsLeftChosen(t) ?? !1,
    };
  }
  D_l(t, e) {
    e = this.w_l(t, e);
    return {
      NpcContentTextId: this.UVa.GetNpcContentTextIdById(t),
      NpcIconPath: this.UVa.GetNpcIconPathById(t),
      SelfChatData: e,
    };
  }
  P_l() {
    return {
      NpcContentTextId: this.UVa.BonusNpcContentTextId,
      NpcIconPath: this.UVa.BonusNpcIconPath,
    };
  }
  w_l(t, e) {
    if (!(e < 2))
      return (
        (e =
          1 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
            ? VersionPreheatDefine_1.HERO_ROLE_ID
            : VersionPreheatDefine_1.HEROINE_ROLE_ID),
        {
          NpcIconPath:
            ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e)
              ?.RoleHeadIconCircle ?? "",
          NpcContentTextId: this.UVa.GetSelfChatContentTextIdById(t),
        }
      );
  }
  A_l(t, e) {
    return {
      QuestContentTextId: this.UVa.GetQuestContentTextIdById(t),
      ItemListData: this.UVa.GetQuestRewardItemListById(t),
      IsReceived: 2 === e,
      ClickFunc:
        ActivityVersionPreheatController_1.ActivityVersionPreheatController
          .Instance.HandleQuestDetailClickInReward,
      ClickPassData: this.UVa.GetQuestIdById(t),
    };
  }
}
exports.VersionPreheatModel = VersionPreheatModel;
//# sourceMappingURL=VersionPreheatModel.js.map
