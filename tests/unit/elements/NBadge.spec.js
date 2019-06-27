import sandbox from '../sandbox';
import NBadge from '@/elements/NBadge';

describe('NBadge component', () => {
    it('should mount component with props', () => {
        const wrapper = sandbox.mount(NBadge, {
            propsData: {
                value: 123,
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-badge');
        sandbox.expect(wrapper.text()).to.contain('123');

        wrapper.destroy();
    });

    it('should mount component with slots', () => {
        const wrapper = sandbox.mount(NBadge, {
            slots: {
                default: '123',
            },
        });

        sandbox.expect(wrapper.classes()).to.contain('n-badge');
        sandbox.expect(wrapper.text()).to.contain('123');

        wrapper.destroy();
    });
});
