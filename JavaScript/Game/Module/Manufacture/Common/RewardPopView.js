"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardPopView = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const CommonManager_1 = require("./CommonManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RewardPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Kyi = void 0),
      (this.Yqt = void 0),
      (this.S9 = 0),
      (this.InitCommonPopItem = (e, t, i) => {
        t = new RewardPopItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.mIt = () => {
        this.Jqt();
      }),
      (this.zqt = () => {
        this.Jqt();
      }),
      (this.dIt = () => {
        CommonManager_1.CommonManager.SendFixToolRequest(), this.Jqt();
      }),
      (this.Zqt = () => {
        this.Jqt();
      }),
      (this.eGt = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "MaterialShort",
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [5, this.zqt],
        [6, this.dIt],
        [8, this.Zqt],
        [9, this.eGt],
      ]);
  }
  OnStart() {
    var e = this.OpenParam;
    var e =
      ((this.S9 = e.RewardPopType),
      (this.Kyi = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(1),
        this.InitCommonPopItem,
      )),
      this.GetItem(2).SetUIActive(this.S9 === 0 || this.S9 === 3),
      this.GetItem(4).SetUIActive(this.S9 === 0),
      this.S9 === 1 || CommonManager_1.CommonManager.CheckCanShowExpItem());
    this.GetItem(7).SetUIActive(e),
      e && (this.Yqt = new ExpItem(this.GetItem(7))),
      this.GetButton(8)
        .GetOwner()
        .GetUIItem()
        .SetUIActive(this.S9 !== 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FixSuccess,
      this.mIt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FixSuccess,
      this.mIt,
    );
  }
  OnBeforeDestroy() {
    this.Kyi && (this.Kyi.ClearChildren(), (this.Kyi = void 0)),
      this.Yqt && (this.Yqt.Destroy(), (this.Yqt = void 0));
  }
  OnAfterShow() {
    switch ((this.ILt(), this.tGt(), this.S9)) {
      case 0:
        this.iGt(), this.oGt();
        break;
      case 1:
        this.rGt();
        break;
      case 3:
        this.iGt();
        break;
      case 2:
        break;
      case 4:
        CommonManager_1.CommonManager.CheckCanShowExpItem() && this.rGt();
    }
  }
  ILt() {
    switch (this.S9) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "UnlockTitle");
        break;
      case 1:
      case 2:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "GetItem");
        break;
      case 3:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "StudyFail");
        break;
      case 4:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ComposeSuccess");
        break;
      case 5:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ForgingSuccess");
    }
  }
  tGt() {
    if (this.S9 === 0) {
      const e = new Array();
      for (const i of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
        CommonManager_1.CommonManager.GetCurrentFixId(),
      ).Items) {
        const t =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            i[0],
          );
        e.push({ ItemId: i[0], ItemNum: t });
      }
      this.Kyi.RefreshByData(e);
    } else
      this.Kyi.RefreshByData(CommonManager_1.CommonManager.GetCommonItemList());
  }
  iGt() {
    if (this.S9 === 0) {
      const i = ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
        CommonManager_1.CommonManager.GetCurrentFixId(),
      );
      const s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
        i.Description,
      );
      let e = 0;
      let t = "";
      for (const a of i.Items) {
        e = a[1];
        const r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a[0]);
        t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(r.Name);
      }
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FixText", e, t, s);
    } else
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "MaciningStudyFail");
  }
  rGt() {
    const e = CommonManager_1.CommonManager.GetSumExpByLevel(
      CommonManager_1.CommonManager.GetCurrentRewardLevel(),
    );
    const t = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
    this.Yqt.SetExpSprite(t, e),
      this.Yqt.SetAddText(
        CommonManager_1.CommonManager.GetCurrentRewardAddExp(),
      ),
      this.Yqt.SetLastText(t),
      this.Yqt.SetSumText(e);
  }
  oGt() {
    const e = this.GetButton(6)
      .GetOwner()
      .GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    const t = CommonManager_1.CommonManager.CheckCanFix();
    e.SetInteractable(t),
      this.GetButton(9).GetOwner().GetUIItem().SetUIActive(!t);
  }
  Jqt() {
    switch (this.S9) {
      case 0:
        UiManager_1.UiManager.CloseView("CookPopFixView");
        break;
      case 4:
      case 5:
        UiManager_1.UiManager.CloseView("RewardPopView");
        break;
      default:
        UiManager_1.UiManager.CloseView("CookPopView");
    }
  }
}
exports.RewardPopView = RewardPopView;
class RewardPopItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.dqt = void 0),
      (this.Kyt = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.dqt.ItemId,
        );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [4, UE.UITexture],
      [5, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.Kyt]]);
  }
  Update(e) {
    (this.dqt = e), this.Dnt(), this._xt(), this.GIt();
  }
  Dnt() {
    this.SetItemIcon(this.GetTexture(4), this.dqt.ItemId);
  }
  _xt() {
    this.SetItemQualityIcon(this.GetSprite(5), this.dqt.ItemId);
  }
  GIt() {
    this.GetText(8).SetText(this.dqt.ItemNum.toString());
  }
}
class ExpItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  SetExpSprite(e, t) {
    e = (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) > 1 ? 1 : e;
    this.GetSprite(0).SetFillAmount(e);
  }
  SetAddText(e) {
    this.GetText(1).SetText(e.toString());
  }
  SetLastText(e) {
    this.GetText(2).SetText(e.toString());
  }
  SetSumText(e) {
    this.GetText(3).SetText(e.toString());
  }
}
// # sourceMappingURL=RewardPopView.js.map
