"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomAttrItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  ElementItem_1 = require("./ElementItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PhantomAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.AffixEntry = void 0),
      (this.Mli = void 0),
      (this.rho = void 0),
      (this.SPe = void 0),
      (this.jli = () => {
        return new ElementItem_1.ElementItem();
      });
  }
  Update(e) {
    (this.AffixEntry = e), this.PKt();
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
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    );
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  PKt() {
    this.nho(), this.sho(), this.v4e(), this.Hxt();
  }
  nho() {
    var e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.GetIsUnlock(
      this.AffixEntry,
    );
    this.GetSprite(3).SetUIActive(e), this.GetSprite(4).SetUIActive(!e);
  }
  sho() {
    var e,
      t,
      i,
      r = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueAffixConfig(
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
      0 === e
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
  v4e() {
    var e = this.GetText(0),
      e = e.GetTextRenderSize().X < e.Width,
      t = this.GetHorizontalLayout(1).GetRootComponent().GetParentAsUIItem(),
      i = this.GetItem(6),
      r = this.GetItem(5)
        .GetOwner()
        .GetComponentByClass(UE.UISizeControlByOther.StaticClass()),
      s = (e ? t : i).GetOwner();
    r.SetTargetActor(s),
      t.SetUIActive(e),
      i.SetUIActive(!e),
      void 0 === this.Mli &&
        (this.Mli = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(1),
          this.jli,
          void 0,
        )),
      void 0 === this.rho &&
        (this.rho = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(8),
          this.jli,
          this.GetItem(2)?.GetOwner(),
        ));
  }
  Hxt() {
    var e = this.AffixEntry.GetSortElementInfoArrayByCount();
    this.Mli?.RefreshByData(e), this.rho?.RefreshByData(e);
  }
  PlayComplete() {
    this.SPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
  }
}
exports.PhantomAttrItem = PhantomAttrItem;
//# sourceMappingURL=PhantomAttrItem.js.map
