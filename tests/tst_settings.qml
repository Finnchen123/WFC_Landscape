import QtQuick
import QtTest

TestCase {
    name: "WallpaperSettingsPersistence"
    function i18n(text) { return text; }
    function test_roundTrip() {
        failOnWarning(/Cannot assign to non-existent property/);
        var component = Qt.createComponent("../contents/ui/config.qml");
        compare(component.status, Component.Ready, component.errorString());
        var monitor = Qt.createQmlObject('import QtQuick; QtObject { property string name: "DP-1" }', this);
        var saved = {screen: monitor, wallpaperConfiguration: {},
                     cfg_Image: "file:///tmp/background.png", cfg_ImageDefault: "", cfg_Tileset: "Dungeon", cfg_StepInterval: 150,
                     cfg_RestartDelay: 20, cfg_AutoRestart: false,
                     cfg_ShowDecorations: false};
        var page = component.createObject(this, saved);
        verify(page !== null, "Creation with Plasma KCM initial properties failed");
        wait(0);
        for (var key in saved) compare(page[key], saved[key], key);
        compare(findChild(page, "stepInterval").value, 150);
        compare(findChild(page, "restartDelay").value, 20);
        var selector = findChild(page, "tileset");
        selector.currentIndex = 3;
        selector.activated(3);
        compare(page.cfg_Tileset, "Roads");
        page.cfg_Tileset = "Landscape";
        compare(selector.currentIndex, 1);
        // Apply with text still being edited, without an editingFinished signal.
        findChild(page, "stepInterval").contentItem.text = "230";
        findChild(page, "restartDelay").contentItem.text = "35";
        page.saveConfig();
        compare(page.cfg_StepInterval, 230);
        compare(page.cfg_RestartDelay, 35);
        for (var key in saved) saved[key] = page[key];
        page.destroy();
        page = component.createObject(this, saved);
        wait(0);
        for (var key in saved) compare(page[key], saved[key], key);
        compare(findChild(page, "stepInterval").value, 230);
        compare(findChild(page, "restartDelay").value, 35);
        page.screen = monitor;
        compare(page.screen.name, "DP-1");
        page.destroy();
    }
}
