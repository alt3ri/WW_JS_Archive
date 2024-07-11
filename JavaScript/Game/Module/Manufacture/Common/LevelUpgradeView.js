"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpgradeView = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ComposeDefine_1 = require("../Compose/ComposeDefine");
const CommonManager_1 = require("./CommonManager");
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
      BottomText: e.Count > 0 ? "" + e.Count : "",
      IsReceivedVisible: e.IsGet,
    };
    this.Apply(e);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    const e = this.Data;
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      e.RewardId,
    );
  }
}
class LevelUpgradeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.bqt = void 0),
      (this.qqt = void 0),
      (this.RNt = !0),
      (this.$be = void 0),
      (this.Gqt = (e, t, o) => {
        const r = new StarItem();
        return (
          r.CreateThenShowByActor(t.GetOwner()),
          r.SetState(e),
          { Key: o, Value: r }
        );
      }),
      (this.Nqt = () => {
        return new LevelRewardItem();
      }),
      (this.Oqt = () => {
        this.qqt.length !== 0 && this.Cl();
      }),
      (this.Kyt = () => {
        this.GetButton(4).GetSelfInteractive()
          ? CommonManager_1.CommonManager.SendLevelRewardRequest()
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ComposeUpgrade",
            );
      }),
      (this.Wqt = () => {
        CommonManager_1.CommonManager.SetSelectedLevel(
          CommonManager_1.CommonManager.GetSelectedLevel() - 1,
        ),
          this.bl();
      }),
      (this.Kqt = () => {
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
        [4, this.Kyt],
        [5, this.Wqt],
        [6, this.Kqt],
      ]);
  }
  OnBeforeDestroy() {
    this.bqt && (this.bqt.ClearChildren(), (this.bqt = void 0)),
      this.$be.ClearChildren();
  }
  OnBeforeShow() {
    this.rFe(), this.ChildPopView?.PopItem?.SetTexBgVisible(!1);
  }
  OnStart() {
    (this.bqt = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(7),
      this.Nqt,
    )),
      (this.qqt = new Array()),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(12),
        "ComposeUpgradeButtonText",
      ),
      (this.$be = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(11),
        this.Gqt,
      )),
      this.GetButton(4).SetCanClickWhenDisable(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SwitchViewType,
        1,
      ),
      this.RNt && (this.RNt = !1),
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
      this.Oqt,
    );
  }
  OnRemoveEventListener() {
    this.RNt ||
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpgradeComposeLevel,
        this.Oqt,
      );
  }
  Cl() {
    CommonManager_1.CommonManager.SetSelectedLevel(
      CommonManager_1.CommonManager.GetCurrentRewardLevel(),
    ),
      this.bl();
  }
  bl() {
    this.qyi(),
      this.C4e(),
      this.nOe(),
      this.sct(),
      this.Fqt(),
      this.Vqt(),
      this.rFe(),
      this.Hqt(),
      this.jqt(),
      this.sqe(),
      this.CFs();
  }
  qyi() {
    const e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      ComposeDefine_1.COMPOSE_TYPE_TEXTURE_PATH_KEY,
    );
    this.SetTextureByPath(e, this.GetTexture(9));
  }
  C4e() {
    var e = CommonManager_1.CommonManager.GetComposeLevelByLevel(
      CommonManager_1.CommonManager.GetSelectedLevel(),
    );
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(e.Name);
    this.GetText(0).SetText(e);
  }
  nOe() {
    var e = CommonManager_1.CommonManager.GetComposeLevelByLevel(
      CommonManager_1.CommonManager.GetSelectedLevel(),
    );
    var e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
      e.AttributesDescription,
    );
    this.GetText(1).SetText(e);
  }
  sct() {
    const e = CommonManager_1.CommonManager.GetComposeMaxLevel();
    const t = new Array(e);
    for (let e = 0; e < CommonManager_1.CommonManager.GetSelectedLevel(); e++)
      t[e] = !0;
    this.$be.RebuildLayoutByDataNew(t);
  }
  Fqt() {
    const e = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
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
  Vqt() {
    var e = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
    const t = CommonManager_1.CommonManager.GetSumExpByLevel(
      CommonManager_1.CommonManager.GetSelectedLevel(),
    );
    var e =
      (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) > 1 ? 1 : e;
    this.GetSprite(3).SetFillAmount(e);
  }
  rFe() {
    const e = CommonManager_1.CommonManager.GetComposeMaxLevel();
    const t = CommonManager_1.CommonManager.GetCurrentRewardLevel();
    let o = CommonManager_1.CommonManager.GetSelectedLevel();
    let r = this.GetButton(4).GetOwner();
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
  Hqt() {
    this.qqt.length = 0;
    let e = CommonManager_1.CommonManager.GetDropIdByLevel(
      CommonManager_1.CommonManager.GetSelectedLevel(),
    );
    if (e === -1) this.GetItem(8).SetUIActive(!1);
    else {
      this.GetItem(8).SetUIActive(!0);
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
      if (e)
        for (const t of e.DropPreview)
          this.qqt.push({
            RewardId: t[0],
            Count: t[1],
            IsGet:
              CommonManager_1.CommonManager.GetSelectedLevel() <
              CommonManager_1.CommonManager.GetCurrentRewardLevel(),
          });
      this.bqt.RefreshByData(this.qqt);
    }
  }
  jqt() {
    this.GetButton(5)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass())
      .SetUIActive(CommonManager_1.CommonManager.GetSelectedLevel() !== 1),
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
  CFs() {
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
// # sourceMappingURL=LevelUpgradeView.js.map
