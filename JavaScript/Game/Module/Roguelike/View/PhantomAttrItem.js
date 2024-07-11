"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomAttrItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const ElementItem_1 = require("./ElementItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhantomAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.AffixEntry = void 0),
      (this.Mhi = void 0),
      (this.hao = void 0),
      (this.EPe = void 0),
      (this.jhi = () => {
        return new ElementItem_1.ElementItem();
      });
  }
  Update(e) {
    (this.AffixEntry = e), this.PWt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    );
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  PWt() {
    this.lao(), this._ao(), this.o3e(), this.OPt();
  }
  lao() {
    const e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.GetIsUnlock(
      this.AffixEntry,
    );
    this.GetSprite(3).SetUIActive(e), this.GetSprite(4).SetUIActive(!e);
  }
  _ao() {
    let e;
    let t;
    let i;
    const r = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueAffixConfig(
      this.AffixEntry.Id,
    );
    r &&
      ((e = ModelManager_1.ModelManager.RoguelikeModel.GetDescModel()),
      (t = this.GetText(0)),
      (i = this.GetText(7)).SetColor(
        this.AffixEntry?.IsUnlock
          ? UE.Color.FromHex("BEFE58FF")
          : UE.Color.FromHex("ECE5D8FF"),
      ),
      t.SetColor(
        this.AffixEntry?.IsUnlock
          ? UE.Color.FromHex("BEFE58FF")
          : UE.Color.FromHex("ECE5D8FF"),
      ),
      e === 0
        ? (t.ShowTextNew(r.AffixDescSimple), i.ShowTextNew(r.AffixDescSimple))
        : (LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            r.AffixDesc,
            ...r.AffixDescParam,
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            i,
            r.AffixDesc,
            ...r.AffixDescParam,
          )));
  }
  o3e() {
    var e = this.GetText(0);
    var e = e.GetTextRenderSize().X < e.Width;
    const t = this.GetHorizontalLayout(1)
      .GetRootComponent()
      .GetParentAsUIItem();
    const i = this.GetItem(6);
    const r = this.GetItem(5)
      .GetOwner()
      .GetComponentByClass(UE.UISizeControlByOther.StaticClass());
    const s = (e ? t : i).GetOwner();
    r.SetTargetActor(s),
      t.SetUIActive(e),
      i.SetUIActive(!e),
      void 0 === this.Mhi &&
        (this.Mhi = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(1),
          this.jhi,
          void 0,
        )),
      void 0 === this.hao &&
        (this.hao = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(8),
          this.jhi,
          this.GetItem(2)?.GetOwner(),
        ));
  }
  OPt() {
    const e = this.AffixEntry.GetSortElementInfoArrayByCount();
    this.Mhi?.RefreshByData(e), this.hao?.RefreshByData(e);
  }
  PlayComplete() {
    this.EPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
  }
}
exports.PhantomAttrItem = PhantomAttrItem;
// # sourceMappingURL=PhantomAttrItem.js.map
