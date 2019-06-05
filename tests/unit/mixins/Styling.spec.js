import sandbox from '../sandbox';

import Styling from '@/mixins/Styling';

describe('Styling mixin', () => {
    it('should merge global config with local component config', () => {
        const localVue = sandbox.createLocalVue();

        const wrapper = sandbox.shallowMount({
            template: '<div></div>',
            data () {
                return {
                    localConfig: {
                        name: 'Foo',
                        config: {
                            option1: 'value1',
                            option2: 'value2',
                        },
                    },
                };
            },

            mixins: [Styling],
        }, {
            localVue,
            mocks: {
                $config: {
                    components: {
                        Foo: {
                            option2: '',
                            option3: 'value3',
                        },
                    },
                },
            },
        });

        sandbox.expect(wrapper.vm.config).to.eql({
            option1: 'value1',
            option2: '',
            option3: 'value3',
        });

        wrapper.destroy();
    });

    describe('Style transforms', () => {
        const $config = {
            components: [],
            viewport: {
                names: {
                    sm: '',
                    md: 'md--',
                    lg: 'lg--',
                    xl: 'xl--',
                },
            },
            style: {
                whitelist: [
                    {
                        attr: ['color'],
                        classPrefix: 'color-',
                    },
                    {
                        attr: ['rounded'],
                        class: 'rounded',
                    },
                    {
                        attr: [
                            'narrow',
                            'auto',
                            'none',
                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                        ],
                        classPrefix: 'col-',
                        responsive: true,
                    },
                    {
                        attr: ['span'],
                        classPrefix: 'col-',
                        responsive: true,
                    },
                    {
                        attr: ['text-align', 'align'],
                        classPrefix: 'align-',
                        responsive: true,
                    },
                ],
            },
        };

        it('should transform non-responsive styling attributes into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: 'my-class',
                    color: 'red',
                    rounded: true,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'my-class': true,
                    'color-red': true,
                    rounded: true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should transform responsive styling attributes with keyword into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: ['this-class', { 'that-class': true }],
                    span: 12,
                    'md:span': 6,
                    'lg:span': 3,
                    'xl:span': 2,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'this-class': true,
                    'that-class': true,
                    'col-12': true,
                    'md--col-6': true,
                    'lg--col-3': true,
                    'xl--col-2': true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should transform responsive styling attributes without keyword into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: {
                        'this-class': true,
                        'that-class': true,
                    },
                    'sm:12': true,
                    'md:6': true,
                    'lg:3': true,
                    'xl:2': true,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'this-class': true,
                    'that-class': true,
                    'col-12': true,
                    'md--col-6': true,
                    'lg--col-3': true,
                    'xl--col-2': true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should not transform falsy values into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: {
                        'this-class': true,
                        'that-class': true,
                    },
                    span: {},
                    'sm:12': 'undefined',
                    'md:6': undefined,
                    'lg:3': null,
                    'xl:2': 'null',
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'this-class': true,
                    'that-class': true,
                },
                span: {},
                'sm:12': 'undefined',
                'md:6': undefined,
                'lg:3': null,
                'xl:2': 'null',
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should transform camelCase attributes into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: {
                        'this-class': true,
                        'that-class': true,
                    },
                    textAlign: 'left',
                    'md:textAlign': 'center',
                    'lg:textAlign': 'right',
                    ariaLabel: 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'this-class': true,
                    'that-class': true,
                    'align-left': true,
                    'md--align-center': true,
                    'lg--align-right': true,
                },
                ariaLabel: 'Test',
            });

            wrapper.destroy();
        });

        it('should add component baseClass into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                data () {
                    return {
                        localConfig: {
                            config: {
                                baseClass: 'foo-bar-component',
                            },
                        },
                    };
                },
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: 'my-class',
                    color: 'red',
                    rounded: true,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'foo-bar-component': true,
                    'my-class': true,
                    'color-red': true,
                    rounded: true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should add computed component state modifiers into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                data () {
                    return {
                        localConfig: {
                            config: {
                                baseClass: 'foo-bar-component',
                                modifierPrefix: 'foo-',
                                classMap: {
                                    'foo-state-disabled': 'is-disabled',
                                },
                            },
                        },
                    };
                },
                computed: {
                    componentStates() {
                        return {
                            loading: true,
                            state: 'disabled',
                        };
                    },
                },
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: 'my-class',
                    color: 'red',
                    rounded: true,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'foo-bar-component': true,
                    'my-class': true,
                    'foo-red': true,
                    rounded: true,
                    'foo-loading': true,
                    'is-disabled': true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should use component modifier prefix when transforming attributes into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                data () {
                    return {
                        localConfig: {
                            config: {
                                modifierPrefix: 'foo--',
                            },
                        },
                    };
                },
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: 'my-class',
                    color: 'red',
                    rounded: true,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'my-class': true,
                    'foo--red': true,
                    rounded: true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });

        it('should use component classMap when transforming attributes into a class attribute', () => {
            const localVue = sandbox.createLocalVue();

            const wrapper = sandbox.shallowMount({
                template: '<div></div>',
                data () {
                    return {
                        localConfig: {
                            config: {
                                classMap: {
                                    'color-red': 'foo-pink',
                                    rounded: 'foo-rounded',
                                },
                            },
                        },
                    };
                },
                mixins: [Styling],
            }, {
                localVue,
                attrs: {
                    class: 'my-class',
                    color: 'red',
                    rounded: true,
                    'aria-label': 'Test',
                },
                mocks: {
                    $config,
                },
            });

            sandbox.expect(wrapper.vm.filteredAttrs).to.eql({
                class: {
                    'my-class': true,
                    'foo-pink': true,
                    'foo-rounded': true,
                },
                'aria-label': 'Test',
            });

            wrapper.destroy();
        });
    });
});
