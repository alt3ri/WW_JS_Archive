"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipGroupController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  PhantomUtil_1 = require("../PhantomUtil");
class VisionEquipGroupController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      VisionEquipGroupController.Q5e,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      VisionEquipGroupController.Q5e,
    );
  }
  static async RequestVisionEquipGroupInfo() {
    var e = new Protocol_1.Aki.Protocol.Dv_(),
      e = await Net_1.Net.CallAsync(28713, e);
    ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(
      e.Zb_,
    );
  }
  static RequestDeleteVisionEquipGroup(e) {
    var o = new Protocol_1.Aki.Protocol.Ov_();
    (o.c5n = e),
      Net_1.Net.Call(23955, Protocol_1.Aki.Protocol.Ov_.create(o), (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              20225,
            )
          : (ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(
              e.Zb_,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnVisionGroupDataDelete,
            ));
      });
  }
  static RequestPutVisionGroupToTop(e) {
    var o;
    0 === e
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnVisionGroupDataToTop,
        )
      : (((o = new Protocol_1.Aki.Protocol.Fv_()).c5n = e),
        Net_1.Net.Call(18942, Protocol_1.Aki.Protocol.Fv_.create(o), (e) => {
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15349,
              )
            : (ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(
                e.Zb_,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnVisionGroupDataToTop,
              ));
        }));
  }
  static RequestApplyVisionGroup(o, r) {
    if (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        203,
      ).HasTag(-1720844833)
    )
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "VisionSkilling",
      );
    else {
      let e = !1;
      var t = EntitySystem_1.EntitySystem.Get(
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id,
        ),
        t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          t,
          Number(
            Protocol_1.Aki.Protocol.Summon.x3s
              .Proto_ESummonTypeConcomitantVision,
          ),
        );
      (e = t && t.Entity.Active ? !0 : e)
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionSkilling",
          )
        : RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
          (((t = new Protocol_1.Aki.Protocol.xy_()).c5n = o),
          (t.Q6n = r),
          Net_1.Net.Call(19510, Protocol_1.Aki.Protocol.xy_.create(t), (e) => {
            if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27355,
              );
            else {
              for (const o of e.UBs)
                ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(
                  o,
                ),
                  ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(
                    o.Q6n,
                  );
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "VisionAssembleHasUseTips",
              ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PhantomEquip,
                );
            }
          }));
    }
  }
}
(exports.VisionEquipGroupController = VisionEquipGroupController),
  ((_a = VisionEquipGroupController).Q5e = () => {
    _a.RequestVisionEquipGroupInfo();
  }),
  (VisionEquipGroupController.RequestAddVisionEquipGroup = async (e, o) => {
    var r = new Protocol_1.Aki.Protocol.kv_(),
      e = ((r.Q6n = e), (r.H8n = o), await Net_1.Net.CallAsync(18484, r));
    return (
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26997,
          )
        : (ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(
            e.Zb_,
          ),
          (o =
            ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList()
              .length),
          (r =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomEquipGroupCountMax()),
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            "VisionAssembleHasSave",
            o,
            r,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnVisionGroupDataAdd,
          )),
      e.Q4n
    );
  }),
  (VisionEquipGroupController.RequestChangeVisionGroupName = async (e, o) => {
    var r = new Protocol_1.Aki.Protocol.Nv_(),
      e = ((r.c5n = e), (r.H8n = o), await Net_1.Net.CallAsync(20600, r));
    return (
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15349,
          )
        : (ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(
            e.Zb_,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnVisionGroupDataChangeName,
          )),
      e.Q4n
    );
  });
//# sourceMappingURL=VisionEquipGroupController.js.map
