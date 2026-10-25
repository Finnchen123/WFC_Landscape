import QtQuick
import QtQuick.Controls as QQC2
import org.kde.kirigami as Kirigami

Kirigami.FormLayout {
    id: page
    // Initial properties supplied by Plasma's wallpaper KCM (also on screen changes).
    property var screen
    property var wallpaperConfiguration
    // Plasma may retain Image while switching from the built-in image wallpaper.
    property string cfg_Image: ""
    property string cfg_ImageDefault: ""
    property var configDialog
    property var parentLayout
    property string cfg_Tileset: "SereneVillage"
    property string cfg_TilesetDefault: "SereneVillage"
    property int cfg_StepInterval: 40
    property int cfg_StepIntervalDefault: 40
    property int cfg_RestartDelay: 5
    property int cfg_RestartDelayDefault: 5
    property bool cfg_AutoRestart: true
    property bool cfg_AutoRestartDefault: true
    property bool cfg_ShowDecorations: true
    property bool cfg_ShowDecorationsDefault: true
    signal configurationChanged()

    function syncTileset() {
        if (tileset) tileset.currentIndex = Math.max(0, tileset.model.indexOf(cfg_Tileset));
    }
    onCfg_TilesetChanged: syncTileset()
    Component.onCompleted: syncTileset()

    // Commit text edits even when Apply is clicked before the field loses focus.
    function saveConfig() {
        stepInterval.value = stepInterval.valueFromText(stepInterval.contentItem.text, stepInterval.locale);
        restartDelay.value = restartDelay.valueFromText(restartDelay.contentItem.text, restartDelay.locale);
        cfg_StepInterval = stepInterval.value;
        cfg_RestartDelay = restartDelay.value;
    }

    QQC2.ComboBox {
        id: tileset
        objectName: "tileset"
        Kirigami.FormData.label: i18n("Tileset:")
        model: ["SereneVillage", "MiniWorld", "DungeonII"]
        currentIndex: 0
        onActivated: function(index) {
            page.cfg_Tileset = model[index];
            page.configurationChanged();
        }
    }
    QQC2.SpinBox {
        id: stepInterval
        objectName: "stepInterval"
        Kirigami.FormData.label: i18n("Time per collapse (ms):")
        from: 10
        to: 1000
        value: page.cfg_StepInterval
        live: true
        stepSize: 10
        editable: true
        onValueModified: {
            page.cfg_StepInterval = value;
            page.configurationChanged();
        }
    }
    QQC2.CheckBox {
        id: decorations
        text: i18n("Show decorations")
        checked: page.cfg_ShowDecorations
        onToggled: {
            page.cfg_ShowDecorations = checked;
            page.configurationChanged();
        }
    }
    QQC2.CheckBox {
        id: autoRestart
        text: i18n("Automatically restart generation")
        checked: page.cfg_AutoRestart
        onToggled: {
            page.cfg_AutoRestart = checked;
            page.configurationChanged();
        }
    }
    QQC2.SpinBox {
        id: restartDelay
        objectName: "restartDelay"
        Kirigami.FormData.label: i18n("Pause before restart (seconds):")
        from: 1
        to: 3600
        value: page.cfg_RestartDelay
        live: true
        editable: true
        enabled: autoRestart.checked
        onValueModified: {
            page.cfg_RestartDelay = value;
            page.configurationChanged();
        }
    }
}
