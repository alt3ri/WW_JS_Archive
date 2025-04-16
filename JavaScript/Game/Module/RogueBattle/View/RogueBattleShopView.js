"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleShopView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RogueBattleShopDetail_1 = require("../Component/RogueBattleShopDetail"),
  RogueBattleShopGrid_1 = require("../Component/RogueBattleShopGrid");
class RogueBattleShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.CaptionItem = void 0),
      (this.DetailPanel = void 0),
      (this.GoodsLayout = void 0),
      (this.Wvt = (e, t) => {
        this.DetailPanel.Refresh(t), this.GoodsLayout?.SelectGridProxy(e);
      }),
      (this.pMo = () => {
        var e = new UiAsyncTask_1.UiAsyncTask(
          "RefreshWeeklyRogueShop",
          async () => {
            await this.RefreshItemList();
          },
        );
        this.RunAsyncTask(e);
      }),
      (this.Mlo = () => {}),
      (this.cV_ = () => {
        var e = new RogueBattleShopGrid_1.RogueBattleShopGrid();
        return (e.SelectCallback = this.Wvt), e;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [5, UE.UILoopScrollViewComponent],
      [6, UE.UIItem],
      [1, UE.UIItem],
      [3, UE.UIButtonComponent],
      [2, UE.UIItem],
      [0, UE.UIItem],
      [4, UE.UIText],
      [7, UE.UITexture],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.Mlo]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueBattleSelectOption,
      this.pMo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueBattleSelectOption,
      this.pMo,
    );
  }
  async OnBeforeStartAsync() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    )),
      (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
        this.GetItem(0),
      )),
      this.CaptionItem.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.DetailPanel = new RogueBattleShopDetail_1.RogueBattleShopDetail()),
      await Promise.all([
        this.DetailPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
        this.CaptionItem.SetCurrencyItemList([
          RoguelikeDefine_1.INSIDE_CURRENCY_ID,
        ]),
      ]),
      (this.GoodsLayout = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(5),
        this.GetItem(6).GetOwner(),
        this.cV_,
      )),
      await this.RefreshItemList(),
      this.GetButton(3).GetRootComponent().SetUIActive(!1),
      this.GetItem(2)?.SetUIActive(!1);
  }
  OnAfterShow() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Show");
  }
  async RefreshItemList() {
    var e = this.OpenParam,
      e = ModelManager_1.ModelManager.RogueBattleModel.GetOptionDataById(
        e,
      )?.Dac.sort((e, t) => {
        var i, s;
        return e.Rac?.O2s !== t.Rac?.O2s
          ? e.Rac?.O2s
            ? 1
            : -1
          : (i = e.Rac?.qN_ !== e.Rac?.kN_) != (s = t.Rac?.qN_ !== t.Rac?.kN_)
            ? i
              ? -1
              : 1
            : i && s
              ? e.Rac.qN_ - t.Rac.qN_
              : i || s
                ? e.Rac.v9n - t.Rac.v9n
                : e.Rac.kN_ - t.Rac.kN_;
      });
    await this.GoodsLayout.RefreshByDataAsync(e),
      e &&
        0 < e.length &&
        (this.GoodsLayout.DeselectCurrentGridProxy(),
        this.GoodsLayout.SelectGridProxy(0, !0),
        this.DetailPanel.Refresh(e[0]));
  }
}
exports.RogueBattleShopView = RogueBattleShopView;
//# sourceMappingURL=RogueBattleShopView.js.map
