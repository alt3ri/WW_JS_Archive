"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailInfoComponent = exports.VisionDetailInfoComponentData =
    void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  RoleVisionAttribute_1 = require("../../../RoleUi/TabView/VisionSubView/RoleVisionAttribute"),
  RoleVisionIdentifyAttribute_1 = require("../../../RoleUi/TabView/VisionSubView/RoleVisionIdentifyAttribute"),
  VisionDetailDescComponent_1 = require("./VisionDetailDescComponent"),
  VisionFetterSuitItem_1 = require("./VisionFetterSuitItem"),
  VisionNameText_1 = require("./VisionNameText");
class VisionDetailInfoComponentData {
  constructor() {
    (this.RoleId = 0),
      (this.Cost = 0),
      (this.DataBase = void 0),
      (this.DescData = void 0);
  }
  GetMainPropData(t = !1) {
    return this.DataBase.GetMainPropShowAttributeList(1, t);
  }
  GetSubPropData() {
    return this.DataBase.GetEquipmentViewPreviewData();
  }
  AddDescData(t) {
    void 0 === this.DescData && (this.DescData = new Array()),
      this.DescData.push(t);
  }
}
exports.VisionDetailInfoComponentData = VisionDetailInfoComponentData;
class VisionDetailInfoComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this._9i = void 0),
      (this.$8i = void 0),
      (this.u9i = void 0),
      (this.c9i = void 0),
      (this.m9i = void 0),
      (this.d9i = void 0),
      (this.wqe = void 0),
      (this.OnClickArrow = () => {
        this.d9i?.();
      }),
      (this.wqe = t);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.m9i = new VisionDetailDescComponent_1.VisionDetailDescComponent(
      this.GetItem(3),
    )),
      await this.m9i.Init(),
      (this._9i = new VisionDetailTop(this.GetItem(0))),
      await this._9i.Init(),
      (this.c9i =
        new RoleVisionIdentifyAttribute_1.RoleVisionIdentifyAttribute()),
      await this.c9i.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    (this.u9i = new RoleVisionAttribute_1.RoleVisionAttribute(this.GetItem(1))),
      this.u9i.Init();
  }
  SetClickCallBack(t) {
    this.d9i = t;
  }
  Refresh(t, i, e) {
    (this.$8i = t),
      this._9i.Update(this.$8i.DataBase),
      this._9i.SetActive(!0),
      this.C9i(),
      this.g9i(),
      this.f9i();
  }
  GetTxtItemByIndex(t) {
    return this.m9i?.GetTxtItemByIndex(t);
  }
  f9i() {
    this.m9i.Refresh(this.$8i.DescData), this.m9i.SetActive(!0);
  }
  C9i() {
    var t =
        ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(
          this.$8i.RoleId,
          this.$8i.Cost,
        ),
      e = this.$8i.GetMainPropData(),
      s = this.$8i.GetMainPropData(!0),
      n = s.length,
      o = t?.GetMainAttrRecommendInfo();
    for (let i = 0; i < n; i++)
      if (t) {
        var r = o.length;
        for (let t = 0; t < r; t++)
          s[i].AddValue === o[t].GetAddType() &&
            s[i].Id === o[t].GetAttrId() &&
            (e[i].NeedHighLight = !0);
      }
    this.u9i.Refresh(e);
  }
  g9i() {
    var t = this.$8i.GetSubPropData();
    0 < t.length
      ? (this.c9i.Refresh(t, this.$8i?.DataBase, this.$8i),
        this.c9i.SetActive(!0))
      : this.c9i.SetActive(!1);
  }
}
exports.VisionDetailInfoComponent = VisionDetailInfoComponent;
class VisionDetailTop extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.$8i = void 0),
      (this.p9i = void 0),
      (this.wqe = void 0),
      (this.bxt = void 0),
      (this.OnClickLockToggle = () => {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
          this.$8i.GetUniqueId(),
          !this.$8i.GetIsLock(),
        );
      }),
      (this.OnClickDeprecateToggle = () => {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemDeprecateRequest(
          this.$8i.GetUniqueId(),
          !this.$8i.GetIsDeprecated(),
        );
      }),
      (this.R3a = (t) => {
        var i;
        this.$8i?.GetUniqueId() === t &&
          void 0 !==
            (t =
              ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
                t,
              )) &&
          ((i = t.GetIsLock() ? 0 : 1),
          this.GetExtendToggle(1).SetToggleState(i, !1),
          (i = t.GetIsDeprecated() ? 1 : 0),
          this.GetExtendToggle(6).SetToggleState(i, !1));
      }),
      (this.wqe = t);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnClickLockToggle],
        [6, this.OnClickDeprecateToggle],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(5),
    )),
      await this.bxt.Init(),
      this.bxt.SetActive(!0);
  }
  OnStart() {
    (this.p9i = new VisionNameText_1.VisionNameText(this.GetText(0))),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.R3a,
      );
  }
  Update(t) {
    (this.$8i = t),
      this.p9i.Update(t),
      this.GetText(4).SetText(t.GetCost().toString()),
      this.GetText(2).SetText(
        StringUtils_1.StringUtils.Format(
          "+{0}",
          t.GetPhantomLevel().toString(),
        ),
      ),
      this.GetText(2).SetUIActive(!0);
    var i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(
        t.GetUniqueId(),
      ),
      i = (this.R3a(i.GetUniqueId()), t.GetFetterGroupConfig());
    this.bxt.Update(i);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.R3a,
    );
  }
}
//# sourceMappingURL=VisionDetailInfoComponent.js.map
