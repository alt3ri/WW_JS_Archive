"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssRankItem = exports.DangoRankItemData = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AbyssDangoCircleQulityItem_1 = require("./AbyssDangoCircleQulityItem"),
  FIRSTPLAYER_ICON = "FormationOnline1PIcon",
  SECONDPLAYER_ICON = "FormationOnline2PIcon",
  THIRDPLAYER_ICON = "FormationOnline3PIcon",
  getPosTexture = (t) =>
    0 === t ? FIRSTPLAYER_ICON : 1 === t ? SECONDPLAYER_ICON : THIRDPLAYER_ICON;
class DangoRankItemData {
  constructor() {
    this.AbyssChallengeInfo = void 0;
  }
}
exports.DangoRankItemData = DangoRankItemData;
class DangoAbyssRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(),
      (this.Uyc = !1),
      (this.SR1 = !1),
      (this.kyc = void 0),
      (this.Dyc = void 0),
      (this.Byc = void 0),
      (this.Oyc = () => new OnlineItem(this.Uyc)),
      (this.qyc = () => new RankRoleGridItem()),
      (this.Uyc = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UILayoutBase],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UILayoutBase],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ];
  }
  OnStart() {
    this.Gyc(), this.Fyc();
  }
  Gyc() {
    this.Dyc = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(4),
      this.Oyc,
      this.GetItem(5).GetOwner(),
    );
  }
  Fyc() {
    this.Byc = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(7),
      this.qyc,
      this.GetItem(8).GetOwner(),
    );
  }
  Oxt() {
    this.GetText(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!0),
      this.Dyc.GetRootUiItem()?.SetUIActive(!1);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
    this.GetText(3).SetText(t),
      this.GetText(3).SetUIActive(!0),
      this.GetText(6).SetUIActive(!1),
      this.Byc.GetRootUiItem()?.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!0),
      this.Nyc();
  }
  Nyc() {
    this.GetTexture(0).SetUIActive(!0);
    var t = this.SR1
        ? this.kyc.AbyssChallengeInfo.RankBg
        : "T_AnniversaryCelebrationRankOwnBg",
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, this.GetTexture(0));
  }
  Vyc() {
    var t = this.GetText(1);
    t.SetUIActive(!0),
      this.GetItem(2).SetUIActive(!this.kyc.AbyssChallengeInfo.IsInRank),
      t.SetText(this.kyc.AbyssChallengeInfo.Rank.toString());
  }
  jyc() {
    var t, i;
    this.GetText(6).SetUIActive(!0),
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
        this.kyc.AbyssChallengeInfo.GetChallengeId(),
      ).IsEndless
        ? 100 === (i = this.kyc.AbyssChallengeInfo.GetProgress())
          ? ((t = TimeUtil_1.TimeUtil.GetTimeDataFormat(
              this.kyc.AbyssChallengeInfo.GetPassTime(),
            )),
            this.GetText(6).SetText(t))
          : ((t = i + "%"), this.GetText(6).SetText(t))
        : ((i = TimeUtil_1.TimeUtil.GetTimeDataFormat(
            this.kyc.AbyssChallengeInfo.GetPassTime(),
          )),
          this.GetText(6).SetText(i));
  }
  async RefreshPlayerName() {
    var i,
      t = !this.kyc.AbyssChallengeInfo.GetIsSingle(),
      s = this.GetText(3);
    if ((s.SetUIActive(!t), this.Dyc.GetRootUiItem()?.SetUIActive(t), t)) {
      var e,
        r,
        h = [];
      for ([e, r] of this.kyc.AbyssChallengeInfo.GetPlayerNameMap()) {
        var a = new OnlineData();
        (a.PlayerId = e), (a.PlayerName = r), h.push(a);
      }
      await this.Dyc.RefreshByDataAsync(h);
    } else if (this.kyc.AbyssChallengeInfo.IsSelf && this.Uyc)
      (t = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? ""),
        s.SetText(t);
    else {
      let t = "";
      for ([, i] of this.kyc.AbyssChallengeInfo.GetPlayerNameMap()) {
        t = i;
        break;
      }
      StringUtils_1.StringUtils.IsBlank(t)
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            s,
            "OnlineGymnasium_AnonymityName",
          )
        : s.SetText(t);
    }
  }
  async Hyc() {
    this.GetItem(9).SetUIActive(!1), this.Byc.GetRootUiItem()?.SetUIActive(!0);
    var t = this.kyc.AbyssChallengeInfo.GetDangoAbyssRankRoleData();
    await this.Byc.RefreshByDataAsync(t);
  }
  Refresh(t, i = 0, s, e = !0) {
    (this.SR1 = e),
      (this.kyc = t).AbyssChallengeInfo.IsEmpty
        ? this.Oxt()
        : (this.Nyc(),
          this.Vyc(),
          this.RefreshPlayerName(),
          this.jyc(),
          this.Hyc());
  }
  IsSelfItem() {
    return this.kyc.AbyssChallengeInfo.IsSelfInData;
  }
}
exports.DangoAbyssRankItem = DangoAbyssRankItem;
class RankRoleGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.sft = void 0),
      (this.Ryc = void 0),
      (this.dDc = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.dDc =
        new AbyssDangoCircleQulityItem_1.AbyssDangoCircleQualityItem()),
      await this.dDc.CreateByActorAsync(this.GetItem(3).GetOwner());
  }
  Ayc() {
    var t,
      i = this.GetTexture(2);
    !this.Pe.IsEmpty && this.Pe
      ? (i.SetUIActive(this.Pe.IsOnline),
        this.Pe.IsOnline &&
          ((t = getPosTexture(this.Pe.Pos)),
          (t =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t)),
          this.SetTextureByPath(t, i)))
      : i.SetUIActive(!1);
  }
  Pyc() {
    var t, i;
    this.Pe.IsEmpty
      ? this.sft.SetActive(!1)
      : (this.sft.SetActive(!0),
        (t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(
          this.Pe.RoleSkinId,
        )),
        (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId)),
        this.Ryc || (this.Ryc = { Type: 2, Data: void 0 }),
        (this.Ryc.ItemConfigId = t.RoleId),
        (this.Ryc.SkinId = this.Pe.RoleSkinId),
        (this.Ryc.BottomTextId = "Text_LevelShow_Text"),
        (this.Ryc.BottomTextParameter = [this.Pe.RoleLevel]),
        (this.Ryc.ElementId = i.ElementId),
        this.sft.Apply(this.Ryc));
  }
  IDc() {
    var t;
    !this.Pe.IsEmpty &&
    (t =
      ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
        this.Pe.DangoId,
      )?.GetFormationIcon() ?? "")
      ? (this.GetTexture(1).SetUIActive(!0),
        this.SetTextureByPath(t, this.GetTexture(1)))
      : this.GetTexture(1).SetUIActive(!1);
  }
  Ty1() {
    var t, i;
    this.Pe.IsEmpty
      ? this.dDc.SetActive(!1)
      : ((t = this.Pe.GetEquipPluginMap()),
        ((i =
          new AbyssDangoCircleQulityItem_1.DangoCircleQualityData()).PluginIdMap =
          t),
        this.dDc.RefreshData(i));
  }
  Refresh(t, i, s) {
    (this.Pe = t), this.Ayc(), this.Pyc(), this.IDc(), this.Ty1();
  }
}
class OnlineData {
  constructor() {
    (this.PlayerId = 0), (this.PlayerName = "");
  }
}
class OnlineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(), (this.Pe = void 0), (this.Uyc = !1), (this.Uyc = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  P5e() {
    var t =
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        this.Pe.PlayerId,
      i = this.GetText(1);
    this.Uyc && t
      ? ((t =
          ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? ""),
        i.SetText(t))
      : ((t = this.Pe.PlayerName),
        StringUtils_1.StringUtils.IsBlank(t)
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              i,
              "OnlineGymnasium_AnonymityName",
            )
          : i.SetText(t));
  }
  Ayc() {
    var t = this.GetTexture(0),
      i = getPosTexture(this.GridIndex),
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(i, t);
  }
  Refresh(t, i, s) {
    (this.Pe = t), this.P5e(), this.Ayc();
  }
}
//# sourceMappingURL=DangoAbyssRankItem.js.map
