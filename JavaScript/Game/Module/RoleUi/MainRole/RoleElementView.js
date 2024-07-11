"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleElementView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const MainRoleController_1 = require("../MainRoleController");
const RoleController_1 = require("../RoleController");
const RoleElementItem_1 = require("./RoleElementItem");
class RoleElementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.kGe = void 0),
      (this.uft = void 0),
      (this.s5i = 0),
      (this.plo = void 0),
      (this.Mlo = 0),
      (this.Slo = 0),
      (this.Elo = !1),
      (this.C5i = void 0),
      (this.sGe = () => {
        const e = new RoleElementItem_1.RoleElementItem();
        return (
          e.SetRoleViewAgent(this.plo),
          (e.OnToggleCallback = this.OnToggleClick),
          (e.CanToggleChange = this.Eft),
          e
        );
      }),
      (this.OnToggleClick = (e) => {
        this.ylo(e),
          RoleController_1.RoleController.PlayRoleMontage(19),
          this.Mlo && this.Ilo();
      }),
      (this.Eft = (e) =>
        e !== this.kGe.GetGenericLayout().GetSelectedGridIndex()),
      (this.OnClickClose = () => {
        this.CloseMe();
      }),
      (this.OnClickSwitch = () => {
        let e;
        Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
          185,
        )?.HasTag(1996802261)
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "CanNotTransferInFight",
              ),
            )
          : this.s5i &&
            (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
              this.s5i,
            )) &&
            MainRoleController_1.MainRoleController.SendRoleElementChangeRequest(
              e.ElementId,
            );
      }),
      (this.wke = (e) => {
        (this.Elo = !0),
          UiLayer_1.UiLayer.SetShowMaskLayer("RoleElementView", !0),
          this.plo.SetCurSelectRoleId(e),
          this.C5i?.Model?.CheckGetComponent(11)?.SetRoleDataId(e),
          this.Tlo(e);
        for (const t of this.kGe.GetScrollItemList()) t.RefreshState();
        this._pt();
      }),
      (this.Llo = (e) => {
        e ? this.Ilo() : this.HideElementPreviewEffect();
      }),
      (this.Dlo = () => {
        UiLayer_1.UiLayer.SetShowMaskLayer("RoleElementView", !1),
          (this.Elo = !1),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "ElementTransferSuccess",
          );
      }),
      (this.Ilo = () => {
        let e;
        this.Elo ||
          ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            this.s5i,
          )),
          this.ShowElementPreviewEffectById(e.ElementId));
      }),
      (this.Rlo = () => {});
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.OnClickClose],
        [2, this.OnClickSwitch],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.plo = this.OpenParam),
      void 0 === this.plo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleElementView",
          ])
        : ((this.C5i =
            UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
          (this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(
            this.GetScrollViewWithScrollbar(1),
            this.sGe,
          )),
          await this.RefreshAsync(),
          RoleController_1.RoleController.PlayRoleMontage(20));
  }
  async RefreshAsync() {
    let e = ModelManager_1.ModelManager.WorldLevelModel.Sex;
    const t = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(e);
    const i = t.length;
    const r = [];
    for (let e = 0; e < i; e++) {
      const s = t[e];
      MainRoleController_1.MainRoleController.IsCanChangeRole(s.Id) &&
        r.push(s);
    }
    (this.uft = r), await this.kGe.RefreshByDataAsync(r);
    const o = this.plo.GetCurSelectRoleId();
    e = r.findIndex((e) => e.Id === o);
    this.ylo(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
      this.Llo,
    );
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.wke,
    );
  }
  ylo(e) {
    const t = this.uft[e];
    (this.s5i = t.Id),
      this.kGe.GetGenericLayout().SelectGridProxy(e),
      this._pt();
  }
  _pt() {
    const e = this.plo.GetCurSelectRoleId() === this.s5i;
    this.GetButton(2)?.SetSelfInteractive(!e);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.wke,
    ),
      this.HideElementPreviewEffect();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
      this.Llo,
    );
  }
  Tlo(e) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    const t =
      (RoleController_1.RoleController.PlayRoleMontage(21),
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementSwitchDelayTime());
    this.ShowElementSuccessEffectById(e.ElementId),
      TimerSystem_1.TimerSystem.Delay(() => {
        this.Dlo();
      }, t);
  }
  async Ulo(e, i, r, t, s, o) {
    let n = !1;
    let a = void 0;
    const l = new CustomPromise_1.CustomPromise();
    o &&
      ((o = new LoadAsyncPromise_1.LoadAsyncPromise(o, UE.Texture)),
      (a = await o.Promise),
      (n = !0));
    o = EffectUtil_1.EffectUtil.GetEffectPath(e);
    return (
      EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        t ?? MathUtils_1.MathUtils.DefaultTransform,
        o,
        "[RoleAnimStateEffectManager.PlayEffect]",
        new EffectContext_1.EffectContext(void 0, i),
        1,
        void 0,
        (e, t) => {
          e !== 0 &&
            (s &&
              ((e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(s))),
              this.Alo(t, e, n, a)),
            i &&
              r &&
              EffectSystem_1.EffectSystem.GetEffectActor(
                t,
              )?.K2_AttachToComponent(i, r, 0, 0, 0, !1),
            l.SetResult(t));
        },
        void 0,
        !1,
        !0,
      ),
      l.Promise
    );
  }
  Alo(e, t, i, r) {
    var e = EffectSystem_1.EffectSystem.GetSureEffectActor(
      e,
    ).GetComponentByClass(UE.NiagaraComponent.StaticClass());
    const s = e.Asset;
    e.SetAsset(void 0),
      e.SetAsset(s),
      e.SetNiagaraVariableLinearColor("Color", t),
      i && e.SetKuroNiagaraEmitterCustomTexture("Icon", "Mask", r);
  }
  ShowElementSuccessEffectById(e) {
    let t;
    let i;
    var e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e);
    e &&
      (i = (t = this.C5i).Model?.CheckGetComponent(1)?.MainMeshComponent) &&
      (this.Ulo(
        "AttributeSwitchBodyEffect",
        t.K2_GetRootComponent(),
        CharacterNameDefines_1.CharacterNameDefines.ROOT,
        void 0,
        e.ElementEffectColor,
      ).catch(this.Rlo),
      this.Ulo(
        "AttributeSwitchHandEffect",
        i,
        CharacterNameDefines_1.CharacterNameDefines.ELEMENT_EFFECT_SOCKET_NAME,
        void 0,
        e.ElementEffectColor,
        e.Icon3,
      ).catch(this.Rlo));
  }
  ShowElementPreviewEffectById(e) {
    e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e);
    if (e) {
      if (this.Mlo) {
        const s = UE.LinearColor.FromSRGBColor(
          UE.Color.FromHex(e.ElementEffectColor),
        );
        ResourceSystem_1.ResourceSystem.LoadAsync(e.Icon3, UE.Texture, (e) => {
          this.Alo(this.Mlo, s, !0, e);
        });
      } else {
        var t = this.C5i;
        const i = new UE.Transform(
          new UE.Rotator(0, 0, 0),
          new UE.Vector(0, 0, 0),
          new UE.Vector(1, 1, 1),
        );
        var t = t.Model?.CheckGetComponent(1);
        this.Ulo(
          "AttributePreviewHandEffect",
          t?.MainMeshComponent,
          CharacterNameDefines_1.CharacterNameDefines
            .ELEMENT_EFFECT_SOCKET_NAME,
          i,
          e.ElementEffectColor,
          e.Icon3,
        ).then((e) => {
          this.Mlo = e;
        }, this.Rlo);
      }
      try {
        const r = UiSceneManager_1.UiSceneManager.GetActorByTag(
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "RoleElementPreviewEffectCase",
          ),
        );
        this.Slo ||
          this.Ulo(
            "AttributePreviewBodyEffect",
            void 0,
            void 0,
            r.GetTransform(),
          ).then((e) => {
            this.Slo = e;
          }, this.Rlo);
      } catch (e) {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Role",
            50,
            "给角色属性切换预览特效寻找坐标参考case点失败，中断后续流程",
          );
      }
    }
  }
  HideElementPreviewEffect() {
    EffectSystem_1.EffectSystem.IsValid(this.Mlo) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.Mlo,
        "HideElementPreviewEffect",
        !0,
        !0,
      ),
      (this.Mlo = 0)),
      this.Slo &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Slo,
          "HideElementPreviewEffect",
          !0,
          !0,
        ),
        (this.Slo = 0));
  }
}
exports.RoleElementView = RoleElementView;
// # sourceMappingURL=RoleElementView.js.map
