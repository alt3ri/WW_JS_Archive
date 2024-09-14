"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomSelectItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhantomAttrItem_1 = require("./PhantomAttrItem");
class PhantomSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = !0) {
    super(),
      (this.RogueGainEntry = void 0),
      (this.PhantomAttrLayout = void 0),
      (this.IsRaycastTarget = !0),
      (this.NewUnlockAttrSet = new Set()),
      (this.vho = void 0),
      (this.Mho = (t) => {
        this.vho?.(this.RogueGainEntry.ConfigId);
      }),
      (this.Eho = () => {
        return new PhantomAttrItem_1.PhantomAttrItem();
      }),
      (this.IsRaycastTarget = t);
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    t.RoguelikeGainDataType === Protocol_1.Aki.Protocol.a8s.hxs &&
      ((this.RogueGainEntry = t), this.RefreshPanel());
  }
  SetToggleStateChangeCallback(t) {
    this.vho = t;
  }
  SetToggleUnDetermined() {
    this.GetExtendToggle(5).SetToggleState(2);
  }
  SetToggleUnChecked() {
    var t = this.GetExtendToggle(5);
    0 !== t.GetToggleState() && t.SetToggleState(0);
  }
  SetToggleRaycastTarget(t) {
    this.GetExtendToggle(5).RootUIComp.SetBubbleUpToParent(t),
      this.GetExtendToggle(5).SetSelfInteractive(t);
  }
  IsSelect() {
    return 1 === this.GetExtendToggle(5).GetToggleState();
  }
  GetSubItem() {
    return this.GetGuideUiItem("0");
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
      [6, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.Mho]]);
  }
  OnStart() {
    (this.PhantomAttrLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.Eho,
    )),
      this.SetToggleRaycastTarget(this.IsRaycastTarget);
  }
  OnBeforeDestroy() {
    this.vho = void 0;
  }
  RefreshPanel() {
    this.RogueGainEntry && (this.F7i(), this.Sho());
  }
  F7i() {
    var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
      this.RogueGainEntry.ConfigId,
    );
    t &&
      (this.GetText(1).ShowTextNew(t.PokemonName),
      this.SetTextureByPath(t.PokemonIcon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.PokemonSkillDesc),
      this.GetText(2).SetUIActive(
        1 === ModelManager_1.ModelManager.RoguelikeModel.GetDescModel(),
      ),
      (t =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(
          t.Quality,
        ))) &&
      (this.SetTextureByPath(t.PhantomBgA, this.GetTexture(6)),
      this.SetTextureByPath(t.PhantomBgB, this.GetTexture(7)));
  }
  Sho() {
    this.PhantomAttrLayout.RefreshByDataAsync(
      this.RogueGainEntry.AffixEntryList ?? [],
    ).then(() => {
      if (0 < this.NewUnlockAttrSet.size) {
        let e = 0;
        this.PhantomAttrLayout.BindLateUpdate(() => {
          if (0 === e) e++;
          else {
            var t = this.GetItem(8),
              r = this.GetItem(9);
            const h = this.GetVerticalLayout(3);
            let e = h.GetSpacing() + h.GetPadding().Top,
              i = !1,
              s = h.GetPadding().Top;
            this.PhantomAttrLayout.GetLayoutItemList().forEach((t) => {
              this.NewUnlockAttrSet.has(t.AffixEntry.Id) &&
                (t.PlayComplete(), (i = !0)),
                i || (e += t.GetRootItem().Height + h.GetSpacing()),
                (s += t.GetRootItem().Height + h.GetSpacing());
            });
            t = s - t.Height;
            (e = Math.min(e, t)),
              r.SetAnchorOffsetY(e),
              this.PhantomAttrLayout?.UnBindLateUpdate();
          }
        });
      }
    });
  }
  SetUnlockAttrSet(t) {
    this.NewUnlockAttrSet = t;
  }
}
exports.PhantomSelectItem = PhantomSelectItem;
//# sourceMappingURL=PhantomSelectItem.js.map
