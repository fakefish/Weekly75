import { findAllWithType } from 'react-shallow-testutils';
import {map} from 'lodash';
export default function Foo(props) {
  return (
    <View>
      <Image source="/image1.jpg"/>
      <Image source="/image2.jpg"/>
      <Image source="/image3.jpg"/>
    </View>
  );
}
describe('Foo component', function() {
  it('renders 3 Image components with the right props', function() {
    const renderer = new Renderer();
    renderer.render(<Foo />);
    const result = renderer.getRenderOutput();
    const sources = map(findAllWithType(result, Image), 
                        'props.source');
    expect(sources).toDeepEqual([
      '/image1.jpg', '/image2.jpg', '/image3.jpg'
    ]);
  });
});