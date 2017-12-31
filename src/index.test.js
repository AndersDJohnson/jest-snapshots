import { join } from 'path'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshots from '.'
import TestComponent from './TestComponent'

configure({ adapter: new Adapter() });

const testComponentPath = join(__dirname, 'TestComponent')
const testComponentPathArray = [__dirname, 'TestComponent']

snapshots(testComponentPath)

snapshots(`${testComponentPath}.js`)

snapshots(testComponentPathArray)

snapshots({
  component: testComponentPath
})

snapshots({
  component: testComponentPath,
  mount: true
})

snapshots({
  component: testComponentPath,
  fakePropsOptions: {
    optional: true
  }
})

snapshots({
  component: TestComponent,
  props: [
    {
      one: 'A'
    }
  ]
})

snapshots(TestComponent, [
  {},
  {
    one: 'A'
  },
  {
    one: 'A',
    two: 'B',
    three: 'C'
  }
])

snapshots(testComponentPath, [
  {
    one: 'A'
  },
  {
    one: 'A',
    two: 'B',
    three: 'C'
  }
])

snapshots(testComponentPathArray, [
  {
    one: 'A'
  },
  {
    one: 'A',
    two: 'B',
    three: 'C'
  }
])

snapshots(TestComponent, {
  'with none': {},
  'does thing': {
    one: 'A'
  },
  'does things': {
    one: 'A',
    two: 'B',
    three: 'C'
  }
})

snapshots(testComponentPath, {
  'does thing': {
    one: 'A'
  },
  'does things': {
    one: 'A',
    two: 'B',
    three: 'C'
  }
})

snapshots(testComponentPathArray, {
  'does thing': {
    one: 'A'
  },
  'does things': {
    one: 'A',
    two: 'B',
    three: 'C'
  }
})
