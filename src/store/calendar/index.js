//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

//const getters = {
  //events: state => state.events,
  //weekendsVisible: state => state.weekendsVisible
//}

export default {
  firestorePath: 'calendars',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'calendars',
  statePropName: 'data',
  namespaced: true,
  sync: {
    preventInitialDocInsertion: true,
  },
  //_
//  state,
//  getters,
//  mutations,
//  actions,
}
