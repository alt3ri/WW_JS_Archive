"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailComponent = void 0);
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionDetailDescComponent_1 = require("./VisionDetailDescComponent");
const VisionDetailInfoComponent_1 = require("./VisionDetailInfoComponent");
const VisionDetailUnderComponent_1 = require("./VisionDetailUnderComponent");
class VisionDetailComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.j6i = !1),
      (this.zke = 0),
      (this.W6i = void 0),
      (this.wqe = void 0),
      (this.K6i = void 0),
      (this.Q6i = void 0),
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
    (this.Q6i = new VisionDetailInfoComponent_1.VisionDetailInfoComponent(
      this.GetItem(1),
    )),
      await this.Q6i.Init();
  }
  OnStart() {
    (this.K6i = new VisionDetailUnderComponent_1.VisionDetailUnderComponent(
      this.GetItem(0),
    )),
      this.Q6i.SetClickCallBack(this.OnClickMainItem);
  }
  GetTxtItemByIndex(e) {
    return this.Q6i?.GetTxtItemByIndex(e);
  }
  SetUnderLeftButtonText(e) {
    this.K6i.RefreshLeftButtonText(e);
  }
  Update(e, t, i = !1) {
    (this.W6i = e),
      (this.zke = t),
      (this.j6i = i),
      this.X6i(),
      this.K6i.Update(e);
  }
  X6i() {
    var e = this.j6i ? 1 : 0;
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(e);
    const t = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
    t.DataBase = this.W6i;
    let i = -1;
    this.j6i ||
      (i =
        ModelManager_1.ModelManager.PhantomBattleModel
          .CurrentEquipmentSelectIndex);
    const s = this.W6i.GetPreviewShowFetterList(i, this.zke);
    const n = this.W6i.IfEquipSameNameMonsterOnRole(i, this.zke, this.W6i);
    let o = !1;
    const r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.zke,
    )
      .GetPhantomData()
      .GetDataByIndex(0);
    (r && r?.GetIncrId() === this.W6i.GetUniqueId()) || (o = !0),
      VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
        this.W6i.GetNormalSkillConfig(),
        this.W6i.GetPhantomLevel(),
        i === 0 || i === -1,
        o,
        this.W6i.GetQuality(),
      ).forEach((e) => {
        t.AddDescData(e);
      }),
      VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
        s,
        n,
        () => {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(
            this.W6i.GetFetterGroupId(),
          );
        },
      ).forEach((e) => {
        t.AddDescData(e);
      }),
      this.j6i &&
        t.DescData?.forEach((e) => {
          (e.AnimationState = !1), (e.CompareState = this.j6i);
        }),
      n &&
        VisionDetailDescComponent_1.VisionDetailDesc.CreateSameMonsterTips().forEach(
          (e) => {
            t.AddDescData(e);
          },
        ),
      this.Q6i.Refresh(t, this.j6i, e),
      this.Q6i.SetActive(!0);
  }
  SetButtonPanelShowState(e) {
    this.K6i.SetActive(e);
  }
  RefreshViewByCompareState(e) {
    this.K6i.RefreshViewByCompareState(e);
  }
  GetDetailUnderComponent() {
    return this.K6i;
  }
}
exports.VisionDetailComponent = VisionDetailComponent;
// # sourceMappingURL=VisionDetailComponent.js.map
