//import state from './state'
//import mutations from './mutations'
//import actions from './actions'

export default {
  firestorePath: 'items',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'items',
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