"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueInfoOverview = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhantomSelectItem_1 = require("./PhantomSelectItem");
const RoleSelectItem_1 = require("./RoleSelectItem");
class RogueInfoOverview extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.PhantomItem = void 0),
      (this.RoleItem = void 0),
      (this.AttributeItemList = []),
      (this.UiViewSequence = void 0),
      (this.xao = () => {
        let e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        e.length <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Roguelike",
              35,
              "肉鸽界面打开属性面板，找不到主控的角色",
            )
          : ((e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
              e[0].GetConfigId,
            )),
            UiManager_1.UiManager.OpenView(
              "RogueAttributeDetailView",
              e.GetShowAttrList(),
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.xao]]);
  }
  OnBeforeCreateImplement() {
    (this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    (this.RoleItem = new RoleSelectItem_1.RoleSelectItem()),
      await this.RoleItem.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      ),
      (this.PhantomItem = new PhantomSelectItem_1.PhantomSelectItem(!1)),
      await this.PhantomItem.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      );
  }
  OnStart() {
    this.PhantomItem?.Update(
      ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry,
    );
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
      ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry
        .ConfigId,
    );
    var e =
      (this.PhantomItem?.GetRootItem().SetUIActive(void 0 !== e),
      this.PhantomItem?.SetToggleRaycastTarget(!1),
      this.RoleItem?.Update(
        ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry,
      ),
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
        ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry.ConfigId,
      ));
    this.RoleItem?.GetRootItem().SetUIActive(void 0 !== e), this.wao();
  }
  wao() {
    const i = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "RoleAttributeDisplay6",
    );
    const r = this.GetItem(2);
    const a = this.GetItem(3);
    const o = [];
    const n = i.length;
    for (let t = 0; t < n; ++t) {
      let e = void 0;
      e = t === 0 ? a : LguiUtil_1.LguiUtil.CopyItem(a, r);
      const l = i[t];
      const g = new AttributeItem_1.AttributeItem();
      const s = g.CreateThenShowByActorAsync(e.GetOwner()).then(() => {
        const e = {
          Id: l,
          IsRatio: !1,
          CurValue: 0,
          BgActive: n > 2 && t % 2 == 0,
        };
        g.Refresh(e, !1, t);
      });
      this.AttributeItemList.push(g), o.push(s);
    }
    Promise.all(o).then(() => {
      this.UpdateAttribute();
    });
  }
  UpdateAttribute() {
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    if (e.length <= 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Roguelike",
          9,
          "肉鸽属性展示面板, 找不到主控角色实体!",
        );
    else {
      const t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
        e[0].GetConfigId,
      );
      const i = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay6",
      );
      for (let e = 0; e < this.AttributeItemList.length; ++e) {
        const r = this.AttributeItemList[e];
        var a = i[e];
        var a = t.GetShowAttributeValueById(a);
        r.SetCurrentValue(a), r.SetActive(!0);
      }
    }
  }
  RefreshPanel() {
    this.RoleItem?.RefreshPanel(), this.PhantomItem?.RefreshPanel();
  }
}
exports.RogueInfoOverview = RogueInfoOverview;
// # sourceMappingURL=RogueInfoOverview.js.map
