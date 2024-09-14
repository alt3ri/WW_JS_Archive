"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryMainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  HelpController_1 = require("../../Help/HelpController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  DarkCoastDeliveryLevelUpViewData_1 = require("../DarkCoastDeliveryLevelUpViewData"),
  MingSuController_1 = require("../MingSuController"),
  MingSuDefine_1 = require("../MingSuDefine"),
  DarkCoastDeliveryLevelItem_1 = require("./DarkCoastDeliveryLevelItem"),
  DarkCoastDeliveryTipPanel_1 = require("./DarkCoastDeliveryTipPanel"),
  LINE_START_INDEX = 1,
  LINE_COUNT = 6,
  ITEM_START_INDEX = 13,
  ITEM_COUNT = 5,
  LEVEL_ITEM_SHOW_DELAY = 300;
class DarkCoastDeliveryMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.EHa = void 0),
      (this.IHa = void 0),
      (this.THa = []),
      (this.LHa = []),
      (this.DHa = []),
      (this.lqe = void 0),
      (this.eho = void 0),
      (this.AHa = 0),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.pcr = () => {
        HelpController_1.HelpController.OpenHelpById(
          MingSuDefine_1.DARK_COAST_HELP_ID,
        );
      }),
      (this.RHa = (e, i) => {
        this.TZa(e, i);
      }),
      (this.YDo = () => {
        var e = this.Pe.GetActivityRewardViewData();
        UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", e, (e, i) => {
          e && this.AddChildViewById(i);
        });
      }),
      (this.UHa = () => {
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.Pe.GetCoreId(),
        ) <= 0
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "DarkCoastDelivery_Item_0",
            )
          : ((this.AHa = this.Pe.GetDragonPoolLevel()),
            MingSuController_1.MingSuController.SendHandInMingSuRequest(
              this.Pe.DragonPoolId,
            ));
      }),
      (this.xHa = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.Pe.GetCoreId(),
        );
      }),
      (this.PHa = () => {
        const i = this.Pe.GetDragonPoolLevel();
        var e;
        i > this.AHa
          ? ((e =
              new DarkCoastDeliveryLevelUpViewData_1.DarkCoastDeliveryLevelUpViewData(
                this.AHa,
                i,
              )),
            UiManager_1.UiManager.OpenView(
              "DarkCoastDeliveryLevelUpView",
              e,
              () => {
                var e = this.LZa(i);
                void 0 !== e && this.TZa(e.LevelData, e);
              },
            ))
          : (this.UiViewSequence.PlaySequence("Sweep"), this.Hqe());
      }),
      (this.KWa = () => {
        this.Hqe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [5, UE.UIItem],
      [7, UE.UIItem],
      [9, UE.UIItem],
      [11, UE.UIItem],
      [2, UE.UIItem],
      [4, UE.UIItem],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIButtonComponent],
      [20, UE.UIText],
      [21, UE.UIText],
      [22, UE.UIButtonComponent],
      [23, UE.UIItem],
      [24, UE.UIButtonComponent],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UITexture],
    ]),
      (this.BtnBindInfo = [
        [19, this.YDo],
        [22, this.UHa],
        [24, this.xHa],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Pe = this.OpenParam),
      void 0 === this.Pe
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("MingSuTi", 59, "DarkCoastDeliveryMainView无效输入！")
        : ((this.AHa = this.Pe.GetDragonPoolLevel()),
          this.bHa(),
          await this.qHa(),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(
            this.GetItem(23),
          )),
          this.lqe.SetCloseCallBack(this.Jvt),
          this.lqe.SetHelpCallBack(this.pcr),
          this.lqe.SetHelpBtnActive(!0),
          (this.eho =
            new DarkCoastDeliveryTipPanel_1.DarkCoastDeliveryTipPanel()),
          await this.eho.CreateThenShowByActorAsync(
            this.GetItem(18).GetOwner(),
          ));
  }
  bHa() {
    (this.THa = []), (this.LHa = []);
    for (let e = LINE_START_INDEX; e < LINE_START_INDEX + 2 * LINE_COUNT; e++)
      (e % 2 != 0 ? this.THa : this.LHa).push(this.GetItem(e));
  }
  async qHa() {
    var i = this.Pe.GetLevelDataList(),
      t = Math.min(i.length, ITEM_COUNT),
      s = new Array();
    for (let e = 0; e < t; e++) {
      var r = new DarkCoastDeliveryLevelItem_1.DarkCoastDeliveryLevelItem(i[e]),
        h =
          (r.SetClickToggleCallback(this.RHa),
          this.DHa.push(r),
          this.GetItem(e + ITEM_START_INDEX));
      s.push(this.j1a(r, h)),
        (0 !== e && !i[e].GetIsUnLock()) || ((this.EHa = i[e]), (this.IHa = r));
    }
    await Promise.all(s), this.IHa?.SetSelect(!0);
  }
  async j1a(e, i) {
    await e.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnBeforeShow() {
    (ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId =
      ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      this.Hqe(),
      this.BHa(),
      this.EHa && this.eho.RefreshUi(this.EHa),
      this.ZYa();
  }
  Hqe() {
    var e = this.Pe.GetCurLevelTexturePath(),
      e =
        (this.SetTextureShowUntilLoaded(e, this.GetTexture(0)),
        this.SetTextureShowUntilLoaded(e, this.GetTexture(29)),
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(
          this.Pe.DragonPoolId,
        )),
      i =
        ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(
          this.Pe.DragonPoolId,
        ),
      t =
        (i <= e
          ? ((t =
              ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelNeedCoreById(
                this.Pe.DragonPoolId,
                e - 1,
              )),
            this.GetText(20).SetText(t + "/" + t),
            this.GetItem(27).SetUIActive(!1),
            this.GetItem(28).SetUIActive(!0))
          : ((t =
              ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolCoreCountById(
                this.Pe.DragonPoolId,
              )),
            (s =
              ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelNeedCoreById(
                this.Pe.DragonPoolId,
                e,
              )),
            this.GetText(20).SetText(t + "/" + s),
            this.GetItem(27).SetUIActive(!0),
            this.GetItem(28).SetUIActive(!1)),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.Pe.GetCoreId(),
        )),
      s = this.GetText(21),
      t =
        (s.SetText(t.toString()),
        s.SetChangeColor(t <= 0 && e < i, s.changeColor),
        ModelManager_1.ModelManager.MingSuModel.CheckUp(this.Pe.DragonPoolId)),
      e = (this.GetItem(25).SetUIActive(t), this.Pe.GetRewardRedDotState());
    this.GetItem(26)?.SetUIActive(e);
  }
  ZYa() {
    var e = this.Pe.GetDragonPoolLevel();
    if (!(this.AHa >= e)) {
      let i = this.AHa + 1;
      var t = e - i + 1;
      TimerSystem_1.TimerSystem.Loop(
        () => {
          var e = this.LZa(i);
          e && (e.RefreshUi(), e.PlaySequence(!1), i++);
        },
        LEVEL_ITEM_SHOW_DELAY,
        t,
      ),
        (this.AHa = e);
    }
  }
  LZa(e) {
    for (const i of this.DHa) if (i.LevelData.Id === e) return i;
  }
  BHa() {
    var i = this.Pe.GetDragonPoolLevel();
    for (let e = 0; e < this.LHa.length; e++)
      this.LHa[e].SetUIActive(i >= e), this.THa[e].SetUIActive(i < e);
  }
  TZa(e, i) {
    this.EHa !== e &&
      (void 0 !== this.IHa && this.IHa.SetSelect(!1),
      (this.EHa = e),
      (this.IHa = i),
      this.IHa.SetSelect(!0),
      this.eho.RefreshUi(e),
      this.eho.SetUiActive(!0),
      this.UiViewSequence.StopPrevSequence(!1),
      this.UiViewSequence.PlaySequence("Switch"));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateDragonPoolView,
      this.PHa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
        this.KWa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateDragonPoolView,
      this.PHa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
        this.KWa,
      );
  }
}
exports.DarkCoastDeliveryMainView = DarkCoastDeliveryMainView;
//# sourceMappingURL=DarkCoastDeliveryMainView.js.map
