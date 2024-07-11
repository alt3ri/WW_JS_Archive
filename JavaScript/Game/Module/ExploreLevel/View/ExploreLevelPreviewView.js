"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelPreviewView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const HelpController_1 = require("../../Help/HelpController");
const ItemController_1 = require("../../Item/ItemController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ExploreLevelPreviewItem_1 = require("./ExploreLevelPreviewItem");
class ExploreLevelPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.f5t = void 0),
      (this.p5t = void 0),
      (this.v5t = void 0),
      (this.o5t = []),
      (this.M5t = 0),
      (this.cTn = void 0),
      (this.sRn = (e) => {
        e = e.Data;
        ItemController_1.ItemController.OpenItemTipsByItemId(e);
      }),
      (this.YZe = () => {
        HelpController_1.HelpController.OpenHelpById(this.p5t.GetHelpId());
      }),
      (this.S5t = () => {
        this.M5t = Math.max(0, this.M5t - 1);
        const e = this.o5t[this.M5t];
        e && (this.E5t(e), this.dTn(e)), this.y5t();
      }),
      (this.I5t = () => {
        this.M5t = Math.min(this.M5t + 1, this.o5t.length - 1);
        const e = this.o5t[this.M5t];
        e && (this.E5t(e), this.dTn(e)), this.y5t();
      }),
      (this.T5t = () => {
        return new ExploreLevelPreviewItem_1.ExploreLevelPreviewItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UILoopScrollViewComponent],
      [7, UE.UIItem],
      [8, UE.UISprite],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.YZe],
        [1, this.S5t],
        [2, this.I5t],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.cTn = new SmallItemGrid_1.SmallItemGrid()),
      this.cTn.BindOnExtendToggleClicked(this.sRn),
      this.cTn.BindOnCanExecuteChange(() => !1),
      await this.cTn.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  OnStart() {
    var e = this.OpenParam;
    var e =
      ((this.v5t = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        this.GetItem(7).GetOwner(),
        this.T5t,
      )),
      (this.f5t = e),
      (this.o5t = this.f5t.GetUnlockFunctionExploreLevelRewardDataList()),
      (this.M5t = this.L5t(this.f5t.GetExploreLevel())),
      this.o5t[this.M5t]);
    e && (this.E5t(e), this.dTn(e)), this.y5t(), this.D5t();
  }
  OnBeforeDestroy() {
    (this.f5t = void 0), this.v5t.ClearGridProxies(), (this.v5t = void 0);
  }
  L5t(i) {
    const t = this.o5t.length;
    for (let e = 0; e < t; e++) if (this.o5t[e].GetExploreLevel() > i) return e;
    for (let e = t - 1; e > 0; e--)
      if (this.o5t[e].GetExploreLevel() < i) return e;
  }
  E5t(e) {
    let i, t, s;
    (this.p5t = e).IsShowUnlockSprite() &&
      (this.SetSpriteByPath(e.GetUnlockSpritePath(), this.GetSprite(5), !1),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.GetScoreNameId(),
      )),
      (t = this.GetText(4)),
      (s = e.GetExploreLevel() <= this.f5t.GetExploreLevel())
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, "ExploreUnlockRewardText", i)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(t, "ExploreLockRewardText", i),
      this.GetSprite(8).SetUIActive(!s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        e.GetRewardNameId(),
      ));
  }
  dTn(e) {
    e = e.GetPreviewItemConfigId();
    this.cTn?.Apply({ Type: 4, Data: e, ItemConfigId: e });
  }
  y5t() {
    const e = this.o5t.length;
    this.SetButtonUiActive(2, this.M5t < e - 1),
      this.SetButtonUiActive(1, this.M5t > 0);
  }
  D5t() {
    const e = this.f5t.GetAllExploreLevelRewardData().slice(1);
    this.v5t.ReloadData(e);
  }
}
exports.ExploreLevelPreviewView = ExploreLevelPreviewView;
// # sourceMappingURL=ExploreLevelPreviewView.js.map
