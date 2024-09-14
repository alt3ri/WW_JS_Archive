"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskInstanceDetailView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class MowingRiskInstanceDetailView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.nvt = void 0),
      (this.J6a = void 0),
      (this.Vja = void 0),
      (this.fuo = void 0),
      (this.Z6a = () => {
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .SelectInstanceId,
        );
      }),
      (this.mvt = () => new MowingRiskInstanceDetailAttributeGridItem()),
      (this.qLn = () => {}),
      (this.GLn = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnClickEnterInstanceSingle,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIVerticalLayout],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [[4, this.Z6a]]);
  }
  async OnBeforeStartAsync() {
    (this.nvt = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(5),
      this.mvt,
    )),
      (this.J6a = new ButtonItem_1.ButtonItem(this.GetItem(7))),
      (this.Vja = new ButtonItem_1.ButtonItem(this.GetItem(8))),
      this.J6a.SetFunction(this.qLn),
      this.Vja.SetFunction(this.GLn),
      this.Vja.SetLocalTextNew("PrefabTextItem_2770983895_Text");
    var t = new MowingRiskInstanceDetailLockItem();
    await t.CreateByActorAsync(this.GetItem(9).GetOwner()),
      (this.fuo = t),
      this.GetText(11)?.SetUIActive(!1);
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(!1), this.GetItem(7)?.SetUIActive(!1);
  }
  NFe(t) {
    t
      ? (this.Vja.SetUiActive(!1),
        this.fuo.SetUiActive(!0),
        this.fuo.RefreshExternalByData(t))
      : (this.Vja.SetUiActive(!0), this.fuo.SetUiActive(!1));
  }
  async RefreshExternalByDataAsync(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TitleTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.ContentTextId),
      await this.nvt.RefreshByDataAsync(t.AttributeList),
      this.NFe(t.LockData);
  }
  RefreshLockItemExternalByData(t) {
    this.NFe(t);
  }
}
exports.MowingRiskInstanceDetailView = MowingRiskInstanceDetailView;
class MowingRiskInstanceDetailAttributeGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(t, e, i) {
    var s = this.GetTexture(0),
      s =
        (t.IconPath
          ? (s?.SetUIActive(!0), this.SetTextureByPath(t.IconPath, s))
          : s?.SetUIActive(!1),
        this.GetText(1));
    t.AttributeTextId
      ? (s?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, t.AttributeTextId))
      : s?.SetUIActive(!1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
}
class MowingRiskInstanceDetailLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ];
  }
  RefreshExternalByData(t) {
    var e = this.GetText(1);
    t.LockDescriptionTextId
      ? (e?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          t.LockDescriptionTextId,
          t.LockDescriptionTextArgs,
        ))
      : e?.SetUIActive(!1);
  }
}
//# sourceMappingURL=MowingRiskInstanceDetailView.js.map
