function CoreHeaderPanel() {}

module.exports = CoreHeaderPanel;

CoreHeaderPanel.prototype.view = __dirname;

CoreHeaderPanel.prototype.init = function () {
    /**
     * Controls header and scrolling behavior. Options are
     * `standard`, `seamed`, `waterfall`, `waterfall-tall`,
     * `waterfall-medium-tall`, `scroll` and `cover`.
     * Default is `standard`.
     *
     * `standard`: The header is a step above the panel. The header will consume the
     * panel at the point of entry, preventing it from passing through to the
     * opposite side.
     *
     * `seamed`: The header is presented as seamed with the panel.
     *
     * `waterfall`: Similar to standard mode, but header is initially presented as
     * seamed with panel, but then separates to form the step.
     *
     * `waterfall-tall`: The header is initially taller (`tall` class is added to
     * the header).  As the user scrolls, the header separates (forming an edge)
     * while condensing (`tall` class is removed from the header).
     *
     * `scroll`: The header keeps its seam with the panel, and is pushed off screen.
     *
     * `cover`: The panel covers the whole `core-header-panel` including the
     * header. This allows user to style the panel in such a way that the panel is
     * partially covering the header.
     *
     *     <style>
     *       core-header-panel[mode=cover]::shadow #mainContainer {
       *         left: 80px;
       *       }
     *       .content {
       *         margin: 60px 60px 60px 0;
       *       }
     *     </style>
     *
     *     <core-header-panel mode="cover">
     *       <core-appbar class="tall">
     *         <core-icon-button icon="menu"></core-icon-button>
     *       </core-appbar>
     *       <div class="content"></div>
     *     </core-header-panel>
     *
     * @attribute mode
     * @type string
     * @default ''
     */
    this.model.setNull('mode', '');

    /**
     * The class used in waterfall-tall mode.  Change this if the header
     * accepts a different class for toggling height, e.g. "medium-tall"
     *
     * @attribute tallClass
     * @type string
     * @default 'tall'
     */
    this.model.setNull('tall', 'tall');

    /**
     * If true, the drop-shadow is always shown no matter what mode is set to.
     *
     * @attribute shadow
     * @type boolean
     * @default false
     */
    this.model.setNull('shadow', false);
}

CoreHeaderPanel.prototype.create = function(){
    this.model.on('all', 'mode', (function (path, event, mode) {
        this.scroll();
    }).bind(this));
}

CoreHeaderPanel.prototype.header = function(){
    return this.headerContent.getDistributedNodes()[0];
}

/**
 * Returns the scrollable element.
 */
CoreHeaderPanel.prototype.scroller = function() {
    return this.mode === 'scroll' ? this.outerContainer : this.mainContainer;
}

CoreHeaderPanel.prototype.scroll = function() {
//    var shadowMode = {'waterfall': 1, 'waterfall-tall': 1};
//    var noShadow = {'seamed': 1, 'cover': 1, 'scroll': 1};
//    var tallMode = {'waterfall-tall': 1};
//
//    var main = this.mainContainer;
//    var header = this.header;
//
//    var sTop = main.scrollTop;
//    var atTop = sTop === 0;
//
//    if (header) {
//        this.dropShadow.classList.toggle('hidden', !this.shadow &&
//            (atTop && shadowMode[this.mode] || noShadow[this.mode]));
//
//        if (tallMode[this.mode]) {
//            header.classList.toggle(this.tallClass, atTop);
//        }
//
//        header.classList.toggle('animate', tallMode[this.mode]);
//    }

    this.emit('scroll', {target: this.scroller}, this, false);
}