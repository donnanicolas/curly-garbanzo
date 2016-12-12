import { connect } from 'react-redux'
import Component from './App.component'
import { move } from './actions/movement';

const mapStateToProps = (state, ownProps) => {
  return {
    x: state.position.x,
    y: state.position.y
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMove: (x, y) => dispatch(move(x, y))
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Container