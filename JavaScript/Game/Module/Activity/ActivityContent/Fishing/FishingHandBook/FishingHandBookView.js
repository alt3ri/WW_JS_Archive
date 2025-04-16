"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHandBookView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  FilterSortEntrance_1 = require("../../../../Common/FilterSort/FilterSortEntrance"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView"),
  FishingDefine_1 = require("../FishingDefine"),
  FishingQuestShapePanel_1 = require("../FishingQuest/View/FishingQuestShapePanel"),
  FishingHandBookDesItem_1 = require("./FishingHandBookDesItem"),
  FishingHandBookItem_1 = require("./FishingHandBookItem"),
  FishingHandBookTagItem_1 = require("./FishingHandBookTagItem");
class FishingHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.qGe = []),
      (this.lqe = void 0),
      (this.XA_ = void 0),
      (this.YA_ = void 0),
      (this.zA_ = void 0),
      (this.JA_ = void 0),
      (this.zji = void 0),
      (this.ZA_ = void 0),
      (this.eP_ = void 0),
      (this.tP_ = 0),
      (this.SPe = void 0),
      (this.iP_ = () => {
        var i = new FishingHandBookItem_1.FishingHandBookItem();
        return (i.OnClickToggleCallBack = this.rP_), i;
      }),
      (this.oP_ = () => {
        return new FishingHandBookTagItem_1.FishingHandBookTagItem();
      }),
      (this.nP_ = () => {
        return new FishingHandBookDesItem_1.FishingHandBookDesItem();
      }),
      (this.sP_ = () => {
        var i =
          !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(
            this.ETt,
          );
        if (
          i &&
          !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookUnlockTraceList.includes(
            this.ETt,
          )
        )
          return void (0 < this.tP_
            ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "Fishing_VariationItemCannotTrace",
              )
            : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "Fishing_NormalItemCannotTrace",
              ));
        for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
          this.ETt,
        ).Tech)
          if (e === FishingDefine_1.FISHING_CAGE_TECH)
            return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_CageDetect",
            );
        (i =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
            this.ETt,
          ).Relation ?? 0),
          (i = 0 < i ? i : this.ETt);
        ModelManager_1.ModelManager.FishingQuestModel.TraceItem(i);
      }),
      (this.rP_ = (i, e, t) => {
        this.zji?.SetToggleState(0, !1),
          (this.zji = e),
          this.Og(i),
          this.YA_.SelectGridProxy(t, !1),
          this.SPe?.PlayLevelSequenceByName("Switch");
      }),
      (this.aP_ = (i, e) => {
        let t = 0;
        for (const s of this.qGe) {
          if (s.Id === i) break;
          t++;
        }
        this.YA_.ScrollToGridIndex(t), this.YA_.SelectGridProxy(t, !0);
      }),
      (this.Z6e = (i) => {
        const e = new Array();
        this.qGe = [];
        for (const s of i) {
          var t = s;
          e.push(t.Id), this.qGe.push(t);
        }
        0 < e.length
          ? (this.YA_?.RefreshByData(e, !1, () => {
              this.YA_?.SelectGridProxy(0, !0), this.Og(e[0]);
            }),
            this.GetItem(4).SetUIActive(!1),
            this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!0),
            this.GetItem(19).SetUIActive(!0))
          : (this.GetItem(4).SetUIActive(!0),
            this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!1),
            this.GetItem(19).SetUIActive(!1));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [10, UE.UIItem],
      [9, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
      [15, UE.UIVerticalLayout],
      [14, UE.UIHorizontalLayout],
      [16, UE.UIButtonComponent],
      [17, UE.UIItem],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIText],
    ]),
      (this.BtnBindInfo = [[16, this.sP_]]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetHelpBtnActive(!1),
      (this.XA_ = new FishingQuestShapePanel_1.FishingQuestShapePanel()),
      await this.XA_.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      (this.YA_ = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        this.iP_,
      )),
      (this.zA_ = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(14),
        this.oP_,
      )),
      (this.JA_ = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(15),
        this.nP_,
      )),
      (this.ZA_ = new FishingHandBookItem_1.FishingHandBookItem()),
      await this.ZA_.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()),
      (this.ZA_.OnClickToggleCallBack = this.aP_),
      (this.eP_ = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(5),
        this.Z6e,
      )),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.FishingModel.GetFishingItemList();
    this.eP_?.UpdateData(37, i),
      this.GetText(3).SetText(
        ModelManager_1.ModelManager.FishingModel.UnLockFishingItemCount +
          "/" +
          ModelManager_1.ModelManager.FishingModel.AllFishingItemCount,
      );
  }
  Og(i) {
    this.ETt = i;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i),
      t =
        (0 < e.Tech?.length
          ? (this.zA_?.RefreshByData(e.Tech), this.GetItem(12).SetUIActive(!0))
          : this.GetItem(12).SetUIActive(!1),
        (this.tP_ = 0) < e.Relation
          ? ((this.tP_ = e.Relation),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(20),
              "FishingRelationText",
            ),
            this.ZA_?.Refresh(this.tP_, !1, 0))
          : 0 < e.ChildRelation &&
            ((this.tP_ = e.ChildRelation),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(20),
              "FishingChildRelationText",
            ),
            this.ZA_?.Refresh(this.tP_, !1, 0)),
        this.GetItem(10).SetUIActive(0 < this.tP_),
        !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(
          i,
        )),
      s = t
        ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "FishingLockItemName",
          )
        : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name),
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(11),
          "Fishing_ArchiveTitle",
          e.IllustratedNum + "",
          s,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(8),
          t ? "FishingLockItemName" : e.Desc,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(7),
          t ? "FishingItemLockState" : "FishingItemUnlockState",
        ),
        this.XA_?.RefreshPanel(i, !t),
        this.hP_(i),
        ModelManager_1.ModelManager.FishingModel.FishingItemHandBookUnlockTraceList.includes(
          this.ETt,
        )),
      i = this.GetButton(16);
    !t || s
      ? (i.RootUIComp.SetUIActive(!0),
        i.SetSelfInteractive(!0),
        this.GetItem(17).SetUIActive(!1))
      : e.DetectionUnlockCondition
        ? (i.RootUIComp.SetUIActive(!1),
          this.GetItem(17).SetUIActive(!0),
          (t =
            ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionGroupConfig(
              e.DetectionUnlockCondition,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), t.HintText))
        : (i.RootUIComp.SetUIActive(!0),
          i.SetSelfInteractive(!1),
          i.SetCanClickWhenDisable(!0),
          this.GetItem(17).SetUIActive(!1)),
      this.dH_();
  }
  hP_(i) {
    var e,
      t,
      s,
      n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i),
      a = [];
    0 < n.Area?.length &&
      ((t = n.Area[0]),
      (t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t)),
      (t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(t.Title)),
      a.push({ DesText: "Fishing_Area", DataText: t })),
      0 < n.Time &&
        ((t =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            FishingDefine_1.fishingItemTimeText[n.Time],
          ) ?? ""),
        a.push({ DesText: "Fishing_Time", DataText: t })),
      0 < n.SizeWeight.length &&
        (!(t =
          ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(
            i,
          ))
          ? ((e = {
              DesText: "Fishing_MaxSize",
              DataText: (s =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "FishingLockItemName",
                ) ?? ""),
            }),
            a.push({ DesText: "Fishing_MinSize", DataText: s }),
            a.push(e))
          : ((s =
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "Fishing_SizeDes",
              ) ?? ""),
            (i = {
              DesText: "Fishing_MinSize",
              DataText: t.MinSize + s,
              IsSliver: (e =
                ModelManager_1.ModelManager.FishingModel.GetSizeIsGoldSize(
                  i,
                )).includes(0),
            }),
            (t = {
              DesText: "Fishing_MaxSize",
              DataText: t.MaxSize + s,
              IsGolden: e.includes(2),
            }),
            a.push(i),
            a.push(t))),
      0 < n.Reputation &&
        ((s = { DesText: "Fishing_AddCount", DataText: "+" + n.Reputation }),
        a.push(s)),
      this.GetVerticalLayout(15).RootUIComp.SetUIActive(0 < a.length),
      this.JA_?.RefreshByData(a);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (0 !== i.length && "FishingHandBookItem" === i[0]) {
      if (2 !== i.length) return;
      var i = Number(i[1]);
      if (0 <= i && i < this.qGe.length)
        return (i = this.YA_?.GetGridByDisplayIndex(i)) ? [i, i] : void 0;
    }
  }
  dH_() {
    ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(
      this.ETt,
    ) &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FishingHandBookItemRecord,
        this.ETt,
      ),
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FishingHandBookItemRecord,
      ));
  }
}
exports.FishingHandBookView = FishingHandBookView;
//# sourceMappingURL=FishingHandBookView.js.map
