"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattlePhantomAffix = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleUtils_1 = require("../RogueBattleUtils"),
  RogueBattleTokenElementWithCount_1 = require("./RogueBattleTokenElementWithCount"),
  COMPLETE = "Complete";
class RogueBattlePhantomAffix extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.ElementLayout = void 0),
      (this.AdaptationElementLayout = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.jli = () =>
        new RogueBattleTokenElementWithCount_1.RogueBattleTokenElementWithCount());
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
  async OnBeforeStartAsync() {
    return (
      (this.ElementLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.jli,
      )),
      (this.AdaptationElementLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(8),
        this.jli,
      )),
      Promise.resolve()
    );
  }
  Refresh(t, e, i) {
    (this.Data = t),
      this.RefreshLayout(),
      this.RefreshElement(),
      this.RefreshUnlock(),
      this.RefreshAttrText();
  }
  RefreshAttrText() {
    var t,
      e,
      i,
      s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResAffix(
        this.Data.v9n,
      );
    s &&
      ((t = ModelManager_1.ModelManager.RogueBattleModel.DescMode),
      (e = this.GetText(0)),
      (i = this.GetText(7))?.SetColor(
        this.Data?.oVc
          ? UE.Color.FromHex("BEFE58FF")
          : UE.Color.FromHex("ECE5D8FF"),
      ),
      e?.SetColor(
        this.Data?.oVc
          ? UE.Color.FromHex("BEFE58FF")
          : UE.Color.FromHex("ECE5D8FF"),
      ),
      0 === t
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(e, s.AffixDescSimple),
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, s.AffixDescSimple))
        : (LguiUtil_1.LguiUtil.SetLocalTextNew(
            e,
            s.AffixDesc,
            ...s.AffixDescParam,
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            i,
            s.AffixDesc,
            ...s.AffixDescParam,
          )));
  }
  RefreshUnlock() {
    this.GetSprite(3).SetUIActive(this.Data.oVc),
      this.GetSprite(4).SetUIActive(!this.Data.oVc);
  }
  RefreshLayout() {
    var t = this.GetText(0),
      t = t.GetTextRenderSize().X < t.Width,
      e = this.GetHorizontalLayout(1).GetRootComponent().GetParentAsUIItem(),
      i = this.GetItem(6),
      s = this.GetItem(5)
        .GetOwner()
        .GetComponentByClass(UE.UISizeControlByOther.StaticClass()),
      r = (t ? e : i).GetOwner();
    s.SetTargetActor(r), e.SetUIActive(t), i.SetUIActive(!t);
  }
  RefreshElement() {
    const t =
      RogueBattleUtils_1.RogueBattleUtils.ConvertElementUnitsToElementInfo(
        this.Data.iVc,
      );
    this.ElementLayout.RefreshByData(t),
      this.AdaptationElementLayout.RefreshByData(t);
    var e = new UiAsyncTask_1.UiAsyncTask(
      "RogueBattlePhantomAffix.RefreshElement",
      async () => {
        await Promise.all([
          this.ElementLayout.RefreshByDataAsync(t),
          this.AdaptationElementLayout.RefreshByDataAsync(t),
        ]);
      },
    );
    this.RunAsyncTask(e);
  }
  PlayComplete() {
    this.LevelSequencePlayer.PlayLevelSequenceByName(COMPLETE);
  }
}
exports.RogueBattlePhantomAffix = RogueBattlePhantomAffix;
//# sourceMappingURL=RogueBattlePhantomAffix.js.map
