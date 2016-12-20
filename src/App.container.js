import { connect } from 'react-redux'
import Component from './App.component'
import { goto } from './actions/movement';

const mapStateToProps = state => state.grid;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMove: (from, to) => dispatch(goto(from, to))
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Container