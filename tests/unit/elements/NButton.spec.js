import sandbox from '../sandbox';
import NButton from '@/elements/NButton';
import NIcon from '@/elements/NIcon';

describe('NButton component', () => {
    it('should mount component with props', () => {
        const wrapper = sandbox.mount(NButton, {
            propsData: {
                text: 'Click Me',
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-button');
        sandbox.expect(wrapper.contains('button')).to.be.true;
        sandbox.expect(wrapper.text()).to.contain('Click Me');

        wrapper.destroy();
    });

    it('should mount component with slots', () => {
        const wrapper = sandbox.mount(NButton, {
            slots: {
                default: 'Click Me',
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-button');
        sandbox.expect(wrapper.contains('button')).to.be.true;
        sandbox.expect(wrapper.text()).to.contain('Click Me');

        wrapper.destroy();
    });

    it('should mount component with props', () => {
        const wrapper = sandbox.mount(NButton);

        sandbox.expect(wrapper.classes()).to.contain('n-button');
        sandbox.expect(wrapper.contains('button')).to.be.true;

        wrapper.destroy();
    });

    it('should mount anchor when href is set', () => {
        const wrapper = sandbox.mount(NButton, {
            propsData: {
                href: 'google.com',
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-button');
        sandbox.expect(wrapper.contains('a')).to.be.true;

        wrapper.destroy();
    });

    it('should mount anchor when router path is set', () => {
        const wrapper = sandbox.mount(NButton, {
            propsData: {
                to: {
                    path: '/foo',
                },
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-button');
        sandbox.expect(wrapper.contains('a')).to.be.true;

        wrapper.destroy();
    });

    it('should mount element with custom tag name', () => {
        const wrapper = sandbox.mount(NButton, {
            propsData: {
                tagName: 'div',
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-button');
        sandbox.expect(wrapper.contains('div')).to.be.true;

        wrapper.destroy();
    });

    it('should respect provided tabindex attribute', () => {
        const wrapper = sandbox.mount(NButton, {
            attrs: {
                tabindex: -1,
            },
        });

        sandbox.expect(wrapper.find('button').attributes('tabindex')).to.equal('-1');

        wrapper.destroy();
    });

    it('should set tabindex if click listeners is bound', () => {
        const wrapper = sandbox.mount(NButton, {
            propsData: {
                tagName: 'div',
            },

            listeners: {
                click () {},
            },
        });

        sandbox.expect(wrapper.find('div').attributes('tabindex')).to.equal('0');

        wrapper.destroy();
    });

    it('should bind click listener when router link is provided', () => {
        const push = sinon.stub();

        const wrapper = sandbox.mount(NButton, {
            propsData: {
                to: '/foo',
            },
            mocks: {
                $router: {
                    push,
                },
            },
        });

        wrapper.find('a').trigger('click');

        sandbox.expect(push).to.have.been.calledWith('/foo');
    });

    it('should proxy keydown to click', () => {
        const push = sinon.stub();

        const wrapper = sandbox.mount(NButton, {
            propsData: {
                to: '/foo',
            },
            mocks: {
                $router: {
                    push,
                },
            },
        });

        wrapper.find('a').trigger('keydown', {
            key: ' ',
        });

        sandbox.expect(push).to.have.been.calledWith('/foo');
    });

    it('should proxy keydown with keyCode to click', () => {
        const push = sinon.stub();

        const wrapper = sandbox.mount(NButton, {
            propsData: {
                to: '/foo',
            },
            mocks: {
                $router: {
                    push,
                },
            },
        });

        wrapper.find('a').trigger('keydown.space');

        sandbox.expect(push).to.have.been.calledWith('/foo');
    });

    it('should mount component with icon', () => {
        const localVue = sandbox.createLocalVue();

        localVue.component('n-icon', NIcon);

        const wrapper = sandbox.shallowMount(NButton, {
            localVue,
            propsData: {
                icon: 'fas fa-lock',
            },
        });

        const icon = wrapper.find(NIcon);

        sandbox.expect(icon).to.exist;
        sandbox.expect(icon.vm.icon).to.equal('fas fa-lock');
        sandbox.expect(icon.vm.position).to.equal('prefix');

        wrapper.destroy();
    });

    it('should mount component with suffix icon', () => {
        const localVue = sandbox.createLocalVue();

        localVue.component('n-icon', NIcon);

        const wrapper = sandbox.shallowMount(NButton, {
            localVue,
            propsData: {
                suffixIcon: 'fas fa-arrow-down',
            },
        });

        const icon = wrapper.find(NIcon);

        sandbox.expect(icon).to.exist;
        sandbox.expect(icon.vm.icon).to.equal('fas fa-arrow-down');
        sandbox.expect(icon.vm.position).to.equal('suffix');

        wrapper.destroy();
    });
});
