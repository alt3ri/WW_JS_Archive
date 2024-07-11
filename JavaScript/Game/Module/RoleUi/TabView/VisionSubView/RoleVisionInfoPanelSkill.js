"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionInfoPanelSkill = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisionAttributeItemOne_1 = require("../../../Phantom/Vision/View/VisionAttributeItemOne");
class RoleVisionInfoPanelSkill extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.XCo = void 0),
      (this.j8i = void 0),
      (this.p8i = (e) => {
        e === this.j8i?.GetIncrId() && this.$Co(this.j8i);
      }),
      (this.TBt = this.CreateThenShowByResourceIdAsync(
        "UiItem_VisionIMainInfoB",
        e,
      ));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
    ];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.p8i,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.p8i,
    );
  }
  OnStart() {
    (this.XCo = new VisionAttributeItemOne_1.VisionAttributeItemOne(
      this.GetItem(1),
    )),
      this.AddEventListener();
  }
  async Update(e) {
    await this.TBt;
    let i = 0,
      t = void 0;
    var n;
    e.IsTrialRole()
      ? ((n = e.GetPhantomData().GetDataMap()),
        (t = n.get(0)),
        (i = t.GetIncrId()))
      : ((n = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          e.GetDataId(),
        )),
        (i = n.GetIncrIdList()[0]),
        (t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
            i,
          ))),
      t
        ? (this.XCo.SetActive(!0),
          this.GetTexture(0).SetUIActive(!0),
          (e = t),
          (this.j8i = e),
          this.$Co(e),
          this.XCo.Refresh(i))
        : (this.XCo.SetActive(!1), this.GetTexture(0).SetUIActive(!1));
  }
  $Co(e) {
    var i = e?.GetCurrentSkillId(),
      e = e?.GetIfActivePersonalSkill(),
      i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          i,
        ),
      e = e ? i.BattleViewIcon : i.SpecialBattleViewIcon;
    this.SetTextureByPath(e, this.GetTexture(0), "VisionEquipmentView");
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.RoleVisionInfoPanelSkill = RoleVisionInfoPanelSkill;
//# sourceMappingURL=RoleVisionInfoPanelSkill.js.map
