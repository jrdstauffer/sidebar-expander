# sidebar-expander

Expands sidebar sections on left-click when the sidebar is collapsed instead of opening the section as a popout. Right-clicking on a section will open the section as a popout per default behavior.

There is a known conflict with Minimal UI version 1.1.8 (Foundry v0.8.9). Minimal UI for Foundry v9 will be updated to remove the conflict but for Foundry v0.8.9 we recommend manually commenting out the code in Minimal UI that causes the conflict since updating is locked for this version.

In your Foundry Data directory, go to the modules folder and then to the minimal-ui folder. Edit minimalui.js removing or commenting out the following lines (1148-1156):
```
Hooks.once('ready', async function () {
  $("#sidebar-tabs > a:nth-child(n)").click(function (eve) {
      if (eve.currentTarget.classList.contains('collapse')) return;
      const tabName = jQuery(eve.currentTarget).attr('data-tab');
      if (ui.sidebar._collapsed) {
          ui.sidebar.activateTab(tabName);
      }
  });
});
```
See https://github.com/saif-ellafi/foundryvtt-minimal-ui/issues/71 for more information.
