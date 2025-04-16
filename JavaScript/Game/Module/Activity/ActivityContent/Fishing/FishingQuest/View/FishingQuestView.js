"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQuestView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  ConfirmBoxController_1 = require("../../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../../../../Help/HelpController"),
  SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  FishingController_1 = require("../../FishingController"),
  FishingDefine_1 = require("../../FishingDefine"),
  FishingQuestItem_1 = require("./FishingQuestItem"),
  FishingQuestShapePanel_1 = require("./FishingQuestShapePanel");
class FishingQuestView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Yc_ = -1),
      (this.lqe = void 0),
      (this.zc_ = void 0),
      (this.H3e = void 0),
      (this.Jc_ = void 0),
      (this.YV_ = void 0),
      (this.Zc_ = void 0),
      (this.eu_ = 0),
      (this.tu_ = 0),
      (this.iu_ = ""),
      (this.Y9_ = !1),
      (this.EO_ = void 0),
      (this.SPe = void 0),
      (this.ru_ = () => {
        HelpController_1.HelpController.OpenHelpById(
          FishingDefine_1.SAILING_QUEST_HELP_ID,
        );
      }),
      (this.Pwe = () => {
        switch (this.tu_) {
          case 0:
            FishingController_1.FishingController.RequestFishingEntrustAccept(
              this.Yc_,
              !0,
              () => {
                FishingController_1.FishingController.RequestFishingEntrustTrace(
                  this.Yc_,
                );
              },
            );
            break;
          case 3:
            var e,
              t,
              s = new Map();
            for ([
              e,
              t,
            ] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
              this.Yc_,
            ).EntrustTarget) {
              var i =
                ModelManager_1.ModelManager.DockyardModel.GetItemListByItemId(
                  e,
                );
              i.sort((i, e) => i.Price - e.Price);
              for (const a of i) {
                let i = s.get(e);
                if (i && i?.length >= t) break;
                i = i || [];
                var r = { L8n: e, b9n: a.IncId, m9n: 1 };
                i.push(r), s.set(e, i);
              }
            }
            var n,
              h = [];
            for ([, n] of s) h.push(...n);
            FishingController_1.FishingController.RequestFishingEntrustHandInRequest(
              this.Yc_,
              h,
            );
            break;
          case 4:
            break;
          case 5:
            var o =
              ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
                this.Yc_,
              );
            SkipTaskManager_1.SkipTaskManager.RunByConfigId(o.AccessPath);
            break;
          case 1:
            (ModelManager_1.ModelManager.FishingQuestModel.TraceFormClick = !0),
              FishingController_1.FishingController.RequestFishingEntrustTrace(
                this.Yc_,
              );
            break;
          case 2:
            FishingController_1.FishingController.RequestFishingEntrustTrace(0);
        }
      }),
      (this.wwe = () => {
        switch (this.eu_) {
          case 0:
            var e =
              ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
                this.Yc_,
              );
            e &&
              (2 === e
                ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    260,
                  )).FunctionMap.set(2, () => {
                    FishingController_1.FishingController.RequestFishingEntrustRefresh(
                      this.Yc_,
                    );
                  }),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    e,
                  ))
                : FishingController_1.FishingController.RequestFishingEntrustRefresh(
                    this.Yc_,
                  ));
            break;
          case 1: {
            var t,
              s,
              e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
                this.Yc_,
              );
            let i = !1;
            if (0 === e.EntrustType || 1 === e.EntrustType) {
              for ([t, s] of e.EntrustTarget) {
                if (!t || !s) break;
                if (
                  ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(
                    t,
                  ) < s
                )
                  break;
              }
              i = !0;
            }
            var r =
              ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
                this.Yc_,
              );
            if (2 === e.EntrustType || 2 === r || i)
              return (
                (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  246,
                )).FunctionMap.set(2, () => {
                  FishingController_1.FishingController.RequestFishingEntrustTrace(
                    0,
                  ),
                    FishingController_1.FishingController.RequestFishingEntrustAccept(
                      this.Yc_,
                      !1,
                    );
                }),
                void ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                )
              );
            FishingController_1.FishingController.RequestFishingEntrustTrace(0),
              FishingController_1.FishingController.RequestFishingEntrustAccept(
                this.Yc_,
                !1,
              );
            break;
          }
        }
      }),
      (this.ou_ = () => {
        var i = new FishingQuestItem_1.FishingQuestItem();
        return (i.OnClickTaskCallBack = this.nu_), i;
      }),
      (this.jWt = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.nu_ = (i, e, t) => {
        this.EO_?.(),
          (this.EO_ = t),
          this.Zc_ !== e && this.Zc_?.SetToggleState(0, !1),
          (this.Zc_ = e),
          this.Og(i),
          "Switch" !== this.SPe?.GetCurrentSequence()
            ? this.SPe?.PlayLevelSequenceByName("Switch")
            : this.SPe?.ReplaySequenceByKey("Switch");
      }),
      (this.su_ = (i, e) => {
        i ? this.Og(this.Yc_) : this.Esi(e ?? 0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIScrollViewWithScrollbarComponent],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIText],
      [14, UE.UIButtonComponent],
      [15, UE.UIText],
      [16, UE.UIItem],
      [17, UE.UIText],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIText],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIText],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [9, this.ru_],
        [14, this.Pwe],
        [12, this.wwe],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingRefreshQuestView,
      this.su_,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingRefreshQuestView,
      this.su_,
    );
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetHelpBtnActive(!1),
      await this.lqe.SetCurrencyItemList([
        FishingDefine_1.FISHING_CURRENCY_ITEMID,
      ]),
      (this.zc_ = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        this.ou_,
      )),
      (this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(10),
        this.jWt,
      )),
      (this.Jc_ = new FishingQuestShapePanel_1.FishingQuestShapePanel()),
      await this.Jc_.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      (this.YV_ = new FishingQuestShapePanel_1.FishingQuestShapePanel()),
      await this.YV_.CreateThenShowByActorAsync(this.GetItem(20).GetOwner()),
      (this.iu_ = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
        FishingDefine_1.FISHING_CURRENCY_ITEMID,
      ).IconSmall),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
    this.Esi(i);
  }
  OnBeforeShow() {
    if (this.Y9_) {
      this.Og(this.Yc_);
      var i = this.zc_?.GetScrollItemList();
      if (i) for (const e of i) e.RefreshChildItemStateAbout();
    } else this.Y9_ = !0;
  }
  Esi(t = 0) {
    var i = [];
    let e = !1;
    for (const r of ModelManager_1.ModelManager.FishingQuestModel.EntrustPool)
      r !== FishingDefine_1.FISHING_QUICK_SAIL_POOL &&
        (ModelManager_1.ModelManager.FishingQuestModel.GetPoolHasAnyEntrust(
          r,
        ) && i.push(r),
        ModelManager_1.ModelManager.FishingQuestModel.GetPoolHasAnyAcceptedEntrust(
          r,
        )) &&
        (e = !0);
    var s = 0 < i.length;
    this.GetItem(18)?.SetUIActive(s),
      this.GetItem(19)?.SetUIActive(!s),
      s ||
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(24),
          e ? "Fishing_EnrustEmptyState2" : "Fishing_EnrustEmptyState1",
        ),
      this.zc_?.RefreshByData(i, () => {
        if (t)
          for (const e of this.zc_?.GetScrollItemList()) {
            var i = e.HaveTargetTask(t);
            if (-1 < i) return void e.SelectFirstItem(i);
          }
        this.zc_?.GetScrollItemByIndex(0)?.SelectFirstItem();
      });
  }
  Og(i) {
    i = -1 === (this.Yc_ = i);
    if (
      (this.GetItem(23).SetUIActive(!i), this.GetItem(25).SetUIActive(i), !i)
    ) {
      i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
        this.Yc_,
      );
      if (i) {
        var e,
          t,
          s = [];
        for ([e, t] of i.EntrustReward) {
          var r = [{ IncId: 0, ItemId: e }, t];
          s.push(r);
        }
        this.H3e?.RefreshByData(s),
          this.GetItem(26).SetUIActive(i.IsNight),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Name),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            FishingDefine_1.fishingEntrustTypeText[i.EntrustType],
          ),
          this.zV_(),
          this.zao();
      }
    }
  }
  zV_() {
    var i,
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
        this.Yc_,
      );
    let t = 0;
    for ([i] of e.EntrustTarget)
      1 === ++t
        ? this.Jc_?.RefreshPanel(i)
        : 2 === t && (this.YV_?.SetUiActive(!0), this.YV_?.RefreshPanel(i));
    t < 2 && this.YV_?.SetUiActive(!1);
    var s = e.EntrustDestination,
      s =
        (s
          ? ((s =
              ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(
                s,
              )),
            (s = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(
              s.MarkId,
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(6),
              s?.MarkTitle ?? "Fishing_AnyWharf",
            ))
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(6),
              "Fishing_AnyWharf",
            ),
        e.TargetDesText);
    if (e.TargetDesText) {
      let i = 0;
      for (var [r, n] of s) {
        i++;
        var h = e.EntrustTarget.get(r) ?? 0,
          r = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(r);
        1 === i
          ? (this.GetText(17).SetText(
              ConfigManager_1.ConfigManager.TextConfig.GetMultiText(n, "" + h) +
                " (" +
                Math.min(r, h) +
                "/" +
                h +
                ")",
            ),
            (this.GetText(17).useChangeColor = h <= r))
          : 2 === i &&
            (this.GetItem(22).SetUIActive(!0),
            this.GetText(21).SetText(
              ConfigManager_1.ConfigManager.TextConfig.GetMultiText(n, "" + h) +
                " (" +
                Math.min(r, h) +
                "/" +
                h +
                ")",
            ),
            (this.GetText(21).useChangeColor = h <= r)),
          i < 2 && this.GetItem(22).SetUIActive(!1);
      }
    } else this.GetText(17).SetText("--");
  }
  zao() {
    var i,
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
        this.Yc_,
      ),
      t = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(
        this.Yc_,
      );
    if ((this.GetItem(27).SetUIActive(!1), 0 === t))
      return (
        this.GetItem(7).SetUIActive(!0),
        (i =
          LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
            e.UnlockCondition,
          )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i ?? ""),
        this.GetButton(12).RootUIComp.SetUIActive(!1),
        this.GetButton(14).RootUIComp.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(15),
          "FishingTagJumpToTech",
        ),
        (this.tu_ = 5),
        (i =
          ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
            e.AccessPath,
          )),
        (e = Number(i?.Val3 ?? 0)),
        i && e
          ? ((i =
              ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(
                e,
              )),
            void this.GetItem(27).SetUIActive(i))
          : void 0
      );
    this.GetItem(7).SetUIActive(!1),
      ModelManager_1.ModelManager.FishingModel.DockId <= 0
        ? (this.GetButton(12)?.RootUIComp.SetUIActive(!1),
          (this.eu_ = 2),
          (e =
            this.Yc_ ===
            ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(15),
            e ? "FishingBtnCancelTrace" : "FishingBtnTrace",
          ),
          (this.tu_ = e ? 2 : 1))
        : ((i =
            ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsRefreshCost(
              this.Yc_,
            )),
          this.GetButton(12)?.RootUIComp.SetUIActive(0 <= i),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(13),
            "FishingRefreshEntrust",
            `<texture=${this.iu_},0.5/>` + i,
          ),
          (this.eu_ = 0),
          1 === t
            ? (this.GetButton(14).RootUIComp.SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(15),
                "FishingBtnReceiving",
              ),
              (this.tu_ = 0))
            : (this.GetItem(16).SetUIActive(!1),
              2 === t
                ? (this.GetButton(14).RootUIComp.SetUIActive(!0),
                  LguiUtil_1.LguiUtil.SetLocalTextNew(
                    this.GetText(15),
                    "FishingBtnFinishing",
                  ),
                  (this.tu_ = 3))
                : ModelManager_1.ModelManager.FishingQuestModel
                      .CurrentTraceEntrust === this.Yc_
                  ? (this.GetButton(14).RootUIComp.SetUIActive(!0),
                    LguiUtil_1.LguiUtil.SetLocalTextNew(
                      this.GetText(15),
                      "FishingBtnCancelTrace",
                    ),
                    (this.tu_ = 2))
                  : 3 === t &&
                    (ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsTargetEnough(
                      this.Yc_,
                    ) ||
                    ModelManager_1.ModelManager.FishingQuestModel
                      .CurrentTraceEntrust === this.Yc_
                      ? (this.GetButton(14).RootUIComp.SetUIActive(!1),
                        this.GetItem(16).SetUIActive(!0),
                        LguiUtil_1.LguiUtil.SetLocalTextNew(
                          this.GetText(15),
                          "FishingBtnCanNotFinishing",
                        ),
                        (this.tu_ = 4))
                      : (this.GetButton(14).RootUIComp.SetUIActive(!0),
                        LguiUtil_1.LguiUtil.SetLocalTextNew(
                          this.GetText(15),
                          "FishingBtnTrace",
                        ),
                        (this.tu_ = 1)))));
  }
}
exports.FishingQuestView = FishingQuestView;
//# sourceMappingURL=FishingQuestView.js.map
