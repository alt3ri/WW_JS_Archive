"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardPopView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  CommonManager_1 = require("./CommonManager");
class RewardPopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.KIi = void 0),
      (this.ZGt = void 0),
      (this.E9 = 0),
      (this.InitCommonPopItem = (e, t, i) => {
        t = new RewardPopItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.m2e = () => {
        this.eNt();
      }),
      (this.Jke = () => {
        this.eNt();
      }),
      (this.Mke = () => {
        CommonManager_1.CommonManager.SendFixToolRequest(), this.eNt();
      }),
      (this.tNt = () => {
        this.eNt();
      }),
      (this.iNt = () => {
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
        [5, this.Jke],
        [6, this.Mke],
        [8, this.tNt],
        [9, this.iNt],
      ]);
  }
  OnStart() {
    var e = this.OpenParam,
      e =
        ((this.E9 = e.RewardPopType),
        (this.KIi = new GenericScrollView_1.GenericScrollView(
          this.GetScrollViewWithScrollbar(1),
          this.InitCommonPopItem,
        )),
        this.GetItem(2).SetUIActive(0 === this.E9 || 3 === this.E9),
        this.GetItem(4).SetUIActive(0 === this.E9),
        1 === this.E9 || CommonManager_1.CommonManager.CheckCanShowExpItem());
    this.GetItem(7).SetUIActive(e),
      e && (this.ZGt = new ExpItem(this.GetItem(7))),
      this.GetButton(8)
        .GetOwner()
        .GetUIItem()
        .SetUIActive(0 !== this.E9);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FixSuccess,
      this.m2e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FixSuccess,
      this.m2e,
    );
  }
  OnBeforeDestroy() {
    this.KIi && (this.KIi.ClearChildren(), (this.KIi = void 0)),
      this.ZGt && (this.ZGt.Destroy(), (this.ZGt = void 0));
  }
  OnAfterShow() {
    switch ((this.RDt(), this.oNt(), this.E9)) {
      case 0:
        this.rNt(), this.nNt();
        break;
      case 1:
        this.sNt();
        break;
      case 3:
        this.rNt();
        break;
      case 2:
        break;
      case 4:
        CommonManager_1.CommonManager.CheckCanShowExpItem() && this.sNt();
    }
  }
  RDt() {
    switch (this.E9) {
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
  oNt() {
    if (0 === this.E9) {
      var e = new Array();
      for (const i of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
        CommonManager_1.CommonManager.GetCurrentFixId(),
      ).Items) {
        var t =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            i[0],
          );
        e.push({ ItemId: i[0], ItemNum: t });
      }
      this.KIi.RefreshByData(e);
    } else
      this.KIi.RefreshByData(CommonManager_1.CommonManager.GetCommonItemList());
  }
  rNt() {
    if (0 === this.E9) {
      var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
          CommonManager_1.CommonManager.GetCurrentFixId(),
        ),
        s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
          i.Description,
        );
      let e = 0,
        t = "";
      for (const a of i.Items) {
        e = a[1];
        var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a[0]);
        t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(r.Name);
      }
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FixText", e, t, s);
    } else
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "MaciningStudyFail");
  }
  sNt() {
    var e = CommonManager_1.CommonManager.GetSumExpByLevel(
        CommonManager_1.CommonManager.GetCurrentRewardLevel(),
      ),
      t = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
    this.ZGt.SetExpSprite(t, e),
      this.ZGt.SetAddText(
        CommonManager_1.CommonManager.GetCurrentRewardAddExp(),
      ),
      this.ZGt.SetLastText(t),
      this.ZGt.SetSumText(e);
  }
  nNt() {
    var e = this.GetButton(6)
        .GetOwner()
        .GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
      t = CommonManager_1.CommonManager.CheckCanFix();
    e.SetInteractable(t),
      this.GetButton(9).GetOwner().GetUIItem().SetUIActive(!t);
  }
  eNt() {
    switch (this.E9) {
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
      (this.fGt = void 0),
      (this.eTt = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.fGt.ItemId,
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
      (this.BtnBindInfo = [[9, this.eTt]]);
  }
  Update(e) {
    (this.fGt = e), this.Ost(), this.dwt(), this.VTt();
  }
  Ost() {
    this.SetItemIcon(this.GetTexture(4), this.fGt.ItemId);
  }
  dwt() {
    this.SetItemQualityIcon(this.GetSprite(5), this.fGt.ItemId);
  }
  VTt() {
    this.GetText(8).SetText(this.fGt.ItemNum.toString());
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
    e = 1 < (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) ? 1 : e;
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
//# sourceMappingURL=RewardPopView.js.map
