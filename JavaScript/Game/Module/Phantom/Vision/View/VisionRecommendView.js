"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecommendView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionRecommendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.QHi = void 0),
      (this.XHi = void 0),
      (this.sGe = (e, i, r) => {
        i = new RecommendSubItem(i);
        return i.Refresh(e), { Key: r, Value: i };
      }),
      (this.dIt = () => {
        let e;
        const i =
          ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
        ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIfEquipVision(
          i.GetRoleId(),
        )
          ? this.$Hi()
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
        const i =
          ModelManager_1.ModelManager.PhantomBattleModel.PhantomRecommendData
            .MonsterIdList;
        const r = (this.QHi.Refresh(i[0]), []);
        for (let e = 1; e < i.length; e++) r.push(i[e]);
        this.XHi.RebuildLayoutByDataNew(r);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.dIt]]);
  }
  OnStart() {
    (this.QHi = new RecommendMainItem(this.GetItem(0))),
      (this.XHi = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(1),
        this.sGe,
      ));
  }
  $Hi() {
    const i =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(96);
    e.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    }),
      e.FunctionMap.set(2, () => {
        const e =
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
    const e =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomRecommendRequest(
      e.GetRoleId(),
    );
  }
  OnBeforeDestroy() {
    this.XHi.ClearChildren();
  }
}
exports.VisionRecommendView = VisionRecommendView;
class RecommendMainItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.c6i = 0),
      (this.Kyt = () => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            this.c6i,
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
      (this.BtnBindInfo = [[1, this.Kyt]]);
  }
  Refresh(e) {
    this.c6i = e;
    let i;
    var e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
        this.c6i,
      );
    e &&
      e.length !== 0 &&
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
      (this.c6i = 0),
      (this.Kyt = () => {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
          "MonsterDetectView",
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            this.c6i,
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
      (this.BtnBindInfo = [[1, this.Kyt]]);
  }
  Refresh(e) {
    this.c6i = e;
    let i;
    var e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
        this.c6i,
      );
    e &&
      e.length !== 0 &&
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
// # sourceMappingURL=VisionRecommendView.js.map
