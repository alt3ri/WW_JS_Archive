"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionInfoPanel = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  VisionDetailDescComponent_1 = require("../../../Phantom/Vision/View/VisionDetailDescComponent"),
  AttrListScrollData_1 = require("../../View/ViewData/AttrListScrollData"),
  RoleVisionAttribute_1 = require("./RoleVisionAttribute");
class RoleVisionInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.d1o = void 0),
      (this.u9i = void 0),
      (this.m9i = void 0),
      (this.FCo = void 0),
      (this.wqe = void 0),
      (this.wCo = !1),
      (this.VCo = () => {
        const e = this.d1o.GetCurSelectRoleData(),
          t = [0, 0, 0, 0, 0];
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(144);
        i.FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        }),
          i.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
              e.GetRoleId(),
              t,
            ),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
              UiManager_1.UiManager.CloseView("VisionRecommendView");
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.HCo = () => {
        var e = this.d1o.GetCurSelectRoleId();
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomRecommendRequest(
          e,
          this.jCo,
        );
      }),
      (this.jCo = () => {
        var e,
          t = this.d1o.GetCurSelectRoleData();
        ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIfEquipVision(
          t.GetRoleId(),
        )
          ? this.Qji()
          : ((e =
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetRecommendEquipUniqueIdList(
                t.GetRoleId(),
              )),
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
              t.GetRoleId(),
              e,
            ),
            UiManager_1.UiManager.CloseView("VisionRecommendView"));
      }),
      (this.D3e = () => {
        var e,
          t = this.d1o.GetCurSelectRoleData();
        t &&
          ((e = []),
          (e = ModelManager_1.ModelManager.PhantomBattleModel.GetExtraAttrList(
            t.GetDataId(),
          )),
          UiManager_1.UiManager.OpenView("RoleAttributeDetailView", e));
      }),
      (this.sOt = () => {
        this.FCo?.();
      }),
      (this.WCo = () => {
        this.Hqe();
      }),
      (this.wqe = e);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.D3e],
        [3, this.sOt],
        [4, this.VCo],
        [5, this.HCo],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.m9i = new VisionDetailDescComponent_1.VisionDetailDescComponent(
      this.GetItem(2),
    )),
      await this.m9i.Init();
  }
  OnStart() {
    this.m9i.SetActive(!0),
      (this.u9i = new RoleVisionAttribute_1.RoleVisionAttribute(
        this.GetItem(0),
      )),
      this.u9i.Init(),
      this.AddEventListener();
  }
  K8e() {
    var e;
    this.wCo ||
      ((this.wCo = !0),
      (e = this.d1o.GetCurSelectRoleId()),
      RedDotController_1.RedDotController.BindRedDot(
        "VisionOneKeyEquip",
        this.GetItem(6),
        void 0,
        e,
      ));
  }
  Ovt() {
    this.wCo &&
      ((this.wCo = !1),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "VisionOneKeyEquip",
        this.GetItem(6),
      ));
  }
  GetTxtItemByIndex(e) {
    return this.m9i?.GetTxtItemByIndex(e);
  }
  Qji() {
    const t = this.d1o.GetCurSelectRoleData();
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(96);
    e.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    }),
      e.FunctionMap.set(2, () => {
        var e =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetRecommendEquipUniqueIdList(
            t.GetRoleId(),
          );
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
            t.GetRoleId(),
            e,
          );
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  SetConfirmButtonCall(e) {
    this.FCo = e;
  }
  RefreshButtonShowState() {
    var e = this.d1o.GetCurSelectRoleData().IsTrialRole();
    this.RefreshConfirmButtonState(!e), this.RefreshOneKeyButtonState(!e);
  }
  RefreshConfirmButtonState(e) {
    this.GetButton(3).RootUIComp.SetUIActive(e);
  }
  RefreshOneKeyButtonState(e) {
    this.GetButton(5).RootUIComp.SetUIActive(e);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomEquip,
      this.WCo,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomEquip,
      this.WCo,
    );
  }
  RefreshView(e) {
    (this.d1o = e), this.Hqe();
  }
  Hqe() {
    this.fvt(),
      this.KCo(),
      this.QCo(),
      this.RefreshButtonShowState(),
      this.Ovt(),
      this.K8e();
  }
  fvt() {
    let i;
    var e = this.d1o.GetCurSelectRoleData();
    const o = (i =
      ModelManager_1.ModelManager.PhantomBattleModel.GetShowAttrList(
        e.GetDataId(),
      )).length;
    e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainViewShowAttribute",
    );
    const r = [];
    let n = !1;
    e.forEach((t) => {
      var e =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          t,
        );
      n = !1;
      for (let e = 0; e < o; e++)
        if (i[e].Id === t) {
          r.push(i[e]), (n = !0);
          break;
        }
      n ||
        r.push(
          new AttrListScrollData_1.AttrListScrollData(
            t,
            0,
            0,
            e.Priority,
            !1,
            1,
          ),
        );
    }),
      this.u9i.Refresh(r, !0);
  }
  KCo() {
    var e = this.d1o.GetCurSelectRoleData(),
      t = e.GetPhantomData().GetDataByIndex(0);
    const i = new Array();
    t
      ? VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(
          t.GetNormalSkillConfig(),
          t.GetPhantomLevel(),
          !0,
          !1,
          t.GetQuality(),
        ).forEach((e) => {
          i.push(e);
        })
      : VisionDetailDescComponent_1.VisionDetailDesc.CreateEmptySkillDescData().forEach(
          (e) => {
            i.push(e);
          },
        );
    t = e.GetPhantomData().GetPhantomFettersData();
    0 === t.length
      ? VisionDetailDescComponent_1.VisionDetailDesc.CreateEmptyFetterDescData().forEach(
          (e) => {
            i.push(e);
          },
        )
      : VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(
          t,
          !1,
        ).forEach((e) => {
          i.push(e);
        }),
      i.forEach((e) => {
        e.DoNotNeedCheckSimplyState = !0;
      }),
      this.m9i.Refresh(i);
  }
  QCo() {
    var e = this.d1o.GetCurSelectRoleData();
    if (e.IsTrialRole())
      this.RefreshOneKeyButtonState(!1),
        this.GetButton(4).RootUIComp.SetUIActive(!1);
    else {
      e = e.GetPhantomData().GetDataMap();
      let i = 0;
      e.forEach((e, t) => {
        e && i++;
      }),
        this.GetButton(4).RootUIComp.SetUIActive(1 <= i);
    }
  }
  OnBeforeDestroy() {
    this.Ovt(), this.RemoveEventListener();
  }
}
exports.RoleVisionInfoPanel = RoleVisionInfoPanel;
//# sourceMappingURL=RoleVisionInfoPanel.js.map
