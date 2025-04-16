"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInstanceEntranceInfoItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  InstOnlineType_1 = require("../../../../../Core/Define/Config/SubType/InstOnlineType"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InstanceDungeonLockItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonLockItem"),
  InstanceDungeonRecommendLevelItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonRecommendLevelItem"),
  InstanceDungeonRightTitleItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonRightTitleItem"),
  InstanceDungeonStartButtonItem_1 = require("../../../InstanceDungeon/InstanceDungeonSubComponent/InstanceDungeonStartButtonItem"),
  ActivityInstanceEntranceDropDownItem_1 = require("./ActivityInstanceEntranceDropDownItem"),
  ActivityInstanceEntranceMonsterTipsItem_1 = require("./ActivityInstanceEntranceMonsterTipsItem");
class ActivityInstanceEntranceInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Qth = void 0),
      (this.zth = void 0),
      (this.Zth = void 0),
      (this.$th = void 0),
      (this.IBl = void 0),
      (this.lOl = void 0),
      (this.TBl = void 0),
      (this.LBl = void 0),
      (this.hOl = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.Qth =
      new InstanceDungeonRightTitleItem_1.InstanceDungeonRightTitleItem()),
      e.push(
        this.Qth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_RightTitle",
          this.GetItem(0),
        ),
      ),
      (this.zth =
        new InstanceDungeonStartButtonItem_1.InstanceDungeonStartButtonItem()),
      e.push(
        this.zth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_StartButton",
          this.GetItem(2),
        ),
      ),
      (this.Zth = new InstanceDungeonLockItem_1.InstanceDungeonLockItem()),
      e.push(
        this.Zth.CreateByResourceIdAsync(
          "UiItem_InstanceDungeon_Lock",
          this.GetItem(2),
        ),
      ),
      await Promise.all(e);
  }
  RefreshView(e) {
    this.kxt(e),
      this.UBl(e),
      this.NFe(e),
      this.RefreshRecommendLevelItem(e),
      this.RefreshDropDownItem(e),
      this.RefreshMonsterTipsItem(e);
  }
  kxt(e) {
    var t;
    e && e.GetActivityEntranceDescInfoData()
      ? (this.Qth?.SetUiActive(!0),
        (t = e.GetActivityEntranceDescInfoData()),
        (e =
          e
            .GetActivityEntranceSelectItemData()
            ?.GetCurrentSelectData()
            ?.GetSelectDataIndex() ?? 0),
        this.Qth?.RefreshName(t.GetName(e)),
        this.Qth?.RefreshDesc(t.GetDesc(e)),
        this.Qth?.UpdateInstanceDungeonRecommendElementItem(
          t.GetRecommendElement(e),
        ))
      : this.Qth?.SetUiActive(!1);
  }
  UBl(t) {
    var e;
    t
      ? (this.zth.SetUiActive(!0),
        this.zth.RefreshItem(InstOnlineType_1.InstOnlineType.Single),
        (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue =
          !1),
        (this.zth.OnClickBtnSoloCallBack = () => {
          var e = t.GetActivityEntranceSelectItemData().GetCurrentSelectData();
          e && t.GetClickConfirmCallBack()?.(e.GetSelectDataIndex());
        }),
        (e = t
          .GetActivityEntranceSelectItemData()
          .GetCurrentSelectData()
          .GetLockState()),
        this.zth?.SetActive(!e))
      : this.zth.SetUiActive(!1);
  }
  NFe(e) {
    var t;
    e
      ? ((t = e
          .GetActivityEntranceSelectItemData()
          .GetCurrentSelectData()
          .GetLockState()),
        this.Zth.SetUiActive(t),
        (e = t
          ? e
              .GetActivityEntranceSelectItemData()
              .GetCurrentSelectData()
              ?.GetUnLockDesc()
          : ""),
        t && "" !== e && this.Zth.SetLockText(e))
      : this.Zth.SetUiActive(!1);
  }
  async RefreshDropDownItem(e) {
    e && e.GetActivityEntranceDropDownData()
      ? (this.TBl ||
          ((this.TBl = new CustomPromise_1.CustomPromise()),
          (this.IBl =
            new ActivityInstanceEntranceDropDownItem_1.ActivityInstanceEntranceDropDownItem()),
          await this.IBl.CreateThenShowByResourceIdAsync(
            "UiItem_InstanceDungeon_DropItem",
            this.GetItem(1),
          ).then(() => {
            this.TBl?.SetResult();
          })),
        await this.TBl.Promise,
        this.IBl.SetActive(!0),
        this.IBl.RefreshView(e, e.GetActivityEntranceDropDownData()))
      : this.IBl?.SetUiActive(!1);
  }
  async RefreshRecommendLevelItem(e) {
    e
      ? (e = e
          .GetActivityEntranceSelectItemData()
          .GetCurrentSelectData()
          ?.GetRecommendLevel()) &&
        0 < e &&
        (this.LBl ||
          ((this.LBl = new CustomPromise_1.CustomPromise()),
          (this.$th =
            new InstanceDungeonRecommendLevelItem_1.InstanceDungeonRecommendLevelItem()),
          await this.$th
            .CreateThenShowByResourceIdAsync(
              "UiItem_InstanceDungeon_RecommenLevel",
              this.GetItem(1),
            )
            .then(() => {
              this.LBl?.SetResult();
            })),
        await this.LBl.Promise,
        (e = { TextId: "RecommendLevel", Level: e }),
        this.$th.SetActive(!0),
        this.$th.RefreshItem(e))
      : this.$th?.SetUiActive(!1);
  }
  async RefreshMonsterTipsItem(e) {
    e && e.GetActivityEntranceMonsterPreviewData()
      ? (this.hOl ||
          ((this.hOl = new CustomPromise_1.CustomPromise()),
          (this.lOl =
            new ActivityInstanceEntranceMonsterTipsItem_1.ActivityInstanceEntranceMonsterTipsItem()),
          await this.lOl
            .CreateThenShowByResourceIdAsync(
              "UiItem_InstanceDungeon_Buff",
              this.GetItem(0),
            )
            .then(() => {
              this.hOl?.SetResult();
            })),
        await this.hOl.Promise,
        this.lOl.SetActive(!0),
        this.lOl.RefreshView(e))
      : this.lOl?.SetUiActive(!1);
  }
}
exports.ActivityInstanceEntranceInfoItem = ActivityInstanceEntranceInfoItem;
//# sourceMappingURL=ActivityInstanceEntranceInfoItem.js.map
