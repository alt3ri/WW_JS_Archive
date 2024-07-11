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
  constructor(e) {
    super(),
      (this.H8i = !1),
      (this.dFe = 0),
      (this.j8i = void 0),
      (this.wqe = void 0),
      (this.W8i = void 0),
      (this.K8i = void 0),
      (this.OnClickMainItem = () => {}),
      (this.wqe = e);
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
  GetTxtItemByIndex(e) {
    return this.K8i?.GetTxtItemByIndex(e);
  }
  SetUnderLeftButtonText(e) {
    this.W8i.RefreshLeftButtonText(e);
  }
  Update(e, t, i = !1) {
    (this.j8i = e),
      (this.dFe = t),
      (this.H8i = i),
      this.Q8i(),
      this.W8i.Update(e);
  }
  Q8i() {
    var e = this.H8i ? 1 : 0,
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(e);
    const t = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
    t.DataBase = this.j8i;
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
      ).forEach((e) => {
        t.AddDescData(e);
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
      ).forEach((e) => {
        t.AddDescData(e);
      }),
      this.H8i &&
        t.DescData?.forEach((e) => {
          (e.AnimationState = !1), (e.CompareState = this.H8i);
        }),
      n &&
        VisionDetailDescComponent_1.VisionDetailDesc.CreateSameMonsterTips().forEach(
          (e) => {
            t.AddDescData(e);
          },
        ),
      this.K8i.Refresh(t, this.H8i, e),
      this.K8i.SetActive(!0);
  }
  SetButtonPanelShowState(e) {
    this.W8i.SetActive(e);
  }
  RefreshViewByCompareState(e) {
    this.W8i.RefreshViewByCompareState(e);
  }
  GetDetailUnderComponent() {
    return this.W8i;
  }
}
exports.VisionDetailComponent = VisionDetailComponent;
//# sourceMappingURL=VisionDetailComponent.js.map
