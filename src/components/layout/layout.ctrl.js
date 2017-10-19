/* @ngInject */
module.exports = function layoutController(nddSidebarService) {
    var self = this;

    self.configOffsidebar = {
        open: false,
        cover: false,
        hideButtonClose: true
    };

    this.$onInit = function () {
        nddSidebarService.onPin(function (isPinned) {
            self.pinned = isPinned;
        });
    }
}