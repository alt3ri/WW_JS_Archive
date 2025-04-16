"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapFetterInfoItem =
    exports.RogueBattleMapFetterInfoDescItem =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleDefine_1 = require("../RogueBattleDefine"),
  bgColor = new Map([
    [!0, "#D9CF86"],
    [!1, "#9B9A96"],
  ]),
  txtColor = new Map([
    [!0, "#B8EB60"],
    [!1, "#C4C4C4"],
  ]),
  iconColor = new Map([
    [!0, "#FDF6C6"],
    [!1, "#C4C4C4"],
  ]),
  descColor = new Map([
    [!0, "#ECE5D8"],
    [!1, "#ADADAD"],
  ]);
class RogueBattleMapFetterInfoDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  Refresh(e, t, r) {
    e.Param
      ? ((o = e.Param.split("#")),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TextId, ...o))
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TextId);
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      RogueBattleDefine_1.fetterTypeIconMap.get(e.EffectType),
    );
    this.SetTextureByPath(o, this.GetTexture(0), void 0, () => {
      this.GetTexture(0).SetColor(UE.Color.FromHex(iconColor.get(e.IsReached)));
    }),
      this.GetText(1).SetColor(UE.Color.FromHex(descColor.get(e.IsReached)));
  }
}
exports.RogueBattleMapFetterInfoDescItem = RogueBattleMapFetterInfoDescItem;
class RogueBattleMapFetterInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Gxt = void 0),
      (this.Bqe = () => new RogueBattleMapFetterInfoDescItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    this.Gxt = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.Bqe,
    );
  }
  OnBeforeDestroy() {
    this.Gxt = void 0;
  }
  Refresh(e, t, r) {
    var o,
      i,
      s,
      a = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
        e.ConfigId,
      ),
      n =
        (this.GetText(1)?.SetText("Lv." + e.Level),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "RogueRes_Overall_Synergy_6",
          a.StarMap.get(e.Level),
        ),
        []);
    let u = 0;
    for (const l of a.BattleEffect)
      l[0] === e.Level &&
        ((o = {
          TextId: a.FightEffectDesc[u],
          Param: a.FightEffectDescParam[u],
          IsReached: e.IsReached,
          EffectType: 0,
        }),
        n.push(o)),
        u++;
    u = 0;
    for (const c of a.ExploreEffect)
      c[0] === e.Level &&
        ((i = {
          TextId: a.ExploreEffectDesc[u],
          Param: a.ExploreEffectDescParam[u],
          IsReached: e.IsReached,
          EffectType: 1,
        }),
        n.push(i)),
        u++;
    for (const f of a.LinkEffect)
      f[0] === e.Level &&
        ((s = {
          TextId: a.LinkEffectDesc.get(f[0]),
          Param: a.LinkEffectDescParam.get(f[0]),
          IsReached: e.IsReached,
          EffectType: 2,
        }),
        n.push(s));
    this.Gxt.RefreshByData(n),
      this.GetSprite(0).SetColor(UE.Color.FromHex(bgColor.get(e.IsReached))),
      this.GetText(2).SetColor(UE.Color.FromHex(txtColor.get(e.IsReached)));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t, r;
    if (e && !(e.length < 3))
      return "Star" === (r = e[2])
        ? (t = this.GetGuideUiItem("0"))
          ? [t, t]
          : void 0
        : "Item" === r &&
            !(e.length < 4) &&
            ((t = Number(e[3])), (r = this.Gxt?.GetItemByIndex(t)))
          ? [r, r]
          : void 0;
  }
}
exports.RogueBattleMapFetterInfoItem = RogueBattleMapFetterInfoItem;
//# sourceMappingURL=RogueBattleMapFetterItem.js.map
