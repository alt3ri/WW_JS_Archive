"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailComponent = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisionDetailDescComponent_1 = require("./VisionDetailDescComponent"),
  VisionDetailInfoComponent_1 = require("./VisionDetailInfoComponent"),
  VisionDetailUnderComponent_1 = require("./VisionDetailUnderComponent");
class VisionDetailComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.H8i = !1),
      (this.dFe = 0),
      (this.i6 = 0),
      (this.j8i = void 0),
      (this.wqe = void 0),
      (this.W8i = void 0),
      (this.K8i = void 0),
      (this.OnClickMainItem = () => {}),
      (this.wqe = t);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.K8i = new VisionDetailInfoComponent_1.VisionDetailInfoComponent(
      this.GetItem(1),
    )),
      await this.K8i.Init();
  }
  OnStart() {
    (this.W8i = new VisionDetailUnderComponent_1.VisionDetailUnderComponent(
      this.GetItem(0),
    )),
      this.K8i.SetClickCallBack(this.OnClickMainItem);
  }
  GetTxtItemByIndex(t) {
    return this.K8i?.GetTxtItemByIndex(t);
  }
  SetUnderLeftButtonText(t) {
    this.W8i.RefreshLeftButtonText(t);
  }
  Update(t, e, i, s = !1) {
    (this.j8i = t),
      (this.dFe = e),
      (this.i6 = i),
      (this.H8i = s),
      this.Q8i(),
      this.W8i.Update(t);
  }
  Q8i() {
    var t = this.H8i ? 1 : 0,
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(t);
    const e = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
    (e.DataBase = this.j8i), (e.RoleId = this.dFe), (e.Cost = this.i6);
    let i = -1;
    this.H8i ||
      (i =
        ModelManager_1.ModelManager.PhantomBattleModel
          .CurrentEquipmentSelectIndex);
    var s = this.j8i.GetPreviewShowFetterList(i, this.dFe),
      n = this.j8i.IfEquipSameNameMonsterOnRole(i, this.dFe, this.j8i);
    let o = !1;
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe)
      .GetPhantomData()
      .GetDataByIndex(0);
    (r && r?.GetIncrId() === this.j8i.GetUniqueId()) || (o = !0),
      VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
        this.j8i.GetNormalSkillConfig(),
        this.j8i.GetPhantomLevel(),
        0 === i || -1 === i,
        o,
        this.j8i.GetQuality(),
      ).forEach((t) => {
        e.AddDescData(t);
      }),
      VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
        s,
        n,
        () => {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(
            this.j8i.GetFetterGroupId(),
            this.dFe,
          );
        },
      ).forEach((t) => {
        e.AddDescData(t);
      }),
      this.H8i &&
        e.DescData?.forEach((t) => {
          (t.AnimationState = !1), (t.CompareState = this.H8i);
        }),
      n &&
        VisionDetailDescComponent_1.VisionDetailDesc.CreateSameMonsterTips().forEach(
          (t) => {
            e.AddDescData(t);
          },
        ),
      this.K8i.Refresh(e, this.H8i, t),
      this.K8i.SetActive(!0);
  }
  SetButtonPanelShowState(t) {
    this.W8i.SetActive(t);
  }
  RefreshViewByCompareState(t) {
    this.W8i.RefreshViewByCompareState(t);
  }
  GetDetailUnderComponent() {
    return this.W8i;
  }
}
exports.VisionDetailComponent = VisionDetailComponent;
//# sourceMappingURL=VisionDetailComponent.js.map
