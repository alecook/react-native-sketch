import React from 'react';
import {
  NativeModules,
  requireNativeComponent,
  StyleSheet,
  View,
} from 'react-native';

const { func, number, string, bool } = React.PropTypes;

const SketchManager = NativeModules.RNSketchManager || {};
const BASE_64_CODE = 'data:image/jpg;base64,';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    height: 200,
  },
});

export default class Sketch extends React.Component {

  static propTypes = {
    fillColor: string,
    onReset: func,
    onUpdate: func,
    strokeColor: string,
    strokeThickness: number,
    strokeAlpha: number,
    persistDraw: bool,
    style: View.propTypes.style,
  };

  static defaultProps = {
    fillColor: '#ffffff',
    onReset: () => {},
    onUpdate: () => {},
    strokeColor: '#000000',
    strokeThickness: 1,
    strokeAlpha: 0.0,
    persistDraw: false,
    style: null,
  };

  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onReset() {
    this.props.onUpdate(null);
    this.props.onReset();
  }

  onUpdate(e) {
    this.props.onUpdate(e.nativeEvent.points);
  }

  saveImage(image) {
    if (typeof image !== 'string') {
      return Promise.reject('You need to provide a valid base64 encoded image.');
    }

    const src = image.indexOf(BASE_64_CODE) === 0 ? image.replace(BASE_64_CODE, '') : image;
    return SketchManager.saveImage(src);
  }

  redraw(reactTag, points) {
    return SketchManager.redraw(reactTag, points);
  }

  render() {
    return (
      <RNSketch
        {...this.props}
        onChange={this.onUpdate}
        onReset={this.onReset}
        style={[styles.base, this.props.style]}
      />
    );
  }

}

const RNSketch = requireNativeComponent('RNSketch', Sketch);
