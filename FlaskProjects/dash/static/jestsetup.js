import { configure } from 'enzyme';
import { shallow } from 'enzyme';   // shallow rendering
import { mount } from 'enzyme';     // full DOM rendering
import { render } from 'enzyme';     // static rendering
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import toJsonSnapshot from 'enzyme-to-json'; 

/*React 16 Enzyme adapter*/
configure({ adapter: new Adapter() });

/* Mock the localStorage object*/
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};
global.localStorage = localStorageMock;


/*Make Enzyme functions available in all test files without importing*/
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.toJsonSnapshot = toJsonSnapshot;
