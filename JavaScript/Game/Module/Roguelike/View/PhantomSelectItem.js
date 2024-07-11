"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomSelectItem = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhantomAttrItem_1 = require("./PhantomAttrItem");
class PhantomSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = !0) {
    super(),
      (this.RogueGainEntry = void 0),
      (this.PhantomAttrLayout = void 0),
      (this.IsRaycastTarget = !0),
      (this.NewUnlockAttrSet = new Set()),
      (this.yao = void 0),
      (this.Iao = (t) => {
        this.yao?.(this.RogueGainEntry.ConfigId);
      }),
      (this.Tao = () => {
        return new PhantomAttrItem_1.PhantomAttrItem();
      }),
      (this.IsRaycastTarget = t);
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    t.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.qDs &&
      ((this.RogueGainEntry = t), this.RefreshPanel());
  }
  SetToggleStateChangeCallback(t) {
    this.yao = t;
  }
  SetToggleUnDetermined() {
    this.GetExtendToggle(5).SetToggleState(2);
  }
  SetToggleUnChecked() {
    const t = this.GetExtendToggle(5);
    t.GetToggleState() !== 0 && t.SetToggleState(0);
  }
  SetToggleRaycastTarget(t) {
    this.GetExtendToggle(5).RootUIComp.SetBubbleUpToParent(t),
      this.GetExtendToggle(5).SetSelfInteractive(t);
  }
  IsSelect() {
    return this.GetExtendToggle(5).GetToggleState() === 1;
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
      (this.BtnBindInfo = [[5, this.Iao]]);
  }
  OnStart() {
    (this.PhantomAttrLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.Tao,
    )),
      this.SetToggleRaycastTarget(this.IsRaycastTarget);
  }
  OnBeforeDestroy() {
    this.yao = void 0;
  }
  RefreshPanel() {
    this.RogueGainEntry && (this.V9i(), this.Lao());
  }
  V9i() {
    let t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
      this.RogueGainEntry.ConfigId,
    );
    t &&
      (this.GetText(1).ShowTextNew(t.PokemonName),
      this.SetTextureByPath(t.PokemonIcon, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.PokemonSkillDesc),
      this.GetText(2).SetUIActive(
        ModelManager_1.ModelManager.RoguelikeModel.GetDescModel() === 1,
      ),
      (t =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(
          t.Quality,
        ))) &&
      (this.SetTextureByPath(t.PhantomBgA, this.GetTexture(6)),
      this.SetTextureByPath(t.PhantomBgB, this.GetTexture(7)));
  }
  Lao() {
    this.PhantomAttrLayout.RefreshByDataAsync(
      this.RogueGainEntry.AffixEntryList ?? [],
    ).then(() => {
      if (this.NewUnlockAttrSet.size > 0) {
        let e = 0;
        this.PhantomAttrLayout.BindLateUpdate(() => {
          if (e === 0) e++;
          else {
            let t = this.GetItem(8);
            const r = this.GetItem(9);
            const h = this.GetVerticalLayout(3);
            let e = h.GetSpacing() + h.GetPadding().Top;
            let i = !1;
            let s = h.GetPadding().Top;
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
// # sourceMappingURL=PhantomSelectItem.js.map
