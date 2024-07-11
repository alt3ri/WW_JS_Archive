"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSelectItem = exports.RoleAttrItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.AffixEntry = void 0);
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    (this.AffixEntry = t), this.RefreshPanel();
  }
  SetSecondColor() {
    const t = this.GetText(0);
    t.SetChangeColor(!0, t.changeColor);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshPanel() {
    const t =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterBuffConfig(
        this.AffixEntry.Id,
      );
    t &&
      (ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0
        ? this.GetText(0).ShowTextNew(t.AffixDescSimple)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(0),
            t.AffixDesc,
            ...t.AffixDescParam,
          ));
  }
}
exports.RoleAttrItem = RoleAttrItem;
class RoleSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fao = void 0),
      (this.Pho = void 0),
      (this.xho = void 0),
      (this.vao = () => {}),
      (this.who = () => {
        return new RoleAttrItem();
      });
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    (this.fao = t), this.RefreshPanel();
  }
  SetLevelUpItem(t) {
    this.GetItem(7).SetUIActive(t);
  }
  SetSecondColorForAttrItem(t) {
    this.xho = t;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UINiagara],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIVerticalLayout],
      [13, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[5, this.vao]]);
  }
  OnStart() {
    this.Pho = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(12),
      this.who,
    );
  }
  RefreshPanel() {
    this.Vke(), this.Lao(), this.kIt();
  }
  Vke() {
    let t;
    let e;
    const i =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
        this.fao.ConfigId,
      );
    i &&
      ((e = Math.min(5, this.fao.AffixEntryList.length + 1)),
      (t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e)),
      (e =
        ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueQualityConfigByQualityId(
          e,
        )),
      t &&
        ((t = UE.Color.FromHex(t.DropColor)),
        this.GetTexture(0).SetColor(t),
        this.GetTexture(2).SetColor(t),
        this.GetSprite(3).SetColor(t)),
      e &&
        ((t = new UE.LinearColor(UE.Color.FromHex(e.RoleNiagaraColor))),
        this.GetUiNiagara(9).SetNiagaraVarLinearColor("Color", t)),
      (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.RoleId))) &&
      (this.GetText(4).ShowTextNew(e.Name),
      this.SetTextureByPath(e.FormationRoleCard, this.GetTexture(1)));
  }
  Lao() {
    this.Pho.RefreshByDataAsync(this.fao.AffixEntryList ?? []).then(() => {
      if (this.xho) {
        let o = void 0;
        for (const t of this.Pho.GetLayoutItemList())
          this.xho?.has(t.AffixEntry.Id) &&
            (t.SetSecondColor(), t.RefreshPanel(), (o = t));
        if (void 0 !== o) {
          const h = this.GetScrollViewWithScrollbar(13);
          let s = 0;
          h.OnLateUpdate.Bind((t) => {
            if (++s === 2) {
              let t = 0;
              const e = o.GetRootItem().GetHeight();
              const i = h.GetViewport().GetUIItem().GetHeight();
              const r = h.ContentUIItem.GetHeight();
              (t = i < e ? r - i * Math.trunc(e / i) - (e % i) - 10 : r - i),
                (t = Math.max(t, 0)),
                h.ContentUIItem.SetAnchorOffsetY(t),
                h.OnLateUpdate.Unbind();
            }
          });
        }
      }
    });
  }
  kIt() {
    this.GetItem(8).SetUIActive((this.fao.AffixEntryList?.length ?? 0) <= 0);
  }
}
exports.RoleSelectItem = RoleSelectItem;
// # sourceMappingURL=RoleSelectItem.js.map
