//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

export default {
  firestorePath: 'events',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'events',
  statePropName: 'data',
  namespaced: true,
  sync: {
    preventInitialDocInsertion: true,
  },
  //_
  //state,
  //getters,
  //mutations,
  //actions,
}
