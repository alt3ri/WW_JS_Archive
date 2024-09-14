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
    (this.DataBase = void 0), (this.DescData = void 0);
  }
  GetMainPropData() {
    return this.DataBase.GetMainPropShowAttributeList(1);
  }
  GetSubPropData() {
    return this.DataBase.GetEquipmentViewPreviewData();
  }
  AddDescData(i) {
    void 0 === this.DescData && (this.DescData = new Array()),
      this.DescData.push(i);
  }
}
exports.VisionDetailInfoComponentData = VisionDetailInfoComponentData;
class VisionDetailInfoComponent extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
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
      (this.wqe = i);
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
  SetClickCallBack(i) {
    this.d9i = i;
  }
  Refresh(i, t, e) {
    (this.$8i = i),
      this._9i.Update(this.$8i.DataBase),
      this._9i.SetActive(!0),
      this.C9i(),
      this.g9i(),
      this.f9i();
  }
  GetTxtItemByIndex(i) {
    return this.m9i?.GetTxtItemByIndex(i);
  }
  f9i() {
    this.m9i.Refresh(this.$8i.DescData), this.m9i.SetActive(!0);
  }
  C9i() {
    this.u9i.Refresh(this.$8i.GetMainPropData());
  }
  g9i() {
    var i = this.$8i.GetSubPropData();
    0 < i.length
      ? (this.c9i.Refresh(i, this.$8i?.DataBase), this.c9i.SetActive(!0))
      : this.c9i.SetActive(!1);
  }
}
exports.VisionDetailInfoComponent = VisionDetailInfoComponent;
class VisionDetailTop extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
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
      (this.TNa = (i) => {
        var t;
        this.$8i?.GetUniqueId() === i &&
          void 0 !==
            (i =
              ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
                i,
              )) &&
          ((t = i.GetIsLock() ? 0 : 1),
          this.GetExtendToggle(1).SetToggleState(t, !1),
          (t = i.GetIsDeprecated() ? 1 : 0),
          this.GetExtendToggle(6).SetToggleState(t, !1));
      }),
      (this.wqe = i);
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
        this.TNa,
      );
  }
  Update(i) {
    (this.$8i = i),
      this.p9i.Update(i),
      this.GetText(4).SetText(i.GetCost().toString()),
      this.GetText(2).SetText(
        StringUtils_1.StringUtils.Format(
          "+{0}",
          i.GetPhantomLevel().toString(),
        ),
      ),
      this.GetText(2).SetUIActive(!0);
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(
        i.GetUniqueId(),
      ),
      t = (this.TNa(t.GetUniqueId()), i.GetFetterGroupConfig());
    this.bxt.Update(t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.TNa,
    );
  }
}
//# sourceMappingURL=VisionDetailInfoComponent.js.map
