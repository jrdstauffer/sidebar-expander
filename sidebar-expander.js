class sidebarExpander {
	
	static patchFunction(func, line_number, line, new_line) {
		let funcStr = func.toString()
		let lines = funcStr.split("\n")
		if (lines[line_number].trim() == line.trim()) {
			let fixed = funcStr.replace(line, new_line)
			return Function('"use strict";return (function ' + fixed + ')')();
		}
		return func;
	}
	
	static init() {
		Tabs.prototype._onClickNav = sidebarExpander.patchFunction(
			Tabs.prototype._onClickNav,
			5,
			"if ( tabName !== this.active) this.activate(tabName, {triggerCallback: true});",
			`
				if ( tabName !== this.active) this.activate(tabName, {triggerCallback: false});
				if ( ui.sidebar._collapsed ) ui.sidebar.expand();
			`
		);
		Sidebar.prototype._onLeftClickTab = Function('"use strict";return (function _onLeftClickTab(event){})')();
	};
}

Hooks.on('init', sidebarExpander.init);