"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueShopView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  WeeklyRogueShopDetail_1 = require("../Components/WeeklyRogueShopDetail"),
  WeeklyRogueTokenGrid_1 = require("../Components/WeeklyRogueTokenGrid");
class WeeklyRogueShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.CaptionItem = void 0),
      (this.DetailPanel = void 0),
      (this.GoodsLayout = void 0),
      (this.Wvt = (e, i) => {
        this.DetailPanel.Refresh(i), this.GoodsLayout?.SelectGridProxy(e);
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
      (this.Mlo = () => {
        UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
      }),
      (this.cV_ = () => {
        return new WeeklyRogueTokenGrid_1.WeeklyRogueTokenGrid();
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
      EventDefine_1.EEventName.WeeklyRogueShopSelect,
      this.Wvt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WeeklyRogueSelectOption,
        this.pMo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeeklyRogueShopSelect,
      this.Wvt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WeeklyRogueSelectOption,
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
      (this.DetailPanel = new WeeklyRogueShopDetail_1.WeeklyRogueShopDetail()),
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
    var e =
      ModelManager_1.ModelManager.WeeklyRogueModel.GetCurrentOption()?.UN_.sort(
        (e, i) => {
          var t, s;
          return e.BN_?.O2s !== i.BN_?.O2s
            ? e.BN_?.O2s
              ? 1
              : -1
            : (t = e.BN_?.qN_ !== e.BN_?.kN_) != (s = i.BN_?.qN_ !== i.BN_?.kN_)
              ? t
                ? -1
                : 1
              : t && s
                ? e.BN_.qN_ - i.BN_.qN_
                : t || s
                  ? e.c5n - i.c5n
                  : e.BN_.kN_ - i.BN_.kN_;
        },
      );
    await this.GoodsLayout.RefreshByDataAsync(e),
      e &&
        0 < e.length &&
        (this.GoodsLayout.DeselectCurrentGridProxy(),
        this.GoodsLayout.SelectGridProxy(0, !0),
        this.DetailPanel.Refresh(e[0]));
  }
}
exports.WeeklyRogueShopView = WeeklyRogueShopView;
//# sourceMappingURL=WeeklyRogueShopView.js.map
