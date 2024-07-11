"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSelectView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueGainEntry_1 = require("../Define/RogueGainEntry"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RogueSelectResult_1 = require("../Define/RogueSelectResult"),
  RoguelikeController_1 = require("../RoguelikeController"),
  CommonSelectItem_1 = require("./CommonSelectItem"),
  ElementPanel_1 = require("./ElementPanel"),
  PhantomInfoPanel_1 = require("./PhantomInfoPanel"),
  RogueSelectBaseView_1 = require("./RogueSelectBaseView"),
  TopPanel_1 = require("./TopPanel");
class CommonSelectView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments),
      (this.RoguelikeChooseData = void 0),
      (this.TopPanel = void 0),
      (this.ElementPanel = void 0),
      (this.PhantomInfoPanel = void 0),
      (this.ButtonItem = void 0),
      (this.RefreshButtonItem = void 0),
      (this.CommonSelectItemLayout = void 0),
      (this.CurSelectItem = void 0),
      (this.LastRefreshTime = 0),
      (this.IsFirstOpen = !0),
      (this.m8t = () => {
        var e = this.Jao();
        e &&
          ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
            e.RogueGainEntry),
          RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
            1,
          ));
      }),
      (this.zao = () => {
        var e = TimeUtil_1.TimeUtil.GetServerTime();
        (e - this.LastRefreshTime < 1 && 0 !== this.LastRefreshTime) ||
          ((this.LastRefreshTime = e),
          RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(
            this.RoguelikeChooseData.Index,
          ));
      }),
      (this.CreateCommonSelectItem = () => {
        var e = new CommonSelectItem_1.CommonSelectItem();
        return e.SetClickCallBack(this.RefreshPreview), e;
      }),
      (this.RoguelikeChooseDataResult = (e, i, t, s, o) => {
        if (t && s === this.RoguelikeChooseData?.Index) {
          t = this.Jao();
          if (t) {
            var h = new RogueSelectResult_1.RogueSelectResult(
                e,
                i,
                t.RogueGainEntry,
              ),
              s = 0 < o.Q2s.length;
            if (s) {
              h.IsShowCommon = !0;
              for (const r of o.Q2s) {
                h.ExtraRogueGainEntry = new RogueGainEntry_1.RogueGainEntry(r);
                break;
              }
            }
            h.GetNewUnlockAffixEntry().size <= 0 && !s
              ? UiManager_1.UiManager.CloseView(this.Info.Name)
              : UiManager_1.UiManager.CloseAndOpenView(
                  this.Info.Name,
                  "CommonSelectResultView",
                  h,
                );
          }
        }
      }),
      (this.OnDescModelChange = () => {
        this.CommonSelectItemLayout.GetLayoutItemList().forEach((e) => {
          e.RefreshPanel();
        }),
          this.RefreshPreview(this.CurSelectItem);
      }),
      (this.RoguelikeRefreshGain = (e) => {
        ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
          void 0;
        e =
          ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
            e,
          );
        (this.RoguelikeChooseData = e), this.bl();
      }),
      (this.RefreshPreview = (e = void 0) => {
        e
          ? ((this.CurSelectItem = e.IsSelect() ? e : void 0),
            this.ButtonItem.SetEnableClick(e.IsSelect()),
            (e = e?.RogueGainEntry),
            this.PhantomInfoPanel.RefreshPhantomEntryItemRefreshPreview(
              e?.ElementDict,
            ),
            this.ElementPanel.Refresh(e))
          : (this.ButtonItem.SetEnableClick(!1),
            this.PhantomInfoPanel.RefreshPhantomEntryItemRefreshPreview(),
            this.ElementPanel.Refresh());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UITexture],
      [8, UE.UIText],
    ];
  }
  Jao() {
    for (const e of this.CommonSelectItemLayout.GetLayoutItemList())
      if (e.IsSelect()) return e;
  }
  async OnBeforeStartAsync() {
    (this.PhantomInfoPanel = new PhantomInfoPanel_1.PhantomInfoPanel()),
      await this.PhantomInfoPanel.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      ),
      (this.ElementPanel = new ElementPanel_1.ElementPanel()),
      await this.ElementPanel.CreateThenShowByActorAsync(
        this.GetItem(4).GetOwner(),
      ),
      (this.TopPanel = new TopPanel_1.TopPanel()),
      await this.TopPanel.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      );
  }
  OnStart() {
    (ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = void 0),
      (this.RoguelikeChooseData = this.OpenParam),
      (this.TopPanel.CloseCallback = this.CloseMySelf),
      this.PhantomInfoPanel.Update(
        ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry,
      ),
      (this.ButtonItem = new ButtonItem_1.ButtonItem(
        this.GetButton(5).GetRootComponent(),
      )),
      this.ButtonItem.SetFunction(this.m8t),
      (this.RefreshButtonItem = new ButtonItem_1.ButtonItem(
        this.GetButton(6).GetRootComponent(),
      )),
      this.RefreshButtonItem.SetFunction(this.zao),
      (this.CommonSelectItemLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this.CreateCommonSelectItem,
      )),
      this.TopPanel?.RefreshCurrency([RoguelikeDefine_1.INSIDE_CURRENCY_ID]),
      this.bl();
  }
  OnBeforeShow() {
    this.IsFirstOpen
      ? (this.IsFirstOpen = !1)
      : (this.TopPanel?.RefreshTabBtn(), this.OnDescModelChange());
  }
  OnBeforeDestroy() {
    this.TopPanel.Destroy(),
      this.ElementPanel.Destroy(),
      this.PhantomInfoPanel.Destroy();
  }
  bl() {
    this.RefreshPhantomSelectItemList(),
      this.RefreshTopPanel(),
      this.RefreshElementPanel(),
      this.RefreshPhantomInfoPanel(),
      this.RefreshPreview(this.CurSelectItem),
      this.RefreshBtnText(),
      this.RefreshRefreshBtnText();
  }
  RefreshPhantomSelectItemList() {
    this.CommonSelectItemLayout.RefreshByData(
      this.RoguelikeChooseData.RogueGainEntryList ?? [],
      () => {
        this.CommonSelectItemLayout?.GetUiAnimController()?.Play();
      },
    );
  }
  RefreshTopPanel() {
    let e = !1;
    for (const i of this.RoguelikeChooseData.RogueGainEntryList)
      if (
        5 ===
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
          i.ConfigId,
        )?.PerkType
      ) {
        e = !0;
        break;
      }
    e
      ? (this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_9_TEXT),
        this.TopPanel.RefreshSelectTipsText(
          RoguelikeDefine_1.ROGUELIKEVIEW_10_TEXT,
          !1,
          ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength() - 1,
        ))
      : (this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_11_TEXT),
        this.TopPanel.RefreshSelectTipsText(
          RoguelikeDefine_1.ROGUELIKEVIEW_12_TEXT,
        ));
  }
  RefreshElementPanel() {
    this.ElementPanel.Refresh();
  }
  RefreshPhantomInfoPanel() {
    this.PhantomInfoPanel.Refresh();
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_13_TEXT);
  }
  RefreshRefreshBtnText() {
    var e,
      i,
      t = this.RoguelikeChooseData.UseTime,
      s = this.RoguelikeChooseData.MaxTime,
      t = (this.RefreshButtonItem.SetActive(0 < s), s - t),
      s =
        (t <= 0
          ? this.RefreshButtonItem.SetLocalTextNew(
              "RoguelikeView_29_Text",
              t,
              s,
            )
          : this.RefreshButtonItem.SetLocalTextNew(
              "RoguelikeView_28_Text",
              t,
              s,
            ),
        this.RoguelikeChooseData.CostCurrency);
    0 < s.length &&
      ((s = s[0]),
      (i = (e =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          s.J4n,
        ) >= s.o9n)
        ? "RogueSpecialRefreshCost"
        : "RogueSpecialRefreshCost_Not"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i, s.o9n),
      this.RefreshButtonItem.SetEnableClick(0 < t && e),
      (i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(
        s.J4n,
      )),
      this.SetTextureByPath(i.IconSmall, this.GetTexture(7)));
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (2 === i.length || isNaN(Number(i[0]))) {
      let e = void 0;
      return (
        "Attribute" === i[1]
          ? (e = this.PhantomInfoPanel?.GetAttributeItem(Number(i[0])))
          : "Cost" === i[1] &&
            (e = this.TopPanel?.GetCostItemByIndex(Number(i[0]))),
        e ? [e, e] : void 0
      );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        i,
      ]);
  }
}
exports.CommonSelectView = CommonSelectView;
//# sourceMappingURL=CommonSelectView.js.map
