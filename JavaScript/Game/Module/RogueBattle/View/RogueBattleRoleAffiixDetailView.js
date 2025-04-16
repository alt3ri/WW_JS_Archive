"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleRoleAffixDetailView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleRoleAffixDetailToggle_1 = require("../Component/RogueBattleRoleAffixDetailToggle");
class RogueBattleRoleAffixDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.ZC1 = void 0),
      (this.e01 = (e) => {
        this.ZC1?.SelectGridProxy(e), this.RefreshDetail();
      }),
      (this.Bqe = () => {
        var e =
          new RogueBattleRoleAffixDetailToggle_1.RogueBattleRoleAffixDetailToggle();
        return (e.OnSelectCallback = this.e01), e;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
    ];
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.ZC1 = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.Bqe,
      )),
      await Promise.all([
        this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        this.ZC1.RefreshByDataAsync(this.OpenParam.AffixIds),
      ]),
      this.ZC1.SelectGridProxy(this.OpenParam.Index ?? 0),
      this.RefreshDetail();
  }
  RefreshDetail() {
    var e = this.ZC1.GetSelectedGridIndex();
    e < 0 ||
      ((e = this.OpenParam.AffixIds[e]),
      void 0 !==
        (e =
          ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResCharacterBuff(
            e,
          )) &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.AffixTitle),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          e.AffixDesc,
          ...e.AffixDescParam,
        ),
        this.SetSpriteByPath(e.AffixIcon, this.GetSprite(1), !1)));
  }
}
exports.RogueBattleRoleAffixDetailView = RogueBattleRoleAffixDetailView;
//# sourceMappingURL=RogueBattleRoleAffiixDetailView.js.map
