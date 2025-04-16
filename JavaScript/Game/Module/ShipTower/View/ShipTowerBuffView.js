"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerBuffView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool"),
  ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerBuffListItem_1 = require("./ShipTowerBuffListItem");
class ShipTowerBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.zJa = void 0),
      (this.xqe = void 0),
      (this.vxt = void 0),
      (this.ys_ = void 0),
      (this.vZ_ = 0),
      (this.yZ_ = 0),
      (this.SZ_ = void 0),
      (this.MZ_ = () => {
        this.SZ_?.IsFulfilled() || this.SZ_?.SetResult(!0);
      }),
      (this.OnClickBtnSelect = () => {
        this.OpenParam?.OnUseBuff?.(this.ys_, this.OpenParam?.TeamData),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("ShipTower", 69, this.constructor.name);
      }),
      (this.Ss_ = () => {
        var i = new ShipTowerBuffListItem_1.ShipTowerBuffListItem();
        return (
          (i.OnItemClickCallback = this.Ms_),
          (i.GetStageIdCallback = this.BW_),
          (i.BuffComponentLoadedCallback = this.EZ_),
          i
        );
      }),
      (this.EZ_ = () => {
        this.vZ_++, this.vZ_ < this.yZ_ || this.MZ_();
      }),
      (this.BW_ = () => this.OpenParam?.TeamData?.StageId),
      (this.Ms_ = (i) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("ShipTower", 69, this.constructor.name, [
            "OnItemClickCallback",
            i,
          ]),
          (this.ys_ = i),
          this.k8t();
        var e = this.ys_.ItemId,
          e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e),
          t = this.OpenParam?.TeamData?.StageId;
        (e.UpdateShowNumCallback = () => i.CanUseCount),
          (e.IsShowNumTextCallback = i.IsShowNumTextCallback.bind(i, t)),
          this.vxt.RefreshTips(e),
          this.vxt.SetVisible(!0);
        const s = i.AddToGetState();
        this.xqe?.GetScrollItemList().forEach((i) => {
          s && i.UpdateBuffInfo(), i.UpdateBuffSelected();
        });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [3, UE.UIItem],
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  Es_() {
    var i = this.OpenParam?.BuffId;
    i
      ? ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(
          i,
        )?.SetSelected(!0)
      : ModelManager_1.ModelManager.ShipTowerModel.SelectDefaultBuff(
          this.OpenParam?.StageId,
        ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerBuffView", [
          "DataParam",
          this.OpenParam,
        ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2))),
      this.zJa.SetCloseCallBack(this.CloseMe.bind(this)),
      this.zJa.SetHelpBtnActive(!1),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.Ss_,
        void 0,
        !0,
      )),
      (this.vxt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent()),
      await this.vxt.CreateByActorAsync(this.GetItem(3).GetOwner());
    TimerSystem_1.TimerSystem.Delay(this.MZ_, 5e3);
    var i = ModelManager_1.ModelManager.ShipTowerModel.GetBuffQualityList(!0),
      e = i.findIndex((i) => i.BuffList.find((i) => i.IsSelected));
    (this.yZ_ = i.reduce((i, e) => i + e.BuffList.length, 0)),
      this.yZ_ <= 0
        ? this.xqe.RefreshByData(i)
        : ((this.SZ_ = new CustomPromise_1.CustomPromise()),
          await this.xqe.RefreshByDataAsync(i),
          await this.SZ_?.Promise,
          this.xqe.LateScrollTo(this.xqe.GetItemByIndex(e)));
  }
  OnBeforeDestroy() {
    this.MZ_(), this.vxt?.Destroy(), (this.vxt = void 0), (this.zJa = void 0);
  }
  k8t() {
    var i;
    this.vxt.ClearButtonList(),
      this.vxt.SetLockStateVisible(),
      1 === this.OpenParam?.OperationType &&
        (this.ys_?.IsUnlock
          ? ((i = this.OpenParam?.TeamData?.StageId),
            this.ys_.IsCanUse(i)
              ? ((i = {
                  Function: this.OnClickBtnSelect,
                  Text: ShipTowerDefine_1.shipTowerTextKey.EquipBuff,
                  Index: 0,
                }),
                this.vxt.RefreshButton([i]))
              : this.vxt.SetLockStateData({
                  TipsTextKey: ShipTowerDefine_1.shipTowerTextKey.ItemNotEnough,
                }))
          : this.vxt.SetLockStateData({
              TipsTextKey: ShipTowerDefine_1.shipTowerTextKey.ItemLock,
            }));
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetBuffQualityList(!0);
    if (0 !== e.length && 3 === i.length) {
      var t = Number(i[1]);
      if (!(isNaN(t) || t < 0 || t >= e.length))
        return this.xqe
          ?.GetScrollItemByIndex(t)
          ?.GetGuideUiItemAndUiItemForShowEx(i);
    }
  }
}
exports.ShipTowerBuffView = ShipTowerBuffView;
//# sourceMappingURL=ShipTowerBuffView.js.map
