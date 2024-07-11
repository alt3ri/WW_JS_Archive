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
      (this.plo = void 0),
      (this.c8i = void 0),
      (this.d8i = void 0),
      (this.jdo = void 0),
      (this.wqe = void 0),
      (this.qdo = !1),
      (this.Wdo = () => {
        const e = this.plo.GetCurSelectRoleData(),
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
      (this.Kdo = () => {
        var e = this.plo.GetCurSelectRoleId();
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomRecommendRequest(
          e,
          this.Qdo,
        );
      }),
      (this.Qdo = () => {
        var e,
          t = this.plo.GetCurSelectRoleData();
        ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIfEquipVision(
          t.GetRoleId(),
        )
          ? this.$Hi()
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
      (this.uFe = () => {
        var e,
          t = this.plo.GetCurSelectRoleData();
        t &&
          ((e = []),
          (e = ModelManager_1.ModelManager.PhantomBattleModel.GetExtraAttrList(
            t.GetDataId(),
          )),
          UiManager_1.UiManager.OpenView("RoleAttributeDetailView", e));
      }),
      (this.nNt = () => {
        this.jdo?.();
      }),
      (this.Xdo = () => {
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
        [1, this.uFe],
        [3, this.nNt],
        [4, this.Wdo],
        [5, this.Kdo],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.d8i = new VisionDetailDescComponent_1.VisionDetailDescComponent(
      this.GetItem(2),
    )),
      await this.d8i.Init();
  }
  OnStart() {
    this.d8i.SetActive(!0),
      (this.c8i = new RoleVisionAttribute_1.RoleVisionAttribute(
        this.GetItem(0),
      )),
      this.c8i.Init(),
      this.AddEventListener();
  }
  x6e() {
    var e;
    this.qdo ||
      ((this.qdo = !0),
      (e = this.plo.GetCurSelectRoleId()),
      RedDotController_1.RedDotController.BindRedDot(
        "VisionOneKeyEquip",
        this.GetItem(6),
        void 0,
        e,
      ));
  }
  Dpt() {
    this.qdo &&
      ((this.qdo = !1),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "VisionOneKeyEquip",
        this.GetItem(6),
      ));
  }
  GetTxtItemByIndex(e) {
    return this.d8i?.GetTxtItemByIndex(e);
  }
  $Hi() {
    const t = this.plo.GetCurSelectRoleData();
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
    this.jdo = e;
  }
  RefreshButtonShowState() {
    var e = this.plo.GetCurSelectRoleData().IsTrialRole();
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
      this.Xdo,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomEquip,
      this.Xdo,
    );
  }
  RefreshView(e) {
    (this.plo = e), this.Hqe();
  }
  Hqe() {
    this.npt(),
      this.$do(),
      this.Ydo(),
      this.RefreshButtonShowState(),
      this.Dpt(),
      this.x6e();
  }
  npt() {
    let i;
    var e = this.plo.GetCurSelectRoleData();
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
      this.c8i.Refresh(r, !0);
  }
  $do() {
    var e = this.plo.GetCurSelectRoleData(),
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
      this.d8i.Refresh(i);
  }
  Ydo() {
    var e = this.plo.GetCurSelectRoleData();
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
    this.Dpt(), this.RemoveEventListener();
  }
}
exports.RoleVisionInfoPanel = RoleVisionInfoPanel;
//# sourceMappingURL=RoleVisionInfoPanel.js.map
