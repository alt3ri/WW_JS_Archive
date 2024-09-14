"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskBranchLineModule = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ConfirmBoxController_1 = require("../../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  MoonChasingController_1 = require("../MoonChasingController");
class BranchLineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.TAn = () => {
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
          this.Pe.TaskId,
        );
        0 === e
          ? this.Hpa(this.Pe.JumpBuildingId)
          : 1 === e
            ? ControllerHolder_1.ControllerHolder.QuestNewController.TryTrackAndOpenWorldMap(
                this.Pe.TaskId,
              )
            : 2 === e &&
              UiManager_1.UiManager.OpenView("QuestView", this.Pe.TaskId),
          ModelManager_1.ModelManager.MoonChasingModel.ReadQuestIdUnlockFlag(
            this.Pe.TaskId,
          ) && this.BNe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [4, UE.UIItem],
      [3, UE.UIButtonComponent],
      [5, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[3, this.TAn]]);
  }
  OnBeforeShow() {
    this.BNe();
  }
  Hpa(e) {
    if (
      3 ===
      ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Pe.TaskId)
    )
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
        "MoonChasingTaskJumpToBuildingFinish",
      );
    else if (e <= 0) {
      const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(204);
      void ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r);
    } else {
      const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(198);
      var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(e),
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
      r.SetTextArgs(i),
        r.FunctionMap.set(2, () => {
          MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(
            e,
          );
        }),
        ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  }
  P5e() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(
      this.Pe.TaskId,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TidName);
  }
  _Oe() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      this.Pe.TaskId,
    );
    this.GetItem(2).SetUIActive(0 === e),
      0 === e
        ? this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"))
        : this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF")),
      this.GetItem(1).SetUIActive(3 === e);
  }
  Aqe() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
      this.Pe.AssociateRole,
    );
    this.SetTextureByPath(e.HeadIcon, this.GetTexture(5));
  }
  BNe() {
    var e;
    this.Pe &&
      ((e =
        ModelManager_1.ModelManager.MoonChasingModel.CheckQuestIdRedDotState(
          this.Pe.TaskId,
        )),
      this.GetItem(4).SetUIActive(e));
  }
  Refresh(e, i, r) {
    (this.Pe = e), this._Oe(), this.Aqe(), this.P5e(), this.BNe();
  }
  GetKey(e, i) {
    return e.Id;
  }
}
class TaskBranchLineModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.qUt = void 0),
      (this.hMa = 0),
      (this.tue = []),
      (this.Lbt = !0),
      (this.DAn = () => new BranchLineItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.DAn,
      this.GetItem(1).GetOwner(),
    );
    var e = ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask();
    (this.tue = [...e]),
      await this.qUt.RefreshByDataAsync(
        this.tue.sort((e, i) => {
          var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
              e.TaskId,
            ),
            t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
              i.TaskId,
            );
          return 2 === r && 2 !== t
            ? -1
            : 2 !== r && 2 === t
              ? 1
              : 0 === r && 0 !== t
                ? -1
                : 0 !== r && 0 === t
                  ? 1
                  : e.TaskId - i.TaskId;
        }),
      );
  }
  OnBeforeShow() {
    this.qUt.BindLateUpdate((e) => {
      this.Lbt
        ? (this.Lbt = !1)
        : (0 !== this.hMa && this.qUt.ScrollToLeft(this.hMa),
          this.qUt.UnBindLateUpdate());
    });
  }
  SetSelectTaskId(e) {
    this.hMa = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (void 0 !== this.qUt) {
      let i = void 0;
      if (1 < e.length) {
        let e = -1;
        var r, t;
        for ([
          r,
          t,
        ] of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask().entries())
          if (
            1 ===
            ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.TaskId)
          ) {
            e = r;
            break;
          }
        if (e < 0) return;
        i = this.qUt.GetScrollItemByIndex(e);
      } else i = this.qUt.GetScrollItemByIndex(0);
      if (void 0 !== i) return [(e = i.GetRootItem()), e];
    }
  }
}
exports.TaskBranchLineModule = TaskBranchLineModule;
//# sourceMappingURL=TaskBranchLineModule.js.map
