/**
 * More animations
 * @file animate.js
 * @author BE-FE Team
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 */

(function (global, factory) {
    /* CommonJS */
    if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        factory(require('iSlider'));
    /* AMD */
    else if (typeof define === 'function' && define['amd'])
        define(['iSlider'], function (iSlider) {
            factory(iSlider);
        });
    /* Global */
    else
        factory(global['iSlider']);

})(window ? window : this, function (iSlider) {

    'use strict';

    iSlider && iSlider.extend(iSlider._animateFuncs, {
        // rotate
        rotate: (function () {
            function rotate(dom, axis, scale, i, offset, direct) {
                var rotateDirect = (axis === 'X') ? 'Y' : 'X';
                // var absoluteOffset = Math.abs(offset);

                if (this.isVertical) {
                    offset = -offset;
                }

                this.wrap.style.webkitPerspective = scale * 4;

                dom.style.visibility = 'visible';
                if (direct > 0 && i === 2) {
                    dom.style.visibility = 'hidden';
                }
                if (direct < 0 && i === 0) {
                    dom.style.visibility = 'hidden';
                }
                dom.style.zIndex = i === 1 ? 1 : 0;

                dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; position:absolute;';
                dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + 0.9153 * 90 * (offset / scale + i - 1) + 'deg) translateZ(' + ( scale / 2) + 'px) scale(0.875)';
            }

            rotate.effect = 'transform';
            rotate.reverse = true;
            return rotate;
        })(),
        // flip
        flip: (function () {
            function flip(dom, axis, scale, i, offset, direct) {
                if (this.isVertical) {
                    offset = -offset;
                }
                this.wrap.style.webkitPerspective = scale * 4;

                dom.style.visibility = 'visible';
                if (direct > 0 && i === 2) {
                    dom.style.visibility = 'hidden';
                }
                if (direct < 0 && i === 0) {
                    dom.style.visibility = 'hidden';
                }

                dom.style.cssText += 'position:absolute; -webkit-backface-visibility:hidden;';
                dom.style.webkitTransform = 'translateZ(' + (scale / 2) + 'px) rotate' + ((axis === 'X') ? 'Y' : 'X') + '(' + 180 * (offset / scale + i - 1) + 'deg) scale(0.875)';
            }

            flip.effect = 'transform';
            flip.reverse = true;
            return flip;
        })(),
        depth: (function () {

            function depth(dom, axis, scale, i, offset, direct) {
                var zoomScale = (4 - Math.abs(i - 1)) * 0.18;
                this.wrap.style.webkitPerspective = scale * 4;
                dom.style.zIndex = i === 1 ? 1 : 0;
                dom.style.webkitTransform = 'scale(' + zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
            }

            depth.effect = 'transform';
            return depth;
        })(),
        flow: (function () {
            function flow(dom, axis, scale, i, offset, direct) {
                var absoluteOffset = Math.abs(offset);
                var rotateDirect = (axis === 'X') ? 'Y' : 'X';
                var directAmend = (axis === 'X') ? 1 : -1;
                var offsetRatio = Math.abs(offset / scale);

                this.wrap.style.webkitPerspective = scale * 4;

                if (i === 1) {
                    dom.style.zIndex = scale - absoluteOffset;
                }
                else {
                    dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
                }

                dom.style.webkitTransform = 'scale(0.7, 0.7) translateZ(' + (offsetRatio * 150 - 150) * Math.abs(i - 1) + 'px)' + 'translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)' + 'rotate' + rotateDirect + '(' + directAmend * (30 - offsetRatio * 30) * (1 - i) + 'deg)';
            }

            flow.effect = 'transform';
            return flow;
        })(),
        card: (function () {
            function card(dom, axis, scale, i, offset, direct) {
                var absoluteOffset = Math.abs(offset);
                var zoomScale = 1;
                var z = 1;

                if (absoluteOffset > 0) {
                    if (i === 1) {
                        zoomScale = 1 - 0.2 * Math.abs(i - 1) - Math.abs(0.2 * offset / scale).toFixed(6);
                        z = 0;
                    }
                } else {
                    if (i !== 1) {
                        if ((direct > 0 && i === 0) || (direct < 0 && i === 2)) {
                            zoomScale = 1 - 0.2 * Math.abs(i - 1);
                        }
                        z = 0;
                    }
                }
                dom.style.zIndex = z;
                dom.style.webkitTransform = 'scale(' + zoomScale + ') translateZ(0) translate' + axis + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
            }

            card.effect = 'transform';
            return card;
        })(),
        fade: (function () {
            function fade(dom, axis, scale, i, offset, direct) {
                dom.style.zIndex = i === 1 ? 1 : 0;
                offset = Math.abs(offset);
                if (i === 1) {
                    dom.style.opacity = 1 - (offset / scale);
                } else {
                    dom.style.opacity = offset / scale;
                }
            }

            fade.effect = 'opacity';
            return fade;
        })(),
        zoomout: (function () {
            var lsn;

            function zoomout(dom, axis, scale, i, offset) {
                var z, o, s;

                var oa = offset / scale;
                switch (i) {
                    case 0:
                        lsn && window.clearTimeout(lsn);
                        o = oa < 1 ? oa : 1;
                        s = 2 - (0.5 * oa);
                        z = 2;
                        var at = parseInt(window.getComputedStyle(dom).transitionDuration) * 1000;
                        if (at > 0) {
                            lsn = window.setTimeout(function () {
                                dom.style.zIndex = 0;
                            }, at);
                        }
                        break;
                    case 1:
                        o = 1 - oa;
                        s = 1 - (0.5 * oa);
                        z = 1;
                        break;
                    case 2:
                        o = oa > 0 ? oa : 0;
                        s = 0.5 - (0.5 * oa);
                        z = 0;
                        break;
                }
                dom.style.cssText += 'z-index:' + z + ';opacity:' + o + ';-webkit-transform: scale(' + s + ');';
            }

            //what.effect = 'all';
            //what.effect = 'transform,opacity';
            zoomout.reverse = true;
            return zoomout;
        })()
    });
});