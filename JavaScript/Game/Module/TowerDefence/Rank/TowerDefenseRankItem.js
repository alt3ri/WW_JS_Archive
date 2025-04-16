"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseRankItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  FIRSTPLAYER_ICON = "FormationOnline1PIcon",
  SECONDPLAYER_ICON = "FormationOnline2PIcon",
  THIRDPLAYER_ICON = "FormationOnline3PIcon",
  getPosTexture = (i) =>
    0 === i ? FIRSTPLAYER_ICON : 1 === i ? SECONDPLAYER_ICON : THIRDPLAYER_ICON;
class RankGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.sft = void 0),
      (this.Ryc = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Ayc() {
    var i,
      t = this.GetTexture(2);
    this.Pe
      ? (t.SetUIActive(this.Pe.IsOnline),
        this.Pe.IsOnline &&
          ((i = getPosTexture(this.Pe.Pos)),
          (i =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)),
          this.SetTextureByPath(i, t)))
      : t.SetUIActive(!1);
  }
  Pyc() {
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(
        this.Pe.RoleSkinId,
      ),
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.RoleId);
    this.Ryc || (this.Ryc = { Type: 2, Data: void 0 }),
      (this.Ryc.ItemConfigId = i.RoleId),
      (this.Ryc.SkinId = this.Pe.RoleSkinId),
      (this.Ryc.BottomTextId = "Text_LevelShow_Text"),
      (this.Ryc.BottomTextParameter = [this.Pe.RoleLevel]),
      (this.Ryc.ElementId = t.ElementId),
      this.sft.Apply(this.Ryc);
  }
  xyc() {
    var i =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefensePhantomById(
          this.Pe.PhantomId,
        ),
      i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
        i.PhantomItemId,
      );
    this.SetTextureByPath(i.IconMiddle, this.GetTexture(1));
  }
  Refresh(i, t, s) {
    i = !(this.Pe = i).IsEmpty;
    this.GetItem(3)?.SetUIActive(i),
      this.GetItem(4)?.SetUIActive(!i),
      i && (this.Ayc(), this.Pyc(), this.xyc());
  }
}
class OnlineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(), (this.B9e = void 0), (this.Uyc = !1), (this.Uyc = i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  P5e() {
    var i =
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        this.B9e.PlayerId,
      t = this.GetText(1);
    this.Uyc && i
      ? ((i =
          ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? ""),
        t.SetText(i))
      : ((i = this.B9e.PlayerName),
        StringUtils_1.StringUtils.IsBlank(i)
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              t,
              "OnlineGymnasium_AnonymityName",
            )
          : t.SetText(i));
  }
  Ayc() {
    var i = this.GetTexture(0),
      t = getPosTexture(this.GridIndex),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, i);
  }
  Refresh(i, t, s) {
    (this.B9e = i), this.P5e(), this.Ayc();
  }
}
class TowerDefenseRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(),
      (this.ParentModel = void 0),
      (this.Uyc = !1),
      (this.Dyc = void 0),
      (this.Byc = void 0),
      (this.kyc = void 0),
      (this.Oyc = () => new OnlineItem(this.Uyc)),
      (this.qyc = () => new RankGridItem()),
      (this.Uyc = i);
  }
  OnRegisterComponent() {
    (this.ParentModel = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UITexture],
        [1, UE.UIText],
        [2, UE.UIText],
        [3, UE.UIItem],
        [4, UE.UIText],
        [5, UE.UILayoutBase],
        [6, UE.UIItem],
        [7, UE.UIText],
        [8, UE.UILayoutBase],
        [9, UE.UIItem],
        [10, UE.UIItem],
      ]);
  }
  OnStart() {
    this.Gyc(), this.Fyc();
  }
  Gyc() {
    this.Dyc = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(5),
      this.Oyc,
      this.GetItem(6).GetOwner(),
    );
  }
  Fyc() {
    this.Byc = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(8),
      this.qyc,
      this.GetItem(9).GetOwner(),
    );
  }
  Oxt() {
    this.GetText(1).SetUIActive(!1),
      this.GetText(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0),
      this.Dyc.GetRootUiItem()?.SetUIActive(!1);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "";
    this.GetText(4).SetText(i),
      this.GetText(4).SetUIActive(!0),
      this.GetText(7).SetUIActive(!1),
      this.Byc.GetRootUiItem()?.SetUIActive(!1),
      this.GetItem(10).SetUIActive(!0),
      this.Nyc();
  }
  Nyc() {
    var i = !this.Uyc || this.kyc.IsTopThree;
    this.GetTexture(0).SetUIActive(i),
      i &&
        ((i = this.kyc.RankBg),
        (i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)),
        this.SetTextureByPath(i, this.GetTexture(0)));
  }
  Vyc() {
    var i = this.kyc.IsTopThree,
      t = this.GetText(1),
      s = this.GetText(2);
    t.SetUIActive(i),
      s.SetUIActive(!i && this.kyc.IsInRank),
      this.GetItem(3).SetUIActive(!this.kyc.IsInRank),
      i
        ? (t.SetText(this.kyc.Rank.toString()),
          (t.outlineColor = UE.Color.FromHex(this.kyc.TopThreeNumColor)))
        : this.kyc.IsInRank && s.SetText(this.kyc.Rank.toString());
  }
  async RefreshPlayerName() {
    var i = this.kyc.IsOnline,
      t = this.GetText(4);
    t.SetUIActive(!i),
      this.Dyc.GetRootUiItem()?.SetUIActive(i),
      i
        ? await this.Dyc.RefreshByDataAsync(this.kyc.GetPlayerNameList())
        : this.kyc.IsSelf && this.Uyc
          ? ((i =
              ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ??
              ""),
            t.SetText(i))
          : ((i = this.kyc.GetPlayerNameList()[0].PlayerName),
            StringUtils_1.StringUtils.IsBlank(i)
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  t,
                  "OnlineGymnasium_AnonymityName",
                )
              : t.SetText(i));
  }
  jyc() {
    this.GetText(7).SetUIActive(!0);
    var i = this.kyc.IsDifficult
      ? TimeUtil_1.TimeUtil.GetTimeDataFormat(this.kyc.PassScore)
      : this.kyc.PassScore.toString();
    this.GetText(7).SetText(i);
  }
  async Hyc() {
    this.GetItem(10).SetUIActive(!1),
      this.Byc.GetRootUiItem()?.SetUIActive(!0),
      await this.Byc.RefreshByDataAsync(this.kyc.RoleDataList);
  }
  Refresh(i) {
    (this.kyc = i).IsEmpty
      ? this.Oxt()
      : (this.Nyc(),
        this.Vyc(),
        this.RefreshPlayerName(),
        this.jyc(),
        this.Hyc());
  }
  IsSelfItem() {
    return this.kyc.IsSelfInData;
  }
}
exports.TowerDefenseRankItem = TowerDefenseRankItem;
//# sourceMappingURL=TowerDefenseRankItem.js.map
