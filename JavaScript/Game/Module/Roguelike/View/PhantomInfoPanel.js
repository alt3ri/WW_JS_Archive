"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomInfoPanel =
    exports.PhantomEntryItem =
    exports.PhantomElementItem =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult"),
  ElementItem_1 = require("./ElementItem");
class PhantomElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.jso = void 0), (this.uao = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    (this.uao = new ElementItem_1.ElementItem()),
      await this.uao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  Update(e) {
    (this.jso = e), this.uao.Update(this.jso), this.RefreshPanel();
  }
  RefreshPanel(e = void 0) {
    var [e, t, i, s, r] = this.cao(e);
    this.GetSprite(2).SetUIActive(e),
      this.GetText(1).SetUIActive(!e),
      this.GetItem(0).SetUIActive(!e);
    let n = void 0;
    return (
      (n = e
        ? RoguelikeDefine_1.ROGUELIKEVIEW_FINIST_TEXT
        : t
          ? RoguelikeDefine_1.ROGUELIKEVIEW_PREVIEW_TEXT
          : RoguelikeDefine_1.ROGUELIKEVIEW_NOTFINIST_TEXT),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), n, i, s, r),
      e
    );
  }
  cao(e = void 0) {
    var t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.ElementDict,
      i = this.jso.Count,
      s = t.get(this.jso.ElementId) ?? 0;
    s += t.get(7) ?? 0;
    let r = 0,
      n = !1;
    return (
      e &&
        ((r = (e.get(this.jso.ElementId) ?? 0) + (e.get(7) ?? 0)),
        9 === this.jso.ElementId &&
          e.forEach((e) => {
            r += e;
          }),
        0 < r) &&
        (n = !0),
      [s + r >= i, n, s, i, r]
    );
  }
}
exports.PhantomElementItem = PhantomElementItem;
class PhantomEntryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.mao = void 0),
      (this.dao = void 0),
      (this.EPe = void 0),
      (this.Cao = !1),
      (this.jhi = () => {
        return new PhantomElementItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    (this.dao = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.jhi,
    )),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      ));
  }
  Refresh(e, t, i) {
    this.mao = e;
    var s,
      e = this.mao.GetSortElementInfoArrayByCount();
    for (const r of e)
      9 === r.ElementId
        ? (r.Name = RoguelikeDefine_1.ROGUELIKEVIEW_16_TEXT)
        : (s = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
            r.ElementId,
          )) && (r.Name = s.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "Rogue_Phantom_Info_Index",
      i + 1,
    ),
      this.dao.RefreshByData(e);
  }
  RefreshPreview(e = void 0) {
    let t = !0;
    for (const r of this.dao.GetLayoutItemList()) r.RefreshPanel(e) || (t = !1);
    var i = !this.mao.IsUnlock && t,
      s =
        (i
          ? (this.gao(),
            (this.Cao = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RogueTermUnlock,
            ))
          : this.Cao &&
            (this.EPe.PlayLevelSequenceByName("Disappear"), (this.Cao = !1)),
        this.GetItem(2).SetUIActive(i),
        this.GetText(3));
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, this.mao.GetAffixDesc()),
      s.SetChangeColor(i, s?.changeColor);
  }
  gao() {
    this.EPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
  }
}
exports.PhantomEntryItem = PhantomEntryItem;
class PhantomInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fao = void 0),
      (this.pao = void 0),
      (this.vao = () => {
        UiManager_1.UiManager.OpenView(
          "RoguePhantomSelectResultView",
          new RogueSelectResult_1.RogueSelectResult(this.fao, void 0, void 0),
        );
      }),
      (this.CreatePhantomEntryItem = () => {
        return new PhantomEntryItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[5, this.vao]]);
  }
  OnStart() {
    this.pao = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.CreatePhantomEntryItem,
    );
  }
  Update(e) {
    this.fao = e;
  }
  Refresh() {
    this.V9i(), this.Mao();
  }
  GetAttributeItem(e) {
    return this.pao?.GetItemByIndex(e);
  }
  V9i() {
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
      this.fao.ConfigId,
    );
    e &&
      (this.GetText(2).ShowTextNew(e.PokemonName),
      this.SetTextureByPath(e.PokemonIcon, this.GetTexture(1)),
      (e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(
          e.Quality,
        ))) &&
      (this.SetTextureByPath(e.PhantomBgC, this.GetTexture(0)),
      this.SetTextureByPath(e.PhantomBgB, this.GetTexture(6)));
  }
  Mao() {
    this.pao.RefreshByData(this.fao.AffixEntryList ?? []);
  }
  RefreshPhantomEntryItemRefreshPreview(e = void 0) {
    for (const t of this.pao.GetLayoutItemList()) t.RefreshPreview(e);
  }
}
exports.PhantomInfoPanel = PhantomInfoPanel;
//# sourceMappingURL=PhantomInfoPanel.js.map
