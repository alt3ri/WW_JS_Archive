"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecommendView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRecommendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Wji = void 0),
      (this.Kji = void 0),
      (this.sGe = (e, i, r) => {
        i = new RecommendSubItem(i);
        return i.Refresh(e), { Key: r, Value: i };
      }),
      (this.Mke = () => {
        var e,
          i =
            ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
        ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIfEquipVision(
          i.GetRoleId(),
        )
          ? this.Qji()
          : ((e =
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetRecommendEquipUniqueIdList(
                i.GetRoleId(),
              )),
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
              i.GetRoleId(),
              e,
            ),
            UiManager_1.UiManager.CloseView("VisionRecommendView"));
      }),
      (this.bl = () => {
        var i =
            ModelManager_1.ModelManager.PhantomBattleModel.PhantomRecommendData
              .MonsterIdList,
          r = (this.Wji.Refresh(i[0]), []);
        for (let e = 1; e < i.length; e++) r.push(i[e]);
        this.Kji.RebuildLayoutByDataNew(r);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.Mke]]);
  }
  OnStart() {
    (this.Wji = new RecommendMainItem(this.GetItem(0))),
      (this.Kji = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(1),
        this.sGe,
      ));
  }
  Qji() {
    const i =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(96);
    e.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    }),
      e.FunctionMap.set(2, () => {
        var e =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetRecommendEquipUniqueIdList(
            i.GetRoleId(),
          );
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(
            i.GetRoleId(),
            e,
          ),
          UiManager_1.UiManager.CloseView("VisionRecommendView");
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomRecommendResponse,
      this.bl,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomRecommendResponse,
      this.bl,
    );
  }
  OnAfterShow() {
    var e =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomRecommendRequest(
      e.GetRoleId(),
    );
  }
  OnBeforeDestroy() {
    this.Kji.ClearChildren();
  }
}
exports.VisionRecommendView = VisionRecommendView;
class RecommendMainItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.u8i = 0),
      (this.eTt = () => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            this.u8i,
          )?.MonsterProbeId,
        ),
          UiManager_1.UiManager.CloseView("VisionRecommendView");
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UITexture],
      [3, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[1, this.eTt]]);
  }
  Refresh(e) {
    this.u8i = e;
    var i,
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
          this.u8i,
        );
    e &&
      0 !== e.length &&
      ((i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          e[0],
        )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        i.PhantomItem.MonsterName,
      ),
      (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        e[0],
      )),
      this.SetTextureByPath(e.IconSmall, this.GetTexture(3)),
      (e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          i.PhantomItem.SkillId,
        )),
      this.SetTextureByPath(e.SpecialBattleViewIcon, this.GetTexture(2)));
  }
}
class RecommendSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.u8i = 0),
      (this.eTt = () => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            this.u8i,
          )?.MonsterProbeId,
        ),
          UiManager_1.UiManager.CloseView("VisionRecommendView");
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[1, this.eTt]]);
  }
  Refresh(e) {
    this.u8i = e;
    var i,
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
          this.u8i,
        );
    e &&
      0 !== e.length &&
      ((i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          e[0],
        )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        i.PhantomItem.MonsterName,
      ),
      (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        e[0],
      )),
      this.SetTextureByPath(i.IconSmall, this.GetTexture(2)));
  }
}
//# sourceMappingURL=VisionRecommendView.js.map
