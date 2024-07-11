"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookLevelView = exports.StarItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CookController_1 = require("../CookController"),
  CookDefine_1 = require("../CookDefine");
class StarItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UISprite]]), (this.BtnBindInfo = []);
  }
  SetState(e) {
    e ? this.GetSprite(0).SetUIActive(!0) : this.GetSprite(0).SetUIActive(!1);
  }
}
exports.StarItem = StarItem;
class LevelRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, i) {
    e = {
      Data: e,
      Type: 4,
      ItemConfigId: e.RewardId,
      BottomText: 0 < e.Count ? "" + e.Count : "",
      IsReceivedVisible: e.IsGet,
    };
    this.Apply(e);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    var e = this.Data;
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      e.RewardId,
    );
  }
}
class CookLevelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NGt = void 0),
      (this.OGt = void 0),
      (this.lGe = void 0),
      (this.$be = void 0),
      (this.kGt = (e, t, i) => {
        var r = new StarItem();
        return (
          r.CreateThenShowByActor(t.GetOwner()),
          r.SetState(e),
          { Key: i, Value: r }
        );
      }),
      (this.FGt = () => {
        return new LevelRewardItem();
      }),
      (this.VGt = () => {
        0 !== this.OGt.length && this.Cl();
      }),
      (this.bl = () => {
        this.HGt(),
          this.P5e(),
          this.nOe(),
          this.pmt(),
          this.jGt(),
          this.WGt(),
          this.M3e(),
          this.KGt(),
          this.QGt(),
          this.sqe();
      }),
      (this.eTt = () => {
        CookController_1.CookController.SendCertificateLevelRewardRequest();
      }),
      (this.XGt = () => {
        --ModelManager_1.ModelManager.CookModel.SelectedCookerLevel, this.bl();
      }),
      (this.$Gt = () => {
        (ModelManager_1.ModelManager.CookModel.SelectedCookerLevel += 1),
          this.bl();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIHorizontalLayout],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [11, UE.UIHorizontalLayout],
      [10, UE.UIItem],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [5, this.XGt],
        [6, this.$Gt],
      ]);
  }
  OnBeforeDestroy() {
    this.DisableRedDot(),
      this.NGt && (this.NGt.ClearChildren(), (this.NGt = void 0)),
      this.$be.ClearChildren();
  }
  async OnBeforeStartAsync() {
    (this.lGe = new ConfirmItem()),
      await this.lGe.Initialize(this.GetItem(4)),
      this.lGe.BindOnClickedCallback(this.eTt);
  }
  OnStart() {
    (this.NGt = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(7),
      this.FGt,
    )),
      (this.OGt = new Array()),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(12),
        "CookUpgradeButtonText",
      ),
      (this.$be = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(11),
        this.kGt,
      )),
      (ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 4),
      (ModelManager_1.ModelManager.CookModel.SelectedCookerLevel =
        ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel),
      this.bl(),
      this.YGt();
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem?.SetTexBgVisible(!1), this.M3e();
  }
  YGt() {
    RedDotController_1.RedDotController.BindRedDot(
      "CookerLevelMain",
      this.lGe.GetRedDot(),
    );
  }
  DisableRedDot() {
    RedDotController_1.RedDotController.UnBindRedDot("CookerLevelMain");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpgradeCookerLevel,
      this.VGt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpgradeCookerLevel,
      this.VGt,
    );
  }
  ShowView() {
    this.SetActive(!0);
  }
  Cl() {
    (ModelManager_1.ModelManager.CookModel.SelectedCookerLevel =
      ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel),
      this.bl();
  }
  HGt() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      CookDefine_1.COOK_TYPE_TEXTURE_KEY,
    );
    this.SetTextureByPath(e, this.GetTexture(9));
  }
  P5e() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookLevelByLevel(
        ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
      ),
      e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name);
    this.GetText(0).SetText(e);
  }
  nOe() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookLevelByLevel(
        ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
      ),
      e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
        e.AttributesDescription,
      );
    this.GetText(1).SetText(e);
  }
  pmt() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel(),
      t = new Array(e);
    for (
      let e = 0;
      e < ModelManager_1.ModelManager.CookModel.SelectedCookerLevel;
      e++
    )
      t[e] = !0;
    this.$be.RebuildLayoutByDataNew(t);
  }
  jGt() {
    var e =
      ModelManager_1.ModelManager.CookModel.GetCookerInfo().TotalProficiencys;
    let t = "";
    (t =
      ModelManager_1.ModelManager.CookModel.SelectedCookerLevel ===
      ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel()
        ? "MAX"
        : e +
          "/" +
          ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
            ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
          )),
      this.GetText(2).SetText(t);
  }
  WGt() {
    var e =
        ModelManager_1.ModelManager.CookModel.GetCookerInfo().TotalProficiencys,
      t = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
        ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
      ),
      e = 1 < (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) ? 1 : e;
    this.GetSprite(3).SetFillAmount(e);
  }
  M3e() {
    this.lGe.SetEnable();
  }
  KGt() {
    this.OGt.length = 0;
    var e = ModelManager_1.ModelManager.CookModel.GetDropIdByLevel(
      ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
    );
    if (-1 === e) this.GetItem(8).SetUIActive(!1);
    else {
      this.GetItem(8).SetUIActive(!0);
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
      if (e)
        for (const r of e.DropPreview) {
          var t = ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
            i =
              ModelManager_1.ModelManager.CookModel.GetCookerInfo()
                .CookingLevel;
          this.OGt.push({ RewardId: r[0], Count: r[1], IsGet: t < i });
        }
      this.NGt.RefreshByData(this.OGt);
    }
  }
  QGt() {
    this.GetButton(5)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass())
      .SetUIActive(
        1 !== ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
      ),
      this.GetButton(6)
        .GetOwner()
        .GetComponentByClass(UE.UIItem.StaticClass())
        .SetUIActive(
          ModelManager_1.ModelManager.CookModel.SelectedCookerLevel !==
            ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel(),
        );
  }
  sqe() {
    this.GetItem(10).SetUIActive(
      ModelManager_1.ModelManager.CookModel.SelectedCookerLevel !==
        ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel(),
    );
  }
}
exports.CookLevelView = CookLevelView;
class ConfirmItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.JGt = void 0),
      (this.Mke = () => {
        this.JGt &&
          (this.GetButton(0).GetSelfInteractive()
            ? this.JGt()
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "CookUpgrade",
              ));
      });
  }
  async Initialize(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Mke]]);
  }
  OnStart() {
    this.GetButton(0).SetCanClickWhenDisable(!0);
  }
  ShowConfirmItem(e) {
    this.SetActive(e);
  }
  SetEnable() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel(),
      t = ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel,
      i = ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
      r = this.GetButton(0).GetOwner();
    e <= t || e <= i || i < t
      ? r.GetUIItem().SetUIActive(!1)
      : (r.GetUIItem().SetUIActive(!0),
        (e =
          ModelManager_1.ModelManager.CookModel.GetCookerInfo()
            .TotalProficiencys),
        (i = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
          ModelManager_1.ModelManager.CookModel.SelectedCookerLevel,
        )),
        this.GetButton(0).SetSelfInteractive(i <= e),
        this.GetItem(2).SetUIActive(i <= e));
  }
  GetRedDot() {
    return this.GetItem(2);
  }
  BindOnClickedCallback(e) {
    this.JGt = e;
  }
}
//# sourceMappingURL=CookLevelView.js.map
