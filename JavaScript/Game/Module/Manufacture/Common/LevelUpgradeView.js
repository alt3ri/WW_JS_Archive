"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpgradeView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ComposeDefine_1 = require("../Compose/ComposeDefine"),
  CommonManager_1 = require("./CommonManager");
class StarItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UISprite]]), (this.BtnBindInfo = []);
  }
  SetState(e) {
    e ? this.GetSprite(0).SetUIActive(!0) : this.GetSprite(0).SetUIActive(!1);
  }
}
class LevelRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, o) {
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
class LevelUpgradeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NGt = void 0),
      (this.OGt = void 0),
      (this.UOt = !0),
      (this.$be = void 0),
      (this.kGt = (e, t, o) => {
        var r = new StarItem();
        return (
          r.CreateThenShowByActor(t.GetOwner()),
          r.SetState(e),
          { Key: o, Value: r }
        );
      }),
      (this.FGt = () => {
        return new LevelRewardItem();
      }),
      (this.VGt = () => {
        0 !== this.OGt.length && this.Cl();
      }),
      (this.eTt = () => {
        this.GetButton(4).GetSelfInteractive()
          ? CommonManager_1.CommonManager.SendLevelRewardRequest()
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ComposeUpgrade",
            );
      }),
      (this.XGt = () => {
        CommonManager_1.CommonManager.SetSelectedLevel(
          CommonManager_1.CommonManager.GetSelectedLevel() - 1,
        ),
          this.bl();
      }),
      (this.$Gt = () => {
        CommonManager_1.CommonManager.SetSelectedLevel(
          CommonManager_1.CommonManager.GetSelectedLevel() + 1,
        ),
          this.bl();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIHorizontalLayout],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [11, UE.UIHorizontalLayout],
      [10, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.eTt],
        [5, this.XGt],
        [6, this.$Gt],
      ]);
  }
  OnBeforeDestroy() {
    this.NGt && (this.NGt.ClearChildren(), (this.NGt = void 0)),
      this.$be.ClearChildren();
  }
  OnBeforeShow() {
    this.M3e(), this.ChildPopView?.PopItem?.SetTexBgVisible(!1);
  }
  OnStart() {
    (this.NGt = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(7),
      this.FGt,
    )),
      (this.OGt = new Array()),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(12),
        "ComposeUpgradeButtonText",
      ),
      (this.$be = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(11),
        this.kGt,
      )),
      this.GetButton(4).SetCanClickWhenDisable(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SwitchViewType,
        1,
      ),
      this.UOt && (this.UOt = !1),
      CommonManager_1.CommonManager.SetSelectedLevel(
        CommonManager_1.CommonManager.GetCurrentRewardLevel(),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "ComposeReagentProduction",
        this.GetItem(13),
      ),
      this.bl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpgradeComposeLevel,
      this.VGt,
    );
  }
  OnRemoveEventListener() {
    this.UOt ||
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpgradeComposeLevel,
        this.VGt,
      );
  }
  Cl() {
    CommonManager_1.CommonManager.SetSelectedLevel(
      CommonManager_1.CommonManager.GetCurrentRewardLevel(),
    ),
      this.bl();
  }
  bl() {
    this.qIi(),
      this.P5e(),
      this.nOe(),
      this.pmt(),
      this.jGt(),
      this.WGt(),
      this.M3e(),
      this.KGt(),
      this.QGt(),
      this.sqe(),
      this.eVs();
  }
  qIi() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      ComposeDefine_1.COMPOSE_TYPE_TEXTURE_PATH_KEY,
    );
    this.SetTextureByPath(e, this.GetTexture(9));
  }
  P5e() {
    var e = CommonManager_1.CommonManager.GetComposeLevelByLevel(
        CommonManager_1.CommonManager.GetSelectedLevel(),
      ),
      e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(e.Name);
    this.GetText(0).SetText(e);
  }
  nOe() {
    var e = CommonManager_1.CommonManager.GetComposeLevelByLevel(
        CommonManager_1.CommonManager.GetSelectedLevel(),
      ),
      e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
        e.AttributesDescription,
      );
    this.GetText(1).SetText(e);
  }
  pmt() {
    var e = CommonManager_1.CommonManager.GetComposeMaxLevel(),
      t = new Array(e);
    for (let e = 0; e < CommonManager_1.CommonManager.GetSelectedLevel(); e++)
      t[e] = !0;
    this.$be.RebuildLayoutByDataNew(t);
  }
  jGt() {
    var e = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
    let t = "";
    (t =
      CommonManager_1.CommonManager.GetSelectedLevel() ===
      CommonManager_1.CommonManager.GetComposeMaxLevel()
        ? "MAX"
        : e +
          "/" +
          CommonManager_1.CommonManager.GetSumExpByLevel(
            CommonManager_1.CommonManager.GetSelectedLevel(),
          )),
      this.GetText(2).SetText(t);
  }
  WGt() {
    var e = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency(),
      t = CommonManager_1.CommonManager.GetSumExpByLevel(
        CommonManager_1.CommonManager.GetSelectedLevel(),
      ),
      e = 1 < (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) ? 1 : e;
    this.GetSprite(3).SetFillAmount(e);
  }
  M3e() {
    var e = CommonManager_1.CommonManager.GetComposeMaxLevel(),
      t = CommonManager_1.CommonManager.GetCurrentRewardLevel(),
      o = CommonManager_1.CommonManager.GetSelectedLevel(),
      r = this.GetButton(4).GetOwner();
    r.GetUIItem().SetUIActive(!0),
      e <= t || e <= o || o < t
        ? r.GetUIItem().SetUIActive(!1)
        : ((o =
            CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency()),
          (r = CommonManager_1.CommonManager.GetSumExpByLevel(
            CommonManager_1.CommonManager.GetSelectedLevel(),
          )),
          this.GetButton(4).SetSelfInteractive(r <= o && t < e));
  }
  KGt() {
    this.OGt.length = 0;
    var e = CommonManager_1.CommonManager.GetDropIdByLevel(
      CommonManager_1.CommonManager.GetSelectedLevel(),
    );
    if (-1 === e) this.GetItem(8).SetUIActive(!1);
    else {
      this.GetItem(8).SetUIActive(!0);
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
      if (e)
        for (const t of e.DropPreview)
          this.OGt.push({
            RewardId: t[0],
            Count: t[1],
            IsGet:
              CommonManager_1.CommonManager.GetSelectedLevel() <
              CommonManager_1.CommonManager.GetCurrentRewardLevel(),
          });
      this.NGt.RefreshByData(this.OGt);
    }
  }
  QGt() {
    this.GetButton(5)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass())
      .SetUIActive(1 !== CommonManager_1.CommonManager.GetSelectedLevel()),
      this.GetButton(6)
        .GetOwner()
        .GetComponentByClass(UE.UIItem.StaticClass())
        .SetUIActive(
          CommonManager_1.CommonManager.GetSelectedLevel() !==
            CommonManager_1.CommonManager.GetComposeMaxLevel(),
        );
  }
  sqe() {
    this.GetItem(10).SetUIActive(
      CommonManager_1.CommonManager.GetSelectedLevel() !==
        CommonManager_1.CommonManager.GetComposeMaxLevel(),
    );
  }
  eVs() {
    CommonManager_1.CommonManager.GetCurrentRewardLevel() ===
    CommonManager_1.CommonManager.GetSelectedLevel()
      ? RedDotController_1.RedDotController.BindRedDot(
          "ComposeReagentProduction",
          this.GetItem(13),
        )
      : (RedDotController_1.RedDotController.UnBindGivenUi(
          "ComposeReagentProduction",
          this.GetItem(13),
        ),
        this.GetItem(13)?.SetUIActive(!1));
  }
}
exports.LevelUpgradeView = LevelUpgradeView;
//# sourceMappingURL=LevelUpgradeView.js.map
