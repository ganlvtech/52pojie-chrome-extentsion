function addHook() {
    var tocSideElements = document.querySelectorAll('.toc-side');
    window.addEventListener('scroll', function (e) {
        for (var i = 0; i < tocSideElements.length; ++i) {
            var tocSide = tocSideElements[i];
            var tocSideRect = tocSide.getBoundingClientRect();
            var tocSideMarginBottom = parseInt(window.getComputedStyle(tocSide).getPropertyValue('margin-bottom'));
            var tocSideHeight = window.innerHeight - tocSideMarginBottom - tocSideRect.top;
            if (tocSideHeight < tocSide.scrollHeight) {
                tocSide.style.height = tocSideHeight + 'px';
            } else {
                tocSide.style.height = '';
            }
        }
    });
    for (var i = 0; i < tocSideElements.length; ++i) {
        (function (tocSide) {
            tocSide.addEventListener('wheel', function (e) {
                if (e.deltaY > 0 && tocSide.scrollTop + tocSide.offsetHeight > tocSide.scrollHeight - 1
                    || e.deltaY < 0 && tocSide.scrollTop < 1) {
                    e.preventDefault();
                }
            });
        })(tocSideElements[i]);
    }
    var style = document.createElement('style');
    style.textContent = '.toc-side { overflow-y: scroll; } .toc-side::-webkit-scrollbar { width: 0 !important; }';
    document.querySelector('head').appendChild(style);
}

exports.addHook = addHook;