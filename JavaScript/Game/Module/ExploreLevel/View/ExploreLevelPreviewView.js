"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelPreviewView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  HelpController_1 = require("../../Help/HelpController"),
  ItemController_1 = require("../../Item/ItemController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ExploreLevelPreviewItem_1 = require("./ExploreLevelPreviewItem");
class ExploreLevelPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.fVt = void 0),
      (this.pVt = void 0),
      (this.vVt = void 0),
      (this.oVt = []),
      (this.MVt = 0),
      (this.UHs = void 0),
      (this.RHs = (e) => {
        e = e.Data;
        ItemController_1.ItemController.OpenItemTipsByItemId(e);
      }),
      (this.dtt = () => {
        HelpController_1.HelpController.OpenHelpById(this.pVt.GetHelpId());
      }),
      (this.EVt = () => {
        this.MVt = Math.max(0, this.MVt - 1);
        var e = this.oVt[this.MVt];
        e && (this.SVt(e), this.xHs(e)), this.yVt();
      }),
      (this.IVt = () => {
        this.MVt = Math.min(this.MVt + 1, this.oVt.length - 1);
        var e = this.oVt[this.MVt];
        e && (this.SVt(e), this.xHs(e)), this.yVt();
      }),
      (this.TVt = () => {
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
        [0, this.dtt],
        [1, this.EVt],
        [2, this.IVt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.UHs = new SmallItemGrid_1.SmallItemGrid()),
      this.UHs.BindOnExtendToggleClicked(this.RHs),
      this.UHs.BindOnCanExecuteChange(() => !1),
      await this.UHs.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  OnStart() {
    var e = this.OpenParam,
      e =
        ((this.vVt = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(6),
          this.GetItem(7).GetOwner(),
          this.TVt,
        )),
        (this.fVt = e),
        (this.oVt = this.fVt.GetUnlockFunctionExploreLevelRewardDataList()),
        (this.MVt = this.LVt(this.fVt.GetExploreLevel())),
        this.oVt[this.MVt]);
    e && (this.SVt(e), this.xHs(e)), this.yVt(), this.DVt();
  }
  OnBeforeDestroy() {
    (this.fVt = void 0), this.vVt.ClearGridProxies(), (this.vVt = void 0);
  }
  LVt(i) {
    var t = this.oVt.length;
    for (let e = 0; e < t; e++) if (this.oVt[e].GetExploreLevel() > i) return e;
    for (let e = t - 1; 0 < e; e--)
      if (this.oVt[e].GetExploreLevel() < i) return e;
  }
  SVt(e) {
    var i, t, s;
    (this.pVt = e).IsShowUnlockSprite() &&
      (this.SetSpriteByPath(e.GetUnlockSpritePath(), this.GetSprite(5), !1),
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.GetScoreNameId(),
      )),
      (t = this.GetText(4)),
      (s = e.GetExploreLevel() <= this.fVt.GetExploreLevel())
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, "ExploreUnlockRewardText", i)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(t, "ExploreLockRewardText", i),
      this.GetSprite(8).SetUIActive(!s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        e.GetRewardNameId(),
      ));
  }
  xHs(e) {
    e = e.GetPreviewItemConfigId();
    this.UHs?.Apply({ Type: 4, Data: e, ItemConfigId: e });
  }
  yVt() {
    var e = this.oVt.length;
    this.SetButtonUiActive(2, this.MVt < e - 1),
      this.SetButtonUiActive(1, 0 < this.MVt);
  }
  DVt() {
    var e = this.fVt.GetAllExploreLevelRewardData().slice(1);
    this.vVt.ReloadData(e);
  }
}
exports.ExploreLevelPreviewView = ExploreLevelPreviewView;
//# sourceMappingURL=ExploreLevelPreviewView.js.map
