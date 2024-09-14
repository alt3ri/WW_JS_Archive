"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeTokenOverView =
    exports.RoguelikeTokenGrid =
    exports.RogueTokenData =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RoguelikeController_1 = require("../RoguelikeController");
class RogueTokenData {
  constructor() {
    (this.IsReceive = !1), (this.Config = void 0);
  }
}
exports.RogueTokenData = RogueTokenData;
class RoguelikeTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.OnClicked = () => {
        this.ScrollViewDelegate.SelectGridProxy(
          this.GridIndex,
          this.DisplayIndex,
          !0,
        );
      });
  }
  OnStart() {
    this.BindOnExtendToggleClicked(this.OnClicked);
  }
  OnRefresh(e, t, i) {
    this.Data = e;
    var o = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
        e.Config.Token,
      ),
      o = {
        Type: 4,
        Data: e,
        IconPath: o.BuffIcon,
        QualityId: o.Quality,
        BottomTextId: o.BuffName,
        QualityType: "MediumItemGridQualitySpritePath",
        IsProhibit: void 0 === e.IsReceive,
      };
    this.Apply(o), this.SetSelected(t), t && this.OnSelected(!0);
  }
  OnSelected(e) {
    e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoguelikeSelectToken,
        this,
      );
  }
}
exports.RoguelikeTokenGrid = RoguelikeTokenGrid;
class RogueTokenCommonItemSmallItemGrid extends CommonItemSmallItemGrid_1.CommonItemSmallItemGrid {
  OnExtendToggleClicked() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoguelikeGetTokenReward,
    );
  }
}
class RoguelikeTokenOverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabDataList = []),
      (this.DataMap = new Map()),
      (this.SeasonId = 0),
      (this.CommonGridItem = void 0),
      (this.LoopScrollView = void 0),
      (this.LastSelectGrid = void 0),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        const t =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTokenBySeasonId(
              this.SeasonId,
            ),
          n = [];
        let s = 0;
        var i = (o) => {
          t.forEach((e) => {
            var t, i;
            (ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
              e.Token,
            ).PerkType !== o &&
              void 0 !== o) ||
              ((t = this.DataMap.get(e.Token)),
              ((i = new RogueTokenData()).IsReceive = t),
              (i.Config = e),
              void 0 !== t && s++,
              n.push(i));
          });
        };
        switch (e) {
          case 0:
            i(void 0);
            break;
          case 1:
            i(2);
            break;
          case 2:
            i(5);
        }
        this.GetItem(13).SetUIActive(!1),
          this.LoopScrollView.ReloadData(n),
          this.LoopScrollView.ScrollToGridIndex(0),
          this.LoopScrollView.SelectGridProxy(0, !0),
          this.LoopScrollView.RefreshAllGridProxies(),
          this.GetItem(12).SetUIActive(0 < n.length),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            "Roguelike_TokenOverView_Collect",
            s,
            n.length,
          );
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.CreateLoopScrollItem = () => new RoguelikeTokenGrid()),
      (this.OnCloseClick = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.RefreshDetail = (e) => {
        if (this.LastSelectGrid !== e) {
          var e = (this.LastSelectGrid = e).Data,
            t =
              ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
                e.Config.Token,
              ),
            n =
              (LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(11),
                t.BuffName,
              ),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(6),
                t.BuffDesc,
                ...t.BuffDescParam,
              ),
              this.GetText(7).SetUIActive(!1),
              this.SetTextureByPath(t.BuffIcon, this.GetTexture(9)),
              ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(
                e.Config.DropId,
              )),
            n = Array.from(n),
            n = [{ IncId: 0, ItemId: n[0][0] }, n[0][1]];
          let i = 10,
            o = 0;
          t.BuffElement.forEach((e, t) => {
            (i = t), (o = e);
          }),
            this.GetTexture(5).SetUIActive(i < 10),
            this.GetText(4).SetUIActive(i < 10),
            i < 10 &&
              ((t =
                ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(
                  i,
                )),
              this.SetTextureByPath(t.Icon5, this.GetTexture(5)),
              this.GetText(4).SetText(o.toString())),
            this.CommonGridItem.Refresh(n),
            this.CommonGridItem.SetActive(!e.IsReceive),
            this.GetItem(13).SetUIActive(!0);
        }
      }),
      (this.RoguelikeGetTokenReward = () => {
        const t = this.LastSelectGrid.Data;
        void 0 !== t.IsReceive &&
          RoguelikeController_1.RoguelikeController.RoguelikeTokenReceiveRequest(
            this.SeasonId,
            t.Config.Id,
          ).then((e) => {
            e &&
              ((t.IsReceive = !0), this.CommonGridItem.SetActive(!t.IsReceive));
          });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [12, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UIText],
      [13, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeSelectToken,
      this.RefreshDetail,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoguelikeGetTokenReward,
        this.RoguelikeGetTokenReward,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeSelectToken,
      this.RefreshDetail,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoguelikeGetTokenReward,
        this.RoguelikeGetTokenReward,
      );
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      e =
        ((this.SeasonId = e.UHn),
        e.Sqs.forEach((e) => {
          this.DataMap.set(e.s5n, e.ovs);
        }),
        void 0 === this.CommonGridItem &&
          ((this.CommonGridItem = new RogueTokenCommonItemSmallItemGrid()),
          this.CommonGridItem.Initialize(this.GetItem(8).GetOwner())),
        this.CommonGridItem.SetActive(!1),
        new CommonTabComponentData_1.CommonTabComponentData(
          this.R6e,
          this.pqe,
          this.yqe,
        )),
      e =
        ((this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(1),
          this.GetItem(2).GetOwner(),
          this.CreateLoopScrollItem,
        )),
        (this.TabComponent =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            e,
            this.OnCloseClick,
          )),
        (this.TabDataList =
          ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
            "RoguelikeTokenOverView",
          )),
        this.TabDataList.length);
    await this.TabComponent.RefreshTabItemByLengthAsync(e);
  }
  OnBeforeShow() {
    this.TabComponent.SelectToggleByIndex(0);
  }
}
exports.RoguelikeTokenOverView = RoguelikeTokenOverView;
//# sourceMappingURL=RoguelikeTokenOverView.js.map
