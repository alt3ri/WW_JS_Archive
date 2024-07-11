"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponResonanceView = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponController_1 = require("../WeaponController");
const SingleItemSelect_1 = require("./SingleItemSelect");
class WeaponResonanceView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.Nlo = !1),
      (this.p8t = void 0),
      (this.tOo = void 0),
      (this.ANo = 0),
      (this.Nki = void 0),
      (this.Oki = void 0),
      (this.iOo = (e, i) => {
        let t;
        e === this.ANo &&
          ((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
          (this.Oki =
            UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
          WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
            "WeaponResonanceUpMaterialController",
            this.Nki,
            this.Oki,
          ),
          (t = this.Nki.Model),
          UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
            t,
            "WeaponResonanceUpEffect",
          ),
          this.tOo.ClearSelectData(),
          this.sct(),
          (t = { WeaponIncId: e, LastLevel: i }),
          UiManager_1.UiManager.OpenView("WeaponResonanceSuccessView", t));
      }),
      (this.TGt = () =>
        ModelManager_1.ModelManager.WeaponModel.GetResonanceMaterialList(
          this.ANo,
        )),
      (this.QNo = () => {
        this.sct();
      }),
      (this.oOo = () => {
        const t = this.tOo.GetCurrentSelectedData();
        if (t)
          if (this.Nlo) {
            let i =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                this.ANo,
              );
            let e = 21;
            var n = t.IncId;
            var r =
              (n > 0 &&
                ((r =
                  ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                    n,
                  )),
                (o =
                  ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(r)),
                (r =
                  ModelManager_1.ModelManager.WeaponModel.HasWeaponResonance(
                    r,
                  )),
                o && r ? (e = 27) : r ? (e = 25) : o && (e = 26)),
              ConfigManager_1.ConfigManager.WeaponConfig);
            var o =
              n > 0
                ? r.GetWeaponName(
                    r.GetWeaponConfigByItemId(t.ItemId).WeaponName,
                  )
                : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                    ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId)
                      .Name,
                  );
            var n = r.GetWeaponName(i.GetWeaponConfig().WeaponName);
            var r = this.rOo();
            const a = i.GetIncId();
            i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
            i.SetTextArgs(o, n, r.toString()),
              i.FunctionMap.set(2, () => {
                const e = [];
                const i = { Ykn: t.IncId, I5n: 1, G3n: t.ItemId };
                e.push(i),
                  WeaponController_1.WeaponController.SendPbResonUpRequest(
                    a,
                    e,
                  );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                i,
              );
          } else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WeaponResonanceNoEnoughMoneyText",
            );
        else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponSelectMaterialTipsText",
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIText],
    ];
  }
  OnStart() {
    (this.ANo = this.ExtraParams),
      (this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(6))),
      this.p8t.SetFunction(this.oOo),
      this.nOo(),
      this.sOo();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponResonanceSuccess,
      this.iOo,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponResonanceSuccess,
      this.iOo,
    );
  }
  nOo() {
    (this.tOo = new SingleItemSelect_1.SingleItemSelect()),
      this.tOo.Init(this.GetItem(5)),
      this.tOo.SetUseWayId(28),
      this.tOo.SetInitSortToggleState(!0),
      this.tOo.SetGetItemListFunction(this.TGt),
      this.tOo.SetItemSelectChangeCallBack(this.QNo);
  }
  sOo() {
    this.SetItemIcon(this.GetTexture(7), ItemDefines_1.EItemId.Gold);
  }
  aOo(e, i) {
    let t = 0;
    this.tOo.GetCurrentSelectedData() &&
      ((n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
      ).GetWeaponConfig()),
      (t = ModelManager_1.ModelManager.WeaponModel.GetResonanceNeedMoney(
        n.ResonId,
        e,
        i,
      )));
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      ItemDefines_1.EItemId.Gold,
    );
    this.GetText(8).SetText(t.toString()),
      (this.Nlo = n >= t),
      (this.GetText(8).useChangeColor = !this.Nlo);
  }
  sct() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
      this.ANo,
    );
    const i = e.GetWeaponConfig();
    var e = e.GetResonanceLevel();
    const t = this.rOo();
    const n = e === i.ResonLevelLimit;
    const r =
      (this.GetItem(3).SetUIActive(!n),
      this.GetText(1).SetUIActive(!n),
      this.GetItem(10).SetUIActive(!n),
      this.GetItem(4).SetUIActive(!n),
      this.p8t.GetRootItem().SetUIActive(!n),
      this.GetItem(9).SetUIActive(n),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(0),
        "WeaponResonanceLevelText",
        e,
      ),
      ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(i, e));
    let o = void 0;
    if (!n) {
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(1),
        "WeaponResonanceLevelText",
        t,
      ),
        this.aOo(e, t);
      const a =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(i, t);
      const s =
        ((o = []),
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "HighlightColor",
        ));
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        const h = a[i];
        let e = void 0;
        (e =
          l === h
            ? l.toString()
            : StringUtils_1.StringUtils.Format(
                "{0}-><color=#{1}>{2}</color>",
                l,
                s,
                h,
              )),
          o.push(e);
      }
    }
    (o = o ?? r),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Desc, ...o);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(3),
      this.Refresh();
  }
  Refresh() {
    this.RefreshName(), this.sct();
  }
  RefreshName() {
    const e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
      this.ANo,
    );
    const i = e.GetWeaponConfig();
    var t = i.WeaponName;
    var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
      i.QualityId,
    );
    var n = UE.Color.FromHex(n.DropColor);
    var n =
      (this.GetText(12).SetColor(n),
      this.GetText(12).ShowTextNew(t),
      e.GetResonanceLevel());
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
      i.ResonId,
      n,
    );
    t &&
      this.GetText(13).SetText(
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
          t.Name,
        ),
      );
  }
  rOo() {
    let e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
      this.ANo,
    );
    const i = e.GetResonanceLevel();
    let t = this.tOo.GetCurrentSelectedData();
    return t && t.IncId !== 0
      ? ((t =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            t.IncId,
          ).GetResonanceLevel() + e.GetResonanceLevel()),
        (e = e.GetWeaponConfig().ResonLevelLimit) < t ? e : t)
      : i + 1;
  }
}
exports.WeaponResonanceView = WeaponResonanceView;
// # sourceMappingURL=WeaponResonanceView.js.map
