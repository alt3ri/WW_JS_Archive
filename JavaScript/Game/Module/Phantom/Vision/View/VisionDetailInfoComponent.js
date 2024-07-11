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
      (this.u8i = void 0),
      (this.Y6i = void 0),
      (this.c8i = void 0),
      (this.m8i = void 0),
      (this.d8i = void 0),
      (this.C8i = void 0),
      (this.wqe = void 0),
      (this.OnClickArrow = () => {
        this.C8i?.();
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
    (this.d8i = new VisionDetailDescComponent_1.VisionDetailDescComponent(
      this.GetItem(3),
    )),
      await this.d8i.Init(),
      (this.u8i = new VisionDetailTop(this.GetItem(0))),
      await this.u8i.Init(),
      (this.m8i =
        new RoleVisionIdentifyAttribute_1.RoleVisionIdentifyAttribute()),
      await this.m8i.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    (this.c8i = new RoleVisionAttribute_1.RoleVisionAttribute(this.GetItem(1))),
      this.c8i.Init();
  }
  SetClickCallBack(i) {
    this.C8i = i;
  }
  Refresh(i, t, e) {
    (this.Y6i = i),
      this.u8i.Update(this.Y6i.DataBase),
      this.u8i.SetActive(!0),
      this.g8i(),
      this.f8i(),
      this.p8i();
  }
  GetTxtItemByIndex(i) {
    return this.d8i?.GetTxtItemByIndex(i);
  }
  p8i() {
    this.d8i.Refresh(this.Y6i.DescData), this.d8i.SetActive(!0);
  }
  g8i() {
    this.c8i.Refresh(this.Y6i.GetMainPropData());
  }
  f8i() {
    var i = this.Y6i.GetSubPropData();
    0 < i.length
      ? (this.m8i.Refresh(i, this.Y6i?.DataBase), this.m8i.SetActive(!0))
      : this.m8i.SetActive(!1);
  }
}
exports.VisionDetailInfoComponent = VisionDetailInfoComponent;
class VisionDetailTop extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.Y6i = void 0),
      (this.v8i = void 0),
      (this.wqe = void 0),
      (this.PPt = void 0),
      (this.OnClickLockToggle = () => {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
          this.Y6i.GetUniqueId(),
          !this.Y6i.GetIfLock(),
        );
      }),
      (this.IPt = (i, t) => {
        this.Y6i?.GetUniqueId() === i &&
          ((i = t ? 0 : 1), this.GetExtendToggle(1).SetToggleState(i, !1));
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
    ]),
      (this.BtnBindInfo = [[1, this.OnClickLockToggle]]);
  }
  async OnBeforeStartAsync() {
    (this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(5),
    )),
      await this.PPt.Init(),
      this.PPt.SetActive(!0);
  }
  OnStart() {
    (this.v8i = new VisionNameText_1.VisionNameText(this.GetText(0))),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemLock,
        this.IPt,
      );
  }
  Update(i) {
    (this.Y6i = i),
      this.v8i.Update(i),
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
      t = (this.IPt(t.GetUniqueId(), t.GetIsLock()), i.GetFetterGroupConfig());
    this.PPt.Update(t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemLock,
      this.IPt,
    );
  }
}
//# sourceMappingURL=VisionDetailInfoComponent.js.map
