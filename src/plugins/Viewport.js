export default {
    install: (Vue, options = {}) => {
        Vue.mixin({
            created () {
                if (!this.isServer()) {
                    window.addEventListener('resize', this.updateScreenDimensions);
                }
            },

            destroyed () {
                if (!this.isServer()) {
                    window.removeEventListener('resize', this.updateScreenDimensions);
                }
            },

            beforeDestroy () {
                if (this.$data.$intersectionObserver) {
                    this.$data.$intersectionObserver.disconnect();
                }
            },

            data () {
                return {
                    $screen: {
                        width: !this.isServer() ? window.innerWidth : 360,
                        height: !this.isServer() ? window.innerHeight : 740,
                    },
                    $intersectionObserver: null,
                    $inViewport: null,
                };
            },

            computed: {
                $viewport () {
                    const {
                        tablet, desktop, hd,
                    } = options.viewport.breakpoints;

                    const { width, height } = this.$data.$screen;

                    const props = {
                        isMobileOnly: width < tablet,
                        isMobileDown: width < tablet,
                        isMobileUp: true,

                        isTabletOnly: width >= tablet && width < desktop,
                        isTabletDown: width < desktop,
                        isTabletUp: width >= tablet,

                        isDesktopOnly: width >= desktop && width < hd,
                        isDesktopDown: width < hd,
                        isDesktopUp: width >= desktop,

                        isHdOnly: width >= hd,
                        isHdDown: true,
                        isHdUp: width >= hd,

                        isPortrait: height > width,
                    };

                    let size = 'small';

                    if (props.isTabletOnly) {
                        size = 'medium';
                    } else if (props.isDesktopOnly) {
                        size = 'large';
                    } else if (props.isHdUp) {
                        size = 'x-large';
                    }

                    props.size = size;

                    return props;
                },
            },

            methods: {
                isServer() {
                    return typeof window === 'undefined';
                },

                updateScreenDimensions () {
                    this.$data.$screen.width = window.innerWidth;
                    this.$data.$screen.height = window.innerHeight;
                },

                createIntersectionObserver ($el = null) {
                    $el = $el || this.$el;

                    if (!($el instanceof Element)) {
                        this.$log('$el must be a DOM Element');

                        return;
                    }

                    if (!this.isServer()) {
                        this.$data.$intersectionObserver = new IntersectionObserver((entries) => {
                            const ratio = Math.max(...entries.map((e) => e.intersectionRatio));

                            this.$data.$inViewport = ratio > 0;
                            this.$emit('change:intersection', this.$data.$inViewport);
                        }, {
                            threshold: new Array(101).fill(0).map((zero, index) => {
                                return index * 0.01;
                            }),
                            rootMargin: ['100px 0px'],
                        });

                        this.$data.$intersectionObserver.observe($el);
                    }
                },
            },
        });
    },
};
