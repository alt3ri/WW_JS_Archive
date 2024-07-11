"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceMotionItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class AdviceMotionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.I7e = 0),
      (this.kqe = () => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId = this.I7e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceMotion,
          );
      }),
      (this.p9e = () => {
        this.Oqe();
      }),
      (this.T7e = () => {
        let e;
        let t;
        const i =
          this.I7e ===
          ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId;
        return this.I7e ===
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
          ? !i
          : ((e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(
              this.I7e,
            )),
            (e =
              (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
                e,
                this.I7e,
              )) === 0 || e === 1) &&
              ((t =
                ConfigManager_1.ConfigManager.ComposeConfig.GetConditionInfo(
                  ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(
                    this.I7e,
                  ).CondGroupId,
                )),
              (t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
                t.HintText,
              )),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "UnlockCondition",
                t,
              )),
            !i && !e);
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    const e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(),
      e.CanExecuteChange.Bind(this.T7e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClickAdviceMotion,
        this.p9e,
      );
  }
  Update(e) {
    (this.I7e = e), this.Og();
  }
  Og() {
    this.j9e(), this.Aqe(), this.C4e(), this.Oqe(), this.L7e();
  }
  C4e() {
    let e = "";
    (e =
      this.I7e ===
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
        ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSpecialParamsContent(
            this.I7e,
          )
        : ConfigManager_1.ConfigManager.MotionConfig.GetMotionContent(
            this.I7e,
          )),
      this.GetText(1).SetText(e);
  }
  Aqe() {
    let e = "";
    (e = (
      this.I7e ===
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
        ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSpecialParams(
            this.I7e,
          )
        : ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(this.I7e)
    ).MotionImg),
      this.SetTextureByPath(e, this.GetTexture(2));
  }
  j9e() {
    const e =
      this.I7e ===
      ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId;
    this.GetItem(4).SetUIActive(e);
  }
  Oqe() {
    const e =
      this.I7e === ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId
        ? 1
        : 0;
    this.GetExtendToggle(0).ToggleState !== e &&
      this.GetExtendToggle(0).SetToggleStateForce(e, !1);
  }
  L7e() {
    let e;
    this.I7e ===
    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
      ? (this.GetSprite(3).SetUIActive(!1), this.GetItem(5).SetUIActive(!1))
      : ((e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(
          this.I7e,
        )),
        (e =
          (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
            e,
            this.I7e,
          )) === 0 || e === 1),
        this.GetSprite(3).SetUIActive(e),
        this.GetItem(5).SetUIActive(e));
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceMotion,
      this.p9e,
    );
  }
}
exports.AdviceMotionItem = AdviceMotionItem;
// # sourceMappingURL=AdviceMotionItem.js.map
